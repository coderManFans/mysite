---
title: "DDDPlus: A DDD Framework for Business Middle Platforms"
description: "An overview of DDDPlus: its positioning and origins, the modules in its business-platform blueprint, its core features and official demos, and the trade-offs around extensibility, coupling, and maintainability."
pubDate: 2026-11-26
tags: ["DDDPlus", "DDD", "Business Middle Platform", "Extension Points", "Application Framework"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-dddplus-framework"
---
The earlier posts on COLA and Diamond Symmetry Architecture were essentially about placing code in the right layers. When a system must serve front-end applications from several business lines, however, the question shifts from "how do we layer this" to "how do we let different business lines extend the same core capabilities without contaminating each other".

DDDPlus targets that second scenario. It positions itself as a lightweight framework for building business middle platforms: DDD organizes the core model, while extension points and plugin mechanisms absorb business-line differences. These notes cover its positioning, core modules, official samples, and my assessment after reading its source and documentation.

## 1. Background

### 1.1 Positioning

DDDPlus is a lightweight **framework for developing business middle platforms**. It is grounded in [DDD](https://github.com/funkygao/cp-ddd-framework/wiki/DDD) and aims to make business assets reusable and transferable. It addresses extensibility in complex business scenarios and implements the [core elements of a middle platform](https://github.com/funkygao/cp-ddd-framework/wiki/%E4%B8%9A%E5%8A%A1%E4%B8%AD%E5%8F%B0%E7%9A%84%E6%A0%B8%E5%BF%83%E8%A6%81%E7%B4%A0).

### 1.2 Origins

FunkyGao initiated and open-sourced the project. It has gone through multiple releases with a range of features.

### 1.3 Business Middle Platform Blueprint

![DDDPlus blueprint: front-end business applications A-D, middle-platform order, marketing, and inventory centers, and framework modules such as dddplus-runtime, dddplus-enforce, and dddplus-spec](/images/blog/ddd-dddplus-framework/image-1.png)

The diagram shows how responsibilities are divided:

- **Top layer:** several front-end business applications (A to D), each serving a different scenario.
- **Middle layer:** business middle platforms such as the order center, marketing center, and inventory center, which accumulate reusable core capabilities.
- **Lower layer:** the framework itself, split by responsibility. `dddplus-runtime` provides the runtime container and extension-point invocation, `dddplus-enforce` verifies architectural constraints through ArchUnit and architecture anti-corruption rules, and `dddplus-spec` describes domain specifications. Interfaces such as `IDomainModel`, `DomainAbility`, `IDomainService`, `IDomainStep`, `IDomainExtension`, and `ISpecification` express domain models and capabilities.
- **Right side:** extension packages for each front-end business. Business-specific behavior lives here instead of scattering across the platform's core code.

## 2. Releases

### 2.1 Project Links

- GitHub: <https://github.com/dddplus>
- Gitee: <https://gitee.com/funkygao/cp-ddd-framework>

### 2.2 Release History

At the time of writing, the repository had published several releases based on its commits and release records. Because DDDPlus is positioned as a framework for business middle platforms, its core ideas have not changed much across releases.

### 2.3 Core Elements and Features

1. A business middle-platform framework built on DDD ideas.
2. Extension points and business isolation.
3. Project scaffolding through [dddplus-archetype](https://github.com/dddplus/dddplus-archetype).
4. Orchestration at the capability and service-interface level.

## 3. Adoption

According to the open-source documentation, a number of companies use it, though public material is limited. The official samples are:

1. <https://github.com/dddplus/dddplus-archetype-demo>
2. <https://github.com/dddplus/easyapp>
3. <https://github.com/dddplus/dddplus-demo>

## 4. Advantages and Trade-offs

Public information from the project authors is limited, and I have not spoken to them directly. I did spend some time reading the framework source and the demo projects referenced in the documentation, and here are a few observations.

**Advantages:**

1. It approaches architecture from a business middle-platform perspective and provides a useful reference model and sample implementation.
2. Its core features resemble Alibaba's TMF and related products: extension points and plugin mechanisms address the complexity of multi-dimensional business platforms.
3. Annotations and extension points enable interface-level capability orchestration, which offers ideas for managing commercial capabilities.

**Drawbacks:**

1. Development had paused at the time of writing, and the commit history suggested a low level of activity.
2. Because it is a framework, it couples tightly to business code by nature, which adds a cognitive burden for developers.
3. Some of the code and package boundaries do not separate technical and business concerns cleanly.
4. The project skeleton generates many submodules, which becomes hard to maintain in a complex codebase.

## Summary

If a team is building a business middle platform that needs one core implementation plus differentiated extensions per business line, DDDPlus's extension-point design is worth studying, especially its decision to make architectural enforcement (`dddplus-enforce`) a framework capability. For a single-domain business system, however, the framework constraints and scaffolding may offer limited benefit while adding coupling and maintenance cost.

## Further Reading

- [COLA Application Architecture: From 1.0 to 4.0](/en/blog/ddd-cola-architecture/): a more widely adopted way to implement DDD-style application architecture.
- [Diamond Symmetry Architecture](/en/blog/ddd-diamond-symmetry-architecture/): another route, centered on architecture style.
- [The DDD Handbook](/en/blog/ddd-handbook/): this topic within a broader DDD learning path.
