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
            <el-breadcrumb-item :to="{path: '/brand', query: {name: '贴牌政策'}}">首酒贴牌</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="common-page__panel__center__main">
          <div class="jiuzhuang" v-if="$route.query.name=='贴牌政策'">
            <span style="font-size:14px;">&nbsp;白酒定制合作方案</span>
            <div>
              &nbsp;</div>
            <div>
              <span style="font-size:14px;">&nbsp; &nbsp; &nbsp; &nbsp;茅台镇美酒，享誉天下。品茅台镇美酒，享白酒芬芳。茅台镇的美酒给人一种生活的享受，若是可以贴牌开发一个白酒子品牌，或者定制一款属于个人、属于机关单位的唯一的，不可复制的专用酒，那又是对茅台镇美酒另一番体验。&nbsp;</span></div>
            <div>
              <span style="font-size:14px;">白酒贴牌定制趋势</span></div>
            <div>
              <span style="font-size:14px;">&nbsp; &nbsp; &nbsp; &nbsp;现阶段，白酒贴牌模式正从粗放型经营管理阶段向品牌价值创新和商业模式升级并行驱动发展阶段迈进，白酒贴牌模式绝不会消失。在全国的市场背景下，有着数量庞大的消费群体，有着越来越个性化的消费需求，从而又衍生出一种新的生产模式--个性定制。个性定制更贴近于个体的独特需求，更是企业文化独到之处的最好的宣传。</span></div>
            <div>
              <span style="font-size:14px;">&nbsp; &nbsp; &nbsp; &nbsp;贵州首酒集团为顺应市场的发展趋势，新增白酒贴牌和个性定制服务，解放大众传统购酒选酒的模式，满足大众个性化的消费需求。白酒贴牌定制同时也是企业发展的一个助力，是一个企业彰显实力和自我的一个平台。这是企业对外宣传的一条新颖途径。</span></div>
            <div style="text-align: center;">
              <img alt="" :src="require('./asserts/pic01.jpg')"></div>
            <div>
              <span style="font-size:14px;">1、白酒贴牌或OEM开发</span></div>
            <div>
              <span style="font-size:14px;">&nbsp; &nbsp; &nbsp; &nbsp;随着经济全球化发展趋势的进一步加快，白酒OEM贴牌发展空间也会随之扩大。通过贴牌模式，贴牌商可以借助厂商的品牌优势进一步抢占市场份额。贴牌开发一款自己的个性品牌，开启自己的财富春天。</span><br>
              &nbsp;</div>
            <div>
              <span style="font-size:14px;">2、白酒定制 一瓶起订 十天交货</span></div>
            <div>
              <span style="font-size:14px;">（1）以定制群体划分</span></div>
            <div>
              <span style="font-size:14px;">个人定制酒：具有强烈的个人色彩，酒的品质、包装风格都符合个人的喜好，个人的姓名、祝福语等融进酒盒中，无论自享或送礼都是品位的象征。</span></div>
            <div>
              <span style="font-size:14px;">企业定制酒：企事业单位在经营或商务活动中为了提高或扩大其知名度，提高产品的市场占有率，获取更高销售业绩和利润而特别定制，带有企事业标志，酒中融入了企业文化元素，是企业品牌形象的生动体现，是企业的一扇窗口，有良好的实用价值。</span></div>
            <div>
              <span style="font-size:14px;">社会团体定制酒：酒中融入团体理念等元素，是社会团体联谊、交流等活动的良好信使。</span></div>
            <div>
              <span style="font-size:14px;">（2）以定制用途划分</span></div>
            <div>
              <span style="font-size:14px;">庆典定制：企业大型庆典，一瓶举世无双的定制酒升华企业内涵，让每一个人铭记在心。</span></div>
            <div>
              <span style="font-size:14px;">婚庆定制：新人婚礼盛宴，一瓶配有新人照片、名字图案的个性定制酒，营造浪漫氛围，让每一个人感受真爱。</span></div>
            <div>
              <span style="font-size:14px;">赠礼定制：公司机构答谢客户，一瓶无可比拟的定制酒，彰显公司服务之道，让每一位客户心满意足。</span></div>
            <div>
              <span style="font-size:14px;">寿宴定制酒、满月定制酒、生日定制酒等</span></div>
            <div>
              &nbsp;</div>
            <div style="text-align: center;">
              <span style="font-size:14px;"><img alt="" :src="require('./asserts/pic02.jpg')"></span></div>
            <div>
              <span style="font-size:14px;">白酒贴牌托管方案</span></div>
            <div>
              <span style="font-size:14px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
            <div>
              <span style="font-size:14px;">二、代加工</span></div>
            <div>
              <span style="font-size:14px;">A.产品商标、包装由客户提供，贵州首酒酒业集团负责酒水提供。</span></div>
            <div>
              <span style="font-size:14px;">B.商标由客户提供，包装由首酒酒业负责设计，双方满意后达成协议，开始生产。</span></div>
            <div>
              <span style="font-size:14px;">C.产品开发买断：商标、为首酒酒业的子品牌，包装由首酒酒业负责设计，双方满意后达成协议，开始生产。</span><br>
              &nbsp;</div>
            <div>
              <span style="font-size:14px;">三、关于酒水价格</span></div>
            <div>
              <span style="font-size:14px;">A.公司提供100个样酒共客户选择。样酒价位从10~680不等。（为保护客户利益，酒水价格为裸价）</span></div>
            <div>
              <span style="font-size:14px;">B.也可由客户提供酒样，首酒酒业根据酒样进行勾兑。</span></div>
            <div>
              <span style="font-size:14px;">C.客户提供价格，首酒酒业根据客户提供价格进行勾兑。</span><br>
              &nbsp;</div>
            <div>
              <span style="font-size:14px;">四、关于数量</span></div>
            <div>
              <span style="font-size:14px;">A.一个贴牌单品,根据不同条码不同的包装形态有不同的起定量。</span></div>
            <div>
              <span style="font-size:14px;">B.个性定制酒起订数量及其余各种特殊的情况，均可电话咨询将为您详细答复。</span></div>
            <div>
              &nbsp;</div>
            <div>
              <span style="font-size:14px;">如果您想尝试一种全新的价值体验，请与我们联系，我们会根据您的需要，向您奉献超乎想象的惊喜与满足。我们的白酒贴牌定制热线是：400-861-7998。期待您的来电，我们将竭诚为您服务！</span></div>
            <div>
              &nbsp;</div>
          </div>
          <div class="common-page__panel__center__main__brand-panel" v-if="$route.query.name=='贴牌案例'">
            <div>
              <el-badge value="热">
                <div class="common-page__panel__center__main__brand-panel__policy">
                  <div class="common-page__panel__center__main__brand-panel__policy__item">
                    <el-image :src="require('./asserts/policy.png')" style="width:250px;"></el-image>
                    <div class="common-page__panel__center__main__brand-panel__policy__item__content">
                      <a>贴牌案例</a>
                      <p>白金封坛酒</p>
                    </div>
                    <div class="common-page__panel__center__main__brand-panel__policy__item__extra">
                      <span>时间：2019-04-27</span>
                      <span>点击：88</span>
                    </div>
                  </div>
                </div>
              </el-badge>
            </div>
            <div class="common-page__panel__center__main__brand-panel__pagination">
              <el-pagination
                :page-size="20"
                :pager-count="11"
                layout="prev, pager, next"
                :total="1000">
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
    name: 'brand',
    data() {
      return {
        showData: [
          {
            name: '贴牌政策',
            link: '/brand'
          },
          {
            name: '贴牌案例',
            link: '/brand'
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
      goHandler(item) {
        this.$router.push({ path: item.link, query: { name: item.name } })
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
          &__brand-panel {
            pading: 15px;
            /deep/ .el-badge__content {
              border-radius: 50%;
              font-size: 12px;
              height: 30px;
              width: 30px;
              line-height: 30px;
              &.is-fixed {
                right: 25px;
                top: 10px;
              }
            }
            &__policy {
              display: flex;
              &__item {
                display: flex;
                flex-direction: column;
                border: 1px solid #e4e4e4;
                margin: 10px;
                &__content {
                  opacity: 0.3;
                  filter: alpha(opacity=30);
                  a {
                    display: block;
                    font-size: 16px;
                    line-height: 30px;
                    color: #ffffff;
                    background: #000000;
                  }
                }
                &__extra {
                  display: flex;
                  justify-content: space-between;
                  color: #b2b2b2;
                  padding: 5px;
                  span {
                    display: block;
                    height: 28px;
                    line-height: 28px;
                  }
                }
              }
            }
            &__pagination {
              display: flex;
              justify-content: center;
            }
          }
        }
      }
    }
  }
</style>
