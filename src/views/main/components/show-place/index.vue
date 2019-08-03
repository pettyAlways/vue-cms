<template>
  <div class="produce-place">
    <div class="produce-place__header">
      <wine-panel-title width="160px" height="40px" title="最新文章" note="ARTICLES"></wine-panel-title>
    </div>
    <div class="produce-place__body">
      <div class="article-item" v-for="(item, index) in recentList" :key="index">
        <article-panel :article="item"></article-panel>
      </div>
    </div>
  </div>
</template>

<script>
  import { recentArticleListInfo } from '../../../../api/article'

  export default {
    name: 'showPlace',
    data() {
      return {
        recentList: []
      }
    },
    components: {
      'winePanelTitle': () => import('@/components/wine-panel-title'),
      articlePanel: () => import('@/components/article-panel')
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.recentArticleList()
      },
      recentArticleList() {
        recentArticleListInfo().then(res => {
          if (res.flag) {
            this.recentList = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .produce-place {
    margin-bottom: 20px;
    &__header {
      margin-bottom: 20px;
    }
    &__body {
      display: flex;
      flex-wrap: wrap;
      .article-item {
        width: 100%;
        height: 110px;
        margin-bottom: 10px;
      }
    }

  }
</style>
