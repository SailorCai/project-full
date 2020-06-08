/*
 * @Author: SailorCai
 * @Date: 2020-05-07 08:38:59
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-06-06 17:15:28
 * @FilePath: /project-full/server/config/config.default.js
 */

/* eslint valid-jsdoc: "off" */

'use strict'
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588811696767_1505'

  config.multipart = {
    mode: 'file',
    whitelist: () => true,
  }
  config.UPLOAD_DIR = path.resolve(__dirname, '../app/public')

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false,
      },
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27018/kkbhub',
        options: {},
      },
    },
    jwt: {
      secret: '@Kaikeba!123Abc!:',
    },
  }
}
