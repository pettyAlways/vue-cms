<template>
  <div class="article-editor w1200">
    <div class="article-editor__header">
      <span class="title">标题</span>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div class="article-editor__body" :style="{ height: visiableHeight + 'px' }">
      <my-tinymce style="height: 100%"></my-tinymce>
    </div>
  </div>

</template>

<script>
  import { clientVisiable } from '@/utils/compatibility'
  export default {
    name: 'articleEditor',
    data() {
      return {
        visiableHeight: ''
      }
    },
    components: {
      myTinymce: () => import('@/components/my-tinymce')
    },
    mounted() {
      this.visiableHeight = clientVisiable().height - 245
    }
  }
</script>

<style lang="scss" scoped>
  .article-editor {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    height: 100%;
    background: #fff;
    &__header {
      height: 60px;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .title {
        flex-shrink: 0;
        margin-right: 15px;
        font-size: 16px;
        font-weight: 700;
        background-color: white;
      }
    }
    &__body {
    }
  }
</style>
