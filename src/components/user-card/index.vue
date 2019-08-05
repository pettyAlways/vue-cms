<template>
  <div class="author-panel">
    <ul>
      <li class="author">
        <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" />
        <img v-else src="./assets/user.png" />
        <div class="nick"><a @click="goUser(userInfo.userId)">{{userInfo.userName}}</a></div>
      </li>
      <li>
        <div class="key">简介:</div>
        <div class="value height-limit">
          <div>{{userInfo.introduce | autoTransform}}</div>
        </div>
      </li>
      <li>
        <div class="key">擅长:</div>
        <div class="tag height-limit" v-if="userInfo.skillList && userInfo.skillList.length">
          <el-tag size="mini" v-for="(item, index) in userInfo.skillList" :key="index">{{item.skillName}}</el-tag>
        </div>
        <div v-else>暂无</div>
      </li>
      <li>
        <div class="key">个性签名:</div>
        <div class="value height-limit">
          <span>{{userInfo.signature | autoTransform}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'userCard',
    props: {
      userInfo: Object
    },
    methods: {
      goUser(userId) {
        this.$router.push({ name: 'profile', params: { userId: userId } })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .author-panel {
    width: 100%;
    height: 100%;
    ul {
      list-style: none;
      padding: 0px;
      margin-bottom: 10px;
      border-bottom: 1px dotted #e6e6e6;
      li {
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;
        line-height: 22px;
        .key {
          margin-right: 10px;
          flex-shrink: 0;
          font-size: 13px;
        }
        .tag {
          /deep/ .el-tag--mini {
            margin-bottom: 5px;
            margin-left: 3px;
          }
        }
        .value {
          line-height: 22px;
          margin-left: 5px;
          font-size: 13px;
          word-break: break-all;
          word-wrap : break-word
        }
        .height-limit {
          max-height: 100px;
          overflow: hidden;
        }
      }
      li.author {
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid burlywood
        }
        .nick {
          margin-left: 15px;
          font-size: 14px;
          font-weight: 700;
          color: #256;
        }
      }

    }
  }
</style>
