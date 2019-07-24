<template>
  <div class="article">
    <site-nav class="w1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/knowledge' }">知识库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/knowledge/detail' }">{{ article.knowledgeName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ article.articleTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
    </site-nav>
    <el-card class="w1200">
      <div class="article__container">
        <div class="article__container--left">
          <div class="article__container__header">
            <div class="article__container__title">
              <span>{{ article.articleTitle }}</span>
            </div>
            <div class="article__container__info">
              <ul class="tipPanel">
                <li class="author-img">
                  <img :src="require('./assets/author01.jpg')" />
                </li>
                <li class="author-info">
                  <a>{{ article.authorName }}</a>
                  <span>发布于</span>
                  <a @click="goKnowledgeDetail(article.knowledgeId)">{{ article.knowledgeName }}</a>
                  <span>所属分类</span>
                  <span>{{ article.categoryName }}</span>
                  <span>发布时间</span>
                  <span>{{ article.postTime }}</span>
                </li>
                <li class="participant">
                  <ul>
                    <li v-for="(tItem, index) in article.participantList" :key="index+'.'">
                      {{ tItem.userName }}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="article__container__body">
            <div v-html="article.content">
            </div>
          </div>
          <div class="article__container__btn">
            <ul>
              <li>
                <i class="el-icon-thumb"></i>
                <a>点赞</a>
              </li>
              <li>
                <i class="el-icon-folder-add"></i>
                <a>收藏</a>
              </li>
              <li>
                <i class="el-icon-coffee-cup"></i>
                <a>打赏</a>
              </li>
            </ul>
          </div>
          <div class="article__container__others">
            <custom-card01 title="相关文章">
              <template slot="more">
                <span class="header-tip">RELATE ARTICLE</span>
              </template>
              <ul>
                <li v-for="(item, index) in relateArticleList" :key="index" :class ="{ 'no-bottom': (index >= (rows-1)*3) }">
                  <a @click="goArticle(item.articleId)">
                    <i class="el-icon-tickets icons"></i>
                    <span class="article_title">{{ item.articleTitle }}</span>
                  </a>
                </li>
              </ul>
            </custom-card01>
          </div>
          <div class="article__container__comment">
            <common-panel-one title="1条评论">
              <template slot="more">
                <a>时间排序</a>
              </template>
              <template slot="body">
                <div class="container">
                  <div class="article__container__comment__item" v-for="index in 6" :key="index">
                    <div class="article__container__comment--left">
                      <img :src="require('./assets/author01.jpg')">
                    </div>
                    <div class="article__container__comment--right">
                      <div class="top">
                        <a>Billgo</a>
                        <span>2019-05-14</span>
                      </div>
                      <div class="center">
                        <span>Flutter 就是一个高不成低不就的解决方案。如果都下定决心去学一门编程语言来开发了，干嘛不直接学原生。RN最主要的好处是可以用JS来写，我既然都选择了JS来快速开发了，性能只要过得去就好啦。</span>
                      </div>
                      <div class="btn">
                        <ul>
                          <li>
                            <i class="el-icon-thumb"></i>
                            <a>赞</a>
                          </li>
                          <li>
                            <i class="el-icon-s-comment"></i>
                            <a>回复</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </common-panel-one>
          </div>
        </div>
        <div class="article__container--right">
          <div class="article__container__news">
            <common-panel-one title="最新文章">
              <template slot="more">
                <span class="header-tip">RECENTLY</span>
              </template>
              <template slot="body">
                <ul class="article__container__news__item">
                  <li v-for="(item, index) in recentArticleList" :key="index">
                    <a>{{ item.articleTitle }}</a>
                  </li>
                </ul>
              </template>
            </common-panel-one>
          </div>
          <div class="article__container__archive">
            <common-panel-one title="相关知识库" :bStyle="{padding: '0px'}">
              <template slot="more">
                <span class="header-tip">KNOWLEDGE</span>
              </template>
              <template slot="body">
                <div class="article__container__archive__item">
                  <el-carousel indicator-position="none" arrow="never">
                    <el-carousel-item v-for="(item, index) in relateKnowledgeList" :key="index" indicator-position="none" arrow="never">
                      <el-image :src="item.knowledgeCover" fit="cover" style="width: 100%; height: 150px;"></el-image>
                      <p class="knowledge_title">{{ item.knowledgeName }}</p>
                      <span class="knowledge_content">{{ item.knowledgeDesc }}</span>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </template>
            </common-panel-one>

          </div>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script>
  import { retrieveArticle, retrieveRecentArticleInKnowledge, retrieveArticleConcise } from '@/api/article'
  import { retrieveKnowledgeList } from '@/api/knowledge'
  export default {
    name: 'article',
    data() {
      return {
        paging: {
          page: 1,
          total: 0,
          size: 6
        },
        articleId: '',
        knowledgeId: '',
        article: '',
        recentArticleList: '',
        relateKnowledgeList: '',
        rows: '',
        relateArticleList: []
      }
    },
    components: {
      siteNav: () => import('@/components/site-nav'),
      commonPanelOne: () => import('@/components/common-panel-one'),
      customCard01: () => import('@/components/custom-card-01')
    },
    mounted() {
      this.articleId = this.$route.params.articleId
      this.init()
    },
    methods: {
      async init() {
        let res = await retrieveArticle({ articleId: this.articleId })
        if (res.flag) {
          this.article = res.data
        }
        this.recentPost(this.article.knowledgeId)
        this.relateKnowledge(this.article.categoryId)
        this.articleConcise(this.article.knowledgeId)
      },
      goKnowledgeDetail(knowledgeId) {
        this.$router.push({ name: 'knowledgeDetail', params: { knowledgeId: knowledgeId } })
      },
      recentPost(knowledgeId) {
        retrieveRecentArticleInKnowledge({ knowledgeId: knowledgeId }).then(res => {
          if (res.flag) {
            this.recentArticleList = res.data
          }
        })
      },
      relateKnowledge(categoryId) {
        retrieveKnowledgeList({ categoryId: categoryId, page: this.paging.page, size: this.paging.size }).then(res => {
          if (res.flag) {
            this.relateKnowledgeList = res.data
          }
        })
      },
      articleConcise(knowledgeId) {
        retrieveArticleConcise({ knowledgeId: knowledgeId, page: this.paging.page, size: this.paging.size })
          .then(res => {
            if (res.flag) {
              this.relateArticleList = res.data
              this.rows = Math.ceil(this.relateArticleList.length / 3)
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article {
    &__container {
      display: flex;
      justify-content: space-between;
      &--left {
        width: 800px;
        flex-shrink: 0;
        border-bottom: 1px dotted #e6e6e6;
      }
      &--right {
        width: 300px;
        flex-shrink: 0;
      }
      &__header {

      }
      &__body {
        margin-top: 15px;
        min-height: 150px;
      }
      &__btn {
        margin-top: 15px;
        border-top: 1px dashed #e6e6e6;
        border-bottom: 1px dashed #e6e6e6;
        ul {
          display: flex;
          justify-content: center;
          align-items: center;
          list-style: none;
          padding: 0px;
          li {
            display: flex;
            align-items: center;
            i {
              margin-right: 5px;
              font-size: 20px;
            }
            a {
              display: block;
              width: 60px;
              height: 60px;
              line-height: 60px;
              font-size: 20px;
            }
          }
        }
      }
      &__others {
        margin-top: 15px;
        ul {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          padding: 0px;
          .no-bottom {
            border-bottom: none;
          }
          li {
            display: flex;
            justify-content: space-between;
            width: 250px;
            height: 80px;
            line-height: 80px;
            padding-right: 30px;
            border-bottom: 1px solid #ebebeb;
            a {
              display: flex;
              align-items: center;
              font-size: 13px;
              cursor: pointer;
              color: #433f3f;
              i {
                margin-right: 5px;
                line-height: 80px;
              }
              .article_title {
                display: block;
                overflow: hidden;
                max-width: 180px;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              &:hover {
                color: #409EFF;
              }
            }
          }
        }
      }
      &__comment {
        margin-top: 15px;
        .container {
          display: flex;
          flex-direction: column;
        }
        &__item {
          display: flex;
          margin-top: 15px;
          padding-bottom: 15px;
          border-bottom: 1px dotted #e6e6e6;
        }
        &--left {
          margin-right: 15px;
          img {
            width: 40px;
            height: 40px;
            border: 2px solid goldenrod;
            border-radius: 50%;
          }
        }
        &--right {
          .top {
            display: flex;
            a {
              color: #4c84be;
            }
            span {
              color: #999
            }
          }
          .center {
            margin-top: 10px;
            font-size: 14px;
            line-height: 22.4px;
            color: #333;
          }
          .btn {
            display: flex;
            margin-top: 10px;
            ul {
              display: flex;
              list-style: none;
              padding: 0px;
              li {
                display: flex;
                align-items: center;
                margin-right: 15px;
                font-size: 12px;
                a {
                  display: block;
                  margin-left: 10px;
                  color: #666;
                }
              }
            }
          }
        }
      }
      &__info {
        margin-top: 10px;
        .tipPanel {
          display: flex;
          list-style: none;
          padding: 0px;
          .author-img {
            img {
              width: 18px;
              height: 18px;
              object-fit: cover;
              border: 2px solid burlywood;
              border-radius: 50%;
            }
          }
          .author-info {
            margin-left: 10px;
            font-size: 12px;
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
          .participant {
            margin-left: 10px;
            ul {
              list-style: none;
              padding: 0px;
            }
          }
        }
      }
      &__title {
        span {
          font-size: 25px;
          font-weight: 500;
        }
      }
      &__news {
        &__item {
          list-style: none;
          padding: 0px;
          min-height: 230px;
          li {
            border-bottom: 1px dashed #e6e6e6;
            a {
              display: block;
              height: 37px;
              line-height: 37px;
              color: #2e6eb0;
              overflow: hidden;
              max-width: 270px;
              white-space: nowrap;
              text-overflow: ellipsis;
              &:hover {
                color: #409EFF;
              }
            }
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
      &__archive {
        margin-top: 15px;
        &__item {
          /deep/ .el-carousel {
            .el-carousel__container {
              height: 0px;
              min-height: 250px;
            }
          }
          .knowledge_title {
            margin: 0px auto;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            overflow: hidden;
            width: 280px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .knowledge_content {
            display: block;
            margin-left: 5px;
            font-size: 12px;
            height: 70px;
            overflow: hidden;
          }
        }
      }
      &__category {
        margin-top: 15px;
        &__item {
          list-style: none;
          padding: 0px;
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed #e6e6e6;
            a {
              display: block;
              height: 37px;
              line-height: 37px;
            }
            span {
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

  }
</style>
