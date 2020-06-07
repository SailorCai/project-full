
'use strict'
const { Service } = require('egg')
const nodemailer = require('nodemailer')

const userEmail = '32156805@qq.com'
const transporter = nodemailer.createTransport({
  service: 'QQ',
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: 'ruwvbjrhykvbcbah',
  },
})

class ToolService extends Service {
  async sendMail(email, subject, text, html) {
    const mailOptions = {
      from: userEmail,
      // 抄送人是自己，可以规避掉一些垃圾邮件
      cc: userEmail,
      to: email,
      subject,
      text,
      html,
    }

    try {
      await transporter.sendMail(mailOptions)
      return true
    } catch (err) {
      console.log('emall error', err)
      return false
    }
  }
}

module.exports = ToolService
