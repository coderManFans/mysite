---
title: "Tianhua: A Development and Testing Platform"
description: "An introduction to the architecture, core modules, automated testing workflow, AI Skills, and roadmap of Tianhua Development and Testing Platform V1.0.0."
pubDate: "2026-09-19"
tags: ["Tianhua", "Development and Testing Platform", "Vibe Coding", "Automated Testing", "AI Skills"]
category: "vibe-coding-projects"
draft: false
lang: "en"
translationKey: "tianhua-dev-test-platform-intro"
---
### 1. Project Overview

Hello, everyone. This post introduces Tianhua, my first Vibe Coding project. I mainly used Codex and DeepSeek to generate code and fix bugs.

Why call it a development and testing platform? A standalone testing platform is not enough for what I want to build. V1.0.0 starts with the testing workflow and brings together the API information, process data, and other dependencies needed throughout that workflow.

The following architecture diagram gives an overview of the capabilities included in V1.0.0:

![Tianhua V1.0.0 architecture](/images/blog/tianhua-dev-test-platform-intro/image-1.png)

The first release already includes a broad set of features, such as API documentation management, test-case management, and several supporting Skills. It also provides multiple approaches to automated testing. Together, these features form a small but relatively complete foundation for AI-assisted testing.

1. Database schema

The first version contains quite a few tables, but all initialization SQL is included in the project. Deployment is simple: it is currently a standalone application with few external dependencies, so the project can be started directly.

![Tianhua database schema](/images/blog/tianhua-dev-test-platform-intro/image-2.png)

2. API and test-case workflow

![Tianhua API and test-case workflow](/images/blog/tianhua-dev-test-platform-intro/image-3.png)

### 2. Core Modules

![Tianhua project modules](/images/blog/tianhua-dev-test-platform-intro/image-4.png)

#### 2.1 `api` Module

Aggregates cross-module business logic and handles API authentication. It exposes separate endpoints for web and open-access clients.

#### 2.2 `case` Module

Manages the complete lifecycle of test cases.

#### 2.3 `interface_doc` Module

Manages API documentation. In addition to standard documentation, it stores and displays API sequence diagrams.

#### 2.4 `user` Module

Handles supporting business functions for users, departments, and roles. These capabilities are not yet complete in V1.0.0.

#### 2.5 `ai-core` Module

Encapsulates interactions with large language models. The Java Agent and graph-based implementations still need time to mature, so this release mainly establishes the module boundary for future business logic.

#### 2.6 `common` Module

Contains shared business components and error-code definitions.

#### 2.7 `doc` and `skills`

These directories store feature designs, product designs, iteration notes, and the Skills used by the project. Even the small set of Skills currently included already provides useful support for the platform.

### 3. Project Demo

![Tianhua project demo — Image 1](/images/blog/tianhua-dev-test-platform-intro/image-5.png)

![Tianhua project demo — Image 2](/images/blog/tianhua-dev-test-platform-intro/image-6.png)

![Tianhua project demo — Image 3](/images/blog/tianhua-dev-test-platform-intro/image-7.png)

![Tianhua project demo — Image 4](/images/blog/tianhua-dev-test-platform-intro/image-8.png)

![Tianhua project demo — Image 5](/images/blog/tianhua-dev-test-platform-intro/image-9.png)

![Tianhua project demo — Image 6](/images/blog/tianhua-dev-test-platform-intro/image-10.png)

![Tianhua project demo — Image 7](/images/blog/tianhua-dev-test-platform-intro/image-11.png)

![Tianhua project demo — Image 8](/images/blog/tianhua-dev-test-platform-intro/image-12.png)

### 4. Future Plans

The current release focuses on testing. Future iterations will add product-side and development-side capabilities while ensuring proper permission isolation and integration between them.

### 5. Git Repositories

Java project:

[https://gitee.com/sky-painting/devTestPlat-java](https://gitee.com/sky-painting/devTestPlat-java)

Frontend project:

[https://gitee.com/sky-painting/dev-test-plat-web](https://gitee.com/sky-painting/dev-test-plat-web)
