---
title: "做了一个图片识别的 Skills 来省 Token"
description: "记录一次为 Pi 制作本地图片识别 Skills 的过程，以及如何在终端 AI Coding 工作流中用 OCR/VLM 动态策略节省部分 Token。"
pubDate: 2026-09-24
tags: ["Pi", "Skills", "OCR", "VLM", "AI Coding", "Token"]
category: "vibe-coding-projects"
draft: false
lang: "zh"
translationKey: "local-image-ocr-skill-save-tokens"
---
### 一、背景
大家好，这几天不经意间做了一个Skills,没想到还可以省Token，并且还迭代了一版本，下面我给大家介绍下事情的来龙去脉。

背景是这样的，因为工作需要，我需要把一个已有系统的功能重新实现一遍，也就是说用AI实现前端，后端相关的全部功能，我不太方便得到已有系统的源码和数据库表设计，所以我只能参考页面来设计整个功能。在实现系统的过程中我用了很多大模型，包括中转，切了一些不同的工具来使用。

这其中就需要大量的图片识别来开发新的前端功能，一开始我还比较习惯用idea的聊天窗口，但是有一个严重的问题就是上下文压缩一旦失败聊天记录无法保存，同时无法继续进行AI开发，比较痛苦，后来用了openCode,但是openCode用着后续变得性价比不是很好，放弃了，然后尝试使用codex CLI,但是依然有网络和链接不稳定的情况，所以继续尝试用Pi，那就涉及到一个问题，就是终端上传图片的问题，所以为了让终端上传图片，我安装一个插件。


### 二、制作过程
我看agnes3.0-flash出来了，同时阶跃星辰也出了step-5-preview,跟着大佬们尝鲜了一把，但是在配置Pi的时候他们默认不支持图片格式的，也就是说输入默认只能是文本，这些新模型为了识别图片会探测本地是否安装了ORC工具，如果安装了会主动调用工具并进行图片识别。我意识到这个可以制作一个skills，所以在用agnes3.0-flash，顺手让它制作了一个local-image-ocr的skills，这个skills默认全局进行安装了。

但是另外一个困惑也来了，看了下agnes和step的官网，按道理各个大厂的新模型默认都会支持文字和图片识别的，没理由通过API Key调用不支持图片识别，所以带着疑问问了GPT,得到了如下结论

1. pi本身是支持图片上传的
2. 模型是否支持图片识别是由模型决定的，不是由pi决定的
3. 可以通过修改pi的model.json来支持图片上传，大模型识别图片的。

pi的配置如下：

以下这两款比较新的旗舰模型都支持图片识别。

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

那么为什么要制作这个skills呢，一是用的时候发现配置有问题，需要转一下，二是，它还有别的价值，我问了GPT，如果图片转文字可以用本地模型实现的话，文字内容发给大模型的话那么是可以省点token的，当然也不是全部场景都可以适用。另外这个SKILLS默认是一有图片就会走本地ocr识别，我本地装了 ollama 视觉模型（qwen2.5vl、tesseract, rapidocr)所以可以用。

跟着GPT的思路走我把第一版本的Skills发给它也发现了一些问题，如下

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

简单说就是不够灵活，所以很快让GPT帮忙优化了第二版本，流程如下

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

也就是说进行动态策略执行。

### 三、说明
1. 以上就是我在进行AI 项目coding的时候进行的工作流的一个小小优化，虽然不是很高大上，但是确实相对实用，感兴趣的可以私信我，我发SKILLS文件。
2. 目前已经把这个SKILLS发给了一个想参考的群友，但是需要注意的是我这边是基于MAC的方式，另外需要注意本机运行（qwen2.5vl、tesseract, rapidocr)视觉模型的时候CPU和内存是否会有影响。
3. 另外我的个人网站也上线了，公众号的文章后续也将同步到个人网站上面，给微信公众号文章形成同频互动，网址:[https://coderman.me/blog/](https://coderman.me/blog/)
