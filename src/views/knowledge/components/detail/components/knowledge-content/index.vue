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
      <ul>
        <li v-for="index in 10" :key="index">
          <article-panel01 :content="content" :img="img">
            <template slot="title">
              <a>{{title}}</a>
            </template>
            <template slot="tipPanel">
              <ul class="tipPanel">
                <li class="author-img">
                  <img :src="require('./assets/author01.jpg')" />
                </li>
                <li class="author-info">
                  <a>鹰嘴豆</a>
                  <span>发布于</span>
                  <span>2019-5-13</span>
                </li>
                <li class="love">
                  <a><i class="el-icon-star-off"></i></a>
                  <span>2</span>
                  <span>点赞</span>
                </li>
              </ul>
            </template>
          </article-panel01>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeContent',
    data() {
      return {
        title: '从 React Native 到 Flutter，移动跨平台方案的真相',
        content: '2018 年 12 月，Google 发布了 Flutter 1.0 正式版，似乎再次点燃了人们对移动跨平台开发的热情。上一次出现类似的情况，是在 15 年年初，Facebook 发布 React Native 的时候。四年不到的时间里，有两家大公司相...',
        img: require('./assets/knowledge01.jpg')
      }
    },
    components: {
      articlePanel01: () => import('@/components/article-panel-01')
    }
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
      ul {
        list-style: none;
        padding: 0px;
        li {
          .tipPanel {
            display: flex;
            list-style: none;
            padding: 0px;
            .author-img {
              img {
                width: 20px;
                height: 20px;
                object-fit: cover;
                border: 2px solid burlywood;
                border-radius: 50%;
              }
            }
            .author-info {
              margin-left: 10px;
              a {
                color: #4c84be;
                &:hover {
                  color:  #409EFF;
                }
              }
              span{
                margin-left: 5px;
                color: #999;
              }
            }
            .love {
              margin-left: 10px;

            }
          }
        }
      }
    }
  }
</style>
