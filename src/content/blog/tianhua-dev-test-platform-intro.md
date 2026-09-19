---
title: "天画：开发测试平台介绍"
description: "介绍天画开发测试平台 1.0.0 的整体设计、核心模块、自动化测试流程、AI Skills 能力和后续规划。"
pubDate: 2026-09-19
tags: ["天画", "开发测试平台", "Vibe Coding", "自动化测试", "AI Skills"]
category: "vibe-coding-projects"
draft: false
---
### 一、项目整体说明
大家好，这里介绍下我做的第一个Vibe Coding项目，主要使用codex,deeSeek模型来产出代码和修复bug.

为什么叫开发测试平台呢，因为如果纯做测试平台其实是不够的，所以1.0.0版本是从测试流程入手，完成整个测试过程中依赖的一些接口信息，流程信息等。

这里看下这个开发测试平台的1.0.0版本有什么吧，架构图如下

![天画：开发测试平台介绍 图 1](/images/blog/tianhua-dev-test-platform-intro/image-1.png)

在1.0.0版本中提供的功能就比较丰富，包括接口文档管理，测试用例管理，附带的几个skills，同时在自动化测试方面也提供了多种方式。相当于在AI测试方面给出了一个比较小但是相对全面的功能基座。

1. 表结构信息

这里的第一版本的表结构比较多，但是sql都初始化在项目代码里了，部署也很简单，目前是单项目的，不怎么依赖外部服务，直接单项目启动就行

![天画：开发测试平台介绍 图 2](/images/blog/tianhua-dev-test-platform-intro/image-2.png)

2. 接口和测试用例的测试流转

![天画：开发测试平台介绍 图 3](/images/blog/tianhua-dev-test-platform-intro/image-3.png)

### 二、主要模块说明
![天画：开发测试平台介绍 图 4](/images/blog/tianhua-dev-test-platform-intro/image-4.png)


#### 2.1 api模块
负责跨模块聚合的业务逻辑，负责api请求鉴权,分web,open两个应用端点

#### 2.2 case模块
负责测试用例的全生命周期管理

#### 2.3 interface_doc模块
负责接口文档的管理，这里不仅仅是接口文档，更重要的是接口的时序图也可以在这里查看

#### 2.4 user模块
负责用户，部门，角色等边缘业务功能，只是目前1.0.0中还不是很完善

#### 2.5 ai-core模块
负责和大模型交互的业务逻辑，这里后续还是得看Java版本的Agent,Graph是否成熟然后才考虑实现Java方面的业务逻辑，这里先把模块分出来

#### 2.6 common模块
这里存放一些公共的业务组件一些错误码声明

#### 2.7 doc,skills
doc,skills存放一些项目功能设计，产品设计和skills的一些使用迭代信息，目前用到的几个skills都可以很好的给平台赋能。

### 三、项目演示
![天画：开发测试平台介绍 图 5](/images/blog/tianhua-dev-test-platform-intro/image-5.png)

![天画：开发测试平台介绍 图 6](/images/blog/tianhua-dev-test-platform-intro/image-6.png)


![天画：开发测试平台介绍 图 7](/images/blog/tianhua-dev-test-platform-intro/image-7.png)


![天画：开发测试平台介绍 图 8](/images/blog/tianhua-dev-test-platform-intro/image-8.png)


![天画：开发测试平台介绍 图 9](/images/blog/tianhua-dev-test-platform-intro/image-9.png)


![天画：开发测试平台介绍 图 10](/images/blog/tianhua-dev-test-platform-intro/image-10.png)


![天画：开发测试平台介绍 图 11](/images/blog/tianhua-dev-test-platform-intro/image-11.png)


![天画：开发测试平台介绍 图 12](/images/blog/tianhua-dev-test-platform-intro/image-12.png)

### 四、后续规划
当前只是做了测试方面的内容，相当于做了一部分，后续会完成产品端和开发端的功能迭代，做好权限分离和整合。

### 五、git 地址
Java项目

[https://gitee.com/sky-painting/devTestPlat-java](https://gitee.com/sky-painting/devTestPlat-java)

前端项目

[https://gitee.com/sky-painting/dev-test-plat-web](https://gitee.com/sky-painting/dev-test-plat-web)
