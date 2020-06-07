/*
 * @Author: SailorCai
 * @Date: 2020-06-06 16:26:42
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-06-06 16:26:55
 * @FilePath: /project-full/server/app/controller/base.js
 */
'use strict'
// 定制规范
const { Controller } = require('egg')
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    }
  }
  message(message) {
    this.ctx.body = {
      code: 0,
      message,
    }
  }
  error(message, code = -1, errors = {}) {
    this.ctx.body = {
      code,
      message,
      errors,
    }
  }
}

module.exports = BaseController
