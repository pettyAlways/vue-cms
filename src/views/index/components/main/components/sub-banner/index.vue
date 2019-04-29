<template>
  <div class="sub-banner">
      <el-image :src="banner.bannerPic" style="width:100%"></el-image>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        banner: {
          bannerPic: require('./asserts/banner-pic.jpg')
        }
      }
    }
  }
</script>

<style scoped>

</style>
