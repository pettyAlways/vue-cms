<template>
  <el-container id="app" class="site-main">
    <el-header height="100%">
      <header-nav></header-nav>
      <navigation></navigation>
      <carousel></carousel>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
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
      'navigation': () => import('./views/navigation'),
      'carousel': () => import('./views/carousel'),
      'footerNav': () => import('./views/footer-nav')
    },
    mounted() {
      window.addEventListener('scroll', this.navHandler)
    },
    methods: {
      navHandler() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 310) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .site-main {
    color: #6a6a6a;
    .fix-right {
      position: relative;
      right: 45px;
      top: 260px;
      z-index: 9999;
    }
    .fixed {
      position: fixed;
    }
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
