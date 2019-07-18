<template>
  <el-card class="message-panel">
    <div slot="header" class="message-header">
      <div class="message-header__content"><span class="title">审核消息</span>
        <span class="tip">您有{{auditMessages.length}}条消息未读</span></div>
    </div>
    <div v-for="(item, index) in auditMessages" :key="index" class="message-body">
      <div v-if="item.mtype === '7'">
        <p><a @click="confirmRead(item.id, { path: '' })">
          {{item.message}}
        </a></p>
        <span>{{item.createTime}}</span>
      </div>
      <div v-if="item.mtype === '8'">
        <p><a @click="confirmRead(item.id, { path: '' })">
          {{item.message}}
        </a></p>
        <span>{{item.createTime}}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { auditMessage } from '@/api/message'
  export default {
    name: 'unRead',
    data() {
      return {
        auditMessages: []
      }
    },
    computed: {
      ...mapGetters([
        'messageNum'
      ])
    },
    watch: {
      messageNum () {
        this.auditMessage({ isRead: 'N' })
      }
    },
    mounted () {
      this.auditMessage({ isRead: 'N' })
    },
    methods: {
      ...mapActions([
        'confirmMessageRead',
        'allMessageRead'
      ]),
      auditMessage(params) {
        auditMessage(params).then(res => {
          if (res.flag) {
            this.auditMessages = res.auditMessages
            this.auditMessages.forEach(item => {
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
