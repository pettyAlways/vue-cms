<template>
  <div class="author-panel">
    <common-panel-two title="推荐作者" :bStyle="{padding: '0px'}" :hStyle="{ height: '45px', 'font-size': '18px'}">
      <template slot="more">
        <span class="header-tip">AUTHOR-INFO</span>
      </template>
      <template slot="body">
        <user-card
          v-for="(item, index) in authorList"
          :key = index
          :userId="item.userId"
          :skill="item.skillList"
          :userImg="item.avatarUrl"
          :introduce="item.introduce"
          :signature="item.signature"
          :userName="item.userName">
        </user-card>
      </template>
    </common-panel-two>
  </div>
</template>

<script>
  import { retrieveRecommendAuthor } from '../../../../api/user'

  export default {
    name: 'author',
    components: {
      commonPanelTwo: () => import('@/components/common-panel-two'),
      userCard: () => import('@/components/user-card')
    },
    data() {
      return {
        authorList: ''
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.recommendAuthor()
      },
      recommendAuthor() {
        retrieveRecommendAuthor().then(res => {
          if (res.flag) {
            this.authorList = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .author-panel {
    .header-tip {
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      color: #cbcbcb;
    }
  }
</style>
