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
          <span >创建者：</span>
          <a @click="goProfile(knowledgeItem.creator)" class="author-name">{{ knowledgeItem.creatorName }}</a>
        </div>
        <div class="author">
          <span>参与者：</span>
          <ul v-if="knowledgeItem.participantList && knowledgeItem.participantList.length ">
            <li v-for="(item, index) in knowledgeItem.participantList" :key="index">
              <a @click="goProfile(item.userId)" class="author-name">{{ item.userName }}</a>
            </li>
          </ul>
          <span v-else class="author-name">暂无</span>
        </div>
        <div class="introduce">
          <span>简介：</span>
          <div class="content"><a>{{ knowledgeItem.knowledgeDesc }}</a></div>
        </div>
        <div class="category">
          <span>分类：</span>
          <div class="content"><a @click="goCategory(knowledgeItem.categoryId)">{{ knowledgeItem.categoryName}}</a></div>
        </div>
      </div>
    </div>
    <div class="knowledge-cover__left">
      <div v-if="userShow.userId !== knowledgeItem.creator" class="knowledge-cover__left__join" @click="joinKnowledge(knowledgeId)">
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
  import { retrieveKnowledgeDetail, joinKnowledge, alreadyJoin } from '@/api/knowledge'
  import { mapGetters } from 'vuex'
  export default {
    name: 'knowledgeCover',
    inject: ['kData'],
    data() {
      return {
        knowledgeId: '',
        knowledgeItem: '',
        token: ''
      }
    },
    computed: {
      ...mapGetters([
        'userShow'
      ])
    },
    mounted() {
      this.token = this.$route.params.token
      this.knowledgeId = this.kData.knowledgeId
      this.init()
    },
    methods: {
      init() {
        this.knowledgeDetail()
      },
      goProfile(userId) {
        this.$router.push({ name: 'profile', params: { userId: userId } })
      },
      goCategory(categoryId) {
        this.$router.push({ path: '/knowledge#category', query: { categoryId: categoryId } })
      },
      knowledgeDetail() {
        retrieveKnowledgeDetail({ knowledgeId: this.knowledgeId, token: this.token, userId: this.userShow.userId }).then(res => {
          if (res.flag) {
            this.knowledgeItem = res.data
            this.$emit('getKnowledgeName', this.knowledgeItem.knowledgeName)
          }
        })
      },
      joinKnowledge(knowledgeId) {
        if (!this.userShow.userId || !this.userShow.isAuthor) {
          this.$alert('需要登录并申请成为作者才能加入知识库哦', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          alreadyJoin({ knowledgeId: this.knowledgeId }).then(res => {
            if (res.flag) {
              if (res.alreadyJoin) {
                this.$alert('您已经是该知识库的参与者，不需要重复申请', '提示', {
                  confirmButtonText: '确定'
                })
              } else {
                this.$prompt('您加入的理由', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputValidator: this.checkReason
                }).then(({ value }) => {
                  joinKnowledge({ knowledgeId: knowledgeId, reason: value }).then(res => {
                    if (res.flag) {
                      this.$alert('已经提交审核请耐心等待', '提示', {
                        confirmButtonText: '确定'
                      })
                    }
                  })
                })
              }
            }
          })
        }
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
          line-height: 25px;
          span {
            line-height: 25px;
            flex-shrink: 0;
          }
          a {
            color: #4c84be;
            &:hover {
              color:  #409EFF;
            }
          }
          &-name {
            color: #6b747d;
            font-size: 13px;
            line-height: 25px;
          }
          ul {
            display: flex;
            list-style: none;
            padding: 0px;
            li {
              margin-right: 10px;
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
            color: #6b747d;
            font-size: 13px;
            margin-left: 10px;
            flex-wrap: wrap;
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
              font-size: 13px;
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
        &:hover {
          color: #009a61;
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
