<template>
  <el-menu mode="vertical"
           class="menus-group--vertical"
           unique-opened
           background-color=""
           :collapse="isCollapse"
           :default-active="activeTagName">
    <menuSidebar :menus="permissions[curConfigure]"></menuSidebar>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import menuSidebar from '../menu-sidebar'
  export default {
    components: {
      menuSidebar
    },
    computed: {
      ...mapGetters([
        'permissions',
        'curConfigure',
        'isCollapse',
        'curActive',
        'tabViews'
      ]),
      // 路由的name需要和资源管理定义的资源name一致
      activeTagName() {
        let activeName
        if (this.tabViews[this.curConfigure]) {
          this.tabViews[this.curConfigure].forEach(item => {
            if (item.path === this.curActive[this.curConfigure]) {
              activeName = item.tagName
            }
          })
        }
        return activeName
      }
    }
  }
</script>

<style scoped lang="scss">
  .menus-group--vertical:not(.el-menu--collapse) {
    position: fixed;
    top: 61px;
    width: 200px;
    height: 100%;
    min-height: 500px;
    /*background: {
      image: -webkit-gradient(linear, left top, right top, from(#1278f6), to(#00b4aa));
      image: -webkit-linear-gradient(left, #1278f6, #00b4aa);
      image: -moz-linear-gradient(left, #1278f6, #00b4aa);
      image: linear-gradient(to bottom, #f2f2f2, #f5f5f5);
    }*/
  }
</style>
