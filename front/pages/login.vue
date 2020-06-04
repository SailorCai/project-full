<template>
  <div>
    <el-form class="login-form" :rules="rules">
      <el-form-item props="email">
        <span>
          <i class="el-icon-mobile"></i>
        </span>
        <el-input type="text" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item props="password">
        <span>
          <i class="el-icon-lock"></i>
        </span>
        <el-input type="text" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item props="captcha">
        <el-input type="text" placeholder="验证码"></el-input>
        <img @click="updateCaptcha" :src="captchaUrl" alt="">
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  layout: 'login',
  name: "component_name",
  data() {
    return {
      rules: [],
      captchaUrl: "/api/captcha?_t="+ new Date().getTime(),
    }
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = "/api/captcha?_t="+ new Date().getTime()
    }
  }
};
</script>
<style lang="stylus" scoped>
.login-form{
  width: 800px;
  margin: 50px auto;
}
</style>