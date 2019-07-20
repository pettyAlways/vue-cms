<template>
  <div class="article-editor w1200">
    <div class="article-editor__header">
      <span class="title">标题</span>
      <el-input v-model="title" placeholder="请输入内容"></el-input>
    </div>
    <div class="article-editor__body" :style="{ height: visiableHeight + 'px' }">
      <my-tinymce ref="myTinymce" style="height: 100%"></my-tinymce>
    </div>
    <el-button type="primary" style="width: 100%" @click="postArticle" :disabled="disable">发布</el-button>
  </div>

</template>

<script>
  import { clientVisiable } from '@/utils/compatibility'
  import { addArticle, getArticle, editArticle, editShareArticle } from '@/api/article'
  import { mapGetters } from 'vuex'
  export default {
    name: 'articleEditor',
    data() {
      return {
        disable: false,
        visiableHeight: '',
        knowledgeId: '',
        articleId: '',
        title: '',
        power: []
      }
    },
    components: {
      myTinymce: () => import('@/components/my-tinymce')
    },
    computed: {
      ...mapGetters([
        'pageMenus'
      ])
    },
    watch: {
      pageMenus: {
        handler(newMenus) {
          if (newMenus) {
            this.power = newMenus['/platform/blog/knowledge/article/show']
          }
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    mounted() {
      this.visiableHeight = clientVisiable().height - 245
      this.knowledgeId = this.$route.query.knowledgeId
      this.articleId = this.$route.query.articleId
      if (this.articleId) {
        this.getArticle(this.articleId)
      }
    },
    methods: {
      getArticle(articleId) {
        getArticle({ articleId: articleId }).then(res => {
          if (res.flag) {
            this.article = res.data
            this.title = this.article.articleTitle
            this.$refs.myTinymce.setContent(this.article.content)
          }
        })
      },
      postArticle() {
        let params = {}
        params.content = this.$refs.myTinymce.getContent()
        params.id = this.articleId || ''
        params.knowledgeId = this.knowledgeId
        params.articleTitle = this.title
        let edit = this.power['文章共享修改'] ? editShareArticle : editArticle
        let method = this.articleId ? edit : addArticle
        if (this.$loadingHelper.startLoading('.article-editor', '正在发布中，请稍后')) {
          this.disable = true
          method(params).then(res => {
            this.$loadingHelper.stopLoading()
            if (res.flag) {
              let articleId = res.articleId
              let knowledgeId = res.knowledgeId
              this.$message({
                message: '文章发布成功',
                type: 'success'
              })
              setTimeout(() => {
                this.disable = true
                this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: articleId, knowledgeId: knowledgeId } })
              }, 3 * 1000)
            }
          }).catch(() => {
            this.disable = false
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-editor {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    height: 100%;
    background: #fff;
    &__header {
      height: 60px;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .title {
        flex-shrink: 0;
        margin-right: 15px;
        font-size: 16px;
        font-weight: 700;
        background-color: white;
      }
    }
    &__body {
    }
  }
</style>
