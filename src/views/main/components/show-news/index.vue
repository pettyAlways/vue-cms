<template>
  <div class="news-panel">
    <div class="news-panel--left">
      <div class="news-panel--left__header">
        <div class="news-panel--left__header--left">
          <a v-for="(item, index) in type" :key="index" @mouseenter="autoHandler(item)">{{item.name}}</a>
          <span>RECOMMEND</span>
        </div>
        <div class="news-panel--left__header--right">
          <el-image :src="require('./asserts/more2.jpg')"></el-image>
        </div>
      </div>
      <div class="news-panel--left__body">
        <div class="news-panel--left__body__item">
          <div class="news-panel--left__body__item--left">
            <el-image :src="showData.item.pic" style="width: 130px;height:130px;"></el-image>
          </div>
          <div class="news-panel--left__body__item--right">
            <h3><a>{{showData.item.title}}</a></h3>
            <div class="news-panel--left__body__item--right__content">
              <span>{{showData.item.content}}</span>
              <a href="/a/gongsixinwen/20190114/34.html">[详情]</a>
            </div>
          </div>
        </div>
        <div class="news-panel--left__body__list">
          <ul>
            <li v-for="(item, index) in showData.listContent" :key="index">
              <a :href="item.link">{{item.title}}</a>
              <span>{{item.postTime}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="news-panel--right">
      <div class="news-panel--right__header">
        <div class="news-panel--right__header--left">
          <a>最新知识库</a>
          <span>LATEST</span>
        </div>
        <div class="news-panel--right__header--right">
          <el-image :src="require('./asserts/more2.jpg')"></el-image>
        </div>
      </div>
      <div class="news-panel--right__body">
        <div class="news-panel--right__body__list">
          <el-card class="news-panel--right__body__list__item" v-for="(item, index) in listInfo" :key="index">
            <a :href="item.link">
              <el-image :src="item.pic" style="height: 120px;" fit="cover" lazy></el-image>
              <div class="news-panel--right__body__list__item__text">
                <div class="news-panel--right__body__list__item__text__title">
                  <a>{{item.title}}</a>
                </div>
                <div class="news-panel--right__body__list__item__text__content">{{item.description}}</div>
                <div class="news-panel--right__body__list__item__text__bottom">
                  <span>收录:{{item.postNum}}</span>
                  <span>创建:{{item.createTime}}</span>
                  <span>点赞:{{item.likeNum}}</span>
                </div>
              </div>
            </a>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'news',
    data() {
      return {
        type: [
          {
            id: 'companyNew',
            name: '推荐知识库'
          },
          {
            id: 'industry',
            name: '推荐文章'
          }
        ],
        showData: {
          item: {
            pic: require('./asserts/1-1Z1141409290-L.jpg'),
            title: '什么才是正宗的酱香酒？',
            content: '现代人喝酒，除了要尽兴还要健康，酱香型白酒无疑成了不可替代的酒品之一。什么才是正宗的酱香酒? 白酒批发 为您在下文 '
          },
          listContent: [
            {
              title: '什么才是正宗的酱香酒？',
              link: '',
              postTime: '2019-01-14'
            },
            {
              title: '收藏老酒要有丰富的鉴定经验',
              link: '',
              postTime: '2019-01-14'
            },
            {
              title: '各种粮食酿出的白酒有什么缺点？',
              link: '',
              postTime: '2019-01-14'
            },
            {
              title: '什么环节上征收的白酒税？',
              link: '',
              postTime: '2019-01-14'
            }
          ]
        },
        newsInfo: {
          companyNew: {
            item: {
              pic: require('./asserts/1-1Z1141409290-L.jpg'),
              title: '什么才是正宗的酱香酒？',
              content: '现代人喝酒，除了要尽兴还要健康，酱香型白酒无疑成了不可替代的酒品之一。什么才是正宗的酱香酒? 白酒批发 为您在下文 '
            },
            listContent: [
              {
                title: '什么才是正宗的酱香酒？',
                link: '',
                postTime: '2019-01-14'
              },
              {
                title: '收藏老酒要有丰富的鉴定经验',
                link: '',
                postTime: '2019-01-14'
              },
              {
                title: '各种粮食酿出的白酒有什么缺点？',
                link: '',
                postTime: '2019-01-14'
              },
              {
                title: '什么环节上征收的白酒税？',
                link: '',
                postTime: '2019-01-14'
              }
            ]
          },
          industry: {
            item: {
              pic: require('./asserts/1-1Z40Q5022A11-lp.jpg'),
              title: '选购贵州茅台酒常见的几大误区',
              content: '不知各位还是否记得，两年前由吴京主演的战狼2成功的创造了中国电影票房的传奇，仅仅国内就成功收入五十六个亿（正好 '
            },
            listContent: [
              {
                title: '选购贵州茅台酒常见的几大误区',
                link: '',
                postTime: '2019-04-28'
              },
              {
                title: '茅台镇基酒价格？基酒贵吗？',
                link: '',
                postTime: '2019-04-25'
              },
              {
                title: '茅台镇散酒成本是多少？',
                link: '',
                postTime: '2019-04-20'
              },
              {
                title: '茅台镇散酒值不值得购买？茅台镇散酒值得入手',
                link: '',
                postTime: '2019-04-17'
              }
            ]
          }
        },
        listInfo: [
          {
            title: 'Java高并发编程',
            description: '在高并发的压力下，如何才能使用安全的java工具包进行高效安全的编写代码，是否理解了JMM里面的主要知识理论内容',
            likeNum: '1',
            createTime: '2019-05-19',
            postNum: '10',
            pic: require('./asserts/book01.jpg'),
            link: ''
          },
          {
            title: 'Java高并发编程',
            description: '在高并发的压力下，如何才能使用安全的java工具包进行高效安全的编写代码，是否理解了JMM里面的主要知识理论内容',
            likeNum: '1',
            createTime: '2019-05-19',
            postNum: '10',
            pic: require('./asserts/book02.jpg'),
            link: ''
          },
          {
            title: 'Java高并发编程',
            description: '在高并发的压力下，如何才能使用安全的java工具包进行高效安全的编写代码，是否理解了JMM里面的主要知识理论内容',
            likeNum: '1',
            createTime: '2019-05-19',
            postNum: '10',
            pic: require('./asserts/book03.jpg'),
            link: ''
          }
        ]
      }
    },
    methods: {
      autoHandler(item) {
        this.showData = this.newsInfo[item.id]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .news-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    &--left {
      flex-shrink: 0;
      width: 430px;
      height: 356px;
      &__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        &--left {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          color: #323232;
          a {
            display: block;
            padding-right: 8px;
            margin-right: 8px;
            &:nth-of-type(1) {
              border-right: 3px solid #cc9966;
            }
          }
          span {
            font-size: 12px;
            color: #cccccc;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: normal;
          }
        }
      }
      &__body {
        padding: 24px;
        border: 1px solid #e6e6e6;
        overflow: hidden;
        &__item {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 145px;
          border-bottom: 1px dashed #e6e6e6;
          &--left {
            width: 130px;
            flex-shrink: 0;
            margin-right: 10px;
          }
          &--right {
            flex-grow: 1;
            h3 {
              height: 24px;
              overflow: hidden;
              a {
                font-size: 18px;
              }
            }
            &__content {
              line-height: 22px;
              font-size: 12px;
              color: #323232;
              height: 66px;
              overflow: hidden;
              a {
                color: #cc9966;
              }
            }
          }
        }
        &__list {
          ul {
            list-style: none;
            padding: 0px;
            li {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              height: 30px;
              line-height: 30px;
              border-bottom: 1px dashed #e6e6e6;
              span {
                color: #999999;
              }
            }
          }
        }
      }
    }
    &--right {
      height: 356px;
      width: 740px;
      margin-left: 10px;
      margin-right: 10px;
      &__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        &--left {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          color: #323232;
          a {
            display: block;
            padding-right: 8px;
            margin-right: 8px;
          }
          span {
            font-size: 12px;
            color: #cccccc;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: normal;
          }
        }
      }
      &__body {
        width: 740px;
        height: 356px;
        overflow: hidden;
        color: red;
        &__item {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 145px;
          border-bottom: 1px dashed #e6e6e6;
          &--left {
            width: 130px;
            flex-shrink: 0;
            margin-right: 10px;
          }
          &--right {
            flex-grow: 1;
            h3 {
              height: 24px;
              overflow: hidden;
              a {
                font-size: 18px;
              }
            }
            &__content {
              line-height: 22px;
              font-size: 12px;
              color: #323232;
              height: 66px;
              overflow: hidden;
              a {
                color: #cc9966;
              }
            }
          }
        }
        &__list {
          display: flex;
          &__item {
            position: relative;
            height: 315px;
            width: 240px;
            margin-right: 6px;
            border: 1px solid #e6e6e6;
            &__text {
              display: flex;
              flex-direction: column;
              &__title {
                height: 30px;
                margin-top: 10px;
                line-height: 30px;
                font-size: 14px;
                font-weight: 700;
                a {
                  display: block;
                  cursor: pointer;
                }
              }
              &__content {
                heihgt: 70px;
                margin-top: 5px;
                color: #b2b2b2;
                font-size: 12px;
                overflow: hidden;
              }
              &__bottom {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 5px;
                span {
                  font-size: 12px;
                  color: #b2b2b2;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
