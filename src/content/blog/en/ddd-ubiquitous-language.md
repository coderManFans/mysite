---
title: "What Is Ubiquitous Language in DDD?"
description: "An introduction to Ubiquitous Language in Domain-Driven Design (DDD), including its purpose, sources, relationship with domain-specific languages (DSLs), and examples from different fields."
pubDate: "2026-10-08"
tags: ["DDD", "Ubiquitous Language", "Domain Modeling", "DSL", "Four-color modeling"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-ubiquitous-language"
---
## Ubiquitous Language: A Review

#### 1.1 Ubiquitous Language
Ubiquitous Language is sometimes called a shared or unified language. In this article, I use the standard DDD term, Ubiquitous Language.

**Quote**: The vocabulary of Ubiquitous Language includes the names of classes and primary operations. Terms in the language are used to discuss rules that are already explicitly defined within the model, as well as principles from higher-level organizational practices applied to the model.

#### 1.2 Notes
Model the domain as a language pillar. Ensure that the team uses this language consistently in all internal communications and code. Use it when drawing diagrams, writing documents, especially during discussions. Try different representations (which reflect alternative models) to address complexities. Then refactor the code, rename classes, methods, and modules to align with the new model. Resolve term ambiguities as we do for common vocabulary. Recognize that changes in Ubiquitous Language are changes in the model. Domain experts should resist terms or structures that are inappropriate or insufficiently expressive of domain understanding. Developers should pay close attention to ambiguous and inconsistent places that could hinder design.

#### 1.3 Where Does Ubiquitous Language Come From
Slang, idioms, jargon, common expressions, technical terms, activity concepts

![Ubiquitous Language in DDD: terminology overlap](/images/blog/ddd-ubiquitous-language/image-1.png)


## Ubiquitous Language and DSLs

#### 2.1 Introduction to DSL
**Definition**: A domain-specific language (DSL) refers to a computer language specialized for a particular [application domain](https://baike.baidu.com/item/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F/5985445). Also known as a domain-specific language.

Inspired by Martin Fowler's book Domain-Specific Languages.

#### 2.2 Relationship Between Ubiquitous Language and DSL
Ubiquitous language shares similarities with DSLs; both focus on expressing business nouns and terms in a specific domain. However, ubiquitous language is more oriented towards business analysis modeling, while DSLs lean toward using computer technology to implement the ubiquitous language, modularize it, automate it, and generate business code based on certain rules.

#### 2.3 References
DSL Concepts: [https://www.cnblogs.com/feng9exe/p/10901595.html](https://www.cnblogs.com/feng9exe/p/10901595.html)

Frontend DSL: [https://zhuanlan.zhihu.com/p/107947462](https://zhuanlan.zhihu.com/p/107947462)

Baidu Encyclopedia: [https://baike.baidu.com/item/%E9%A2%86%E5%9F%9F%E7%89%B9%E5%AE%9A%E8%AF%AD%E8%A8%80/2826893?fr=aladdin](https://baike.baidu.com/item/%E9%A2%86%E5%9F%9F%E7%89%B9%E5%AE%9A%E8%AF%AD%E8%A8%80/2826893?fr=aladdin)

Domain-Specific Language: [https://book.douban.com/subject/21964984/](https://book.douban.com/subject/21964984/)


## Ubiquitous Language in Life and Work

Here I attempt to find some ubiquitous language and terms through the four-color modeling method. Below are three fields where we conducted a survey.

#### 4.1 Healthcare Field
![Ubiquitous Language in DDD: healthcare domain](/images/blog/ddd-ubiquitous-language/image-2.png)

#### 4.2 Food Delivery Field
![Ubiquitous Language in DDD: food delivery domain](/images/blog/ddd-ubiquitous-language/image-3.png)

#### 4.3 Software Development Field
![Ubiquitous Language in DDD: software development domain](/images/blog/ddd-ubiquitous-language/image-4.png)


#### 4.4 Summary
From the above analysis, we can see that if one spends a long time in a particular field, there will be some terms, jargon, and idioms to express certain scenarios or business activities, or people and things. Therefore, we need to use these ubiquitous languages to explore deeper insights.
