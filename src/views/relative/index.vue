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
            <el-breadcrumb-item :to="{path: '/relative', query: {name: '首酒简介'}}">企业相关</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="common-page__panel__center__main">
          <div class="common-page__panel__center__main__relative-panel" v-if="$route.query.name!='首酒简介'&&$route.query.name!='工艺原料'">
            <div class="common-page__panel__center__main__relative-panel__list">
              <div class="common-page__panel__center__main__relative-panel__list__item" v-for="(item, index) in listDatas" :key="index">
                <a :href="item.link"><el-image :src="item.pic" style="width:442px; height:242px;"></el-image></a>
                <div class="common-page__panel__center__main__relative-panel__list__item__title">
                  <a>{{item.title}}</a>
                </div>
                <div class="common-page__panel__center__main__relative-panel__list__item__content">{{item.content}}</div>
                <div class="common-page__panel__center__main__relative-panel__list__item__bottom">
                  <span>时间:{{item.postTime}}</span>
                  <span>点击:{{item.clickNum}}</span>
                </div>
                <div class="hot">
                  <img :src="require('./asserts/hot.jpg')" />
                </div>
              </div>
            </div>
            <div class="common-page__panel__center__main__relative-panel__pagination" v-if="listDatas.length!=0">
              <el-pagination
                :page-size="20"
                layout="prev, pager, next"
                :total="listDatas.length">
              </el-pagination>
            </div>
          </div>
          <div class="common-page__panel__center__main__intro-panel" v-if="$route.query.name=='首酒简介'">
            <span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">&nbsp; 贵州首酒酒业有限公司嫡属贵州茅台镇国威酒业(集团)有限责任公司旗下的一个生产公司，主要负责集团公司基酒生产和销售，是一家具有悠久历史的白酒行业老字号，素来以高品质酱香酒而闻名。整个集团现有三个独立生产许可证，已成为集白酒企业生产、销售、服务、管理一条龙的综合性酒业集团，是遵义市五强白酒企业、仁怀十强企业之一。集团公司机构健全，人员齐备，技术力量雄厚，生产设备先进，检测仪器齐全，生产管理和质量管理制度完善。</span></span><br>
            <br>
            <span style="font-family: arial, helvetica, sans-serif; font-size: 16px;">&nbsp;&nbsp;</span><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">贵州首酒酒业有限公司，占地面积400余亩，拥有酿造车间20余栋，窖坑1000余个，年生产10000余吨优质酱香白酒，库存原酱酒15000余吨，另设制曲厂（年产量1万余吨）。年基酒销售近10个多亿，供应贵州茅台酒厂（集团）白金酒有限责任公司基酒5个多亿，黑龙江老村长酒业、江苏洋河酒业供应基酒近3个亿。供应其他贴牌产品1个多亿元，拥有大小贴牌代理商600余个，同时给全国多家企业做专用订制酒。拥有资产19个亿。<br>
		集团公司董事长创始人梁明锋先生是贵州茅台酒厂集团的第三个发酵工程专业本科学士生（继季克良夫妇之后）。是季克良的嫡传弟子，曾在贵州茅台酒厂生产技术部工作十余年，是国家高级品酒师、中国酱香酒酿酒大师、贵州省省管专家。</span></span><br>
            <br>
            <span style="font-family: arial, helvetica, sans-serif; font-size: 16px;">&nbsp;&nbsp;</span><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">公司继承了茅台先辈们留传的酿酒工艺，引进先进的酿酒设备，依靠雄厚的技术力量，实施质量保证体系，严格管理。公司在多年的生产实践中积累和储畜了许多经验和技术，目前拥有植物埋藏陈酿法（专利号：ZL01123490.3）；酒糟窖酒法（专利号：ZL01108609.2）；白酒桑拿老熟法（专利申请号：200610076452.3）三项专利的自主知识产权。集团公司以专利绿色工艺“植物埋藏法”酿造的“贵州迎宾酒”“窖藏首酒”“国威酒”“老古董酒”等系列产品畅销国内外。2016年9月9日，集团公司系列产品“贵州迎宾酒”荣获贵州省十大名酒称号。</span></span><br>
            <br>
            <span style="font-family: arial, helvetica, sans-serif; font-size: 16px;">&nbsp;&nbsp;</span><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">随着集团公司的不断发展，公司在上级主管部门及有关部门、领导的大力支持下，坚持科学发展观，全面提高企业的市场竞争力，树立企业形象，扩大企业影响。与此同时，公司狠抓内部管理：一是建立健全各项规章制度。实行厂务公开，增强管理透明度，明确岗位职责，科室、车间、班组制定了管理制度，做到管理制定上墙，并严格执行，使公司各项管理有章可循，以制度管理，以制度管事，从而较好地促进了企业各项规章制度的开展。二是把好产品质量关。质量是企业的生命，公司始终把产品质量当成头等大事来抓，对员工进行质量意识培训、教育，从原材料购进到成品包装都进行的质量监控，不合格原材料不准入库，不合格的产品绝不出库。由于公司狠抓产品质量管理，二0一0年公司已通过ISO9001:2000国际质量管理体系认证。二0一二年获得二维码可追溯系统。三是坚持以市场为导向，诚信经营。信誉是企业的生命之本，树立“先卖信誉后卖产品”的全新发展理念。在生产经营过程中，诚实守信，无论遇到什么困难，宁可损失金钱，绝不丧失信誉，凡与客户签订的合同，均做到按时、保质、保量交付产品，履约率100%。二00二年至二0一六年被省、市工商行政管理局授予“守合同，生信用”的企业。四是加强安全生产。认真落实安全生产责任制，建立了以经理负责制安全生产管理体系，将安全责任明确到个人，建立健全了隐患排查分级管理制度，及时发现并消除安全隐患。加强安全生产教育，提高安全意识，确保无安全责任事故发生。<br>
		产品在市场的适销程度从产品进入市场情况来看，我们产品质量有保障，消费者接受程度相对教高。产品档次主要以中高档产品为主。</span></span><br>
            <br>
            <span style="font-family: arial, helvetica, sans-serif; font-size: 16px;">&nbsp;&nbsp;</span><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">同行和用户对我们产品的评价：同行的评价，首酒基酒+在市场上一定会成为区域的强势品牌；用户的评价，有实力、守信用。</span></span><br>
            <br>
            <span style="font-family: arial, helvetica, sans-serif; font-size: 16px;">&nbsp;&nbsp;</span><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">对客户的支持：我们主要先在当地配合经销商建立营销队伍，展开网点布局，拓建销售渠道，建设销售终端形象，提高终端张力，通过有步骤的开展市场推广，并且有步骤的进行市场渗透，逐步成为当地的强势品牌。</span></span><br>
            <br>
            <span style="font-family: arial, helvetica, sans-serif; font-size: 16px;">&nbsp;&nbsp;</span><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">产品经营发展战略：“首酒基酒+”将围绕核心区域市场、核心区域样板市场展开网络。坚持以“酒质稳定，口感和谐，品牌提升，集中优势，逐步渗透”为营销指导方针，做好打持久战的思想准备，采取“锁定区域，集中优势，稳扎稳打，逐步渗透”品牌扩张及营销方式，逐步成为行业中的强势品牌。<br>
		<br>
		首酒公司在未来五年把国内市场作为战略重点，并以“原生态酱香白酒”为经营方向，利用现有的产品资源，品牌优势，资金力量，逐步壮大自身实力，扩张营销网络，最终成为一个强势品牌，并愿与社会各界朋友共创辉煌。</span></span></div>
          <div style="text-align: center;" v-if="$route.query.name=='工艺原料'">
            <img alt="" :src="require('./asserts/raw/relative01.jpg')" style="width: 800px; height: 533px;">
            <img alt="" :src="require('./asserts/raw/relative02.jpg')" style="width: 800px; height: 533px;">
            <img alt="" :src="require('./asserts/raw/relative03.jpg')" style="width: 800px; height: 1118px;">
            <img alt="" :src="require('./asserts/raw/relative04.jpg')" style="width: 800px; height: 1199px;">
            <img alt="" :src="require('./asserts/raw/relative05.jpg')" style="width: 800px; height: 1199px;">
            <img alt="" :src="require('./asserts/raw/relative06.jpg')" style="width: 800px; height: 1199px;">
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
            name: '首酒简介',
            link: '/relative'
          },
          {
            name: '资质荣誉',
            link: '/relative'
          },
          {
            name: '专家团队',
            link: '/relative'
          },
          {
            name: '工艺原料',
            link: '/relative'
          },
          {
            name: '生产基酒',
            link: '/relative'
          },
          {
            name: '生产环境',
            link: '/relative'
          }
        ],
        newsInfo: {
          '资质荣誉': [],
          '专家团队': [],
          '生产基酒': [],
          '生产环境': [
            {
              pic: require('./asserts/relative01.jpg'),
              link: '',
              title: '酱香酒型酒委托生产【一】基地：贵州仁怀市茅',
              content: '酱香酒型酒委托生产【一】基地：贵州仁怀市茅台镇国酒社区...',
              postTime: '2019-03-05',
              clickNum: '84'
            },
            {
              pic: require('./asserts/relative02.jpg'),
              link: '',
              title: '董香型委托生产基地：贵州董酒股份有限公司 地',
              content: '董香型委托生产基地：贵州董酒股份有限公司 地址：贵州省遵义市汇川区董公寺镇杨帆路198号...',
              postTime: '2019-01-03',
              clickNum: '78'
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
        if (['首酒简介', '工艺原料'].indexOf(params) === -1) {
          this.listDatas = this.newsInfo[params]
        }
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
        display: flex;
        flex-direction: column;
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
          flex-grow: 1;
          border: 1px solid #e6e6e6;
          padding: 15px;
          &__relative-panel {
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
          &__intro-panel {

          }
        }
      }
    }
  }
</style>
