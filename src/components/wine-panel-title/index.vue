<template>
  <div class="wine-panel" :style="{'width': width, 'height':height}">
    <div class="wine-panel__title">
      <div>{{title}}</div>
    </div>
    <div class="wine-panel__note">
      <span>{{note}}</span>
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
    border-bottom: 2px solid #cc9966;
    &__title {
      color: #323232;
      font-size: 18px;
      font-weight: bold;
    }
    &__note {
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      color: #cbcbcb;
    }
  }
</style>
