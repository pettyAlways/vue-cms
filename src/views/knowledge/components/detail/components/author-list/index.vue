<template>
  <div class="author-panel">
    <common-panel-two title="创建者" :bStyle="{padding: '0px'}" :hStyle="{ height: '45px', 'font-size': '18px'}">
      <template slot="more">
        <span class="header-tip">AUTHOR-INFO</span>
      </template>
      <template slot="body">
        <user-card
          :userId="userProfile.userId"
          :skill="userProfile.skillList"
          :userImg="userProfile.avatarUrl"
          :introduce="userProfile.introduce"
          :signature="userProfile.signature"
          :userName="userProfile.userName">
        </user-card>
      </template>
    </common-panel-two>
  </div>
</template>

<script>
  import { retrieveKnowledgeCreator } from '../../../../../../api/knowledge'

  export default {
    name: 'authorList',
    props: {
      knowledgeId: Number
    },
    data() {
      return {
        userProfile: ''
      }
    },
    components: {
      commonPanelTwo: () => import('@/components/common-panel-two'),
      userCard: () => import('@/components/user-card')
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.getAuthorInfo()
      },
      getAuthorInfo() {
        retrieveKnowledgeCreator({ knowledgeId: this.knowledgeId }).then(res => {
          if (res.flag) {
            this.userProfile = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .author-panel {
    height: 100%;
    .header-tip {
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      color: #cbcbcb;
    }
  }
</style>
