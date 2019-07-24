<template>
  <div class="header-logo">
    <div class="header-logo__main w1200">
      <div class="header-logo__main--left">
        <div class="header-logo__main--left__logo"></div>
        <div class="header-logo__main--left__text">
          记录走过的点点滴滴
        </div>
        <div class="header-logo__main--left__search">
          <input type="search" id="text-input" placeholder="全文搜索"/>
          <input type="submit" id="search" value="搜索"/>
        </div>
      </div>
      <div class="header-logo__main--right">
        <ul>
          <li v-if="!uInfo.userId" class="login-way" style="cursor: pointer">
            <span>登录方式</span>
            <a title="使用github登录" @click="thirdParty"><icon-svg iconClass="gitHub" :vStyle="{width: '2em', height: '2em'}"></icon-svg></a>
            <a title="本站登录" @click="login" style="margin-top: -5px;"><icon-svg iconClass="laoying" :vStyle="{width: '2.5em', height: '2.5em'}"></icon-svg></a>
          </li>
          <li v-else class="user_info">
            <span class="nickname">欢迎{{uInfo.userName}}大驾光临</span>
            <div class="user_image_panel">
              <el-image class="user_img" @mouseenter="upShow=true" @mouseleave="upShow=false"
                        :src="uInfo.avatarUrl ? uInfo.avatarUrl : require('./asserts/user.png')">
                <div slot="placeholder" class="image-slot">
                  <img :src="require('./asserts/user.png')" class="image-slot" />
                </div>
              </el-image>
              <div class="user-panel" @mouseenter="upShow=true" @mouseleave="upShow=false" v-if="upShow">
                <ul>
                  <li><i class="el-icon-user"></i><a @click="goProfile(uInfo.userId)">我的主页</a></li>
                  <li><i class="el-icon-edit"></i><a>工作台</a></li>
                  <li><i class="el-icon-switch-button"></i><a @click="signOut">退出</a></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { setToken } from '../../utils/auth'
  import { mapGetters, mapActions } from 'vuex'
  import { clientVisiable } from '../../utils/compatibility'

  export default {
    name: 'headerNav',
    data() {
      return {
        thirdPartyHtml: '',
        gitHubUrl: 'https://github.com/login/oauth/authorize?client_id=47fca5d6cdbf13ae8984',
        width: '',
        height: '',
        upShow: false
      }
    },
    computed: {
      ...mapGetters([
        'userShow'
      ]),
      uInfo() {
        return this.userShow
      }
    },
    mounted() {
      let data = clientVisiable()
      this.width = data.width
      this.height = data.height
    },
    methods: {
      ...mapActions([
        'retrieveUserInfo',
        'loginOut'
      ]),
      login() {
        this.$router.push({ name: 'login' })
      },
      goProfile(userId) {
        this.$router.push({ name: 'profile', params: { userId: userId } })
      },
      signOut() {
        this.loginOut()
      },
      thirdParty() {
        window.open(this.gitHubUrl, `newwindow', 'height=300, width=300, top=${this.height / 2}, left=${this.width / 2}, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no`)
        window.addEventListener('message', function (e) {
          setToken(e.data)
          this.retrieveUserInfo()
        }, false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-logo {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    z-index: 4;
    &__main {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: url("./asserts/header-bg.jpg");
      background-size: cover;
      &--left {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-grow: 1;
        &__logo {
          height: 46px;
          width: 200px;
          background: url("./asserts/logo.png");
        }
        &__text {
          height: 60px;
          line-height: 60px;
          font-size: 14px;
          text-align: center;
        }
        &__search {
          margin-left: 30px;
          input#text-input {
            height: 30px;
            width: 300px;
            padding: 8px 6px;
            border: 1px solid darkgray;
            box-sizing: border-box;
            font-size: 12px;
            &:focus {
              outline:none;
              border: 1px solid gray;
            }
          }
          input#search {
            width: 50px;
            height: 30px;
            padding: 6px 10px;
            border: 1px solid darkgray;
            background: #f8f8f8;
            border-radius: 2px;
            color: #555;
            font-size: 12px;
            cursor: pointer;
            overflow: visible;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
            margin-left: 5px;
            &:focus {
              outline:none;
              border: 1px solid gray;
            }
          }

        }
      }
      &--right {
        flex-shrink: 0;
        width: 237px;
        ul {
          display: flex;
          flex-direction: row;
          justify-content: end;
          list-style: none;
          padding: 0px;
          li {
            text-align: center;
          }
          .login-way {
            display: flex;
            align-items: center;
            height: 40px;
            span {
              margin-right: 15px;
            }
            a {
              margin-right: 15px;
            }
          }
          .user_info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 200px;
            .user_image_panel {
              .user_img {
                width: 30px;
                height: 30px;
                text-align: center;
                border-radius: 50%;
              }
              .user-panel {
                position: absolute;
                right: 140px;
                top: 98px;
                z-index: 10;
                width: 120px;
                border-radius: 15px;
                &:after {
                  position: absolute;
                  top: -15px;
                  left: 48px;
                  content: '';
                  width: 0;
                  height: 0;
                  border: 8px solid;
                  border-color: transparent transparent #ffffff transparent;
                }
                ul {
                  display: flex;
                  flex-direction: column;
                  align-items: start;
                  list-style: none;
                  padding: 0px 20px 0px;
                  background-color: #ffffff;
                  li {
                    text-align: center;
                    cursor: pointer;
                    padding: 6px 0px;
                    i {
                      margin-right: 5px;
                    }
                    &:hover {
                      color: dodgerblue;
                    }
                  }
                }
              }
            }

          }
        }
      }
    }

  }
</style>
