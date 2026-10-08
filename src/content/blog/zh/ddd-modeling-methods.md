---
title: "DDD 中的建模方法有哪些"
description: "介绍 DDD 中常见的领域建模方法，包括四色建模法、限界笔纸法、事件风暴法和用户故事建模法。"
pubDate: 2026-10-08
tags: ["DDD", "领域建模", "四色建模", "事件风暴", "用户故事"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "ddd-modeling-methods"
---
### 一、背景
在之前的文章中已经介绍了DDD相关的概念模式，DDD相关的业务技术架构，但是我们还没有找到一个核心的抓手去实践DDD。DDD的一个核心本质就是对业务建模，或者领域建模。说的很简单，但是做好确实很难，一个需求过来意淫几个实体对象就差不多解决了。深入看，全局看只在脑海中进行的建模实际上并不一定正确和稳定。因此我们需要找到正确的方法帮助对业务领域进行分析，得到建模结构，共享建模成果。

### 二、四色建模法
#### 2.1 起源&概念&要素
关于四色建模的概念我们可与追溯到90年代，起源于四色原型。<font style="color:#333333;">四色原型是诞生于90年代，被广泛使用的一种系统分析方法。</font>相关百度百科链接如下：[https://baike.baidu.com/item/%E5%9B%9B%E8%89%B2%E5%8E%9F%E5%9E%8B/15403787?fr=aladdin](https://baike.baidu.com/item/%E5%9B%9B%E8%89%B2%E5%8E%9F%E5%9E%8B/15403787?fr=aladdin)

四色建模的目的是要对目标业务系统进行分析并通过不同的颜色标示出人，事，物，角色。通过四色建模或者四色原型得到四色原型图，<font style="color:#333333;">每个原型图有属性和连接（关联　依赖等关系）两个部分组成。</font>

<font style="color:#333333;"></font>

1. **<font style="color:#444444;">粉红色（moment-interval）</font>**

**简称**：<font style="color:#444444;">业务关键时刻，用粉红色或者淡红色表示。</font>

**<font style="color:#444444;">说明</font>**<font style="color:#444444;">：业务关键时刻所指的对象一般比较重要，这个时刻一般对应于一个事件和其产生的结果，这个对象经常会有一些关键字段，比如订单中的订单号。</font>

<font style="color:#444444;"></font>

2. **<font style="color:#444444;">淡黄色（role）</font>**

**<font style="color:#444444;">简称：</font>**<font style="color:#444444;">角色，用淡黄色或者浅黄色标示</font>

**<font style="color:#444444;">说明：</font>**<font style="color:#444444;">表示一种角色，由人或者物来承担，会有相应的责任和权利。</font>

<font style="color:#444444;"></font>

3. **<font style="color:#444444;">淡绿色（party,place or thing）</font>**

**<font style="color:#444444;">简称</font>**<font style="color:#444444;">：人事物，用淡绿色或者浅绿色标示</font>

**<font style="color:#444444;">说明</font>**<font style="color:#444444;">：表示客观存在的事物，人，组织，产品或者配件等</font>


4. **<font style="color:#444444;">淡蓝色（description）</font>**

**<font style="color:#444444;">简称：</font>**<font style="color:#444444;">描述内容，用淡蓝色或者浅蓝色标示</font>

**<font style="color:#444444;">说明：</font>**<font style="color:#444444;">在建模中对上述颜色表示的内容进行解释，用于分类或者描述建模过程中产生的数据，事件，或者活动。</font>

#### 2.2 建模步骤
1. <font style="color:#444444;">以满足运营和管理的需要为前提，寻找需要追溯的事件或者称为关键业务时刻；</font>
2. <font style="color:#444444;">根据这些需要追溯，寻找足迹以及对应的关键业务时刻对象；</font>
3. <font style="color:#444444;">寻找关键业务时刻对象周围的人,事,物对象；</font>
4. <font style="color:#444444;">从人,事,物中抽象出角色；</font>
5. <font style="color:#444444;">把一些描述信息用对象补足；</font>

<font style="color:#444444;"></font>

#### <font style="color:#444444;">2.3 实战案例</font>
1. 运用四色建模法进行领域分析---电商图书类购物平台

[https://www.infoq.cn/article/xh-four-color-modeling/](https://www.infoq.cn/article/xh-four-color-modeling/)

2. 运用四色原型进行聚合设计--企业办公领域

[https://www.cnblogs.com/happyframework/archive/2013/04/26/3043515.html](https://www.cnblogs.com/happyframework/archive/2013/04/26/3043515.html)

3. 从领域模型提取数据架构--风控领域

[https://my.oschina.net/u/4587475/blog/4414138](https://my.oschina.net/u/4587475/blog/4414138)

4. 培训排课系统--教育领域

[https://insights.thoughtworks.cn/paper-pen-modeling/](https://insights.thoughtworks.cn/paper-pen-modeling/)

### 三、限界笔纸法
#### 3.1 起源
限界笔纸法起源于thoughtworks，由thoughtworks大佬提出的基于四色建模的改进方法。

#### 3.2 概念
<font style="color:#333333;">在“四色建模法”的“时标对象”的基础上确定"限界上下文”与“聚集”的概念，再使用“纸和笔来管理”的方法，力图在建模过程中实现“分而治之”，增强数据的完整性，并避免过度设计。</font>

<font style="color:#333333;">注：这里的时标对象就是业务发生时刻。聚集就是DDD中的聚合模式。</font>

#### 3.3 建模步骤
1. <font style="color:#444444;">根据“业务发生时刻”的价值识别核心领域(core domain)</font>
2. <font style="color:#444444;">确定核心领域之间的依赖关系</font>
3. <font style="color:#444444;">用纸和笔画表格并写实例</font>

<font style="color:#444444;">    注：这里的实例可以是业务用例，用户故事，或者业务发生时刻。</font>

4. <font style="color:#444444;">确定“聚合根</font> （<font style="color:#000000;">AGGREGATE ROOT）</font><font style="color:#444444;">”</font>
5. <font style="color:#444444;">以“人以群分”的原则抽取新的“聚合”</font>

<font style="color:#444444;"></font>

#### <font style="color:#444444;">3.4 </font><font style="color:#444444;">实战案例</font>
1. 培训排课系统--教育领域

[https://insights.thoughtworks.cn/paper-pen-modeling/](https://insights.thoughtworks.cn/paper-pen-modeling/)

#### 3.5 优点
1. 划分核心领域有助于“分而治之”：一旦确定了核心领域，限界上下文也就确定了，不同的限界上下文之间通过“翻译器”来彼此沟通并屏蔽干扰，这样就避免了“大泥球”的设计，并有助于演进到微服务架构。


2. “聚集根”有助于数据完整性：每个限界上下文都有一个“聚集根”的概念，外界对其下属概念的访问都必须通过它来进行，这样既方便定位职责，也有助于增强数据的完整性。


3. 用“纸和笔”画恰好够用的概念有助于避免过度设计：每个限界上下文中要管理的概念，都是通过“倒退到没有电脑而用纸和笔的时代如何管理”来引导出来的，用纸和笔来记录，能促使人避免写过多的信息，而只写限界上下文中恰好够用的概念。


### 四、事件风暴法
#### 4.1 概念
通过<font style="color:#282828;">开一场事件风暴会议梳理领域内的核心要素。</font>

<font style="color:#282828;">核心要素有用户，聚合，策略，决策命令，读模型，外部系统，领域事件。</font>

<font style="color:#282828;"></font>

#### 4.2 建模步骤
1. <font style="color:#444444;">开一场事件风暴会议，每个人都参与其中，协调人必须使团队保持专注和参与，指导进展到完整的域模型</font>
2. <font style="color:#444444;">从领域事件开始，向前和向后遍历模型，以确保涵盖所有内容。</font>
3. <font style="color:#444444;">添加导致事件的命令或触发器，并考虑所有命令溯源（ES:EventSoucring），包括用户，外部系统甚至时间。</font>
4. <font style="color:#444444;">识别聚合接受命令和完成事件，并将聚合组在一起成为有界上下文。</font>
5. <font style="color:#444444;">识别关键测试场景、用户和目标并将其合并到模型中。</font>
6. <font style="color:#444444;">添加有界上下文之间的关系以创建上下文映射。</font>
7. <font style="color:#444444;">最后用代码对所得模型进行挑战，以验证组学习并验证模型。</font>

#### <font style="color:#444444;">4.3 实战案例</font>
1. <font style="color:#444444;">事件风暴建模整体方法论</font>

[https://www.cnblogs.com/junzi2099/p/13058234.html](https://www.cnblogs.com/junzi2099/p/13058234.html)

2. 订单系统

[https://www.jianshu.com/p/797d96c1faab](https://www.jianshu.com/p/797d96c1faab)

3. 信用卡模型

[https://www.infoq.cn/article/b7UGgkuYUgTEmRe5SQLg](https://www.infoq.cn/article/b7UGgkuYUgTEmRe5SQLg)

#### 4.4 优势
<font style="color:#121212;">事件风暴旨在创建和分享对域模型的共同理解;</font>**它不是设计文档，流程图，UML图，部署计划，体系结构图或与实现相关的任何其他内容的替代品**<font style="color:#121212;">。可以将其视为</font>**低保真，**<font style="color:#121212;">临时信息辐射器，用于与其他人共享和确认域模型。</font>

<font style="color:#121212;"></font>

### 五、用户故事建模法
#### 5.1 概念
<font style="color:#121212;">基于用户故事（需求）建模，也叫用例建模法。</font>

#### 5.2 建模步骤
1. <font style="color:rgb(51, 51, 51);">搜集用户故事（用户的原始需求）</font>
2. <font style="color:rgb(51, 51, 51);">整理用户故事，抽出用例（用例表达了用户对系统的需求，定义了系统的边界以及系统外部角色和系统的交互场景）</font>
3. <font style="color:rgb(51, 51, 51);">分析系统需求，将领域拆分为多个子域（领域是问题空间，本质上就是大问题拆分为小问题）</font>
4. <font style="color:rgb(51, 51, 51);">抽取每个子域的领域概念，得到概念模型（概念模型存在于问题空间）</font>
5. <font style="color:rgb(51, 51, 51);">将子域的概念模型</font>**抽象**<font style="color:rgb(51, 51, 51);">并转化为领域模型（领域模型存在于解决方案空间，这一步是难点，考验抽象能力，如对关系的建模，如促销系统中抽象出促销产品，权限系统中抽象出授权）</font>
6. <font style="color:rgb(51, 51, 51);">找出领域模型中的聚合，以及每个聚合的聚合根</font>
7. <font style="color:rgb(51, 51, 51);">梳理聚合之间的关系</font>
8. <font style="color:rgb(51, 51, 51);">场景走查，检查领域模型如何满足用例需求</font>

#### 5.3 实战案例
商品发布场景建模过程：

[https://www.cnblogs.com/xishuai/p/ddd-product-design.html](https://www.cnblogs.com/xishuai/p/ddd-product-design.html)

#### 5.4 优势
<font style="color:#121212;">这是一种相对传统的建模方式，通过一些核心的用例作为作为突破点我们很容易得到一些概念模型和领域上下文划分的依据。根据当前系统能力和模型做一些领域职能划分和迭代。</font>

### 六、总结
上面介绍了三种方式帮助进行面向对象建模，只有进行了正确且合适的建模才能找到现实世界到软件程序的合理映射，数据结构也才更加明确，这样对软件开发，迭代，分工合作都有一个很好的基础。这里先大概介绍一下三种建模方式大概是怎么样的，后续我将分别采用不同案例去使用这些建模方法。同时我也将充分结合网上的一些案例，争取展示出使用这些发方法进行建模的多个案例。欢迎关注公众号，敬请期待。
