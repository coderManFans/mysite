---
title: "DDD and Event Message Architecture"
description: "Introduce event sourcing and event-driven architecture in DDD, outline common event message architectural styles, their application scenarios, and high-availability risks."
pubDate: "2026-10-09"
tags: ["DDD", "event-driven", "Event Sourcing", "Message Architecture", "Kafka"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-event-messaging-architecture"
---
### 1. Event Sourcing and DDD
#### 1.1 Event Sourcing
**Extract**: Activities in the domain are modeled as a series of discrete events, with each object represented by a domain entity. Domain events are part of the domain model and represent what happens within the domain.

#### 1.2 The Role of Event-Driven Architecture in DDD
Event-driven architecture actually fills a gap when transitioning from monolithic services to distributed services. In monolithic services, interactions between different domain services might be very simple—just requests and responses. However, with microservices and distribution, more business scenarios require decoupling of upstream and downstream services. Similarly, in DDD, event-driven architecture style and event sourcing complement the shortcomings of DDD for microservices and distributed systems. Domain events from DDD can be integrated into an event-driven architecture, specifically as event messages. The event-driven architecture builds relationships between upstream and downstream services through messaging. These relationships are not directly visible; for example, which downstream services receive a message sent by an upstream service. In fact, this model addresses two issues: one is the decoupling of service dependencies, and the other is supplementing the entire business logic. For instance, in core systems within positive business flows, data transmission and processing are handled through some service dependencies, but edge systems might receive messages without necessarily impacting the core processes.

In DDD or distributed engineering projects, events in an event-driven architecture can be categorized into two types:

  1. In-process Events

    In-process events can be realized through threads or shared memory across different modules for communication and message sending and subscribing.

  2. Inter-process Events

    Inter-process events are messages passed between services on different machines and processes over a network.

Generally, the common strategy in enterprises is not to make event-driven architecture the core of business operations; previous ESB bus implementations have shown that it can lead to performance and maintenance issues. However, event-driven architecture remains indispensable. Below is an example of an enterprise architecture using event-driven architecture:

![DDD与事件消息架构 图 1](/images/blog/ddd-event-messaging-architecture/image-1.png)

#### 1.3 Event-Driven Architecture in Practice
Due to the need for some middleware or tool JAR packages in implementing event-driven architectures, technical aspects are placed at the infrastructure layer. Therefore, layered architecture includes dependencies on message middleware and encapsulates logic for sending and consuming messages. The handling of message sending and consumption differs within a layered architecture. In DDD code practice, it will be discussed how to decouple message consumption scenarios using Spring Event Publish mechanisms.

### 2. Event Messaging Architecture Styles
This section describes common event messaging architecture styles and their industry applications.

#### 2.1 Event-Driven Architecture
Event-driven architecture is a commonly seen message architecture, typically supporting event sourcing because messages are generally required to be stored and backed up once it's in use.

#### 2.2 LMAX架构
LMAX architecture has been classically applied in stock trading systems, which is a typical implementation of in-process messaging communication. Its product disruptor has already been widely used in many middleware solutions.

#### 2.3 Data-Driven Event Architecture
Data-driven generally refers to using data to support business logic and assist in business development. Here, data-driven events refer to approval flow events or those with some fixed workflow templates. Another manifestation is data changes, such as MySQL binlog.

#### 2.4 Transactional Messaging Architecture
Strictly speaking, a transactional message architecture does not count as an architectural style; from a global perspective, support for transactional messages is just one feature of the messaging middleware. However, implementing this in distributed systems can be much more challenging. There are multiple solutions to distributed transactions, and when supporting this feature, the design of the messaging middleware needs to consider issues related to distributed transactions.

#### 2.5 Event Streaming Architecture
Event streams can be considered an upgrade version of event-driven architecture. In scenarios like IoT applications and log analysis, events flow continuously, and more features need to be considered in event consumption and processing, such as sliding windows and event statistical analysis. The handling of event streams is actually more complex than that of the event-driven architecture. Below is a diagram example of an event stream architecture:

![DDD与事件消息架构 图 2](/images/blog/ddd-event-messaging-architecture/image-2.png)

### 3. Event Messaging Technologies
#### 3.1 Disruptor
#### 3.2 Kafka and Flink
#### 3.3 RabbitMQ and RocketMQ

### 4. High-Availability Risks in Event-Driven Architecture
#### 4.1 Event Storage
- Message loss
- Message compression

#### 4.2 Event Consumption
- Duplicate consumption
- Uneven consumption rates
- Messages not consumed
- Message backlog
- Idempotent message handling

#### 4.3 Transactional Messages
- Transactional message failures

#### 4.4 Event Ordering
- Events processed out of order

#### 4.5 Multi-Tenancy
- Poorly managed event metadata

#### 4.6 Event Delays
- Delayed message delivery failures

Therefore, if using a message architecture, there will be the above business requirements or related issues, which require specialized maintenance and iteration of the messaging middleware. Below are some technologies and features needed in the entire publish-subscribe process:

![DDD与事件消息架构 图 3](/images/blog/ddd-event-messaging-architecture/image-3.png)

### 5. References
The following articles offer further perspectives on event-driven architecture.

[https://martinfowler.com/articles/201701-event-driven.html](https://martinfowler.com/articles/201701-event-driven.html)

[https://martinfowler.com/articles/lmax.html](https://martinfowler.com/articles/lmax.html)

[https://www.jdon.com/artichect/scalable8.html](https://www.jdon.com/artichect/scalable8.html)

[https://blog.51cto.com/u_15127596/2749001](https://blog.51cto.com/u_15127596/2749001)
