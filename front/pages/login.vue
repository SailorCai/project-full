<!--
 * @Author: SailorCai
 * @Date: 2020-06-03 08:29:27
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-06-05 07:43:19
 * @FilePath: /project-full/front/pages/register.vue
--> 
<template>
  <div class="login-container">
    <el-form class="login-form" :model="form" label-width="100px" :rules="rules" ref="loginForm">
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

      <el-form-item prop="emailcode" class="captcha-container" label="验证码">
        <div class="captcha">
          <el-button @click="sendEmailcode" type="primary" :disabled="this.send.timer>0">{{sendText}}</el-button>
        </div>
        <el-input v-model="form.emailcode" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="password" class label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="repassword" class>
        <el-button type="primary" @click.native="handleLogin">登录</el-button>
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
      send: {
        timer: 0
      },
      form: {
        email: "1187023819@qq.com",
        password: "123456",
        captcha: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱格式" }
        ],
        captcha: [{ required: true, message: "请输入验证码" }],
        emailcode: [{ required: true, message: "请输入邮箱验证码" }],
        password: [
          {
            required: true,
            pattern: /^[\w_-]{6,12}$/g,
            message: "请输入6~12位密码"
          }
        ],
      },
      code: {
        captcha: "/api/captcha?_t=" + new Date().getTime()
      }
    };
  },
  computed: {
    sendText() {
      return this.send.timer <= 0 ? '发送验证码' : `${this.send.timer}s后发送`
    }
  },
  methods: {
    async sendEmailcode() {
      // @todo
      await this.$http.get('/sendcode?email='+this.form.email)
      this.send.timer = 10
      this.timer = setInterval(() => {
        this.send.timer -= 1
        if(this.send.timer === 0){
          clearInterval(this.timer)
        }
      }, 1000)
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if(valid) {
          console.log('校验成功')
          // @todo 发送请求
          let obj = {
            email: this.form.email,
            password: md5(this.form.password),
            captcha: this.form.captcha,
            emailcode: this.form.emailcode
          }
          let ret = await this.$http.post('/user/login', obj)
          // code =0就是成功
          if(ret.code ==0){
            // token的存储 登陆成功， 返回token
            this.$message.success(ret.message || '登录成功')
            localStorage.setItem('token', ret.data.token)
            setTimeout(() => {
              this.$router.push('/')
            }, 500)
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