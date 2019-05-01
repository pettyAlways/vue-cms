<template>
  <div class="common-page">
    <div class="common-page__panel w1200">
      <div class="common-page__panel__left">
        <ul>
          <li v-for="(item, index) in showData" :key="index">
            <a @click="goHandler(item)" :class="{'isActive': $route.query.name==item.name}">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="common-page__panel__center">
        <div class="common-page__panel__center__bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>当前位置</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/'}">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/news', query: {name: '公司新闻'}}">行业资讯</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="common-page__panel__center__main">
          <div class="common-page__panel__center__main__news-panel">
            <div class="common-page__panel__center__main__news-panel__list">
              <div class="common-page__panel__center__main__news-panel__list__item" v-for="(item, index) in listDatas" :key="index">
                <a :href="item.link"><el-image :src="item.pic" style="width:442px; height:242px;"></el-image></a>
                <div class="common-page__panel__center__main__news-panel__list__item__title">
                  <a>{{item.title}}</a>
                </div>
                <div class="common-page__panel__center__main__news-panel__list__item__content">{{item.content}}</div>
                <div class="common-page__panel__center__main__news-panel__list__item__bottom">
                  <span>时间:{{item.postTime}}</span>
                  <span>点击:{{item.clickNum}}</span>
                </div>
                <div class="hot">
                  <img :src="require('./asserts/hot.jpg')" />
                </div>
              </div>
            </div>
            <div class="common-page__panel__center__main__news-panel__pagination" v-if="listDatas.length!=0">
              <el-pagination
                :page-size="20"
                layout="prev, pager, next"
                :total="listDatas.length">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'category',
    data() {
      return {
        showData: [
          {
            name: '公司新闻',
            link: '/news'
          },
          {
            name: '行业新闻',
            link: '/news'
          }
        ],
        newsInfo: {
          '公司新闻': [
            {
              pic: require('./asserts/company/news01.jpg'),
              link: '',
              title: '什么才是正宗的酱香酒？',
              content: '现代人喝酒，除了要尽兴还要健康，酱香型白酒无疑成了不可替代的酒品之一。什么才是正宗的酱香酒? 白酒批发 为您在下文介绍。 酱香型白酒属于白酒中慢工出细活的慢工制品。正宗...',
              postTime: '2019-01-14',
              clickNum: '227'
            },
            {
              pic: require('./asserts/company/news02.jpg'),
              link: '',
              title: '收藏老酒要有丰富的鉴定经验',
              content: '很多朋友都喜欢收藏老酒， 白酒批发 挺行您想要收藏老酒，就必须要有丰富的鉴定经验，这样才能避免上当受骗。 中国的假货向来屡禁不止，酒类也是一样。制造贩卖假酒一直是危害..',
              postTime: '2019-01-14',
              clickNum: '227'
            },
            {
              pic: require('./asserts/company/news03.jpg'),
              link: '',
              title: '各种粮食酿出的白酒有什么缺点？',
              content: '现代酿酒技术的发展使得各种粮食都成为酿造白酒的原料，今天 白酒批发 就和您一起了解各种粮食酿出的白酒有什么缺点。 小麦、大麦、豌豆类粮食 此类粮食因为其蛋白质成分过高，...',
              postTime: '2019-01-14',
              clickNum: '227'
            },
            {
              pic: require('./asserts/company/news04.jpg'),
              link: '',
              title: '什么环节上征收的白酒税？',
              content: '我们都知道国家对于烟酒的是有白酒消费税的，那到底是在什么环节上征收的白酒税呢? 白酒批发 小编告诉你。 对于白酒消费税，对于白酒企业而言，是一项影响企业盈利的负面消息。...',
              postTime: '2019-01-14',
              clickNum: '227'
            }
          ],
          '行业新闻': [
            {
              pic: require('./asserts/industry/news01.jpg'),
              link: '',
              title: '选购贵州茅台酒常见的几大误区',
              content: '不知各位还是否记得，两年前由吴京主演的战狼2成功的创造了中国电影票房的传奇，仅仅国内就成功收入五十六个亿（正好五十六个民族一个民族一个亿的支援），而吴京在剧中也成功...',
              postTime: '2019-04-28',
              clickNum: '151'
            },
            {
              pic: require('./asserts/industry/news02.jpg'),
              link: '',
              title: '茅台镇基酒价格？基酒贵吗？',
              content: '说起 茅台镇基酒 可能对爱酒人士来说比较熟悉，非爱酒人士就比较陌生。 茅台镇基酒 名气确实没有茅台酒大，可是爱酒人士来说又是喜爱交加。 首先要知道首酒上市的 茅台镇基酒...',
              postTime: '2019-04-25',
              clickNum: '61'
            },
            {
              pic: require('./asserts/industry/new03.png'),
              link: '',
              title: '茅台镇散酒成本是多少？',
              content: '茅台镇散酒 成本是多少 ？ 有很多人一直在问我，茅台镇散酒成本到底是多少？问的我是心烦意乱，今天我就坦然告诉各位茅台镇散酒到底是多少成本吧。 其实茅台镇散酒没有想象中的...',
              postTime: '2019-04-20',
              clickNum: '180'
            },
            {
              pic: require('./asserts/industry/news04.jpg'),
              link: '',
              title: '茅台镇散酒值不值得购买？茅台镇散酒值得入手',
              content: '茅台镇散酒 是出产于遵义茅台镇的香型白酒，都是以当地水质和小红糯高粱为主材料，经过发酵加工酿制窖藏等多重工序所制，和市面上的茅台酒可以说是出生于同一个妈，无论是味道...',
              postTime: '2019-04-17',
              clickNum: '57'
            },
            {
              pic: require('./asserts/industry/news05.jpg'),
              link: '',
              title: '茅台酒厂上班福利待遇那么好？却一直招不到人',
              content: '茅台酒厂 上班福利待遇那么好？却一直招不到人呢？ 在国家历史上酒文化可以说是源远流长，在全球上来看我国的酒文化也是名列前茅的。在国内也是一样不同类型的酒也是满目琳琅...',
              postTime: '2019-04-17',
              clickNum: '74'
            },
            {
              pic: require('./asserts/industry/news06.jpg'),
              link: '',
              title: '怎么选才能喝过正宗茅台镇散酒？',
              content: '正宗 茅台镇散酒 到底有没有呢 ？ 答案是肯定的，正宗茅台镇散酒可以用物美价廉来形容，对于喜爱酱香型白酒人士来说，茅台镇散酒确实是首选佳品，口感佳价格经济实惠也受到了不...',
              postTime: '2019-04-10',
              clickNum: '165'
            },
            {
              pic: require('./asserts/industry/news07.jpg'),
              link: '',
              title: '9年基酒，8次发酵，真正茅台镇基酒',
              content: '有些科技公司，产品做出来，改变了世界的格局。 有些科技公司，整天喊着要改变世界，但其实都是为了钱。 都不用严格的讲，就简单的说说，ofo这种不退还客户押金的行为，完全就...',
              postTime: '2019-04-10',
              clickNum: '114'
            },
            {
              pic: require('./asserts/industry/new08.png'),
              link: '',
              title: '什么是茅台镇基酒？味道怎么样？',
              content: '茅台酒或者说茅台镇散酒多多少少还是有点名气的，但是要说茅台镇基酒可能很多人都蒙圈了。也许都会问到： 什么是 茅台镇基酒 ？ 那么接下来就让小编给大家简单介绍一下什么是茅...',
              postTime: '2019-04-07',
              clickNum: '74'
            },
            {
              pic: require('./asserts/industry/news09.jpg'),
              link: '',
              title: '如何才能买到正宗纯酿茅台镇散酒？',
              content: '茅台酒是国家级名酒，在各种高端酒局上多多少少都会有茅台酒的身影，这也是消费者对茅台酒的青睐所致。但是茅台酒也因为费用太高，所以多数爱酒人士也会更青睐于 茅台镇散酒...\n',
              postTime: '2019-04-07',
              clickNum: '82'
            }
          ]

        },
        listDatas: []
      }
    },
    mounted() {
      this.queryHandler(this.$route.query.name)
    },
    methods: {
      goHandler(item) {
        this.$router.push({ path: item.link, query: { name: item.name } })
      },
      queryHandler(params) {
        this.listDatas = this.newsInfo[params]
      }
    },
    components: {
      'wineBorderPanel': () => import('@/components/wine-border-panel')
    },
    watch: {
      $route(to, from) {
        this.queryHandler(this.$route.query.name)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .common-page {
    margin-bottom: 20px;
    &__panel {
      display: flex;
      justify-content: space-between;
      &__left {
        width: 200px;
        height: 100%;
        border: 1px solid #e0caa8;
        ul {
          list-style: none;
          padding: 0px;
          li {
            display: flex;
            justify-content: center;
            a {
              height: 56px;
              width: 170px;
              color: #4c4c4c;
              font-size: 18px;
              line-height: 56px;
              display: block;
              text-align: center;
              border-bottom: 1px solid #e6e6e6;
            }
            a:hover{
              background: #c59d5e;
              color: #ffffff;
              width: 198px;
              height: 57px;
              text-align: center;
              border-bottom: none;
            }
            .isActive{
              background: #c59d5e;
              color: #ffffff;
              width: 198px;
              height: 57px;
              text-align: center;
              border-bottom: none;
            }
          }
        }
      }
      &__center {
        width: 980px;
        &__bread {
          margin-bottom: 30px;
          /deep/ .el-breadcrumb {
            font-size: 16px;
            color: #333;
            text-decoration: none;
            &__inner.is-link {
              font-weight: 400
            }
          }
        }
        &__main {
          &__news-panel {
            &__list {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 20px;
              &__item {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 444px;
                margin-left: 8px;
                margin-right: 7px;
                margin-bottom: 15px;
                border-left: 1px solid #e4e4e4;
                border-right: 1px solid #e4e4e4;
                border-bottom: 1px solid #e4e4e4;
                &__title {
                  width: 442px;
                  height: 30px;
                  padding-left: 5px;
                  line-height: 30px;
                  font-size: 16px;
                  font-weight: 700;
                  color: white;
                  background: #000000;
                  margin-top: -1px;
                  a {
                    display: block;
                    cursor: pointer;
                  }
                }
                &__content {
                  color: #b2b2b2;
                  font-size: 14px;
                  padding: 15px;
                }
                &__bottom {
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                  span {
                    margin-left: 15px;
                    margin-right: 15px;
                    font-size: 12px;
                    color: #b2b2b2;
                  }
                }
                .hot {
                  position: absolute;
                  top: 0px;
                  left: 0px;
                }
              }
            }
            &__pagination {
              display: flex;
              flex-direction: row;
              justify-content: center;
            }
          }
        }
      }
    }
  }
</style>
