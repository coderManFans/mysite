---
title: "DDD and CQRS Architecture"
description: "From CQS to CQRS: the trade-offs of combining CQRS with DDD and practical ways to integrate commands, queries, events, caching, and transactions."
pubDate: "2026-10-09"
tags: ["DDD", "CQRS", "CQS", "Event-Driven Architecture", "Domain Modeling"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-cqrs-architecture"
---
## 1. Origins of CQRS
### 1.1 CQS Theory
<font style="color:#4A4A4A;">Bertrand Meyer introduced Command-Query Separation (CQS) in his work. A command abstracts operations that change state, such as create, delete, and update, while a query returns information. Under CQS, a method should either execute a command or answer a query, but not do both. The idea also has similarities to the Command pattern.</font>

### 1.2 From CQS to CQRS
CQRS separates command and query responsibilities so each side can evolve around its own requirements. This also makes CQRS easier to combine with concepts such as commands and events. Greg Young's *CQRS Documents* provides a relatively complete explanation of the approach. Zhang Chi translated the material into Chinese; even after reading it several times, I found that some parts still require careful study. The translation is divided into four articles:

《Traditional Architecture》: [https://blog.zhangchi.fun/2020/04/28/CQRS-A-Stereotypical-Architecture/](https://blog.zhangchi.fun/2020/04/28/CQRS-A-Stereotypical-Architecture/)

《Task-Based User Interface》: [https://blog.zhangchi.fun/2020/04/29/CQRS-task-based-user-interface/](https://blog.zhangchi.fun/2020/04/29/CQRS-task-based-user-interface/)

《Command and Query Separation》: [https://blog.zhangchi.fun/2020/06/03/CQRS-CQRS/](https://blog.zhangchi.fun/2020/06/03/CQRS-CQRS/)

《Events as a Storage Mechanism》: [https://blog.zhangchi.fun/2020/06/12/EventsAsAStorageMechanism/](https://blog.zhangchi.fun/2020/06/12/EventsAsAStorageMechanism/)


## 2. Applying CQRS
### 2.1 Application Scenarios for CQRS
After reading many articles on CQRS, I found that most of them focus on explaining these concepts and some scenarios but do not provide clear instructions on how to use it or in which scenarios it is applicable. In fact, CQRS is not suitable for all scenarios. Here are some general application scenarios:

1. Read-heavy scenarios
2. Write-heavy scenarios
3. Read-write separation scenarios
4. Behavior-oriented, domain-driven scenarios
5. Scenarios requiring event tracing

### 2.2 CQRS and DDD Trade-offs
Many practitioners have tried to combine CQRS with DDD, and some have encountered significant difficulties while doing so. Greg Young discusses several of these issues in his CQRS material. They are not universal conclusions, but they suggest that DDD concepts can sometimes reduce the disruption CQRS introduces into a domain model. The following sections examine why this integration is difficult.

#### 2.2.0 CQRS's Technical Foundations
After reading many articles and translations, my intuition about CQRS is that its theoretical foundation is fundamentally technical. It optimizes current systems, models, and modules based on technology, making it a methodology derived from technological considerations. Therefore, this theory is different from the essence of DDD.

To elaborate further, DDD's core is object-oriented modeling, applicable to various industry domains. In contrast, each system essentially performs CRUD operations, which can be simplified as commands and queries. CQRS is an advanced version of CRUD, leading to discrepancies when trying to integrate it with DDD. Forcing DDD into CQRS would be difficult, making direct command and query handling or CRUD more efficient.

DDD, by contrast, does not prescribe explicit CRUD operations, even though persistence concerns inevitably appear in the infrastructure layer. Its primary focus is object-oriented modeling and the domain itself. This does not mean DDD and CQRS have nothing in common. The next sections compare the command and query sides of CQRS with DDD.

#### 2.2.1 Terminology Behind CQRS
Commands, queries, events, CRUD, impedance mismatch, responsibility separation, event storage, event streams

#### 2.2.2 The CQRS Command Side and DDD
In his paper <font style="color:#000000;">"CQRS Documents by Greg Young"</font>, Greg Young points out some issues in traditional domain-driven design code, such as:

1. Many query methods on repositories often include pagination or sorting information.
2. `Get` properties are exposed to create DTOs and reveal internal state of the domain.
3. When querying data, sometimes other data needs to be pre-queried (e.g., to get related value objects, one must first retrieve their aggregate roots).
4. Loading multiple aggregate roots to build DTOs can lead to suboptimal queries on the data model. Additionally, DTO construction operations may blur the boundaries of aggregates.

These problems do occur in DDD implementations, especially when domain code is constrained by the requirements of administration and operations systems. CQRS offers one possible response by separating queries. Commands that create, update, or delete data may not be explicit domain concepts, but their persistence concerns still appear in the infrastructure layer. Used selectively, CQRS can therefore improve a DDD codebase without redefining the domain model around CRUD.

In DDD projects or code, command-like or event-based operations are used for create, delete, and update actions. However, it's important to note that DDD focuses on business activities before, during, and after their occurrence. Therefore, commands should not be forcibly integrated into the domain layer.

How can I integrate command-style and event-driven methods in a DDD project or code? Here is a feasible approach: In the COLA architecture, application layer packages include:

- clientimpl: API implementation package for external services
- command: Command model
- consumer: Handles external messages

- executor: Processes requests, including commands and queries

- query: Query package

Both the command side and query side can live in the application layer and interact with `clientimpl`, which resembles the implementation layer for externally exposed Dubbo interfaces. Incoming API operations are translated into commands or queries and can optionally be dispatched through executors before invoking the domain layer. It is also possible to call domain services directly without introducing command objects. Commands become useful when they genuinely decouple the application layer from the domain layer or provide a clean integration point for events. Event consumers in the application layer can then be treated in much the same way as other entry points that invoke domain services.

#### 2.2.3 The CQRS Query Side and DDD
Similar issues exist for queries, meaning we need to address them. How to do so is a question since query paths from the application layer to the domain layer, then back through infrastructure layers can be long, involving data transformations and path dependencies. Additionally, separation means all query operations must be completely separated from create, delete, and update actions.

In systems like XXX management, querying lists is a necessary feature that can be separated. On the other hand, when the domain layer needs to retrieve related data via ID, no separation is needed. Therefore, we can separate relatively complex queries with fewer domain-specific features.

Using COLA's package strategy and four-layer architecture, suppose I have a query like blog or XXX order querying functionality, involving cache, NoSQL, MySQL, etc., as underlying storage engines. One implementation approach is to bypass the domain layer and directly call infrastructure layer services (Redis, ES, DAO) in the application layer's query package for data assembly and transformation. Another way is to establish factory classes and repository classes at the infrastructure layer to separate read-write operations. Aggregates can be freely combined based on requirements. Summarizing these solutions:

1. Cross-layer calls
2. Infrastructure layer (factory + repository) read-write separation

It's important to note that while these solutions have their merits, they also come with some disadvantages:

1. Query code may become repetitive.
2. The degree of query separation is hard to determine.
3. Queries cannot fully reflect the integrity of domain models.
4. As business evolves, query code may struggle to adapt, increasing maintenance costs.

## 3. Integrating CQRS
### 3.1 CQRS and Event-Driven Architecture Integration
Applying CQRS in practice can lead to a common mistake: coupling commands and events too tightly. The design then starts to emphasize commands and events instead of the domain behavior they are meant to support.

A lighter integration of CQRS with DDD and event-driven architecture avoids that trap. A command does not always need to be queued or persisted, and its completion does not always need to emit an event. When an event is required, it should generally follow the relevant domain operations and their outcome.

The infrastructure layer will usually already encapsulate message queue operations. Commands, domain operations, events, and message payloads remain separate concepts. A create command therefore should not automatically be bound to a corresponding create event; whether an event is emitted depends on the result of the domain operation.

### 3.2 CQRS and Cache Architecture Integration
In cache architectures, read-write operations are not strictly separated. How can we integrate CQRS with such a setup? Through call relationships, we know that CQRS relies on cache architecture, which could be local, remote, or multi-level caching. Ultimately, the infrastructure layer handles cache demands.

The key question is how the command and query sides should use cache services. The command side usually does not call the cache directly; cache updates occur as part of the underlying domain operation.

For queries, requests might call cache services through the application layer or repository + factory triggers. This involves data consistency issues since read separation means data could be new or old during reads. Queries struggle to perceive changes in data.

Another point is that objects have lifecycles in DDD, manifesting as objects persisting in memory for a period. A common approach is to return data from the database directly in service layers without state or data sharing across requests.

Thus, queries following DDD methods can lead to data consistency issues.

To address this, I think there are two ways:

1. Using locks
   Locks make queries aware; if there's a lock, queries need to wait until it is released.
2. Using version numbers or snapshots
   Queries include data version numbers; when the version number doesn't match, new data should be fetched.

### 3.3 CQRS and Transaction Integration
In CQRS architecture, queries are separated from transactions, seemingly unrelated. However, upon closer inspection, there is a connection. For example, ensuring data consistency during reads that involve transactions, or handling distributed transactions involving commands to events and other domain services.

A lightweight CQRS design can also limit transaction-related problems. When command and query packages both remain in the application layer, query separation does not require every repository query to be extracted from the domain path. Queries that participate in a transaction can remain where transaction boundaries require them.

Distributed transactions, transactional messaging, and eventual consistency still need appropriate infrastructure patterns. In this respect, commands and queries can be treated as outer-layer concerns, similar to adapters around an Onion Architecture core.

## 4. References
[https://www.raychase.net/259](https://www.raychase.net/259)

[https://www.infoq.cn/news/from-cqs-to-cqrs](https://www.infoq.cn/news/from-cqs-to-cqrs)

[https://www.cnblogs.com/netfocus/p/10861152.html](https://www.cnblogs.com/netfocus/p/10861152.html)

[https://www.eventstore.com/blog/event-sourcing-and-cqrs](https://www.eventstore.com/blog/event-sourcing-and-cqrs)

[https://blog.csdn.net/xichenguan/article/details/78810555](https://blog.csdn.net/xichenguan/article/details/78810555)
