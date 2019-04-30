<template>
  <div class="product-panel">
    <div class="product-panel__header">
      <wine-panel-title width="180px" height="40px" title="新品图鉴" note="Produce center"></wine-panel-title>
    </div>
    <div class="product-panel__body">
      <div class="product-panel__body__arrow">
        <el-image :src="require('./asserts/arrow-left.jpg')"></el-image>
      </div>
      <div class="product-panel__body__panel">
        <auto-scroll :linkInfo="produceInfo" height="258px" :speed="30" >
          <template slot-scope="datas">
            <div class="product-panel__body__panel__item" v-for="(item, index) in datas.data" :key="index" >
              <a ><img :src="item.pic" style="width:150px; height: 210px;"></a>
              <a class="product-panel__body__panel__item__title">{{item.title}}</a>
              <span class="product-panel__body__panel__item__tip">{{item.tip}}</span>
            </div>
          </template>
        </auto-scroll>
      </div>
      <div class="product-panel__body__arrow">
        <el-image :src="require('./asserts/arrow-right.jpg')"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'produce',
    data() {
      return {
        produceInfo: [
          {
            title: '首酱一号',
            tip: '贵州首酒酒业有限公司是一家专业从事基酒委托',
            pic: require('./asserts/wine01.jpg')
          },
          {
            title: '首酱二号',
            tip: '贵州首酒酒业有限公司是一家专业从事基酒委托',
            pic: require('./asserts/wine01.jpg')
          },
          {
            title: '首酱三号',
            tip: '贵州首酒酒业有限公司是一家专业从事基酒委托',
            pic: require('./asserts/wine01.jpg')
          },
          {
            title: '首酱四号',
            tip: '贵州首酒酒业有限公司是一家专业从事基酒委托',
            pic: require('./asserts/wine01.jpg')
          },
          {
            title: '首酱五号',
            tip: '贵州首酒酒业有限公司是一家专业从事基酒委托',
            pic: require('./asserts/wine01.jpg')
          },
          {
            title: '首酱六号',
            tip: '贵州首酒酒业有限公司是一家专业从事基酒委托',
            pic: require('./asserts/wine01.jpg')
          },
          {
            title: '首酱七号',
            tip: '贵州首酒酒业有限公司是一家专业从事基酒委托',
            pic: require('./asserts/wine01.jpg')
          },
          {
            title: '首酱八号',
            tip: '贵州首酒酒业有限公司是一家专业从事基酒委托',
            pic: require('./asserts/wine01.jpg')
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
  .product-panel {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    &__header {
      margin-bottom: 20px;
    }
    &__body {
      display: flex;
      flex-direction: row;
      border: 1px solid #e0e0e0;
      &__arrow {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: red;
        justify-content: center;
        flex-shrink: 0;
        width: 79px;
        height: 258px;
      }
      &__panel {
        flex-grow: 1;
        width: 1020px;
        &__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0px 10px;
          &__title {
            font-size: 14px;
            color: #676767;
            &:hover {
              color: #cc9966;
            }
          }
          &__tip {
            height: 18px;
            font-size: 12px;
            font-family: Arial, Helvetica, sans-serif;
            color: #808080;
            line-height: 18px;
            text-align: center;
            overflow: hidden;
          }
        }

      }
    }
  }
</style>
