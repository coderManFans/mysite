---
title: "What? Is This Your Knowledge RAG System?"
description: "An introduction to a knowledge RAG system built with Java, Python, and vector search, covering its architecture, question-bank management, reference retrieval, project structure, and Vibe Coding practices."
pubDate: "2026-07-12"
tags: ["RAG", "Knowledge Retrieval", "Vibe Coding", "Java", "Python", "Vector Database", "AI"]
category: "vibe-coding-projects"
draft: false
lang: "en"
translationKey: "knowledge-rag-system"
---
Hello, everyone. This post introduces Tijing, a knowledge RAG system that I recently built as a Vibe Coding project. Let's begin with an architecture diagram.

![Knowledge RAG system architecture](/images/blog/knowledge-rag-system/image-1.png)

ChatGPT generated this image, although there was a small complication along the way. Its original title was "Intelligent Question Bank and Knowledge Retrieval System Architecture." I later asked GPT to rename it to "Tijing Knowledge Retrieval System Architecture." Because the image appeared to be stuck in the refinement process, I also asked Doubao to edit the original—perhaps because I subconsciously assumed Doubao would be good at image editing.

Doubao completed the edit quickly, and its version was 2.5 MB, while the two GPT-generated versions were about 1.6 MB each. Unfortunately, the Doubao version blurred much of the content and distorted a lot of the text.

The image above presents the overall architecture and workflow. Here is what the frontend looks like:

![Knowledge RAG system frontend — Image 1](/images/blog/knowledge-rag-system/image-2.png)

![Knowledge RAG system frontend — Image 2](/images/blog/knowledge-rag-system/image-3.png)

![Knowledge RAG system frontend — Image 3](/images/blog/knowledge-rag-system/image-4.png)

![Knowledge RAG system frontend — Image 4](/images/blog/knowledge-rag-system/image-5.png)

![Knowledge RAG system frontend — Image 5](/images/blog/knowledge-rag-system/image-6.png)

The following image shows the Java project structure. I developed it through the OpenCode CLI, mainly using DeepSeek and Agnes. They are good enough for my current needs. I also used Superpowers for technical design, implementation, and code review, and the overall experience was solid. That said, I have heard that this approach may already be becoming outdated because newer models such as GPT-5.6 need fewer workflow constraints. Does that mean increasingly capable models will also reduce the value of some Skills?

The Java project uses a relatively recent Spring Boot version, so several related components were upgraded as well. AI helped me complete the integration work.

![Knowledge RAG system Java project structure](/images/blog/knowledge-rag-system/image-7.png)

Now let's look at the Python project. It began as a collection of independent scripts plus two AI-generated Skills. As the requirements grew and database access became necessary, I reorganized it twice into a layered architecture. That structure has made the scripts much easier to maintain.

![Knowledge RAG system Python project structure](/images/blog/knowledge-rag-system/image-8.png)

The Python project has three entry points. The first starts the FastAPI service:

```plain
# Use this command to start FastAPI, which plays a role similar to Spring Boot in the Python project.
# The Java project calls this Python HTTP API to retrieve knowledge content.
uvicorn rag_search_api.run:app --reload
```

The other two are scheduled jobs that vectorize text and image data for retrieval:

```plain
# Vectorize answers and store them in Chroma
answer_rag_scheduler.py

# Vectorize question references, such as blog posts and official documentation,
# and store them in Chroma
resource_rag_scheduler.py
```

That's all for now. I will share more lessons and pitfalls from the Vibe Coding process in future posts. Thank you for your support.
