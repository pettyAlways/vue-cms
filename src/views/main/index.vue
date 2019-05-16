<template>
    <div class="container w1200">
      <el-aside width="200px">
        <aside-nav></aside-nav>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </div>
</template>

<script>
  export default {
    name: 'mainNav',
    components: {
      asideNav: () => import('./components/aside')
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    padding-top: 15px;
  }
</style>
