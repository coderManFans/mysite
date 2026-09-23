---
title: "Implementing an R&D-Side AI Agent for a Development and Testing Platform"
description: "A practical look at the R&D-side AI Agent in the Yundie AI Product-R&D Platform, including its workflow, Agent Skills, technical proposal generation, quality gates, and lessons learned."
pubDate: "2026-09-18"
tags: ["AI Agent", "Development and Testing Platform", "Yundie AI Product-R&D Platform", "R&D Workflow", "Skills"]
category: "distributed-microservices"
draft: false
lang: "en"
translationKey: "devtest-ai-agent-rd-practice"
---
### 1. Project Overview

In the previous release, I implemented the basic features and workflow of the product-side AI Agent for the development and testing platform. I also connected the Agent Skills to the platform's business data, and the results have been promising. To iterate on the platform more quickly with AI—and to close the loop from requirements through testing—I have now added an R&D-side AI Agent and connected it to the requirements produced on the product side.

I also renamed the product **Yundie AI Product-R&D Platform**. "Yundie" combines the ideas of clouds and butterflies: clouds are constantly changing, while even a tiny movement of a butterfly's wings can have far-reaching effects. I hope each improvement to the platform helps it adapt to that kind of change. More importantly, I want products built on the platform to use AI to manage challenges throughout software development, including process, organization, efficiency, and collaboration. The broader goal is to use AI and platform capabilities to improve how software teams work together.

If you are new to the project, the following earlier articles on my WeChat official account provide additional context:

[Developing a Testing Platform System for Ourselves](https://mp.weixin.qq.com/s/h66sG8ST_jlUSYYK9UqpXw?token=1458058948&lang=zh_CN)

[A Product Manager's AI Agent for Requirement Generation and Management](https://mp.weixin.qq.com/s/MHWfDd6SPbA5o0hgIlkU1Q?token=1458058948&lang=zh_CN)

Below is a detailed look at the technical implementation of V1.2.0.

#### 1.1 R&D Workflow

The workflow diagram below shows the platform-driven, locally executed development model introduced in this release.

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 1](/images/blog/devtest-ai-agent-rd-practice/image-1.png)

#### 1.2 Agent Skills Used in the Local Development Environment
| Skill Name | Description | Notes |
| --- | --- | --- |
| fetch-dev-context | Fetches technical proposal and development task context from the platform | Added in this release |
| report-dev-process | Writes local development task status and progress back to the development and testing platform | Added in this release |
| report-commit | Writes the branch, commit SHA, commit message, and change summary back to the platform | Added in this release |
| report-review-result | Writes code review results—including the PR URL, reviewer, status, and comments—back to the platform | Added in this release |
| report-self-test | Records local self-test commands, results, failure reasons, and report URLs in the platform's development history | Added in this release |
| develop-tech-proposal | Fetches R&D context for a platform requirement ID, prepares a technical proposal in the current repository, and sends it back after user confirmation | Added in this release; this is a continuous two-step workflow |
| submit-requirement-draft | Submits a requirement draft from the local development environment to the platform | Added in this release |
| import-interface-doc | Imports Swagger or OpenAPI JSON documentation into the platform | Maintenance moved from Java to Python |
| publish-interface-artifact | Publishes API sequence diagrams or call-dependency JSON to the platform | Maintenance moved from Java to Python |

Key characteristics of these Skills include:

- One-command installation and upgrades
- Compatibility with more than 90% of mainstream AI coding agents
- Adaptation to this project's specific scenarios rather than direct reuse of generic or popular Skills

#### 1.3 R&D-Side Agent Skills

The R&D-side Agent Skills are implemented in Python. They can be upgraded incrementally or one at a time, and quality gates validate AI-generated content so problems surface earlier.

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 2](/images/blog/devtest-ai-agent-rd-practice/image-2.png)

#### 1.4 New Database Tables
![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 3](/images/blog/devtest-ai-agent-rd-practice/image-3.png)

#### 1.5 Core Implementation

The workflow for generating a technical proposal is similar to the requirement-generation workflow, but it produces many more artifacts. Each artifact supports review and AI-assisted refinement. This section focuses on the core Python implementation; the Java side mainly coordinates the workflow and data through open APIs.

`dev-test-plat-py/app/agent/skills/development` contains the R&D-side Agent Skills described in section 1.3.

```python
"""Reliable runner for AI tech proposal sessions.
Responsible for driving the generation and revision of technical proposals.

Process overview:
  1. generate(): Generates a technical proposal for new requirements (Involves multiple rounds of clarification → Proposal exploration → Main text/product/risk → Branch/Task → Validation)
  2. revise(): Generates a new version draft for existing proposals
  3. _generate_revision_from_existing(): Takes the revision path when discovering an existing formal proposal in the generate process

All intermediate results are persisted through Repository, and progress/clarification/failure notifications are sent to the frontend via Java HTTP callbacks.
"""
tech_proposal_session_service.py


"""Development end Agent workflow orchestrator.

Responsible for orchestrating the full execution chain of 17 Skills, supporting two main processes:

  generate process (run):
    Context compression → Brainstorming → Main text → Product planning + generation → Risk/test
    → Branch planning → Task decomposition → Completeness validation → Pre-review synchronization

  revise process (revise):
    Intent parsing → (Optional clarification) → Selective rerun of content/artifacts/risk test/branch/task
    → Revision effect validation

Each Skill call follows run_with_quality_retry (format assertion + dimension coverage + error backfill retry), with a two-phase strategy for product generation (planner planning → concurrent content writer to avoid long output truncation).
"""
development_workflow.py


"""Development end Agent application service.

This service is responsible for connecting the complete business chain of "generating development proposals based on requirements":

1. Creates Python-side Agent execution records;
2. Pulls demand, applications, repositories, existing technical proposals, and existing development tasks from Java side;
3. Calls development end Skills to generate technical proposals, repository branch planning, task decomposition, and review results;
4. Records the input, output, quality metrics, tokens, and costs of each Skill step;
5. When the review passes and the caller allows synchronization, writes back the result to the Java side;
6. Updates the execution record as successful or failed.
Note: The current solution is positioned as "platform-side R&D data management + local coding agent context supply," without directly modifying business code, creating Git branches, committing changes, or initiating MR/PR.
"""
development_service.py


"""Persistence for AI tech proposal agent sessions.

Java side's ``tech_proposal_agent_session.id`` is the unique session identifier (canonical id). Python does not allocate a separate memory ID but reuses the Java-provided ID to ensure:

  - Session state is preserved after API restarts
  - There are no conflicts due to local counter collisions between Python processes

All persistence operations are completed through MySQL's ``agent_tech_proposal_session`` table, using an asynchronous PyMySQL cursor without relying on any ORM.
"""
tech_proposal_repository.py


"""API contract and client documentation consistency validation.

Takes the backend api-doc.md as the authoritative source to validate whether the API paths, HTTP methods, authentication methods, request/response fields, and error codes in front-end/mobile interface documents are consistent.

Validation logic:
  - _parse_contract(): Parses endpoint, authentication, field, and error code from api-doc.md
  - validate_client_api_contract(): Compares client documentation differences against context authority
  - _compare_scalar(): Precise comparison of scalar fields (authentication, etc.)
  - _compare_subset(): Subset comparison of collection/dictionary fields (field lists, error codes, etc.) where backend has and client lacks are marked as missing; additional records for client-only items.
"""
api_contract_consistency.py


"""Artifact consistency validation: Compares SQL DDL with ER diagrams and interface document field types.

SQL DDL is the unique authoritative source of schema definition. After all artifacts are generated, a consistency check between ER diagrams and interface documents is performed to output difference information that can guide Skill automatic fixes.

Validation logic:
  - parse_sql_schema(): Extracts table structures from SQL DDL (table name → column name → type)
  - parse_er_schema(): Extracts ER diagram definitions from Mermaid erDiagram blocks
  - parse_api_fields(): Extracts API fields and types from Markdown parameter tables
  - _compare_er() / _compare_api(): Compares differences with SQL as the authoritative source

Type normalization: Maps SQL dialect aliases (int4/integer/timestamp with time zone, etc.) to benchmark types, and similarly normalizes API side aliases (int32/long/datetime, etc.) for comparison.
"""
artifact_consistency.py
```

#### 1.6 Lessons and Issues

1. **Context-window overflow**

A technical proposal includes many artifacts, so generating everything in a single pass is impractical. Large or numerous requirements can easily exceed the model's configured token limit. The R&D-side Agent therefore generates the following parts incrementally:

- Technical proposal document
- Recommended branches
- SQL, Nacos configuration, and ER diagrams
- Development task list
- Risk analysis and testing recommendations

Splitting the workflow this way significantly improved the stability and correctness of technical proposal generation.

2. **API gateway blacklisting**

I previously used an LLM API gateway shared by someone in a community group. It worked well for a while, but I used it so heavily while developing the AI Product Center workflow that my access was eventually blacklisted.

3. **LLM hallucinations**

Two recurring hallucination problems appeared while implementing the R&D-side Agent:

- When asked to refine a technical proposal, the model often regenerated the entire document and overflowed the context window.
- Generated artifacts were inconsistent—for example, API fields in the proposal did not match the SQL schema or ER diagram.

**Solutions:**

For the first problem, the frontend now lets users select exactly what they want to change and whether a full regeneration is necessary. I also added prompt constraints to prevent the proposal from claiming that SQL exists when no SQL artifact was generated. SQL details are kept out of the proposal document itself, further reducing the risk of context overflow.

For the second problem, validation scripts compare generated artifacts with the proposal. If they do not match, the system starts another AI round to correct them. This works like an additional hook or harness constraint.

A deeper issue behind both cases is intent recognition. A model cannot always infer which part of a technical proposal should change from a few technical terms or short phrases. I therefore added an intent-recognition layer to the Python project. It works much like query rewriting, helping the AI identify the actual target of a requested change.

4. **Problems introduced by `grill-me` Skills**

I adopted several useful Skills from Superpowers and `grill-me` early in development. In practice, however, conversation history was not persisted, so the Agent asked the same questions repeatedly during each technical proposal workflow.

**Solution:** I added Java-side tables to retain the relevant `grill-me` context and limited how often the Agent can ask questions. There is still room for improvement: too many questions make the workflow verbose and can frustrate developers, especially when facts are unavailable, an answer must be deferred, or earlier information is contradictory.

5. **Unstable generated artifacts**

Generated API documentation sometimes contained only endpoint declarations, without detailed request and response parameters. That left important information missing during technical proposal review.

**Solution:** API documentation is now generated as a separate Markdown file. Prompts and quality-gate Skills ensure that the resulting document is sufficiently complete and standardized.

### 2. AI-Assisted Development Workflow

To validate the entire business workflow end to end, I used AI to create a new requirement: the AI Product Management Center. The requirement is shown below:

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 4](/images/blog/devtest-ai-agent-rd-practice/image-4.png)

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 5](/images/blog/devtest-ai-agent-rd-practice/image-5.png)

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 6](/images/blog/devtest-ai-agent-rd-practice/image-6.png)

The R&D-side technical proposal and its related artifacts are shown below:

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 7](/images/blog/devtest-ai-agent-rd-practice/image-7.png)

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 8](/images/blog/devtest-ai-agent-rd-practice/image-8.png)

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 9](/images/blog/devtest-ai-agent-rd-practice/image-9.png)

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 10](/images/blog/devtest-ai-agent-rd-practice/image-10.png)

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 11](/images/blog/devtest-ai-agent-rd-practice/image-11.png)

The frontend and backend repositories for the Product Center are:

Frontend address: [https://gitee.com/codergit.com/ai-product-admin-web](https://gitee.com/codergit.com/ai-product-admin-web)

Backend address: [https://gitee.com/codergit.com/ai-product-admin](https://gitee.com/codergit.com/ai-product-admin)

Additional notes:

1. The frontend was developed with Codex and Superpowers 6.
2. The backend was developed with Claude Opus 5.
3. I did not manually write any code during development. The work took three days, mainly because self-testing and reading large amounts of context were time-consuming. It was effectively a long-running development task that also required repeated context compression and organization.

A few issues remain:

- Some backend end-to-end tests are unnecessary and slow.
- Delivering an entire prioritized task list in one pass creates too broad a scope, consumes many tokens, and frequently triggers context compression.
- The frontend workflow based on Superpowers 6, sub-agents, and worktrees still has some rough edges.

### 3. Product Demo

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 12](/images/blog/devtest-ai-agent-rd-practice/image-12.png)

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 13](/images/blog/devtest-ai-agent-rd-practice/image-13.png)

![Development and Testing Platform R&D End AI Agent Implementation Practice Figure 14](/images/blog/devtest-ai-agent-rd-practice/image-14.png)

### 4. Roadmap

The previous release had the following roadmap:

1. ~~Connect business data and workflows between the product and R&D sides (P0)~~
2. ~~Build the R&D-side Agent and Skills to generate proposal documents, development tasks, and subtasks (P0)~~
3. Generate test cases, user stories, and test-case mind maps from product-side requirements (P1)
4. ~~Connect the R&D side to code platforms such as Gitee, GitLab, and GitHub, as well as local development environments (P1)~~
5. Connect the R&D workflow to testing (P1)
6. Build testing-side Agents and Skills (P1)

Next, I will improve the testing area, reorganize the navigation modules, and complete the testing-side Agents and Skills. The goal is to support complete testing scenarios, add Agent-testing capabilities, integrate sandbox environments, and connect testing through deployment.

The long-term plan is to build a project-management module and related Agents on top of the platform's existing capabilities.

### 5. Running the Code

Some readers of my WeChat official account asked about the source code. The project is open source:

- [Tianhua/devTestPlatWeb: Web frontend for the Yundie AI Product-R&D Platform](https://gitee.com/sky-painting/dev-test-plat-web)
- [Tianhua/devTestPlat: Java backend for the Yundie AI Product-R&D Platform](https://gitee.com/sky-painting/devTestPlat-java)
- [Tianhua/devTestPlatPy: Python LLM service for the Yundie AI Product-R&D Platform](https://gitee.com/sky-painting/dev-test-plat-py)

If you are interested, feel free to star the repositories and clone them for local testing.
