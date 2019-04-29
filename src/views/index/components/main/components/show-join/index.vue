<template>
  <div class="join-panel">
    <div class="join-panel__left">
      <div class="join-panel__left__header">
        <span>{{joinInfo.flow.title}}</span>
      </div>
      <div class="join-panel__left__body">
        <ul>
          <li v-for="(item, index) in joinInfo.flow.datas" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
    <div class="join-panel__right">
      <div class="join-panel__right__header">
        <span>{{joinInfo.honor.title}}</span>
      </div>
      <div class="join-panel__right__body">
        <el-carousel height="450px" indicator-position="none" arrow="never">
          <el-carousel-item v-for="(item, index) in joinInfo.honor.pics" :key="index">
            <div class="join-panel__right__body__row">
              <div class="join-panel__right__body__row__item" v-for="(tItem, index) in item" :key="index">
                <a href="" :title="tItem.tip"><el-image :src="tItem.pic"></el-image></a>
                <span>{{tItem.title}}</span>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'join',
    data() {
      return {
        joinInfo: {
          flow: {
            title: '加盟流程',
            datas: [
              '客户前期咨询',
              '资格审核',
              '实地商圈调查',
              '签订正式合同',
              '店面装修及前期筹备',
              '装修验收及证照办理',
              '人员培训',
              '开店前筹备',
              '开业'
            ]
          },
          honor: {
            title: '荣誉资质',
            pics: [
              [
                {
                  pic: require('./asserts/carousel01.jpg'),
                  title: '中国食文化优秀企业',
                  tip: '中国食文化优秀企业'
                },
                {
                  pic: require('./asserts/carousel02.jpg'),
                  title: '全国诚信守法乡镇企业',
                  tip: '全国诚信守法乡镇企业'
                }
              ],
              [
                {
                  pic: require('./asserts/carousel03.jpg'),
                  title: '贵州省金凤杯奖',
                  tip: '贵州省金凤杯奖'
                },
                {
                  pic: require('./asserts/carousel04.jpg'),
                  title: '第五届全国乡镇企业家',
                  tip: '第五届全国乡镇企业家'
                }
              ],
              [
                {
                  pic: require('./asserts/carousel05.jpg'),
                  title: '第四届全国乡镇企业家',
                  tip: '第四届全国乡镇企业家'
                },
                {
                  pic: require('./asserts/carousel06.jpg'),
                  title: '贵州省模范职工之家',
                  tip: '贵州省模范职工之家'
                }
              ],
              [
                {
                  pic: require('./asserts/carousel07.jpg'),
                  title: '贵州ＡＡＡ级信用单位',
                  tip: '贵州ＡＡＡ级信用单位'
                },
                {
                  pic: require('./asserts/carousel08.jpg'),
                  title: 'A级纳税信用企业',
                  tip: 'A级纳税信用企业'
                }
              ]
            ]
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .join-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    &__left {
      flex-grow: 1;
      background: url("./asserts/join-bg.jpg") no-repeat;
      background-size: cover;
      margin-right: -1px;
      width: 586px;
      height: 500px;
      &__header {
        margin-top: 15px;
        margin-left: 50px;
        color: #ffe500;
        font-size: 16px;
        font-family: "微软雅黑";
      }
      &__body {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-family: Arial, 宋体;
        font-size: 13px;
        ul {
          list-style: none;
          margin-top: 56px;
          margin-right: 60px;
          li {
            color: #ffe500;
            height: 41px;
          }
        }
      }
    }
    &__right {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: 334px;
      height: 500px;
      background: url("./asserts/right-bg.jpg") no-repeat;
      background-size: cover;
      &__header {
        margin-top: 15px;
        margin-left: 50px;
        color: #ffe500;
        font-size: 16px;
        font-family: "微软雅黑";
      }
      &__body {
        flex-grow: 1;
        margin-top: 30px;
        &__row {
          display: flex;
          flex-direction: column;
          text-align: center;
          &__item {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
            span {
              margin-top: 10px;
              color: #ffa800;
              font: 13px/1.5 Arial 宋体
            }
          }
        }
      }
    }
  }
</style>
