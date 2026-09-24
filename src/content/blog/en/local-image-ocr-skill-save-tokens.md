---
title: "Building an Image Recognition Skill to Save Tokens"
description: "A note on building a local image-recognition Skill for Pi, and how an OCR/VLM dynamic strategy can save some tokens in a terminal-based AI coding workflow."
pubDate: 2026-09-24
tags: ["Pi", "Skills", "OCR", "VLM", "AI Coding", "Token"]
category: "vibe-coding-projects"
draft: false
lang: "en"
translationKey: "local-image-ocr-skill-save-tokens"
---
### 1. Background

Hi everyone. Over the past few days I accidentally built a Skill for image recognition. I did not expect it to save tokens, and I even iterated on it once. This post walks through the full story.

The background is simple: for work, I needed to reimplement the functionality of an existing system. In other words, I had to use AI to rebuild both the frontend and backend features. I could not conveniently get the original source code or database schema, so I had to design the whole feature set by referring to the existing pages. During the implementation, I tried many large models, including relay services, and switched between several different tools.

This process required a lot of image recognition work to build new frontend features. At first, I was used to the chat window in IDEA, but it had a serious problem: once context compression failed, the chat history could not be saved, and I could not continue AI-assisted development from there. That was painful. Later I tried openCode, but its cost-performance ratio became less attractive, so I gave it up. Then I tried Codex CLI, but there were still network and connection stability issues. So I continued experimenting with Pi. That introduced another problem: uploading images from the terminal. To make terminal image uploads work, I installed a plugin.

### 2. Build Process

I saw that agnes-3.0-flash had been released, and StepFun had also released step-5-preview, so I followed others and tried them early. But when configuring them in Pi, image input was not supported by default. In other words, the default input mode was text only. To recognize images, these new models would detect whether a local OCR tool was installed, and if it was, they would actively call that tool for image recognition. I realized this could be turned into a Skill. So while using agnes-3.0-flash, I asked it to create a `local-image-ocr` Skill, and installed that Skill globally by default.

But another question came up. After checking the official websites for Agnes and Step, these new flagship models should support both text and image recognition by default. There seemed to be no reason why image recognition would not work when calling them through an API key. So I asked GPT and got the following conclusion:

1. Pi itself supports image uploads.
2. Whether image recognition is supported depends on the model, not Pi.
3. You can enable image upload and let the large model recognize images by modifying Pi's `model.json`.

The Pi configuration looks like this:

The two newer flagship models below both support image recognition.

```python
 "step-Pi": {
      "baseUrl": "https://api.stepfun.com/v1",
      "api": "openai-completions",
       
      "apiKey": "xxxx",// 注意阶跃的调用apikey 不是sk-开头的
      "models": [
        {
          "id": "step-5-preview",
          "name": "step-5-preview",
          "input": ["text", "image"]
        }
      ]
    },
     "agness-Pi": {
      "baseUrl": "https://apihub.agnes-ai.com/v1",
      "api": "openai-completions",
      "apiKey": "sk-xxxx",
      "models": [
        {
          "id": "agnes-3.0-flash",
          "name": "agnes-3.0-flash",
          "input": ["text", "image"]
        }
      ]
    },
```

So why build this Skill? First, I found some configuration issues while using it, and needed a conversion step. Second, it has another practical value. I asked GPT whether, if image-to-text conversion can be handled by a local model, sending only the extracted text to the large model could save tokens. The answer was yes, at least in some scenarios, though of course this does not apply to every case. This Skill also defaults to local OCR recognition whenever an image is present. Since I have local Ollama vision models and tools installed, including qwen2.5vl, tesseract, and rapidocr, I can use it locally.

Following GPT's suggestions, I sent it the first version of the Skill and found a few issues:

```python
用户发截图
     ↓
Pi 当前模型支持 image
     ↓
正常应该直接把图片给模型
     ↓
但是 Skill 可能抢先触发
     ↓
本地 OCR/VLM
     ↓
反而绕了一圈
```

In short, it was not flexible enough. So I quickly asked GPT to help optimize a second version. The new flow is:

```python
                    截图
                     │
          ┌──────────┴──────────┐
          │                     │
       要 OCR？             要视觉理解？
          │                     │
         是                     │
          │              ┌──────┴──────┐
          ▼              │             │
   本地 Qwen2.5-VL    支持 Vision    不支持
          │              │             │
          ▼              ▼             ▼
       文字结果       原图直传       本地 Qwen
                         │             │
                         └──────┬──────┘
                                ▼
                              主模型
```

That means the Skill now uses a dynamic execution strategy.

### 3. Notes

1. This is a small workflow optimization I made while doing AI project coding. It is not especially grand, but it is genuinely practical. If you are interested, you can message me and I can share the Skill file.
2. I have already shared this Skill with a group member who wanted to reference it. One thing to note is that my setup is based on macOS. Also pay attention to CPU and memory usage when running local vision models and tools such as qwen2.5vl, tesseract, and rapidocr.
3. My personal website is now online as well. Future WeChat official account posts will also be synced to the personal website, forming a parallel publishing rhythm with the WeChat articles. URL: [https://coderman.me/blog/](https://coderman.me/blog/)
