<template>
  <div>
    <el-menu mode="vertical"
             class="el-menu-vertical"
             unique-opened
             @open="handleOpen"
             @close="handleClose"
             background-color=""
             :collapse="isCollapse"
             :default-active="activeTagName">
      <menuSidebar :menus="permissions[curConfigure]"></menuSidebar>
    </el-menu>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import menuSidebar from '@/components/menu-sidebar'
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    components: {
      menuSidebar
    },
    computed: {
      ...mapGetters([
        'permissions',
        'curConfigure',
        'curActive',
        'tabViews'
      ]),
      activeTagName() {
        let activeName
        if (this.tabViews[this.curConfigure]) {
          this.tabViews[this.curConfigure].forEach(item => {
            if (item.path === this.curActive[this.curConfigure]) {
              activeName = item.name
            }
          })
        }
        return activeName
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      hasOneShowingChildren(children) {
        if (children.length === 1) {
          return true
        }
        return false
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-menu-vertical:not(.el-menu--collapse) {
    position: fixed;
    top: 61px;
    width: 200px;
    height: 100%;
    min-height: 500px;
    // background: {
    //   image: -webkit-gradient(linear, left top, right top, from(#1278f6), to(#00b4aa));
    //   image: -webkit-linear-gradient(left, #1278f6, #00b4aa);
    //   image: -moz-linear-gradient(left, #1278f6, #00b4aa);
    //   image: linear-gradient(to bottom, #f2f2f2, #f5f5f5);
    // }
  }
</style>
