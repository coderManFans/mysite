---
title: "Creating a Practical Skill with GPT-5.5"
description: "A complete walkthrough of using GPT-5.5 to analyze requirements, choose an approach, implement, and validate the project-level VIBE-TODOLOG Skill."
pubDate: "2026-07-25"
tags: ["GPT-5.5", "AI Agent", "Skills", "Vibe Coding", "VIBE-TODOLOG", "Project Management"]
category: "vibe-coding-projects"
draft: false
lang: "en"
translationKey: "create-practical-skill-with-gpt-5-5"
---
Hello, everyone. I have recently been working on several Vibe Coding projects. I had already written a few Skill files, but they were fairly simple, so I wanted to improve them around a real use case and bring them closer to the Skills standard.

One recurring problem was keeping track of unfinished requirements and TODOs across multiple projects and releases. I still had to remember which features were missing from each project and what remained incomplete in each version.

That gave me the idea of creating a Skill to manage project-level TODOs. I often use both the free and paid DeepSeek models during development, but this time I decided to build the Skill with GPT-5.5. I had already been using OpenCode for several months, so switching models was straightforward. This post documents the process.

1. Instead of immediately asking GPT to create the Skill, I first described my needs and concerns and asked whether an existing product could solve the problem.

![Creating a Practical Skill with GPT-5.5 — Image 1](/images/blog/create-practical-skill-with-gpt-5-5/image-1.png)

![Creating a Practical Skill with GPT-5.5 — Image 2](/images/blog/create-practical-skill-with-gpt-5-5/image-2.png)

![Creating a Practical Skill with GPT-5.5 — Image 3](/images/blog/create-practical-skill-with-gpt-5-5/image-3.png)

2. Once I had decided to build it, I moved on to defining the implementation.

![Creating a Practical Skill with GPT-5.5 — Image 4](/images/blog/create-practical-skill-with-gpt-5-5/image-4.png)

3. The creation process

![Creating a Practical Skill with GPT-5.5 — Image 5](/images/blog/create-practical-skill-with-gpt-5-5/image-5.png)

![Creating a Practical Skill with GPT-5.5 — Image 6](/images/blog/create-practical-skill-with-gpt-5-5/image-6.png)

![Creating a Practical Skill with GPT-5.5 — Image 7](/images/blog/create-practical-skill-with-gpt-5-5/image-7.png)

![Creating a Practical Skill with GPT-5.5 — Image 8](/images/blog/create-practical-skill-with-gpt-5-5/image-8.png)

4. After creating the Skill, I asked GPT how to use it.

![Creating a Practical Skill with GPT-5.5 — Image 9](/images/blog/create-practical-skill-with-gpt-5-5/image-9.png)

5. First usage demonstration

![Creating a Practical Skill with GPT-5.5 — Image 10](/images/blog/create-practical-skill-with-gpt-5-5/image-10.png)

6. Second usage demonstration

![Creating a Practical Skill with GPT-5.5 — Image 11](/images/blog/create-practical-skill-with-gpt-5-5/image-11.png)

The generated `TODOLOG.md` file:

![Creating a Practical Skill with GPT-5.5 — Image 12](/images/blog/create-practical-skill-with-gpt-5-5/image-12.png)

This is the TODO log created inside the current project. The Skill follows an append-only model, which makes the file function somewhat like long-term memory for an agent.

There is plenty of room to expand it. The TODO log could eventually become a more capable AI Agent backed by scripts, with TODO information uploaded to a requirements and development platform for centralized management. For now, it is intentionally lightweight.

If you would like the Skill file, feel free to contact me. You can also follow the process above and create your own. Once generated, it installs automatically, so no manual edits are required before using the tool.
