---
title: "DDD in Practice -- Social Relationships (Blog/Topic)"
description: "A DDD code walkthrough for blog and forum products: package decomposition, collaboration between the application and domain layers, and the publish-post and follow-user call flows."
pubDate: "2026-11-17"
tags: ["DDD", "Code Practice", "Domain Modeling", "COLA", "Spring Boot"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-code-practice-social-blog-topic"
---
## 1. Background

Earlier articles covered a lot of DDD theory: books, arguments, and summaries. Eventually some hands-on material is needed, and many readers have been asking for a DDD project codebase. As the saying goes, if you can do it, don't just talk about it. But DDD does have a learning curve, and mastering it fully takes real digging.

So this article builds on the earlier social relationship modeling article and presents a DDD code sample for a blog and forum product.

## 2. Domain Analysis

### 2.1 Core Domains
- Blog post domain
- User membership domain

### 2.2 Supporting Domains
- Moderation domain
- Account authentication
- Entitlement domain

## 3. Building the Domain Services

### 3.1 Packaging Domain Services
To keep the demonstration simple, domain services are represented as packages. The domain analysis above gives us two core services: blog/topic, and member (or user). Two packages are enough:

```txt
com.coderman.domainservice
├── blogtopic
└── member
```

### 3.2 Subpackages of a Domain Service

- `XXXDO`: data object
- `XXXBO`: domain business object
- `XXXDTO`: adapter object, data transfer object

For the package strategy, see COLA: <https://blog.csdn.net/significantfrank/article/details/110934799>

#### 1. Domain Service Package
For demonstration purposes, every domain lives under this package, which acts as the top-level path:

```txt
com.coderman.domainservice
```

#### 2. Blog/Post Domain Service Package

```txt
com.coderman.domainservice.blogtopic
```

##### 2.1 Controller (Adapter) Package
Subpackages include the admin side (admin) and the web side (web):

```txt
com.coderman.domainservice.blogtopic.adapter
```

##### 2.2 Application Layer Package
This package has more subpackages:

```txt
com.coderman.domainservice.blogtopic.app
```

Subpackages:

- `clientimpl`: implementation of the APIs exposed to the outside
- `command`: command models
- `consumer`: handles external messages
- `executor`: handles requests, including commands and queries
- `query`: queries

##### 2.3 Client Package
Subpackages are api and dto. It simulates the service interfaces exposed by the Dubbo framework, implemented in the application layer:

```txt
com.coderman.domainservice.blogtopic.client
```

##### 2.4 Domain Package
This package has more subpackages:

```txt
com.coderman.domainservice.blogtopic.domain
```

Subpackages:

- `ability`: domain capabilities
- `convertor`: object conversion
- `factory`: object factories
- `gataway`: domain gateway interfaces
- `model`: domain models (subpackages: entity, event, valueobject)

##### 2.5 Infrastructure Package
This package has more subpackages:

```txt
com.coderman.domainservice.blogtopic.infrast
```

Subpackages:

- `cache`: caching -- integrates a cache middleware
- `config`: configuration -- integrates a configuration middleware
- `dubbo`: Dubbo framework package -- the Dubbo adapter
- `elasticsearch`: search -- integrates a search engine
- `gatawayimpl`: domain gateway implementations
- `mapper`: persistence (subpackages: dao, dataobject)
- `mq`: messaging (subpackages: consumer, provider) -- integrates a messaging middleware
- `model`: domain models (subpackages: entity, event, valueobject)
- `rest`: integration with REST frameworks, similar to the Dubbo package

#### 3. User Membership Domain Package

```txt
com.coderman.domainservice.member
```

Note: users, membership entitlements, and accounts are all placed in a single domain here. If you want to refine it further, they can be split into subdomains.

The difference: the package strategy is similar to the blog/post domain, but the business model packages under the domain package are separated:

```txt
com.coderman.domainservice.member.domain.model
```

Subpackages:

- `memberright`: membership entitlement models
- `user`: user information and account models

## 4. Call Flows

### 4.1 Publishing a Blog Post

![DDD in Practice -- Social Relationships (Blog/Topic) Diagram 1](/images/blog/ddd-code-practice-social-blog-topic/image-1.svg)

1. The client calls the controller method `publishBlog()`.
2. The controller turns the request into a command through the command executor.
3. The command executor validates the business logic and orchestrates the business calls.
4. The application layer calls the domain gateway services (repository, factory).
5. The domain layer executes the domain services.
6. The domain layer calls the DAO to persist the blog data.
7. The application layer calls the adapter to invoke the downstream blog content service.
8. The infrastructure layer listens for messages.
9. The infrastructure layer calls the domain service to consume the moderation result message.
10. The domain layer calls the application layer's consumer service to consume the message.
11. The application layer sends the "post published" MQ message.
12. The application layer calls the business notification service.

### 4.2 Following a User

![DDD in Practice -- Social Relationships (Blog/Topic) Diagram 2](/images/blog/ddd-code-practice-social-blog-topic/image-2.svg)

1. The client initiates following someone.
2. The controller turns the request into a command through the command executor.
3. The application layer calls the domain gateway services.
4. The domain layer calls the DAO to persist the relationship data.
5. The domain layer updates the statistics in the cache.
6. The domain layer calls the business notification service.

## 5. Code Notes

### 5.1 Repository
Only the blogDemo project is available at the Git address below. Other business scenarios will be added later, so stay tuned.

<https://gitee.com/codergit.com/dddin-action.git>

### 5.2 Project Package Structure

![DDD in Practice -- Social Relationships (Blog/Topic) Diagram 3](/images/blog/ddd-code-practice-social-blog-topic/image-3.png)

### 5.3 Project Notes

1. To keep the demonstration simple, mapper, cache, ES, and MQ are mocked with empty implementations. When you actually introduce the corresponding middleware, just replace the empty implementation in the matching subpackage.
2. The project is a plain Spring Boot application, so you can try implementing different business logic in different packages to see how it feels.
