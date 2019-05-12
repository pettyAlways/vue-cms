<template>
  <div class="franchise-panel">
    <div class="franchise-panel__header">
      <wine-panel-title width="160px" height="40px" title="开源作品" note="Open Source"></wine-panel-title>
    </div>
    <div class="franchise-panel__body">
      <div class="franchise-panel__body__left">
        <div class="franchise-panel__body__left__item">
          <div class="franchise-panel__body__left__item__title-panel">
            {{showData.leftTitle}}
          </div>
          <div class="franchise-panel__body__left__item__content">
            <div class="franchise-panel__body__left__item__content__li" v-for="(item, index) in showData.leftList" :key="index">
              {{item}}
            </div>
          </div>
          <div class="franchise-panel__body__left__item__icons">
            <a><el-image :src="require('./asserts/commons.jpg')" style="width:50px;height:50px;"></el-image></a>
            <a><el-image :src="require('./asserts/person.jpg')" style="width:50px;height:50px;"></el-image></a>
          </div>
        </div>
      </div>
      <div class="franchise-panel__body__center">
        <el-image :src="showData.centerPic" style="width:552px;height:322px;"></el-image>
      </div>
      <div class="franchise-panel__body__right">
        <div class="franchise-panel__body__right__item" :class="{'active': item.show}" v-for="(item, index) in typeList" :key="index" @mouseenter="autoHandler(item)">
          <div class="franchise-panel__body__right__item--left">{{item.name}}</div>
          <span class="franchise-panel__body__right__item--right">{{item.english}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'franchise',
    data() {
      return {
        typeList: [
          {
            id: 'condition',
            name: '后台权限模版',
            english: 'ENDPONIT',
            show: true
          },
          {
            id: 'time',
            name: '前端权限模版',
            english: 'FROMEND',
            show: false
          },
          {
            id: 'advantage',
            name: '个人博客',
            english: 'BLOG',
            show: false
          },
          {
            id: 'location',
            name: '首酒官网',
            english: 'WINE',
            show: false
          }
        ],
        showData: {
          name: '后台权限模版',
          english: 'ENDPONIT',
          centerPic: require('./asserts/condition.jpg'),
          leftTitle: '后台权限模版',
          leftList: [
            '1. 具有相应的人脉资源以及社会活动能力。',
            '2. 具有相应的资金投资保障。城市展厅首批货30-50万；酒类城市综合体100-150 万。'
          ]
        },
        franchiseInfo: {
          condition: {
            name: '托管条件',
            english: 'Franchise conditions',
            centerPic: require('./asserts/condition.jpg'),
            leftTitle: '后台权限模版',
            leftList: [
              '1. 使用springboot、jpa、shiro框架基于java开发的后台系统',
              '2. 网站预览地址http://www.thinkover.fun'
            ]
          },
          time: {
            name: '托管事件',
            english: 'Support policy',
            centerPic: require('./asserts/time.jpg'),
            leftTitle: '托管服务时间',
            leftList: [
              '厂家专家团队服务时间为一年。'
            ]
          },
          advantage: {
            name: '托管服务形式',
            english: 'Franchise advantage',
            centerPic: require('./asserts/advantage.jpg'),
            leftTitle: '托管基本条件',
            leftList: [
              '在当地举办大型品鉴会，为合作伙伴搭建渠道。 厂家全额投资当地的大型品鉴会，包括所需的策划费用，场地布置费用，酒水费。 全程免费提供商品管理服务。 全程免费提供营销策划和市场指导。'
            ]
          },
          location: {
            name: '托管服务保障',
            english: 'Main Store Location',
            centerPic: require('./asserts/location.jpg'),
            leftTitle: '托管基本条件',
            leftList: [
              '厂家若在托管服务期内未能实现上述全额动销，托管商有权提前解除经销合同！ 厂家保障托管商在托管区域的独家经营权。 如果厂家未在六个月内实现首批货的动销，剩余的货托管商可返还厂家，同时，厂家还要补偿首批货百分之十的违约金。'
            ]
          }
        }
      }
    },
    components: {
      'winePanelTitle': () => import('@/components/wine-panel-title'),
      'autoScroll': () => import('@/components/auto-scroll')
    },
    methods: {
      autoHandler(item) {
        for (let type of this.typeList) {
          type.show = false
        }
        item.show = true
        this.showData = this.franchiseInfo[item.id]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .franchise-panel {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    &__header {
      margin-bottom: 20px;
    }
    &__body {
      display: flex;
      flex-direction: row;
      align-items: center;
      &__left {
        display: flex;
        flex-direction: column;
        background: #f1f1f1;
        width: 934px;
        height: 322px;
        padding-right: 15px;
        &__item {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding-left: 20px;
          padding-top: 40px;
          &__title-panel {
            flex-shrink: 0;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            color: #676767;
            text-align: left;
            border-bottom: 4px solid #676767;
            font-weight: bold;
            text-align: center;
          }
          &__content {
            flex-grow: 1;
            padding-top: 10px;
            margin-bottom: 20px;
            &__li {
              margin-bottom: 10px;
              color: #333;
              font-size: 14px;
            }
          }
          &__icons {
            flex-shrink: 0;
            height: 50px;
            align-self: flex-end;
            margin-right: 30px;
            margin-bottom: 30px;
          }
        }
      }
      &__center {
        width: 552px;
        height: 322px;
        background: #ffffff;
      }
      &__right {
        width: 266px;
        height: 322px;
        .active {
          background: url("./asserts/item-hover-bg.jpg");
          color: white;
        }
        &__item {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 266px;
          height: 75px;
          color: #676767;
          margin-bottom: 10px;
          padding-left: 35px;
          background: url("./asserts/item-bg.jpg");
          &:hover {
            background: url("./asserts/item-hover-bg.jpg");
            color: white;
          }
          &--left {
            font-size: 16px;
            font-weight: bold;
            margin-right: 10px;
          }
          &--right {
            font-size: 12px;
            font-family: Arial, Helvetica, sans-serif;
          }
        }
      }
    }
  }
</style>
