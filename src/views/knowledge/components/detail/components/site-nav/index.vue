<template>
  <div class="site-nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/knowledge' }">知识库</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/knowledge/detail' }">知识库详情</el-breadcrumb-item>
      <el-breadcrumb-item>分布式应用</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'siteNav'
  }
</script>

<style lang="scss" scoped>
  .site-nav {
    height: 40px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 15px;
  }
</style>
