---
title: "DDD 建模实战：企业办公系统的领域重建"
description: "用 HR 办公、用户中心、招聘、权限、工单五个系统做领域重建：实体与上下文的梳理表格、领域类图、数据库 E-R 图与建表脚本。"
pubDate: 2026-11-26
tags: ["DDD", "领域建模", "企业办公", "权限系统", "数据库设计"]
category: "ddd-domain-modeling"
draft: false
lang: "zh"
translationKey: "ddd-modeling-enterprise-office"
---
这篇是 DDD 建模实战里比较重的一篇：把我在企业办公领域做过或维护过的五个系统（HR 办公、用户中心、招聘、权限、工单）重新抽象一遍，做一次领域上下文的重建。

原本打算用限界笔纸法走完整的建模流程，但那种方式需要对领域内的业务和关系有更深的了解，受时间限制没能把图形画全，所以这里直接上结果：每个系统先梳理业务实体、领域行为和领域服务能力三张表，再给出领域类图、数据库 E-R 图和建表脚本。

三个阅读提示：

- 文中三张表的格式与[《三张表教你从 CRUD 过渡到 DDD》](/blog/ddd-handbook/#三张表教你从crud过渡到ddd)一致，可以先看那一篇理解用法。
- 领域类图和 E-R 图由 PlantUML 渲染，标注保留中文；部分图较宽，已做成可点击查看原图的链接。
- 建表脚本来自真实项目，保留了原始字段与索引定义，个别字段类型或默认值未必是最佳实践，引用时请按自己的规范调整。

## 一、背景

之前已经进行了一些DDD的领域建模实战，但是还不够深入，这里我把曾经做过或者维护过的系统来简单抽象一下，对不同系统的领域上下文进行一些简单的重建，来丰富DDD领域建模的内容。本来是想通过限界笔纸法来进行建模的，但是这种方式需要更深入的了解领域系统内的一些业务和关系，由于时间关系，一时也无法更多的描绘限界笔纸法下的图形，所以这里就单刀直入了，直接开干！

## 二、领域系统
### 2.1 HR 办公系统
#### 2.1.0 用限界笔纸法分析员工实体
![限界笔纸法分析员工实体：员工基础信息、工作经历、教育经历与紧急联系人的字段草稿](/images/blog/ddd-modeling-enterprise-office/image-1.png)

#### 2.1.1 业务实体概念和名词
员工，部门，岗位，薪资，工作经历，教育经历，合同协议，紧急联系人，福利，转正申请单，离职申请单，离职交接单，数据字段权限配置

| 业务实体名称 | 所属业务领域 | 所属上下文 | 核心元素(值对象)，或者核心属性 | 说明 |
| --- | --- | --- | --- | --- |
| 员工 | 员工域 | 员工基础信息 | 头像，姓名，所属部门，邮箱 | |
| 工作经历 | 员工域 | 员工扩展信息 | 工作单位名称，开始时间，结束时间 | |
| 教育经历 | 员工域 | 员工扩展信息 | 学校名称，开始时间，结束时间 | |
| 紧急联系人 | 员工域 | 员工扩展信息 | 联系人电话，联系人关系，联系人顺序 | |
| 部门 | 组织域 | 部门 | 部门名称，部门级别，部门管理员，父级部门ID | |
| 岗位 | 组织域 | 岗位 | 岗位名称，岗位介绍，岗位级别 | |
| 合同协议 | 员工域 | 员工扩展信息 | 合同名称，合同类型，合同内容，合同变量 | |
| 离职申请单 | 业务流程域 | 离职申请 | 申请人，申请时间，离职原因 | |
| 转正申请单 | 业务流程域 | 转正申请 | 申请人，申请时间，工作介绍 | |
| 离职交接单 | 业务流程域 | 离职交接 | 交接项目，交接顺序，审批人，交接内容 | |
| 数据字段权限配置 | 公共配置域 | 系统内权限 | 表名称，表描述，字段名称，字段描述，员工数据权限描述 | |
| 管理员权限配置 | 公共配置域 | 系统内权限 | 所属业务线，管理员列表，功能列表 | |
| 业务提醒配置 | 公共配置域 | 业务配置 | 配置名称，配置参数，配置描述，配置分组类型 | |
| 福利 | 员工域 | 员工扩展信息 | 社保缴纳基数 | |
| 薪资 | 员工域 | 员工扩展信息 | 月薪，年薪 | |


#### 2.1.2 领域行为表格
| 业务领域 | 业务上下文 | 业务行为 |
| --- | --- | --- |
| 员工域 | 员工基础信息 | 员工基本信息维护，导出员工信息，导入员工信息，员工信息分页查询，员工信息归档 |
| 员工域 | 员工扩展信息 | 员工工作经历维护，教育经历维护，紧急联系人维护，合同协议管理，合同协议签署，合同分页查询，合同续签，导出，预览，下载<br/>薪资和福利维护 |
| 组织域 | 部门，岗位，钉钉组织关系 | 部门信息维护，部门信息导出，组织树查看，部门调整，岗位管理 |
| 业务流程域 | 离职，转正，调岗 | 离职申请，离职审批，离职交接流程管理，转正申请流程管理 |
| 公共配置域 | 系统内权限 | 超级管理员与各业务线hr管理员配置，转正提醒，部门调整提醒，信息完善提醒 |


#### 2.1.3 领域服务能力表格
| 业务领域 | 业务上下文 | 服务能力 | 业务说明 |
| --- | --- | --- | --- |
| 员工域 | 员工基础信息，<br/>员工扩展信息 | 对员工基础信息和扩展信息的管理和维护 | |
| 组织域 | 部门，岗位，钉钉组织关系 | 对部门，岗位，钉钉组织关系等进行维护 | |
| 业务流程域 | 离职，转正，调岗 | 对员工的调转入离等业务流程进行管理维护 | |
| 公共配置域 | 系统内权限，文案，提醒 | 对各种系统内权限，提醒配置，文案配置等进行管理 | |


### 2.2 用户中心
#### 2.2.1 业务实体概念和名词


账号，登录，退出，三方账号，用户信息，找回密码，重置密码，关闭账号，禁用账号，创建账号

| 业务实体名称 | 所属业务领域 | 所属上下文 | 核心元素(值对象)，或者核心属性 | 说明 |
| --- | --- | --- | --- | --- |
| 内部员工账号 | 账号域 | 账号 | 用户名，密码，登录ticket | |
| 三方账号 | 账号域 | 三方账号 | 用户名，密码，登录ticket | |
| 用户信息 | 用户域 | 内部用户，三方用户 | 用户名称，昵称，电话号码，所在城市ID | |


#### 2.2.2 领域行为表格
| 业务领域 | 业务上下文 | 业务行为 |
| --- | --- | --- |
| 账号域 | 内部员工账号<br/>三方员工账号 | 创建账号，关闭账号，登录，退出，找回密码，重置密码，禁用账号 |
| 用户域 | 内部员工信息<br/>三方员工信息 | 创建三方用户<br/>禁用，启用三方用户<br/>更新三方用户信息 |


#### 2.2.3 领域服务能力表格
| 业务领域 | 业务上下文 | 服务能力 | 业务说明 |
| --- | --- | --- | --- |
| 账号域 | 内部员工账号<br/>三方员工账号 | 提供员工登录系统认证的能力 | |
| 用户域 | 内部员工信息<br/>三方员工信息 | 提供员工基本信息管理的能力 | |


### 2.3 招聘系统
#### 2.3.1 业务实体概念和名词
简历，面试，入职，离职，工作经历，个人信息，教育信息，简历库，职位，文案配置，应聘人员登记表，对接携程api，对接猎聘api，简历解析，职位发布，面试评价，人才盘点，内推，内推奖励

| 业务实体名称 | 所属业务领域 | 所属上下文 | 核心元素(值对象)，或者核心属性 | 说明 |
| --- | --- | --- | --- | --- |
| 简历 | 简历域 | 简历库 |  | |
| 工作经历 | 候选人域 | 候选人信息，简历 |  | |
| 教育经历 | 候选人域 | 候选人信息，简历 |  | |
| 个人信息 | 候选人域 | 候选人信息，简历 |  | |
| 简历库 | 简历域 | 简历库 |  | |
| 职位 | 岗位域 | 岗位，职位 |  | |
| 面试 | 业务流程域 | 面试 |  | |
| 面试评价 | 业务流程域 | 面试反馈 |  | |
| 内推 | 业务流程域 | 内部推荐 |  | |
| 内推奖励 | 业务流程域 | 内推奖励 |  | |
| 面试邀请 | 业务流程域 | 面试 | | |
| 内推奖励配置 | 业务流程域 | 内推奖励配置 | | |
| 面试流程配置 | 业务流程域 | 面试流程配置 | | |
| 简历抓取对接 | 简历域 | 简历库 | | |
| 简历抓取配置 | 简历域 | 简历抓取配置 | | |


#### 2.3.2 领域行为表格
| 业务领域 | 业务上下文 | 业务行为 |
| --- | --- | --- |
| 简历域 | 简历库，简历，招聘网站对接 | 导入，查询，抓取简历，解析简历，对接第三方招聘网站 |
| 候选人域(应聘人员域) | 候选人信息，简历 | 管理待入职，应聘人员的简历信息 |
| 岗位域 | 岗位，职位，HC，招聘网站对接 | 管理岗位，职位，对接招聘网站，管理发布次数 |
| 业务流程域 | 面试，内推，评价，面试反馈，面试流程配置 | 对整个面试流程的相关业务进行管控 |


#### 2.3.3 领域服务能力表格
| 业务领域 | 业务上下文 | 服务能力 | 业务说明 |
| --- | --- | --- | --- |
| 简历域 | 简历库，简历，招聘网站对接 | 对应聘人员的简历信息进行管理，对接第三方招聘网站 | |
| 候选人域(应聘人员域) | 候选人信息，简历，应聘人员信息 | 提供来面试或者进入面试流程或者或者准备入职的人的信息管理能力 | |
| 岗位域 | 岗位，职位，HC，招聘网站对接 | 提供职位发布管理，上下家，HC指标，对接第三方网站招聘的能力 | |
| 业务流程域 | 面试，内推，评价，面试反馈，面试流程配置 | 对整个招聘业务流程的业务和相关配置进行管控 | |


### 2.4 权限系统
#### 2.4.1 业务实体概念和名词
角色，菜单，系统，按钮，角色组，部门权限，城市权限，字段权限，用户，用户组，鉴权，授权

| 业务实体名称 | 所属业务领域 | 所属上下文 | 核心元素(值对象)，或者核心属性 | 说明 |
| --- | --- | --- | --- | --- |
| 角色 | 角色域 | 角色 |  | |
| 角色组 | 角色域 | 角色组 |  | |
| 菜单 | 资源域 | 菜单 |  | |
| 系统 | 资源域 | 系统 |  | |
| 按钮 | 资源域 | 按钮 |  | |
| 表字段 | 资源域 | 表字段 | | |
| 城市 | 资源域 | 城市 | | |
| 部门 | 资源域 | 部门 | | |
| 部门权限 | 权限域 | 部门权限 |  | |
| 城市权限 | 权限域 | 城市权限 |  | |
| 字段权限 | 权限域 | 字段权限 |  | |
| 菜单权限 | 权限域 | 菜单权限 | | |
| 系统权限 | 权限域 | 系统权限 | | |
| 按钮权限 | 权限域 | 按钮权限 | | |
| 用户 | 用户域 | 用户 |  | |
| 用户组 | 用户域 | 用户组 |  | |
| 鉴权 | 权限域 | 权限 | | |
| 授权 | 权限域 | 权限 | | |
| 取消授权 | 权限域 | 权限 | | |


#### 2.4.2 领域行为表格
| 业务领域 | 业务上下文 | 业务行为 |
| --- | --- | --- |
| 角色域 | 角色组，角色 | 对角色和角色组进行管理 |
| 资源域 | 系统，菜单，按钮，数据字段，城市，部门 | 对系统，菜单按钮等资源进行管理 |
| 用户域 | 用户，用户组 | 对用户和用户组进行管理 |
| 权限域 | 菜单权限，系统权限，数据字段权限，城市权限，部门权限 | 对菜单，系统，功能权限和数据权限进行管理，包括授权和取消授权等业务 |


#### 2.4.3 领域服务能力表格
| 业务领域 | 业务上下文 | 服务能力 |
| --- | --- | --- |
| 角色域 | 角色组，角色 | 提供角色管理的能力 |
| 资源域 | 系统，菜单，按钮，数据字段，城市，部门 | 统一收口或者管理各种权限资源-元数据 |
| 用户域 | 用户，用户组 | 对权限使用者进行抽象并管理权限相关业务 |
| 权限域 | 菜单权限，系统权限，数据字段权限，城市权限，部门权限 | 对菜单，系统，功能权限和数据权限进行管理，包括授权和取消授权等业务 |


### 2.5 工单系统
#### 2.5.1 业务实体概念和名词
DBA工单，运维工单，业务工单，扩容申请，confluence权限申请，业务数据导出申请，服务下线申请，数据库初始化申请，数据库DDL申请，数据库DML申请

| 业务实体名称 | 所属业务领域 | 所属上下文 | 核心元素(值对象)，或者核心属性 | 说明 |
| --- | --- | --- | --- | --- |
| DBA工单 | 工单域 | DBA工单 |  | |
| 运维工单 | 工单域 | 运维工单 |  | |
| 业务工单 | 工单域 | 业务工单 |  | |
| 扩容申请 | 工单域 | 运维工单 |  | |
| confluence权限申请 | 工单域 | 业务工单 |  | |
| 业务数据导出申请 | 工单域 | 业务工单 | | |
| 服务下线申请 | 工单域 | 运维工单 | | |
| 数据库初始化申请 | 工单域 | DBA工单 | | |
| 数据库DDL申请 | 工单域 | DBA工单 |  | |
| 数据库DML申请 | 工单域 | DBA工单 |  | |


#### 2.5.2 领域行为表格
| 业务领域 | 业务上下文 | 业务行为 |
| --- | --- | --- |
| 工单域 | DBA工单,运维工单,业务工单 | 扩容申请,confluence权限申请,服务下线申请,数据库初始化申请,数据库DDL申请,数据库DML申请 |


#### 2.5.3 领域服务能力表格
| 业务领域 | 业务上下文 | 业务行为 |
| --- | --- | --- |
| 工单域 | DBA工单,运维工单,业务工单 | 对DBA工单,运维工单,业务工单统一管控，提供企业内部服务工单流转处理效率 |


## 三、建模实现
### 3.1 HR 办公系统
#### 3.1.1 领域类图
<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/hr-domain-class-diagram.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/hr-domain-class-diagram.svg" alt="HR 办公系统领域类图：员工、部门、岗位、合同等聚合与值对象，以及申请单相关的领域枚举" /></a>

*图较宽，可点击在新窗口查看完整尺寸。*

#### 3.1.2 数据库 E-R 图
<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/hr-er-diagram.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/hr-er-diagram.svg" alt="HR 办公系统数据库 E-R 图：员工、部门、岗位、合同协议、申请单与权限配置表的关系" /></a>

*图较宽，可点击在新窗口查看完整尺寸。*

#### 3.1.3 数据库脚本
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

### 3.2 用户中心
#### 3.2.1 领域类图
<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/image-2.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/image-2.svg" alt="用户中心领域类图：账号、三方用户、登录日志与钉钉账号关联" /></a>

*图较宽，可点击在新窗口查看完整尺寸。*

#### 3.2.2 数据库 E-R 图
![用户中心数据库 E-R 图：用户账号、三方用户、登录日志与钉钉关联表](/images/blog/ddd-modeling-enterprise-office/image-3.svg)

#### 3.2.3 数据库脚本
```sql
CREATE TABLE `user_account`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`user_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 用户名',`chinese_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 用户姓名',`password` varchar(60) NOT NULL DEFAULT  '' COMMENT ' 密码',`staff_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 员工ID',`third_user` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 是否是三方员工',`ticket` varchar(100) NOT NULL DEFAULT  '' COMMENT ' 登录系统ticket',`ticket_expire_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' ticket有效期',`last_updatepw_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '上次修改密码的时间',`hand_phone` varchar(30) NOT NULL DEFAULT  '' COMMENT '用户电话号码',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT ' 账号状态',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), UNIQUE KEY `uniq_u` (`user_name`) COMMENT '联合唯一索引', KEY `idx_staff_id` (`staff_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '用户账号表';

CREATE TABLE `third_user`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`email` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 用户邮箱',`city_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 用户所在城市ID',`city_name` varchar(30) NOT NULL DEFAULT  '' COMMENT ' 用户所在城市名称',`chinese_name` varchar(30) NOT NULL DEFAULT  '' COMMENT '用户姓名',`hand_phone ` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '用户电话',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '用户状态',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_email` (`email`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '三方用户信息表';

CREATE TABLE `login_log`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`login_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT ' 登录时间',`user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT ' 用户ID',`ticekt` varchar(100) NOT NULL DEFAULT  '' COMMENT '登录ticket',`logout_time` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '退出时间',`system_url` varchar(100) NOT NULL DEFAULT  '' COMMENT '登录目标系统域名',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_user_id` (`user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '用户登录日志表';

CREATE TABLE `ding_user_relation`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`ding_user_id` varchar(60) NOT NULL DEFAULT  '' COMMENT '钉钉账号id',`user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '用户账号ID',`hand_phone` varchar(30) NOT NULL DEFAULT  '' COMMENT '用户电话信息',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '关联状态') ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '钉钉账号关联关系';


```

### 3.3 招聘系统
#### 3.3.1 领域类图
<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/image-4.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/image-4.svg" alt="招聘系统领域类图：简历、候选人、职位、面试流程配置与发布配置" /></a>

*图较宽，可点击在新窗口查看完整尺寸。*

#### 3.3.2 数据库 E-R 图
![招聘系统数据库 E-R 图：简历、候选人、职位、面试与内推相关表的关系](/images/blog/ddd-modeling-enterprise-office/recruitment-er-diagram.svg)

#### 3.3.3 数据库脚本
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

### 3.4 权限系统
#### 3.4.1 领域类图
<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/image-5.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/image-5.svg" alt="权限系统领域类图：角色、资源、用户与权限授权模型" /></a>

*图较宽，可点击在新窗口查看完整尺寸。*

#### 3.4.2 数据库 E-R 图
![权限系统数据库 E-R 图：角色、资源、用户与各类权限授权表的关系](/images/blog/ddd-modeling-enterprise-office/permission-er-diagram.svg)

#### 3.4.3 数据库脚本


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

### 3.5 工单系统
#### 3.5.1 领域类图
<a class="diagram-link" href="/images/blog/ddd-modeling-enterprise-office/image-6.svg" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="/images/blog/ddd-modeling-enterprise-office/image-6.svg" alt="工单系统领域类图：DBA 工单、运维工单与业务工单" /></a>

*图较宽，可点击在新窗口查看完整尺寸。*

#### 3.5.2 数据库 E-R 图
![工单系统数据库 E-R 图：DBA、业务、运维工单及域名、扩容、下线申请子表](/images/blog/ddd-modeling-enterprise-office/image-7.svg)

#### 3.5.3 数据库脚本
```sql
CREATE TABLE `dba_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`dba_biz_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT 'DBA工单编号',`order_type` varchar(60) NOT NULL DEFAULT  '' COMMENT 'DBA工单类型',`db_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '数据库名称',`rw_rate` varchar(60) NOT NULL DEFAULT  '' COMMENT '数据库读写比',`size` varchar(20) NOT NULL DEFAULT  '' COMMENT '数据库存储大小',`url` varchar(100) NOT NULL DEFAULT  '' COMMENT '工单附件地址',`content` varchar(3000) NOT NULL DEFAULT  '' COMMENT '工单内容',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '工单状态',`apply_reason` varchar(300) NOT NULL DEFAULT  '' COMMENT '申请原因',`biz_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '关联业务单号',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_dba_biz_order_code` (`dba_biz_order_code`), KEY `idx_create_user_id` (`create_user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = 'dba工单表';

CREATE TABLE `busniess_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`biz_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '业务工单编号',`biz_order_type` varchar(60) NOT NULL DEFAULT  '' COMMENT '业务工单类型',`content` varchar(300) NOT NULL DEFAULT  '' COMMENT '工单内容',`bus_line` varchar(30) NOT NULL DEFAULT  '' COMMENT '业务线',`url` varchar(100) NOT NULL DEFAULT  '' COMMENT '工单附件地址',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '工单状态',`apply_reason` varchar(300) NOT NULL DEFAULT  '' COMMENT '申请原因',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_biz_order_code` (`biz_order_code`), KEY `idx_create_user_id` (`create_user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '业务工单表';

CREATE TABLE `ops_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`ops_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单编号',`ops_order_type` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单类型',`url` varchar(50) NOT NULL DEFAULT  '' COMMENT '工单附件地址',`status` tinyint(4) NOT NULL DEFAULT  0 COMMENT '工单状态',`apply_reason` varchar(300) NOT NULL DEFAULT  '' COMMENT '申请原因',`date_create` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '创建时间',`date_update` timestamp NOT NULL DEFAULT  '2000-01-01 00:00:00' COMMENT '修改时间',`update_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '修改人',`create_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '创建人', PRIMARY KEY (`id`), KEY `idx_ops_order_code` (`ops_order_code`), KEY `idx_create_user_id` (`create_user_id`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '运维工单申请总表';

CREATE TABLE `ops_domain_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`ops_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单编号',`env_type` varchar(60) NOT NULL DEFAULT  '' COMMENT '环境类型',`service_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '关联服务名',`domain_url` varchar(60) NOT NULL DEFAULT  '' COMMENT '域名',`ip_content` varchar(200) NOT NULL DEFAULT  '' COMMENT 'IP地址列表', PRIMARY KEY (`id`), KEY `idx_ops_order_code` (`ops_order_code`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '服务域名申请表';

CREATE TABLE `infrast_config_order`(`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT  COMMENT ' 主键',`ops_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单编号',`op_type` tinyint(4) NOT NULL DEFAULT  0 COMMENT '扩容类型',`service_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '关联服务名',`ip_content` varchar(200) NOT NULL DEFAULT  '' COMMENT 'IP地址列表',`cpu_count` tinyint(4) NOT NULL DEFAULT  0 COMMENT 'cpu当前核数',`target_cpu_count` tinyint(4) NOT NULL DEFAULT  0 COMMENT 'cpu目标核数',`mem_size` tinyint(4) NOT NULL DEFAULT  0 COMMENT '内存当前大小(G)',`target_mem_size` tinyint(4) NOT NULL DEFAULT  0 COMMENT '内存目标大小(G)',`disk_size` tinyint(4) NOT NULL DEFAULT  0 COMMENT '磁盘当前大小(G)',`target_disk_size` tinyint(4) NOT NULL DEFAULT  0 COMMENT '磁盘目标大小(G)', PRIMARY KEY (`id`), KEY `idx_ops_order_code` (`ops_order_code`)) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '服务扩缩容申请表';

CREATE TABLE `clust_offline_order`(`ops_order_code` varchar(60) NOT NULL DEFAULT  '' COMMENT '工单编号',`service_name` varchar(60) NOT NULL DEFAULT  '' COMMENT '关联服务名',`ip_content` varchar(200) NOT NULL DEFAULT  '' COMMENT 'IP地址列表',`check_user_id` bigint(20) NOT NULL DEFAULT  0 COMMENT '工程效率校验人',`offline_domain` tinyint(4) NOT NULL DEFAULT  0 COMMENT '是否下线域名') ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '集群下线申请';


```

## 四、小结

这五个系统的重建过程有几点体会：

1. **先分上下文，再谈分层。** 权限系统最能说明问题：如果一开始就把「角色、资源、用户、授权」混在一个服务里，后面每加一种权限维度（菜单、按钮、字段、城市、部门）都要改核心逻辑；按上下文拆开之后，新增维度只是新增一个权限上下文。
2. **三张表的价值在「对齐」。** 实体表、行为表、能力表分别回答「有什么」「能做什么」「谁对外提供什么」，三张表之间存在对不上的地方，通常就是建模没想清楚的地方。
3. **E-R 图和领域类图不是一回事。** 前者表达存储结构，后者表达业务概念与行为。文中给同一系统画两张图，正是为了对照两者的差异；差异越大，越说明中间还缺一层转换（通常是聚合与工厂）。
4. **办公类系统的通用子域很多。** HR、用户中心、权限、工单在多数公司都是通用能力，适合用 DDD 的通用子领域模式单独沉淀，而不是每个业务系统各写一套。

## 相关阅读

- [三张表教你从 CRUD 过渡到 DDD](/blog/ddd-handbook/#三张表教你从crud过渡到ddd)：本篇三张表的用法说明（收录在《DDD 小册子》中）。
- [DDD 四色建模实战：社交关系建模](/blog/ddd-social-relationship-modeling/)：另一种建模方法的完整推演过程。
- [DDD 小册子：理论、架构、建模与实践](/blog/ddd-handbook/)：建模在 DDD 整体脉络中的位置。
