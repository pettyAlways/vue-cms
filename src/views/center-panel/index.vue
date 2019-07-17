<template>
  <el-container class="container w1200">
    <el-aside width="200px">
      <aside-nav></aside-nav>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'centerPanel',
    components: {
      asideNav: () => import('../main/components/aside')
    }
  }
</script>

<style scoped>

</style>
