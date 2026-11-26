---
title: "COLA Application Architecture: From 1.0 to 4.0"
description: "How Alibaba's COLA application architecture evolved: the complexity it targets, the changes from 1.0 through 4.0 and their packaging strategies, where it has been used, and its learning cost."
pubDate: 2026-11-26
tags: ["COLA", "DDD", "Application Architecture", "Packaging Strategy", "Architecture Evolution"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-cola-architecture"
---
Once business code reaches a certain size, complexity usually comes not from a hard technical problem but from technical details and business logic being tangled together. A small requirement means hunting through a dozen classes, adding one field means converting between DTOs, BOs, and DOs, and in review nobody can say clearly which layer is responsible for what.

COLA was proposed to address exactly this kind of problem. It is not new: since 2019 it has gone through four major revisions, and its thinking has shifted along the way, from adding mechanisms to removing them, and from framework constraints to structural conventions. These notes trace that evolution by version, then describe how it has worked out in my projects.

> Note: I wrote this shortly after COLA 4.0. The version numbers, module splits, and conclusions reflect that point in time. For the current implementation, refer to the official COLA repository and the author's blog.

## 1. Background

### 1.1 Origins

COLA originated in 2019. Zhang Jianfei, a senior technical expert at Alibaba, proposed and built it to address problems in Alibaba's CRM system. After applying it in practice, he found that it did reduce complexity in complex applications, so he developed it separately and iterated on it until it became a relatively mature application architecture approach.

### 1.2 Pain Points

Business logic is complex, technical details are hard to separate from business concerns, and the code becomes difficult to evolve.

### 1.3 What COLA Is

**COLA is an architectural approach.** It combines ideas from Onion Architecture, Ports and Adapters, DDD, Clean Architecture, and TMF, and it also comes with framework components. The full name is **Clean Object-oriented and Layered Architecture**.

### 1.4 Problems It Addresses

- Architecture for complex business systems.
- Managing modules in complex business code.
- Governing modules around domain contexts.
- Writing and evolving complex business logic.

## 2. COLA's Evolution

### 2.1 COLA 1.0

Key points:

1. Explains where complexity comes from.
2. Introduces ways to tackle it.
3. Proposes COLA and its initial architecture diagram.
4. Provides a COLA architecture model and scaffolding for building COLA projects.

Further reading:

- [Tackling Complexity: COLA Application Architecture](https://blog.csdn.net/significantfrank/article/details/85785565)
- [How Should We Write Complex Business Code?](https://blog.csdn.net/significantfrank/article/details/98087611)
- [Application Architecture: Separating Business Logic from Technical Details](https://blog.csdn.net/significantfrank/article/details/94593620)

### 2.2 COLA 2.0

Key points:

1. Revisits COLA 1.0: did it actually reduce application complexity?
2. Revises layering, component boundaries, extension-point design, and the role of internally shared libraries.
3. Adds project modules to the scaffolding and open-sources COLA.

Further reading:

- [Application Architecture COLA 2.0](https://blog.csdn.net/significantfrank/article/details/100074716)
- [Writing Complex Business Code](https://blog.csdn.net/significantfrank/article/details/101095244)

### 2.3 COLA 3.0

Key points:

1. COLA scaffolding becomes one of the architecture options in [Alibaba Cloud's Java application initializer](https://start.aliyun.com/).
2. Applies Occam's razor to trim the framework-oriented design of COLA 2.0.
3. Removes command, interceptor, converter, validator, assembler, and the extension-point mechanism.

Further reading: [COLA 3.0: Returning to Simplicity](https://blog.csdn.net/significantfrank/article/details/106976804)

### 2.4 COLA 3.1

Key points:

1. Reorganizes the essential elements of application architecture through classification.
2. Clarifies that COLA's core purpose is to define application structure and conventions: an architectural archetype.
3. Removes the Event Bus mechanism, standardizes packaging, and broadens the former controller layer's responsibilities.
4. Replaces Controller with Adapter.
5. Publishes revised architecture and module dependency diagrams.

The revised layer responsibilities are:

- **Adapter**: route user requests and adapt responses.
- **App**: accept requests and work with the domain layer to handle business operations.
- **Domain**: domain models and capabilities.
- **Infrastructure**: technical details such as databases, search, and RPC, together with anti-corruption adapters.

Further reading:

- [Application Architecture 3.1: Classification Thinking](https://blog.csdn.net/significantfrank/article/details/109529311)
- [Why Application Architecture Needs Classification Thinking](https://blog.csdn.net/significantfrank/article/details/110212058)

### 2.5 COLA 4.0

Key points:

1. Proposes best practices based on COLA.
2. Focuses application architecture on organizing code and modules.
3. Clarifies subpackage names and responsibilities.
4. Allows applications to adopt COLA architecture without depending on COLA's core framework.
5. Offers supporting components, including extension and state machine components.
6. Separates COLA into two parts:
   - **COLA architecture:** defining and building application architecture to improve application quality.
   - **COLA components:** reusable development components to improve engineering efficiency.

Further reading: [COLA 4.0: Best Practices for Application Architecture](https://blog.csdn.net/significantfrank/article/details/110934799)

## 3. COLA in Practice

### 3.1 My Projects

1. A CRM project for Qingwoniu's rental business.
2. A basketball operations management platform.

Other work borrowing COLA's packaging ideas:

1. A social posting demo project.

### 3.2 Enterprise Examples

Examples I have encountered:

- A company's payment center (built on COLA 2.0).
- An Ele.me project.

Examples shared by Zhang Jianfei:

1. LST Cloudstore.
2. Alibaba's Craftsmanship platform.
3. MMC Item-core.

## 4. Advantages and Trade-offs

**Advantages:** architectural conventions and guidance, plus reusable technical components.

**Trade-off:** there is a learning curve.

## 5. My Experience

I was skeptical of COLA at first, but my experience has changed that view. After several iterations it has become relatively mature, and from my own projects and conversations with other developers, many people are adopting its architectural ideas and packaging strategy. It offers a credible foundation for complex business systems.

Zhang Jianfei has acknowledged the learning cost. In my experience, it comes from several sources:

1. There are six modules. Their dependencies can be hard to understand, and deciding which framework belongs in each module takes experimentation. Moderately complex projects may not need all six, but can still benefit from COLA's architectural ideas.
2. Each module contains many packages. Less experienced developers may find it difficult to turn this structure into a substantial application.
3. Different COLA versions have different architectural snapshots and assumptions. Reading its evolution helps explain the author's intent.
4. At the time of writing, substantial examples integrating COLA with stacks such as Dubbo and Spring Cloud were limited, which made getting started harder.

The code examples later in the booklet use COLA's module and packaging ideas, so they can be adapted into runnable demos and read alongside this article.

## Further Reading

- [DDD Architecture Styles](/en/blog/ddd-architecture-styles/): where COLA sits among layered, hexagonal, onion, and clean architectures.
- [The DDD Handbook](/en/blog/ddd-handbook/): COLA within a broader DDD learning path.
- [DDD in Practice -- Social Relationships (Blog/Topic)](/en/blog/ddd-code-practice-social-blog-topic/): what this packaging strategy looks like in code.
