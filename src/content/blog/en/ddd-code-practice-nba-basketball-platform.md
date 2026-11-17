---
title: "DDD in Practice -- NBA Basketball Operations Platform"
description: "Building a basketball operations platform modeled on real NBA scenarios: domain contexts, multi-project service decomposition, and the call flows for draft entry, scheduling and statistics, player signing, trades, and standings."
pubDate: "2026-11-17"
tags: ["DDD", "Code Practice", "NBA", "Domain Modeling", "COLA"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-code-practice-nba-basketball-platform"
---
## 1. Background

I have not published anything recently because I was writing demo code for an NBA sports project. The previous article jumped straight into domain modeling analysis, as if it forgot what the original goal and requirements of the project were. Starting straight from the model makes it harder to follow and raises the cost of understanding, so this article fills in that gap. The project name -- or the requirement -- is to build a basketball operations management platform modeled on real NBA scenarios. The requirements, briefly:

1. Manage team and player activities, such as the draft and trades.
2. Manage the game schedule, the games themselves, and collect and process game data.
3. Manage player trades, team assets, player contracts, and player salaries.
4. Integrate with third-party partners, such as agencies, advertisers, and broadcast/streaming partners.

## 2. Domain Analysis

### 2.0 Domain Context Diagram
![DDD in Practice -- NBA Basketball Operations Platform Diagram 1](/images/blog/ddd-code-practice-nba-basketball-platform/image-1.png)

These are only the core domains currently reflected in basketball-plat. Supporting domains such as the salary domain and the workflow domain are not shown.

## 3. Building the Domain Services

### 3.0 Dependencies and Middleware
Spring Boot, Dubbo, RocketMQ, MyBatis, MapStruct, MySQL.

### 3.1 Domain Service Projects

1. **basketballDemo**
   Manages players, teams, trades, games, and draft events following the COLA packaging approach, and gives league members in different roles some data management capability. This is the core system.

2. **basketball-statistics**
   Collects and queries real-time game data, with its own database.

3. **basketball-workflow**
   No concrete business code for now. basketballDemo depends on basketball-statistics for game data and on basketball-workflow for approval flow services. Here it is simply a mocked downstream service of basketballDemo.

4. **basketball-salary**
   No concrete business code for now; player salary payment logic will be added later.

## 4. Business Call Flows

### 4.1 Player Draft Entry
![DDD in Practice -- NBA Basketball Operations Platform Diagram 2](/images/blog/ddd-code-practice-nba-basketball-platform/image-2.svg)

1. The admin browser calls the basketball operations web API to register and submit the prospect's basic information.
2. The web API accepts the request and converts it into a command.
3. The core service saves the player application record and personal information.
4. The core service sends the application-approved email/SMS.
5. The core service returns success to the web API.
6. The web API returns success to the browser.
7. The browser submits the player's second confirmation of draft entry.
8. The web API accepts the request and converts it into a command.
9. The core service updates the entry information.
10. The core service sends the final entry email/SMS.

### 4.2 Game Scheduling and Statistics
![DDD in Practice -- NBA Basketball Operations Platform Diagram 3](/images/blog/ddd-code-practice-nba-basketball-platform/image-3.svg)

1. The browser imports the next 2-3 weeks of the schedule through the web API.
2. The web API accepts the request and converts it into a command.
3. The core service saves the schedule.
4. The core service sends schedule notifications.
5. The core service returns success to the web API.
6. The web API returns success to the browser.
7. The arena data devices confirm both teams' rosters and starting lineups during pre-game preparation.
8. The game data receiving service publishes the starting-lineup event.
9. The devices report on-court events to the data receiving service.
10. The data receiving service processes the on-court events.
11. The devices report the game-end event.
12. The data receiving service publishes the game-end message.
13. The core service receives the starting-lineup message.
14. The core service receives the game-end message.
15. The browser queries game data from the management platform.
16. The web API goes through the query service.
17. The core service calls the data receiving service.
18. The core service builds the game aggregate.
19. The core service returns this game's data detail to the web API.
20. The web API returns this game's data detail to the browser.

### 4.3 Player Signing
![DDD in Practice -- NBA Basketball Operations Platform Diagram 4](/images/blog/ddd-code-practice-nba-basketball-platform/image-4.svg)

1. The browser submits the player contract through the web API.
2. The web API accepts the request and converts it into a command.
3. The core service checks whether the player is a rookie.
4. The core service signs the player according to the rookie signing rules.
5. The core service checks the team's salary level.
6. The core service returns the signing result to the web API.
7. The web API returns the signing result to the browser.

### 4.4 Team and Player Trades
![DDD in Practice -- NBA Basketball Operations Platform Diagram 5](/images/blog/ddd-code-practice-nba-basketball-platform/image-5.svg)

1. One party initiates a trade request from the browser.
2. The web API accepts the request and converts it into a command.
3. The core service stores the trade request.
4. The core service sends the approval flow to the workflow service.
5. The workflow service returns the approval message.
6. Once the request is approved, the core service transfers the player and team assets and updates the contracts.
7. The core service publishes the trade result message.

### 4.5 Fetching the Standings
![DDD in Practice -- NBA Basketball Operations Platform Diagram 6](/images/blog/ddd-code-practice-nba-basketball-platform/image-6.svg)

1. The browser queries the Eastern and Western conference standings.
2. The adapter layer goes through the query service.
3. The application layer's query handles the data.
4. The application layer calls the domain-ability package service.
5. The domain layer executes the domain service.
6. The domain layer calls the DAO to fetch this season's game data.
7. The infrastructure layer returns the base data.
8. The domain layer computes and ranks team records according to the standings rules.
9. The domain layer returns the standings bo.
10. The application layer returns the standings dto to the adapter layer.
11. The adapter layer returns the standings dto to the browser.

## 5. Code Notes

### 5.1 Middleware Dependencies
Following the COLA module ideas, everything technology-related sits in the infrast layer, and the related configuration can also be managed separately by adjustment.

### 5.2 AOP Integration
Looking at the code factory, AOP-related code can all live in the start project, but that is not necessarily ideal. Some AOP features with specific purposes can be spread across different project modules, such as idempotency, logging, and locking.

### 5.3 Spring Event Listening and Consumption
Messages are received through MqHandler where messages are consumed, and the events are then published via the Spring event mechanism to be listened to by the corresponding application-layer listeners.

### 5.4 Git Repository
<https://gitee.com/codergit.com/dddin-action.git>
