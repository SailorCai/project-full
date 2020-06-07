/*
 * @Author: SailorCai
 * @Date: 2020-06-06 17:35:48
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-06-06 17:38:21
 * @FilePath: /project-full/server/app/model/user.js
 */

'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    __v: { type: Number, select: false },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    nickname: { type: String, required: true },
    avatar: { type: String, required: false, default: '/user.png' },
  }, { timestamps: true })
  return mongoose.model('User', UserSchema)
}
