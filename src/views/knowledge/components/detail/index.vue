<template>
  <div class="knowledge-detail">
    <site-nav class="w1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/knowledge' }">知识库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/knowledge/detail' }">知识库详情</el-breadcrumb-item>
        <el-breadcrumb-item>分布式应用</el-breadcrumb-item>
      </el-breadcrumb>
    </site-nav>
    <el-card class="w1200">
      <div class="knowledge-detail__content">
        <div class="knowledge-detail__content--left">
          <konwledge-cover></konwledge-cover>
          <konwledge-content></konwledge-content>
        </div>
        <div class="knowledge-detail__content--right">
          <author-list></author-list>
          <knowledge-news></knowledge-news>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeDetail',
    data() {
      return {}
    },
    components: {
      siteNav: () => import('@/components/site-nav'),
      konwledgeCover: () => import('./components/knowledge-cover'),
      konwledgeContent: () => import('./components/knowledge-content'),
      authorList: () => import('./components/author-list'),
      knowledgeNews: () => import('./components/knowledge-news')
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-detail {
    &__content {
      display: flex;
      &--left {
        flex-shrink: 0;
        width: 900px;
      }
      &--right {
        display: flow;
        flex-direction: column;
        flex-grow: 1;
        margin-left: 15px;
        width: 280px;
      }
    }
  }
</style>
