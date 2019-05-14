<template>
  <div class="knowledge-main">
    <konwledge-banner/>
    <el-card class="knowledge-main__container w1200">
      <knowledge-recommend></knowledge-recommend>
      <el-image :src="require('../../asserts/ad01.jpg')" style="height: 120px; margin-top: 15px;" fit="cover"></el-image>
      <div class="knowledge-main__container__center">
        <div class="knowledge-main__container__center--left">
          <knowledge-category></knowledge-category>
        </div>
        <div class="knowledge-main__container__center--right">
          <author></author>
          <knowledge-news></knowledge-news>
        </div>
      </div>
      <el-image :src="require('../../asserts/ad01.jpg')" style="height: 120px; margin-top: 15px;" fit="cover"></el-image>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeMain',
    data() {
      return {

      }
    },
    components: {
      'konwledgeBanner': () => import('../banner'),
      'knowledgeRecommend': () => import('../recommend'),
      'knowledgeCategory': () => import('../category'),
      'author': () => import('../author'),
      'knowledgeNews': () => import('../news')
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-main {
    &__container {
      margin-top: 10px;
      &__center {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        &--left {
          flex-shrink: 0;
          width: 900px;
        }
        &--right {
          display: flow;
          flex-direction: column;
          flex-grow: 1;
          margin-left: 15px;
          width: 280px;
        }
      }
    }

  }
</style>
