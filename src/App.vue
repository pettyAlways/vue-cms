<template>
  <el-container id="app" class="site-main">
    <el-header>
      <header-nav></header-nav>
    </el-header>
    <el-container>
      <router-view/>
    </el-container>
    <el-footer>
      <footer-nav></footer-nav>
    </el-footer>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        fixed: ''
      }
    },
    components: {
      'headerNav': () => import('./views/header'),
      'footerNav': () => import('./views/footer')
    }
  }
</script>
<style lang="scss" scoped>
  .site-main {
    display: flex;
    /deep/ .el-header {
      padding: 0 0px;
    }
    /deep/ .el-main {
      padding: 0px;
    }
    /deep/ .el-footer {
      padding: 0;
    }
  }
</style>
