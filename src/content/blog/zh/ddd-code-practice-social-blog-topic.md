---
title: "DDD 代码实践篇：社交关系（Blog/Topic）"
description: "以博客、论坛类产品为例落地 DDD 代码工程：领域分包、应用层与领域层协作、博客发布与粉丝关注调用流程。"
pubDate: 2026-11-17
tags: ["DDD", "代码实践", "领域建模", "COLA", "Spring Boot"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "ddd-code-practice-social-blog-topic"
---
## 一、背景
前面说了很多关于 DDD 的理论，从书本到论证，再到总结，最终需要来一些实战性的内容，很多网友也比较期待 DDD 项目的代码工程。俗话说能动手，绝不吵吵。但是 DDD 着实有些台阶，想要完全掌握还需要深入虎穴。

因此本文借助于之前的社交关系建模文章，这里给出博客、论坛类的 DDD 代码样例。

## 二、领域分析
### 2.1 核心领域
- 博客帖子域
- 用户会员域

### 2.2 支撑领域
- 审核域
- 账号认证
- 权益域

## 三、领域服务构建
### 3.1 领域服务分包
这里为了简单演示，因此基于包的形式作为领域服务。通过上面的领域分析可以知道，有两个核心服务，一个是 blog/topic，另一个就是会员或者用户了。这里用两个包表示一下：

```txt
com.coderman.domainservice
├── blogtopic
└── member
```

### 3.2 领域服务子包说明
- `XXXDO`：数据库对象（data object）
- `XXXBO`：领域业务对象（business object）
- `XXXDTO`：适配器对象，数据传输对象（data transfer object）

参考 COLA 分包策略：<https://blog.csdn.net/significantfrank/article/details/110934799>

#### 1. 领域服务包
这里为了演示方便，将每个领域都放在这个包下面，算是顶级包路径：

```txt
com.coderman.domainservice
```

#### 2. 博客/帖子领域服务包
```txt
com.coderman.domainservice.blogtopic
```

##### 2.1 控制层（适配器）包
子包有管理端（admin）、web 端（web）：

```txt
com.coderman.domainservice.blogtopic.adapter
```

##### 2.2 应用层包
子包较多：

```txt
com.coderman.domainservice.blogtopic.app
```

子包列表：

- `clientimpl`：服务对外透出的 API 实现包
- `command`：命令模型
- `consumer`：处理外部 message
- `executor`：处理 request，包括 command 和 query
- `query`：查询包

##### 2.3 客户端包
子包有 api、dto，模拟 dubbo 框架下对外暴露服务接口，实现在应用层：

```txt
com.coderman.domainservice.blogtopic.client
```

##### 2.4 领域包
子包较多：

```txt
com.coderman.domainservice.blogtopic.domain
```

子包列表：

- `ability`：领域能力包
- `convertor`：对象转换包
- `factory`：对象工厂包
- `gataway`：领域网关接口
- `model`：领域模型包（子包有 entity、event、valueobject）

##### 2.5 基础设施包
子包较多：

```txt
com.coderman.domainservice.blogtopic.infrast
```

子包列表：

- `cache`：缓存包 —— 对接缓存中间件
- `config`：配置包 —— 对接配置中间件
- `dubbo`：dubbo 框架包 —— 对接依赖的 dubbo 适配包
- `elasticsearch`：搜索包 —— 对接搜索引擎
- `gatawayimpl`：领域网关实现包
- `mapper`：持久层包（子包有 dao、dataobject）
- `mq`：消息包（子包有 consumer、provider）—— 对接消息中间件
- `model`：领域模型包（子包有 entity、event、valueobject）
- `rest`：对接 rest 风格的框架包，与 dubbo 包类似

#### 3. 用户会员领域包
```txt
com.coderman.domainservice.member
```

说明：这里把用户、会员权益、账号都放在一个领域里了，如果想继续完善的话可以继续分子领域。

区别：分包策略与博客帖子领域类似，但是领域包下的业务模型包是分开的：

```txt
com.coderman.domainservice.member.domain.model
```

子包列表：

- `memberright`：会员权益业务模型
- `user`：用户信息账号业务模型

## 四、调用流程
### 4.1 博客发布流程
![DDD 代码实践篇：社交关系（Blog/Topic） 图 1](/images/blog/ddd-code-practice-social-blog-topic/image-1.svg)

1. 用户端调用控制层 `publishBlog()` 发布博客。
2. 控制层通过 command executor 把请求处理为命令。
3. command executor 内部进行业务逻辑校验，串联业务调用。
4. 应用层调用 domain-gataway 服务（repository、factory）。
5. 领域层执行领域服务。
6. 领域层调用 dao 存储 blog 数据。
7. 应用层调用 adapter 调用下游博客内容服务接口。
8. 基础设施层进行消息消费监听。
9. 基础设施层调用领域服务消费审核结果消息。
10. 领域层调用应用层 consumer 服务消费消息。
11. 应用层发送博客发布成功 mq 消息。
12. 应用层调用业务消息通知服务。

### 4.2 粉丝关注流程
![DDD 代码实践篇：社交关系（Blog/Topic） 图 2](/images/blog/ddd-code-practice-social-blog-topic/image-2.svg)

1. 用户端发起关注某人。
2. 控制层通过 command executor 处理为命令。
3. 应用层调用 domain-gataway 服务。
4. 领域层调用 dao 存储关系数据。
5. 领域层调用缓存更新统计数据。
6. 领域层调用业务消息通知服务。

## 五、代码说明
### 5.1 项目地址
该 git 地址下目前只有 blogDemo 一个项目工程，后续会加入其他业务场景的项目工程，敬请关注。

<https://gitee.com/codergit.com/dddin-action.git>

### 5.2 项目包结构
![DDD 代码实践篇：社交关系（Blog/Topic） 图 3](/images/blog/ddd-code-practice-social-blog-topic/image-3.png)

### 5.3 项目说明
1. 这里为了降低代码演示的难度，对 mapper、cache、es、mq 等做了 mock 服务，类似于一个空实现。当真正要引入对应技术中间件的时候，只需要在对应子包下替换掉空实现即可。
2. 项目基本以纯 Spring Boot 工程演示，因此模拟不同业务逻辑的时候可以考虑在不同的包下实现，看看效果。
