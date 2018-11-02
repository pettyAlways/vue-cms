<template>
  <el-menu
    class="navbar"
    mode="horizontal"
    @select="switchMenu"
    text-color="#fff"
    :default-active="curConfigure"
    active-text-color="#00b4aa">
    <div :class="[isCollapse ? 'hide-navbar-header' : '', 'navbar-header']">
      <icon-svg iconClass="logo" class="site-logo"></icon-svg>
      <router-link to="/home" v-if="!isCollapse"><div index="1">{{$t('navbar.title')}}</div></router-link>
    </div>
    <el-menu-item index="HomePage"><i class="el-icon-setting"></i>首页</el-menu-item>
    <!--模块权限管理 -->
    <el-menu-item v-for="item in moduleList" :index="item.index"><i :class="item.icon"></i>{{item.name}}</el-menu-item>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        <div class="username-wrapper">
          <span class="user-name">{{name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/user/profile">
          <el-dropdown-item>
            个人中心
          </el-dropdown-item>
        </router-link>
        <router-link class='inlineBlock' to="/user/profile">
          <el-dropdown-item>
            修改头像
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item @click.native="logout">
          <span style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'curActive',
        'curConfigure',
        'defaultPage',
        'permissions',
        'isCollapse',
        'moduleList'
      ])
    },
    methods: {
      ...mapActions({
        userLogout: 'logout',
        switchConfigureMenu: 'switchConfigureMenu',
        resolveDefaultPage: 'resolveDefaultPage'
      }),
      switchMenu(key) {
        if (key === 'HomePage') {
          this.$router.push('/home')
          return
        }
        // 通过vuex管理导航栏功能切换
        this.switchConfigureMenu(key)
        // 切换导航配置功能菜单时重新刷新页面
        this.resolveDefaultPage({permissions: this.permissions[this.curConfigure], alias: this.curConfigure})
        let curActiveTab = this.curActive[key] || (key === 'HomePage' ? '/home' : this.defaultPage[this.curConfigure])
        curActiveTab = curActiveTab || '/home'
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
  .navbar {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    position: fixed;
    width: 100%;
    z-index: 10;
    background: {
      image: -webkit-gradient(linear, left top, right top, from(#1278f6), to(#00b4aa));
      image: -webkit-linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
      image: -moz-linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
      image: linear-gradient(45deg,#1278f6,#00b4aa 50%, #1278f6);
    }
    .navbar-header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
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
    .hide-navbar-header {
      justify-content: center ;
      transition: width .3s;
      border-right: 1px solid rgba(grey, .8);
      width: 64px;
      .site-logo {
        width: 3em;
        height: 3em;
      }
    }
    .site-title {
      float: left;
      height: 60px;
      line-height: 60px;
      margin: 0;
      margin-left: 15px;
      cursor: pointer;
      position: relative;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #fff;
    }
  }
  .navbar /deep/ .el-menu-item {
    margin: 0px 1px;
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
  .navbar /deep/ .screenfull {
    position: absolute;
    top: 20px;
    right: 190px;
  }
  .right-menu-item {
    position: absolute;
    top: 20px;
    right: 150px;
    color: #fff;
  }
  .avatar-container {
    position: absolute;
    top: 15px;
    right: 40px;
    color: #fff;
    .avatar-wrapper {
      cursor: pointer;
      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .username-wrapper {
        display: inline-block;
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
