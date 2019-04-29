<template>
  <div class="new-panel">
    <el-row>
      <el-col class="new-panel__left" :span="13">
        <div class="new-panel__left__header">
          <el-image :src="newsInfo.left.titlePic" style="width: 23px;height: 23px"></el-image>
          <span>{{newsInfo.left.title}}</span>
        </div>
        <div class="new-panel__left__body">
          <el-image class="new-panel__left__body__img" :src="newsInfo.left.bodyPic" style="width: 240px;height: 325px"></el-image>
          <div class="new-panel__left__body__content">
            <span v-html="newsInfo.left.bodyContent"></span>
            <span class="hong"><a href="/profile/detail-100101-416.htm" title="董事长致辞">&nbsp;&nbsp;详细&gt;&gt;</a> </span>
          </div>
        </div>
      </el-col>
      <el-col :span="1">
        <el-row type="flex" justify="center">
          <el-image :src="centerLine"></el-image>
        </el-row>
      </el-col>
      <el-col class="new-panel__right" :span="10">
        <div class="new-panel__right__header">
          <el-image :src="newsInfo.right.titlePic" style="width:23px;height:23px"></el-image>
          <span>{{newsInfo.right.title}}</span>
        </div>
        <div class="new-panel__right__body">
          <div class="new-panel__right__body__top">
            <el-image class="new-panel__right__body__top__pic" :src="newsInfo.right.topPic" style="width:147px;height:120px"></el-image>
            <div class="new-panel__right__body__top__content">
              <strong><a>{{newsInfo.right.topTitle}}</a></strong>
              <span v-html="newsInfo.right.topContent"></span>
            </div>
          </div>
          <div class="new-panel__right__body__bottom">
            <ul>
              <li v-for="(item, index) in newsInfo.right.news" :key="index">
                <el-row type="flex" align="middle">
                  <el-image :src="ulPic" style="width: 3px;height: 5px;"></el-image>
                  <a>{{item}}</a>
                </el-row>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'news',
    data() {
      return {
        ulPic: require('./asserts/ulPic.jpg'),
        centerLine: require('./asserts/centerLine.jpg'),
        newsInfo: {
          left: {
            title: '董事长致辞',
            titlePic: require('./asserts/titlePic.jpg'),
            bodyPic: require('./asserts/bodyPic.jpg'),
            bodyContent: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;朋友们，真诚欢迎您打开怀庄酒业集团的官方网站，走进贵州省茅台镇怀庄酒业集团，并从里这感知中国酱酒。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 贵州怀庄酒业集团是酱香型白酒原产地——贵州省茅台镇建厂最早的民营酿酒企业，至今已有三十多年的历史。怀庄集团地处酱香白酒原产地核心位置，与驰名中外的国酒茅台同处一地，共拥一天。<br>\n' +
              '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 建厂以来，我们始终坚持“诚信酿造未来·和谐发展怀庄”的信条，始终坚持“认认真真办事、踏踏实实做人、顾客永远是对的”原则，始终坚持“传承古法、至诚至信、合作共赢”的理念。致力于为广大消费者酿制酱香醇厚的怀庄美酒...'
          },
          right: {
            title: '怀庄新闻',
            titlePic: require('./asserts/titlePic.jpg'),
            topPic: require('./asserts/topPic.jpg'),
            topTitle: '酒盒（人民公社酒）获得...',
            topContent: '&nbsp;&nbsp;&nbsp;&nbsp;酒盒（人民公社酒）获得外观设计专利证书——【中华人民共和国国家知识产权局】...',
            news: [
              '酒盒（人民公社酒）获得外观设计专利证书',
              '2015年贵州国际酒博会 怀庄酒业再次光荣绽放',
              '“怀庄”商标荣获中国驰名商标',
              '遵义市政协党的群众路线实践教育活动在怀庄酒业召开',
              '怀庄酒业集团积极参加2014年春季成都糖酒会',
              '怀庄集团召开党的群众路线教育实践活动动员大会'
            ]
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .new-panel {
    margin-top: 15px;
    padding: 10px 10px;
    background: #f4f4f4;
    &__left {
      &__header {
        height: 35px;
        background: url("./asserts/bottom-line.png") bottom repeat-x;
        span {
          font-size: 16px;
          color: #e50012;
          font-family: "微软雅黑";
        }
      }
      &__body {
        display: flex;
        flex-direction: row;
        padding-top: 10px;
        &__img {
          flex-shrink: 0;
          margin-right: 5px;
        }
        &__content {
          color: #333;
          line-height: 24px;
          font-weight: 400;
          .hong a {
            color: Red;
          }
          a:hover {
            color: red;
            text-decoration: none;
          }
        }
      }
    }
    &__right {
      &__header {
        height: 35px;
        background: url("./asserts/bottom-line.png") bottom repeat-x;
        span {
          font-size: 16px;
          color: #e50012;
          font-family: "微软雅黑";
        }
      }
      &__body {
        margin-top: 10px;
        &__top {
          display: flex;
          flex-direction: row;
          &__pic {
            flex-shrink: 0;
          }
          &__content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding-left: 5px;
            font: 13px/1.5 Arial,"宋体";
            strong {
              margin-top: 5px;
              color: #333;
              a {
                text-decoration: none;
              }
            }
            span {
              margin-top: 5px;
              font-size: 12px;
            }
          }
        }
        &__bottom {
          margin-top: 15px;
          ul {
            list-style: none;
            padding: 0px;
            li {
              margin-top: 10px;
              cursor: pointer;
              a {
                margin-left: 5px;
                text-decoration: none;
              }
              a:hover {
                color:red;
              }
            }
          }
        }
      }
    }
  }
</style>
