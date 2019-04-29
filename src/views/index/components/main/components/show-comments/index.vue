<template>
  <div class="comments-panel">
    <div class="comments-panel__header">
      <div class="comments-panel__header__left">
        <el-row type="flex" align="middle">
          <el-image :src="commentsInfo.header.leftPic"></el-image>
          <span>{{commentsInfo.header.leftTitle}}</span>
        </el-row>
      </div>
      <div class="comments-panel__header__right">
        <a>更多>></a>
      </div>
    </div>
    <div class="comments-panel__body">
      <auto-scroll :linkInfo="commentsInfo" height="200px" :speed="30" >
        <template slot-scope="datas">
          <div class="comments-panel__body__item" v-for="(item, index) in datas.data.pics" :key="index" >
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
    name: 'linkPanel',
    components: {
      'autoScroll': () => import('@/components/auto-scroll')
    },
    data() {
      return {
        commentsInfo: {
          header: {
            leftPic: require('./asserts/wineIcon.jpg'),
            leftTitle: '领导关怀'
          },
          pics: [
            {
              pic: require('./asserts/link01.png'),
              title: '2014年8月6日，遵义市委',
              tip: '2014年8月6日，遵义市委常委、仁怀市委书记张翊皓到怀庄酒业集团茅台总部调研。仁怀市人大常委副主任、茅台镇党委书记杨炯，仁怀市人民政府副市长喻阳洪，仁怀市茅台古镇文化产业园区管委会主任、茅台镇镇长王强，仁怀市委办、酒发局、国土局、住建局等部门负责人以及怀庄酒业集团党委书记、董事长陈果陪同调研。',
              link: ''
            },
            {
              pic: require('./asserts/link02.jpg'),
              title: '2008年3月17日，国务院',
              tip: '2008年3月17日，国务院原副总理吴桂贤（左三）到公司视察',
              link: ''
            },
            {
              pic: require('./asserts/link03.jpg'),
              title: '2007年6月26日，省人大',
              tip: '2007年6月26日，省人大常委会副主任、遵义市委书记傅传耀（左一）、省政协副主席刘也强（左三）到公司视察',
              link: ''
            },
            {
              pic: require('./asserts/link04.jpg'),
              title: '2004年7月18日，中国白',
              tip: '2004年7月18日，中国白酒界泰斗秦含章（右二）先生在仁怀市委书记房国兴（左二）、市政协主席王德碧（左一）的陪同下视察怀庄展厅',
              link: ''
            },
            {
              pic: require('./asserts/link05.jpg'),
              title: '2008年，贵州省原省长王朝',
              tip: '2008年，贵州省原省长王朝文(右)到公司视察',
              link: ''
            },
            {
              pic: require('./asserts/link06.jpg'),
              title: '2013年7月，仁怀市政协主',
              tip: '2013年7月，仁怀市政协主席赵洪（中），市政协副主席陈兴文（右四），市政协副主席、市工商联主席邓帆（左三），市政协秘书长赵一龙（左二）到公司视察',
              link: ''
            },
            {
              pic: require('./asserts/link07.jpg'),
              title: '2013年5月，遵义市市长王',
              tip: '2013年5月，遵义市市长王秉清（右二）、仁怀市市长王茂才（右一）、仁怀名酒工业园区管委会常务副主任何勇（左二）到公司视察',
              link: ''
            },
            {
              pic: require('./asserts/link08.jpg'),
              title: '2009年3月，成都糖酒会期',
              tip: '2009年3月，成都糖酒会期间，遵义市市长王晓光（右一）、中国酒业协会副理事长兼秘书长王琦（左二）、遵义市政协副主席陈晓红（左三）、仁怀市市长娄冰等领导到怀庄展厅视察',
              link: ''
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comments-panel {
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
