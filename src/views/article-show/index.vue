<template>
  <div class="article-show w1200">
    <div class="top-panel">
      <site-nav>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/platform/blog/knowledge' }">知识库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/platform/blog/knowledge/detail', query: { knowledgeId: knowledgeId } }">vue文档</el-breadcrumb-item>
          <el-breadcrumb-item>买酒官网搭建</el-breadcrumb-item>
        </el-breadcrumb>
      </site-nav>
      <div class="btn-panel">
        <el-button v-if="noAuthShowBtn || detailPower['文章新增']" class="btn" type="primary" size="small" @click="createArticle">新建文档</el-button>
        <el-button v-if="noAuthShowBtn || (power['文章删除'] && shareAuth('文章共享删除'))" class="btn" type="primary" size="small" @click="delArticle">删除</el-button>
        <el-button v-if="noAuthShowBtn || (power['文章编辑'] && shareAuth('文章共享修改'))" class="btn" type="primary" size="small" @click="editArticle">编辑</el-button>
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
            <li>{{article.createName}}发布于 {{article.knowledgeName}}</li>
            <li>发布时间：{{article.postTime}}</li>
            <li>所属分类：{{article.categoryName}}</li>
          </ul>
        </el-card>
        <el-card>
          <div :style="{ 'min-height': visiableHeight + 'px' }" v-html="article.content">
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
          return this.currentUser.id === this.article.creator || this.knowledge.creator.id === this.currentUser.id || this.power[auth]
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
                  if (nextArticle.id) {
                    setTimeout(() => {
                      _this.articleList = _this.articleList.filter(item => item.id === _this.articleId)
                      _this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: nextArticle.id, knowledgeId: _this.knowledgeId } })
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
        this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: articleId, knowledgeId: this.knowledgeId } })
      },
      listArticle(knowledgeId) {
        listArticle({ knowledgeId: knowledgeId }).then(res => {
          if (res.flag) {
            this.articleList = res.data.map(item => {
              return { articleTitle: item.articleTitle, articleId: item.id }
            })
          }
        })
      },
      getArticle(articleId) {
        getArticle({ articleId: articleId }).then(res => {
          if (res.flag) {
            this.article = res.data
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
              line-height: 37px;
              font-size: 13px;
              cursor: pointer;
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
      }
    }
  }
</style>
