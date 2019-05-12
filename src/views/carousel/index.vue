<template>
  <div class="carousel-panel">
    <el-carousel height="472px">
      <el-carousel-item v-for="(item, index) in carouselPic" :key="index">
        <div class="carousel-panel__item">
          <a :href="item.link">
            <el-image :src="item.pic" style="width: 100%"></el-image>
          </a>
          <div class="carousel-panel__item__text">
            <div class="carousel-panel__item__text__title">
              知识库 —— 整合零碎的知识
            </div>
            <div class="carousel-panel__item__text__content">
              提供了大量前端后台的知识库
            </div>
          </div>
        </div>
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
            pic: require('./asserts/banner01.jpg')
          },
          {
            link: '',
            pic: require('./asserts/banner02.jpg')
          },
          {
            link: '',
            pic: require('./asserts/banner03.jpg')
          },
          {
            link: '',
            pic: require('./asserts/banner04.jpg')
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .carousel-panel {
    &__item {
      height: 100%;
      position: relative;
      &__text {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 400px;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -200px;
        height: 100px;
        &__title {
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: 700;
          color: white;
        }
        &__content {
          font-size: 14px;
          color: white
        }
      }
    }
    /deep/ .el-carousel__arrow {
      height: 50px;
      width: 50px;
      i {
        font-size: 25px;
        font-weight: 800;
      }
    }
  }
</style>
