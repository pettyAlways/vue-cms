<template>
  <div class="custom-panel">
    <div class="custom-panel__header"></div>
    <div class="custom-panel__body">
        <div class="custom-panel__body__left">
          <div class="custom-panel__body__left__item" v-for="(item, index) in customInfo" :key="index">
            <div class="custom-panel__body__left__item__header">
              <span>{{item.title}}</span>
            </div>
            <div class="custom-panel__body__left__item__body">
              <div class="custom-panel__body__left__item__body__row" v-for="(tItem, index) in item.contents" :key="index">
                <div class="custom-panel__body__left__item__body__row__left">
                  <span>{{tItem.tag}}</span>
                </div>
                <div class="custom-panel__body__left__item__body__row__right">
                  <span>{{tItem.content}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="custom-panel__body__right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'custom',
    data() {
      return {
        customInfo: [
          {
            title: '以定制群体划分',
            contents: [
              {
                tag: '个人定制酒',
                content: '具有强烈的个人色彩，酒的品质、包装风格都符合个人的喜好，个人的姓名、祝福语等融进酒盒中，无论自享或送礼都是品位的象征。'
              },
              {
                tag: '企业定制酒',
                content: '企事业单位在经营或商务活动中为了提高或扩大其知名度，提高产品的市场占有率，获取更高销售业绩和利润而特别定制，带有企事业标志，酒中融入了企业文化元素，是企业品牌形象的生动体现，是企业的一扇窗口，有良好的实用价值。'
              },
              {
                tag: '社会团体定制酒',
                content: '酒中融入团体理念等元素，是社会团体联谊、交流等活动的良好信使。'
              }
            ]
          },
          {
            title: '以定制用途划分',
            contents: [
              {
                tag: '庆典定制',
                content: '企业大型庆典，一瓶举世无双的定制酒升华企业内涵，让每一个人铭记在心。'
              },
              {
                tag: '婚庆定制',
                content: '新人婚礼盛宴，一瓶配有新人照片、名字图案的个性定制酒，营造浪漫氛围，让每一个人感受真爱。'
              },
              {
                tag: '赠礼定制',
                content: '公司机构答谢客户，一瓶无可比拟的定制酒，彰显公司服务之道，让每一位客户心满意足。'
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .custom-panel {
    width: 960px;
    height: 577px;
    padding: 15px;
    background: url("./asserts/custom-bg.jpg");
    &__header {
      height: 100px;
      margin-bottom: 15px;
    }
    &__body {
      display: flex;
      flex-direction: row;
      &__left {
        &__item {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          &__header {
            height: 33px;
            width: 141px;
            margin-bottom: 15px;
            font-family: 微软雅黑;
            font-size: 15px;
            color: rgb(229, 0, 18);
            line-height: 33px;
            text-align: center;
            background: url("./asserts/tag-bg.jpg");
          }
          &__body {
            &__row {
              display: flex;
              flex-direction: row;
              margin-bottom: 15px;
              align-items: start;
              &__left {
                height: 26px;
                width: 116px;
                flex-shrink: 0;
                font-family: 微软雅黑;
                font-size: 13px;
                color: white;
                text-align: center;
                line-height: 26px;
                background: url("./asserts/tg01-bg.jpg");
              }
              &__right {
                flex-grow: 1;
                padding-left:20px;
                color:#474747;
                font-size: 13px;
                font-family:'微软雅黑'
              }
            }
          }
        }
      }
      &__right {
        width: 35%;
        flex-shrink: 0;
      }

    }
  }
</style>
