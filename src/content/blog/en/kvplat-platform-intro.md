---
title: "KVPlat Platform Introduction"
description: "An introduction to a metadata-driven business KV configuration platform, including multi-tenancy, multi-level caching, configuration change reviews, and its core modules."
pubDate: "2026-09-18"
tags: ["KVPlat", "Low-code", "Spring Boot", "Vue", "Multi-tenancy"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "kvplat-platform-intro"
---
### 1. Project Overview

Hello, everyone. This post introduces another of my Vibe Coding projects: KVPlat, a metadata-driven business KV configuration platform.

What does it offer? Enterprises have many non-core business functions that still consume significant development effort—for example, RBAC permission systems, sales tables, business configuration tables, and enumerations. These models are often scattered across systems, carry varying amounts of business meaning, and may be defined repeatedly.

A metadata configuration platform can centralize common foundational business functions and connect them to frontend pages and interactions. In simple terms, KVPlat is similar to a low-code platform, but it focuses specifically on reusable business configuration. A configured business model can act as a business component or even a small standalone system. Models such as `department`, `team`, and `admin`, for example, can be configured entirely through the platform.

The following GPT-generated architecture diagram shows the capabilities available in V1.0.0:

![KVPlat business configuration platform architecture](/images/blog/kvplat-platform-intro/image-1.png)

V1.0.0 is an MVP that supports multiple tenants, multi-node deployment, multi-level caching, and configuration change reviews. Even its login and authentication flow uses a model configured through the platform itself.

1. Business hierarchy:

Tenant → Application → Instance → Instance Data → Metadata and Data Content

2. Database model

![KVPlat database model](/images/blog/kvplat-platform-intro/image-2.png)

The numbered tables are configuration-instance tables. Each configuration instance maps to an actual business table rather than being stored as JSON or as a document. This design leaves room for future iteration and refactoring.

At present, both the configuration platform and its instance data share a single database, which introduces some coupling. Future versions will therefore support multiple data sources and databases. For anyone who wants to study the project or continue developing it, V1.0.0 provides a useful starting point.

3. Configuration instance lifecycle

The following diagram provides a more intuitive view of how configuration instances move through the platform.

A change to the fields of a configuration instance is similar to a database schema change. The user submits a change request and can preview the result. When fields are added, removed, or modified, the platform automatically generates the corresponding `ALTER TABLE` statements. The user then only needs to review whether the proposed database changes match the intended configuration.

![Configuration instance lifecycle](/images/blog/kvplat-platform-intro/image-3.png)

4. Multi-level cache refresh and data-change mechanism

Because of space limitations, I will cover this in more detail in a future article on my WeChat official account.

5. Alibaba Page Agent

The frontend integrates Alibaba's open-source Page Agent. The Java backend exposes proxy APIs backed by the DeepSeek V4 Flash model.

I also tried Page Agent in another project, but the experience was far from ideal. I will explain what happened in a future post.

### 2. Core Modules

#### 2.1 API Module

This is a multi-module project with several client types, so the API module provides endpoints grouped under `/llm`, `/web`, `/open`, and `/client`. It also includes a manager layer that decouples calls between Maven submodules.

#### 2.2 Client Module

This module provides a client SDK that allows business applications to integrate quickly. During the Vibe Coding process, the LLM took inspiration from XXL-JOB's client-server architecture. The current implementation is flexible and packaged as a Spring Boot Starter, making it straightforward to integrate into sample projects.

#### 2.3 Config and Tenant Modules

These are the core business modules. The original goal was to standardize commonly used fields such as `id`, `state`, `status`, `name`, `code`, `created_by`, and `created_time`, then use those building blocks to configure roughly 80% of common business modules. The multi-level caching implementation also lives here.

### 3. Project Demo

![KVPlat home page](/images/blog/kvplat-platform-intro/image-4.png)

![Metadata configuration management](/images/blog/kvplat-platform-intro/image-5.png)

![Configuration instance management](/images/blog/kvplat-platform-intro/image-6.png)

![Instance data management](/images/blog/kvplat-platform-intro/image-7.png)

![Data model update review](/images/blog/kvplat-platform-intro/image-8.png)

![Cache monitoring](/images/blog/kvplat-platform-intro/image-9.png)

### 4. Future Plans

1. Implement menus, permissions, roles, and logs using the foundational capabilities of the configuration model.
2. Build an Agent that can quickly create applications and configuration instances.
3. Use LLMs to enrich the business layer of each instance.

### 5. Git Repositories

Java backend:

[https://gitee.com/sky-painting/kv-plat](https://gitee.com/sky-painting/kv-plat)

Vue frontend:

[https://gitee.com/sky-painting/kvPlatWeb](https://gitee.com/sky-painting/kvPlatWeb)

A Python project will be added later.

If you are interested, follow the Tianhua project for more platform tools. You can also follow my technical WeChat account, Shen Shuai's Tech Circle.
