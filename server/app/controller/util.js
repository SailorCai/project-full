/*
 * @Author: SailorCai
 * @Date: 2020-05-07 08:38:59
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-28 08:21:49
 * @FilePath: /project-full/server/app/controller/home.js
 */
'use strict'
const svgCaptcha = require('svg-captcha')
const fse = require('fs-extra')
const BaseController = require('./base')

class UtilController extends BaseController {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 3,
    })
    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
  async uploadfile() {
    const { ctx } = this
    const file = ctx.request.files[0]
    const { name } = ctx.request.body
    console.log(name, file)

    // file.filepath 是什么东西，为啥直接move就能保存前端穿过来的图片？
    console.log('file.filepath', file.filepath)
    console.log('this.config.UPLOAD_DIR', this.config.UPLOAD_DIR)
    await fse.move(file.filepath, this.config.UPLOAD_DIR + '/' + file.filename)

    this.success({
      url: `/public/${file.filename}`,
    })
    /* this.success({
      url: 'xxx',
    }) */
  }
  async sendcode() {
    const { ctx } = this
    const email = ctx.query.email
    const code = Math.random().toString().slice(2, 6)
    console.log('邮箱' + email + ' 验证码：' + code)
    ctx.session.emailcode = code

    const subject = '开课吧验证码'
    const text = ''
    const html = `<h2>小开社区</h2><a href="https://kaikeba.com"><span>${code}</span></a>`
    const hasSend = await this.service.tools.sendMail(email, subject, text, html)
    if (hasSend) {
      this.message('发送成功')
    } else {
      this.message('发送失败')
    }
  }
}

module.exports = UtilController
