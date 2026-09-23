---
title: "使用 GPT-5.5 聊几句，创建一个实用的 Skill"
description: "记录使用 GPT-5.5 从需求分析、方案选择到落地验证，创建项目级 VIBE-TODOLOG Skill 的完整过程。"
pubDate: 2026-07-25
tags: ["GPT-5.5", "AI Agent", "Skills", "Vibe Coding", "VIBE-TODOLOG", "项目管理"]
category: "vibe-coding-projects"
draft: false
lang: "zh"
translationKey: "create-practical-skill-with-gpt-5-5"
---
大家好，最近在做几个Vibe Coding项目，之前总结了几个Skills文件，但是比较简单，然后想结合业务场景做丰富点，按照skills的标准做一下。这不最近被一些代码版本需求或者todo事项搞的有点麻烦，就是大脑里还需要时刻记住这个项目没做哪些，那个项目的版本里差了哪些等等。

所以今天突发其想，希望做一个skills来管理项目级别的todo事项，由于我开发经常使用DeepSeek的免费模型和付费模型，今天准备用GPT5.5来帮我做这个Skills,目前我使用OpenCode也有几个月了，所以切换GPT5.5还是很方便的，这里记录下创建过程。

1. 一开始没有直接让GPT帮我创建这个skills,而是说出自己的需求和疑惑，以及是否有可以直接用的产品

![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 1](/images/blog/create-practical-skill-with-gpt-5-5/image-1.png)


![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 2](/images/blog/create-practical-skill-with-gpt-5-5/image-2.png)


![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 3](/images/blog/create-practical-skill-with-gpt-5-5/image-3.png)


2. 确定好准备要做的时候

![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 4](/images/blog/create-practical-skill-with-gpt-5-5/image-4.png)

3. 制作过程

![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 5](/images/blog/create-practical-skill-with-gpt-5-5/image-5.png)


![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 6](/images/blog/create-practical-skill-with-gpt-5-5/image-6.png)


![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 7](/images/blog/create-practical-skill-with-gpt-5-5/image-7.png)


![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 8](/images/blog/create-practical-skill-with-gpt-5-5/image-8.png)


4. 做了之后告诉我怎么用

![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 9](/images/blog/create-practical-skill-with-gpt-5-5/image-9.png)


5. 使用演示

![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 10](/images/blog/create-practical-skill-with-gpt-5-5/image-10.png)

6. 使用演示2

![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 11](/images/blog/create-practical-skill-with-gpt-5-5/image-11.png)


TODOLOG.md

![使用 GPT-5.5 聊几句，创建一个实用的 Skill 图 12](/images/blog/create-practical-skill-with-gpt-5-5/image-12.png)

这是todolog 在当前项目下创建的文件信息，整个SKILLS的操作就是按追加的方式，类似于Agent的长期记忆方式。

后续扩展：

这个todo log可以做成比较丰富的AI Agent,带脚本的那种，将todo信息上传到需求开发平台上，进行集中管理，只是当前是比较轻量级的那种。

如果需要skills文件可以私我发下，或者照着上面的流程走一遍，创建完之后自动安装，全程无需手动修改即可获得一个小工具。
