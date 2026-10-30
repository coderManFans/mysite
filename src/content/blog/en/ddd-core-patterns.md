---
title: "A Practical Guide to Core DDD Patterns"
description: "A practical overview of core patterns from Implementing Domain-Driven Design, including entities, value objects, aggregates, factories, repositories, services, modules, contexts, and event sourcing."
pubDate: "2026-10-30"
tags: ["DDD", "Domain-Driven Design", "Domain Modeling"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-core-patterns"
---
### 1. Background
This blog post selects some core Domain-Driven Design (DDD) design patterns from the book "Implementing Domain-Driven Design" to help readers gain a deeper understanding of DDD concepts and framework. These core patterns form the basis for many other DDD patterns, In practice, working with DDD means working with patterns, modeling, and design. We will look at these pattern concepts through a more comprehensive lens, critically examining them, and carefully pondering their meanings.

### 2. Core Patterns & Concepts
#### 2.1 Entity Pattern
**Concept Explanation:** An object primarily defined by an identifier is called an ENTITY. Entities have distinct modeling and design considerations and a lifecycle. An entity can be anything, as long as it meets two conditions: one, it has continuity throughout its lifecycle; and two, the distinction is not determined by attributes that are very important to users.

**Note:** A domain ENTITY is not a persistence-layer DAO or a Java entity bean; it is a fundamental concept in the domain model. Its identity distinguishes what the model element is, while its behavior and lifecycle give it continuity.

**Examples:** When you go to a restaurant for a meal, the customer and cashier are distinct entities, even though both are people. For example, when depositing money at a bank, this is a transaction with a start and end time. The transaction records the time of the transaction, account number, card number, bank information, and amount information, etc., so it can be considered an entity.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 1](/images/blog/ddd-core-patterns/image-1.png)

#### 2.2 Value Object Pattern
**Concept Explanation:** An object used to describe a certain aspect of the domain but without a conceptual identifier is called a VALUE OBJECT. A value object, once instantiated, represents some design elements. For these design elements, **we only care about what they are and not who they are**. When we only care about the attributes of a model element, it should be categorized as a VALUE OBJECT. We should make this model element meaningful by representing its attributes and provide relevant functionality.

**Note:** A VALUE OBJECT should be immutable. Do not assign any identifier to it and do not design it like an ENTITY so complex. In most cases, we classify and label things, these types and labels can actually count as value objects. Value objects are mostly constant in value but are not absolutely unchangeable.

**Examples:** Some colors, sizes, specifications of a product; the unique identifier ID of an entity; configuration classes for business codes; business enums; relatively fixed dates, strings; above these may still be somewhat abstract, take designing employee data models as an example. Suppose there are four types of employees: outsourced, regular, consultant, intern. The corresponding code values for these types are value objects. In other words, age and gender are also.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 2](/images/blog/ddd-core-patterns/image-2.png)

#### 2.3 Aggregate Pattern
**Concept Explanation:** An AGGREGATE is a collection of related objects treated as a unit for data modification. Each AGGREGATE has a root and a boundary. The boundary defines what is inside the AGGREGATE. The root is an ENTITY contained within the AGGREGATE. For an AGGREGATE, external objects can only reference the root, while objects within the boundary can refer to each other. Other ENTITIES in the AGGREGATE have local identifiers but are only distinguished internally because external objects can see only the root ENTITY.

**Note:** Aggregates and aggregate roots are useful for organizing domain relationships. They group domain objects that are closely related from a business perspective and manage their lifecycles. Identifying an aggregate and its root is challenging and requires careful design. Identifying an aggregate and creating its root is challenging and requires careful design.

We should classify ENTITIES and VALUE OBJECTS separately and gather them into AGGREGATES, defining the boundaries for each AGGREGATE. In each AGGREGATE, choose one ENTITY as the root and control all access to other objects within the boundary through this root. Only allow external objects to hold a reference to the root. Temporary references to internal members can be passed but are only valid in a single operation. Since the root controls access, it cannot be bypassed to modify internal objects. This design ensures that objects within an AGGREGATE satisfy all fixed rules and guarantees that any state changes maintain these rules as a whole.

The book provides some principles for designing aggregates, roughly including:

1. Design small aggregates
2. Reference other aggregates via unique identifiers
3. Use eventual consistency across multiple aggregates
4. Ensure transactional consistency within an aggregate by modifying only one instance in a single transaction

These principles can help us design better aggregate roots.

**Examples:** Suppose we are designing an HR office system and need to model employees, organizations, accounts, etc., then analyzing the employee alone can establish an entity for the employee, an entity for salary, an entity for educational experience, and an entity for work experience. These entities represent a one-to-many relationship. The employee is the aggregate root, which encapsulates these related entities. Any modification to employees would go through this aggregate root.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 3](/images/blog/ddd-core-patterns/image-3.png)

#### 2.4 Factory Pattern
**Concept Explanation:** The creation of complex object instances and the responsibilities of AGGREGATES should be transferred to separate objects, which may not carry out domain model responsibilities but are still part of the domain design. Provide an interface that encapsulates all complex assembly operations without exposing the specific classes of the objects being instantiated. When creating an AGGREGATE, treat it as a whole and ensure it satisfies fixed rules.

**Note:** The creation of objects can be a major operation in itself, but the created object is not suitable for handling complex assembly tasks. Mixing these responsibilities may result in poorly designed code that is difficult to understand. Having clients directly responsible for creating objects would complicate their design and break the encapsulation of assembled objects or AGGREGATES, leading to tight coupling between the client and the implementation details of the created object.

**Examples:** A factory class for creating and modifying an employee aggregate root entity.

**Usage Scenarios:** When creating a complex object or an entire AGGREGATE, if the creation process is too complicated or exposes too much internal structure, use a FACTORY to encapsulate it.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 4](/images/blog/ddd-core-patterns/image-4.png)

#### 2.5 Repository Pattern
**Concept Explanation:** Create an object for each type of entity that requires global access; this object acts as a "proxy" to the collection of all objects of that type in memory. Provide a well-known global interface for accessing them. Offer methods for adding and removing objects, encapsulating the actual insertion or deletion operations into data storage. Provide methods for selecting objects based on specific conditions, returning fully instantiated objects that satisfy query conditions, thus encapsulating the actual storage and querying techniques.

Only provide REPOSITORY for those AGGREGATE roots that are indeed needed to be accessed directly. Keep clients focused on the model while delegating all object storage and access operations to the REPOSITORY.

**Usage Scenarios:** Entity or value object conversion with the storage layer, such as an employee aggregate root in a factory pattern may not necessarily interact directly with the storage layer; here, a repository can supplement the creation of objects, for example, from persistent storage.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 5](/images/blog/ddd-core-patterns/image-5.png)

#### 2.6 Service Pattern
**Concept Explanation:** When an important process or transformation operation in the domain is not a natural responsibility of an ENTITY or VALUE OBJECT, add an independent interface operation to the model and declare it as a SERVICE. Define the interface using the language of the model and ensure that the operation names are terms from Ubiquitous Language. Additionally, make the SERVICE stateless.

**Note:** We need to distinguish between services in the domain layer and those in other layers and assign responsibilities accordingly to clearly differentiate them.

Creating service classes do not necessarily require interfaces.

**Usage Scenarios:** Transaction services, transfer services, order services

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 6](/images/blog/ddd-core-patterns/image-6.png)

#### 2.7 Module Pattern
**Concept Explanation:** Choose modules that can describe the system and include a cohesive set of concepts. This usually results in low coupling between modules, but if it does not work well, find ways to change the model to eliminate concept coupling or identify a foundational concept (which may have been overlooked) based on which you can organize the MODULEs meaningfully. Find a way to organize concepts with low coupling so that they can be understood and analyzed independently. Refine the model until it can be divided according to high-level domain concepts, without causing code coupling. The name of the MODULE should be a term from Ubiquitous Language. The MODULE and its name should reflect deep knowledge of the domain.

**Note:**

1. A MODULE is not just about splitting code but also about splitting concepts. One person can only handle so much at once (hence low coupling). Incoherent thoughts and "soup" like thoughts are hard to understand (hence high cohesion).
2. Technical frameworks have a significant impact on packaging decisions, some being helpful while others should be resisted.

**Usage Scenarios:** User module, permission module, transaction module, etc.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 7](/images/blog/ddd-core-patterns/image-7.png)

#### 2.8 Domain Concepts and Patterns
**Explanation:** A central concern of domain-driven design is the domain: how to define and divide it, identify relationships between domains, and build models around it. This domain perspective helps us look beyond object-oriented implementation details.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 8](/images/blog/ddd-core-patterns/image-8.png)

The mind map includes many domain-related patterns. Treating the domain as the starting point is a useful way to approach DDD. The domain is represented by the domain model, which sits within an application context. In this sense, the domain connects foundational modeling concepts to broader DDD patterns.

#### 2.9 Context Concepts and Patterns
**Explanation:** Another core element in domain-driven design is the context. Through contexts and context diagrams, we can discover relationships between related domains, which helps with model transformation and data flow.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 9](/images/blog/ddd-core-patterns/image-9.png)

#### 2.10 Event Sourcing Pattern
**Explanation:** Event Sourcing is another tool used alongside domain modeling. Looking at business activity through events can help identify domain objects and trace how activity unfolds within and across domains.

**Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 10](/images/blog/ddd-core-patterns/image-10.png)

### 3. Problem Cases
Here we use some questions or case studies to illustrate how these patterns can be applied in practice, deepening our understanding of the above patterns.

#### 3.1 What is the difference between a value object and an entity? How do I determine which objects in a business process are entities and which are value objects?
**Answer Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 11](/images/blog/ddd-core-patterns/image-11.png)

Based on the activities within the business process, identify how many things, events, roles, actions, etc., there are. Then further use the characteristics of entities to identify which activities involve entities and value objects. Value objects generally do not have a direct relationship with business activities; they can be obtained from entities.

#### 3.2 What is the difference between an entity in DDD and a Java Bean? And what about database entities?
**Answer:** The MODEL ENTITY and the Java "bean" are not the same thing. The bean was intended to serve as a framework for implementing ENTITIES, but it did not achieve this goal. Most ENTITIES are implemented as ordinary objects. Regardless of how they are implemented, an ENTITY is a fundamental feature of the domain model.

Database entities represent static data structure relationships from a table perspective. Entities in DDD are richer and more flexible than those represented by tables.

#### 3.3 How do I define the size of an aggregate root and use it?
**Answer:** Defining aggregate roots involves some principles and considerations. Typically, you can define them based on entity relationships and the degree of business activity association. Aggregate roots can be used in factories and repositories, or in query CQRS architectures.

#### 3.4 How do I use the factory pattern?
**Answer:** There are many types of factories, such as the Factory Method pattern, Abstract Factory pattern, and Builder pattern. A common way is to add Lombok's @Builder annotation to entities.

#### 3.5 I am not from this industry; how can I know which domains exist in it and how to divide them?
**Answer:** Invite a domain expert for a conversation and take notes on the industry's key business processes and the roles involved. Broadly speaking, a domain expert may be an experienced engineer, product manager, or operations specialist; more narrowly, it is someone with deep, long-term knowledge of the industry.

Another approach is to study relevant products, news, and books to map domain activities. This can miss critical information, though, and make it easy to mistake assumptions for facts.

#### 3.6 What is the difference between a factory pattern and a repository pattern?
**Answer:** The factory handles the start of an object's lifecycle, while the repository helps manage the middle and end stages.

The factory creates new objects, whereas the repository finds existing ones.

#### 3.7 What is the difference between a repository pattern and a Data Access Object (DAO)?
**Answer:** First, not all persistence abstractions are DAOs. A DAO primarily looks at problems from a table perspective and provides CRUD operations. Table modules, table data gateways, and activity logs should be in transaction scripts. The DAO pattern usually only encapsulates one layer of the database table. Repositories tend to focus more on objects and are often used within domain models. Typically, you can treat repositories as DAOs.

#### 3.8 What components/sections make up a domain model in DDD?
**Answer Mind Map:**

![DDD Core Patterns Detailed Explanation Diagram 12](/images/blog/ddd-core-patterns/image-12.png)

#### 3.9 Why do object models derived from domain modeling differ from database models, leading to deviations from the DDD direction later in the project?
**Answer:** First, the object model derived from domain modeling often has redundancies or overlaps, and the relationships between objects can change easily. The relationship structure in a database entity model appears more pure and simple once determined, with data structures becoming clear. However, changing objects in the domain model is generally more complex than changing them in a database model. This requires that when the domain model changes, the database model should also be adjusted appropriately. However, at some point, adjusting the database model becomes more costly.

A method suggested by the book is to maintain a loose relationship between the domain and database models, not mapping every domain entity to a database table.

#### 3.10 How do you divide domains?
**Answer:** Different people have different views on domains; the key is whether the domain can carry out independent responsibilities across the entire business and provide reusable capabilities. Generally, domains are divided according to business processes, with related services managed by different departments. More specifically, in upstream-downstream interactions, certain functions should be handled by the upstream or downstream domain. This requires a deep understanding of relevant concepts and entities.

Typically, entities within a domain have closer relationships, making the division of aggregates clearer. Additionally, through some modeling processes, you can know the basis for dividing domains. Finally, domains change with business changes, and as business requirements iterate, many new concepts and old ones are subtly changing. This prompts us to continuously refactor code, adjust domain entities, and add new features.

#### 3.11 How do you define boundaries?
**Answer:** This question is similar to the previous one; defining boundaries in a domain context can be challenging. Related concepts include contexts, aggregate roots, and anti-corruption layers. A boundary defines the capabilities and services an aggregate root or domain provides—in effect, its interfaces. It is easier to define these responsibilities and their implementation once the domain and context are understood.

At the module level, boundaries also clarify responsibilities and interactions. Requirements, dependencies, and interaction sequences can help identify them.

#### 3.12 How do you extend functionality?
**Answer:** For business extensions, there are generally multiple ways, such as strategy patterns or template method patterns. In platform projects with many business lines that are iterating, extending features frequently occur. One possible way is to split the service layer into two layers: an application layer and a domain layer. The application layer itself provides certain extension capabilities, while the domain layer provides core domain capabilities.

If you take it one step further, there can be an adaptation layer above the application layer, such as various business line implementations providing different scenarios of abstract application capabilities that depend on the core domain capabilities. More complex cases involve both application and domain extensions, similar to Dubbo's SPI mechanism. In Alibaba's TMF2.0 framework, extension points are used to implement domain capabilities. This approach provides an inheritance and abstraction for domain and application capabilities. Different business lines can extend their own capabilities based on the platform-provided extension points. At runtime, you need to determine which extension points were actually traversed and what operations were performed.

These extension capabilities are mainly aimed at solving more complex business problems. In most cases, static code gives a good idea of how the business flow will proceed.

### 4. Summary
The above content is essentially some core points from "Implementing Domain-Driven Design" and "Domain-Driven Design." It serves as notes and personal insights. Summarizing concepts and then learning with questions can help us gain a deeper understanding of DDD knowledge. Overall, mastering the core concepts in DDD lays a foundation for practical domain modeling and code implementation.
