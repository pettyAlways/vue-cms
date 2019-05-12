<template>
  <div class="author-panel">
    <div class="author-panel__header">
      <div class="title">推荐作者</div>
      <div class="btn"><a>更多作者</a></div>
    </div>
    <div class="author-panel__body">
      <ul v-for="index in 2" :key="index">
        <li class="author">
          <img :src="require('./assets/author01.jpg')" />
          <div class="nick"><a>鹰嘴豆</a></div>
        </li>
        <li>
          <div class="key">简介:</div>
          <div class="value">
            <span>喜欢用程序写一些对生活有帮助的小东西,热衷于写作记录生活点点滴滴</span>
          </div>
        </li>
        <li>
          <div class="key">擅长:</div>
          <div class="tag">
            <el-tag size="mini">Java</el-tag>
            <el-tag size="mini">Javascript</el-tag>
            <el-tag size="mini">vue</el-tag>
            <el-tag size="mini">c++</el-tag>
            <el-tag size="mini">futter</el-tag>
            <el-tag size="mini">游戏</el-tag>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'author'
  }
</script>

<style lang="scss" scoped>
  .author-panel {
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
      ul {
        list-style: none;
        padding: 0px;
        margin-bottom: 10px;
        border-bottom: 1px dotted #e6e6e6;
        li {
          display: flex;
          flex-direction: row;
          margin-bottom: 8px;
          .key {
            margin-right: 10px;
            flex-shrink: 0;
            font-size: 13px;
          }
          .tag {
            /deep/ .el-tag--mini {
              margin-bottom: 5px;
            }
          }
          .value {
            margin-left: 5px;
            font-size: 13px;
          }
        }
        li.author {
          align-items: center;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 2px solid burlywood
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
  }
</style>
