<template>
  <el-container class="login-container">
    <div class="site-title">
      <icon-svg iconClass="laoying" :vStyle="{width: '5em', height: '5em'}"></icon-svg>
      <p class="title">欢迎来到知识库协作式网站</p>
    </div>
    <el-card class="login-panel">
      <div slot="header">
        <h2 class="login-title">登录</h2>
      </div>
      <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="60px">
        <el-form-item label="账号" prop="userAccount" style="position:relative">
          <el-input type="text" v-model="loginForm.userAccount" @keyup.enter.native="goToPwdInput"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input type="password" v-model="loginForm.userPassword" @keyup.enter.native="onLogin" ref="pwd"></el-input>
        </el-form-item>
        <el-form-item label="记住密码" label-width="80px">
          <el-switch v-model="remember" @change="rememberMe"></el-switch>
        </el-form-item>
        <el-button type="primary" @click="onLogin()" :loading="loading">登录</el-button>
      </el-form>
    </el-card>
  </el-container>
</template>
<script>
  import { saveToLocal, loadFromLocal } from '@/utils/local-storage'
  import { mapActions } from 'vuex'
  /* eslint-disable*/
  import particles from 'particles.js'
  export default {
    data() {
      // pwd 验证
      const validatePwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入与密码'))
        }
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          userAccount: '',
          userPassword: ''
        },
        remember: false,
        loading: false,
        rules: {
          userAccount: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          userPassword: [
            { required: true, trigger: 'blur', validator: validatePwd }
          ]
        }
      }
    },
    created() {
      this.remember = loadFromLocal('rememberMe', false)
      // 初始化时读取localStorage用户信息,注意google有记住密码功能会覆盖当前获取到的密码
      if (this.remember) {
        this.loginForm.userAccount = loadFromLocal('username', '')
        this.loginForm.userPassword = loadFromLocal('password', '')
        console.error(this.loginForm.userPassword)
      } else {
        this.loginForm.userAccount = ''
        this.loginForm.userPassword = ''
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      rememberMe(val) {
        saveToLocal('rememberMe', val)
      },
      // 用户名输入框回车后切换到密码输入框
      goToPwdInput() {
        this.$refs.pwd.$el.getElementsByTagName('input')[0].focus()
      },
      // 登录操作
      onLogin() {
        this.$refs.pwd.$el.getElementsByTagName('input')[0].blur()
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.login(this.loginForm).then((res) => {
              // 保存账号
              if (this.remember) {
                saveToLocal('username', this.loginForm.userAccount)
                saveToLocal('password', this.loginForm.userPassword)
              } else {
                saveToLocal('username', '')
                saveToLocal('password', '')
              }
              this.$router.push({ path: '/home/homePage' })
            }, () => {
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  $dark_gray:#889aa4;
  .login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -200px;
    width: 400px;
    height: 350px;
    .site-title {
      position: absolute;
      top: -90px;
      left: 30px;
      display: flex;
      height: 60px;
      line-height: 80px;
      z-index: 9999;
      .title {
        font-size: 18px;
        font-weight: 700;
      }
    }
    .login-panel {
      width: 100%;
      height: 100%;
      background: #fff;
      .login-title {
        margin: 0;
        text-align: center;
      }
      .el-input /deep/ .el-input__inner {
        padding: 0px;
        text-indent: 12px;
      }
      /deep/ .el-form-item__label {
        color: black;
      }
      /deep/ .el-button--primary {
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
      }
      /deep/ .el-switch__core {
        border: 1px solid #DCDFE6;
        background: #DCDFE6;
        &:after {
          background-color: #FFF;
        }
      }
      .svg-container {
        position: absolute;
        top: 0;
        left: 5px;
        color: $dark_gray;
        &_user {
          font-size: 20px;
        }
        &_password {
          left: 7px;
          font-size: 16px;
        }
      }
      .el-button--primary {
        width: 100%;
      }
    }
  }
</style>
