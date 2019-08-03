<template>
  <div class="article-editor w850">
    <div class="article-editor__cover" @mouseenter="showEdit = true" @mouseleave="showEdit = false" >
      <el-image v-if="article.coverUrl" :src="article.coverUrl" class="article-cover" fit="cover"></el-image>
      <div class="camera" v-if="!article.coverUrl || showEdit">
        <el-upload
          action=""
          ref="upload"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="getCoverFile">
          <i class="el-icon-camera"></i>
          <p>添加文章图片</p>
        </el-upload>
      </div>
      <el-dialog
        title="用户资料封面"
        :visible.sync="cDialog.visible"
        :modal="false"
        top="10vh"
        width="1200px">
        <image-cut-upload ref="imageCutUpload" type="article_cover"
                          :imageUrl="cDialog.imageUrl"
                          :fileName="cDialog.fileName"
                          :cropperOption="{fixedNumber: [2, 1], autoCropWidth: 200, autoCropHeight: 100}"
                          @getRemoteUrl="cRemoteUrl"></image-cut-upload>
      </el-dialog>
    </div>
    <div class="article-editor__form">
      <el-form ref="articleForm" :model="article" :rules="rules">
        <el-form-item  prop="articleTitle">
          <div class="article-editor__form__header">
            <el-input v-model="article.articleTitle" placeholder="请输入不大于30字的标题"></el-input>
          </div>
        </el-form-item>
        <div class="article-editor__form__body" v-if="article.coverUrl">
          <my-tinymce ref="myTinymce" style="height: 100%" :value="article.content"></my-tinymce>
        </div>
      </el-form>
    </div>
    <el-button v-if="article.coverUrl" type="primary" style="width: 100%" @click="postArticle" :disabled="disable">发布</el-button>
  </div>

</template>

<script>
  import { addArticle, getArticle, editArticle, editShareArticle } from '@/api/article'
  import { getImageUrl } from '../../utils/images'
  import { mapGetters } from 'vuex'
  export default {
    name: 'articleEditor',
    data() {
      return {
        disable: false,
        knowledgeId: '',
        articleId: '',
        article: {
          articleTitle: '',
          content: ''
        },
        coverUrl: '',
        showEdit: '',
        cDialog: {
          visible: false,
          imageUrl: '',
          fileName: ''
        },
        power: [],
        rules: {
          articleTitle: [
            { max: 30, message: '长度不超过30 个字符', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    components: {
      myTinymce: () => import('@/components/my-tinymce'),
      imageCutUpload: () => import('@/components/image-cut-upload')
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
          }
        })
      },
      cRemoteUrl(url) {
        this.$set(this.article, 'coverUrl', url)
        this.cDialog.visible = false
      },
      getCoverFile(file) {
        getImageUrl(file, (fileName, imageUrl) => {
          this.cDialog.visible = true
          this.cDialog.imageUrl = imageUrl
          this.cDialog.fileName = fileName
        })
      },
      postArticle() {
        this.$refs['articleForm'].validate((valid) => {
          if (valid) {
            let params = {}
            params.content = this.$refs.myTinymce.getContent()
            params.id = this.articleId || ''
            params.knowledgeId = this.knowledgeId
            params.articleTitle = this.article.articleTitle
            if (this.article.coverUrl) {
              params.coverUrl = this.article.coverUrl
            }
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
    &__cover {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      background-color: #f6f6f6;
      margin-bottom: 22px;
      .article-cover {
        width: 100%;
        height: 100%;
      }
      .camera {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 120px;
        height: 60px;
        cursor: pointer;
        color: rgba(blue, 0.6);
        i {
          font-size: 30px;
        }
        p {
        }
      }
    }
    &__form {
      &__header {
        height: 60px;
        display: flex;
        align-items: center;
        /deep/ .el-input__inner {
          height: 44px;
          min-height: 44px;
          display: block;
          width: 100%;
          border: 0;
          padding: 0px;
          font-size: 32px;
          line-height: 1.4;
          font-weight: 600;
          font-synthesis: style;
          outline: none;
          -webkit-box-shadow: none;
          box-shadow: none;
        }
      }
      &__body {
      }
    }
  }
</style>
