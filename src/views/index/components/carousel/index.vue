<template>
  <div class="carousel-panel">
    <el-carousel height="449px" arrow="never">
      <el-carousel-item v-for="(item, index) in carouselPic" :key="index">
        <a :href="item.link">
          <el-image :src="item.pic" style="height: 449px"></el-image>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    data() {
      return {
        carouselPic: [
          {
            link: '',
            pic: require('./asserts/carousel-pic01.jpg')
          },
          {
            link: '',
            pic: require('./asserts/carousel-pic02.jpg')
          },
          {
            link: '',
            pic: require('./asserts/carousel-pic03.gif')
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .carousel-panel {
    width: 100%;
  }
</style>
