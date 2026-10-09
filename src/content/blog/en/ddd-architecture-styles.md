---
title: "DDD Architecture Styles"
description: "An overview of traditional, hexagonal, event-driven, clean, layered, onion, CQRS, COLA, and REST architectures, with guidance on where each style fits in DDD practice."
pubDate: "2026-10-09"
tags: ["DDD", "Architecture Design", "Hexagonal Architecture", "CQRS", "COLA"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-architecture-styles"
---
![DDD Architecture Styles Image 1](/images/blog/ddd-architecture-styles/image-1.png)

### 1. Traditional Architecture
#### 1.1 Overview
This diagram represents an initial step from a traditional architecture toward DDD. It contains some DDD characteristics, but the domain boundaries are not yet clearly defined. At this stage, the goal is to summarize and refine the traditional system architecture.

#### 1.2 Architecture Diagram
![DDD Architecture Styles Image 2](/images/blog/ddd-architecture-styles/image-2.png)

#### 1.3 Implementation Scenarios
For applications with a user interface, MVC is another option. It is generally less suitable for large systems, but works well for administration systems, operational consoles, and similar projects.

### 2. Hexagonal Architecture / Ports and Adapters
#### 2.1 Overview
Hexagonal Architecture, also known as Ports and Adapters, emphasizes symmetry between an application and the outside systems that interact with it. Although ports appear explicitly in the model, the practical focus is on keeping the application core isolated behind adapters.

#### 2.2 Architecture Diagram
![DDD Architecture Styles Image 3](/images/blog/ddd-architecture-styles/image-3.png)

#### 2.3 Implementation Scenarios
Hexagonal Architecture mainly applies to large and complex application systems, including various management platforms, computing platforms, data platforms, etc. By integrating different clients through ports and adapters, this architecture has a high stability and flexibility in DDD.

### 3. Event-Driven Architecture
#### 3.1 Overview
Event-driven architecture received relatively little attention in early software development, but became more prominent as DDD evolved and practitioners applied it to distributed systems. It lets applications collaborate while retaining their own responsibilities. The following localized diagram, based on *Enterprise Integration Patterns*, shows application integration from the perspective of messages and events.

#### 3.2 Architecture Diagram
![DDD Architecture Styles Image 4](/images/blog/ddd-architecture-styles/image-4.png)

#### 3.3 Implementation Scenarios
State machines and workflow systems are natural use cases for event-driven architecture. It also fits IoT scenarios where sensors send events to backend services. More broadly, events are useful for decoupling applications and integrating independent systems.

### 4. Clean Architecture
#### 4.1 Overview
Clean Architecture was proposed in "Clean Architecture: A Craftsman's Guide" as an architectural style. This architecture shares similarities with the Onion Architecture and Hexagonal Architecture through the principle of dependency inversion. Each module is layered, with outer layers depending on inner layers, making them more stable. In Clean Architecture, adapters and interfaces are abstracted, so they are not specifically marked in the diagram. Therefore, it is an idealized architectural model. It should be noted that Clean Architecture and traditional DDD architecture or layer-based architecture do not necessarily follow a four-layer or five-layer structure; layers can be defined based on actual applications.

#### 4.2 Architecture Diagram
![DDD Architecture Styles Image 5](/images/blog/ddd-architecture-styles/image-5.png)

#### 4.3 Implementation Scenarios

### 5. Service-Oriented Architecture (SOA)
#### 5.1 Overview
This service-oriented architecture, discussed in *Microservices Patterns*, combines DDD patterns with Hexagonal Architecture to organize a system as cooperating services. A single architecture diagram can show the upstream and downstream relationships of core services together with the capabilities each service provides. The model also incorporates REST and event-driven messaging.

#### 5.2 Architecture Diagram
![DDD Architecture Styles Image 6](/images/blog/ddd-architecture-styles/image-6.png)

#### 5.3 Implementation Scenarios
This approach is suitable for scenarios where single monolithic services need to be split into multiple services, or when an application consists of multiple services.

### 6. Layered Architecture
#### 6.1 Overview
The concept of layering has been prevalent in the computer field since early times but gradually became deeply ingrained with the development of software systems. The purpose is still to decompose the inherent complexity of applications through layers and stabilize modules while constraining unstable ones via dependency inversion. Layered architecture is one of the most widely applied architectural styles, seen in Clean Architecture, Onion Architecture, and Hexagonal Architecture.

#### 6.2 Architecture Diagram
![DDD Architecture Styles Image 7](/images/blog/ddd-architecture-styles/image-7.png)

#### 6.3 Implementation Scenarios
For applications that are monolithic and need iterative optimization to reduce complexity through modular packaging and layering.

For applications supporting multiple business scenarios with different clients, layering can help isolate core modules for increased stability.

### 7. Onion Architecture
#### 7.1 Overview
Onion Architecture uses layers to isolate business modules with different responsibilities. Once Clean Architecture and Hexagonal Architecture are understood, its dependency model is relatively easy to follow. It has many variations, but typically places infrastructure toward the outside and the domain model toward the center. Although it aligns well with DDD, it can also be applied to other complex systems.

#### 7.2 Architecture Diagram
![DDD Architecture Styles Image 8](/images/blog/ddd-architecture-styles/image-8.png)

#### 7.3 Implementation Scenarios
For monolithic complex services or applications composed of multiple microservices.

### 8. CQRS Architecture
#### 8.1 Overview
CQRS separates CRUD responsibilities into command and query models. Its full name is Command Query Responsibility Segregation. The diagram below was localized from Martin Fowler's website and illustrates how CQRS can be applied. By separating reads from writes, CQRS can reduce the complexity of certain CRUD-heavy systems and complement DDD where that separation is justified.

#### 8.2 Architecture Diagram
![DDD Architecture Styles Image 9](/images/blog/ddd-architecture-styles/image-9.png)

#### 8.3 Implementation Scenarios
In complex applications with numerous CRUD operations and intricate query and update scenarios involving multiple clients.

### 9. COLA Architecture
#### 9.1 Overview
COLA is an architecture developed by an Alibaba technical expert by combining several established architectural styles. It was one of the first practical DDD architecture approaches proposed by a Chinese practitioner. It has been applied in multiple internal projects, and other organizations have also experimented with DDD and COLA for complex business systems. The architecture has continued to mature and provides concrete implementation patterns.

#### 9.2 Architecture Diagram
![DDD Architecture Styles Image 10](/images/blog/ddd-architecture-styles/image-10.png)

#### 9.3 Implementation Scenarios
Suitable for large-scale business websites or scenarios where multiple large applications need to be decoupled.

Currently, COLA architecture version 4.0 has been released, allowing the use of COLA's suite to generate code that adheres to DDD principles, thereby reducing the complexity in implementing DDD in relatively complex applications.

### 10. REST Architecture
#### 10.1 Overview
This architectural style is found in "Microservice Design Patterns," essentially building multiple microservices using a RESTful HTTP protocol and combining it with Hexagonal Architecture for complex business development from a REST perspective. This architecture style is widely applied as well.

#### 10.2 Architecture Diagram
![DDD Architecture Styles Image 11](/images/blog/ddd-architecture-styles/image-11.png)

#### 10.3 Implementation Scenarios
For applications that need to be split into multiple services from a monolithic service, and where there are different types of clients requiring integration.

Also suitable for scenarios where microservices based on REST are initially adopted, using domain identification and gateways to build the entire application service engineering.

### 11. References
- "Clean Architecture: A Craftsman's Guide"
- "Implementing Domain-Driven Design"
- "Microservice Design Patterns"
- "Domain-Driven Design - Tackling Complexity in the Heart of Software"
- "CQRS Documents by Greg Young"

[https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
[https://www.enterpriseintegrationpatterns.com/patterns/messaging/](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)
[https://martinfowler.com/bliki/CQRS.html](https://martinfowler.com/bliki/CQRS.html)

### 12. Summary
Many architectural styles are related: some are tied to particular frameworks, while others are conceptual models. A single article cannot cover every detail or variation. Future articles will examine CQRS, Onion Architecture, and event-driven architecture in more depth, including how they can be combined with DDD patterns in practical systems.
