<template>
  <div class="news-panel">
    <div class="news-panel__header" :style="hStyle">
      <div class="title">{{title}}</div>
      <slot name="more"><div class="btn"><a>更多</a></div></slot>
    </div>
    <div class="news-panel__body" :style="bStyle">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'commonPanelTwo',
    props: {
      hStyle: Object,
      title: String,
      bStyle: {
        type: Object,
        default: () => ({padding: '10px 15px'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .news-panel {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #e6e6e6;
      .title {
        font-size: 18px;
        font-weight: 700;
        color: #323232;
      }
      .btn {
        color: #999;
        font-weight: 400;
        a {
          cursor: pointer;
          &:hover {
            color: #259;
          }
        }
      }
    }
    &__body {
      margin-top: 10px;
      min-height: 180px;
    }
  }
</style>
