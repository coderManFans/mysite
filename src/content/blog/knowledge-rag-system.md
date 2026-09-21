---
title: "什么？这就是你的知识RAG系统？"
description: "介绍一个基于 Java、Python 和向量检索构建的知识 RAG 系统，涵盖整体架构、题库管理、参考资料检索、工程拆分与 Vibe Coding 实践。"
pubDate: 2026-07-12
tags: ["RAG", "知识检索", "Vibe Coding", "Java", "Python", "向量数据库", "AI"]
category: "vibe-coding-projects"
draft: false
---
大家好，这篇博客主要介绍下我最近开发的vibe coding项目，题经项目，开篇先来张图镇楼。

![什么？这就是你的知识RAG系统？ 图 1](/images/blog/knowledge-rag-system/image-1.png)

 这张图使用的是chatgpt帮忙生成的，中间还出现了一个小插曲，图片标题一开始是：智能题库与知识检索系统 架构图，后续让gpt改一下，改成题经知识检索系统 架构图。因为一直在润色中，以为卡住了，所以把原图给豆包帮忙修改下（可能潜意识里认为豆包修图不错），结果改的确实很快，新的图片大小是2.5M,但是gpt生成的两张图都是1.6M左右。结果在于豆包的那张图完全把内容模糊化了，很多文字都扭曲变形了。

上面是整体架构图和流程图，这里给大家看下前端效果：

![什么？这就是你的知识RAG系统？ 图 2](/images/blog/knowledge-rag-system/image-2.png)


![什么？这就是你的知识RAG系统？ 图 3](/images/blog/knowledge-rag-system/image-3.png)


![什么？这就是你的知识RAG系统？ 图 4](/images/blog/knowledge-rag-system/image-4.png)


![什么？这就是你的知识RAG系统？ 图 5](/images/blog/knowledge-rag-system/image-5.png)


![什么？这就是你的知识RAG系统？ 图 6](/images/blog/knowledge-rag-system/image-6.png)


这是java项目的工程模块，这里使用了openCode的cli进行开发的，主要开发模型是deepseek, agnes.目前看还可以，只能说够用。使用了superpowers进行项目技术方案设计落地和实现和代码review,效果也还行，不过听说这个已经过时了，gpt5.6已经不需要使用这个约束了，那么是不是就意味着更厉害的模型对于那些skills也是降维打击呢？

java项目的技术栈是直接使用了比较新的springboot版本，所以很多相关的组件都进行了升级，这里也是借助了AI的力量整合好了。

![什么？这就是你的知识RAG系统？ 图 7](/images/blog/knowledge-rag-system/image-7.png)

下面看下python的工程，python工程一开始就一些相对独立的脚本还有两个让AI生成的skills,但是后续需求多了，之后需要连接数据库之后就需要分层了，所以对于python工程也整体优化过两次。按照分层的设计分了几块，这样的话脚本维护就变得比较轻松了。

![什么？这就是你的知识RAG系统？ 图 8](/images/blog/knowledge-rag-system/image-8.png)

python工程启动，目前有三个地方：

```plain
# 使用这一行命令来启动fast api，这个相当于python版本的springboot,
# java项目会调用这个python工程提供的http接口进行知识内容检索
uvicorn rag_search_api.run:app --reload
```


下面是两个定时任务，对文本和图片资料进行向量化，方便检索

```plain

# 对问题的答案进行向量化存入chroma数据库里
answer_rag_scheduler.py


# 对题目的参考资料，比如一些问题的博客资料，官方网站的说明等，将其进行向量化到chroma数据库里
resource_rag_scheduler.py
```


好了，这里就介绍完了，后续会分享vibe coding过程中出现的一些坑点，感谢支持。
