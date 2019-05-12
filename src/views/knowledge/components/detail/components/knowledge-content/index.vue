<template>
  <div class="knowledge-content">
    <div class="knowledge-content__header">
      <ul>
        <li>
          <i class="el-icon-notebook-2"></i>
          <span>文章列表</span>
        </li>
        <li>
          <i class="el-icon-alarm-clock"></i>
          <span>最近编辑</span>
        </li>
        <li>
          <i class="el-icon-star-off"></i>
          <span>最热文章</span>
        </li>
        <li>
          <i class="el-icon-tickets"></i>
          <span>精简列表</span>
        </li>

      </ul>
    </div>
    <div class="knowledge-content__body">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeContent'
  }
</script>

<style lang="scss" scoped>
  .knowledge-content {
    border-right: 1px solid #e6e6e6;
    &__header {
      height: 40px;
      border-bottom: 1px solid #e6e6e6;
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0px;
        li {
          height: 40px;
          margin-right: 15px;
          line-height: 40px;
          font-size: 16px;
          font-weight: 700
        }
      }
    }
    &__body {

    }
  }
</style>
