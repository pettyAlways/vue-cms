<template>
  <div class="comments-item">
    <div class="pull-left">
      <img class="avatar-32" :src="avatar" alt="" v-if="avatar" @click="handleClickAvatar">
    </div>
    <div class="comments-box">
      <div class="comments-trigger">
        <strong><a target="_blank" href="javascript:void(0)" @click="handleClickAuthor">{{author}}</a></strong>
        <span class="comments-date">  ·  {{time  }}</span>
      </div>
      <div class="comments-content">
        <p>{{content}}</p>
      </div>
      <p class="comments-ops">
        <span class="comments-reply-btn" @click="handleAddReply">回复</span>
        <span class="comments-reply-btn" @click="handleDeleteComment" v-if="userShow.userId === commentUserId">删除</span>
      </p>
      <div class="reply-list">
        <div class="reply-list-panel" v-show="replyList && replyList.length">
          <comment-reply
            v-for="(item, index) in replyList"
            :key="index + '.'"
            :replyObj="item.replyObj"
            :replyObjName="item.replyObjName"
            :replyId="item.replyId"
            :authorId="item.replyUserId"
            :author="item.replyUserName"
            :content="item.replyContent"
            :time="item.replyTime"
            @beginReply="beginReply"
            @finishDeleteReply="finishDeleteReply">
          </comment-reply>
        </div>
        <div class="reply-item" v-if="showReplyPanel">
          <comment-box
            :commentId="commentId"
            :replyObj="replyObj"
            :replyObjName="replyObjName"
            @finishComment="finishReply"
          ></comment-box>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { deleteComment } from '../../api/comment'

  export default {
    name: 'commentItem',
    props: {
      commentId: Number,
      commentUserId: Number,
      avatar: String,
      author: String,
      content: String,
      time: [String, Number],
      replyList: Array
    },
    data () {
      return {
        showReplyPanel: false,
        replyObj: Number,
        replyObjName: ''
      }
    },
    components: {
      commentBox: () => import('@/components/comment-box'),
      commentReply: () => import('@/components/comment-reply')
    },
    computed: {
      ...mapGetters([
        'userShow'
      ])
    },
    methods: {
      handleClickAvatar (event) {
        this.$router.push({ name: 'profile', params: { userId: this.commentUserId } })
      },
      handleClickAuthor (event) {
        this.$router.push({ name: 'profile', params: { userId: this.commentUserId } })
      },
      handleAddReply () {
        this.showReplyPanel = true
      },
      handleDeleteComment() {
        deleteComment({ commentId: this.commentId }).then(res => {
          if (res.flag) {
            this.$message({
              message: '删除评论成功',
              type: 'success'
            })
            this.finishDeleteReply()
          }
        })
      },
      finishReply() {
        this.showReplyPanel = false
        this.$emit('finishReply')
      },
      beginReply(replyUserId, replyUserName) {
        this.showReplyPanel = true
        this.replyObj = replyUserId
        this.replyObjName = replyUserName
      },
      finishDeleteReply() {
        this.$emit('finishDeleteReply')
      }
    }
  }
</script>

<style scoped>
  img {
    border: 0;
    vertical-align: middle;
  }
  .ml10 {
    margin-left: 10px !important;
  }
  .ml15 {
    margin-left: 15px !important;
  }
  .comments-item {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0,0,0,0.09);
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    font-size: 13px;
    font-family: "微软雅黑", "Microsoft YaHei", "Verdana", "Arial", "Helvetica", sans-serif;
  }
  .pull-left {
    float: left !important;
  }
  .pull-right {
    float: right !important;
  }
  .avatar-32 {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .comments-item a {
    color: #009a61;
    text-decoration: none;
    background: transparent;
  }
  .comments-item a:hover,
  .comments-item a:active,
  .comments-item a:focus {
    outline: 0;
  }
  .comments-box {
    padding-left: 47px;
  }
  .comments-box strong {
    font-weight: bold;
  }
  .comments-trigger {
    margin-bottom: 10px;
    color: #999;
    font-size: 13px;
  }
  .comments-option {
    /*visibility: hidden;*/
  }
  .comments-content {
    line-height: 1.6;
    word-wrap: break-word;
    margin-bottom: 10px !important;
  }
  .comments-content::before,
  .comments-content::after {
    display: table;
  }
  .comments-content::after {
    content: "";
    clear: both;
  }
  .comments-ops {
    margin: 0;
    color: #999;
    font-size: 13px;
  }
  .comments-reply-btn {
    cursor: pointer;
  }
  .reply-list {
    margin-top: 10px;
    font-size: 13px;
    background-color: #FAFAFA;
    padding: 0 10px;
    color: #666;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
  }
  .reply-list-panel {

  }
  .reply-item {
    height: 120px;
  }
</style>
