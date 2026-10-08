---
title: "What Modeling Methods Are There in DDD?"
description: "Introduce common domain modeling methods in DDD, including the Four Color Modeling Method, Boundaries Sketching, Event Storming, and User Story Modeling."
pubDate: "2026-10-08"
tags: ["DDD", "Domain Modeling", "Four-color modeling", "Event Storming", "User Story"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-modeling-methods"
---
## Background
In previous articles, we have introduced the concept patterns related to DDD (Domain-Driven Design) and its business technical architecture. However, we haven't yet found a core approach to implement DDD. The essence of DDD is domain modeling or business modeling. Although it sounds simple, doing it correctly is quite challenging. A few entity objects may suffice for initial brainstorming on a requirement, but in-depth and global analysis should be conducted mentally, which might not always be accurate and stable. Therefore, we need to find the right methods to help analyze the business domain, derive modeling structures, and share these models.

## Four-Color Modeling Method
#### 2.1 Origin & Concept & Elements
The concept of four-color modeling can be traced back to the 90s, originating from the Four-Color Prototype. The <font style="color:#333333;">Four-Color Prototype is a widely used system analysis method that emerged in the 90s.</font> For more details, please refer to the following Baidu Encyclopedia link: [https://baike.baidu.com/item/%E5%9B%9B%E8%89%B2%E5%8E%9F%E5%9E%8B/15403787?fr=aladdin](https://baike.baidu.com/item/%E5%9B%9B%E8%89%B2%E5%8E%9F%E5%9E%8B/15403787?fr=aladdin)

The purpose of four-color modeling is to analyze the target business system and use different colors to indicate people, events, objects, and roles. Through four-color modeling or the Four-Color Prototype, we can obtain a four-color prototype diagram, <font style="color:#333333;">each of which consists of attributes and connections (relationships such as associations and dependencies).</font>

1. **<font style="color:#444444;">Pink (moment-interval)</font>**

**Abbreviation**: <font style="color:#444444;">Business critical moments, indicated by pink or light pink.</font>

**<font style="color:#444444;">Description</font>**: <font style="color:#444444;">Objects referred to as business critical moments are generally important. These moments usually correspond to an event and its resulting outcome. Such objects often have some key fields, such as the order number in an order.</font>

2. **<font style="color:#444444;">Light Yellow (role)</font>**

**Abbreviation**: <font style="color:#444444;">Role, indicated by light yellow or pale yellow.</font>

**<font style="color:#444444;">Description</font>**: <font style="color:#444444;">Represents a role carried out by people or objects, with corresponding responsibilities and rights.</font>

3. **<font style="color:#444444;">Light Green (party, place, or thing)</font>**

**Abbreviation**: <font style="color:#444444;">Person, object, or entity, indicated by light green or pale green.</font>

**<font style="color:#444444;">Description</font>**: <font style="color:#444444;">Represents objective existing entities such as people, organizations, products, or accessories.</font>

4. **<font style="color:#444444;">Light Blue (description)</font>**

**Abbreviation**: <font style="color:#444444;">Description content, indicated by light blue or pale blue.</font>

**<font style="color:#444444;">Description</font>**: <font style="color:#444444;">In modeling, explain the contents represented by these colors to classify or describe data, events, or activities generated during the modeling process.</font>

#### 2.2 Modeling Steps
1. Identify critical business moments that meet operational and management needs;
2. Find traceable events and their corresponding key business objects based on these needs;
3. Identify people, events, and objects around the key business moment objects;
4. Abstract roles from people, events, and objects;
5. Supplement description information with object representations;

#### 2.3 Practical Cases
1. Four-Color Modeling for Domain Analysis in E-commerce Bookstore Platform

[https://www.infoq.cn/article/xh-four-color-modeling/](https://www.infoq.cn/article/xh-four-color-modeling/)
2. Using the Four-Color Prototype for Aggregation Design in Enterprise Office Field

[https://www.cnblogs.com/happyframework/archive/2013/04/26/3043515.html](https://www.cnblogs.com/happyframework/archive/2013/04/26/3043515.html)
3. Extracting Data Architecture from Domain Models in Risk Control Field

[https://my.oschina.net/u/4587475/blog/4414138](https://my.oschina.net/u/4587475/blog/4414138)
4. Course Scheduling System for Education Field

[https://insights.thoughtworks.cn/paper-pen-modeling/](https://insights.thoughtworks.cn/paper-pen-modeling/)

## Pencil-and-Paper Modeling Method
#### 3.1 Origin
The Pencil and Paper Modeling method originated from ThoughtWorks, proposed by a ThoughtWorks expert as an improved version of the Four-Color Modeling.

#### 3.2 Concept
<font style="color:#333333;">Based on the "moment-interval" objects in the "Four-Color Modeling," we determine the concepts of "bounded contexts" and "aggregations." The method uses paper and pen to manage these, aiming to achieve a divide-and-conquer approach during modeling. This enhances data integrity while avoiding over-engineering.</font>

<font style="color:#333333;">Note: Here, the moment-interval objects refer to business critical moments. Aggregations are DDD's aggregate patterns.</font>

#### 3.3 Modeling Steps
1. Identify core domains based on the value of "business critical moments";
2. Determine dependencies between these core domains;
3. Draw tables and write examples using paper and pen;

<font style="color:#444444;">    Note: Here, examples can be use cases, user stories, or business critical moments.</font>

4. Identify the "aggregate root" (AGGREGATE ROOT);
5. Group new aggregates based on the principle of grouping people by their roles;

#### 3.4 Practical Cases
1. Course Scheduling System for Education Field

[https://insights.thoughtworks.cn/paper-pen-modeling/](https://insights.thoughtworks.cn/paper-pen-modeling/)

#### 3.5 Advantages
1. Identifying core domains helps with "divide and conquer": Once the core domain is identified, the boundary context is also defined. Different boundary contexts communicate through translators to avoid monolithic design and facilitate evolution towards microservices architecture.
2. The "aggregate root" enhances data integrity: Each boundary context has an aggregate root concept that controls access to its sub-concepts, making it easier to define responsibilities and enhance data integrity.
3. Using paper and pen for just enough concepts helps avoid over-engineering: Concepts managed within each boundary context are derived by considering how they would be handled in a world without computers and using paper and pen, which encourages writing only the necessary concepts.

## Event Storming Method
### 4.1 Concept
Through an Event Storming workshop, the team identifies the core elements of the domain.

The core elements include users, aggregates, policies, commands, read models, external systems, and domain events.

### 4.2 Modeling Steps
1. Hold an event storm meeting where everyone participates, with a facilitator ensuring the team stays focused and engaged to guide the progress towards a complete domain model.
2. Start from domain events and traverse the model forwards and backwards to ensure all content is covered.
3. Add commands or triggers that cause events, considering all command origins (ES:EventSourcing), including users, external systems, even time.
4. Identify aggregates accepting commands and completing events, grouping them into bounded contexts.
5. Identify key test scenarios, users, and goals and incorporate them into the model.
6. Add relationships between bounded contexts to create context maps.
7. Finally, challenge the obtained model with code to validate learning and verify the model.

### 4.3 Practical Cases
1. Event Storming Modeling Overall Methodology

[https://www.cnblogs.com/junzi2099/p/13058234.html](https://www.cnblogs.com/junzi2099/p/13058234.html)
2. Order System

[https://www.jianshu.com/p/797d96c1faab](https://www.jianshu.com/p/797d96c1faab)
3. Credit Card Model

[https://www.infoq.cn/article/b7UGgkuYUgTEmRe5SQLg](https://www.infoq.cn/article/b7UGgkuYUgTEmRe5SQLg)

### 4.4 Advantages
<font style="color:#121212;">Event Storming aims to create and share a common understanding of the domain model; it is not a substitute for design documents, flowcharts, UML diagrams, deployment plans, architecture diagrams, or any other content related to implementation.</font> **It can be seen as a low-fidelity, temporary information radiator used to share and confirm the domain model with others.**

## User Story Modeling Method
### 5.1 Concept
<font style="color:#121212;">Based on user stories (requirements) modeling, also known as use case modeling.</font>

### 5.2 Modeling Steps
1. <font style="color:rgb(51, 51, 51);">Gather user stories (raw user requirements)</font>
2. <font style="color:rgb(51, 51, 51);">Organize user stories to extract use cases (use cases express the needs of users for a system, defining the boundaries and interactions with external actors)</font>
3. <font style="color:rgb(51, 51, 51);">Analyze system requirements and decompose the domain into multiple sub-domains (a domain is the problem space, essentially breaking down big problems into smaller ones)</font>
4. <font style="color:rgb(51, 51, 51);">Extract concepts for each sub-domain to form a concept model (concept models exist in the problem space)</font>
5. <font style="color:rgb(51, 51, 51);">Abstract and transform these concept models into a domain model (domain models exist in the solution space; this step is challenging, testing one's ability to abstract concepts such as relationships, e.g., in a promotion system, abstracting promotional products, or in an authorization system, abstracting permissions)</font>
6. <font style="color:rgb(51, 51, 51);">Identify aggregates and their aggregate roots within the domain model</font>
7. <font style="color:rgb(51, 51, 51);">Map relationships between aggregates</font>
8. <font style="color:rgb(51, 51, 51);">Walkthrough scenarios to check how the domain model meets use case requirements</font>

### 5.3 Practical Cases
Product Launch Scenario Modeling Process:

[https://www.cnblogs.com/xishuai/p/ddd-product-design.html](https://www.cnblogs.com/xishuai/p/ddd-product-design.html)

### 5.4 Advantages
<font style="color:#121212;">This is a relatively traditional modeling approach, and by focusing on core use cases, we can easily derive concept models and domain context boundaries. This method allows for iterative domain function division based on current system capabilities and model.</font>

## Conclusion
In this article, we introduced four methods to assist in object-oriented modeling. Only through correct and appropriate modeling can we find a reasonable mapping from the real world to software, clarify data structures, and establish a solid foundation for development, iteration, and collaboration. I have briefly introduced these four modeling approaches here. In future articles, I will apply each method to different cases and combine them with examples from the community to demonstrate how they work in practice. Please follow the official account for more updates.
