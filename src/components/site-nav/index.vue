<template>
  <div class="site-nav">
    <i class="el-icon-location-outline"></i>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'siteNav'
  }
</script>

<style lang="scss" scoped>
  .site-nav {
    display: flex;
    align-items: center;
    height: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    i {
      font-size: 16px;
      padding-right: 10px;
      color: #4c84be;
    }
  }
</style>
