<template>
  <div class="navbar-container">
    <el-menu
      class="navbar-container__menu"
      mode="horizontal"
      @select="switchMenu"
      text-color="#fff"
      :default-active="curConfigure"
      active-text-color="#00b4aa">
      <div :class="[isCollapse ? 'navbar-container__header--hide' : '', 'navbar-container__header']">
        <icon-svg iconClass="logo" class="site-logo"></icon-svg>
        <router-link to="/home" v-if="!isCollapse"><div index="1">{{sysParam.system_title}}</div></router-link>
      </div>
      <div class="navbar-container__navigation">
        <el-menu-item index="HomePage"><i class="el-icon-setting"></i>首页</el-menu-item>
        <!--模块权限管理 -->
        <el-menu-item v-for="(item, index) in moduleList" :key="index" :index="item.index">
          <icon-svg v-if="item.icon" :iconClass="item.icon"></icon-svg>
          <span>{{item.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
    <div class="navbar-container__information">
      <div class="information-common">
        <span>当前时间:{{currentTime}}</span>
        <router-link to="/user/profile">个人中心</router-link>
        <a @click="logout">退出登录</a>
        <el-dropdown class="theme" @command="switchTheme">
          <span class="el-dropdown-link">
            切换主题<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="theme_sky_sea">厚实羊</el-dropdown-item>
            <el-dropdown-item command="theme_love_sense">少女心</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="information-function">
        <img class="user-avatar" :src="avatar">
        <span class="user-name">{{currentUser.userName}}</span>
      </div>
    </div>
  </div>

</template>
<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import { sysParams } from '../../api/system'
  import { formatDate } from '../../utils/dateUtil'
  export default {
    name: 'NavBar',
    data() {
      return {
        sysParam: '',
        avatar: require('../../assets/guitar.gif'),
        currentTime: ''
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'curActive',
        'curConfigure',
        'defaultPage',
        'permissions',
        'isCollapse',
        'moduleList',
        'currentUser'
      ])
    },
    created() {
      this.initParam()
      this.timer = setInterval(() => {
        this.currentTime = formatDate(new Date())
      }, 1000)
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      ...mapMutations([
        'SET_SYS_PARAM'
      ]),
      ...mapActions({
        userLogout: 'logout',
        switchConfigureMenu: 'switchConfigureMenu',
        resolveDefaultPage: 'resolveDefaultPage'
      }),
      switchTheme(theme) {
        var head = document.getElementsByTagName('head')[0]
        var link = document.createElement('link')
        link.href = `static/css/${theme}.css`
        link.rel = 'stylesheet'
        link.type = 'text/css'
        head.appendChild(link)
      },
      initParam() {
        sysParams().then(res => {
          if (res.flag) {
            this.sysParam = res.data
            this.SET_SYS_PARAM(this.sysParam)
          }
        })
      },
      switchMenu(key) {
        if (key === 'HomePage') {
          this.$router.push('/home/homePage')
          return
        }
        // 通过vuex管理导航栏功能切换
        this.switchConfigureMenu(key)
        // 切换导航配置功能菜单时重新刷新页面
        let curActiveTab = this.curActive[key] || (key === 'HomePage' ? '/home/homePage' : this.defaultPage[this.curConfigure])
        curActiveTab = curActiveTab || '/home/homePage'
        this.$router.push(curActiveTab)
      },
      logout() {
        this.userLogout().then(() => {
          // 为了重新实例化vue-router对象 避免bug
          location.reload()
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .navbar-container {
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    z-index: 10;
    border-bottom: solid 1px #e6e6e6;
    /deep/ .el-menu.el-menu--horizontal {
      border-bottom: 0px;
    }
    .navbar-container__menu {
      display: flex;
      flex-flow: row nowrap;
      .navbar-container__header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        font-size: 18px;
        width: 200px;
        height: 60px;
        color: white;
        &-switch {
          margin-right: 15px;
          .svg-icon {
            width: 1.5em;
            height: 1.5em;
          }
        }
        .site-logo {
          width: 2em;
          height: 2em;
        }
      }
      .navbar-container__header--hide {
        justify-content: center ;
        transition: width .3s;
        border-right: 1px solid rgba(grey, .8);
        width: 90px;
        font-size: 18px;
        .site-logo {
          width: 3em;
          height: 3em;
        }
      }
      .navbar-container__navigation {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        font-size: 16px;
        /deep/ .el-menu-item {
          margin: 0px 1px;
          height: 100%;
          &.is-active {
            background: cornsilk;
          }
          border-bottom: none;
          &:hover {
            background-color: cornsilk;
            color: #00b4aa !important;
          }
          &:focus {
            background-color: cornsilk;
          }
        }
      }
    }
  }
  .navbar-container__information {
    margin-right: 15px;
      color: #fff;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    font-size: 14px;
    .information-common {
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      font-size: 13px;
    }
    .information-function {
      display: flex;
      flex-direction: row;
      align-items: center;
      .user-avatar {
        height: 25px;
        border-radius: 50%;
      }
      .theme {
        margin-left: 5px;
      }
    }
  }
</style>
