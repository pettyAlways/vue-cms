<template>
  <div class="article-show w1200">
    <div class="top-panel">
      <site-nav>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/platform/blog/center/knowledge' }">知识库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/platform/blog/knowledge/detail', query: { knowledgeId: knowledgeId } }">{{knowledge.knowledgeName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{article.articleTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
      </site-nav>
      <div class="btn-panel">
        <el-button v-if="noAuthShowBtn || detailPower['文章新增']" class="btn" type="primary" size="small" @click="createArticle">新建文档</el-button>
        <el-button v-if="noAuthShowBtn || (power['文章编辑'] && shareAuth('文章共享修改'))" class="btn" type="primary" size="small" @click="editArticle">编辑</el-button>
        <el-button v-if="noAuthShowBtn || (power['文章删除'] && shareAuth('文章共享删除'))" class="btn" type="primary" size="small" @click="delArticle">删除</el-button>
      </div>
    </div>
    <div class="article-show__container">
      <div class="article-list">
        <ul>
          <li v-for="(item, index) in articleList" :key="index">
            <a @click="goArticle(item.articleId)" :class="{ 'article-active': item.articleId == articleId }">{{item.articleTitle}}</a >
          </li>
        </ul>
      </div>
      <div class="article-content">
        <el-card>
          <h1 class="title">{{article.articleTitle}}</h1>
          <ul class="extra-info">
            <li>{{article.createName}}&nbsp;发布于 {{article.knowledgeName}}</li>
            <li>发布时间：{{article.postTime}}</li>
            <li>所属分类：{{article.categoryName}}</li>
            <li v-if="article.participantList && article.participantList.length">
              协作人：
              <a v-for="(item, index) in article.participantList" :key="index">{{item.userName}}</a>
            </li>
          </ul>
          <el-divider></el-divider>
          <div class="article-content-info" :style="{ 'min-height': visiableHeight + 'px' }" v-html="article.content">
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { getArticle, listArticle, deleteShareArticle, deleteArticle } from '@/api/article'
  import { knowledgeItem } from '@/api/knowledge'
  import { clientVisiable } from '@/utils/compatibility'
  import { mapGetters } from 'vuex'
  import Prism from 'prismjs'
  export default {
    name: 'articleShow',
    data() {
      return {
        knowledgeId: '',
        knowledge: {},
        article: '',
        power: [],
        detailPower: [],
        articleId: '',
        articleList: [],
        visiableHeight: ''
      }
    },
    components: {
      siteNav: () => import('@/components/site-nav')
    },
    mounted() {
      this.visiableHeight = clientVisiable().height - 300
      this.init()
    },
    computed: {
      ...mapGetters([
        'pageMenus',
        'sysParam',
        'currentUser'
      ]),
      noAuthShowBtn() {
        return this.sysParam['no_auth_represent'] === 'represent'
      },
      shareAuth() {
        return (auth) => {
          return this.currentUser.id === this.article.creatorId || this.knowledge.creator === this.currentUser.id || this.power[auth]
        }
      }
    },
    watch: {
      '$route' (to, from) {
        this.init()
      },
      pageMenus: {
        handler(newMenus) {
          if (newMenus) {
            this.power = newMenus[this.$route.path]
            // 需要用到知识库详情中的新增文章的按钮
            this.detailPower = newMenus['/platform/blog/knowledge/detail']
          }
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    methods: {
      init() {
        this.knowledgeId = this.$route.query.knowledgeId
        this.articleId = this.$route.query.articleId
        this.getKnowledge(this.knowledgeId)
        this.getArticle(this.articleId)
        this.listArticle(this.knowledgeId)
      },
      createArticle() {
        this.$router.push({ path: '/platform/blog/knowledge/article/editor', query: { knowledgeId: this.knowledgeId } })
      },
      delArticle() {
        let _this = this
        this.$confirm('请确认删除当前文章', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              // 判断是否有共享删除权限，有就执行共享删除请求
              let del = _this.power['文章共享删除'] ? deleteShareArticle : deleteArticle
              del({ articleId: _this.articleId }).then(res => {
                if (res.flag) {
                  _this.$message({
                    type: 'success',
                    message: '删除文章成功'
                  })
                  let nextArticle = res.data
                  if (nextArticle) {
                    setTimeout(() => {
                      _this.articleList = _this.articleList.filter(item => item.articleId !== _this.articleId)
                      _this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: nextArticle, knowledgeId: _this.knowledgeId } })
                    }, 1 * 1000)
                    return
                  }
                  setTimeout(() => {
                    _this.$router.push({ path: '/platform/blog/knowledge/detail', query: { knowledgeId: _this.knowledgeId } })
                  }, 1 * 1000)
                }
              })
            }
          }
        })
      },
      editArticle() {
        this.$router.push({ path: '/platform/blog/knowledge/article/editor', query: { articleId: this.articleId, knowledgeId: this.knowledgeId } })
      },
      goArticle(articleId) {
        this.article = {}
        this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: articleId, knowledgeId: this.knowledgeId } })
      },
      listArticle(knowledgeId) {
        listArticle({ knowledgeId: knowledgeId }).then(res => {
          if (res.flag) {
            this.articleList = res.data.map(item => {
              return { articleTitle: item.articleTitle, articleId: item.articleId }
            })
          }
        })
      },
      getArticle(articleId) {
        getArticle({ articleId: articleId }).then(res => {
          if (res.flag) {
            this.article = res.data
            // 异步获取导致代码高亮不显示，这里在获取代码内容以后在执行Prism.highlightAll
            this.$nextTick(() => {
              Prism.highlightAll()
            })
          }
        })
      },
      getKnowledge(knowledgeId) {
        knowledgeItem({ knowledgeId: knowledgeId }).then(res => {
          if (res.flag) {
            this.knowledge = res.data
          }
        })
      }
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
              width: 199px;
              line-height: 37px;
              font-size: 13px;
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &hover {
                color: #8c8c8c;
              }
            }
            .article-active {
              color: #25b864;
            }
          }
        }
      }
      .article-content {
        flex-grow: 1;
        .title {
          font-size: 30px;
          font-weight: 700;
          height: 40px;
          line-height: 40px;
        }
        .extra-info {
          display: flex;
          margin-top: 15px;
          align-items: center;
          list-style: none;
          padding: 0px;
          li {
            margin-right: 15px;
            font-size: 12px;
          }
        }
        .article-content-info {
          font-size: 16px;
          /deep/ pre[class*="language-"] {
            width: 950px;
          }
        }
      }
    }
  }
</style>
