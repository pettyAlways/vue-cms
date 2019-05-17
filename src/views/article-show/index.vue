<template>
  <div class="article-show w1200">
    <div class="top-panel">
      <site-nav>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index/knowledge' }">知识库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/knowledge/detail' }">vue文档</el-breadcrumb-item>
          <el-breadcrumb-item>买酒官网搭建</el-breadcrumb-item>
        </el-breadcrumb>
      </site-nav>
      <div class="btn-panel">
        <el-button class="btn" type="primary" size="small" @click="showCover=false">编辑</el-button>
      </div>
    </div>
    <div class="article-show__container">
      <div class="article-list">
        <ul>
          <li v-for="index in 12" :key="index">
            <a>CSS3使用</a>
          </li>
        </ul>
      </div>
      <div class="article-content">
        <el-card>
          <h1 class="title">卖酒官网搭建</h1>
          <ul class="extra-info">
            <li>鹰嘴豆发布于JavaWeb</li>
            <li>发布时间：2019-5-17</li>
            <li>所属分类：Java</li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'articleShow',
    components: {
      siteNav: () => import('@/components/site-nav')
    }
  }
</script>

<style lang="scss" scoped>
  .article-show {
    .top-panel {
      display: flex;
      justify-content: space-between;
      .btn-panel {
        display: inline-flex;
        align-self: center;
        .btn {
          margin-right: 15px;
        }
      }
    }
    &__container {
      display: flex;
      .article-list {
        flex-shrink: 0;
        width: 200px;
        border-right: 1px solid #e8e8e8;
        ul {
          list-style: none;
          padding: 0px;
          li {
            a {
              display: block;
              height: 37px;
              line-height: 37px;
              font-size: 13px;
            }
          }
        }
      }
      .article-content {
        flex-grow: 1;
        .title {
          font-size: 18px;
          font-weight: 700;
          height: 40px;
          line-height: 40px;
        }
        .extra-info {
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0px;
          li {
            margin-right: 15px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
