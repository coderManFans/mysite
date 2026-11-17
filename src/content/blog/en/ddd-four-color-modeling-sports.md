---
title: "DDD Four-Color Modeling in Practice: NBA Basketball Activity Modeling"
description: "Applying DDD four-color modeling to an NBA basketball scenario -- the draft, the schedule, game statistics, and player trades -- then splitting the domain into member, activity, rule, statistics, trade, and asset subdomains."
pubDate: "2026-11-17"
tags: ["DDD", "Four-Color Modeling", "NBA", "Domain Modeling", "Business Architecture"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-four-color-modeling-sports"
---
## 1. Introduction

In the earlier DDD practice article, we modeled a social product -- a blog post platform service -- and produced some sample code. Here the practice continues. This time we walk through DDD four-color modeling using NBA basketball games, and then turn the model into code.

## 2. Modeling Basketball Activities

### 2.0 Business Sequence Analysis
I picked four scenarios for the business sequence analysis: the draft, the schedule, game statistics, and player trades.

![DDD Four-Color Modeling in Practice: NBA Basketball Activity Modeling Diagram 1](/images/blog/ddd-four-color-modeling-sports/image-1.png)

### 2.1 The Draft
#### 1. Business Description
Players who meet the draft rules can take part in the annual NBA draft, where teams pick players by lottery. The first three picks are the first, second, and third overall selections.

#### 2. Rules
- Male, at least 19 years old; international players at least 22 years old
- Prospects must confirm their entry twice
- The draft has two rounds

Given the length constraints, this article does not walk through the modeling process for all four scenarios in detail. Let's start with the four-color model of the draft. The key business moments identified in the draft, in business sequence, are the draft entry record, the draft event record, and the rookie signing record.

The draft also lets us pin down the relationship between players and teams, which lays the groundwork for the later scenarios.

![DDD Four-Color Modeling in Practice: NBA Basketball Activity Modeling Diagram 2](/images/blog/ddd-four-color-modeling-sports/image-2.png)

### 2.2 The Schedule
#### 1. Business Description
The schedule is defined by the NBA and can be postponed under special circumstances. It needs to specify the home team, the away team, the referees, the start time, and so on. Teams and players then play according to the schedule. Schedules are organized season by season and carry different attributes, such as preseason, regular season, and playoffs. By game type they are split into regular games, overtime games, All-Star games, and play-in games.

#### 2. Rules
- Each team plays 82/72 games per year
- Playoff series are best-of-seven

Other rules for reference: <https://www.zhihu.com/search?type=content&q=NBA%E8%B5%9B%E7%A8%8B%E8%A7%84%E5%88%99>

The schedule is one of the core business domains. Its four-color model surfaces two key business moments: the game activity and the schedule table. The game activity is the core business, so the teams, referees, and dates involved are all objects of attention.

![DDD Four-Color Modeling in Practice: NBA Basketball Activity Modeling Diagram 3](/images/blog/ddd-four-color-modeling-sports/image-3.png)

### 2.3 Game Statistics
#### 1. Business Description
The two teams play in the home team's arena. Before the game, the starting lineups and the referees are confirmed. Since fans were not allowed in the arena during the pandemic, seating and ticketing are not analyzed here.

#### 2. Rules
- A game has 4 quarters of 12 minutes each; if the score is tied at the end, overtime is played, 5 minutes per overtime period
- Each team has 7 timeouts per game and 3 in overtime
- A player cannot exceed 5 fouls; after that they are ejected and cannot return to the game
- A free throw must be taken within 10 seconds
- There are 3 referees

A game is constrained by the schedule, so a game entry in the schedule table is essentially a pre-planned slot. Once a game is actually being played, attention naturally focuses on the court: the home team, the away team, the start time, and how each team's stars perform. So inside the game activity we focus on the various events that occur during the game. This scenario is a great fit for an event-driven approach to team and player statistics.

![DDD Four-Color Modeling in Practice: NBA Basketball Activity Modeling Diagram 4](/images/blog/ddd-four-color-modeling-sports/image-4.png)

### 2.4 Player Trades
#### 1. Business Description
Either a team or a player can request a trade. A trade requires the team to communicate with the player or their agent, sign an agreement and contract, and accept official supervision.

#### 2. Rules
- Salary cap rule
- Salary matching rule
- Traded player exception
- Larry Bird rights
- Mourning rule
- Rookie trade protection
- Sign-and-trade
- Draft picks and cash
- No-trade clause
- 10-day contract
- Disabled player exception
- Mid-level exception

Anyone who plays basketball or follows the NBA knows that player trades happen every year -- LeBron going to the Heat, back to the Cavaliers, then to the Lakers. The movement of star players between teams always draws attention. The trade process, the rules involved, and the salaries players receive can all be modeled.

Here we only use the trade record, one key business moment, to represent that a player-team trade occurred. A trade certainly involves different roles and groups, and the corresponding rights, responsibilities, and entitlements between players and teams change as well. So the trade object, the agreement/contract, the trade rules, and the team all become ordinary people/things/objects that support the trade business.

![DDD Four-Color Modeling in Practice: NBA Basketball Activity Modeling Diagram 5](/images/blog/ddd-four-color-modeling-sports/image-5.png)

### 2.5 UML Class Diagram for Signing and Trading
![DDD Four-Color Modeling in Practice: NBA Basketball Activity Modeling Diagram 6](/images/blog/ddd-four-color-modeling-sports/image-6.png)

### 2.6 UML Class Diagram for Schedule and Statistics
![DDD Four-Color Modeling in Practice: NBA Basketball Activity Modeling Diagram 7](/images/blog/ddd-four-color-modeling-sports/image-7.png)

### 2.7 Value Objects and Entities
From the UML class diagrams above, configuration data can basically exist as value objects, but some nouns that look like entities can actually be treated as entities in specific scenarios -- for example, a team. A team does have behavior during trades and games, but many of its attributes rarely change, and there are only 30 teams in the league. Since a team's basic attributes seldom change, those attributes can be referenced by the team as value objects.

## 3. Domain and Context Analysis

### 3.1 Member Subdomain
The NBA involves many roles with different responsibilities: players, teams, referees, agents, coaches, team doctors, and so on. The basic information of these people can be managed separately and serve as a foundation for other domains, or be split out as its own subdomain service.

### 3.2 Activity Subdomain
Because NBA basketball is entertainment sports, the annual championship race is extremely tough and equally compelling. Anyone who follows the NBA closely knows that the league's influence in the US is not that large, so it keeps creating events to grab attention -- sometimes openly, sometimes not. The core one is the game itself, followed by the draft, the Christmas Day games, the All-Star Game, and overseas games. So games and scheduling can also exist as their own subdomain.

### 3.3 Rule Subdomain
The rule entity did not stand out in the analysis above, but from a business perspective the draft has draft rules, trades have trade rules, and games have game rules -- rules are what support the business. For example, when a player enters the draft, the submitted information must be validated against the rules. These rules lay the business foundation, and the description and maintenance of rules can be independent of the business, so they can be a separate subdomain.

### 3.4 Statistics Subdomain
From the perspective of fans and commentators, team and player statistics are essential, because they are constantly used for interpretation -- the Lakers' 17 championships, the three-peat, and so on. A team's or a player's performance is not just talk; what happens on the court settles the argument. Data speaks, and looking at player performance across different dimensions is what really shows a player's value. On the other hand, statistics depend on data generated during games; training data and NCAA college performance data are of little value in NBA game statistics. The data from this statistics subdomain can be interpreted by more people and open up more business possibilities.

### 3.5 Trade Subdomain
Another high-profile aspect of the NBA is star player transfers. Moving from one city to another can have a large or small impact, and trade drama happens almost every year -- stars want both a championship and the money. Trades in the NBA are not as casual as buying groceries, because many rules apply. Player value and expectations for the future differ, and teams expect different things from players; once a trade happens it affects every party involved. So the trade subdomain deserves its own place to describe the changing relationships between players and teams, mostly the changes in contracts, assets, and related information.

### 3.6 Asset Subdomain
The asset subdomain mainly describes assets of the NBA and its teams, such as draft picks and trade exceptions waiting to be used or realized, plus team and league revenue. As the model matures, assets will naturally be separated out for closer inspection.

## 4. Final Notes

Since I have not talked to basketball domain experts or long-time fans, some of the modeling may differ from the real world. This article is also based on a lot of online research. If something is off, or you want to dig into the modeling details, follow the WeChat account and get in touch. Anyone interested can keep building an NBA basketball operation management system on top of this.
