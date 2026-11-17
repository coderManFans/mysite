---
title: "Thoughts on Cross-Layer Calls in DDD"
description: "A COLA-based look at cross-layer calls in DDD: Alibaba's layered conventions, CQRS queries, message callbacks, the conformist pattern, and how to handle cross-layer return values."
pubDate: "2026-11-17"
tags: ["DDD", "Cross-Layer Calls", "COLA", "CQRS", "Architecture Design"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-cross-layer-calls"
---
## 1. Background

Recently, while building the basketball operations platform demo source code with COLA, I did some deep thinking about cross-layer calls. Some of those calls do not strictly follow the conventions or the relatively fixed layered model, which raises questions: if I do not follow the conventions, how do I control code quality? How do I know what the best practice is?

Another issue is that there really are not many DDD codebases and cases today, and even fewer projects that deeply integrate all kinds of middleware and call patterns. Most of the time it is theory plus feeling your way forward across the river. This article combines recent code practice with some points from conversations with the author of COLA to describe cross-layer call scenarios.

## 2. Thinking About Conventions

In architectural style or architectural thinking, cross-layer calls are currently not the good kid. Cross-layer calls easily make a project unstable: DTO conversion, coupling across layers that becomes unmaintainable later. But in practice, cross-layer calls appear like a ghost, at any time. From earlier posts on architectural styles, we know that in clean architecture, onion architecture, and strictly layered architecture, only the outer layer depends on the inner layer, and cross-layer calls do not happen -- each layer in the call chain has its own responsibility.

Many people are attached to conventions, and that is understandable, but idealized engineering models are hard to fully realize in reality, so strict cross-layer call conventions do not apply to every scenario. Below we look at some cases that break the cross-layer call conventions.

## 3. Scenarios That Break the Conventions

### 3.1 The Alibaba Java Development Manual
![Thoughts on Cross-Layer Calls in DDD Diagram 1](/images/blog/ddd-cross-layer-calls/image-1.png)

The diagram above is the layered architecture illustration from Section 1 of Chapter 6 of the Alibaba Java Development Manual (Songshan edition). It is clearly a loose layering model: it does not strictly require that the upper layer only depends on the layer directly below, but allows loose combinations of upper and lower layers. Of course, that diagram was not written with DDD in mind.

Now let's look at the DDD application layering, shown below as a loose layered architecture pattern:

![Thoughts on Cross-Layer Calls in DDD Diagram 2](/images/blog/ddd-cross-layer-calls/image-2.png)

Once you remove the dependency arrows for cross-layer calls, it is like stacking blocks one on top of another, with no relationship across layers. According to discussion in the DDD community, both architecture styles are quite harmful, especially the loose layered architecture.

### 3.2 CQRS Calls
In a CQRS architecture diagram, the Query layer is clearly the flexible part. Generally, whether you apply CQRS on its own or inside DDD, you face the question of whether a query should go through the business layer or the domain layer. Complex query scenarios include paging queries, exports, multi-table aggregate queries, multi-datasource aggregate queries, and single-datasource search engines. Compared with commands, these queries are heavier, and once implemented they are not easy to change, but they do have an advantage: they are relatively stable and easy to maintain if there is not much business logic behind the iteration. Another point is that these queries can sit closer to the upper layers, such as the application layer or the adapter layer. To meet performance requirements, queries are usually not constrained by DO/BO conversion. So merging CQRS queries into a loose layered architecture is relatively easy.

One more remark: when this kind of cross-layer call appears, how should the query result model be defined and managed?

My suggestion is that the lower layer still uses the DO model, but it can skip the BO, and the application layer receives it with an aggregate DTO. Another option is to have the DAO/mapper return the DTO model directly, but then that one layer looks a bit out of place among the others.

### 3.3 Message Callbacks
In the message callback scenario, cross-layer calls stand out. For example, in COLA the infrastructure layer already integrates MQ middleware, so sending and receiving messages necessarily goes through infrastructure services. A domain service project sending a message clearly follows inter-layer dependency, but consuming a message looks odd, because the message definitely comes from the infrastructure layer. So who consumes it? If there are multiple business lines, should the message go to the application layer first? There is also the problem that the application layer does not include the MQ middleware dependency, which basically puts message listening in the infrastructure layer.

In COLA practice, once CQRS is integrated in the application layer, the application layer may depend on infrastructure services. But consuming messages can only be initiated from the infrastructure layer, so one possible solution is for the infrastructure layer to reference the application layer, creating a mutual dependency. That is probably not the best solution.

Let's explore another possible approach. Because the domain layer sits in between, and the application layer certainly depends on the domain package. In the earlier blog post domain code practice, I briefly simulated this whole domain packaging practice, calling the app layer from the mq part of the infrastructure layer -- basically still within the same module, so the impact is small. The trading core platform project I am responsible for now also does not split the domain layer out separately. So one possible approach is to merge the app layer + domain layer + infrastructure layer together and organize the code with an agreed packaging strategy. Of course, splitting the domain model out as its own module would be a bit better.

But suppose I insist on splitting modules on top of the packaging strategy, following COLA's packaging model. Then how should message consumption be solved?

I have been thinking about this for the past couple of days. Combining our company's business scenarios and the code of the trading core project, message consumption can currently be divided into application-layer messages and domain-layer messages. Let me explain the difference.

- **Domain-layer messages**: messages related to your own core model. For example, a trading center's core domain model has a payment order that integrates with a payment center; the payment result message returned by the payment center counts as a domain-layer message for the trading center.
- **Application-layer messages**: messages that have little to do with your own core model. For example, the trading center's core domain model has no such business model or scenario, but you need to listen to messages from other systems to adjust your own core model's data and state. There are many such scenarios: middle-platform projects often need to integrate with the platform systems of various business lines, and each platform system has its own business model to connect to the platform's core domain model. From the middle platform's point of view, the specific scenarios of these business-line platforms belong to the middle platform's application layer, and this application-layer business connects its data model to the core domain model.

With a rough understanding of these two kinds of messages, message callbacks become much easier to handle in cross-layer calls and multi-module packaging. For domain-layer message consumption, the consumption logic can be defined through a domain service interface, such as a gataway.

For application-layer message consumption there are currently two approaches:

1. Use a package such as `ability` inside the domain layer as the message consumption entry point.
   - Pros: avoids cross-layer calls.
   - Cons: easily pollutes the domain model, mixing specific business scenarios into the core domain model and making the code messy.
2. Use Spring's application event publish/consume mechanism.
   - Pros: consumption logic and triggering logic are separated, avoiding cross-layer calls.
   - Cons: consumption code is hard to manage in one place; it introduces a second round of message consumption and subscription, and the code is harder to understand.

Let's analyze the feasibility of the second approach.

If RocketMQ is used as the message middleware, the message listener code (XXListener) should be in the infrastructure layer, and the message is then published through Spring's application event publish/subscribe mechanism. The Spring event listener in the application layer receives the message and the application layer triggers the business logic again. Since the whole project is certainly coupled to the Spring framework anyway, this mechanism can be used to forward the message again. The message body can be returned as a map, or converted in XXListener into the domain-layer message model before reaching the application layer, so the application layer does not need to convert again.

Overall, cross-layer calls in message callbacks are affected by many factors -- after all, distinguishing the consumed messages also raises the understanding barrier. For now, it is better to avoid cross-layer calls in message callbacks.

### 3.4 The Follower (Conformist) Pattern

When I was learning the 40+ DDD patterns, one pattern left a strong impression. It is not very well known, but it is useful for service-to-service calls. Here is the definition of the follower pattern:

> By strictly following the upstream team's model, you can eliminate the complexity of translating between BOUNDED CONTEXTS. Although this restricts the style of downstream designers and may not yield an ideal application model, choosing the CONFORMITY pattern can greatly simplify integration. It also lets you share the UBIQUITOUS LANGUAGE with the supplier team. The supplier is in a dominant position, so it is best to make communication easy; they will share information with you out of altruism.

Eric's book mostly describes the problems the follower pattern causes between teams and in upstream/downstream collaboration, along with the rough solutions. Applying it at the code level may be less intuitive. For example, the document conversion and upstream/downstream calls between a business order system, a trading system, and a payment system show exactly this kind of collaboration problem. Usually the business order system converts and adapts data according to the trading system's model, and the trading system converts and adapts according to the payment system's model, possibly adding an anti-corruption layer in between to prevent the core domain model and business from being polluted.

That is the more common situation. Let me describe two other scenarios:

1. I want all the upstream data, so I copy and process the upstream data model directly.
2. I take upstream data according to what downstream needs, but I do not store it; I call downstream and hand it over directly.

All of these are examples of the follower pattern. In code, I do not need to bring the upstream model into my own domain layer to recognize it -- adapting at the DTO level is enough. Likewise, when I need to call downstream, I do not need to go through the domain layer; I can call directly through the anti-corruption layer or the adapter layer. In a COLA project module, the application layer (app) or the adapter layer (adapter) can call the infrastructure layer's (infrast) external service interfaces directly.

Of course, this kind of cross-layer call is also easy to handle, and not hard to put into practice.

### 3.5 Handling Return Values of Cross-Layer Calls

The scenarios above covered cross-layer calls; here I want to specifically address how to handle their return values. Normally, when an upper layer calls a downstream interface, what comes back is the downstream's own wrapper of its business domain: data, code, and msg. But sometimes the upper layer needs to know information from further downstream, and that requires special handling.

## 4. Summary

Why did I say in Section 3 that DDD's loose layered architecture is quite harmful? I think there are a few reasons:

1. Following the crowd, copying and pasting.
2. A subconscious belief that loose layering is flexible and easier to practice.
3. Because cross-layer calls exist, practitioners can apply this strategy without conditions or constraints.

In the end, much of the code produced through cross-layer practice becomes hard to maintain, and in complex multi-module systems cross-layer calls are even harder to refactor.

In architecture practice, what fits is best. But that does not mean applying cross-layer calls at will, nor strictly following upper/lower-layer dependency calls. Instead, decide deliberately and carefully, based on requirements and technical scenarios, whether a cross-layer call is warranted -- generally 90% of scenarios do not need one.
