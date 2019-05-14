<template>
  <div class="news-panel">
    <div class="news-panel__header">
      <div class="title">最新动态</div>
      <div class="btn"><a>更多动态</a></div>
    </div>
    <div class="news-panel__body">
      <el-carousel direction="vertical">
        <el-carousel-item v-for="item in 3" :key="item">
          <ul class="news-panel__body__content">
            <li>
              <a>鹰嘴豆申请成为《高并发》知识库的协同作者</a>
            </li>
            <li>
              <a>章内创建了《C++编程》知识库{{item}}</a>
            </li>
            <li>
              <a>张小在《高并发》下增加了新的文章</a>
            </li>
            <li>
              <a>《分布式》成为了热门的知识库</a>
            </li>
            <li>
              <a>《Mysql优化有新内容了》</a>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeNews'
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
      &__content {
        list-style: none;
        padding: 0px;
        li {
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e6e6e6;
          a {
            display: block;
            height: 30px;
          }
        }
      }

    }
  }
</style>
