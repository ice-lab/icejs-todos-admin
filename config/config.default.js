/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597805565158_9957';

  // add your middleware config here
  config.middleware = [];

  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'litemall',
      // 密码
      password: 'litemall123456',
      // 数据库名
      database: 'litemall',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'icejs_todos',
    password: 'icejs_todos',
    database: 'icejs_todos',
    define: {
      freezeTableName: true,
    },
  };

  // disable csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // session
  const authKey = 'icejs-todos';
  config.session = {
    key: authKey,
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  // session auth key
  config.authKey = authKey;

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
