<template>
    <div class="menu-sidebar">
      <div v-for="item in menus" :key="item.name" class="menu-sidebar-items">
        <router-link v-if="item.type == 'page'" :to="item.path">
          <el-menu-item :index="item.name">
            <icon-svg :iconClass="item.icon"></icon-svg>
            <span>{{item.name}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.name" :key="item.name">
          <template slot="title">
            <div class="sidebar-menus-bar">
              <icon-svg :iconClass="item.icon" class="collapse_icon"></icon-svg>
              <span class="collapse_menu_title">{{item.name}}</span>
            </div>
          </template>
          <menuSidebar v-if="item.children.length" :menus="item.children" class="secondary_menu"></menuSidebar>
        </el-submenu>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      menus: Array
    },
    components: {
      iconSvg: () => import('../icon-svg')
    },
    name: 'menuSidebar'
  }
</script>

<style scoped lang='scss'>
  .menu-sidebar {
    color: gold;
    font-size: 11px !important;
  }
</style>
