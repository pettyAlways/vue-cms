<template>
  <div class="custom-panel">
    <div class="custom-panel__header" :style="hStyle">
      <div class="custom-panel__header--left">
        <div class="custom-panel__header__title">
          {{title}}
        </div>
      </div>
      <div class="custom-panel__header--right">
        <slot name="more"><el-image :src="require('../../assets/more2.jpg')"></el-image></slot>
      </div>
    </div>
    <slot name="body"></slot>
  </div>
</template>

<script>
  export default {
    name: 'commonPanelTwo',
    props: {
      shadow: {
        type: String,
        default: 'never'
      },
      hStyle: Object,
      title: String,
      bStyle: {
        type: Object,
        default: () => ({padding: '0px'})
      }
    },
    data() {
      return {
        bodyStyle: this.bStyle
      }
    }
  }
</script>

<style lang="scss" scoped>
  .custom-panel {
    display: flex;
    flex-direction: column;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      line-height: 40px;
      &__title {
        margin-right: 15px;
        font-size: 16px;
        font-weight: 700;
        color: #323232;
      }
      &--left {
        display: inline-flex;
        align-items: center;
      }
      &--right {
        font-size: 14px;
      }
    }
  }
</style>
