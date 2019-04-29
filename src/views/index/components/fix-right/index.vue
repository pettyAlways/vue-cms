<template>
  <div class="fix-panel">
    <div class="fix-panel__header">
      <div class="title">{{fixInfo.header.name}}</div>
      <el-image :src="fixInfo.header.pic" style="width: 110px;height: 110px;cursor: pointer"></el-image>
    </div>
    <div class="fix-panel__body">
      <ul>
        <li v-for="(item, index) in fixInfo.datas" :key="index">
          <a :href="item.link">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="fix-panel__bottom">
      <el-row type="flex" align="middle" justify="center">
        <el-image :src="arrowPic"></el-image>
      </el-row>
      <a href="#">返回顶部</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'fixRight',
    data() {
      return {
        arrowPic: require('./asserts/arrow.png'),
        fixInfo: {
          header: {
            name: '扫一扫，关注我',
            pic: require('./asserts/vx.jpg')
          },
          datas: [
            {
              name: '怀庄品牌',
              link: ''
            },
            {
              name: '怀庄实力',
              link: ''
            },
            {
              name: '怀庄出品',
              link: ''
            },
            {
              name: '怀庄新闻',
              link: ''
            },
            {
              name: '私人定制',
              link: ''
            },
            {
              name: '招商加盟',
              link: ''
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fix-panel {
    display: flex;
    flex-direction: column;
    width: 120px;
    height: 450px;
    border-bottom: 5px solid #FFF;
    border-left: 4px solid #FFF;
    border-right: 4px solid #FFF;
    border-top: 5px solid #FFF;
    background-color: rgb(143, 0, 11) !important;
    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid white;
      line-height: 30px;
      text-align: center;
      div.title {
        width: 100%;
        padding: 2px;
        font: 14px/1.5 Arial 宋体;
        color: white;
        &:hover {
          background: red !important;
        }
      }
    }
    &__body {
      ul {
        color: white;
        list-style: none;
        padding: 0px;
        text-align: center;
        li {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid white;
          font-family: 微软雅黑;
          font-size: 14px;
          &:hover {
            background: red !important;
          }
        }
      }
    }
    &__bottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      text-align: center;
      font-family: 微软雅黑;
      font-size: 14px;
      color: white;
    }
  }
</style>
