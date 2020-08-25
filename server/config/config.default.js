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

  // miniapp
  config.miniapp = {
    appId: 'wx86068c51a0c05795',
    appSecret: 'a7ebf2ac65aea85a88661caa9e5ba0a8',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
