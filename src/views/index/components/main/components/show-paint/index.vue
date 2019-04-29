<template>
  <div class="paint-panel">
    <div class="paint-panel__header">
      <el-row type="flex" justify="space-between">
        <div class="paint-panel__header__text">{{paintInfo.title}}</div>
        <a class="paint-panel__header--more" :href="paintInfo.moreLink">更多>></a>
      </el-row>
    </div>
    <div class="paint-panel__center">
      <el-image :src="paintInfo.picShow" style="width: 100%"></el-image>
    </div>
    <div class="paint-panel__footer">
      <auto-scroll :linkInfo="paintInfo.datas" height="326px" :speed="30" >
        <template slot-scope="datas">
          <ul class="paint-panel__footer--scroll">
            <li v-for="(item, index) in datas.data" :key="index" >
              <a :href="item.link" :title="item.tip"><img :src="item.pic" style="width:326px;height: 241px;"></a>
            </li>
          </ul>
        </template>
      </auto-scroll>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'showPaint',
    data() {
      return {
        paintInfo: {
          title: '书画展示',
          moreLink: '',
          picShow: require('./asserts/paint-pic02.jpg'),
          datas: [
            {
              tip: '怀庄酒业',
              pic: require('./asserts/scroll-pic01.png'),
              link: ''
            },
            {
              tip: '怀庄酒业',
              pic: require('./asserts/scroll-pic02.png'),
              link: ''
            },
            {
              tip: '怀庄酒业',
              pic: require('./asserts/scroll-pic03.png'),
              link: ''
            }
          ]
        }
      }
    },
    components: {
      'autoScroll': () => import('@/components/auto-scroll')
    }
  }
</script>

<style lang="scss" scoped>
  .paint-panel {
    height: 570px;
    box-sizing: border-box;
    background: url("./asserts/paint-pic.jpg") no-repeat;
    width: 960px;
    height: 498px;
    &__header {
      height: 50px;
      line-height: 50px;
      margin-left: 50px;
      &__text {
        font-size: 16px;
        color: #e50012;
        font-family: "微软雅黑";
      }
      &--more {
        font-size: 14px;
        margin-right: 20px;
        &:hover {
          cursor: pointer;
          color: red;
          text-decoration: none;
        }
      }
    }
    &__center {
      width: 918px;
      margin: 0px auto;
    }
    &__footer {
      width: 326px;
      height: 241px;
      margin-top: 30px;
      margin-left: 20px;
      overflow: hidden;
      &--scroll {
        list-style: none;
        width: 1024px;
        li {
          display: flex;
          align-items: stretch;
          float: left;
        }
      }
    }
  }
</style>
