---
title: "DDD Modeling in Practice: Rebuilding an Enterprise Office System's Domains"
description: "Rebuilding five enterprise systems (HR, user center, recruitment, permissions, tickets) with DDD: entity and context tables, domain class diagrams, database E-R diagrams, and schema scripts."
pubDate: 2026-11-26
tags: ["DDD", "Domain Modeling", "Enterprise Software", "Permission System", "Database Design"]
category: "ddd-domain-modeling"
draft: false
lang: "en"
translationKey: "ddd-modeling-enterprise-office"
---
This is one of the heavier modeling exercises in this series. It revisits five systems I have built or maintained in enterprise office software: HR, the user center, recruitment, permissions, and tickets. For each one, the domain contexts are rebuilt from scratch.

I originally planned to follow the full pencil-and-paper modeling method, but that approach requires a deeper understanding of the business and its relationships than I had time to document, and I could not draw all the diagrams it calls for. So this article goes straight to the results: for each system, three tables describing business entities, domain behavior, and domain service capabilities, followed by a domain class diagram, a database E-R diagram, and schema scripts.

Three notes before you read:

- The three tables follow the format from [From CRUD to DDD with Three Tables](/en/blog/ddd-handbook/#from-crud-to-ddd-with-three-tables), which explains how to use them.
- The class and E-R diagrams are rendered with PlantUML and keep their original Chinese labels. Some diagrams are very wide, so they are clickable to open at full size.
- The schema scripts come from real projects, with original columns and indexes preserved. A few column types or defaults are not necessarily best practice; adapt them to your own conventions before reusing.

## 1. Background

I had already done some DDD domain modeling exercises, but they were not deep enough. Here I abstract the systems I have worked on or maintained, and rebuild their domain contexts as a way to enrich the DDD modeling material. I originally wanted to use the pencil-and-paper method, but it needs a deeper understanding of each system's business and relationships, and time did not allow me to draw those diagrams, so I went straight to work.

## 2. The Domain Systems

### 2.1 HR System

#### 2.1.0 Analyzing the Employee Entity with the Pencil-and-Paper Method

![Pencil-and-paper analysis of the employee entity: fields for basic employee information, work experience, education, and emergency contacts](/images/blog/ddd-modeling-enterprise-office/image-1.png)

#### 2.1.1 Business Entities and Terms

Employee, department, position, salary, work experience, education, contract, emergency contact, benefits, regularization request, resignation request, resignation handover, field-level access configuration.

| Business entity | Domain | Context | Core elements (value objects) or key attributes | Notes |
| --- | --- | --- | --- | --- |
| Employee | Employee | Basic employee information | Avatar, name, department, email | |
| Work experience | Employee | Extended employee information | Employer, start date, end date | |
| Education | Employee | Extended employee information | School, start date, end date | |
| Emergency contact | Employee | Extended employee information | Phone, relationship, contact order | |
| Department | Organization | Department | Name, level, administrator, parent department ID | |
| Position | Organization | Position | Name, description, level | |
| Contract | Employee | Extended employee information | Name, type, content, variables | |
| Resignation request | Business process | Resignation | Applicant, submission time, reason | |
| Regularization request | Business process | Regularization | Applicant, submission time, work summary | |
| Handover record | Business process | Resignation handover | Items, sequence, approver, content | |
| Field-level access configuration | Shared configuration | System permissions | Table name and description, column name and description, employee data access rules | |
| Administrator permission configuration | Shared configuration | System permissions | Business line, administrator list, feature list | |
| Business reminder configuration | Shared configuration | Business configuration | Name, parameters, description, grouping type | |
| Benefits | Employee | Extended employee information | Social insurance contribution base | |
| Salary | Employee | Extended employee information | Monthly salary, annual salary | |

#### 2.1.2 Domain Behavior

| Domain | Context | Business behavior |
| --- | --- | --- |
| Employee | Basic employee information | Maintain employee details, export employees, import employees, paginated employee queries, archive employees |
| Employee | Extended employee information | Maintain work experience, education, and emergency contacts; manage contracts, sign contracts, paginated contract queries, renew contracts, export, preview, download<br/>Maintain salary and benefits |
| Organization | Departments, positions, DingTalk organization relationships | Maintain department information, export departments, view organization tree, adjust departments, manage positions |
| Business process | Resignation, regularization, transfer | Submit resignations, approve resignations, manage handover flows, manage regularization flows |
| Shared configuration | System permissions | Configure super administrators and HR administrators per business line; regularization reminders, department-change reminders, profile-completion reminders |

#### 2.1.3 Domain Service Capabilities

| Domain | Context | Service capability | Business notes |
| --- | --- | --- | --- |
| Employee | Basic employee information,<br/>extended employee information | Manage and maintain basic and extended employee information | |
| Organization | Departments, positions, DingTalk organization relationships | Maintain departments, positions, and DingTalk organization relationships | |
| Business process | Resignation, regularization, transfer | Manage transfer, onboarding, and resignation processes | |
| Shared configuration | System permissions, copy, reminders | Manage system permissions, reminder configuration, and system copy | |

### 2.2 User Center

#### 2.2.1 Business Entities and Terms

Account, login, logout, third-party account, user information, password recovery, password reset, close account, disable account, create account.

| Business entity | Domain | Context | Core elements (value objects) or key attributes | Notes |
| --- | --- | --- | --- | --- |
| Internal employee account | Account | Account | Username, password, login ticket | |
| Third-party account | Account | Third-party account | Username, password, login ticket | |
| User information | User | Internal user, third-party user | User name, nickname, phone number, city ID | |

#### 2.2.2 Domain Behavior

| Domain | Context | Business behavior |
| --- | --- | --- |
| Account | Internal employee account<br/>Third-party account | Create account, close account, login, logout, recover password, reset password, disable account |
| User | Internal employee information<br/>Third-party user information | Create third-party user<br/>Disable or enable third-party user<br/>Update third-party user information |

#### 2.2.3 Domain Service Capabilities

| Domain | Context | Service capability | Business notes |
| --- | --- | --- | --- |
| Account | Internal employee account<br/>Third-party account | Authenticate employees signing in to other systems | |
| User | Internal employee information<br/>Third-party user information | Manage basic user information | |

### 2.3 Recruitment System

#### 2.3.1 Business Entities and Terms

Resume, interview, onboarding, offboarding, work experience, personal information, education, resume pool, position, copy configuration, applicant registration form, Ctrip API integration, Liepin API integration, resume parsing, job posting, interview feedback, talent review, internal referral, referral reward.

| Business entity | Domain | Context | Core elements (value objects) or key attributes | Notes |
| --- | --- | --- | --- | --- |
| Resume | Resume | Resume pool |  | |
| Work experience | Candidate | Candidate information, resume |  | |
| Education | Candidate | Candidate information, resume |  | |
| Personal information | Candidate | Candidate information, resume |  | |
| Resume pool | Resume | Resume pool |  | |
| Position | Position | Position, job posting |  | |
| Interview | Business process | Interview |  | |
| Interview feedback | Business process | Interview feedback |  | |
| Internal referral | Business process | Internal referral |  | |
| Referral reward | Business process | Referral reward |  | |
| Interview invitation | Business process | Interview | | |
| Referral reward configuration | Business process | Referral reward configuration | | |
| Interview process configuration | Business process | Interview process configuration | | |
| Resume sourcing integration | Resume | Resume pool | | |
| Resume sourcing configuration | Resume | Resume sourcing configuration | | |

#### 2.3.2 Domain Behavior

| Domain | Context | Business behavior |
| --- | --- | --- |
| Resume | Resume pool, resume, job-board integration | Import, query, source, and parse resumes; integrate with third-party job boards |
| Candidate | Candidate information, resume | Manage resumes of candidates who are interviewing or about to join |
| Position | Position, job posting, headcount, job-board integration | Manage positions and postings, integrate with job boards, manage posting quotas |
| Business process | Interview, referral, feedback, interview process configuration | Govern the business and configuration around the whole interview process |

#### 2.3.3 Domain Service Capabilities

| Domain | Context | Service capability | Business notes |
| --- | --- | --- | --- |
| Resume | Resume pool, resume, job-board integration | Manage candidate resumes and integrate with third-party job boards | |
| Candidate | Candidate information, resume, applicant information | Manage information for people who interview, move through the process, or are about to join | |
| Position | Position, job posting, headcount, job-board integration | Post positions, manage headcount targets, integrate with third-party job boards | |
| Business process | Interview, referral, feedback, interview process configuration | Govern the recruitment business flow and its configuration | |

### 2.4 Permission System

#### 2.4.1 Business Entities and Terms

Role, menu, system, button, role group, department permission, city permission, field permission, user, user group, authorization check, grant, revoke.

| Business entity | Domain | Context | Core elements (value objects) or key attributes | Notes |
| --- | --- | --- | --- | --- |
| Role | Role | Role |  | |
| Role group | Role | Role group |  | |
| Menu | Resource | Menu |  | |
| System | Resource | System |  | |
| Button | Resource | Button |  | |
| Table column | Resource | Table column | | |
| City | Resource | City | | |
| Department | Resource | Department | | |
| Department permission | Permission | Department permission |  | |
| City permission | Permission | City permission |  | |
| Field permission | Permission | Field permission |  | |
| Menu permission | Permission | Menu permission | | |
| System permission | Permission | System permission | | |
| Button permission | Permission | Button permission | | |
| User | User | User |  | |
| User group | User | User group |  | |
| Authorization check | Permission | Permission | | |
| Grant | Permission | Permission | | |
| Revoke | Permission | Permission | | |

#### 2.4.2 Domain Behavior

| Domain | Context | Business behavior |
| --- | --- | --- |
| Role | Role group, role | Manage roles and role groups |
| Resource | System, menu, button, data column, city, department | Manage systems, menus, buttons, and other resources |
| User | User, user group | Manage users and user groups |
| Permission | Menu permission, system permission, data-column permission, city permission, department permission | Manage menu, system, functional, and data permissions, including granting and revoking |

#### 2.4.3 Domain Service Capabilities

| Domain | Context | Service capability |
| --- | --- | --- |
| Role | Role group, role | Manage roles |
| Resource | System, menu, button, data column, city, department | Provide a single entry point for permission resources and their metadata |
| User | User, user group | Abstract permission subjects and manage permission-related data |
| Permission | Menu permission, system permission, data-column permission, city permission, department permission | Manage menu, system, functional, and data permissions, including granting and revoking |

### 2.5 Ticket System

#### 2.5.1 Business Entities and Terms

DBA ticket, operations ticket, business ticket, scaling request, Confluence access request, business data export request, service decommission request, database initialization request, database DDL request, database DML request.

| Business entity | Domain | Context | Core elements (value objects) or key attributes | Notes |
| --- | --- | --- | --- | --- |
| DBA ticket | Ticket | DBA ticket |  | |
| Operations ticket | Ticket | Operations ticket |  | |
| Business ticket | Ticket | Business ticket |  | |
| Scaling request | Ticket | Operations ticket |  | |
| Confluence access request | Ticket | Business ticket |  | |
| Business data export request | Ticket | Business ticket | | |
| Service decommission request | Ticket | Operations ticket | | |
| Database initialization request | Ticket | DBA ticket | | |
| Database DDL request | Ticket | DBA ticket | | |
| Database DML request | Ticket | DBA ticket | | |

#### 2.5.2 Domain Behavior

| Domain | Context | Business behavior |
| --- | --- | --- |
| Ticket | DBA ticket, operations ticket, business ticket | Scaling requests, Confluence access requests, service decommission requests, database initialization requests, database DDL requests, database DML requests |

#### 2.5.3 Domain Service Capabilities

| Domain | Context | Service capability |
| --- | --- | --- |
| Ticket | DBA ticket, operations ticket, business ticket | Govern DBA, operations, and business tickets in one place to improve internal service turnaround |

## 3. Modeling the Implementation

### 3.1 HR System

#### 3.1.1 Domain Class Diagram

<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/hr-domain-class-diagram.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/hr-domain-class-diagram.svg" alt="HR domain class diagram: employee, department, position, and contract aggregates and value objects, plus domain enums for the request documents" /></a>

*This diagram is wide; click it to open the full size in a new window.*

#### 3.1.2 Database E-R Diagram

<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/hr-er-diagram.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/hr-er-diagram.svg" alt="HR database E-R diagram: relationships between employee, department, position, contract, request, and permission configuration tables" /></a>

*This diagram is wide; click it to open the full size in a new window.*

#### 3.1.3 Database Scripts

```sql
CREATE TABLE `staff_basic`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`staff_number` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 员工工号',`chinese_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 员工姓名',`email` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 员工邮箱',`department_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工所在部门ID',`pict_url` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 员工头像链接',`nick_name` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 员工昵称',`card_number` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 员工身份证号',`bank_card_number` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 员工银行卡号',`bank_name` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 工资卡所属银行',`bank_address_name` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 工资卡所属分行地址',`leader_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工领导ID',`status` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工状态',`tec_level` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 员工职位级别',`education_background` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 员工学历',`hr_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '员工对应hr',`home_city_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '户籍所在城市',`home_city_name` varchar(50) NOT NULL DEFAULT  '' COMMENT '户籍所在城市名称',`marital_status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '婚姻状况',`current_address` varchar(200) NOT NULL DEFAULT  '' COMMENT '现住地址',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), UNIQUE KEY `uniq_s_e` (`staff_number`,`email`) COMMENT '联合唯一索引', KEY `idx_email` (`email`), KEY `idx_department_id` (`department_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '员工基础信息表';

CREATE TABLE `staff_education`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`staff_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工ID',`school_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 学校名称',`start_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 开始时间',`end_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 结束时间',`education_background` varchar(30) NOT NULL DEFAULT  '' COMMENT '获取学历',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '员工教育信息表';

CREATE TABLE `staff_workexperience`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`staff_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工ID',`company` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 公司名称',`start_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 开始时间',`end_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 结束时间',`content` varchar(2000) NOT NULL DEFAULT  '' COMMENT '工作内容描述',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '员工工作经历信息表';

CREATE TABLE `staff_emergency_contact`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`staff_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工ID',`emergency_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 紧急联系人名称',`hand_phone` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 紧急联系人电话',`relation` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 紧急联系人关系',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '员工紧急联系人信息表';

CREATE TABLE `department`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`department_name` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 部门名称',`level` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 部门级别',`manager_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 部门管理员',`level_link` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 链式部门',`parent_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 父级部门ID',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '部门状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_parent_id` (`parent_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '部门信息表';

CREATE TABLE `post`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`post_name` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 岗位名称',`levels` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 岗位支持级别',`content` varchar(1000) NOT NULL DEFAULT  '' COMMENT ' 职位职责内容',`sort` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 岗位序列',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 岗位状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '岗位信息表';

CREATE TABLE `regularization_apply`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`staff_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工ID',`department_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 申请人所在部门ID',`apply_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 申请时间',`hire_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 入职时间',`leader_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 直属领导ID',`content` varchar(2000) NOT NULL DEFAULT  '' COMMENT ' 试用期工作内容',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '转正申请表';

CREATE TABLE `leave_apply`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`staff_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 申请人员工ID',`department_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 申请人所在部门ID',`handover` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 是否交接完成',`reason` varchar(200) NOT NULL DEFAULT  '' COMMENT ' 离职原因',`apply_status` tinyint(4) NOT NULL DEFAULT  1 COMMENT ' 申请单状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '离职申请表';

CREATE TABLE `leave_transfer`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`handover_title` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 交接事项名称',`content` varchar(200) NOT NULL DEFAULT  '' COMMENT ' 交接内容',`handover` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 是否交接完成',`handover_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 交接人userid',`transfer_status` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 交接状态',`chinese_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 交接人姓名',`approval_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '审批人ID',`approval_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '审批完成时间',`leave_apply_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '离职申请单ID',`sort` tinyint(4) NOT NULL DEFAULT  0 COMMENT '交接顺序',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_leave_apply_id` (`leave_apply_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '离职交接单表';

CREATE TABLE `leave_transfer_config`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`handover_title` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 交接事项名称',`content` varchar(200) NOT NULL DEFAULT  '' COMMENT ' 交接内容',`approval_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '审批人ID',`sort` tinyint(4) NOT NULL DEFAULT  0 COMMENT '交接顺序',`department_id` 业务线 NOT NULL DEFAULT  null COMMENT '所属二级部门',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '离职交接配置表';

CREATE TABLE `data_column_config`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`table_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '表名称',`table_desc` varchar(60) NOT NULL DEFAULT  '' COMMENT '表描述',`column_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '字段名称',`column_desc` varchar(60) NOT NULL DEFAULT  '' COMMENT '字段描述',`bus_model` varchar(60) NOT NULL DEFAULT  '' COMMENT '业务模块',`field_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '业务属性名称',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '数据字段管理表';


```

### 3.2 User Center

#### 3.2.1 Domain Class Diagram

<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/image-2.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/image-2.svg" alt="User center domain class diagram: accounts, third-party users, login logs, and DingTalk account links" /></a>

*This diagram is wide; click it to open the full size in a new window.*

#### 3.2.2 Database E-R Diagram

![User center database E-R diagram: user account, third-party user, login log, and DingTalk link tables](/images/blog/ddd-modeling-enterprise-office/image-3.svg)

#### 3.2.3 Database Scripts

```sql
CREATE TABLE `user_account`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`user_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 用户名',`chinese_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 用户姓名',`password` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 密码',`staff_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工ID',`third_user` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 是否是三方员工',`ticket` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 登录系统ticket',`ticket_expire_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' ticket有效期',`last_updatepw_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '上次修改密码的时间',`hand_phone` varchar(30) NOT NULL DEFAULT  '' COMMENT '用户电话号码',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 账号状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), UNIQUE KEY `uniq_u` (`user_name`) COMMENT '联合唯一索引', KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '用户账号表';

CREATE TABLE `third_user`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`email` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 用户邮箱',`city_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 用户所在城市ID',`city_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 用户所在城市名称',`chinese_name` varchar(30) NOT NULL DEFAULT  '' COMMENT '用户姓名',`hand_phone ` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '用户电话',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '用户状态',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_email` (`email`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '三方用户信息表';

CREATE TABLE `login_log`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`login_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 登录时间',`user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 用户ID',`ticekt` varchar(100) NOT NULL DEFAULT  '' COMMENT '登录ticket',`logout_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '退出时间',`system_url` varchar(100) NOT NULL DEFAULT  '' COMMENT '登录目标系统域名',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_user_id` (`user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '用户登录日志表';

CREATE TABLE `ding_user_relation`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`ding_user_id` varchar(60) NOT NULL DEFAULT  '' COMMENT '钉钉账号id',`user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '用户账号ID',`hand_phone` varchar(30) NOT NULL DEFAULT  '' COMMENT '用户电话信息',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '关联状态') ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '钉钉账号关联关系';


```

### 3.3 Recruitment System

#### 3.3.1 Domain Class Diagram

<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/image-4.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/image-4.svg" alt="Recruitment domain class diagram: resumes, candidates, positions, interview process configuration, and posting configuration" /></a>

*This diagram is wide; click it to open the full size in a new window.*

#### 3.3.2 Database E-R Diagram

![Recruitment database E-R diagram: relationships between resume, candidate, position, interview, and referral tables](/images/blog/ddd-modeling-enterprise-office/recruitment-er-diagram.svg)

#### 3.3.3 Database Scripts

```sql
CREATE TABLE `resume_basic`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`resume_name` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 简历文件名',`chinese_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 简历人员姓名姓名',`hand_phone` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 应聘人员电话',`email_account` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 个人邮箱',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 简历状态',`work_status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '应聘工作状态',`resource` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 简历来源',`create_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '录入时间',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_chinese_name` (`chinese_name`), KEY `idx_hand_phone` (`hand_phone`), UNIQUE KEY `uniq_c_h` (`chinese_name`,`hand_phone`) COMMENT '联合唯一索引') ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '简历库信息表';

CREATE TABLE `resume_education`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`resume_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 简历ID',`school_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 学校名称',`start_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 开始时间',`end_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 结束时间',`education_background` varchar(30) NOT NULL DEFAULT  '' COMMENT '获取学历', PRIMARY KEY (`id`), KEY `idx_resume_id` (`resume_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '简历教育信息表';

CREATE TABLE `resume_workexperience`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`resume_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 简历ID',`company` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 公司名称',`start_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 开始时间',`end_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 结束时间',`content` varchar(2000) NOT NULL DEFAULT  '' COMMENT '工作内容描述', PRIMARY KEY (`id`), KEY `idx_resume_id` (`resume_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '简历工作经历信息表';

CREATE TABLE `interview_process_config`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`staff_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工ID',`emergency_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 紧急联系人名称',`hand_phone` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 紧急联系人电话',`relation` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 紧急联系人关系',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '面试流程配置表';

CREATE TABLE `post_publish_config`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`department_name` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 部门名称',`level` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 部门级别',`manager_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 部门管理员',`level_link` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 链式部门',`parent_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 父级部门ID',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '部门状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_parent_id` (`parent_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '职位发布配置表';

CREATE TABLE `post`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`post_name` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 岗位名称',`levels` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 岗位支持级别',`content` varchar(1000) NOT NULL DEFAULT  '' COMMENT ' 职位职责内容',`sort` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 岗位序列',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 岗位状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '职位信息表';

CREATE TABLE `interview_invitation`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`post_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 职位ID',`user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 邀请人',`invitation_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 邀请时间',`resume_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 简历ID',`resources` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 简历来源',`internal_recommended` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 是否是内推',`processStatus` tinyint(4) NOT NULL DEFAULT  0 COMMENT '面试流程状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_post_id` (`post_id`), KEY `idx_user_id` (`user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '面试邀请表';

CREATE TABLE `interview_comment`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`post_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 职位ID',`content` varchar(1000) NOT NULL DEFAULT  '' COMMENT ' 应聘人员反馈',`sort` tinyint(4) NOT NULL DEFAULT  1 COMMENT ' 面试场次',`interviewer_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 面试官ID',`feed_back_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '应聘人员反馈时间',`interviewerComment` varchar(1000) NOT NULL DEFAULT  '' COMMENT '面试官评价',`comment_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '面试官评价时间',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_post_id` (`post_id`), KEY `idx_interviewer_user_id` (`interviewer_user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '面试评价与反馈表';

CREATE TABLE `applicant_regist_record`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`chinese_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '应聘人员名称',`hand_phone` varchar(60) NOT NULL DEFAULT  '' COMMENT '应聘人员电话',`email_account` varchar(60) NOT NULL DEFAULT  '' COMMENT '个人邮箱',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '应聘人员状态',`card_number` varchar(60) NOT NULL DEFAULT  '' COMMENT '应聘人员身份证号',`nation` varchar(60) NOT NULL DEFAULT  '' COMMENT '民族',`home_city_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '户籍所在城市',`home_city_came` varchar(60) NOT NULL DEFAULT  '' COMMENT '户籍所在城市名称',`marital_status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '婚姻状况',`current_address` varchar(60) NOT NULL DEFAULT  '' COMMENT '现住地址',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_leave_apply_id` (`leave_apply_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '应聘人员登记表';

CREATE TABLE `applicant_education`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`applicant_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 简历ID',`school_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 学校名称',`start_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 开始时间',`end_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 结束时间',`education_background` varchar(30) NOT NULL DEFAULT  '' COMMENT '获取学历',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_applicant_id` (`applicant_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '简历教育信息表';

CREATE TABLE `applicant_workexperience`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`applicant_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 简历ID',`company` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 公司名称',`start_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 开始时间',`end_date` date NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 结束时间',`content` varchar(2000) NOT NULL DEFAULT  '' COMMENT '工作内容描述',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_applicant_id` (`applicant_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '简历工作经历信息表';

CREATE TABLE `internal_recommand_config`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`department_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 二级部门ID',`post_level` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 职位内推奖励最低级别',`month` tinyint(4) NOT NULL DEFAULT  0 COMMENT '入职时长',`amount` int(11) NOT NULL DEFAULT  0 COMMENT '奖励金额',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '内推奖励配置表';

CREATE TABLE `offer_record`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`offer_name` varchar(100) NOT NULL DEFAULT  '' COMMENT 'offer名称',`applicant_email` varchar(60) NOT NULL DEFAULT  '' COMMENT '应聘人员邮箱',`applicant_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '应聘人员ID',`offer_status` tinyint(4) NOT NULL DEFAULT  0 COMMENT 'offer状态',`content` text NOT NULL DEFAULT  '' COMMENT 'offer内容',`offer_follow_userid` bigint(20) NOT NULL DEFAULT  0 COMMENT 'offer跟进人',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人') ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = 'offer记录表';


```

### 3.4 Permission System

#### 3.4.1 Domain Class Diagram

<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/image-5.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/image-5.svg" alt="Permission domain class diagram: roles, resources, users, and the authorization model" /></a>

*This diagram is wide; click it to open the full size in a new window.*

#### 3.4.2 Database E-R Diagram

![Permission database E-R diagram: relationships between role, resource, user, and authorization tables](/images/blog/ddd-modeling-enterprise-office/permission-er-diagram.svg)

#### 3.4.3 Database Scripts

```sql
CREATE TABLE `user_group`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`group_name` varchar(50) NOT NULL DEFAULT  '' COMMENT '用户组名',`group_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '用户组编码',`status` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 用户组状态',`user_list` varchar(2000) NOT NULL DEFAULT  '' COMMENT '用户组内用户列表',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '用户组';

CREATE TABLE `role`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`role_name` varchar(50) NOT NULL DEFAULT  '' COMMENT '角色名称',`role_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '角色编码',`status` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 角色组状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '角色表';

CREATE TABLE `role_group`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`group_name` varchar(50) NOT NULL DEFAULT  '' COMMENT '角色组名',`group_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '角色组编码',`role_code_list` varchar(2000) NOT NULL DEFAULT  '' COMMENT '角色列表',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '角色组';

CREATE TABLE `user_role_mapping`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '用户ID',`role_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '角色code', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '用户角色关联表';

CREATE TABLE `authority`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`auth_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '权限编码',`authority_type` tinyint(4) NOT NULL DEFAULT  0 COMMENT '权限类型',`role_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '关联角色编码',`role_group_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '关联角色组',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '权限状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '抽象权限表';

CREATE TABLE `data_authority`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`auth_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '权限标示',`data_column_id` varchar(50) NOT NULL DEFAULT  '' COMMENT '业务数据库标示',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '数据字段权限';

CREATE TABLE `admin_authority`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`auth_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '权限标示',`department_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '组织部门ID',`city_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '城市权限',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_auth_code` (`auth_code`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '行政数据权限';

CREATE TABLE `system_authority`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`auth_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '权限标示',`system_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '系统编码',`module_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '菜单编码',`menu_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '按钮编码',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_auth_code` (`auth_code`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '系统菜单权限表';

CREATE TABLE `system`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`system_name` varchar(50) NOT NULL DEFAULT  '' COMMENT '系统名称',`system_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '系统编码',`system_url` varchar(50) NOT NULL DEFAULT  '' COMMENT '系统域名',`system_picurl` varchar(50) NOT NULL DEFAULT  '' COMMENT '系统图标',`tec_admin_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '系统技术负责人',`bus_admin_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '系统业务负责人',`department_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '系统所属部门',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '系统表';

CREATE TABLE `module`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`module_name` varchar(50) NOT NULL DEFAULT  '' COMMENT '菜单名称',`module_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '菜单编码',`system_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '系统编码',`module_url` varchar(50) NOT NULL DEFAULT  '' COMMENT '菜单链接',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_module_code` (`module_code`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '菜单模块表';

CREATE TABLE `menu`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`menu_name` varchar(50) NOT NULL DEFAULT  '' COMMENT '按钮名称',`menu_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '按钮编码',`module_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '所属菜单编码',`system_code` varchar(50) NOT NULL DEFAULT  '' COMMENT '所属系统编码',`module_url` varchar(50) NOT NULL DEFAULT  '' COMMENT '菜单链接',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '按钮表';

CREATE TABLE `data_column_config`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`bus_database` varchar(60) NOT NULL DEFAULT  '' COMMENT '数据库业务系统名称',`table_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '表名称',`table_desc` varchar(60) NOT NULL DEFAULT  '' COMMENT '表描述',`column_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '字段名称',`column_desc` varchar(60) NOT NULL DEFAULT  '' COMMENT '字段描述',`bus_model` varchar(60) NOT NULL DEFAULT  '' COMMENT '业务模块',`field_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '业务属性名称',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '数据字段管理表';


```

### 3.5 Ticket System

#### 3.5.1 Domain Class Diagram

<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/image-6.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/image-6.svg" alt="Ticket domain class diagram: DBA tickets, operations tickets, and business tickets" /></a>

*This diagram is wide; click it to open the full size in a new window.*

#### 3.5.2 Database E-R Diagram

![Ticket database E-R diagram: DBA, business, and operations tickets with domain, scaling, and decommission sub-tables](/images/blog/ddd-modeling-enterprise-office/image-7.svg)

#### 3.5.3 Database Scripts

```sql
CREATE TABLE `dba_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`dba_biz_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT 'DBA工单编号',`order_type` varchar(60) NOT NULL DEFAULT  '' COMMENT 'DBA工单类型',`db_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '数据库名称',`rw_rate` varchar(60) NOT NULL DEFAULT  '' COMMENT '数据库读写比',`size` varchar(20) NOT NULL DEFAULT  '' COMMENT '数据库存储大小',`url` varchar(100) NOT NULL DEFAULT  '' COMMENT '工单附件地址',`content` varchar(3000) NOT NULL DEFAULT  '' COMMENT '工单内容',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '工单状态',`apply_reason` varchar(300) NOT NULL DEFAULT  '' COMMENT '申请原因',`biz_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '关联业务单号',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_dba_biz_order_code` (`dba_biz_order_code`), KEY `idx_create_user_id` (`create_user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = 'dba工单表';

CREATE TABLE `busniess_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`biz_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '业务工单编号',`biz_order_type` varchar(60) NOT NULL DEFAULT  '' COMMENT '业务工单类型',`content` varchar(300) NOT NULL DEFAULT  '' COMMENT '工单内容',`bus_line` varchar(30) NOT NULL DEFAULT  '' COMMENT '业务线',`url` varchar(100) NOT NULL DEFAULT  '' COMMENT '工单附件地址',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '工单状态',`apply_reason` varchar(300) NOT NULL DEFAULT  '' COMMENT '申请原因',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_biz_order_code` (`biz_order_code`), KEY `idx_create_user_id` (`create_user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '业务工单表';

CREATE TABLE `ops_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`ops_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单编号',`ops_order_type` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单类型',`url` varchar(50) NOT NULL DEFAULT  '' COMMENT '工单附件地址',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '工单状态',`apply_reason` varchar(300) NOT NULL DEFAULT  '' COMMENT '申请原因',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_ops_order_code` (`ops_order_code`), KEY `idx_create_user_id` (`create_user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '运维工单申请总表';

CREATE TABLE `ops_domain_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`ops_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单编号',`env_type` varchar(60) NOT NULL DEFAULT  '' COMMENT '环境类型',`service_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '关联服务名',`domain_url` varchar(60) NOT NULL DEFAULT  '' COMMENT '域名',`ip_content` varchar(200) NOT NULL DEFAULT  '' COMMENT 'IP地址列表', PRIMARY KEY (`id`), KEY `idx_ops_order_code` (`ops_order_code`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '服务域名申请表';

CREATE TABLE `infrast_config_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`ops_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单编号',`op_type` tinyint(4) NOT NULL DEFAULT  0 COMMENT '扩容类型',`service_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '关联服务名',`ip_content` varchar(200) NOT NULL DEFAULT  '' COMMENT 'IP地址列表',`cpu_count` tinyint(4) NOT NULL DEFAULT  0 COMMENT 'cpu当前核数',`target_cpu_count` tinyint(4) NOT NULL DEFAULT  0 COMMENT 'cpu目标核数',`mem_size` tinyint(4) NOT NULL DEFAULT  0 COMMENT '内存当前大小(G)',`target_mem_size` tinyint(4) NOT NULL DEFAULT  0 COMMENT '内存目标大小(G)',`disk_size` tinyint(4) NOT NULL DEFAULT  0 COMMENT '磁盘当前大小(G)',`target_disk_size` tinyint(4) NOT NULL DEFAULT  0 COMMENT '磁盘目标大小(G)', PRIMARY KEY (`id`), KEY `idx_ops_order_code` (`ops_order_code`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '服务扩缩容申请表';

CREATE TABLE `clust_offline_order`(`ops_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单编号',`service_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '关联服务名',`ip_content` varchar(200) NOT NULL DEFAULT  '' COMMENT 'IP地址列表',`check_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '工程效率校验人',`offline_domain` tinyint(4) NOT NULL DEFAULT  0 COMMENT '是否下线域名') ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '集群下线申请';


```

## 4. Takeaways

Four lessons from rebuilding these five systems:

1. **Split contexts before arguing about layers.** The permission system shows this best: mixing roles, resources, users, and grants into one service means every new permission dimension (menu, button, field, city, department) touches the core logic. Once split by context, a new dimension is just another permission context.
2. **The three tables are about alignment.** The entity, behavior, and capability tables answer "what exists", "what it can do", and "what is exposed to others". Where they disagree is usually where the model is still unclear.
3. **An E-R diagram is not a domain class diagram.** The former expresses storage structure, the latter expresses business concepts and behavior. Drawing both for the same system makes their differences visible; the bigger the gap, the more likely a conversion layer (usually aggregates and factories) is still missing.
4. **Office systems have many generic subdomains.** HR, the user center, permissions, and tickets are generic capabilities in most companies. They fit DDD's Generic Subdomain pattern and deserve being built once, instead of being rewritten by every business system.

## Further Reading

- [From CRUD to DDD with Three Tables](/en/blog/ddd-handbook/#from-crud-to-ddd-with-three-tables): how the three tables in this post are meant to be used.
- [DDD Four-Color Modeling in Practice: Social Relationship Modeling](/en/blog/ddd-social-relationship-modeling/): a full walkthrough of a different modeling method.
- [The DDD Handbook](/en/blog/ddd-handbook/): where modeling sits in the broader DDD picture.
