<template>
  <div class="knowledge-panel" @click.stop="goKnowledge(knowledge.knowledgeId)">
    <div class="knowledge-panel__body">
      <div class="knowledge-panel__body--left">
        <el-image :src="knowledge.knowledgeCover" style="width: 60px; height: 60px;" fit="cover"></el-image>
      </div>
      <div class="knowledge-panel__body--right">
        <div class="header">
          <div class="title">
            <a @click.stop="goKnowledge(knowledge.knowledgeId)">{{ knowledge.knowledgeName }}</a>
          </div>
          <div class="center" v-if="showJoin">
            <span class="icon">+</span>
            <a @click.stop="joinKnowledge(knowledge.knowledgeId)" class="join">加入</a>
          </div>
        </div>
        <div class="content">
          <span>{{ knowledge.knowledgeDesc }}</span>
          <a @click.stop="goKnowledge(knowledge.knowledgeId)">[详情]</a>
        </div>
      </div>
    </div>
    <div class="knowledge-panel__bottom">
      <ul>
        <li><icon-svg iconClass="person" :vStyle="{ width: '12px', height: '12px' }"></icon-svg>
          <a class="creator" @click.stop="goProfile(knowledge.creator)">{{knowledge.creatorName}}</a></li>
        <li><icon-svg iconClass="category" :vStyle="{ width: '12px', height: '12px' }"></icon-svg>
          <span class="category">{{knowledge.categoryName}}</span></li>
        <li><icon-svg iconClass="article" :vStyle="{ width: '12px', height: '12px' }"></icon-svg>
          <span class="article-num">{{knowledge.articleCounts ? knowledge.articleCounts : 0}}<span class="small">篇</span></span></li>
        <li><icon-svg iconClass="participant" :vStyle="{ width: '14px', height: '14px' }"></icon-svg>
          <span class="participant">{{knowledge.participantCounts ? knowledge.participantCounts : 0}}<span class="small">人</span></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { joinKnowledge } from '@/api/knowledge'
  export default {
    name: 'knowledgePanel',
    props: {
      knowledge: Object
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'userShow'
      ]),
      showJoin() {
        let participantIds = []
        if (this.knowledge.participantIds) {
          participantIds = this.knowledge.participantIds.split(',')
        }
        return !this.userShow || ((this.userShow.userId !== this.knowledge.creator) &&
          !participantIds.includes(this.userShow.userId + ''))
      }
    },
    methods: {
      goKnowledge(knowledgeId) {
        this.$router.push({ name: 'knowledgeDetail', params: { knowledgeId: knowledgeId } })
      },
      checkReason(val) {
        if (!val) {
          return '内容不能为空'
        }
        if (val.length < 10 || val.length > 50) {
          return '请输出 10 - 50 个字'
        }
      },
      joinKnowledge(knowledgeId) {
        if (!this.userShow.userId || !this.userShow.isAuthor) {
          this.$alert('需要登录并申请成为作者才能加入知识库哦', '提示', {
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
      },
      goProfile(userId) {
        this.$router.push({ name: 'profile', params: { userId: userId } })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-panel {
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 100px;
    border-bottom: 1px dotted #eee;
    margin-right: 5px;
    &__body {
      display: flex;
      &--left {
        display: flex;
        flex-direction: column;
        width: 60px;
        flex-shrink: 0;
      }
      &--right {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-left: 10px;
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 25px;
          .title {
            height: 100%;
            width: 150px;
            font-size: 14px;
            font-weight: 700;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              color: #6b747d;
            }
          };
          .center {
            display: flex;
            justify-content: center;
            height: 100%;
            width: 50px;
            color:  #4c84be;
            .icon {
              font-size: 13px;
              font-weight: bold;
            }
            a.join {
              margin-left: 5px;
              font-size: 13px;
              cursor: pointer;
            }
            &:hover {
              color:  #409EFF;
            }
          }
        }
        .content {
          height: 32px;
          font-size: 12px;
          font-weight: 400;
          color: #777;
          overflow: hidden;
          a {
            color:  #4c84be;
            cursor: pointer;
            &:hover {
              color:  #409EFF;
            }
          }
        }
      }
    }
    &__bottom {
      margin-top: 10px;
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0px;
        font-size: 12px;
        color: #777;
        li {
          display: flex;
          align-items: center;
          margin-right: 5px;
          height: 25px;
          .creator {
            display: block;
            width: 50px;
            margin-left: 3px;
            color:  #4c84be;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              color:  #409EFF;
            }
          }
          .category {
            width: 70px;
            margin-left: 3px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .article-num {
            width: 30px;
            margin-left: 3px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .participant {
            width: 30px;
            margin-left: 3px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    &:hover {
       background-color: gainsboro;
    }
  }
</style>
