<template>
  <div class="produce-place">
    <div class="produce-place__header">
      <wine-panel-title width="220px" height="40px" title="懂酒帝工厂店" note="Franchise chain"></wine-panel-title>
    </div>
    <div class="produce-place__body">
      <div class="produce-place__body--left">
        <el-image :str="leftPic" style="width: 405px;height:355px;"></el-image>
      </div>
      <div class="produce-place__body--right">
        <div class="produce-place__body--right__list">
          <div class="produce-place__body--right__list__item" v-for="(item, index) in placeInfo" :key="index">
            <a :href="item.link">
              <el-image :src="item.pic" style="width: 260px;height:175px"></el-image>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'showPlace',
    data() {
      return {
        leftPic: require('./asserts/left.jpg'),
        placeInfo: [
          {
            pic: require('./asserts/shop.jpg'),
            link: ''
          },
          {
            pic: require('./asserts/shop.jpg'),
            link: ''
          },
          {
            pic: require('./asserts/shop.jpg'),
            link: ''
          },
          {
            pic: require('./asserts/shop.jpg'),
            link: ''
          },
          {
            pic: require('./asserts/shop.jpg'),
            link: ''
          },
          {
            pic: require('./asserts/shop.jpg'),
            link: ''
          }
        ]
      }
    },
    components: {
      'winePanelTitle': () => import('@/components/wine-panel-title')
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
      justify-content: space-between;
      &--left {
        flex-shrink: 0;
        width: 405px;
        height: 355px;
      }
      &--right {
        flex-shrink: 0;
        width: 795px;
        height: 355px;
        &__list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
         &__item {
           margin-left: 5px;
           width: 260px;
           height: 175px;
           margin-bottom: 5px;
         }
        }
      }
    }

  }
</style>
