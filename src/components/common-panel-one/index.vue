<template>
  <div class="custom-panel">
    <div class="custom-panel__header">
      <div class="custom-panel__header--left">
        <div class="custom-panel__header__title">
          {{title}}
        </div>
      </div>
      <div class="custom-panel__header--right">
        <slot name="more"><el-image :src="require('../../assets/more2.jpg')"></el-image></slot>
      </div>
    </div>
    <div class="custom-panel__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'commonPanelOne',
    props: {
      title: String
    }
  }
</script>

<style lang="scss" scoped>
  .custom-panel {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e6e6e6;
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
    &__body {
      padding: 0px 10px;
      border-bottom: 1px solid #e6e6e6;
      overflow: hidden;
    }

  }
</style>
