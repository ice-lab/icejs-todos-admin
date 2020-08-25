# icejs-todos-server

## 基本介绍

`icejs` `todos` 服务端。基于 [`eggjs`](https://eggjs.org/)。

### 功能

- 账户登录/登出
- 用户列表
- TODO 列表及增删改查

## 前序准备

### 软件环境

- [`Node.js`](https://nodejs.org/)
- [`MySQL`](https://www.mysql.com/)
- [`Git`](https://git-scm.com/)

### 数据

建立数据库，及导入数据. 分别导入 [./config/db/sql](./config/db/sql) 中的文件。

```txt
config/db/sql
├── README.md
├── icejs_todos_data.sql
├── icejs_todos_schema.sql
└── icejs_todos_table.sql
```

## 快速启动

> 更多内容参考 [eggjs](https://eggjs.org/)

### 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```
