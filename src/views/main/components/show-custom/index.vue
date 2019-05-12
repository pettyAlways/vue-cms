<template>
  <div class="custom-panel">
    <div class="custom-panel__header">
      <wine-panel-title width="160px" height="40px" title="网站定制" note="CUSTOM"></wine-panel-title>
    </div>
    <div class="custom-panel__body">
      <div class="custom-panel__body__content">
        白酒定制合作方案 茅台镇美酒，享誉天下。品茅台镇美酒，享白酒芬芳。茅台镇的美酒给人一种生活的享受，若是可以贴牌开发一个白酒子品牌，或者定制一款属于个人、属于机关单位的唯一的，不可复制的专用酒，那又是对茅台镇美酒另一番体验。 白酒贴牌定制趋势 现阶段，白酒贴牌模式正从粗放型经营管理阶段向品牌价值创新和商业模式升级并行驱动发展阶段迈进，白酒贴牌模式绝不会消失。在全国的市场背景下，有着数量庞大的消费群体，有着越来越个性化的消费需求，从而又衍生出一种新的生产模式--个性定制。个性定制更贴近于个体的独特需求，更是企业文化独到之处的最好的宣传。 ......
      </div>
      <div class="custom-panel__body__btn">
        <a>贴牌定制</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'custom',
    data() {
      return {
      }
    },
    components: {
      'winePanelTitle': () => import('@/components/wine-panel-title'),
      'autoScroll': () => import('@/components/auto-scroll')
    }
  }
</script>

<style lang="scss" scoped>
  .custom-panel {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    &__header {
      margin-bottom: 20px;
    }
    &__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__content {
       font-size: 15px;
      }
      &__btn {
        margin-top: 15px;
        height: 32px;
        width: 100px;
        line-height: 30px;
        border: 1px solid #b7642a;
        border-radius: 3px;
        font-size: 15px;
        text-align: center;
        a {
          display: block;
        }
        &:hover {
          background: #b7642a;
          color: #FFF;
          border: 2px solid #b7642a;
        }
      }
    }
  }
</style>
