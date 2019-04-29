<template>
  <div class="product-panel">
    <div class="product-panel__left">
      <el-image :src="productInfo.title.pic" style="width:200px; height:115px;"></el-image>
      <ul class="product-panel__left__choose">
        <li :class="{showRed:item.show}" v-for="(item, index) in productInfo.category" :key="index" @mouseenter="handlePanelShow(item)">
          <div class="product-panel__left__choose__item">
            <el-image :src="liPic" style="width:4px;height:7px;flex-shrink: 0"></el-image>
            <a style="margin-left:8px;cursor: pointer">{{item.name}}</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="product-panel__right">
      <div class="product-panel__right__panel" v-for="(item, index) in productInfo.category" v-if="item.show">
        <div class="product-panel__right__panel__item" v-for="(sItem, sIndex) in item.products">
          <el-image :src="sItem.pic" style="widows: 175;height: 195px;cursor: pointer"></el-image>
          <a :href="sItem.link">{{sItem.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'produce',
    data() {
      return {
        liPic: require('./asserts/liPic.png'),
        productInfo: {
          title: {
            pic: require('./asserts/titlePic.jpg')
          },
          category: [
            {
              name: '怀庄系列',
              show: true,
              products: [
                {name: '怀庄景德镇瓶封坛30年酒4000ml', link: '', pic: require('./asserts/hz/hz01.jpg')},
                {name: '怀庄景德镇瓶封坛30年酒500ml', link: '', pic: require('./asserts/hz/hz02.jpg')},
                {name: '怀庄酒封坛30年老窖', link: '', pic: require('./asserts/hz/hz03.jpg')},
                {name: '怀庄酒封坛20年老窖', link: '', pic: require('./asserts/hz/hz04.jpg')},
                {name: '怀庄酒封坛10年老窖', link: '', pic: require('./asserts/hz/hz05.jpg')},
                {name: '怀庄金质八年酒', link: '', pic: require('./asserts/hz/hz06.jpg')}
              ]
            },
            {
              name: '人名公社系列',
              show: false,
              products: [
                {name: '人民公社30年', link: '', pic: require('./asserts/rm/rm01.jpg')},
                {name: '人民公社20年', link: '', pic: require('./asserts/rm/rm02.jpg')},
                {name: '人民公社1973', link: '', pic: require('./asserts/rm/rm03.jpg')},
                {name: '人民公社10年', link: '', pic: require('./asserts/rm/rm04.jpg')},
                {name: '人民公社酒简装500ml', link: '', pic: require('./asserts/rm/rm05.jpg')},
                {name: '简装125ml', link: '', pic: require('./asserts/rm/rm06.jpg')},
                {name: '人民公社（酱香老酒）', link: '', pic: require('./asserts/rm/rm07.jpg')}
              ]
            },
            {
              name: '政酒系列',
              show: false,
              products: [
                {name: '政酒30年', link: '', pic: require('./asserts/zj/zj01.jpg')},
                {name: '政酒20年(新)', link: '', pic: require('./asserts/zj/zj02.jpg')},
                {name: '政酒20年', link: '', pic: require('./asserts/zj/zj03.jpg')}
              ]
            },
            {
              name: '精茅台系列',
              show: false,
              products: [
                {name: '精品茅三品', link: '', pic: require('./asserts/mt/mt01.jpg')},
                {name: '精品茅五品', link: '', pic: require('./asserts/mt/mt02.jpg')},
                {name: '精品茅七品', link: '', pic: require('./asserts/mt/mt03.jpg')}
              ]
            },
            {
              name: '典酱台系列',
              show: false,
              products: [
                {name: '国典', link: '', pic: require('./asserts/djt/djt01.jpg')},
                {name: '庆典', link: '', pic: require('./asserts/djt/djt02.jpg')},
                {name: '御典', link: '', pic: require('./asserts/djt/djt03.jpg')},
                {name: '盛典', link: '', pic: require('./asserts/djt/djt04.jpg')},
                {name: '雅典', link: '', pic: require('./asserts/djt/djt05.jpg')}
              ]
            },
            {
              name: '台酱坊系列',
              show: false,
              products: []
            },
            {
              name: '倚天酱系列',
              show: false,
              products: []
            },
            {
              name: '醉美怀庄',
              show: false,
              products: [
                {name: '醉美怀庄 精品', link: '', pic: require('./asserts/zm/zm01.jpg')},
                {name: '醉美怀庄30年', link: '', pic: require('./asserts/zm/zm02.jpg')},
                {name: '醉美怀庄 8年', link: '', pic: require('./asserts/zm/zm03.jpg')}
              ]
            },
            {
              name: '百年怀庄',
              show: false,
              products: []
            },
            {
              name: '怀庄烧坊系列',
              show: false,
              products: []
            },
            {
              name: '老怀庄系列',
              show: false,
              products: []
            },
            {
              name: '酱香原酒系列',
              show: false,
              products: []
            },
            {
              name: '境品系列',
              show: false,
              products: []
            }
          ]
        }
      }
    },
    methods: {
      handlePanelShow(item) {
        for (let temp of this.productInfo.category) {
          temp.show = false
        }
        item.show = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__left {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: 201px;
      background: #ededed;
      &__choose {
        list-style: none;
        padding: 0px;
        &__item {
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;
          font-family: 微软雅黑;
          font-size: 13px;
          font-weight: 400;
        }
        li {
          height: 36px;
          line-height: 36px;
          padding-left: 30px;
          border-bottom: 1px solid #FFF;
          font-family: "微软雅黑";
          line-height: 36px;
          &:hover {
            color: white;
          }
        }
        .showRed {
          color: #FFF;
          width: 201px;
          background: #d43039 !important;
        }

      }
    }
    &__right {
      width: 750px;
      &__panel {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        &__item {
          display: flex;
          flex-direction: column;
          width: 177px;
          padding-top: 20px;
          margin-left: 10px;
          margin-bottom: 10px;
          text-align: center;
          line-height: 24px;
          a {
            cursor: pointer;
          }
          a:hover {
            color: red;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
