---
title: "Maven 如何打纯源码 ZIP 包"
description: "介绍如何通过 Maven Source Plugin 打包纯 Java 源码，并将 sources.jar 转换为 ZIP 包供第三方安全漏洞扫描。"
pubDate: 2026-10-08
tags: ["Maven", "Java", "源码包", "安全扫描"]
category: "vibe-coding-projects"
draft: false
lang: "zh"
translationKey: "maven-source-zip"
---
## 一、背景
打纯源码包给第三方进行安全漏洞扫描

## 二、maven插件
项目中加入下面的maven 插件

```xml
             <plugin>
                <artifactId>maven-source-plugin</artifactId>
                <version>2.4</version>
                <configuration>
                    <attach>true</attach>
                    <excludes>
                                                <exclude>*.properties</exclude>
                        <exclude>freemarker/*.ftl</exclude>
                        <exclude>mapper/*.xml</exclude>
                        <exclude>webapp/*.xml</exclude>
                        <exclude>license/*.*</exclude>
                    </excludes>
                </configuration>
                <executions>
                    <execution>
                        <phase>compile</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
```

## 三、使用步骤
### 3.1 产出源码jar包
1. idea maven 执行 clean compile命令
2. 在target 目录下找到*-sources.jar包文件

### 3.2 转换jar包到zip包
1. 使用jar -tf *-sources.jar查看jar包内容，是否包括其他敏感文件等
2. 使用mv *-sources.jar *-sources.zip 生成zip包


### 3.3 其他方案


cd 到src/java目录，打zip包
