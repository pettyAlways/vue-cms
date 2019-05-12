<template>
  <div class="wine-panel" :style="{'height':height}">
    <div class="wine-panel--left">
      <div class="wine-panel--left__chinese">
        {{title}}
      </div>
      <div class="wine-panel--left__english">
        {{note}}
      </div>
    </div>
    <div class="wine-panel--right">
      <el-image :src="require('../../assets/more2.jpg')"></el-image>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'winePanelTitle',
    props: {
      width: String,
      height: String,
      title: '',
      note: ''
    }
  }
</script>

<style lang="scss" scoped>
  .wine-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--left {
      display: inline-flex;
      align-items: center;
      color: #323232;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 2px solid #cc9966;
      &__chinese {
        margin-right: 15px;
      }
      &__english {
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
        color: #cbcbcb;
      }
    }
    &--right {

    }
  }
</style>
