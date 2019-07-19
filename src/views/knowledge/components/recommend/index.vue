<template>
  <div class="knowledge">
    <div class="knowledge__recommend">
      <custom-card01 title="推荐知识库" note="RECOMMEND">
        <template>
          <el-carousel indicator-position="none" arrow="never">
            <el-carousel-item v-for="item in recommendKnowledge" :key="item" indicator-position="none" arrow="never">
              <div class="knowledge__recommend__item">
                <div class="knowledge__recommend__item__header">
                  <div class="knowledge__recommend__item__header--left">
                    <el-image :src="item.knowledgeCover" fit="cover" style="height: 130px; height: 130px"></el-image>
                  </div>
                  <div class="knowledge__recommend__item__header--right">
                    <div class="title"><router-link :to="{path: '/knowledge/detail'}">{{item.knowledgeName}}</router-link></div>
                    <span class="content">{{item.knowledgeDesc}}</span>
                    <a>[详情]</a>
                  </div>
                </div>
                <div class="knowledge__recommend__item__body">
                  <ul>
                    <li v-for="(tItem, index) in item.articleList" :key="index">
                      <a>{{tItem.articleTitle}}</a>
                      <span>{{tItem.postTime}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
      </custom-card01>
    </div>
    <div class="article__recent">
      <custom-card01 title="最新文章" note="ARTICLE">
        <ul>
          <li v-for="(index) in 12" :key="index" >
            <router-link :to="{ path: '/article' }">分布式应用架构总括{{[index]}}</router-link>
            <span>2019-05-11</span>
          </li>
        </ul>
      </custom-card01>
    </div>
    <div class="knowledge__recent">
      <custom-card01 title="最新知识库" note="KNOWLEDGE">
        <ul class="knowledge__recent__list">
          <li v-for="index in 10" :key="index">
            <a>Nginx在集群中的使用[{{index}}]</a>
            <span>收录117篇</span>
          </li>
        </ul>

      </custom-card01>
    </div>
  </div>
</template>

<script>
  import { retrieveRecommend } from '@/api/knowledge'
  export default {
    name: 'knowledgeRecommend',
    data() {
      return {
        recommendKnowledge: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.recommendKnowledgeList()
      },
      recommendKnowledgeList() {
        retrieveRecommend().then(res => {
          if (res.flag) {
            this.recommendKnowledge = res.data
          }
        })
      }
    },
    components: {
      'customCard01': () => import('@/components/custom-card-01')
    }
  }
</script>

<style lang="scss"scoped>
  .knowledge {
    display: flex;
    align-items: stretch;
    &__recommend {
      flex-shrink: 0;
      width: 430px;
      &__item {
        &__header {
          display: flex;
          &--left {
            flex-shrink: 0;
            width:130px;
            height:130px;
          }
          &--right {
            margin-left: 5px;
            .title {
              margin-bottom: 10px;
              font-size: 16px;
              font-weight: 700;
              color: #6b747d;
            }
            .content {
              font-family: "微软雅黑", "Microsoft YaHei", "Verdana", "Arial", "Helvetica", sans-serif;
              color: #6b747d;
              font-size: 12px;
              overflow: hidden;
            }
            > a {
              color:  #4c84be;
              cursor: pointer;
              &:hover {
                color:  #409EFF;
              }
            }
          }
        }
        &__body {
          ul {
            list-style: none;
            padding: 0px;
            li {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              height: 30px;
              line-height: 30px;
              border-bottom: 1px dashed #e6e6e6;
              a {
                color: #4c84be;
              }
              a:hover {
                color: #409EFF;
              }
              span {
                font-size: 12px;
                color: #999999;
              }
            }
          }
        }
      }
    }
    .article__recent {
      width: 370px;
      margin-left: 15px;
      ul {
        height: 300px;
        list-style: none;
        padding: 0px;

        li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 30px;
          margin-bottom: 10px;
          border-bottom: 1px dashed #e6e6e6;
          a {
            display: block;
            font-size: 12px;
            color: #4c84be;
          }
          a:hover {
            color: #409EFF;
          }
          span {
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
    &__recent {
      width: 370px;
      margin-left: 15px;
      &__list {
        list-style: none;
        padding: 0px;
        height: 300px;
        li {
          display: flex;
          justify-content: space-between;
          height: 30px;
          margin-bottom: 10px;
          &:not(:last-child) {
            border-bottom: 1px dashed #e6e6e6;
          }
          a {
            display: block;
            font-size: 12px;
            color: #4c84be;
          }
          a:hover {
            color: #409EFF;
          }
          span {
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }

  }
</style>
