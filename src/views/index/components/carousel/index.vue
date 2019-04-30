<template>
  <div class="carousel-panel">
    <el-carousel height="472px">
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
            pic: require('./asserts/1-1Z3311AQ1F3.jpg')
          },
          {
            link: '',
            pic: require('./asserts/1-1Z3311F251O7.jpg')
          },
          {
            link: '',
            pic: require('./asserts/1-1Z3311F415541.jpg')
          },
          {
            link: '',
            pic: require('./asserts/1-1Z12516013Y52.jpg')
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .carousel-panel {
  }
</style>
