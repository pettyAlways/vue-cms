<template>
  <div class="brand-panel">
    <div class="brand-panel__header">
      <wine-panel-title width="130px" height="40px" title="推荐作者" note="AUTHOR"></wine-panel-title>
    </div>
    <div class="brand-panel__body">
      <div class="brand-panel__body__item" v-for="(item, index) in authorList" :key="index">
        <user-card-item :userInfo="item"></user-card-item>
      </div>
    </div>
  </div>
</template>

<script>
  import { retrieveRecommendAuthorList } from '../../../../api/user'

  export default {
    name: 'brand',
    data() {
      return {
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        authorList: []
      }
    },
    components: {
      winePanelTitle: () => import('@/components/wine-panel-title'),
      autoScroll: () => import('@/components/auto-scroll'),
      userCardItem: () => import('@/components/user-card-item')
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.recommendAuthor()
      },
      recommendAuthor() {
        retrieveRecommendAuthorList().then(res => {
          if (res.flag) {
            this.authorList = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .brand-panel {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    &__header {
      margin-bottom: 20px;
    }
    &__body {
      display: flex;
      flex-direction: row;
      &__item {
        display: flex;
        width: 350px;
        height: 200px;
        margin-right: 20px;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
      }
    }
  }
</style>
