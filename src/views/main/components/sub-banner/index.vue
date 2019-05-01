<template>
  <div class="sub-banner">
      <el-image :src="banner.bannerPic" style="height: 120px;"></el-image>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        banner: {
          bannerPic: require('./asserts/banner.jpg')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sub-banner {
    margin-bottom: 20px;
  }
</style>
