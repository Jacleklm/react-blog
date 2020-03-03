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
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578294262787_865';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'tt19960117',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // 跨域相关
  config.security = {
    csrf: { enable: false },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: ctx => ctx.get('origin'), // 只允许这个域进行访问接口, 可以是 'http://localhost:3000' 或 '*'，只能是单个
    credentials: true, // 允许Cook可以跨域
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS',
  };
  // 一个设置白名单的插件，如果觉得不好可以不用。会覆盖 cors 配置项的配置
  // config.origin = {
  //   whiteList: [ 'http://localhost:3000', 'http://localhost:3001' ],
  //   credentials: true, // 允许Cook可以跨域
  //   allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS',
  // };

  return {
    ...config,
    ...userConfig,
  };
};
