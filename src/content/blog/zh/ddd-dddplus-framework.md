---
title: "DDDPlus 应用框架：面向业务中台的 DDD 落地框架"
description: "介绍 DDDPlus 的定位与起源、业务中台全景图中的模块划分、框架核心特性与官方 demo，并评估它在扩展性、耦合和可维护性上的取舍。"
pubDate: 2026-11-26
tags: ["DDDPlus", "DDD", "业务中台", "扩展点", "应用框架"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "ddd-dddplus-framework"
---
前面几篇聊的 COLA、菱形对称架构，本质都是「怎么把代码分层分对」。但如果系统要服务的是多条业务线的前台应用，问题就会从「层怎么分」变成「同一套核心能力，如何让不同业务线各自扩展而不互相污染」。

DDDPlus 就是冲这个场景来的：它把自己定位成一套轻量级的业务中台开发框架，用 DDD 组织核心模型，用扩展点和插件机制承接业务差异。这篇笔记整理它的定位、核心模块、官方示例，以及我读源码和文档后的几点判断。

## 一、DDDPlus 背景

### 1.1 定位

一套轻量级的**业务中台开发框架**，以 [DDD](https://github.com/funkygao/cp-ddd-framework/wiki/DDD) 思想为本，致力于业务资产的可沉淀、可传承，全方位解决复杂业务场景的扩展问题，实现[中台核心要素](https://github.com/funkygao/cp-ddd-framework/wiki/%E4%B8%9A%E5%8A%A1%E4%B8%AD%E5%8F%B0%E7%9A%84%E6%A0%B8%E5%BF%83%E8%A6%81%E7%B4%A0)，赋能中台建设。

### 1.2 起源

由 FunkyGao 发起并开源实现，目前已迭代多个版本，支持多个特性。

### 1.3 业务中台建设全景图

![DDDPlus 业务中台建设全景图：前台业务 A-D 与订单、营销、库存等业务中台，以及 dddplus-runtime、dddplus-enforce、dddplus-spec 等框架模块](/images/blog/ddd-dddplus-framework/image-1.png)

从这张全景图可以看出它的分工思路：

- **上层**是多个前台业务（图中 A～D），各自承载不同的业务场景。
- **中间**是业务中台，例如订单中心、营销中心、库存中心，沉淀可复用的核心能力。
- **下层**是框架本体，按职责拆成几个模块：`dddplus-runtime` 负责运行期容器与扩展点调用，`dddplus-enforce` 借助 ArchUnit 与架构防腐规则做约束校验，`dddplus-spec` 提供领域规格描述；再配合 `IDomainModel`、`DomainAbility`、`IDomainService`、`IDomainStep`、`IDomainExtension`、`ISpecification` 等接口表达领域模型与能力。
- **右侧**是各前台业务的扩展包，业务差异通过扩展实现落在这里，而不是散落在中台核心代码里。

## 二、版本迭代

### 2.1 项目地址

- GitHub：<https://github.com/dddplus>
- Gitee：<https://gitee.com/funkygao/cp-ddd-framework>

### 2.2 迭代版本

根据 GitHub 的提交和发布记录，当时已经发布了多个 release 版本。由于 DDDPlus 的定位是业务中台开发框架，所以它在核心思想上没有太多变化。

### 2.3 框架核心元素与特性

1. 基于 DDD 思想构建业务中台框架。
2. 支持扩展点和业务隔离。
3. 支持业务脚手架，通过 [dddplus-archetype](https://github.com/dddplus/dddplus-archetype) 生成项目骨架。
4. 支持能力和服务接口级的编排。

## 三、项目应用

根据开源文档，目前已有不少公司在用，但公开资料不多。官方提供的演示样例有：

1. <https://github.com/dddplus/dddplus-archetype-demo>
2. <https://github.com/dddplus/easyapp>
3. <https://github.com/dddplus/dddplus-demo>

## 四、优缺点探讨

由于项目开发者提供的公开信息比较少，我也没有直接联系到作者。不过花了一些时间读了框架源码和文档中的 demo，这里简单点评几句。

**优点：**

1. 从业务中台角度进行架构设计，提供了一个不错的范式和框架案例。
2. 从核心特性看，它与阿里的 TMF、星环相关产品思路类似，通过扩展点和插件机制应对多维业务中台带来的系统复杂度。
3. 通过注解和扩展点提供接口级的能力编排，为商业化能力管理提供了一种思路。

**缺点：**

1. 迭代当时已暂停，从提交记录看项目不太活跃。
2. 由于定位是框架，天然会与业务代码强绑定，增加了开发者的心智负担。
3. 项目中部分代码和包的划分，没有很好地做技术与业务的关注点分离。
4. 项目骨架生成的子模块较多，在复杂项目代码下不好维护。

## 小结

如果团队正在建业务中台，需要「一次核心实现 + 多业务线差异化扩展」，DDDPlus 的扩展点设计值得借鉴，尤其是它把架构约束（`dddplus-enforce`）也做成了框架能力这一点。但如果只是单体业务系统，引入它的框架约束和脚手架收益有限，反而要承担额外的耦合与维护成本。

## 相关阅读

- [COLA 应用架构：从 1.0 到 4.0 的演进与实践](/blog/ddd-cola-architecture/)：另一种更常见的 DDD 应用架构落地方式。
- [菱形对称架构：融合六边形与分层的一种应用架构](/blog/ddd-diamond-symmetry-architecture/)：偏架构风格的另一条路线。
- [DDD 小册子：理论、架构、建模与实践](/blog/ddd-handbook/)：把本篇放回完整的 DDD 学习脉络。
