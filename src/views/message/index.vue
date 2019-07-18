<template>
  <div class="messagePanel">
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="未读消息">
        <un-read :messageList="messages"></un-read>
      </el-tab-pane>
      <el-tab-pane label="已读消息">配置管理</el-tab-pane>
      <el-tab-pane label="审核消息">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { retrieveMessages } from '@/api/login'
  export default {
    name: 'message',
    components: {
      unRead: () => import('@/views/message/unread')
    },
    data() {
      return {
        unReadMessages: [],
        readMessages: [],
        auditMessages: []
      }
    },
    mounted() {

    },
    method: {
      retrieveMessages() {
        retrieveMessages().then(res => {
          if (res.flag) {
            this.unReadMessages = res.unReadMessages
            this.readMessages = res.readMessages
            this.auditMessages = res.auditMessages
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
