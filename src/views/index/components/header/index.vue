<template>
  <div class="header-logo">
    <div class="header-logo__main w1200">
      <div class="header-logo__main--left">
        <el-image :src="require('./asserts/logo.jpg')" style="width: 226px;align-self:flex-end"></el-image>
        <el-image :src="require('./asserts/three_adv.jpg')" style="width:384px;height:90px"></el-image>
      </div>
      <div class="header-logo__main--right">
        <el-image :src="require('./asserts/tel.jpg')"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headerNav',
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    &__main {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &--left {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-grow: 1;
      }
      &--right {
        flex-shrink: 0;
        width: 237px;
      }
    }

  }
</style>
