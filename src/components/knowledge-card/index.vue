<template>
  <div class="knowledge-card">
    <el-card>
      <el-image :src="knowledgeCover" class="cover" fit="cover"></el-image>
      <div class="title-panel">
        <p class="title"><a @click="goKnowledge">{{title}}</a></p>
        <span class="create-time">{{createTime | toDate}}</span>
      </div>
      <div class="desc">
        {{desc}}
      </div>
      <div class="toolbar">
        <ul>
          <li><icon-svg iconClass="person" :vStyle="{ width: '12px', height: '12px' }"></icon-svg><a class="creator" @click="goProfile">{{creatorName}}</a></li>
          <li><icon-svg iconClass="category" :vStyle="{ width: '12px', height: '12px' }"></icon-svg><span class="category">{{categoryName}}</span></li>
          <li><icon-svg iconClass="article" :vStyle="{ width: '12px', height: '12px' }"></icon-svg><span class="article-num">{{articleNum}}<span class="small">篇</span></span></li>
          <li><icon-svg iconClass="participant" :vStyle="{ width: '14px', height: '14px' }"></icon-svg><span class="participant">{{participantNum}}<span class="small">人</span></span></li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeCard',
    props: {
      knowledgeCover: {
        type: String,
        default: require('./assets/placeholder.png')
      },
      knowledgeId: Number,
      title: String,
      desc: String,
      createTime: String,
      creatorName: String,
      categoryName: String,
      creator: Number,
      articleNum: {
        type: Number,
        default: 0
      },
      participantNum: {
        type: Number,
        default: 0
      }
    },
    methods: {
      goProfile() {
        this.$router.push({ name: 'profile', params: { userId: this.creator } })
      },
      goKnowledge() {
        this.$router.push({ name: 'knowledgeDetail', params: { knowledgeId: this.knowledgeId } })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-card {
    width: 100%;
    height: 100%;
    /deep/ .el-card {
      .el-card__body {
        padding: 3px;
      }
    }
    .cover {
      width: 100%;
      height: 150px;
    }
    .title-panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #323232;
      }
      .create-time {
        font-size: 12px;
        color: #cccccc;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
      }
    }
    .desc {
      line-height: 22px;
      font-size: 12px;
      color: #323232;
      min-height: 65px;
    }
    .toolbar {
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          line-height: 30px;
          margin-right: 4px;
          font-size: 12px;
          color: #323232;
          .small {
            font-size: 11px;
          }
          .creator {
            margin-left: 3px;
            max-width: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #3f87ae;
          }
          a:hover {
            color: #409EFF
          }
          .category {
            margin-left: 5px;
            max-width: 90px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .article-num {
            margin-left: 5px;
          }
          .participant {
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
