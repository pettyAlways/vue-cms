<template>
  <div class="custom-panel">
    <div class="custom-panel__header">
      <div class="custom-panel__header--left">
        <div class="custom-panel__header--left__chinese">
          {{title}}
        </div>
        <div class="custom-panel__header--left__english">
          {{note}}
        </div>
      </div>
      <div class="custom-panel__header--right">
        <slot name="more"><el-image :src="require('../../assets/more2.jpg')" style="height: 40px"></el-image></slot>
      </div>
    </div>
    <div class="custom-panel__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'customCard01',
    props: {
      title: '',
      note: ''
    }
  }
</script>

<style lang="scss" scoped>
  .custom-panel {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #e6e6e6;
      &--left {
        display: inline-flex;
        align-items: center;
        color: #323232;
        font-size: 16px;
        font-weight: 400;
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
        font-size: 16px;
      }
    }
    &__body {
      padding: 10px 15px;
      overflow: hidden;
    }

  }
</style>
