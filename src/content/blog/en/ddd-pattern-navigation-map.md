---
title: "Domain-Driven Design Original Book Pattern Navigation Diagram"
description: "Organize the pattern relationships diagram from The Domain-Driven Design book, covering model-driven design, model integrity, flexible design, large-scale structures, and strategic distillation."
pubDate: "2026-10-10"
tags: ["DDD", "Domain-Driven Design", "design patterns", "Navigation Map", "architecture"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-pattern-navigation-map"
---
When reading *Domain-Driven Design*, the original book uses a set of relationship diagrams to connect various patterns through their dependencies and combinations into a network. These diagrams provide a more intuitive explanation of why a certain pattern exists, which problems it addresses, and which other patterns it relies on.

Here are eight navigation maps organized according to the original book's structure, preserving the page numbers within the diagrams for easy reference against the original text.

## General Overview Diagrams

Two general overview diagrams cover the full scope of all patterns in the book. The first one shows the relationships between building blocks, while the second one illustrates the relationships between strategic design and refinement.

![General Overview Map 1: Relationships Between Building Block Patterns, Including Entities, Value Objects, Services, Modules, Aggregates, Factories, Repositories, and Layered Architecture](/images/blog/ddd-pattern-navigation-map/image-1.png)

![General Overview Map 2: Relationships Between Strategic Design and Refinement Patterns, Including Core Domain, Subdomain, Bounded Context, Context Maps, and Evolving Order](/images/blog/ddd-pattern-navigation-map/image-2.png)

## I. Navigation Map for MODEL-DRIVEN DESIGN Language

This map shows how Model-Driven Design expresses models through entities, value objects, services, aggregates, factories, and repositories, as well as how layered architecture isolates the domain.

![Navigation Map for Model-Driven Design Language: Relationships Between Entities, Value Objects, Services, Aggregates, Factories, Repositories, Layered Architecture, and Smart UI](/images/blog/ddd-pattern-navigation-map/image-3.png)

## II. Navigation Map for Patterns of Model Integrity

A set of patterns that maintain model integrity, including Bounded Context, Continuous Integration, Context Maps, Shared Kernel, Client-Supplier, Conformist, Anticorruption Layer, Open Host Service, and Separate Ways.

![Navigation Map for Patterns of Model Integrity: Relationships Between Bounded Context, Continuous Integration, Context Maps, Shared Kernel, Anticorruption Layer, and Open Host Service](/images/blog/ddd-pattern-navigation-map/image-4.png)

## III. Navigation Maps for Some Patterns That Aid Flexible Design

Patterns related to flexible design, including side-effect-free functions, assertions, Intention-Revealing Interfaces, Closure of Operation, Conceptual Contours, and Standalone Classes.

![Navigation Map for Patterns of Flexible Design: Relationships Between Side-Effect-Free Functions, Assertions, Intention-Revealing Interfaces, Closure of Operation, Conceptual Contours, and Standalone Classes](/images/blog/ddd-pattern-navigation-map/image-5.png)

## IV. Navigation Maps for Some Large-Scale Structure Patterns

Large-scale structure patterns, including System Metaphor, responsibility layers, knowledge hierarchies, pluggable frameworks, and Evolving Order.

![Navigation Map for Large-Scale Structure Patterns: Relationships Between System Metaphor, Responsibility Layers, Knowledge Hierarchies, Pluggable Frameworks, and Evolving Order](/images/blog/ddd-pattern-navigation-map/image-6.png)

## V. Navigation Map for Strategic Refinement

Strategic refinement patterns, including core domain, subdomain, domain vision statement, separation of core, abstraction of core, highlighting the core, cohesion mechanisms, and declarative design.

![Navigation Map for Strategic Refinement: Relationships Between Core Domain, Subdomain, Domain Vision Statement, Separation of Core, Highlighting the Core, and Cohesion Mechanisms](/images/blog/ddd-pattern-navigation-map/image-7.png)

## VI. Navigation Map for Large-Scale Structure Combined with BOUNDED CONTEXT

When large-scale structures are combined with Bounded Contexts, how context maps, Ubiquitous Language, core domain, and Evolving Order are organized.

![Navigation Map for Large-Scale Structure Combined with BOUNDED CONTEXT: Organization of Context Maps, Ubiquitous Language, Core Domain, and Evolving Order](/images/blog/ddd-pattern-navigation-map/image-8.png)
