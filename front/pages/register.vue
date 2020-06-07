<!--
 * @Author: SailorCai
 * @Date: 2020-06-03 08:29:27
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-06-05 07:43:19
 * @FilePath: /project-full/front/pages/register.vue
--> 
<template>
  <div class="login-container">
    <el-form class="login-form" :model="form" label-width="100px" :rules="rules" ref="registerForm">
      <div class="title-container">
        <img src="/logo.png" alt />
      </div>
      <el-form-item prop="email" class label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item prop="captcha" class="captcha-container" label="验证码">
        <div class="captcha">
          <img :src="code.captcha" @click="updateCaptcha" />
        </div>
        <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="nickname" class label="昵称">
        <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>

      <el-form-item prop="password" class label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="repassword" class label="确认密码">
        <el-input v-model="form.repassword" type="password" placeholder="请再次输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="repassword" class>
        <el-button type="primary" @click.native="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import md5 from 'md5'

export default {
  layout: "login",
  data() {
    return {
      form: {
        email: "1187023819@qq.com",
        nickname: "sailor",
        password: "123456",
        repassword: "123456",
        captcha: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱格式" }
        ],
        captcha: [{ required: true, message: "请输入验证码" }],
        nickname: [{ required: true, message: "请输入昵称" }],
        password: [
          {
            required: true,
            pattern: /^[\w_-]{6,12}$/g,
            message: "请输入6~12位密码"
          }
        ],
        repassword: [
          { required: true, message: "请再次输入密码" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("两次密码不一致"))
              }
              callback();
            },
          }
        ]
      },
      code: {
        captcha: "/api/captcha?_t=" + new Date().getTime()
      }
    };
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(async valid => {
        if(valid) {
          console.log('校验成功')
          // @todo 发送请求
          let obj = {
            email: this.form.email,
            nickname: this.form.nickname,
            password: md5(this.form.password),
            captcha: this.form.captcha,
          }
          let ret = await this.$http.post('/user/register', obj)
          // code =0就是成功
          if(ret.code ==0){
            this.$alert('注册成功', '成功', {
              confirmButton: '去登陆',
              callback: () => {
                this.$router.push('/login')
              }
            })
          }else{
            this.$message.error(ret.message)
          }
        }else{
          console.log('校验失败')
        }
      })
    },
    updateCaptcha() {
      this.code.captcha = "/api/captcha?_t=" + new Date().getTime();
    },
  }
};
</script>
<style lang="scss" scoped>
</style>