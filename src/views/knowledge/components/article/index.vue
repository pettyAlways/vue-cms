<template>
  <div class="article">
    <site-nav class="w1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/knowledge' }">知识库</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'knowledgeDetail', params: { knowledgeId: knowledgeId } }">{{ article.knowledgeName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ article.articleTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
    </site-nav>
    <div class="w1200">
      <div class="article__container">
        <el-card>
          <div class="article__container--left">
            <div class="article__container__header">
              <div class="article__container__title">
                <span>{{ article.articleTitle }}</span>
              </div>
              <div class="article__container__info">
                <ul class="tipPanel">
                  <li class="author-info">
                    <a @click="goProfile(article.authorId)">{{ article.authorName }}</a>
                    <span class="m-l-5 m-r-5">发布于</span>
                    <a @click="goKnowledgeDetail(article.knowledgeId)">{{ article.knowledgeName }}</a>
                    <span class="m-r-5">所属分类</span>
                    <a @click="goCategory(article.categoryId)">{{ article.categoryName }}</a>
                    <span>发布时间</span>
                    <span>{{ article.postTime }}</span>
                    <div v-if="article.participantList && article.participantList.length">
                      <span class="m-l-5">协作人</span>
                      <a @click="goProfile(item.userId)" :key="index" v-for="(item, index) in article.participantList">
                        {{item.userName}}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="article__container__body">
              <div v-html="article.content">
              </div>
            </div>
            <div class="article__container__btn">
              <ul>
                <li v-if="Object.keys(preArticle).length">
                  <span>上一篇</span>
                  <a @click="goArticle(preArticle.articleId)" class="m-r-10 m-l-10">{{ preArticle.articleTitle }}</a>
                </li>
                <li v-if="Object.keys(nextArticle).length">
                  <span>下一篇</span>
                  <a @click="goArticle(nextArticle.articleId)" class="m-l-10">{{ nextArticle.articleTitle }}</a>
                </li>
              </ul>
            </div>
            <div class="article__container__others">
              <common-panel-one title="相关文章" :bStyle="{ padding: '15px' }">
                <template slot="more">
                  <span class="header-tip">RELATE ARTICLE</span>
                </template>
                <template slot="body">
                  <ul>
                    <li v-for="(item, index) in relateArticleList" :key="index" :class ="{ 'no-bottom': (index >= (rows-1)*3) }">
                      <a @click="goArticle(item.articleId)">
                        <i class="el-icon-tickets icons"></i><span class="article_title">{{ item.articleTitle }}</span>
                      </a>
                      <a>{{ item.authorName}}</a>
                      <span class="post-time">{{ item.postTime | toDate }}</span>
                    </li>
                  </ul>
                </template>
              </common-panel-one>
            </div>
            <div class="article__container__comment" v-if="Object.keys(article).length">
              <common-panel-one :bStyle="{padding: '15px'}" :title="(commentList && commentList.length) ? commentList.length +'条评论' : '评论'">
                <template slot="more">
                  <a>时间排序</a>
                </template>
                <template slot="body">
                  <div class="comment-box-container">
                    <comment-box :articleId="article.articleId" @finishComment="finishComment"></comment-box>
                  </div>
                  <div class="comment-list">
                    <comment-item
                      v-for="(item, index) in commentList"
                      :key="index"
                      :commentId = item.commentId
                      :commentUserId="item.commentUserId"
                      :avatar="item.commentUserAvatar"
                      :author="item.commentUserName"
                      :content="item.commentContent"
                      :time="item.commentTime"
                      :replyList="item.replyList"
                      @finishReply="finishReply"
                      @finishDeleteReply="finishDeleteReply">
                    </comment-item>
                  </div>
                </template>
              </common-panel-one>
            </div>
          </div>
        </el-card>
        <div class="article__container--right">
          <div class="article__container__news" v-if="recentArticleList && recentArticleList.length">
            <common-panel-one title="最新文章">
              <template slot="more">
                <span class="header-tip">RECENTLY</span>
              </template>
              <template slot="body">
                <ul class="article__container__news__item">
                  <li v-for="(item, index) in recentArticleList" :key="index">
                    <a @click="goArticle(item.articleId)">{{ item.articleTitle }}</a>
                  </li>
                </ul>
              </template>
            </common-panel-one>
          </div>
          <div class="article__container__archive" v-if="relateKnowledgeList && relateKnowledgeList.length">
            <common-panel-one title="相关知识库" shadow="always" :bStyle="{padding: '0px'}">
              <template slot="more">
                <span class="header-tip">KNOWLEDGE</span>
              </template>
              <template slot="body">
                <div class="article__container__archive__item">
                  <el-carousel indicator-position="none" arrow="never" :interval="10000">
                    <el-carousel-item v-for="(item, index) in relateKnowledgeList" :key="index" indicator-position="none" arrow="never">
                      <knowledge-card :knowledge="item"></knowledge-card>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </template>
            </common-panel-one>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { retrieveArticle, retrieveRecentArticleInKnowledge, retrieveArticleConcise } from '@/api/article'
  import { retrieveRelateKnowledgeList } from '@/api/knowledge'
  import { listComment } from '../../../../api/comment'
  import { mapGetters } from 'vuex'
  import Prism from 'prismjs'
  export default {
    name: 'articleShow',
    data() {
      return {
        paging: {
          page: 1,
          total: 0,
          size: 6
        },
        articleId: Number,
        knowledgeId: '',
        article: {},
        recentArticleList: '',
        relateKnowledgeList: [],
        rows: '',
        relateArticleList: [],
        commentList: [],
        token: '',
        preArticle: {},
        nextArticle: {}
      }
    },
    components: {
      siteNav: () => import('@/components/site-nav'),
      commonPanelOne: () => import('@/components/common-panel-one'),
      customCard01: () => import('@/components/custom-card-01'),
      commentBox: () => import('@/components/comment-box'),
      commentItem: () => import('@/components/comment-item'),
      commentReply: () => import('@/components/comment-reply'),
      knowledgeCard: () => import('@/components/knowledge-card')
    },
    mounted() {
      this.init()
    },
    computed: {
      ...mapGetters([
        'userShow'
      ])
    },
    methods: {
      async init() {
        this.token = this.$route.params.token
        this.articleId = this.$route.params.articleId
        let res = await retrieveArticle({ articleId: this.articleId, token: this.token, userId: this.userShow.userId })
        if (res.flag) {
          this.article = res.data || {}
          this.preArticle = res.preAndNext ? res.preAndNext.pre || {} : {}
          this.nextArticle = res.preAndNext ? res.preAndNext.next || {} : {}
          // 异步获取导致代码高亮不显示，这里在获取代码内容以后在执行Prism.highlightAll
          this.$nextTick(() => {
            Prism.highlightAll()
          })
        }
        if (Object.keys(this.article).length) {
          this.knowledgeId = this.article.knowledgeId
          this.recentPost(this.article.knowledgeId)
          this.relateKnowledge(this.article.categoryId)
          this.articleConcise(this.article.knowledgeId)
          this.getComment(this.article.articleId)
        }
      },
      goArticle(articleId) {
        this.article = {}
        this.preArticle = {}
        this.nextArticle = {}
        this.$router.push({ name: 'articleShow', params: { articleId: articleId, token: this.token } })
      },
      goCategory(categoryId) {
        this.$router.push({ path: '/knowledge#category', query: { categoryId: categoryId } })
      },
      goProfile(userId) {
        this.$router.push({ name: 'profile', params: { userId: userId } })
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
        retrieveRelateKnowledgeList({ categoryId: categoryId, page: this.paging.page, size: this.paging.size }).then(res => {
          if (res.flag) {
            this.relateKnowledgeList = res.data
          }
        })
      },
      articleConcise(knowledgeId) {
        retrieveArticleConcise({ knowledgeId: knowledgeId, token: this.token, userId: this.userShow.userId, page: this.paging.page, size: this.paging.size })
          .then(res => {
            if (res.flag) {
              this.relateArticleList = res.data
              this.relateArticleList = this.relateArticleList.filter(item => item.articleId !== parseInt(this.articleId))
              this.rows = Math.ceil(this.relateArticleList.length / 3)
            }
          })
      },
      getComment(articleId) {
        listComment({ articleId: articleId, token: this.token, userId: this.userShow.userId }).then(res => {
          if (res.flag) {
            this.commentList = res.data
          }
        })
      },
      finishReply() {
        this.getComment(this.article.articleId)
      },
      finishComment() {
        this.getComment(this.article.articleId)
      },
      finishDeleteReply() {
        this.getComment(this.article.articleId)
      }
    },
    watch: {
      $route: {
        handler() {
          this.init()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article {
    &__container {
      display: flex;
      justify-content: space-between;
      /deep/ .el-divider--horizontal {
        margin: 12px 0;
      }
      &--left {
        width: 800px;
        flex-shrink: 0;
        border-bottom: 1px dotted #e6e6e6;
        background-color: white;
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
        font-size: 16px;
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
            a {
              display: block;
              height: 60px;
              line-height: 60px;
              font-size: 13px;
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:hover {
                color:  #409EFF;
              }
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
          min-height: 180px;
          .no-bottom {
            border-bottom: none;
          }
          li {
            display: flex;
            justify-content: space-between;
            width: 320px;
            height: 50px;
            line-height: 50px;
            margin-right: 50px;
            border-bottom: 1px solid #ebebeb;
            a {
              display: flex;
              align-items: center;
              font-size: 13px;
              cursor: pointer;
              color: #262626;
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
                color:  #409EFF;
              }
            }
            .post-time {
              font-size: 11px;
              color: #a9a9a9;
            }
          }
        }
      }
      &__comment {
        margin-top: 15px;
        .comment-box-container {
          height: 180px;
          margin: -10px -15px;
        }
        .comment-list {
          margin-top: 10px;
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
            display: flex;
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
        /deep/ .el-card {
          background-color: transparent;
        }
        &__item {
          list-style: none;
          padding: 0px;
          min-height: 230px;
          li {
            border-bottom: 1px solid #d1d1d1;
            a {
              display: block;
              height: 37px;
              line-height: 37px;
              color: #262626;
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
        /deep/ .el-card {
          background-color: transparent;
        }
        &__item {
          /deep/ .el-carousel {
            .el-carousel__container {
              height: 0px;
              min-height: 276px;
            }
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
