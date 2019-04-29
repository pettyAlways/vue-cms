<template>
  <div class="society-panel">
    <div class="society-panel__header">
      <div class="society-panel__header__left">
        <el-row type="flex" align="middle">
          <el-image :src="societyInfo.header.leftPic"></el-image>
          <span>{{societyInfo.header.leftTitle}}</span>
        </el-row>
      </div>
      <div class="society-panel__header__right">
        <a>更多>></a>
      </div>
    </div>
    <div class="society-panel__body">
      <auto-scroll :linkInfo="societyInfo" height="200px" :speed="30" >
        <template slot-scope="datas">
          <div class="society-panel__body__item" v-for="(item, index) in datas.data.pics" :key="index" >
            <a :href="item.link" :title="item.tip">
              <img :src="item.pic" style="width:217px; height: 163px;">
            </a>
            <a>{{item.title}}</a>
          </div>
        </template>
      </auto-scroll>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'society',
    components: {
      'autoScroll': () => import('@/components/auto-scroll')
    },
    data() {
      return {
        societyInfo: {
          header: {
            leftPic: require('./asserts/wineIcon.jpg'),
            leftTitle: ' 社会关注'
          },
          pics: [
            {
              pic: require('./asserts/society01.jpg'),
              title: '回馈怀庄助学锦旗',
              tip: '回馈怀庄助学锦旗',
              link: ''
            },
            {
              pic: require('./asserts/society02.jpg'),
              title: '井坝小学的感谢信',
              tip: '井坝小学的感谢信',
              link: ''
            },
            {
              pic: require('./asserts/society03.jpg'),
              title: '著名影视歌三栖明星王飞鸿等登',
              tip: '著名影视歌三栖明星王飞鸿等登台献艺',
              link: ''
            },
            {
              pic: require('./asserts/society04.jpg'),
              title: '著名歌唱家阿幼朵在文艺汇演中',
              tip: '著名歌唱家阿幼朵在文艺汇演中登台献唱',
              link: ''
            },
            {
              pic: require('./asserts/society05.jpg'),
              title: '贵州籍的星光大道歌手覃春江独',
              tip: '贵州籍的星光大道歌手覃春江独唱《西部放歌》',
              link: ''
            },
            {
              pic: require('./asserts/society06.jpg'),
              title: '首届多彩贵州歌唱大赛金黔获奖',
              tip: '首届多彩贵州歌唱大赛金黔获奖者王江深情演唱《九月九的酒》',
              link: ''
            },
            {
              pic: require('./asserts/society07.jpg'),
              title: '著名戏曲表演艺术家 冯巩 在',
              tip: '著名戏曲表演艺术家 冯巩 在文艺汇演中的精彩表演',
              link: ''
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .society-panel {
    margin-top: 15px;
    background: #f4f4f4;
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px dashed #ccc;
      &__left {
        padding: 10px 15px;
        span {
          margin-left: 10px;
          font-size: 16px;
          color: #e50012;
          font-family: "微软雅黑";
        }
      }
      &__right {
        margin-right: 15px;
        font-size: 14px;
        color: #333;
        text-decoration: none;
        a:hover {
          color: red;
        }
      }
    }
    &__body {
      padding: 10px 15px;
      &__item {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        text-align: center;
        a {
          color: #333;
          text-decoration: none;
          font-size: 14px;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
</style>
