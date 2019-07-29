<template>
  <div class="news-panel">
    <common-panel-two title="推荐作者" :bStyle="{padding: '0px'}" :hStyle="{ height: '45px', 'font-size': '18px'}">
      <template slot="more">
        <span class="header-tip">AUTHOR-INFO</span>
      </template>
      <template slot="body">
        <el-carousel direction="vertical">
          <el-carousel-item v-for="(item, index) in participantList" :key="index">
            <user-card
              :userId="item.userId"
              :skill="item.skillList"
              :userImg="item.avatarUrl"
              :introduce="item.introduce"
              :signature="item.signature"
              :userName="item.userName">
            </user-card>
          </el-carousel-item>
        </el-carousel>

      </template>
    </common-panel-two>
  </div>
</template>

<script>
  import { retrieveKnowledgeParticipant } from '../../../../../../api/knowledge'

  export default {
    name: 'knowledgeParticipant',
    props: {
      knowledgeId: String
    },
    data() {
      return {
        participantList: []
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
        this.knowledgeParticipant()
      },
      knowledgeParticipant() {
        retrieveKnowledgeParticipant({ knowledgeId: this.knowledgeId }).then(res => {
          if (res.flag) {
            this.participantList = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .news-panel {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #e6e6e6;
      .title {
        font-size: 18px;
        font-weight: 700;
        color: #323232;
      }
      .btn {
        color: #999;
        font-weight: 400;
        a {
          cursor: pointer;
          &:hover {
            color: #259;
          }
        }
      }
    }
    &__body {
      margin-top: 10px;
      &__content {
        list-style: none;
        padding: 0px;
        li {
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e6e6e6;
          a {
            display: block;
            height: 30px;
          }
        }
      }

    }
  }
</style>
