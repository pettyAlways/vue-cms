<template>
  <div class="news-panel">
    <div class="news-panel--left">
      <div class="knowledge__recommend">
        <common-panel-one title="推荐知识库" shadow="always" :bStyle="{ 'padding': '0px' }">
          <template slot="more">
            <span class="header-tip">AUTHOR-INFO</span>
          </template>
          <template slot="body">
            <el-carousel indicator-position="none" arrow="never" :interval="6000">
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
    </div>
    <div class="news-panel--right">
      <common-panel-two title="最新知识库" :bStyle="{ 'padding': '0px' }">
        <template slot="more">
          <span class="header-tip">AUTHOR-INFO</span>
        </template>
        <template slot="body">
          <div class="news-panel--right__panel">
            <div class="news-panel--right__panel__item" v-for="(item, index) in recentKnowledgeList" :key="index">
              <knowledge-card :knowledge="item" shadow="always" :bStyle="{padding: '0px'}"></knowledge-card>
            </div>
          </div>
        </template>
      </common-panel-two>
    </div>
  </div>
</template>

<script>
  import { retrieveRecommend, retrieveRecentKnowledgeInfo } from '@/api/knowledge'
  export default {
    name: 'news',
    data() {
      return {
        recommendKnowledge: [],
        recentKnowledgeList: []
      }
    },
    components: {
      commonPanelOne: () => import('@/components/common-panel-one'),
      commonPanelTwo: () => import('@/components/common-panel-two'),
      knowledgeCard: () => import('@/components/knowledge-card')
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.recommendKnowledgeList()
        this.recentKnowledge()
      },
      recommendKnowledgeList() {
        retrieveRecommend().then(res => {
          if (res.flag) {
            this.recommendKnowledge = res.data
          }
        })
      },
      recentKnowledge() {
        retrieveRecentKnowledgeInfo().then(res => {
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
    }
  }
</script>

<style lang="scss" scoped>
  .news-panel {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    &--left {
      flex-shrink: 0;
      width: 430px;
      .knowledge__recommend {
        flex-shrink: 0;
        width: 430px;
        /deep/ .el-carousel__container {
          height: 272px;
        }
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
    }
    &--right {
      width: 730px;
      margin-left: 10px;
      margin-right: 10px;
      &__panel {
        display: flex;
        align-items: center;
        &__item {
          background-color: white;
          width: 250px;
          height: 273px;
          margin-right: 10px;
          background-color: white;
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
