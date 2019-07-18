<template>
  <el-card class="message-panel">
    <div slot="header" class="message-header">
      <el-badge :value="messages.length" class="item" v-if="messages.length">
        <span>未读消息</span>
      </el-badge>
      <span v-else>未读消息</span>
      <el-button style="float: right; padding: 3px 0" type="text">全部可读</el-button>
    </div>
    <div v-for="(item, index) in messages" :key="index" class="message-body">
        <div v-if="item.mtype === '1'">
          <p><router-link :to="{ path: '/platform/blog/knowledge/article/show', query: { knowledgeId: item.knowledgeId, articleId: item. articleId } }">
            {{item.message}}
          </router-link></p>
          <span>{{item.createTime}}</span>
        </div>
        <div v-if="item.mtype === '2'">
          <p><router-link :to="{ path: '/platform/blog/knowledge/detail', query: {knowledgeId: item.knowledgeId} }">
            {{item.message}}
          </router-link></p>
          <p>{{item.createTime}}</p>
        </div>
        <div v-if="item.mtype in '[3, 4]'">
          <p><router-link :to="{ path: '/platform/blog/center/knowledge' }">
            {{item.message}}
          </router-link></p>
          <p>{{item.createTime}}</p>
        </div>
        <div v-if="item.mtype in '[5, 6]'">
          <p><router-link :to="{ path: '/platform/blog/center/category' }">
            {{item.message}}
          </router-link></p>
          <p>{{item.createTime}}</p>
        </div>
        <div v-if="item.mtype === '7'">
          <p><router-link :to="{ path: '' }">
            {{item.message}}
          </router-link></p>
          <p>{{item.createTime}}</p>
        </div>
        <div v-if="item.mtype === '8'">
          <p><router-link :to="{ path: '' }">
            {{item.message}}
          </router-link></p>
          <p>{{item.createTime}}</p>
        </div>
        <div v-if="item.mtype === '9'">
          <p><router-link :to="{ path: '/platform/blog/center/knowledge' }">
            {{item.message}}
          </router-link></p>
          <p>{{item.createTime}}</p>
        </div>

    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'unRead',
    props: {
      messageList: []
    },
    data() {
      return {
        messages: []
      }
    },
    watch: {
      messageList (messageList) {
        this.messages = messageList.map(item => {
          if (item.reserve) {
            for (let key in item.reserve) {
              item.key = item.reserve[key]
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message-panel {
    .message-header {
      display: flex;
      justify-content: space-between;
    }
    .message-body {
      div {
        display: flex;
        justify-content: space-between;
        p {
          flex-grow: 1;
          font-size: 14px;
          color: #595959;
        }
        span {
          display: block;
          width: 40px;
          font-size: 12px;
          color: #bfbfbf;
        }
      }
    }
  }
</style>
