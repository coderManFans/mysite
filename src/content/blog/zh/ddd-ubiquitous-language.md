---
title: "DDD 中的通用语言是什么"
description: "介绍 DDD 中通用语言的概念、注意事项和来源，并讨论通用语言与领域特定语言 DSL 的关系及实际应用。"
pubDate: 2026-10-08
tags: ["DDD", "通用语言", "领域建模", "DSL", "四色建模"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "ddd-ubiquitous-language"
---
### 一、通用语言模式回顾
#### 1.1 通用语言模式（<font style="color:#000000;">U</font><font style="color:#000000;">BIQUITOUS </font><font style="color:#000000;">LANGUAGE</font>）
通用语言有时也叫统一语言，但是这里我们叫它通用语言。


**摘录**：U<font style="color:#000000;">BIQUITOUS LANGUAGE（通用语言）的词汇包括类和主要操作的名称。语言中的术语，有些用来讨论模型中已经明确的规则，还有一些则来自施加于模型上的高级组织原则。</font>

<font style="color:#000000;"></font>

#### <font style="color:#000000;">1.2 注意事项</font>
<font style="color:#000000;">将模型作为语言的支柱。确保团队在内部的所有交流中以及代码中坚持使用这种语言。在画图、写东西，特别是讲话时也要使用这种语言。通过尝试不同的表示方法（它们反映了备选模型）来消除难点。然后重构代码，重新命名类、方法和模块，以便与新模型保持一致。解决交谈中的术语混淆问题，就像我们对普通词汇形成一致的理解一样。要认识到，</font><font style="color:#000000;">U</font><font style="color:#000000;">BIQUITOUS </font><font style="color:#000000;">LANGUAGE的更改就是对模型的更改。领域专家应该抵制不合适或无法充分表达领域理解的术语或结构，开发人员应该密切关注那些将会妨碍设计的有歧义和不一致的地方。</font>

<font style="color:#000000;"></font>

#### <font style="color:#000000;">1.3 通用语言从哪里来</font>
俗语，俗话，术语，常用语，技术用语，活动概念

![DDD 中的通用语言是什么 图 1](/images/blog/ddd-ubiquitous-language/image-1.png)


### 二、通用语言与DSL
#### 2.1 DSL简介
**定义**：领域特定语言（英语：domain-specific language、DSL）指的是专注于某个[应用程序](https://baike.baidu.com/item/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F/5985445)领域的[计算机语言](https://baike.baidu.com/item/%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%AF%AD%E8%A8%80/4456504)。又译作领域专用语言。

源自<font style="color:#333333;">Martin Fowler大神的著作《领域特定语言》，是不是很熟悉呢。</font>

#### 2.2 通用语言与DSL的关系
通用语言其实跟DSL有相通之处，都是着重表达某个领域的业务名词，术语。只是通用语言更偏向于业务分析建模。而DSL则偏向于使用计算机技术将通用语言进行落地，进行模块化，自动化，让计算机通过一定的规则实现通用语言所表达的业务代码生成。

#### 2.3 参考文档
DSL的概念：[https://www.cnblogs.com/feng9exe/p/10901595.html](https://www.cnblogs.com/feng9exe/p/10901595.html)

前端DSL：[https://zhuanlan.zhihu.com/p/107947462](https://zhuanlan.zhihu.com/p/107947462)

百度百科：[https://baike.baidu.com/item/%E9%A2%86%E5%9F%9F%E7%89%B9%E5%AE%9A%E8%AF%AD%E8%A8%80/2826893?fr=aladdin](https://baike.baidu.com/item/%E9%A2%86%E5%9F%9F%E7%89%B9%E5%AE%9A%E8%AF%AD%E8%A8%80/2826893?fr=aladdin)

《领域特定语言》：[https://book.douban.com/subject/21964984/](https://book.douban.com/subject/21964984/)

### 三、生活&工作中的通用语言
这里我通过四色建模的方式试图寻找一些通用语言和术语，下面选取了三个领域做了一些调研。

#### 4.1 医疗领域
![DDD 中的通用语言是什么 图 2](/images/blog/ddd-ubiquitous-language/image-2.png)

#### 4.2 餐饮外卖领域
![DDD 中的通用语言是什么 图 3](/images/blog/ddd-ubiquitous-language/image-3.png)

#### 4.3 软件开发领域
![DDD 中的通用语言是什么 图 4](/images/blog/ddd-ubiquitous-language/image-4.png)


#### 4.4 总结
通过上面的分析我们可以知道，如果我们长期处于某个领域的话肯定会有一些术语，专用词，俗语来表达某个场景或者业务活动，或者人事物。这样的话我们需要通过这些通用语言来探索更深层次的
