---
title: "KVPlat 平台介绍"
description: "介绍基于元数据配置的业务 KV 配置平台，包括多租户、多级缓存、配置变更审核和主要模块设计。"
pubDate: 2026-09-18
tags: ["KVPlat", "低代码", "Spring Boot", "Vue", "多租户"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "kvplat-platform-intro"
---

### 一、项目整体说明
大家好，这里介绍下最近vibe Coding的另外一个项目，是一个基于元数据配置的业务kv配置平台，他能提供什么能力呢，就是说在企业中有很多非核心业务，这些非核心业务也占据很多企业开发精力，比如RABC的权限系统，比如销售表，比如一些业务配置表，一些枚举配置等。这些都比较分散或者或多或少的带有一些业务意义，有时候会在不同的系统里重复定义，重复出现，这里通过元数据配置平台可以将一些通用或者统一的基础业务功能配置出来，然后对接前端页面和交互就可以了。简单来说就是他类似于低代码但是是基于业务配置的，可以把业务模型配置出来进行复用。这里的业务模型可以当作一个业务组件，或者一个微型的系统，比如department,team,admin这些都可以完全配置出来。

这里先使用GPT生成的架构图来看下V1.0.0版本可以提供的能力：

![KVPlat 业务配置平台架构图](/images/blog/kvplat-platform-intro/image-1.png)

目前V1.0.0可以提供的是一个最小可支持多租户，多节点部署，多级缓存，配置变更审核的MVP项目。其登录逻辑用的就是配置平台本身配置出来的模型进行登录认证的。

1. 业务分层结构：

租户--->应用---->实例----->实例数据---->数据元配置和数据内容

2. 表结构模型

![KVPlat 表结构模型](/images/blog/kvplat-platform-intro/image-2.png)

带数字的表则是配置实例表，从设计上看，就是每个配置实例就是一张业务表，不是json存储，不是文档式的，那么对于后续迭代或者重构来说留出了一定的扩展空间。

现在的设计是整个配置平台和配置实例数据都是在一个数据库里，那么是有一定耦合性的，所以后续会支持多数据源，多数据库。对于想了解或者想拿这个来继续开发学习的同学来说，v1.0.0版本将是一个很好的开始。



3. 配置实例的生命周期

  为了让大家更直观的深入了解这个平台的核心业务，这里通过一张图来展示配置实例使用流程。

配置实例变更就类似于表结构变更，提交变更审批单，这里当配置实例里的字段发生了变化后，可以进行配置变更预览，就是说你加了或者删了或者修改字段声明，代码都可以自动生成对应的alter table变更语句，用户只需要审核其是否符合预期即可。

![配置实例生命周期流程](/images/blog/kvplat-platform-intro/image-3.png)

4. 多级缓存刷新和数据变更机制

由于篇幅问题，这里先卖个关子，后续会在公众号上新写文章详细介绍，敬请期待。

5. alibaba Page Agent 

这个项目前端对接了alibaba 开源的page Agent, java后端提供了代理接口，模型是DeepSeek V4 Flash.

另外一个项目也接了，但是使用感受一言难尽，后续会专门找时间详细说明下。

### 二、主要模块说明
#### 2.1 api接口模块
由于是多模块项目，面向的端不同所以api模块提供了/llm,/web,/open,/client的几个不同的接口子模块，另外

在这一层里也有manager层来解耦不同maven子模块之间的相互调用。

#### 2.2 client模块
这个模块主要是希望在一开始就提供Client SDK可以供业务方快速接入，所以Vibe Coding的时候直接让LLM参考了XXL-JOB的client-server架构模式，目前做的相对灵活，同时也做成了SpringBoot Starter了，所以接入和使用在example工程里会很简单。

#### 2.3 config,tenant模块
这两个模块是整个系统的业务核心模块，初心是整理所有常用的表字段，比如id,state,status,name,code,created_by,created_time等等，通过这些常用字段可以配置组装出80%以上的业务模块。其中也包括了多级缓存的实现。



### 三、项目演示
![KVPlat 首页演示](/images/blog/kvplat-platform-intro/image-4.png)



![配置元数据管理页面](/images/blog/kvplat-platform-intro/image-5.png)



![配置实例管理页面](/images/blog/kvplat-platform-intro/image-6.png)



![配置实例数据管理页面](/images/blog/kvplat-platform-intro/image-7.png)



![数据模型更新审核页面](/images/blog/kvplat-platform-intro/image-8.png)



![缓存监控页面](/images/blog/kvplat-platform-intro/image-9.png)

### 四、后续规划
1. 通过配置模型提供的基本能力实现菜单,权限,角色,日志的实例化
2. 实现一个agent 可以快速构建应用和配置实例
3. 通过LLM做厚整个实例的业务层

### 五、git 地址
java 后端项目

[https://gitee.com/sky-painting/kv-plat](https://gitee.com/sky-painting/kv-plat)

vue 前端项目

[https://gitee.com/sky-painting/kvPlatWeb](https://gitee.com/sky-painting/kvPlatWeb)

后续会增加python项目

如果感兴趣的话可以关注天画项目平台，后续会开发更多平台工具，同时欢迎关注我的技术公众号:神帅的技术圈。



