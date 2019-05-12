<template>
  <div class="brand-panel">
    <div class="brand-panel__header">
      <wine-panel-title width="130px" height="40px" title="推荐音乐" note="MUSIC"></wine-panel-title>
    </div>
    <div class="brand-panel__body">
      <div class="brand-panel__body__item" v-for="(item, index) in brandInfo" :key="index">
        <a><el-image :src="item.pic" style="width: 230px;height:320px;"></el-image></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'brand',
    data() {
      return {
        brandInfo: [
          {
            pic: require('./asserts/brand01.jpg')
          },
          {
            pic: require('./asserts/brand02.jpg')
          },
          {
            pic: require('./asserts/brand03.jpg')
          },
          {
            pic: require('./asserts/brand04.jpg')
          }
        ]
      }
    },
    components: {
      'winePanelTitle': () => import('@/components/wine-panel-title'),
      'autoScroll': () => import('@/components/auto-scroll')
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
      background: url("./asserts/brand-bg.png") repeat;
      &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 290px;
        height: 410px;
        margin-left: 10px;
      }
    }
  }
</style>
