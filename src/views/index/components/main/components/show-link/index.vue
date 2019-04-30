<template>
  <div class="link-panel">
    <div class="link-panel__header">
      <el-image :src="require('./asserts/header.jpg')"></el-image>
    </div>
    <div class="link-panel__body">
      <el-image :src="require('./asserts/body.jpg')"></el-image>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'linkPanel'
  }
</script>

<style lang="scss" scoped>
  .link-panel {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    &__header {
      height: 120px;
    }
    &__body {
      height: 100px;
    }
  }
</style>
