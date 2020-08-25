# icejs-todos-react

## 介绍

`icejs` `todos` 后台管理系统。

## 功能

- 账户登录/登出 默认管理员用户名：`user` 密码: `password`
- 用户列表
- TODO 列表及增删改查

## 快速启动

> 更多内容参考 [icejs](https://ice.work/docs/guide/about).

```bash
# 安装依赖
$ npm install

# 启动服务
$ npm start  # visit http://localhost:3333
```

## 目录结构

```md
.
├── .ice                    # ice.js 运行时临时生成目录
├── public
│   ├── favicon.png         # favicon
│   └── index.html          # 应用入口 HTML 模板
├── src                     # 源码目录
│   ├── components          # 自定义组件
│   ├── layouts             # 布局组件
│   ├── locales             # 语言包
│   ├── models              # 应用级数据
│   ├── pages               # 页面
│   ├── services            # 数据请求
│   ├── utils               # 工具函数
│   ├── app.jsx             # 应用入口
│   ├── global.scss         # 全局样式
│   └── routes.js           # 路由配置文件
├── .editorconfig
├── .eslintcache
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc.js
├── .stylelintignore
├── .stylelintrc.js
├── README.md
├── build.json              # 工程配置
├── jsconfig.json
├── package-lock.json
├── package.json
└── tsconfig.json
```
