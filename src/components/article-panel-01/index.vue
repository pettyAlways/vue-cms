<template>
  <div class="article-panel">
    <div class="article-panel--left">
      <div class="article-panel__header">
        <slot name="title">{{title}}</slot>
      </div>
      <div class="article-panel__tip">
        <slot name="tipPanel"></slot>
      </div>
      <div class="article-panel__body">
        <slot name="content">{{content}}</slot>
      </div>
    </div>
    <div class="article-panel--right" v-if="true">
      <img :src="img">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'articlePanel',
    props: {
      title: String,
      content: String,
      img: String
    }
  }
</script>

<style lang="scss" scoped>
  .article-panel {
    display: flex;
    justify-content: space-between;
    height: 130px;
    padding: 15px 10px;
    border-bottom: 1px dotted #e6e6e6;
    &--left {
      flex-grow: 1;
    }
    &__header {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 400;
      color: #333;
    }
    &__tip {

    }
    &__body {
      font-size: 13px;
      color: #777;
    }
    &--right {
      flex-shrink: 0;
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
    }
  }
</style>
