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
        <el-form-item label="账号" prop="username" style="position:relative">
          <el-input type="text" v-model="loginForm.username" @keyup.enter.native="goToPwdInput"></el-input>
          <span class="svg-container svg-container_user">

          </span>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" @keyup.enter.native="onLogin" ref="pwd"></el-input>
          <span class="svg-container svg-container_password">
            <icon-svg icon-class="password" />
          </span>
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
          username: '',
          password: ''
        },
        remember: false,
        loading: false,
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePwd }
          ]
        }
      }
    },
    created() {
      this.remember = loadFromLocal('rememberMe', false)
      // 初始化时读取localStorage用户信息,注意google有记住密码功能会覆盖当前获取到的密码
      if (this.remember) {
        this.loginForm.username = loadFromLocal('username', '')
        this.loginForm.password = loadFromLocal('password', '')
      } else {
        this.loginForm.username = ''
        this.loginForm.password = ''
      }
    },
    methods: {
      ...mapActions([
        'userLogin'
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
            this.userLogin(this.loginForm).then(() => {
              // 保存账号
              if (this.remember) {
                saveToLocal('username', this.loginForm.username)
                saveToLocal('password', this.loginForm.password)
              } else {
                saveToLocal('username', '')
                saveToLocal('password', '')
              }
              this.$router.push({ path: '/index' })
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
    },
    mounted() {
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
      background: #f9f9f9;
      .login-title {
        margin: 0;
        text-align: center;
      }
      .el-input /deep/ .el-input__inner {
        text-indent: 12px;
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
