<template>
  <el-menu
    class="navbar"
    mode="horizontal"
    @select="switchMenu"
    text-color="#fff"
    default-active="SysConfigure"
    active-text-color="#00b4aa">
    <router-link to="/home">
      <div class="site-title" index="1">{{$t('navbar.title')}}</div>
    </router-link>
    <el-menu-item style="margin-left: 88px" index="SysConfigure"><i class="el-icon-setting"></i>系统配置</el-menu-item>
    <el-menu-item index="SysService"><i class="el-icon-service"></i>服务配置</el-menu-item>
    <el-menu-item index="SysProfile"><i class="el-icon-message"></i>工具集成</el-menu-item>
    <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
      <screenfull class="screenfull right-menu-item"></screenfull>
    </el-tooltip>
    <lang-select class="right-menu-item"></lang-select>

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
        <!-- <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
          <el-dropdown-item>
            项目地址
          </el-dropdown-item>
        </a> -->
        <el-dropdown-item @click.native="logout">
          <span style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import LangSelect from '@/components/langselect'
  import Screenfull from '@/components/screenfull'
  export default {
    name: '',
    components: {
      LangSelect,
      Screenfull
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'curActive'
      ])
    },
    methods: {
      ...mapActions({
        userLogout: 'logout',
        switchConfigureMenu: 'switchConfigureMenu'
      }),
      switchMenu(key) {
        // 通过vuex管理导航栏功能切换
        this.switchConfigureMenu(key)
        // 切换导航配置功能菜单时重新刷新页面
        let curActiveTab = this.curActive[key] || '/home'
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
    position: fixed;
    width: 100%;
    z-index: 10;
    background: {
      image: -webkit-gradient(linear, left top, right top, from(#1278f6), to(#00b4aa));
      image: -webkit-linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
      image: -moz-linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
      image: linear-gradient(45deg,#1278f6,#00b4aa 50%, #1278f6);
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
    &.is-active {
      background: cornsilk;
    }
    border-bottom: none;
    &:hover {
      background-color: transparent;
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
