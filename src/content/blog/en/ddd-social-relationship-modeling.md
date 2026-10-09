---
title: "DDD Four-Color Modeling in Practice: Social Relationship Modeling"
description: "A practical look at using DDD four-color modeling to map user relationships, key business moments, and domain objects in social platforms."
pubDate: "2026-10-08"
tags: ["DDD", "Four-Color Modeling", "Social Relationships", "Domain Modeling"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-social-relationship-modeling"
---
## 1. Introduction

In earlier articles, we introduced DDD modeling methods and the ubiquitous language. Here, we apply four-color modeling to several domains to see how object models can be derived and used to represent business behavior.

## 2. Case Study 1 -- Social Networking Applications

### 2.1 Background
Social applications have long accounted for a significant share of internet activity. Online tools make social information transferable, exchangeable, and measurable, but different products embody different kinds of social interaction. For this analysis, I divide them into two broad categories: text-based platforms such as portals, Weibo, and forums; and instant messaging (IM) products. These are two defining forms of online social interaction, so we will examine the basic business models behind representative products in each category. This article also tests whether someone without prior experience in the domain can derive a useful initial domain model through DDD four-color modeling.

### 2.2 General Business Sequence
![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 1](/images/blog/ddd-social-relationship-modeling/image-1.png)

### 2.3 User Relationship Model

Before modeling social relationships, we first need to understand user relationship models. Social products are built around user data and connections; once those foundations are in place, many other capabilities can grow from them. User relationships create traffic and enable use cases such as e-commerce, live streaming, food delivery, marketing, and payments. That makes the relationship model one of the most important parts of the social domain.

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 2](/images/blog/ddd-social-relationship-modeling/image-2.png)

### 2.4 Weibo, Blog, and Forum-Based Social Interaction

#### 2.4.1 Modeling Steps
1. **With the need to satisfy operations and management as a prerequisite, identify events or key business moments that require tracing;**

Here, we start with the first step of the business process, presenting these business events through timelines or tables. Diagram 2 already outlines the general business activities in social domains. Thus, let's use an UML sequence diagram to illustrate:

```plaintext
plat: 1. Register and complete personal information verification
userB --> plat: 1. Register and complete personal information verification

userA --> plat: 2. Post a Weibo, blog post, forum thread, article, announcement
userB --> plat: 2. Comment, forward, like, save userA's posted information
userA --> plat: 3. Create a group or circle, invite userB to join
userB --> plat: 3. Accept the invitation and join the group or circle
userA --> plat: 3. Chat within the group or circle
plat --> userA: 4. Monitor userA's social behavior information
plat --> userB: 4. Monitor userB's social behavior information
plat --> userA: 5. Apply social restrictions such as speech ban
plat --> userB: 5. Apply social restrictions such as speech ban
```

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 3](/images/blog/ddd-social-relationship-modeling/image-3.svg)

Summarizing the above:

Account registration; personal information setup; posting content; commenting; liking; saving; forwarding; creating groups, circles; speech ban; account cancellation;

2. **Identify key business moments and their corresponding objects based on these traced events;**

Using the summary above, we can roughly organize this into a table to produce the four-color prototype's key business moments:

| **Key Business Activities** | **Key Business Moment Objects** | **Notes** |
| --- | --- | --- |
| Account registration | Account information, user basic information | Personal information (name, avatar, username, password, educational background) |
| Posting content | Weibo, blog posts, forum threads | These are actually four business moment objects with different names in the business but essentially represent user-generated content. |
| Understanding content | Comments, forwards, likes, saves | Forwarding may vary across fields; for example, short text-based platforms like Weibo and blogs might have a single record while longer-form blogs can create new records. It's important to distinguish this. |
| Following | Fans, social relationships | Following generates other forms of social records. |
| Reading, browsing | Browsing logs | The platform records user access logs for other users' information, such as who visited your profile today. |
| Platform operations | Keyword filtering, speech ban, operational restrictions, opening up social relationship data | These are platform functions supporting the business domain. |

Based on this table, we can roughly understand the key business moments and objects in a social platform:

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 4](/images/blog/ddd-social-relationship-modeling/image-4.png)

3. **Enrich key business moments by adding basic objects as people, events, or things;**

Here, we enrich the key business moments with some fundamental objects representing people, events, and things:

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 5](/images/blog/ddd-social-relationship-modeling/image-5.png)

4. **Abstract roles from these people, events, or things;**

In this social model, it's easy to identify where roles can be abstracted—specifically, users and the social platform. Thus, we adjust our approach:

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 6](/images/blog/ddd-social-relationship-modeling/image-6.png)

After a user posts content, there needs to be an audit to check for any illegal information. This typically involves either automated intelligent auditing or manual review. A role is needed to carry out this task—usually performed by operations staff or customer service. We abstract the role of an administrator to handle this responsibility.

5. **Use objects to supplement some descriptive information;**

Some articles treat descriptive information as attributes of objects, such as what attributes a post object includes. However, there's another aspect: describing the relationships between these objects. While not core, it can add significant detail. We will refine the four-color model for Weibo/blogs/forums:

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 7](/images/blog/ddd-social-relationship-modeling/image-7.png)

#### 2.4.2 Domain Construction Model

Through this analysis and modeling process, we have derived the core domain model for social networking applications such as Weibo/blogs/forums. This means that through four-color modeling, we gradually analyzed and constructed these social platforms' key domain models.

### ![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 8](/images/blog/ddd-social-relationship-modeling/image-8.png)

#### 2.4.3 Domain Context Analysis

From the UML diagram in section 2.4.2, we can see two core contexts: one is related to posts, Weibos, and blogs; the other is user-related. In the user context, there are sub-contexts or common contexts such as login authentication, authorization, and social relationships. On the other hand, for platforms like Weibo/blogs/forums, there are supporting contexts such as comment handling, approval processes, event bus, etc.

### 2.5 Extension Context

When we choose a particular kind of social product, some capabilities need deeper customization. Weibo, for example, relies heavily on read-oriented statistics rather than repeatedly querying user data directly. Although analytics is not a core context, identifying it helps the system handle trending topics and other high-traffic data. Forum and blog products introduce more configuration-oriented contexts, including themes, page customization, permissions, points-based marketing, and memberships.

### 2.6 Code

We have analyzed the business model; for code implementation based on DDD, it would take some time to develop demo examples, which will be covered in future articles.

## 3. Case Study 2 -- Instant Messaging (IM) Applications

### 3.1 IM Business Sequence Extension

In the previous section, we outlined the general business sequence for social applications but left a tail end: how to establish pure communication-based IM social products. Here, we extend the business sequence to illustrate the business activities in an IM context.

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 9](/images/blog/ddd-social-relationship-modeling/image-9.png)

### 3.2 WeChat/QQ/DingTalk-Based Social Interaction

#### 3.2.1 Modeling Steps

Following the previous steps, we familiarize ourselves with the four-color modeling process.

1. **With the need to satisfy operations and management as a prerequisite, identify events or key business moments that require tracing;**

First, let's not rush into modeling key business activities but use the sequence diagram to outline the events in the business processes:

```plaintext
plat: 1. Register an account
userB --> plat: 1. Register an account
userA --> userB: 2. Add a friend
userB --> plat: 2. Join a group
userA --> userB: 3. Chat individually
userB --> plat: 3. Group chat, video chat, live stream
userA --> plat: 3. Create an enterprise
userA --> plat: 4. Create an organization
userB --> plat: 4. Add users to the organization
plat --> userB: 4. Create an email account
plat --> userA: 5. Create a group for the organization
userB --> plat: 5. Initiate a meeting
```

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 10](/images/blog/ddd-social-relationship-modeling/image-10.svg)

2. **Identify key business moments and their corresponding objects based on these traced events;**

Using the summary above, we can roughly organize this into a table to produce the four-color prototype's key business moments:

| **Key Business Activities** | **Key Business Moment Objects** | **Notes** |
| --- | --- | --- |
| Registering social accounts | User account information, authorization login details | Social accounts often support authorized logins. |
| Adding friends | Friend relationship records | There are various ways to add friends; here we focus on the friend relationship object. |
| Searching for users | User record lists | This involves finding potential friends from existing contacts, so user record lists are identified. |
| Chatting | Individual messages, group messages | Messages differ based on chat objects and locations. |
| Video chatting | Video messages | Using video tools to identify a message type. |
| Creating groups | Group relationship records | Groups are a core feature in social interactions; thus, group relationship records are emphasized. |
| Registering enterprises | Enterprise information | Social apps often support enterprise scenarios for office use. Enterprises need to integrate with their organizational structure. |
| Creating organizations | Organizational relationships | Mapping real-world enterprises and organizations into the social domain. |
| Initiating meetings | Meeting records | Special support in social scenarios for office settings. |
| Opening email accounts | Email accounts | Special support in social scenarios for office settings. |
| Live streaming | Live streams | Special support in social scenarios for live streaming. |

Based on this table, we can roughly understand the key business moments and objects in IM applications:

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 11](/images/blog/ddd-social-relationship-modeling/image-11.png)

3. **Enrich key business moments by adding people, events, or things;**

Here, we continue to expand the people, events, and things related to these key business moments, but this is more complex than in the social model because these moments appear as people, events, or things. Currently, a method to distinguish them is that key business moments are results of actions triggered by certain events.

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 12](/images/blog/ddd-social-relationship-modeling/image-12.png)

4. **Abstract roles from people, events, or things;**

From the key business moments, we have identified some people, events, and things. Abstracting roles helps us better understand which actions trigger these key business moments.

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 13](/images/blog/ddd-social-relationship-modeling/image-13.png)

5. **Use objects to supplement descriptive information;**

Through the analysis above, we have reached this step where identifying attributes related to people, events, or things is simpler. Note that these attributes do not necessarily come from key business moments and are not always derived from people, events, or things.

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 14](/images/blog/ddd-social-relationship-modeling/image-14.png)

#### 3.2.2 Domain Construction Model

Through the four-color modeling analysis of social relationships, we have derived three pieces of information: a complete four-color prototype diagram, a domain construction model, and a context for further discussion.

![Practical Application of Four-Color Modeling for Social Relationships -- Diagram 15](/images/blog/ddd-social-relationship-modeling/image-15.png)

The diagram remains a global, mostly static view, so it does not yet represent entities or aggregates. Later design stages can add value objects, entities, aggregates, and services through more focused diagrams. UML class diagrams can then express attributes and behavior in greater detail, as demonstrated in *Domain-Driven Design*.

#### 3.2.3 Domain Context Analysis

Deriving bounded contexts from the diagram is not straightforward, but the social domain is fundamentally where messages and relationships intersect. This suggests two core contexts: messaging and user relationships. The messaging context covers direct messages, group messages, announcements, and notifications. The user relationship context covers personal groups and friendships, while enterprise-oriented relationships introduce organizational contexts such as meetings, tasks, and teams.

### 3.3 Extension Context

Let's look at some extension contexts for social IM applications. There are many types of IM apps with diverse features such as WeChat, DingTalk, Facebook, Twitter, etc. After identifying core contexts, we can extend them based on these: For example, adding mini-programs in WeChat and DingTalk; integrating steps, official accounts, payments, etc.

## 4. Conclusion

I have worked on some social product functionalities but not the core models or unique features of such products. However, through DDD's four-color modeling approach and theoretical methods, I was able to derive an approximate model for social applications. To gain more industry-specific knowledge and apply it in practice, this is just a small part of the work needed.
