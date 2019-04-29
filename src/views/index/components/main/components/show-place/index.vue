<template>
  <div class="produce-place">
    <div class="produce-place__header">
      <el-image :src="placeInfo.header.pic" style="width:100%"></el-image>
    </div>
    <div class="produce-place__body">
      <el-row class="produce-place__body_location" type="flex" justify="space-between">
        <el-col :span="12">
          <div class="produce-place__body_location__title">
            <el-row type="flex" align="middle">
              <el-image :src="placeInfo.location.locaTitle.pic"></el-image>
              <p style="text-align: center; margin-left:10px">{{placeInfo.location.locaTitle.title}}</p>
            </el-row>
          </div>
          <div class="produce-place__body_location__content">
            <ul>
              <li v-for="(item, index) in placeInfo.location.locaPlace" :key="index">
                <div class="title">
                  <el-image :src="ulPic"></el-image>
                  <span>{{item.title}}</span>
                </div>
                <div class="content">
                  <p>{{item.content}}</p>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="center">
            <el-image :src="placeInfo.location.locationMap.pic"></el-image>
          </el-row>
        </el-col>
      </el-row>
      <div class="produce-place__body_quality">
        <el-row>
          <el-col :span="12">
            <el-row type="flex" justify="center" align="middle">
              <el-image :src="placeInfo.quality.leftPic"></el-image>
            </el-row>

          </el-col>
          <el-col :span="12">
            <div class="produce-place__body_quality__title">
              <el-image :src="placeInfo.quality.rightPic"></el-image>
              <span>{{placeInfo.quality.rightTitle}}</span>
            </div>
            <div class="produce-place__body_quality__content">
              <ul>
                <li  v-for="(item, index) in placeInfo.quality.content" :key="index">
                  <el-image :src="ulPic" style="width:14px;height:13px;flex-shrink:0;margin-top: 5px;"></el-image>
                  <p class="content">{{item}}</p>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="produce-place__footer">
      <div class="produce-place__footer__honor">
        <el-row>
          <el-col :span="12">
            <div class="produce-place__footer__honor__title">
              <el-image :src="placeInfo.honor.leftPic"></el-image>
              <span>{{placeInfo.honor.title}}</span>
            </div>
            <div class="produce-place__footer__honor__content">
              <ul>
                <li v-for="(item, index) in placeInfo.honor.content" :key="index">
                  <el-image :src="ulPic"  style="width: 14px;height:13px;flex-shrink:0;margin-top: 5px;"></el-image>
                  <p class="content">{{item}}</p>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" justify="center">
              <el-image :src="placeInfo.honor.rightPic" style="width: 412px;height:217px;margin-top: 20px;"></el-image>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        ulPic: require('./asserts/ul-index.png'),
        placeInfo: {
          header: {
            pic: require('./asserts/place-header.jpg')
          },
          location: {
            locaTitle: {
              pic: require('./asserts/place-footer-title.png'),
              title: '三大生产基地'
            },
            locationMap: {
              pic: require('./asserts/place-map.png')
            },
            locaPlace: [
              {title: '茅台酿酒基地', content: '位于茅台镇怀庄路009号，公司第四代厂房建于二零零三年，属公司酱香型酒酿造基地'},
              {title: '合马桃坪酿酒基地', content: '占地121.82亩，建筑面积81214平方米，年产大曲酱香5000吨。'},
              {title: '坛厂包装仓储基地', content: '占地118.93亩，建筑面积46985平方米。'}
            ]
          },
          quality: {
            leftPic: require('./asserts/place-footer.png'),
            rightPic: require('./asserts/place-footer-title.png'),
            rightTitle: '先进生产设备，质量有保证',
            content: [
              '怀庄酒业拥有28名国家级调酒师、15名质检工程师、300名蒸馏高级技师。',
              '拥有先进的现代化灌醉生成线，每年包装量可达10000吨。',
              '有实力根据市场需求开发出各种口感、味道、香型纯粮白酒；现代化生产，产品有保证。',
              '传承茅台酱香工艺、遵循古法、天地同酿。端午踩曲，重阳投料，九次蒸煮，八次发酵，七次取酒，高温制曲，高温蒸馏，高温取酒。于岁月历练沉淀中，静静老熟，日臻完善。'
            ]
          },
          honor: {
            title: '荣誉资质',
            leftPic: require('./asserts/place-footer-title.png'),
            rightPic: require('./asserts/place-honor.png'),
            content: [
              '怀庄集团先后被评为遵义市五强白酒企业、仁怀市十强民营企业、仁怀市十强民营品牌企业、仁怀市“十一五”工业十强民营企业。',
              '拥有先进的现代化灌醉生成线，每年包装量可达10000吨。',
              '中华人民共和国农业部授予怀庄集团全国诚信守法乡镇企业荣誉称号；中共贵州省委、贵州省人民政府5次授予精神文明建设工作先进单位和先进企业称号。'
            ]
          }

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .produce-place {
    margin-top: 10px;
    &__body {
      background: url("./asserts/place-body.jpg") no-repeat;
      background-size: 100%;
      &_location {
        &__title {
          height: 48px;
          margin-left: 20px;
          font-size: 24px;
          color: #e50012;
          font-family: "微软雅黑";
          font-weight: bold;
          background: url("./asserts/place-title-line.png") bottom repeat-x;
        }
        &__content {
          margin-top: 10px;
          margin-left: 20px;
          ul {
            padding: 0px;
            list-style: none;
            .title {
              font-size: 14px;
              color: #e50012;
              line-height: 14px;
              font-family: "微软雅黑";
              font-weight: bold;
            }
            .content {
              padding-top: 10px;
              padding-bottom: 10px;
              color: #6a6a6a;
              padding-left: 20px;
              font: 16px/1.5 Arial,"宋体";
            }
          }
        }
      }
      &_quality {
        background: url("./asserts/quality-bg.jpg") no-repeat;
        background-size: 100%;
        &__title {
          height: 48px;
          font-size: 24px;
          color: #e50012;
          font-family: "微软雅黑";
          font-weight: bold;
          background: url("./asserts/place-title-line.png") bottom repeat-x;
        }
        &__content {
          ul {
            padding: 0px;
            list-style: none;
            li {
              display: flex;
              flex-direction: row;
              margin-top: 10px;
            }
            .content {
              padding-left: 10px;
              font: 16px/1.5 Arial,"宋体";
            }
          }
        }
      }
    }
    &__footer {
      background: url("./asserts/honor-bg.jpg") no-repeat;
      background-size: 100%;
      margin-bottom: 10px;
      padding-bottom: 40px;
      &__honor {
        padding: 20px 0px 20px 20px;
        &__title {
          height: 48px;
          font-size: 24px;
          color: #e50012;
          font-family: "微软雅黑";
          font-weight: bold;
          background: url("./asserts/place-title-line.png") bottom repeat-x;
        }
        &__content {
          ul {
            padding: 0px;
            list-style: none;
            li {
              display: flex;
              flex-direction: row;
              margin-top: 10px;
            }
            .content {
              padding-left: 10px;
              font: 16px/1.5 Arial,"宋体";
            }
          }
        }
      }
    }
  }
</style>
