<template>
  <div class="knowledge">
    <div class="knowledge__recommend">
      <common-panel-one title="推荐知识库" shadow="always" :bStyle="{ 'padding': '0px' }">
        <template slot="more">
          <span class="header-tip">AUTHOR-INFO</span>
        </template>
        <template slot="body">
          <el-carousel indicator-position="none" arrow="always" :interval="6000">
            <el-carousel-item v-for="(item, index) in recommendKnowledge" :key="index" indicator-position="none" arrow="never">
              <div class="knowledge__recommend__item">
                <div class="knowledge__recommend__item__header">
                  <div class="knowledge__recommend__item__header--left">
                    <el-image :src="item.knowledgeCover" fit="cover" style="height: 130px; height: 130px"></el-image>
                  </div>
                  <div class="knowledge__recommend__item__header--right">
                    <div class="title"><a @click="goKnowledge(item.knowledgeId)">{{item.knowledgeName}}</a></div>
                    <span class="content">{{item.knowledgeDesc}}</span>
                    <a @click="goKnowledge(item.knowledgeId)">[详情]</a>
                  </div>
                </div>
                <div class="knowledge__recommend__item__body">
                  <ul>
                    <li v-for="(tItem, index) in item.articleList" :key="'.'+ index">
                      <a class="title" @click="goArticle(tItem.articleId)">{{tItem.articleTitle}}</a>
                      <span>{{tItem.postTime}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
      </common-panel-one>
    </div>
    <div class="article__recent">
      <common-panel-one title="最新文章" shadow="always" :bStyle="{ padding: '0px' }">
        <template slot="more">
          <span class="header-tip">AUTHOR-INFO</span>
        </template>
        <template slot="body">
          <ul>
            <li v-for="(item, index) in recentArticleList" :key="index" >
              <a @click="goArticle(item.articleId)"><i class="el-icon-tickets icons"></i>{{ item.articleTitle }}</a>
              <span>{{ item.postTime | toDate }}</span>
            </li>
          </ul>
        </template>
      </common-panel-one>
    </div>
    <div class="knowledge__recent">
      <common-panel-one title="最新知识库" shadow="always" :bStyle="{ padding: '0px' }">
        <template slot="more">
          <span class="header-tip">NEW-KNOWLEDGE</span>
        </template>
        <template slot="body">
          <ul class="knowledge__recent__list">
            <li v-for="(item, index) in recentKnowledgeList" :key="index">
              <a @click.stop="goKnowledge(item.knowledgeId)"><i class="el-icon-document-copy icons"></i>{{item.knowledgeName}}</a>
              <span>{{item.editTime | toDate}}</span>
            </li>
          </ul>
        </template>
      </common-panel-one>
    </div>
  </div>
</template>

<script>
  import { retrieveRecommend, retrieveRecentKnowledge } from '@/api/knowledge'
  import { retrieveRecentArticle } from '@/api/article'
  export default {
    name: 'knowledgeRecommend',
    data() {
      return {
        recommendKnowledge: [],
        recentArticleList: [],
        recentKnowledgeList: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.recommendKnowledgeList()
        this.recentArticle()
        this.recentKnowledge()
      },
      recommendKnowledgeList() {
        retrieveRecommend().then(res => {
          if (res.flag) {
            this.recommendKnowledge = res.data
          }
        })
      },
      recentArticle() {
        retrieveRecentArticle().then(res => {
          if (res.flag) {
            this.recentArticleList = res.data
          }
        })
      },
      recentKnowledge() {
        retrieveRecentKnowledge().then(res => {
          if (res.flag) {
            this.recentKnowledgeList = res.data
          }
        })
      },
      goArticle(articleId) {
        this.$router.push({ name: 'articleShow', params: { articleId: articleId } })
      },
      goKnowledge(knowledgeId) {
        this.$router.push({ name: 'knowledgeDetail', params: { knowledgeId: knowledgeId } })
      }
    },
    components: {
      commonPanelOne: () => import('@/components/common-panel-one')
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
        padding: 5px;
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
              color: #303133;
              a {
                display: block;
                cursor: pointer;
                max-width: 270px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:hover {
                  color: #6b747d;
                }
              }
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
              align-items: center;
              height: 33px;
              line-height: 33px;
              border-bottom: 1px dashed #e6e6e6;
              a {
                display: block;
                color: #262626;
                max-width: 270px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
        padding: 0px 10px;
        li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 38px;
          line-height: 38px;
          border-bottom: 1px dashed #e6e6e6;
          &:last-child {
            border-bottom: none;
          }
          a {
            display: block;
            font-size: 13px;
            color: #262626;
            max-width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          a:hover {
            color: #409EFF;
          }
          span {
            font-size: 12px;
            color: #999999;
            text-align: right;
          }
          .icons {
            margin-right: 5px;
          }
        }
      }
    }
    &__recent {
      width: 370px;
      margin-left: 15px;
      &__list {
        list-style: none;
        padding: 0px 10px;
        height: 300px;
        li {
          display: flex;
          justify-content: space-between;
          height: 38px;
          line-height: 38px;
          &:not(:last-child) {
            border-bottom: 1px dashed #e6e6e6;
          }
          a {
            display: block;
            font-size: 13px;
            color: #262626;
            max-width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          a:hover {
            color: #409EFF;
          }
          span {
            font-size: 12px;
            color: #999999;
          }
          .icons {
            margin-right: 5px;
          }
        }
      }
    }
    .header-tip {
      font-size: 12px;
      color: #cccccc;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: normal;
    }
  }
</style>
