<template>
  <div class="messagePanel w1200">
    <el-tabs tab-position="left" class="messagePanel-tab">
      <el-tab-pane label="未读消息">
        <un-read :messageList="unReadMessages"></un-read>
      </el-tab-pane>
      <el-tab-pane label="已读消息"><read></read></el-tab-pane>
      <el-tab-pane label="审核消息"><audit></audit></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'message',
    components: {
      unRead: () => import('@/views/message/components/unread'),
      read: () => import('@/views/message/components/read'),
      audit: () => import('@/views/message/components/audit')
    },
    data() {
      return {
        tabPosition: 1,
        unReadMessages: [],
        readMessages: [],
        auditMessages: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .messagePanel {
    margin-top: 15px;
    &-tab {
      min-height: 200px;
      /deep/ .message-panel {
        min-height: 400px;
      }
      /deep/ .el-tabs__header {
        margin-top: 60px;
        margin-right: 50px
      }
    }
  }
</style>
