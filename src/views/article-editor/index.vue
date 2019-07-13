<template>
  <div class="article-editor w1200">
    <div class="article-editor__header">
      <span class="title">标题</span>
      <el-input v-model="title" placeholder="请输入内容"></el-input>
    </div>
    <div class="article-editor__body" :style="{ height: visiableHeight + 'px' }">
      <my-tinymce ref="myTinymce" style="height: 100%"></my-tinymce>
    </div>
    <el-button type="primary" style="width: 100%" @click="postArticle">发布</el-button>
  </div>

</template>

<script>
  import { clientVisiable } from '@/utils/compatibility'
  import { addArticle, getArticle, editArticle } from '@/api/article'
  export default {
    name: 'articleEditor',
    data() {
      return {
        visiableHeight: '',
        knowledgeId: '',
        articleId: '',
        title: ''
      }
    },
    components: {
      myTinymce: () => import('@/components/my-tinymce')
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
        params.knowledge = {}
        params.id = this.articleId || ''
        params.knowledge.id = this.knowledgeId
        params.articleTitle = this.title
        let method = this.articleId ? editArticle : addArticle
        method(params).then(res => {
          if (res.flag) {
            let articleId = res.articleId
            let knowledgeId = res.knowledgeId
            this.$message({
              message: '文章发布成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: articleId, knowledgeId: knowledgeId } })
            }, 3 * 1000)
          }
        })
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
