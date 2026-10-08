---
title: "DDD 中的模式"
description: "整理领域驱动设计中常见的概念、方法、策略和模式，涵盖领域模型、模型驱动设计、深层重构与战略设计。"
pubDate: 2026-10-08
tags: ["DDD", "领域驱动设计", "设计模式", "软件架构"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "ddd-patterns"
---
## 一、背景
在学DDD的时候我首先看的是《领域驱动设计-软件核心复杂性应对之道》，这本书里记录了很多概念，方法，思想，策略，模式等。整体读下来非常费劲但是收获也不小，如何转化为自己的能力就需要深入揣摩了。很多人觉得DDD门槛很高，或者DDD相关的概念，落地都比较杂，看得令人眼花缭乱，从网上找资料也很不全，不成体系，大部分都是别人一知半解的二次咀嚼思考的产物。因此DDD在很多工程师的眼里就像雾里看花一样，这里我通过这本书简单总结DDD里常见的概念，方法，思想，策略，以及本书没有提到的一些模式。

## 二、模式介绍
### 2.1 领域模型相关
#### 1. 通用语言模式（<font style="color:#000000;">U</font><font style="color:#000000;">BIQUITOUS </font><font style="color:#000000;">LANGUAGE</font>）
**摘录**：U<font style="color:#000000;">BIQUITOUS L</font><font style="color:#000000;">ANGUAGE（通用语言）的词汇包括类和主要操作的名称。语言中的术语，有些</font>

<font style="color:#000000;">用来讨论模型中已经明确的规则，还有一些则来自施加于模型上的高级组织原则。</font>

<font style="color:#000000;"></font>

#### 2. 模型驱动设计模式（<font style="color:#000000;">M</font><font style="color:#000000;">ODEL</font><font style="color:#000000;">-D</font><font style="color:#000000;">RIVEN </font><font style="color:#000000;">DESIGN</font>）
**摘录**：<font style="color:#000000;">MODEL</font><font style="color:#000000;">-D</font><font style="color:#000000;">RIVEN </font><font style="color:#000000;">D</font><font style="color:#000000;">ESIGN（模型驱动设计）不再将分析模型和程序设计分离开，而是寻求一种</font>

<font style="color:#000000;">能够满足这两方面需求的单一模型。</font>

<font style="color:#000000;"></font>

#### 3. 建模实践者模式（<font style="color:#000000;">H</font><font style="color:#000000;">ANDS</font><font style="color:#000000;">-O</font><font style="color:#000000;">N </font><font style="color:#000000;">MODELER</font>）
**摘录**：<font style="color:#000000;">任何参与建模的技术人员，不管在项目中的主要职责是什么，都必须花时间了解代码。任何负责修改代码的人员则必须学会用代码来表达模型。每一个开发人员都必须不同程度地参与模型讨论并且与领域专家保持联系。</font>

<font style="color:#000000;"></font>

### 2.2 模型驱动设计模式
#### 4. 分层模式（<font style="color:#000000;">L</font><font style="color:#000000;">AYERED </font><font style="color:#000000;">ARCHITECTURE</font>）
**摘录**：<font style="color:#000000;">给复杂的应用程序划分层次。在每一层内分别进行设计，使其具有内聚性并且只依赖于它的下层。采用标准的架构模式，只与上层进行松散的耦合。将所有与领域模型相关的代码放在一个层中，并把它与用户界面层、应用层以及基础设施层的代码分开。</font>

<font style="color:#000000;"></font>

#### 5. 反模式（<font style="color:#000000;">T</font><font style="color:#000000;">HE </font><font style="color:#000000;">S</font><font style="color:#000000;">MART UI</font>）
**摘录**：<font style="color:#000000;">许多软件项目都采用并且应该会继续采用一种不那么复杂的设计方法（</font> <font style="color:#000000;">用户界面、应用和领域糅合在一起），我称其为SMART UI（智能用户界面）</font>

<font style="color:#000000;"></font>

#### 6. 实体模式（<font style="color:#000000;">E</font><font style="color:#000000;">NTITY</font>）
**摘录**：<font style="color:#000000;">当一个对象由其标识（而不是属性）区分时，那么在模型中应该主要通过标识来确定该对象的定义。使类定义变得简单，并集中关注生命周期的连续性和标识。定义一种区分每个对象的方式，这种方式应该与其形式和历史无关。</font>

<font style="color:#000000;"></font>

#### 7. 值对象模式（<font style="color:#000000;">V</font><font style="color:#000000;">ALUE </font><font style="color:#000000;">OBJECT</font>）
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：用于描述领域的某个方面而本身没有概念标识的对象称为V</font><font style="color:#000000;">ALUE </font><font style="color:#000000;">O</font><font style="color:#000000;">BJECT</font><font style="color:#000000;">（值对象）。</font><font style="color:#000000;">VALUE OBJECT被实例化之后用来表示一些设计元素，对于这些设计元素，我们只关心它们是什么，而不关心它们是谁。</font>

<font style="color:#000000;"></font>

#### 8. 服务模式（SERVICE）
**摘录**：<font style="color:#000000;">有时，对象不是一个事物。在某些情况下，最清楚、最实用的设计会包含一些特殊的操作，这些操作从概念上讲不属于任何对象。与其把它们强制地归于哪一类，不如顺其自然地在模型中引入一种新的元素，这就是</font>

<font style="color:#000000;">SERVICE（服务）。</font>

<font style="color:#000000;"></font>

#### 9. 模块模式（MODULE/PACKAGE）
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：MODULE</font><font style="color:#000000;">为人们提供了两种观察模型的方式，一是可以在</font><font style="color:#000000;">M</font><font style="color:#000000;">ODULE中查看细节，而不会被整个模型淹没，二是观察</font><font style="color:#000000;">M</font><font style="color:#000000;">ODULE之间的关系，而不考虑其内部细节。领域层中的</font><font style="color:#000000;">M</font><font style="color:#000000;">ODULE</font><font style="color:#000000;">应该成为模型中有意义的部分，</font><font style="color:#000000;">MODULE从更大的角度描述了领域。</font>

<font style="color:#000000;"></font>

#### 10. 聚合根模式（AGGREGATE）
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：</font><font style="color:#000000;">AGGREGATE</font><font style="color:#000000;">就是一组相关对象的集合，我们把它作为数据修改的单元。每个</font><font style="color:#000000;">A</font><font style="color:#000000;">GGREGATE</font><font style="color:#000000;">都有一个根（</font><font style="color:#000000;">root</font><font style="color:#000000;">）和一个边界（</font><font style="color:#000000;">boundary）。边界定义了</font><font style="color:#000000;">A</font><font style="color:#000000;">GGREGATE</font><font style="color:#000000;">的内部都有什么。根则是</font><font style="color:#000000;">A</font><font style="color:#000000;">GGREGATE</font><font style="color:#000000;">所包含的一个特定</font><font style="color:#000000;">E</font><font style="color:#000000;">NTITY</font><font style="color:#000000;">。对</font><font style="color:#000000;">AGGREGATE而言，外部对象只可以引用根，而边界内部的对象之间则可以互相引用。除根以外的其他</font><font style="color:#000000;">E</font><font style="color:#000000;">NTITY</font><font style="color:#000000;">都有本地标识，但这些标识只</font><font style="color:#000000;">A</font><font style="color:#000000;">GGREGATE</font><font style="color:#000000;">内部才需要加以区别，因为外部对象除了根</font><font style="color:#000000;">ENTITY之外看不到其他对象。</font>

<font style="color:#000000;"></font>

#### 11. 工厂模式（FACTORY）
**摘录**：<font style="color:#000000;">当创建一个对象或创建整个</font><font style="color:#000000;">A</font><font style="color:#000000;">GGREGATE时，如果创建工作很复杂，或者暴露了过多的内部结构，则可以使用</font><font style="color:#000000;">FACTORY进行封装。</font>


#### 12. 仓库模式（ <font style="color:#000000;">REPOSITORY</font>）
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：</font><font style="color:#000000;">REPOSITORY将某种类型的所有对象表示为一个概念集合（通常是模拟的）。它的行为类似于集合（</font><font style="color:#000000;">collection</font><font style="color:#000000;">），只是具有更复杂的查询功能。在添加或删除相应类型的对象时，REPOSITORY的后台机制负责将对象添加到数据库中，或从数据库中删除对象。这个定义将一组紧密相关的职责集中在一起，这些职责提供了对</font><font style="color:#000000;">AGGREGATE根的整个生命周期的全程访问。</font>


### 2.3 深层重构模式
#### 13. 规格模式（<font style="color:#000000;">SPECIFICATION</font>）
**摘录**：<font style="color:#000000;">为特殊目的创建谓词形式的显式的V</font><font style="color:#000000;">ALUE </font><font style="color:#000000;">O</font><font style="color:#000000;">BJECT</font><font style="color:#000000;">。</font><font style="color:#000000;">SPECIFICATION就是一个谓词，可用来确定对象是否满足某些标准。</font>

<font style="color:#000000;"></font>

#### 14. 策略模式（STRATEGY）
**摘录**：<font style="color:#000000;">我们需要把过程中的易变部分提取到模型的一个单独的“策略”对象中。将规则与它所控制的行为区分开。按照</font><font style="color:#000000;">STRATEGY设计模式来实现规则或可替换的过程。策略对象的多个版本表示了完成过程的不同方式。</font>

<font style="color:#000000;"></font>

#### 15. 组合模式（<font style="color:#000000;">COMPOSITE</font>）
**摘录**：<font style="color:#000000;">定义一个把C</font><font style="color:#000000;">OMPOSITE</font><font style="color:#000000;">的所有成员都包含在内的抽象类型。在容器上实现那些查询信息的方</font>

<font style="color:#000000;">法时，这些方法返回由容器内容所汇总的信息。而“叶”节点则基于它们自己的值来实现这些方</font>

<font style="color:#000000;">法。客户只需使用抽象类型，而无需区分“叶”和容器。</font>

<font style="color:#000000;"></font>

#### 16. 无副作用的函数模式（<font style="color:#000000;">S</font><font style="color:#000000;">IDE</font><font style="color:#000000;">-E</font><font style="color:#000000;">FFECT</font><font style="color:#000000;">-F</font><font style="color:#000000;">REE </font><font style="color:#000000;">F</font><font style="color:#000000;">UNCTION</font>）
**摘录**：<font style="color:#000000;">尽可能把程序的逻辑放到函数中，因为函数是只返回结果而不产生明显副作用的操作。严格地把命令（引起明显的状态改变的方法）隔离到不返回领域信息的、非常简单的操作中。当发现了一个非常适合承担复杂逻辑职责的概念时，就可以把这个复杂逻辑移到</font><font style="color:#000000;">V</font><font style="color:#000000;">ALUE OBJECT中，这样可以进一步控制副作用。</font>

<font style="color:#000000;"></font>

#### 17. 断言模式（<font style="color:#000000;">ASSERTION</font>）
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：把操作的后置条件和类及A</font><font style="color:#000000;">GGREGATE</font><font style="color:#000000;">的固定规则表述清楚。如果在你的编程语言中不能直接编写</font><font style="color:#000000;">ASSERTION，那么就把它们编写成自动的单元测试。还可以把它们写到文档或图中（如果符合项目开发风格的话）。寻找在概念上内聚的模型，以便使开发人员更容易推断出预期的</font><font style="color:#000000;">ASSERTION，从而加快学习过程并避免代码矛盾。</font>

<font style="color:#000000;"></font>

#### 18. 概念轮廓模式（<font style="color:#000000;">C</font><font style="color:#000000;">ONCEPTUAL </font><font style="color:#000000;">C</font><font style="color:#000000;">ONTOUR</font>）
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：</font><font style="color:#000000;">把设计元素（操作、接口、类和AGGREGATE）分解为内聚的单元，在这个过程中，你对领域中一切重要划分的直观认识也要考虑在内。在连续的重构过程中观察发生变化和保证稳定的规律性，并寻找能够解释这些变化模式的底层</font><font style="color:#000000;">C</font><font style="color:#000000;">ONCEPTUAL </font><font style="color:#000000;">CONTOUR。使模型与领域中那些一致的方面（正是这些方面使得领域成为一个有用的知识体系）相匹配。</font>

<font style="color:#000000;"></font>

#### 19. 独立类模式（<font style="color:#000000;">S</font><font style="color:#000000;">TANDALONE </font><font style="color:#000000;">CLASS</font>）
**摘录**：<font style="color:#000000;">尽力把最复杂的计算提取到S</font><font style="color:#000000;">TANDALONE </font><font style="color:#000000;">C</font><font style="color:#000000;">LASS</font><font style="color:#000000;">（独立的类）中，实现此目的的一种方法是从存在大量依赖的类中将</font><font style="color:#000000;">V</font><font style="color:#000000;">ALUE </font><font style="color:#000000;">OBJECT建模出来。</font>


#### 20. 闭合操作模式（<font style="color:#000000;">C</font><font style="color:#000000;">LOSURE </font><font style="color:#000000;">O</font><font style="color:#000000;">F </font><font style="color:#000000;">O</font><font style="color:#000000;">PERATION</font>）
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：在适当的情况下，在定义操作时让它的返回类型与其参数的类型相同。如果实现者（implementer）的状态在计算中会被用到，那么实现者实际上就是操作的一个参数，因此参数和返回值应该与实现者有相同的类型。这样的操作就是在该类型的实例集合中的闭合操作。闭合操作提供了一个高层接口，同时又不会引入对其他概念的任何依赖。</font>

<font style="color:#000000;"></font>

#### 21. 释意接口模式（<font style="color:#000000;">I</font><font style="color:#000000;">NTENTION</font><font style="color:#000000;">-R</font><font style="color:#000000;">EVEALING </font><font style="color:#000000;">I</font><font style="color:#000000;">NTERFACES</font>）
**摘录**：<font style="color:#000000;">设计中的所有公共元素共同构成了接口，每个元素的名称都提供了揭示设计意图的机会。类型名称、方法名称和参数名称组合在一起，共同形成了一个INTENTION</font><font style="color:#000000;">-R</font><font style="color:#000000;">EVEALING </font><font style="color:#000000;">INTERFACE（释意接口）。</font>

<font style="color:#000000;"></font>

#### 22. 分析模式
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：在《分析模式》一书中，Martin Fowler这样定义分析模式[Fowler 1997, p. 8]：分析模式是一种概念集合，用来表示业务建模中的常见结构。它可能只与一个领域有关，也可能跨越多个领域。Fowler所提出的分析模式来自于实践经验，因此只要用在合适的情形下，它们会非常实用。对于那些面对着具有挑战性领域的人们，这些模式为他们的迭代开发过程提供了一个非常有价值的起点。“分析模式”这个名字本身就强调了其概念本质。分析模式并不是技术解决方案，他们只是些参考，用来指导人们设计特定领域中的模型。</font>

<font style="color:#000000;"></font>

### 2.4 战略设计模式
#### 23. 演进顺序模式（<font style="color:#000000;">E</font><font style="color:#000000;">VOLVING </font><font style="color:#000000;">O</font><font style="color:#000000;">RDER</font>）
**<font style="color:#000000;">摘录</font>**<font style="color:#000000;">：</font><font style="color:#000000;">让这种概念上的大型结构随着应用程序一起演变，甚至可以变成一种完全不同的结构风格。</font>

<font style="color:#000000;">不要依此过分限制详细的设计和模型决策，这些决策和模型决策必须在掌握了详细知识之后才能</font>

<font style="color:#000000;">确定。</font>

<font style="color:#000000;"></font>

#### 24. 系统隐喻模式（<font style="color:#000000;">S</font><font style="color:#000000;">YSTEM </font><font style="color:#000000;">M</font><font style="color:#000000;">ETAPHOR</font>）
**摘录**：<font style="color:#000000;">SYSTEM </font><font style="color:#000000;">METAPHOR（系统隐喻）是一种松散的、易于理解的大型结构，它与对象范式是协调的。当系统的一个具体类比正好符合团队成员对系统的想象，并且能够引导他们向着一个有用的方向进行思考时，就应该把这个类比用作一种大型结构。围绕这个隐喻来组织设计，并把它吸收到</font><font style="color:#000000;">U</font><font style="color:#000000;">BIQUITOUS </font><font style="color:#000000;">L</font><font style="color:#000000;">ANGUAGE</font><font style="color:#000000;">中</font><font style="color:#000000;">S</font><font style="color:#000000;">YSTEM </font><font style="color:#000000;">M</font><font style="color:#000000;">ETAPHOR应该既能促进系统的交流，又能指导系统的开发。它可以增加系统不同部分之间的一致性，甚至可以跨越不同的</font><font style="color:#000000;">B</font><font style="color:#000000;">OUNDED </font><font style="color:#000000;">CONTEXT。但所有隐喻都不是完全精确的，因此应不断检查隐喻是否过度或不恰当，当发现它起到妨碍作用时，要随时准备放弃它。</font>

<font style="color:#000000;"></font>

#### 25. 职责层模式（<font style="color:#000000;">R</font><font style="color:#000000;">ESPONSIBILITY </font><font style="color:#000000;">LAYER</font>）
**摘录**：<font style="color:#000000;">注意观察模型中的概念依赖性，以及领域中不同部分的变化频率和变化的原因。如果在领域中发现了自然的层次结构，就把它们转换为宽泛的抽象职责。这些职责应该描述系统的高层目的和设计。对模型进行重构，使得每个领域对象、</font><font style="color:#000000;">A</font><font style="color:#000000;">GGREGATE</font><font style="color:#000000;">和</font><font style="color:#000000;">MODULE的职责都清晰地位于一个职责层当中。</font>

<font style="color:#000000;"></font>

#### 26. 知识级别模式（<font style="color:#000000;">K</font><font style="color:#000000;">NOWLEDGE </font><font style="color:#000000;">L</font><font style="color:#000000;">EVEL</font>）
**摘录**：<font style="color:#000000;">创建一组不同的对象，用它们来描述和约束基本模型的结构和行为。把这些对象分为两个“级别”，一个是非常具体的级别，另一个级别则提供了一些可供用户或超级用户定制的规则和知识。</font>

<font style="color:#000000;"></font>

#### 27. 可拔插式框架模式（<font style="color:#000000;">P</font><font style="color:#000000;">LUGGABLE </font><font style="color:#000000;">C</font><font style="color:#000000;">OMPONENT </font><font style="color:#000000;">FRAMEWORK</font>）
**摘录**：<font style="color:#000000;">在深入理解和反复精炼基础上得到的成熟模型中，会出现很多机会。通常只有在同一个领域中实现了多个应用程序之后，才有机会使用P</font><font style="color:#000000;">LUGGABLE </font><font style="color:#000000;">C</font><font style="color:#000000;">OMPONENT </font><font style="color:#000000;">FRAMEWORK（可插入式组件框架）。</font>

<font style="color:#000000;"></font>

#### 28. 抽象核心模式（<font style="color:#000000;">A</font><font style="color:#000000;">BSTRACT </font><font style="color:#000000;">C</font><font style="color:#000000;">ORE</font>）
**摘录**：<font style="color:#000000;">把模型中最基本的概念识别出来，并分离到不同的类、抽象类或接口中。设计这个抽象模型，使之能够表达出重要组件之间的大部分交互。把这个完整的抽象模型放到它自己的</font><font style="color:#000000;">M</font><font style="color:#000000;">ODULE中，而专用的、详细的实现类则留在由子领域定义的</font><font style="color:#000000;">MODULE中。</font>


#### 29. 分离核心模式（<font style="color:#000000;">S</font><font style="color:#000000;">EGREGATED </font><font style="color:#000000;">CORE</font>）
**摘录**：<font style="color:#000000;">对模型进行重构，把核心概念从支持性元素（包括定义得不清楚的那些元素）中分离出来，并增强</font><font style="color:#000000;">C</font><font style="color:#000000;">ORE的内聚性，同时减少它与其他代码的耦合。把所有通用元素或支持性元素提取到其他对象中，并把这些对象放到其他的包中——即使这会把一些紧密耦合的元素分开。</font>

<font style="color:#000000;"></font>

#### 30. 内聚模式（<font style="color:#000000;">C</font><font style="color:#000000;">OHESIVE </font><font style="color:#000000;">M</font><font style="color:#000000;">ECHANISM</font>）
**摘录**：<font style="color:#000000;">把概念上的COHESIVE </font><font style="color:#000000;">M</font><font style="color:#000000;">ECHANISM（内聚机制）分离到一个单独的轻量级框架中。要特别注意公式或那些有完备文档的算法。用一个</font><font style="color:#000000;">I</font><font style="color:#000000;">NTENTION</font><font style="color:#000000;">-R</font><font style="color:#000000;">EVEALING </font><font style="color:#000000;">INTERFACE来暴露这个框架的功能。现在，领域中的其他元素就可以只专注于如何表达问题（做什么）了，而把解决方案的复杂细节（如何做）转移给了框架。</font>

<font style="color:#000000;"></font>

#### 31. 公开发布模式<font style="color:#444444;">（</font><font style="color:#000000;">P</font><font style="color:#000000;">UBLISHED </font><font style="color:#000000;">L</font><font style="color:#000000;">ANGUAGE</font><font style="color:#444444;">）</font>
**<font style="color:#444444;">摘录</font>**<font style="color:#444444;">：</font><font style="color:#000000;">把一个良好文档化的、能够表达出所需领域信息的共享语言作为公共的通信媒介，必要时在其他信息与该语言之间进行转换。</font>

<font style="color:#000000;"></font>

#### 32. 上下文模式（<font style="color:#000000;">B</font><font style="color:#000000;">OUNDED </font><font style="color:#000000;">CONTEXT</font>）
**摘录**：<font style="color:#000000;">明确地定义模型所应用的上下文。根据团队的组织、软件系统的各个部分的用法以及物理表现（代码和数据库模式等）来设臵模型的边界。在这些边界中严格保持模型的一致性，而不要受到边界之外问题的干扰和混淆。</font>

<font style="color:#000000;"></font>

#### 33. 核心领域模式（<font style="color:#000000;">C</font><font style="color:#000000;">ORE </font><font style="color:#000000;">DOMAIN</font>）
**摘录**：<font style="color:#000000;">对模型进行提炼。找到C</font><font style="color:#000000;">ORE </font><font style="color:#000000;">D</font><font style="color:#000000;">OMAIN</font><font style="color:#000000;">并提供一种易于区分的方法把它与那些起辅助作用的模型和代码分开。最有价值和最专业的概念要轮廓分明。尽量压缩</font><font style="color:#000000;">C</font><font style="color:#000000;">ORE </font><font style="color:#000000;">D</font><font style="color:#000000;">OMAIN。让最有才能的人来开发</font><font style="color:#000000;">C</font><font style="color:#000000;">ORE </font><font style="color:#000000;">D</font><font style="color:#000000;">OMAIN</font><font style="color:#000000;">，并据此要求进行相应的招聘。在</font><font style="color:#000000;">C</font><font style="color:#000000;">ORE </font><font style="color:#000000;">DOMAIN中努力开发能够确保实现系统蓝图的深层模型和柔性设计。仔细判断任何其他部分的投入，看它是否能够支持这个提炼出来的</font><font style="color:#000000;">CORE。</font>

<font style="color:#000000;"></font>

#### 34. 突出核心模式（<font style="color:#000000;">H</font><font style="color:#000000;">IGHLIGHTED </font><font style="color:#000000;">CORE</font>）
**摘录**：<font style="color:#000000;">编写一个非常简短的文档（3</font><font style="color:#000000;">～</font><font style="color:#000000;">7</font><font style="color:#000000;">页，每页内容不必太多），用于描述</font><font style="color:#000000;">C</font><font style="color:#000000;">ORE </font><font style="color:#000000;">D</font><font style="color:#000000;">OMAIN</font><font style="color:#000000;">以及</font><font style="color:#000000;">CORE元素之间的主要交互过程。</font> <font style="color:#000000;">把模型的主要存储库中的</font><font style="color:#000000;">C</font><font style="color:#000000;">ORE </font><font style="color:#000000;">D</font><font style="color:#000000;">OMAIN标记出来，不用特意去阐明其角色。使开发人员很容</font>

<font style="color:#000000;">易就知道什么在核心内，什么在核心外。</font>

<font style="color:#000000;"></font>

#### 35. 通用子领域模式（<font style="color:#000000;">G</font><font style="color:#000000;">ENERIC </font><font style="color:#000000;">SUBDOMAIN</font>）
**摘录**：<font style="color:#000000;">识别出那些与项目意图无关的内聚子领域。把这些子领域的通用模型提取出来，并放到单独的</font><font style="color:#000000;">M</font><font style="color:#000000;">ODULE中。任何专有的东西都不应放在这些模块中。把它们分离出来以后，在继续开发的过程中，它们的优先级应低于</font><font style="color:#000000;">C</font><font style="color:#000000;">ORE </font><font style="color:#000000;">DOMAIN的优先级，并且不要分派核心开发人员来完成这些任务（因为他们很少能够从这些任务中获得领域知识）。此外，还可以考虑为这些</font><font style="color:#000000;">G</font><font style="color:#000000;">ENERIC </font><font style="color:#000000;">S</font><font style="color:#000000;">UBDOMAIN使用现成的解决方案或“公开发布的模型”（</font><font style="color:#000000;">P</font><font style="color:#000000;">UBLISHED </font><font style="color:#000000;">MODEL）。</font>

<font style="color:#000000;"></font>

<font style="color:#000000;"></font>

#### 36. 持续集成模式(<font style="color:#000000;">C</font><font style="color:#000000;">ONTINUOUS </font><font style="color:#000000;">I</font><font style="color:#000000;">NTEGRATION</font>)
**摘录**：<font style="color:#000000;">CONTINUOUS </font><font style="color:#000000;">INTEGRATION是指把一个上下文中的所有工作足够频繁地合并到一起，并使它们保持一致，以便当模型发生分裂时，可以迅速发现并纠正问题。像领域驱动设计中的其他方法一样，</font><font style="color:#000000;">C</font><font style="color:#000000;">ONTINUOUS </font><font style="color:#000000;">I</font><font style="color:#000000;">NTEGRATION</font><font style="color:#000000;">也有两个级别的操作：</font><font style="color:#000000;">(1) </font><font style="color:#000000;">模型概念的集成；(2) 实现的集成。</font>

<font style="color:#000000;"></font>

#### 37. 上下文图模式（ <font style="color:#000000;">C</font><font style="color:#000000;">ONTEXT </font><font style="color:#000000;">MAP</font>）
**摘录**：<font style="color:#000000;">CONTEXT </font><font style="color:#000000;">MAP位于项目管理和软件设计的重叠部分。按照常规，人们往往按团队组织的轮廓来划定边界。紧密协作的人会很自然地共享一个模型上下文。不同团队的人员（或者在同一个团队中但从不交流的人）将使用不同的上下文。</font>

<font style="color:#000000;"></font>

#### 38. 共享内核模式（<font style="color:#000000;">S</font><font style="color:#000000;">HARED </font><font style="color:#000000;">KERNEL</font>）
**摘录**：<font style="color:#000000;">从领域模型中选出两个团队都同意共享的一个子集。当然，除了这个模型子集以外，还包括与该模型部分相关的代码子集，或数据库设计的子集。这部分明确共享的内容具有特殊的地位，一个团队在没与另一个团队商量的情况下不应擅自更改它。功能系统要经常进行集成，但集成的频率应该比团队中</font><font style="color:#000000;">C</font><font style="color:#000000;">ONTINUOUS </font><font style="color:#000000;">INTEGRATION的频率低一些。在进行这些集成的时候，两个团队都要运行测试。</font>


#### 39. <font style="color:#444444;">客户/供应商开发团队模式（</font> <font style="color:#000000;">C</font><font style="color:#000000;">USTOMER</font><font style="color:#000000;">/S</font><font style="color:#000000;">UPPLIER </font><font style="color:#000000;">D</font><font style="color:#000000;">EVELOPMENT </font><font style="color:#000000;">T</font><font style="color:#000000;">EAM</font><font style="color:#444444;">）</font>
**<font style="color:#444444;">摘录</font>**<font style="color:#444444;">：</font><font style="color:#000000;">在两个团队之间建立一种明确的客户/供应商关系。在计划会议中，下游团队相当于上游团队的客户。根据下游团队的需求来协商需要执行的任务并为这些任务做预算，以便每个人都知道双方的约定和进度。两个团队共同开发自动化验收测试，用来验证预期的接口。把这些测试添加到上游团队的测试套件中，以便作为其持续集成的一部分来运行。这些测试使上游团队在做出修改时不必担心对下游团队产生副作用。</font>

<font style="color:#444444;"></font>

#### <font style="color:#444444;">40. 跟随者模式（</font><font style="color:#000000;">C</font><font style="color:#000000;">ONFORMIST</font><font style="color:#444444;">）</font>
<font style="color:#444444;">摘录：</font><font style="color:#000000;">通过严格遵从上游团队的模型，可以消除在B</font><font style="color:#000000;">OUNDED </font><font style="color:#000000;">C</font><font style="color:#000000;">ONTEXT之间进行转换的复杂性。尽管这会限制下游设计人员的风格，而且可能不会得到理想的应用程序模型，但选择</font><font style="color:#000000;">CONFORMITY模式可以极大地简化集成。此外，这样还可以与供应商团队共享</font><font style="color:#000000;">U</font><font style="color:#000000;">BIQUITOUS </font><font style="color:#000000;">LANGUAGE。供应商处于统治地位，因此最好使沟通变容易。他们从利他主义的角度出发，会与你分享信息。</font>

<font style="color:#000000;"></font>

#### <font style="color:#444444;">41. 防腐层模式/防护模式（</font><font style="color:#000000;">A</font><font style="color:#000000;">NTICORRUPTION </font><font style="color:#000000;">L</font><font style="color:#000000;">AYER</font><font style="color:#444444;">）</font>
**<font style="color:#444444;">摘录</font>**<font style="color:#444444;">：</font><font style="color:#000000;">创建一个隔离层，以便根据客户自己的领域模型来为客户提供相关功能。这个层通过另一个系统现有接口与其进行对话，而只需对那个系统作出很少的修改，甚至无需修改。在内部,这个层在两个模型之间进行必要的双向转换。它是在不同的模型和协议之间转换概念对象和操作的机制。</font>

<font style="color:#000000;"></font>

#### <font style="color:#444444;">42. 各行其道模式/懒集成模式（</font><font style="color:#000000;">S</font><font style="color:#000000;">EPARATE </font><font style="color:#000000;">W</font><font style="color:#000000;">AY</font><font style="color:#444444;">）</font>
**摘录**：<font style="color:#000000;">集成总是代价高昂，而有时获益却很小。因此声明一个与其他上下文毫无关联的B</font><font style="color:#000000;">OUNDED </font><font style="color:#000000;">CONTEXT，使开发人员能够在这个小范围内找到简单、专用的解决方案。</font>

<font style="color:#000000;"></font>

#### <font style="color:#444444;">43. 开放主机服务模式（</font><font style="color:#000000;">O</font><font style="color:#000000;">PEN </font><font style="color:#000000;">H</font><font style="color:#000000;">OST </font><font style="color:#000000;">SERVICE</font><font style="color:#444444;">）</font>
**<font style="color:#444444;">摘录</font>**<font style="color:#444444;">：</font><font style="color:#000000;">定义一个协议，把你的子系统作为一组SERVICE供其他系统访问。开放这个协议，以便所有需要与你的子系统集成的人都可以使用它。当有新的集成需求时，就增强并扩展这个协议，但个别团队的特殊需求除外。满足这种特殊需求的方法是使用一次性的转换器来扩充协议，以便使共享协议简单且内聚。</font>

<font style="color:#000000;"></font>

#### <font style="color:#444444;">44. 愿景声明模式（</font> <font style="color:#000000;">D</font><font style="color:#000000;">OMAIN </font><font style="color:#000000;">V</font><font style="color:#000000;">ISION </font><font style="color:#000000;">S</font><font style="color:#000000;">TATEMENT</font><font style="color:#444444;">）</font>
**<font style="color:#444444;">摘录</font>**<font style="color:#444444;">：</font><font style="color:#000000;">写一份C</font><font style="color:#000000;">ORE DOMAIN的简短描述（大约一页纸）以及它将会创造的价值，也就是“价值主张”。那些不能将你的领域模型与其他领域模型区分开的方面就不要写了。展示出领域模型是如何实现和均衡各方利益的。这份描述要尽量精简。尽早把它写出来，随着新的理解随时修改它。D</font><font style="color:#000000;">OMAIN </font><font style="color:#000000;">V</font><font style="color:#000000;">ISION </font><font style="color:#000000;">STATEMENT可以用作一个指南，它帮助开发团队在精炼模型和代码的过程中保持统一的方向。团队中的非技术成员、管理层甚至是客户也都可以共享领域愿景说明（当然，包含专有信息的情况除外）</font><font style="color:#000000;">。</font>

<font style="color:#000000;"></font>

#### <font style="color:#444444;">45. 事件溯源模式（EVENT SOURCING）</font>
**<font style="color:#444444;">摘录</font>**<font style="color:#444444;">：将领域中所发生的活动建模成一系列的离散事件，每个对象都用领域对象来表示。领域事件是领域模型的组成部分，表示领域中所发生的事情。</font>

<font style="color:#444444;"></font>

#### <font style="color:#444444;">46. 大泥球模式（</font>BIG BALL OF MUD<font style="color:#444444;">）</font>
**摘录**：大泥球<font style="color:#4A4A4A;">，是指杂乱无章、错综复杂、邋遢不堪、随意拼贴的大堆代码。</font>


## 三、总结
上面的模式基本上都是照抄书里的内容，每个模式都用一段话阐述大概是什么意思。很多模式其实没有直接且准确的概念，我对这些模式也刚刚了解，因此也不能随便就给出一段定义。这个跟设计模式类似，我将DDD里的各种概念，方法，策略，现象，模式等统称为模式一方面是为了跟经典的书本里保持一致，另外一方面也往设计模式上靠拢，说白了就是DDD设计模式。但是设计模式基本上很多人都了解和应用过，入门也不是特别难，建议想学DDD的可以先学一些设计模式。这里多说两句设计模式有23种，6大设计原则，体系化的学下来对系统设计，代码优化，架构设计都有非常好的帮助。

两种模式本质上都表达了如何将面向对象设计进行落地的意思。在<font style="color:#231F20;">Eric Evans的观点里设计模式里面是偏技术性的，而DDD里的这些模式则是偏理论或者偏模型上的，这些模式是为了梳理领域对象，领域模型之间的关系如何构建，如何管理，所以看上去更难理解。</font>

<font style="color:#231F20;">希望通过本文大家可以对DDD的一些常见的概念，方法，策略，模式有一些认识。当然如果想了解或者深入学习我还是建议大家多看看DDD的经典书籍。</font>

## <font style="color:#231F20;">四、参考</font>
<font style="color:#231F20;">《领域驱动设计-软件核心复杂性应对之道》</font>

<font style="color:#231F20;">《实现领域驱动设计》</font>

[https://www.infoq.cn/article/2010/09/big-ball-of-mud](https://www.infoq.cn/article/2010/09/big-ball-of-mud)

[http://www.laputan.org/mud/](http://www.laputan.org/mud/)
