<template>
  <div class="wine-border-panel">
    <div class="wine-border-panel__header">
      <div class="wine-border-panel__header--left">{{title}}</div>
      <div class="wine-border-panel__header--right">{{english}}</div>
    </div>
    <div class="wine-border-panel__body">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'wineBorderPanel',
    props: {
      title: String,
      english: String,
      height: '100%'
    }
  }
</script>

<style lang="scss" scoped>
  .wine-border-panel {
    position: relative;
    border: 1px solid #f2f2f2;
    padding: 20px 9px;
    min-height: 200px;
    &__header {
      display: flex;
      align-items: center;
      position: absolute;
      left: 60px;
      top: -18px;
      margin: 0px 10px;
      background: #ffffff;
      overflow: hidden;
      &--left {
        height: 36px;
        margin-right: 10px;
        font-size: 17px;
        color: #c5995a;
        line-height: 36px;
      }
      &--right {
        height: 36px;
        font-size: 10px;
        font-family: Arial, Helvetica, sans-serif;
        color: #c5995a;
        line-height: 40px;
      }
    }
    &__body {

    }
  }
</style>
