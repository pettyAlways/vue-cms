<template>
    <div>
      <div v-for="item in menus" :key="item.name">
        <router-link v-if="item.type === 'leaf'" :to="item.path">
          <el-menu-item :index="item.name">
            <i :class="'el-icon-' + item.icon"></i>
            <span>{{item.name}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.name" :key="item.name">
          <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <menuSidebar :menus="item.children"></menuSidebar>
        </el-submenu>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      menus: Array
    },
    name: 'menuSidebar'
  }
</script>

<style scoped>

</style>
