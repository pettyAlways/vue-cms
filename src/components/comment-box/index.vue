<template>
  <div class="comment-box">
    <div class="box-top">
      <el-image v-if="userShow.avatarUrl" :src="userShow.avatarUrl" class="userAvatar">
      </el-image>
      <el-image v-else :src="require('./assets/user.png')" class="userAvatar"></el-image>
      <div class="content">
        <el-form ref="commentForm" :model="comment" :inline="true" :rules="rules">
          <el-form-item prop="content">
            <el-input type="textarea" v-model="comment.content" :placeholder="tipContent"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tool-btn">
      <el-button v-if="userShow.userId" type="primary" @click="postHandler" size="small">提交</el-button>
      <a v-else @click="thirdParty">
        <icon-svg iconClass="gitHub" :vStyle="{width: '1.2em', height: '1.2em'}"></icon-svg>&nbsp;使用GitHub登录
      </a>
    </div>
  </div>
</template>

<script>
  import { postReply, postComment } from '../../api/comment'
  import { thirdPartyLogin } from '../../utils/third-party-login'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'commentBox',
    props: {
      commentId: Number,
      articleId: Number,
      replyObj: Number,
      replyObjName: String
    },
    computed: {
      ...mapGetters([
        'userShow'
      ]),
      tipContent() {
        return this.replyObj ? `回复${this.replyObjName}:` : this.tip
      }
    },
    data() {
      return {
        tip: '文明社会,理性评论',
        comment: {
          content: ''
        },
        rules: {
          content: [
            { required: true, message: '内容不能为空' },
            { max: 200, message: '最大不超过200' }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'retrieveUserInfo',
        'userLogin'
      ]),
      thirdParty() {
        thirdPartyLogin().then(res => {
          this.userLogin({ username: res.username, password: res.password, thirdparty: 'Y' }).then(() => {
            this.retrieveUserInfo()
            this.init()
          })
        })
      },
      postHandler() {
        this.$refs['commentForm'].validate((valid) => {
          if (valid) {
            let method
            let data = {}
            if (this.articleId) {
              method = postComment
              data['articleId'] = this.articleId
              data['commentContent'] = this.comment.content
            } else if (this.commentId) {
              method = postReply
              data['commentId'] = this.commentId
              data['replyContent'] = this.comment.content
              if (this.replyObj) {
                data['replyObj'] = this.replyObj
              }
            }
            method(data).then(res => {
              if (res.flag) {
                this.$message({
                  message: '提交评论成功',
                  type: 'success'
                })
              }
              this.comment.content = ''
              this.$nextTick(() => {
                if (this.$refs.commentForm) {
                  this.$refs.commentForm.clearValidate()
                }
              })
              this.$emit('finishComment')
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.comment-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #FAFAFA;
  padding: 10px;
  .box-top {
    display: flex;
    align-items: start;
    flex-grow: 1;
    .userAvatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .content {
      align-self: stretch;
      flex-grow: 1;
      /deep/ .el-form {
        height: 100%;
        .el-form-item {
          width: 100%;
          height: 100%;
          margin-bottom: 0px;
          .el-form-item__content {
            width: 100%;
            height: 100%;
            .el-textarea {
              height: 100%;
              .el-textarea__inner {
                height: 100%;
              }
            }

          }
        }
      }


    }
  }
  .tool-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
    a {
      display: flex;
      align-items: center;
    }
  }
}
</style>
