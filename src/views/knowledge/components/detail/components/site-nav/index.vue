<template>
  <div class="site-nav">
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
    height: 40px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 15px;
  }
</style>
