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
              {{item.title}}
            </div>
            <div class="carousel-panel__item__text__content">
              {{item.content}}
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
            pic: require('./asserts/banner01.jpg'),
            title: '知识库 —— 整合零碎的知识',
            content: '知识库所属某一分类，其下包含一系列文章'
          },
          {
            link: '',
            pic: require('./asserts/banner02.jpg'),
            title: '作者角色 —— 申请拥有更多权限',
            content: '拥有加入知识库、创建知识库等权限'
          },
          {
            link: '',
            pic: require('./asserts/banner03.jpg'),
            title: '共享角色 —— 拥有共享权限',
            content: '享有操作他人的知识库文章'
          },
          {
            link: '',
            pic: require('./asserts/banner04.jpg'),
            title: '鹰嘴豆 —— 一个知识库协同网站',
            content: '想构建完整知识库那就加入吧'
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
