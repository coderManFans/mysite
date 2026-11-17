---
title: "DDD in Practice -- Membership Marketing (Badminton Club Membership System)"
description: "DDD in practice for membership marketing: an outline of a badminton club membership system covering merchandise sales, time-slot management, membership cards, discounts, and billing."
pubDate: "2026-11-17"
tags: ["DDD", "Code Practice", "Membership Marketing", "Domain Modeling"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-code-practice-member-marketing"
---
## 1. Background

This is one of the DDD in practice series, and the topic is membership marketing. As with the earlier social relationships (Blog/Topic) code sample, the goal is to take a small but complete business scenario and turn the modeling conclusions into working code.

The scenario is a badminton club membership system. The club rents courts by time slot, sells small merchandise at the front desk, and also has to manage membership cards, discount rules, and billing. A small business like this looks simple, but members, entitlements, pricing, and settlement are intertwined -- which makes it a good exercise in domain modeling.

## 2. Badminton Club Membership System

Split by business module, the system mainly consists of five parts:

1. Merchandise sales
2. Time-slot management
3. Membership cards
4. Discounts
5. Billing

Each module will later be filled in following the DDD packaging strategy: domain models, application services, and infrastructure adapters, eventually forming a runnable membership marketing sample project.

## 3. Original Links

This series was first published on WeChat. The original articles are:

- [Membership marketing, original post 1](https://mp.weixin.qq.com/s?src=3&timestamp=1618453692&ver=1&signature=z89BT7izRQqAOqfHNUSp8rXVA9kPs1dUCtiHhOM56i8L*lXzTjQ26nWVUUjQd*NpWAQn6WE*eEkDDiTi3dHff7Tzf3J2PDNAylLGYKMGQHZj79cwwKOTTTB8jGlpfpK9mE6EPrHnxs6eXxqm*N8--GE4Qps4CXV7pHMec4QRqCE=)
- [Membership marketing, original post 2](https://mp.weixin.qq.com/s?src=3&timestamp=1618454304&ver=1&signature=WHCzB7o1QDP03iKkfMnz3LsUzOkeCTVjpbjl3P1ko*oGDoGITWbAZrAbEPZxF-JOMWHejJXe5ODb2cdrgp17szRYKYuL-WFYtKMcIsik7lXB7NXS5H5oP6wHkAK1dpfKdja8ntNwiYdSGluH7ZoVA1IhrA6dCMPZHgfdwPuIZcM=)
- [Membership marketing, original post 3](https://mp.weixin.qq.com/s?src=11&timestamp=1618454411&ver=3009&signature=YlcDse-YUHeIu9Q7GYM8oBJ9MPPh3lRggNorm*nPk5V93G9*i*4LGOuOaspLnHsXGnJ3UTBsHXzc0OZNHNsd3UArHQ-HQzmYwoc2VePqfxl2adk8RRWFr71j3RUliyCN&new=1)
