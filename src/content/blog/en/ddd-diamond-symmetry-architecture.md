---
title: "Diamond Symmetry Architecture: Combining Hexagonal and Layered Ideas"
description: "An overview of Zhang Yi's Diamond Symmetry Architecture: its origins, northbound and southbound gateways, ports and adapters, where it has been applied, and the trade-offs compared with layered and hexagonal architectures."
pubDate: 2026-11-26
tags: ["DDD", "Diamond Symmetry Architecture", "Hexagonal Architecture", "Ports and Adapters", "Architecture Design"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-diamond-symmetry-architecture"
---
Choosing an architecture style is often harder than the modeling itself when applying DDD. Layered architecture is simple and familiar, but infrastructure details tend to leak into the domain. Hexagonal architecture isolates technical concerns from business logic, at the cost of extra concepts such as ports and adapters. Diamond Symmetry Architecture sits between those two approaches.

These notes collect what I learned about it: the problem it addresses, its core elements, where it has been applied, and the trade-offs I see when evaluating it. They are based on public material and conversations with the author. I have not built a complete system with it, so treat this as an evaluation checklist rather than a hands-on guide.

## 1. Background

### 1.1 Origins

Zhang Yi, a DDD specialist and consultant at Thoughtworks (TW), proposed Diamond Symmetry Architecture as an application architecture that combines the strengths of hexagonal and layered architecture. Its full name is the **Diamond Symmetry Architecture pattern**.

### 1.2 Architecture Diagram

![Diamond Symmetry Architecture: the domain at the center, with ports and adapters connecting to northbound and southbound gateways](/images/blog/ddd-diamond-symmetry-architecture/image-1.png)

### 1.3 Core Elements

Northbound gateways, southbound gateways, local gateways, remote gateways, ports, and adapters.

If we translate the diagram into the lifecycle of an ordinary request: an external request enters through a **northbound gateway** and is translated into a call the domain understands. Inside the domain, only its own business context matters. When external resources are needed, the call leaves through a **southbound gateway**, and an adapter talks to the specific database, message broker, or third-party API. The local/remote distinction expresses whether the interaction happens inside the same process or crosses a service boundary.

## 2. Where It Has Been Applied

Public material on the pattern is limited, so this section mainly comes from conversations with Zhang Yi. Organizations including ICBC and JD Logistics have built business systems on this architecture.

He has also published demo code:

<https://github.com/agiledon/diamond>

## 3. Advantages and Trade-offs

Since I have not implemented a project with this architecture, the following are only preliminary observations.

**Advantages:**

1. It removes the explicit application and infrastructure layers and concentrates on building and mapping business contexts.
2. Northbound and southbound gateways separate the responsibilities of different subpackages and make inbound and outbound flows easy to read.

**Drawbacks:**

1. Northbound and southbound gateways add concepts and raise the cost of understanding the architecture.
2. The emphasis on adapters, ports, gateways, and anti-corruption layers brings more technical vocabulary into design discussions, which adds adoption cost.
3. Because it focuses on business contexts, technical and business concerns may not be fully separated.

My take: if your team already understands hexagonal architecture and can accept an extra gateway abstraction, Diamond Symmetry Architecture makes how contexts receive and emit calls easier to follow. If the team is still working in a layered style, introducing it early tends to spend a lot of design-review time explaining terminology.

## Further Reading

- [DDD Architecture Styles](/en/blog/ddd-architecture-styles/): how traditional layered, hexagonal, onion, clean, CQRS, COLA, and REST architectures compare.
- [The DDD Handbook](/en/blog/ddd-handbook/): this topic in the context of a broader DDD learning path.
