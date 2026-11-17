---
title: "The Service Revolution in DDD"
description: "How the Service layer evolved from SSH and MVC through microservices to DDD: two-layer services, CQE services, extension-point services, and what service orchestration and serverless mean for the future."
pubDate: "2026-11-17"
tags: ["DDD", "Microservices", "Architecture Evolution", "COLA", "Serverless"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-service-revolution"
---
## 1. Service in Traditional Architectures

### 1.1 The SSH Era
Back then things were fine. I used the SSH stack, when nobody cared much about layering and the frontend and backend were not separated. After leaving school I never touched SSH again. With SSH, a Struts Action handled controller routing, Hibernate handled persistence, and Spring was the bean container. The business logic was simply Struts Action class to service bean to Hibernate DAO, all inside one project.

### 1.2 The MVC Era
In MVC thinking, MVC basically represented the bridge between frontend and backend, and the service layer kept working behind the scenes. Meanwhile newer ORM frameworks such as MyBatis and caching components gradually took over. Later, when the wave of frontend/backend separation arrived, the service layer still did not evolve much.

All that changed was where the routing lived: complex logic moved from page routing to backend routing, and page models, view models, and database models were adapted and merged. So service was still a single layer. Concretely, the Controller, Action, or Servlet called interfaces in `com.xx.xx.service` directly.

## 2. Service Under Microservices
When microservices became mainstream, service looked completely different, largely thanks to RPC. After self-built RPC frameworks like Dubbo appeared, the frontend had nothing to do with it; Tomcat and HTTP needed separate services to reach RPC interfaces, and the web service became a routing service, or an empty shell. The frontend had less logic, and service could be finished directly in the RPC implementation layer. The Spring Boot / Spring Cloud stack still worked much like the MVC era.

## 3. Service Under DDD

### 3.1 Two-Layer Services
The previous two sections set the stage. Service was still the same service, but it was heavy and redundant by nature. As the business grew complex, vertical business logic and horizontal services combined made service impossible to maintain. Fortunately, because of how frontend and backend now collaborate, backend engineers only need to solve the service problem itself.

After a period of study, I found that many relatively complex business service projects -- marketing platforms, trading services, and so on -- actually have two service layers. In the COLA architecture, the service body is made up of facade (Dubbo client) plus domain gataway. In other words, the application layer has been pulled out of service, and that change lets you breathe even inside complex business logic: pull the changeable business out, and the service layer just does its own job.

### 3.2 CQE Services
Let's shift perspective and look at the DDD layered architecture. Some well-known practitioners proposed the term CQE. I think it is a good term, though it needs confirmation -- what exactly is CQE? CQE has strong ties to CQRS: C for Command, Q for Query, E for Entity. But in CQRS terms, E also stands for Event, a new CQRS variant based on event sourcing. Based on recent study, COLA brings command and query into the app layer as subpackages, but behind command there is also an executor, so E here can also mean the Executor in COLA.

Now look at services and you find that Service is no longer responsible for CRUD, and no longer validates parameters -- it is simply called by the application layer. After this separation, Service becomes rich and varied. In the older days we used design patterns to make Service look orderly; now, with finer layering and package governance, Service looks more professional and has a single responsibility.

From a global view, Entity splits into entities and value objects, including configuration data and enum data that carry business meaning. The database model basically does not line up with Entity, but the focus is no longer the database model. So the Service layer also no longer just calls DAO, calls caches, and calls upstream/downstream services. To sum up:

1. Based on the CQRS pattern, most application-layer logic talks to domain services through xxxExe.
2. Domain services contain interfaces such as factory and repository, which act as specialized gataways.
3. Following from point 2, Entity becomes richer, with aggregates that represent a whole sub-business capability; service no longer references the underlying xxxDAO directly.
4. When calling downstream interfaces, we wrap and adapt them so that downstream changes do not destabilize the domain service. This can still be seen as an extension pattern for service. What changes in service is that calling a downstream service feels like calling my own.
5. Things like query, mq, and cache all draw a line with service -- don't call me so directly, I don't like it.

### 3.3 Extension-Point Services
I once had the good fortune to work at a top internet company and saw far more complex business logic. In that architecture you could not even tell how many layers there were. With many business lines and many business scenarios, how do you keep the code stable and keep supporting new business? DDD can already handle multiple business lines and scenarios with two service layers, so why is it still so complex? One reason is the speed gap between building a middle platform and business development -- frankly, the platform is built too slowly. Even with multiple business lines and scenarios, you still cannot deliver business quickly, and it stops being clear which capabilities are core platform capabilities, which are my extension capabilities, and which are business-specific customizations. Having only platform engineers own all of that is clearly not enough. Today we split packages by business line and application services by business scenario, but the service layer still gets messy, so many experts decide to attack it from the business architecture instead: govern the service layer deeply and define business extension points, which in theory can extend without limit.

Once the service layer is governed by the business framework and business-specific logic is added through extension points, core domain logic and domain extension logic are never mixed with business lines and business scenarios again.

## 4. Outlook

### 4.1 Service Orchestration
Cloud native is very popular right now, and service orchestration looks fashionable. What does that mean for service? From monolith to microservices, to distributed systems, and then to cloud native, the whole journey has been accommodating the growth of service: more traffic, more business, more complex services, which means more resources and governance to run them.

Many middleware products are moving toward Docker and Mesh, precisely so that services can be delivered and executed quickly. Given the huge user base on the internet, service releases and iterations must have minimal impact, so everything technical has to draw a line with service: whoever writes service only has to make sure the business logic is right and the processing is timely. But getting the service up and running requires much more technical work. Take microservice splitting: the core problem being solved is that all the services live together and are unhappy. After splitting, how do they coordinate, how do you operate the extra nodes, how do you govern the growing dependencies -- all of that comes from service.

Service orchestration needs to solve how services coordinate across nodes and clusters after being split. Another scenario: once the scale is large, the service layer has built the ability to manage itself, and low code lets new business plug into existing capabilities quickly.

### 4.2 Serverless and Service
The technology ecosystem has gradually expanded to multi-cluster, multi-center cell architectures. Much of the backend business logic work is really about technical problems: caches, messages, databases, and so on. One intuitive feeling is that intelligent operations have released most of the operational pressure. On the other hand, programmers will focus on writing business logic without worrying about package compatibility, framework versions, or middleware deployment. Serverless today is not directly related to service, but the eventual trend is that serverless will remove the technical components that service depends on, including stateful business information. The ideal case is that I only write the business service, and with a simple service container I can rely on serverless and cloud capabilities to run service-driven business.
