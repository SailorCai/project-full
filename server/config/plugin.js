/*
 * @Author: SailorCai
 * @Date: 2020-05-07 08:38:59
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-06-06 17:10:18
 * @FilePath: /project-full/server/config/plugin.js
 */
'use strict'

// /** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// }

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}
exports.routerGroup = {
  enable: true,
  package: 'egg-router-group',
}
exports.validate = {
  enable: true,
  package: 'egg-validate',
}
