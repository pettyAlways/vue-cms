<template>
  <div class="reply-item-panel">
    <div class="reply-content-block">
      <div class="reply-content">
        <p><span v-if="replyObj">回复<a @click="handleClickReply">{{replyObjName}}</a>:</span>&nbsp;{{content}}</p>
      </div>
      <div class="comment-func inline-block">
        <span class="comment-meta inline-block flex-show">
          <span> — </span>
          <a target="_blank" href="javascript:void(0)" @click="handleClickAuthor()">{{author}}</a>
          <span class="comments-date">  ·  {{time}}</span>
          <div class="tool-btn">
            <a @click="addReply(authorId, author)">回复</a>
            <a @click="deleteReply" v-if="userShow.userId === authorId">删除</a>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { deleteReply } from '../../api/comment'
  import { mapGetters } from 'vuex'
  export default {
    name: 'commentReply',
    props: {
      replyObj: Number,
      replyObjName: String,
      replyId: Number,
      authorId: Number,
      author: String,
      content: String,
      tools: Array,
      time: [String, Number]
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'userShow'
      ])
    },
    methods: {
      handleClickAuthor () {
        this.$router.push({ name: 'profile', params: { userId: this.authorId } })
      },
      handleClickReply () {
        this.$router.push({ name: 'profile', params: { userId: this.replyObj } })
      },
      addReply(replyUserId, replyUserName) {
        this.$emit('beginReply', replyUserId, replyUserName)
      },
      deleteReply() {
        deleteReply({ replyId: this.replyId }).then(res => {
          if (res.flag) {
            this.$message({
              message: '删除回复成功',
              type: 'success'
            })
          }
          this.$emit('finishDeleteReply')
        })
      }
    }
  }
</script>

<style scoped>
  .ml10 {
    margin-left: 10px !important;
  }
  .ml15 {
    margin-left: 15px !important;
  }
  .pull-left {
    float: left !important;
  }
  .pull-right {
    float: right !important;
  }
  .reply-item-panel {
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px dashed rgba(0,0,0,0.09);
    word-break: break-word;
  }
  .reply-item-panel a {
    color: #009a61;
    text-decoration: none;
    background: transparent;
  }
  .reply-item-panel a:hover,
  .reply-item-panel a:active,
  .reply-item-panel a:focus {
    outline: 0;
  }
  .reply-item-panel p {
    margin-bottom: 5px;
  }
  .comment-tools {
    /*visibility: hidden;*/
  }
  .comment-meta {
    color: #999;
  }
  .inline-block {
    display: inline-block;
  }
  .tool-btn a {
    margin-left: 5px;
    color: #999;
    font-size: 13px;
  }
  .flex-show {
    display: flex;
    align-items: flex-start;
  }
  .comments-date {
    font-size: 13px;
  }
</style>
