---
title: "How to Create a Pure Source Code ZIP Package with Maven"
description: "Learn how to package pure Java source code with the Maven Source Plugin and convert the resulting sources.jar into a ZIP file for third-party security vulnerability scanning."
pubDate: "2026-10-08"
tags: ["Maven", "Java", "source code", "security scanning"]
category: "vibe-coding-projects"
draft: false
lang: "en"
translationKey: "maven-source-zip"
---
## Background
Package pure source code for third-party security vulnerability scanning.

## Maven Plugin
Add the following Maven plugin to the project:

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

## Steps
### 3.1 Create the Source JAR
1. Run `mvn clean compile` with Maven in IntelliJ IDEA.
2. Find the `*-sources.jar` file in the `target` directory.

### 3.2 Convert the JAR to a ZIP File
1. Use `jar -tf *-sources.jar` to inspect the JAR contents and check for sensitive files.
2. Rename the JAR file with `mv *-sources.jar *-sources.zip` to create the ZIP file.

### 3.3 Alternative Approach

Change to the `src/java` directory and create a ZIP file there.
