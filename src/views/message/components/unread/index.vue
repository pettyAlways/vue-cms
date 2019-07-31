<template>
  <el-card class="message-panel">
    <div slot="header" class="message-header">
      <div class="message-header__content"><span class="title">未读消息</span>
        <span class="tip">您有{{unReadMessages.length}}条消息未读</span></div>
      <el-button style="font-size: 14px;" type="text" @click="allRead" :disabled="!unReadMessages.length">全部可读</el-button>
    </div>
    <div v-for="(item, index) in unReadMessages" :key="index" class="message-body">
        <div v-if="item.mtype === '1'">
          <p><a @click="confirmRead(item.id, { path: '/platform/blog/knowledge/article/show', query: { knowledgeId: item.knowledgeId, articleId: item. articleId } })">
            {{item.message}}
          </a></p>
          <span>{{item.createTime}}</span>
        </div>
        <div v-if="item.mtype === '2'">
          <p><a @click="confirmRead(item.id, { path: '/platform/blog/knowledge/detail', query: {knowledgeId: item.knowledgeId} })">
            {{item.message}}
          </a></p>
          <span>{{item.createTime}}</span>
        </div>
        <div v-if="['3', '4'].includes(item.mtype)">
          <p><a @click="confirmRead(item.id, { path: '/platform/blog/center/knowledge' })">
            {{item.message}}
          </a></p>
          <span>{{item.createTime}}</span>
        </div>
        <div v-if="[5, 6].includes(item.mtype)">
          <p><a @click="confirmRead(item.id, { path: '/platform/blog/center/category' })" >
            {{item.message}}
          </a></p>
          <span>{{item.createTime}}</span>
        </div>
        <div v-if="item.mtype === '7'">
          <p><a @click="confirmRead(item.id, { name: 'audit', params: { activeName: 'joinKnowledge' } })">
            {{item.message}}
          </a></p>
          <span>{{item.createTime}}</span>
        </div>
        <div v-if="item.mtype === '8'">
          <p><a @click="confirmRead(item.id, { name: 'audit', params: { activeName: 'beAuthor' } })">
            {{item.message}}
          </a></p>
          <span>{{item.createTime}}</span>
        </div>
        <div v-if="item.mtype === '9'">
          <p><a @click="confirmRead(item.id, { path: '/platform/blog/center/knowledge' })">
            {{item.message}}
          </a></p>
          <span>{{item.createTime}}</span>
        </div>
        <div v-if="['10', '11'].includes(item.mtype)">
          <p>{{item.message}}</p>
          <span>{{item.createTime}}</span>
        </div>
    </div>
  </el-card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { retrieveMessages } from '@/api/message'
  export default {
    name: 'unRead',
    data() {
      return {
        unReadMessages: []
      }
    },
    computed: {
      ...mapGetters([
        'messageNum'
      ])
    },
    watch: {
      messageNum () {
        this.retrieveMessages({ isRead: 'N' })
      }
    },
    mounted () {
      this.retrieveMessages({ isRead: 'N' })
    },
    methods: {
      ...mapActions([
        'confirmMessageRead',
        'allMessageRead'
      ]),
      retrieveMessages(params) {
        retrieveMessages(params).then(res => {
          if (res.flag) {
            this.unReadMessages = res.unReadMessages
            this.unReadMessages.forEach(item => {
              let reserve = JSON.parse(item.reserve)
              for (let key in reserve) {
                this.$set(item, key, reserve[key])
              }
            })
          }
        })
      },
      confirmRead(messageId, route) {
        this.$router.push(route)
        this.confirmMessageRead({ id: messageId })
      },
      allRead() {
        this.allMessageRead()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message-panel {
    .message-header {
      display: flex;
      justify-content: space-between;
      &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 160px;
        .title {
          font-size: 14px;
        }
        .tip {
          font-size: 12px;
          color: #bfbfbf;
        }
      }
    }
    .message-body {
      div {
        display: flex;
        justify-content: space-between;
        height: 30px;
        border-bottom: 1px solid gainsboro;
        margin-bottom: 15px;
        p {
          flex-grow: 1;
          font-size: 13px;
          color: #1890ff;
        }
        span {
          display: block;
          width: 80px;
          font-size: 12px;
          color: #bfbfbf;
        }
      }
    }
  }
</style>
