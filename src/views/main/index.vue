<template>
  <el-container id="app" class="site-main">
    <el-header>
      <header-nav></header-nav>
    </el-header>
    <router-view/>
    <message-socket></message-socket>
  </el-container>
</template>

<script>
  export default {
    name: 'mainNav',
    components: {
      'messageSocket': () => import('@/views/websocket'),
      'headerNav': () => import('@/views/header')
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
    .container {
      display: flex;
      padding-top: 15px;
    }
  }
</style>
