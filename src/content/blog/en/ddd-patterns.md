---
title: "Patterns in DDD"
description: "Organize common concepts, methods, strategies, and patterns in domain-driven design, covering domain models, model-driven design, deep refactoring, and strategic design."
pubDate: "2026-10-08"
tags: ["DDD", "Domain-Driven Design", "design patterns", "software architecture"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-patterns"
---
## Background
When I first learned about Domain-Driven Design (DDD), I read "Domain-Driven Design: Tackling Complexity in the Heart of Software." This book records many concepts, methods, ideas, strategies, and patterns. Reading through it was quite challenging but also rewarding. Converting these into my own capabilities requires deep contemplation. Many people find DDD to have a high barrier to entry or that its related concepts and implementations are scattered, making them confusing. Online resources are often incomplete and not well-structured, usually being the result of secondary interpretations by others who only partially understand the subject matter. Therefore, for many engineers, DDD can seem like trying to see through a fog. Here, I will briefly summarize common concepts, methods, ideas, strategies, and some patterns from this book.

## Pattern Overview
### 2.1 Patterns Related to the Domain Model
#### 1. Ubiquitous Language (UL)
**Excerpt**: The vocabulary of UL includes the names of classes and major operations. Terms in the language are used to discuss rules that have been explicitly defined within the model, as well as some terms derived from high-level organizing principles applied to the model.

#### 2. Model-Driven Design (MDD)
**Excerpt**: MDD no longer separates analysis models from programming designs but seeks a single model that can satisfy both needs.

#### 3. Hands-On Modeler
**Excerpt**: Any technical personnel involved in modeling, regardless of their primary responsibilities within the project, must spend time understanding the code. Anyone responsible for modifying the code must learn to express the model using code. Every developer must participate in model discussions and maintain contact with domain experts to varying degrees.

### 2.2 Model-Driven Design Patterns
#### 4. Layered Architecture (LA)
**Excerpt**: Divide complex applications into layers, designing each layer with cohesion and depending only on its lower layer. Use standard architectural patterns that loosely couple with upper layers. Place all code related to the domain model in one layer, separating it from user interface, application, and infrastructure layers.

#### 5. Smart UI
**Excerpt**: Many software projects adopt a simpler design method where the user interface, application, and domain are combined together, which I call SUI (Smart User Interface).

#### 6. Entity
**Excerpt**: When an object is distinguished by its identifier rather than attributes, it should be primarily defined through the identifier in the model. Make class definitions simple and focus on the continuity of the lifecycle and the identifier. Define a way to distinguish each object that is independent of form and history.

#### 7. Value Object
**Excerpt**: A value object describes an aspect of the domain without conceptual identity. VALUE OBJECTs are instantiated to represent design elements for which we only care what they are, not who they are.

#### 8. Service
**Excerpt**: Sometimes, objects are not things. In some cases, the clearest and most practical design includes special operations that conceptually do not belong to any object. Rather than force them into a category, it is better to introduce a new element in the model naturally, which is called SERVICE.

#### 9. Module/Package
**Excerpt**: MODULEs provide two ways of observing models: one can view details within a MODULE without being overwhelmed by the entire model, and another can observe relationships between MODULEs without considering their internal details. MODULEs in the domain layer should be meaningful parts of the model, providing a broader description of the domain.

#### 10. Aggregate
**Excerpt**: An AGGREGATE is a collection of related objects treated as a unit for data modification. Each AGGREGATE has a root and a boundary. The boundary defines what is inside the AGGREGATE. The root is a specific ENTITY within the AGGREGATE. External objects can only reference the root, while objects within the boundary can refer to each other. Other ENTITIES have local identifiers but are distinguished only within the AGGREGATE because external objects see only the root ENTITY.

#### 11. Factory
**Excerpt**: When creating an object or an entire AGGREGATE is complex and exposes too much internal structure, a FACTORY can be used to encapsulate this work.

#### 12. Repository
**Excerpt**: A REPOSITORY represents all objects of a certain type as a conceptual collection (usually simulated). Its behavior resembles that of a collection but with more advanced querying capabilities. When adding or removing corresponding objects, the backend mechanism of the REPOSITORY is responsible for adding them to the database or deleting them from it. This definition gathers a set of closely related responsibilities providing full access to the lifecycle of AGGREGATE roots.

### 2.3 Deep Refactoring Patterns
#### 13. Specification
**Excerpt**: Create explicit VALUE OBJECTs in predicate form for special purposes. A SPECIFICATION is a predicate used to determine whether an object meets certain criteria.

#### 14. Strategy
**Excerpt**: We need to extract the mutable parts of a process into a separate "strategy" object within the model. Separate rules from the behavior they control. Implement rules or replaceable processes according to the STRATEGY design pattern, with multiple versions of strategy objects representing different ways to accomplish the process.

#### 15. Composite
**Excerpt**: Define an abstract type that includes all members of a COMPOSITE. On containers, implement query methods that return information aggregated by the container's content. Leaf nodes achieve these methods based on their own values. Clients use the abstract type without distinguishing between leaves and containers.

#### 16. Side-Effect-Free Function
**Excerpt**: Move as much program logic into functions as possible because they are operations that only return results without producing obvious side effects. Isolate commands (methods that cause significant state changes) to very simple, non-returning domain information operations. When a complex logical responsibility is found suitable for implementation, move it into VALUE OBJECTs to further control side effects.

#### 17. Assertion
**Excerpt**: Clearly express the postconditions of an operation and fixed rules within classes and AGGREGATES. If your programming language does not support ASSERTION directly, write them as automated unit tests. You can also write them in documentation or diagrams (if fitting the project development style). Identify conceptually cohesive models to facilitate developers' inference of expected ASSERTIONS, accelerating learning and avoiding code contradictions.

#### 18. Conceptual Contour
**Excerpt**: Decompose design elements (operations, interfaces, classes, AGGREGATES) into cohesive units while considering the intuitive understanding of significant divisions in the domain. Observe regularities in changes and stability during continuous refactoring to find underlying CONCEPTUAL CONTOUR that can explain these change patterns. Align the model with consistent aspects of the domain that make it a useful body of knowledge.

#### 19. Standalone Class
**Excerpt**: Extract the most complex calculations into STANDALONE CLASSES (independent classes) where possible, one method to achieve this is by modeling VALUE OBJECTs from classes with many dependencies.

#### 20. Closure of Operations
**Excerpt**: Define operations such that their return type matches their parameter types when appropriate. If an implementer's state is used in the computation, it becomes a parameter and thus both parameters and returns should have the same type as the implementer. Such operations are closure operations within the set of instance collections of this type. Closure operations provide a high-level interface without introducing dependencies on other concepts.

#### 21. Intention-Revealing Interface
**Excerpt**: All public elements in the design form an interface, with each element's name revealing the design intention. Type names, method names, and parameter names combined together form an INTENTION-REVEALING INTERFACE (intention-revealing interface).

#### 22. Analysis Pattern
**Excerpt**: In "Analysis Patterns," Martin Fowler defines analysis patterns as a set of concepts used to represent common structures in business modeling [Fowler 1997, p. 8]. They may be specific to one domain or span multiple domains. The analysis patterns proposed by Fowler come from practical experience and are very useful when applied appropriately. "Analysis Pattern" emphasizes its conceptual nature; it is not a technical solution but rather references that guide the design of models in specific domains.

### 2.4 Strategic Design Patterns
#### 23. Evolving Order
**Excerpt**: Let this conceptually large structure evolve with the application, even transforming into an entirely different architectural style.

Do not overly restrict detailed designs and model decisions; these must be determined after gaining a thorough understanding of the details.

#### 24. System Metaphor
**Excerpt**: SYSTEM METAPHOR is a loose, easily understood large structure that aligns with object paradigms. When a specific class in the system exactly matches team members' imagination and guides them towards useful thinking, use this metaphor as a large structure. Organize design around this metaphor and absorb it into UBIQUITOUS LANGUAGE. SYSTEM METAPHOR should facilitate communication within the system while guiding its development. It can increase consistency across different BOUNDED CONTEXTs but all metaphors are not precise; they should be continuously checked for overuse or inappropriateness, and abandoned when they start to hinder progress.

#### 25. Responsibility Layer
**Excerpt**: Observe concept dependencies within the model and varying frequencies and reasons of change in different parts of the domain. If natural layers emerge from the domain, convert them into broad abstract responsibilities. These responsibilities should describe the high-level purposes and designs of the system. Refactor the model so that each domain object, AGGREGATE, and MODULE's responsibility is clearly located within a responsibility layer.

#### 26. Knowledge Level
**Excerpt**: Create a set of objects to describe and constrain the basic structure and behavior of the core model. Divide these objects into two levels: one very specific level providing some rules and knowledge for users or super-users, and another higher-level that offers more generalized concepts.

#### 27. Pluggable Component Framework
**Excerpt**: Mature models derived from deep understanding and repeated refinement offer many opportunities. Typically, only after multiple applications in the same domain can a PLUGGABLE COMPONENT FRAMEWORK (pluggable component framework) be used.

#### 28. Abstract Core
**Excerpt**: Identify the most fundamental concepts in the model and separate them into different classes, abstract classes, or interfaces. Design this abstract model to express much of the interaction between important components. Place this complete abstract model in its own MODULE while detailed specialized implementations remain within subdomain-defined MODULEs.

#### 29. Segregated Core
**Excerpt**: Refactor the model to separate core concepts from supporting elements (including those with unclear definitions) and enhance CORE's cohesion by reducing coupling with other code. Extract all general or supporting elements into other objects and place them in other packages, even if this separates some tightly coupled elements.

#### 30. Cohesive Mechanism
**Excerpt**: Separate the conceptually COHESIVE MECHANISM (cohesive mechanism) to a lightweight framework. Pay special attention to formulas or algorithms with complete documentation. Expose the functionality of this framework using an INTENTION-REVEALING INTERFACE. Now, other elements in the domain can focus on expressing problems (what to do) while transferring complex details of how it is done to the framework.

#### 31. Published Language
**Excerpt**: Use a well-documented shared language that expresses necessary domain information as a common communication medium, converting between this and other information when necessary.

#### 32. Bounded Context
**Excerpt**: Clearly define the context in which the model is applied. Set up the boundaries of the model based on team organization, usage within different parts of the software system, and physical manifestations (code and database schema). Maintain consistency within these boundaries without being disturbed by issues outside them.

#### 33. Core Domain
**Excerpt**: Refine the model to find the CORE DOMAIN and provide a clear method to distinguish it from auxiliary models and code. The most valuable and professional concepts should be clearly defined. Minimize the CORE DOMAIN. Have the most talented people develop the CORE DOMAIN, requiring corresponding recruitment. Develop deep models and flexible designs within the CORE DOMAIN that ensure system blueprints are realized. Carefully evaluate any other parts of the investment to see if they support this refined CORE.

#### 34. Highlighted Core
**Excerpt**: Write a very short document (3-7 pages, with each page not too much content) describing the CORE DOMAIN and interactions between core elements. Mark out the main storage repositories in the model that belong to the CORE DOMAIN without explicitly defining their roles. Make it easy for developers to distinguish what is inside the core and what is outside.

#### 35. Generic Subdomain
**Excerpt**: Identify cohesive subdomains unrelated to project intent. Extract generic models of these subdomains into separate MODULEs. Any proprietary elements should not be included in these modules. Separate them after which their priority should be lower than that of the CORE DOMAIN, and core developers should not be assigned to complete these tasks (as they rarely gain domain knowledge from such tasks). Additionally, consider using off-the-shelf solutions or "published models" for these GENERIC SUBDOMAINs.

#### 36. Continuous Integration
**Excerpt**: CONTINUOUS INTEGRATION involves frequently merging all work within a context and keeping it consistent to quickly discover and fix issues when the model splits. Like other methods in domain-driven design, CONTINUOUS INTEGRATION has two levels of operations: (1) integration of model concepts; (2) integration of implementations.

#### 37. Context Map
**Excerpt**: CONTEXT MAP lies at the intersection of project management and software design. Typically, boundaries are delineated based on team outlines. People who collaborate closely naturally share a model context. Different teams or individuals within the same team (who do not communicate) will use different contexts.

#### 38. Shared Kernel
**Excerpt**: Select a subset that both teams agree to share from the domain model. Of course, this also includes code and database design subsets related to this model part. This shared content has special status; one team should not change it without consulting the other team. Functional systems integrate frequently but at lower frequency than in BOUNDED CONTEXTs. During these integrations, both teams run tests.

#### 39. Customer/Supplier Development Team
**Excerpt**: Establish a clear customer/supplier relationship between two teams. In planning meetings, the downstream team acts as the customer to the upstream team. Negotiate tasks and budget based on the needs of the downstream team so everyone knows their commitments and progress. Develop automated acceptance tests together to verify expected interfaces. Add these tests to the upstream team's test suite as part of continuous integration. These tests allow the upstream team to make changes without worrying about side effects on the downstream team.

#### 40. Conformist
**Excerpt**: By strictly adhering to the model of the upstream team, you can eliminate the complexity of converting between BOUNDED CONTEXTs. Although this restricts the design style of the downstream developers and may not result in an ideal application model, choosing CONFORMITY mode greatly simplifies integration. Additionally, it allows for sharing UBIQUITOUS LANGUAGE with the supplier team, making communication easier as they share information out of benevolence.

#### 41. Anti-Corruption Layer
**Excerpt**: Create a layer to provide relevant functionality based on the customer's own domain model. This layer communicates with another system through its existing interface while requiring minimal changes or none at all. Internally, this layer performs necessary bidirectional conversions between models. It is the mechanism for converting conceptual objects and operations across different models and protocols.

#### 42. Separate Ways
**Excerpt**: Integration can be costly and may not always yield significant benefits. Therefore, declare a BOUNDED CONTEXT with no relation to other contexts so that developers can find simple, specialized solutions in this small scope.

#### 43. Open Host Service
**Excerpt**: Define an agreement where your subsystem is exposed as a set of SERVICES for other systems to access. Publish this protocol so all systems needing integration can use it. When new integration requirements arise, enhance and extend the protocol but accommodate individual team-specific needs with one-time converters that expand the protocol while keeping shared protocols simple and cohesive.

#### 44. Domain Vision Statement
**Excerpt**: Write a brief description (about one page) of the CORE DOMAIN along with its value proposition. Do not include aspects that cannot distinguish your domain model from others. Show how the domain model realizes and balances stakeholder interests. This description should be concise. Write it early and update it as new understanding emerges. The DOMAIN VISION STATEMENT can serve as a guide, helping development teams maintain a unified direction in refining models and code. Non-technical members of the team, management, or even customers (excluding proprietary information) can share this domain vision statement.

#### 45. Event Sourcing
**Excerpt**: Model activities within the domain as a series of discrete events, with each object represented by a domain object. Domain events are part of the domain model and represent things that happen in the domain.

#### 46. Big Ball of Mud
**Excerpt**: A Big Ball of Mud refers to messy, tangled, disorganized, and haphazardly patched-together code.

## Summary
The patterns mentioned above are mostly copied directly from the book. Each pattern is briefly described to convey its general meaning. Many of these patterns do not have precise definitions, and I am still in the process of understanding them. This is similar to design patterns, which I refer to as DDD patterns for consistency with classic books and to align with design patterns. However, most people are familiar with and apply design patterns, making it easier to learn compared to DDD. It's recommended that those interested in learning DDD start by studying some design patterns.

Both types of patterns essentially express how object-oriented design can be implemented. According to Eric Evans' view, design patterns are more technical, while the patterns in DDD are theoretical or model-centric. These patterns aim to structure domain objects and models, guiding their construction and management, making them harder to understand.

I hope this article helps you gain some understanding of common concepts, methods, strategies, and patterns in DDD. However, for a deeper dive, I still recommend reading the classic books on DDD.

## References
- "Domain-Driven Design: Tackling Complexity in the Heart of Software"
- "Implementing Domain-Driven Design"

[https://www.infoq.cn/article/2010/09/big-ball-of-mud](https://www.infoq.cn/article/2010/09/big-ball-of-mud)

[http://www.laputan.org/mud/](http://www.laputan.org/mud/)
