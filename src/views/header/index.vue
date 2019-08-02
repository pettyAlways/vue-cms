<template>
  <div class="header-logo">
    <div class="header-logo__main w1200">
      <div class="header-logo__main--left">
        <div class="header-logo__main--left__logo"></div>
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
            <div  @mouseenter="messageShow=true" @mouseleave="messageShow=false">
              <el-badge is-dot class="message" v-if="messageList && messageList.length">
                <i class="el-icon-message"></i>
              </el-badge>
              <i v-else class="el-icon-message message"></i>
            </div>
            <div class="message-panel" @mouseenter="messageShow=true" @mouseleave="messageShow=false" v-if="messageShow && (messageList || messageList.length)">
              <ul>
                <li @mouseenter="messageEnter(item)" @mouseleave="messageLeave(item)" v-for="(item, index) in messageList" :key="index">{{ item.message}}&nbsp;&nbsp;
                  <span style="color: #bfbfbf;font-size: 12px;">{{item.createTime}}</span>
                  <a  @click="readMessage(item)" style="color: dodgerblue" v-if="item.hover">设置已读</a>
                </li>
              </ul>
              <div class="tool-btn">
                <a @click="allMessageRead" style="color: dodgerblue">全部可读</a>
              </div>
            </div>
            <div class="user_image_panel">
              <el-image class="user_img" @mouseenter="upShow=true" @mouseleave="upShow=false"
                        :src="uInfo.avatarUrl ? uInfo.avatarUrl : require('./asserts/user.png')">
                <div slot="placeholder" class="image-slot">
                  <img :src="require('./asserts/user.png')" class="image-slot" />
                </div>
              </el-image>
              <div class="user-panel" @mouseenter="upShow=true" @mouseleave="upShow=false" v-if="upShow">
                <ul>
                  <li @click="goProfile(uInfo.userId)" style="margin-top: 5px;"><i class="el-icon-user"></i><a >我的主页</a></li>
                  <li v-if="uInfo.isAuthor" @click="goWorkbentch"><i class="el-icon-edit"></i><a>工作台</a></li>
                  <li v-else @click="beAuthor(uInfo.userId)"><i class="el-icon-edit"></i><a>成为作者</a></li>
                  <li @click="signOut"><i class="el-icon-switch-button"></i><a>退出</a></li>
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
  import { mapGetters, mapActions } from 'vuex'
  import { clientVisiable } from '../../utils/compatibility'
  import { retrieveMessageList, messageRead, messageAllRead } from '../../api/message'

  export default {
    name: 'headerNav',
    data() {
      return {
        thirdPartyHtml: '',
        gitHubUrl: 'https://github.com/login/oauth/authorize?client_id=47fca5d6cdbf13ae8984',
        width: '',
        height: '',
        upShow: false,
        messageShow: false,
        messageList: []
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
      this.init()
    },
    methods: {
      ...mapActions([
        'retrieveUserInfo',
        'userLogin',
        'loginOut'
      ]),
      init() {
        let data = clientVisiable()
        this.width = data.width
        this.height = data.height
        this.upShow = false
        this.getMessage()
      },
      getMessage() {
        retrieveMessageList().then(res => {
          if (res.flag) {
            this.messageList = res.data
          }
        })
      },
      readMessage(item) {
        messageRead({ messageId: item.messageId }).then(res => {
          if (res.flag) {
            this.init()
          }
        })
      },
      allMessageRead() {
        messageAllRead().then(res => {
          if (res.flag) {
            this.init()
          }
        })
      },
      messageEnter(item) {
        this.$set(item, 'hover', true)
      },
      messageLeave(item) {
        item.hover = false
      },
      login() {
        this.$router.push({ name: 'login' })
      },
      goProfile(userId) {
        this.$router.push({ name: 'profile', params: { userId: userId } })
      },
      beAuthor(userId) {
        this.$router.push({ name: 'beAuthor', params: { userId: userId } })
      },
      goWorkbentch() {
        window.open('http://localhost:8082/#/platform/blog')
      },
      signOut() {
        this.loginOut().then(() => {
          this.$router.push({ path: '/index' })
        })
      },
      thirdParty() {
        window.open(this.gitHubUrl, 'newwindow', `height=300, width=300, top=${this.height / 2 - 150}, left=${this.width / 2 - 150}, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no`)
        window.addEventListener('message', e => {
          console.error('接收到的第三方登录token:' + e.data)
          if (/^ThirdPartyLogin-(\w*)-(\w*)/.test(e.data)) {
            let username = RegExp.$1
            let password = RegExp.$2
            this.userLogin({ username: username, password: password, thirdparty: 'Y' }).then(() => {
              this.retrieveUserInfo()
              this.init()
            })
          }
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
        width: 300px;
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
            width: 300px;
            .user_image_panel {
              width: 50px;
              flex-shrink: 0;
              .user_img {
                width: 30px;
                height: 30px;
                text-align: center;
                border-radius: 50%;
              }
              .user-panel {
                position: absolute;
                right: 123px;
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
            .nickname {
              display: block;
              width: 200px;
              flex-grow: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .message {
              width: 25px;
              height: 28px;
              line-height: 28px;
              font-size: 25px;
              cursor: pointer;
            }
            .message-panel {
              display: flex;
              flex-direction: column;
              position: absolute;
              right: 205px;
              top: 90px;
              z-index: 10;
              &:after {
                position: absolute;
                top: -15px;
                left: 259px;
                content: '';
                width: 0;
                height: 0;
                border: 8px solid;
                border-color: transparent transparent #ffffff transparent;
              }
              .tool-btn {
                height: 40px;
                background-color: gainsboro;
                line-height: 40px;
              }
              ul {
                display: flex;
                flex-direction: column;
                align-items: start;
                list-style: none;
                background-color: #ffffff;
                width: 300px;
                max-height: 280px;
                overflow-y: scroll;
                li {
                  width: 100%;
                  text-align: start;
                  color: #666;
                  font-size: 13px;
                  padding: 8px 15px;
                  border-bottom: 1px solid #F3F3F3;
                  line-height: 1.5;
                  i {
                    margin-right: 5px;
                  }
                  &:hover {
                    background-color: #fcf8e3;
                }
                }
              }
            }
          }
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 5px;//y轴上的滚动条宽度
    height: 5px;//x轴上滚动条高度
  }
  ::-webkit-scrollbar-track {
    border-radius: 3px; /*滚动条的背景区域的圆角*/
    background-color: #fdf8f5; /*滚动条的背景颜色*/
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px; /*滚动条的圆角*/
    background-color: #ccc; /*滚动条的背景颜色*/
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(46, 86, 159);
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: rgb(46, 86, 159);
    cursor: pointer;
  }
</style>
