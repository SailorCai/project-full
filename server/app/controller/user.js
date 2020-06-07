/*
 * @Author: SailorCai
 * @Date: 2020-06-06 16:31:46
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-06-06 16:53:20
 * @FilePath: /project-full/server/app/controller/user.js
 */

'use strict'

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const BaseController = require('./base')
const HashSalt = ':kaikeba@good!@123'

const createRule = {
  email: { type: 'email' },
  nickname: { type: 'string' },
  password: { type: 'string' },
  captcha: { type: 'string' },
}

class UserController extends BaseController {
  async login() {
    // this.success('token')
    const { ctx, app } = this
    const { email, password, captcha, emailcode } = ctx.request.body
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误')
    }
    if (emailcode !== ctx.session.emailcode) {
      return this.error('邮箱验证码错误')
    }
    const user = await ctx.model.User.findOne({
      email,
      password: md5(password + HashSalt),
    })
    if (!user) {
      this.error('用户名密码错误')
    }
    const token = jwt.sign({
      email,
      _id: user._id,
    }, app.config.jwt.secret, {
      expiresIn: '1h',
    })
    this.success({ token, email, nickname: user.nickname })
  }

  async register() {
    const { ctx } = this
    try {
      // 校验传递的参数
      ctx.validate(createRule)
    } catch (e) {
      return this.error('参数校验失败', -1, e.errors)
    }

    const { email, password, captcha, nickname } = ctx.request.body
    console.log({ email, password, captcha, nickname })
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误')
    }
    if (await this.checkEmail(email)) {
      this.error('邮箱重复啦')
    } else {
      const ret = await ctx.model.User.create({
        email,
        nickname,
        password: md5(password + HashSalt),
      })
      if (ret._id) {
        this.message('注册成功')
      }
    }

    // this.success({ name: 'kkb' })
  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email })
    return user
  }
  async verify() {
    // 检验用户名是否存在
  }
  async info() {
    const { ctx } = this
    // 你还不知道是哪个邮件 需要从token去读取
    // 有的接口需要从token里读数据，有的不需要
    const { email } = ctx.state
    const user = await this.checkEmail(email)
    this.success(user)
  }
}

module.exports = UserController
