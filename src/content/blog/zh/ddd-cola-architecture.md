---
title: "COLA 应用架构：从 1.0 到 4.0 的演进与实践"
description: "梳理阿里张建飞提出的 COLA 应用架构：要解决的复杂性问题、1.0 到 4.0 的版本演进与分包策略调整、落地案例，以及它的认知成本。"
pubDate: 2026-11-26
tags: ["COLA", "DDD", "应用架构", "分包策略", "架构演进"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "ddd-cola-architecture"
---
业务代码写到一定规模，复杂度往往不是来自某个技术难点，而是来自「技术细节和业务逻辑搅在一起」：改一个需求要在十几个类里找落点，加一个字段要在 DTO、BO、DO 之间来回转换，评审时没人说得清哪一层该负责什么。

COLA 就是为了解决这类问题提出的一套应用架构。它不算新，从 2019 年到现在经历了四个大版本的调整，思路也一直在变：从「加机制」到「减机制」，从「框架约束」到「结构规范」。这篇笔记按版本梳理它的演进脉络，再说说我在实际项目里的使用感受。

> 说明：本文写于 COLA 4.0 之后不久，文中版本号、模块划分与结论都属于当时的认知；具体实现请以 COLA 官方仓库和作者博客为准。

## 一、COLA 背景

### 1.1 COLA 起源

COLA 应用架构起源于 2019 年，由阿里资深技术专家张建飞先生提出并构建，最初是为了解决阿里 CRM 系统中存在的一些问题。经过实战之后，这套理论确实可以降低复杂应用的复杂度，因此作者把它单独拉出来进行了一系列迭代，慢慢演化为一个相对成熟的应用架构理论。

### 1.2 痛点

业务复杂，技术与业务不容易区分，代码迭代困难。

### 1.3 COLA 的定位

**COLA 是一种架构思想**，整合了洋葱圈架构、适配器架构、DDD、整洁架构、TMF 等架构思想，同时也是一种框架组件。其全称为 **Clean Object-oriented and Layered Architecture**。

### 1.4 COLA 要解决的问题

- 复杂业务系统的架构问题
- 复杂业务代码的模块管理问题
- 领域上下文工程的模块治理问题
- 复杂业务代码的编写与迭代问题

## 二、COLA 版本演进

### 2.1 COLA 1.0

核心点：

1. 介绍复杂性的来源
2. 介绍复杂性的应对之道
3. 提出 COLA 架构并给出初步的架构图
4. 产出 COLA 架构模型，以及基于 COLA 构建项目的脚手架

延伸阅读：

- [复杂度应对之道：COLA 应用架构](https://blog.csdn.net/significantfrank/article/details/85785565)
- [复杂业务代码要怎么写](https://blog.csdn.net/significantfrank/article/details/98087611)
- [应用架构之道：分离业务逻辑和技术细节](https://blog.csdn.net/significantfrank/article/details/94593620)

### 2.2 COLA 2.0

核心点：

1. 反思 COLA 1.0 的一些问题：到底有没有真正解决或降低应用复杂度
2. 对 COLA 1.0 进行升级，主要包括架构分层、组件划分、扩展点设计、二方库定位
3. 在脚手架工程上增加新的模块，并对 COLA 进行开源

延伸阅读：

- [应用架构 COLA 2.0](https://blog.csdn.net/significantfrank/article/details/100074716)
- [一文教你如何写复杂业务的代码](https://blog.csdn.net/significantfrank/article/details/101095244)

### 2.3 COLA 3.0

核心点：

1. COLA 脚手架被选入[阿里云的 Java 应用初始化](https://start.aliyun.com/)的应用架构选项之一
2. 在 COLA 2.0 基于框架的定位上做了一些裁剪，遵循奥卡姆剃刀原理
3. 去掉 command、interceptor、converter、validator、assembler 与扩展点机制

延伸阅读：[应用架构 COLA 3.0：让事情回归简单](https://blog.csdn.net/significantfrank/article/details/106976804)

### 2.4 COLA 3.1

核心点：

1. 基于分类思维重新梳理应用架构中的核心要素
2. COLA 的核心应该是制定应用的结构和规范，也就是应用架构基模（Archetype）
3. 去除 Event Bus 机制，重新规范分包策略，扩展原来控制层的职责
4. 用 Adapter 替代 Controller
5. 产出改造后的应用架构图和模块依赖图

具体分包策略调整为：

- **Adapter 层**：路由用户 request，适配 response
- **App 层**：接收请求，联合 Domain 层一起做业务处理
- **Domain 层**：领域模型 + 领域能力
- **Infrastructure 层**：技术细节（DB、Search、RPC 等）+ 防腐（anti-corruption）

延伸阅读：

- [应用架构 3.1：分类思维](https://blog.csdn.net/significantfrank/article/details/109529311)
- [为什么说应用架构需要分类思维](https://blog.csdn.net/significantfrank/article/details/110212058)

### 2.5 COLA 4.0

核心点：

1. 提出基于 COLA 架构的最佳实践
2. 应用架构需要解决代码组织、模块组织的问题
3. 重新梳理各模块子包的命名和职责
4. 基于 COLA 架构可以不绝对依赖 COLA 核心
5. 提供丰富的外围组件辅助业务开发，如 extension 组件、State Machine 组件
6. 把 COLA 架构明确分为两个部分：
   - **COLA 架构**：关注应用架构的定义和构建，提升应用质量
   - **COLA 组件**：提供应用开发所需要的可复用组件，提升研发效率

延伸阅读：[COLA 4.0：应用架构的最佳实践](https://blog.csdn.net/significantfrank/article/details/110934799)

## 三、COLA 架构实战

### 3.1 个人实战

1. 轻蜗牛租房 CRM 项目
2. 篮球运营管理平台项目

其他借鉴了 COLA 分包思想的实践：

1. 社交帖子类演示项目

### 3.2 企业实战

我见闻过的项目：

- 公司支付领域的支付中心项目（基于 COLA 2.0）
- 饿了么项目

张建飞先生提供的项目：

1. 零售通云店铺（cloudstore）
2. 阿里巴巴工匠平台（Craftsmanship）
3. MMC 商品 Item-core

## 四、COLA 的优缺点

**优点**：提供架构规范和指导，技术组件可以复用。

**缺点**：有一定的认知成本。

## 五、个人使用感受

一开始我对 COLA 也是嗤之以鼻，但是现在看来确实香。个人认为 COLA 经过一系列版本迭代已经相对成熟，从几个项目经验和跟群友的讨论来看，很多朋友已经打算借鉴 COLA 的架构思想和分包策略。就目前看，COLA 应对复杂业务系统已经很有底气了。

建飞总确实也说过，它有一定认知成本。其复杂度主要体现在以下几个方面：

1. 模块比较多，有 6 个，模块间依赖不好把握，每个模块需要适配到什么框架还需要探索；另外，中等复杂度或不太复杂的项目可能用不到 6 个模块，但这不妨碍使用 COLA 的架构思想去做。
2. 每个模块的分包很多，经验少的人确实不容易构建一个像样的、有一定规模的 COLA 应用。
3. COLA 本身有好几个版本，不同版本的架构快照和理念是有区别的，所以建议先看看 COLA 架构的演进历史，了解作者的意图才能更好地应用它。
4. 就目前看，基于 COLA 且比较复杂、同时集成 Dubbo、Spring Cloud 等技术栈的实战项目确实不多，所以上手确实有难度。

本电子书小册子后面的实战环节基本都运用了 COLA 架构的分包思想和模块划分，稍微改改就可以跑 demo，可以结合着详细了解。

## 相关阅读

- [DDD 的架构风格](/blog/ddd-architecture-styles/)：COLA 在分层、六边形、洋葱、整洁等风格中的位置。
- [DDD 小册子：理论、架构、建模与实践](/blog/ddd-handbook/)：把 COLA 放回完整的 DDD 学习脉络。
- [DDD 代码实践篇：社交关系（Blog/Topic）](/blog/ddd-code-practice-social-blog-topic/)：文中提到的分包策略在代码里的样子。
