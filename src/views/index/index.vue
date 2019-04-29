<template>
  <el-container class="site-main">
    <el-header height="100%">
      <header-nav></header-nav>
      <navigation></navigation>
      <carousel></carousel>
    </el-header>
    <el-main>
      <main-nav></main-nav>
    </el-main>
    <el-footer>
      <footer-nav></footer-nav>
    </el-footer>
    <div class="fix-right" :class="{'fixed': fixed}">
      <fix-right></fix-right>
    </div>
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
      'headerNav': () => import('./components/header'),
      'navigation': () => import('./components/navigation'),
      'carousel': () => import('./components/carousel'),
      'mainNav': () => import('./components/main'),
      'footerNav': () => import('./components/footer-nav'),
      'fixRight': () => import('./components/fix-right')
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
