<template>
  <el-container class="login-container">
    <el-card>
      <div slot="header">
        <h2 class="login-title">{{$t('login.title')}}</h2>
      </div>
      <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="60px">
        <el-form-item :label="$t('login.account')" prop="userAccount" style="position:relative">
          <el-input type="text" v-model="loginForm.userAccount" @keyup.enter.native="goToPwdInput"></el-input>
          <span class="svg-container svg-container_user">
            <icon-svg icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="userPassword">
          <el-input type="password" v-model="loginForm.userPassword" @keyup.enter.native="onLogin" ref="pwd"></el-input>
          <span class="svg-container svg-container_password">
            <icon-svg icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('login.remember')" label-width="80px">
          <el-switch v-model="remember" @change="rememberMe"></el-switch>
        </el-form-item>
        <el-button type="primary" @click="onLogin('loginForm')" :loading="loading">{{$t('login.login')}}</el-button>
      </el-form>
    </el-card>
    <!-- particles.js container -->
    <div id="particles"></div>
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
    },
    mounted() {
      particlesJS('particles', {
        "particles": {
          "number": {
            "value": 15
          },
          "color": {
            "value": "random"
          },
          "shape": {
            "type": ["star", "image"],
            "stroke": {
              "width": 0,
              "color": "yellow"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "https://neveryu.github.io/avatar/avatar.png",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 1,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 10,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 10,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ccc",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "random",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          // "detect_on": "canvas",
          "detect_on": "window",
          "events": {
            "onhover": {
              "enable": false,
              // "mode": "repulse"
              "mode": "grab"
            },
            "onclick": {
              "enable": false,
              "mode": "repulse"
              // "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        }
      })
      this.$notify({
        title: '账号：yangweixian',
        dangerouslyUseHTMLString: true,
        message: '<strong>密码：<i>123456</i></strong>',
        type: 'success',
        position: 'bottom-left'
      })
      this.$notify({
        title: '账号：yingzuidou',
        dangerouslyUseHTMLString: true,
        message: '<strong>密码：<i>123456</i></strong>',
        type: 'success',
        position: 'bottom-left',
        offset: 80
      })
    }
  }
</script>
<style scoped lang="scss">
  $dark_gray:#889aa4;
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: mix(#494166, #424b50);
    .el-card {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -220px 0 0 -200px;
      width: 400px;
      height: 350px;
      background: #d7ecf1;
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
  #particles {
    width: 100%;
    height: 100%;
    /*background-color: #b61924;*/
    /*background-color: #23ae88;*/
    background-color: #39c;
    background-image: url('');
    /*background-image: url('../img/bg_particles.png');*/
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
</style>
