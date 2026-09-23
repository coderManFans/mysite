---
title: "An Overview of My Vibe Coding Projects"
description: "An introduction to three projects built through Vibe Coding: a development and testing platform, the Tijing knowledge system, and a metadata-driven KV business configuration platform."
pubDate: "2026-09-18"
tags: ["Vibe Coding", "AI Agent", "RAG", "Development and Testing Platform", "Low-code"]
category: "vibe-coding-projects"
draft: false
lang: "en"
translationKey: "vibe-coding-product-overview"
---
Hello, everyone. I have recently been building several Vibe Coding projects and experimenting with Agents, Skills, and RAG models to support real product scenarios. Three of these systems have now reached roughly the V1.0.0 demo stage, and the process has brought plenty of surprises and a real sense of accomplishment.

My background is primarily in backend development, where I used to focus on just one part of a system. With AI assistance, I can now independently build relatively complex frontend applications, including interfaces similar to enterprise SaaS or B2B administration systems. Since implementing the pages is no longer the main bottleneck, my focus is shifting toward delivery quality, iteration speed, and product design.

This post provides a brief overview of the three projects. I will cover their design, implementation, challenges, and solutions in more detail in future posts.

The first project is a development and testing platform—something I had wanted to build since the beginning of my career. It is a difficult problem: APIs and test cases both need to be managed well, every company has a different technology stack, and connecting the full development lifecycle is challenging. In the past, as a backend developer, I could only address part of that problem.

This time, I started from the testing side. Skills scan API definitions and implementation logic, AI generates API test cases, and targeted adapters connect the workflow to different platforms and systems. The result is an early semi-automated solution, but there is still a long way to go. A complete DevOps workflow also needs product and development capabilities; testing alone is not enough. AI has already accelerated feature delivery dramatically, while testing has not advanced at the same pace. Testing teams will need to use AI to improve both efficiency and product quality.

The second and third projects revisit ideas I had worked on previously, mostly as backend projects or demos.

For the second project, I had collected many interview questions to build my own knowledge system. I published posts about chains of follow-up questions and difficult interview topics, which attracted some attention online. Readers often asked why I provided questions without answers. Some questions have standard answers, but many do not, and interview questions are not always designed around a single canonical response. At the time, I organized the questions and corresponding mind maps around my own needs. The result helped me build a personal knowledge system, but it was not something everyone could easily share.

There are many enormous interview collections online—sometimes advertised as hundreds of thousands of words and compiled by well-known engineers or training organizations. Before 2020, these resources may have looked especially useful to junior and mid-level developers. In practice, however, simply obtaining a large archive does not necessarily improve job searches or interview performance. People often collect far more material than they can apply.

For developers, it is more valuable to build a personal knowledge system and a repeatable workflow for continuous improvement. That approach reduces dependence on external collections and provides a practical path for long-term growth.

The project was originally called **Tijing (Question Mirror)**, meaning that questions can act as a mirror that reveals gaps in your knowledge. Its original Gitee repository is:

[https://gitee.com/codergit.com/PolygMirror](https://gitee.com/codergit.com/PolygMirror)

It began as a personal project, but with AI assistance I have now built an administration system around it. The current system consists of three projects: a Java backend, a frontend, and a Python service. To make it easier to collaborate with other developers and help more people discover the project, I decided to turn it into a team project under the name **Tijing**. The name suggests treating questions and reference materials like texts to study deeply, using them as a foundation for continuous growth.

Version 1.1.0 is nearly complete. I have deliberately prioritized my actual needs over rapid feature development: collecting questions, related posts, and reference answers, then adding practical AI Agent and RAG capabilities.

The repositories are:

[https://gitee.com/qmi_team/qmi-java](https://gitee.com/qmi_team/qmi-java)

[https://gitee.com/qmi_team/qmi-py](https://gitee.com/qmi_team/qmi-py)

[https://gitee.com/qmi_team/qmi-web](https://gitee.com/qmi_team/qmi-web)

The third project is a reusable business-model component based on common KV models and extension scenarios I encountered in previous company projects. The original backend component is available here:

[https://gitee.com/sky-painting/component-kv](https://gitee.com/sky-painting/component-kv)

Why rebuild an old project? While developing Tijing, I repeatedly had to solve the same problems—for example, configuring backend administrators and maintaining domain-term mappings in the Python service. I realized that the earlier KV project could help me consolidate reusable business models and capabilities, making future projects faster to build. I therefore revisited the old repository and rebuilt both its foundational architecture and its features.

As V1.0.0 evolved, it began to resemble a metadata-driven low-code platform, which made me question the product direction. After thinking it through, I decided not to turn it into a general-purpose low-code platform. It is better positioned as a low-code-like product focused on managing business models and data. It will not attempt to own core business workflows or evolve into a pure low-code platform. It could also integrate with configuration systems such as Nacos and Apollo, provide configuration synchronization, and help enterprises manage non-core modules, tables, and configuration data so teams can focus on their core business.

The new repositories are:

[https://gitee.com/sky-painting/kv-plat](https://gitee.com/sky-painting/kv-plat)

[https://gitee.com/sky-painting/kvPlatWeb](https://gitee.com/sky-painting/kvPlatWeb)

The project is approaching the end of its V1.0.0 phase. It can evolve either as a focused low-code platform or as a shared business component. It also demonstrates practical database/cache consistency techniques and a multi-tenant architecture, making it useful for full-stack developers who want a project they can extend in a specific technical direction.

The platform can also integrate with AI Agents. V1.0.0 experiments with Alibaba's Page Agent, while V1.1.0 will explore a different idea: using Agents and large language models as a service layer for business models. A user could describe a business scenario in a prompt, and the platform could generate corresponding tools and Skills automatically. This approach may be more flexible—and have a higher ceiling—than traditional low-code platforms.

In future posts, I will share more about AI Agent tools, project design iterations, and the results of these experiments. Thank you for reading.
