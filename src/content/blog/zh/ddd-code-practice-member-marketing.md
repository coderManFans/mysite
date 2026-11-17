---
title: "DDD 代码实践篇：会员营销（羽毛球馆会员系统）"
description: "DDD 代码实践系列之会员营销：以羽毛球馆会员系统为例，梳理小商品售卖、时段管理、会员卡、优惠与账单等业务模块的大纲。"
pubDate: 2026-11-17
tags: ["DDD", "代码实践", "会员营销", "领域建模"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "ddd-code-practice-member-marketing"
---
## 一、背景
本文是 DDD 代码实践系列中的一篇，主题是会员营销。和前面社交关系（Blog/Topic）的代码样例一样，这里继续用一个小而完整的业务场景，把领域建模的结论落到工程代码里。

这次的场景是一个羽毛球馆的会员系统：球馆既有场地按时段出租，也有前台售卖的小商品，同时还要管理会员卡、优惠规则和账单结算。这类“小生意”看起来简单，但会员、权益、定价、结算交织在一起，正是练手领域建模的好素材。

## 二、羽毛球馆会员系统
按业务模块拆开，这个系统主要包含五部分：

1. 小商品售卖
2. 时段管理
3. 会员卡
4. 优惠
5. 账单

每个模块后续都会按 DDD 的分包策略补齐领域模型、应用服务与基础设施适配，最终形成一个可以运行的会员营销工程样例。

## 三、原文链接
本系列最早发布在微信公众号上，相关原文链接如下：

- [会员营销原文 1](https://mp.weixin.qq.com/s?src=3&timestamp=1618453692&ver=1&signature=z89BT7izRQqAOqfHNUSp8rXVA9kPs1dUCtiHhOM56i8L*lXzTjQ26nWVUUjQd*NpWAQn6WE*eEkDDiTi3dHff7Tzf3J2PDNAylLGYKMGQHZj79cwwKOTTTB8jGlpfpK9mE6EPrHnxs6eXxqm*N8--GE4Qps4CXV7pHMec4QRqCE=)
- [会员营销原文 2](https://mp.weixin.qq.com/s?src=3&timestamp=1618454304&ver=1&signature=WHCzB7o1QDP03iKkfMnz3LsUzOkeCTVjpbjl3P1ko*oGDoGITWbAZrAbEPZxF-JOMWHejJXe5ODb2cdrgp17szRYKYuL-WFYtKMcIsik7lXB7NXS5H5oP6wHkAK1dpfKdja8ntNwiYdSGluH7ZoVA1IhrA6dCMPZHgfdwPuIZcM=)
- [会员营销原文 3](https://mp.weixin.qq.com/s?src=11&timestamp=1618454411&ver=3009&signature=YlcDse-YUHeIu9Q7GYM8oBJ9MPPh3lRggNorm*nPk5V93G9*i*4LGOuOaspLnHsXGnJ3UTBsHXzc0OZNHNsd3UArHQ-HQzmYwoc2VePqfxl2adk8RRWFr71j3RUliyCN&new=1)
