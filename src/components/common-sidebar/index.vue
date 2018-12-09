<template>
  <div class="menus-group" :style="{ height: clientHeight + 'px' }">
    <el-menu mode="vertical"
             class="menus-group--vertical"
             unique-opened
             background-color=""
             :collapse="isCollapse"
             :default-active="activeTagName">
      <menuSidebar :menus="permissions[curConfigure]"></menuSidebar>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import menuSidebar from '../menu-sidebar'
  export default {
    data() {
      return {
        clientHeight: ''
      }
    },
    mounted() {
      this.clientHeight = document.body.clientHeight - 61
    },
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
  .menus-group {
    overflow: hidden;
    .menus-group--vertical:not(.el-menu--collapse) {
      height: 100%;
      width: calc(100% + 20px);
      // 让滚动条一直出现占据上面扩展的20px，否则在高度没有超出的情况下没有滚动条
      // 占据导致菜单的宽度拉长了20px,最右侧的收缩箭头右移20px
      overflow-y: scroll;
    }
  }

</style>
