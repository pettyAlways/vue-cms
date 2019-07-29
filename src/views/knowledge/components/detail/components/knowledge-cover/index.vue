<template>
  <div class="knowledge-cover">
    <div class="knowledge-cover__info">
      <div class="knowledge-cover__info__left">
        <img :src="knowledgeItem.knowledgeCover">
      </div>
      <div class="knowledge-cover__info__right">
        <div class="title">
          <span>{{knowledgeItem.knowledgeName}}</span>
        </div>
        <div class="author">
          <span>创建者：</span>
          <span>{{ knowledgeItem.creatorName }}</span>
        </div>
        <div class="author">
          <span>参与者：</span>
          <ul v-if="knowledgeItem.participantList && knowledgeItem.participantList.length ">
            <li v-for="(item, index) in knowledgeItem.participantList" :key="index">
              <a>{{ item.userName }}</a>
            </li>
          </ul>
          <span v-else>暂无</span>
        </div>
        <div class="introduce">
          <span>简介：</span>
          <div class="content"><a>{{ knowledgeItem.knowledgeDesc }}</a></div>
        </div>
        <div class="category">
          <span>所属分类：</span>
          <div class="content"><a>{{ knowledgeItem.categoryName}}</a></div>
        </div>
      </div>
    </div>
    <div class="knowledge-cover__left">
      <div class="knowledge-cover__left__join">
        <span><i class="el-icon-circle-plus-outline"></i> 申请加入</span>
      </div>
      <div class="statistic">
        <ul>
          <li>
            <span>{{ knowledgeItem.articleCounts }}</span>
            <span>篇文章</span>
          </li>
          <li v-if="knowledgeItem.participantList">
            <span>{{ knowledgeItem.participantList.length}}</span>
            <span>个参与者</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import { retrieveKnowledgeDetail } from '@/api/knowledge'
  export default {
    name: 'knowledgeCover',
    inject: ['kData'],
    data() {
      return {
        knowledgeId: '',
        knowledgeItem: ''
      }
    },
    mounted() {
      this.knowledgeId = this.kData.knowledgeId
      this.init()
    },
    methods: {
      init() {
        this.knowledgeDetail()
      },
      knowledgeDetail() {
        retrieveKnowledgeDetail({ knowledgeId: this.knowledgeId }).then(res => {
          if (res.flag) {
            this.knowledgeItem = res.data
            this.$emit('getKnowledgeName', this.knowledgeItem.knowledgeName)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-cover {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    &__info {
      display: flex;
      height: 230px;
      &__left {
        flex-shrink: 0;
        img {
          width: 160px;
          height: 200px;
          object-fit: cover;
        }
      }
      &__right {
        width: 550px;
        margin-left: 15px;
        div {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .title {
          font-size: 18px;
          font-weight: 700;
        }
        .author {
          display: flex;
          span {
            line-height: 25px;
            flex-shrink: 0;
          }
          ul {
            display: flex;
            list-style: none;
            padding: 0px;
            li {
              margin-left: 10px;
              img {
                width: 25px;
                height: 25px;
                object-fit: cover;
                border-radius: 50%;
                border: 2px solid rosybrown;
              }
            }
          }
        }
        .introduce {
          display: flex;
          max-height: 70px;
          overflow: hidden;
          span {
            flex-shrink: 0;
          }
          .content {
            margin-left: 10px;
            flex-wrap: wrap;
            color:  #737373;
          }
        }
        .category {
          display: flex;
          span {
            flex-shrink: 0;
          }
          .content {
            margin-left: 10px;
            a {
              color: #4c84be;
              cursor: pointer;
              &:hover {
                color: #409EFF;
              }
            }
          }
        }
      }
    }
    &__left {
      display: flex;
      flex-direction: column;
      &__join {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 40%;
        right: 15px;
        cursor: pointer;
        span {
          font-size: 18px;
        }
      }
      .statistic {
        ul {
          display: flex;
          list-style: none;
          padding: 0px;
          li {
            margin-right: 15px;
            span:nth-of-type(1) {
              font: 18px/20px Arial;
              font-weight: 400;
              font-family: 'yMxThZoL';
              color: #262626;
            }
            span:nth-of-type(2) {
              font: 16px/20px PingFangSC-Regular,'-apple-system',Simsun;
              color: #666;
            }
          }
        }
      }
    }

  }
</style>
