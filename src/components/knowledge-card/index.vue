<template>
  <div class="knowledge-card">
    <el-card :shadow="shadow" :body-style="bStyle">
      <el-image :src="knowledge.knowledgeCover ? knowledge.knowledgeCover : require('./assets/placeholder.png')" class="cover" fit="cover"></el-image>
      <div class="title-panel">
        <p class="title"><a @click="goKnowledge">{{knowledge.knowledgeName}}</a></p>
        <div class="center" v-if="showJoin">
          <i class="el-icon-plus icon"></i>
          <a @click.stop="joinKnowledge(knowledge.knowledgeId)" class="join">加入</a>
        </div>
        <div v-else-if="this.knowledge.access === '3'" class="center">
          <icon-svg iconClass="lock" :vStyle="{width: '13px', height: '13px'}"></icon-svg>
          <span class="lock">加密</span>
        </div>
      </div>
      <div class="desc">
        {{ knowledge.knowledgeDesc }}
      </div>
      <div class="toolbar">
        <ul>
          <li><icon-svg iconClass="person" :vStyle="{ width: '12px', height: '12px' }"></icon-svg>
            <a class="creator" @click="goProfile">{{knowledge.creatorName}}</a>
          </li>
          <li><icon-svg iconClass="category" :vStyle="{ width: '12px', height: '12px' }"></icon-svg>
            <a @click="goCategory(knowledge.categoryId)" class="category">{{knowledge.categoryName}}</a>
          </li>
          <li><icon-svg iconClass="article" :vStyle="{ width: '12px', height: '12px' }"></icon-svg>
            <span class="article-num">{{knowledge.articleCounts ? knowledge.articleCounts : 0}}<span class="small">篇</span></span>
          </li>
          <li><icon-svg iconClass="participant" :vStyle="{ width: '14px', height: '14px' }"></icon-svg>
            <span class="participant">{{knowledge.participantCounts ? knowledge.participantCounts : 0}}<span class="small">人</span></span>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { joinKnowledge, passwordVerify } from '@/api/knowledge'
  export default {
    name: 'knowledgeCard',
    props: {
      shadow: {
        type: String,
        default: 'never'
      },
      bStyle: {
        type: Object,
        default: () => ({padding: '0px'})
      },
      knowledge: Object
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
        return this.knowledge.access !== '3' && (!this.userShow || ((this.userShow.userId !== this.knowledge.creator) &&
          !participantIds.includes(this.userShow.userId + '')))
      }
    },
    methods: {
      checkPassword(val) {
        if (!val) {
          return '密码不能为空'
        }
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
      goProfile() {
        this.$router.push({ name: 'profile', params: { userId: this.creator } })
      },
      goKnowledge() {
        let passwordAccess = this.knowledge.access === '3' && this.knowledge.creator !== this.userShow.userId
        if (!passwordAccess) {
          this.$router.push({ name: 'knowledgeDetail', params: { knowledgeId: this.knowledge.knowledgeId } })
          return
        }
        this.passwordAccess(this.knowledge.knowledgeId)
      },
      passwordAccess(knowledgeId) {
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: this.checkPassword
        }).then(({ value }) => {
          passwordVerify({ knowledgeId: knowledgeId, password: value }).then(res => {
            if (res.flag) {
              if (!res.accessToken) {
                this.$alert('密码不正确', '提示', {
                  confirmButtonText: '确定'
                })
              } else {
                this.$router.push({ name: 'knowledgeDetail', params: { knowledgeId: this.knowledge.knowledgeId, token: res.accessToken } })
              }
            }
          })
        })
      },
      goCategory(categoryId) {
        this.$router.push({ path: `/knowledge/#category`, query: { categoryId: categoryId } })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .cover {
      width: 100%;
      height: 150px;
    }
    .title-panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 3px;
      .title {
        font-size: 16px;
        font-weight: bold;
        a {
          display: block;
          height: 25px;
          line-height: 25px;
          color: #323232;
        }
      }
      .center {
        display: flex;
        align-items: center;
        width: 50px;
        color:  #4c84be;
        .icon {
          display: block;
          font-size: 13px;
          font-weight: bold;
          height: 25px;
          line-height: 25px;
        }
        .join {
          display: block;
          margin-left: 5px;
          font-size: 13px;
          cursor: pointer;
          height: 25px;
          line-height: 25px;
        }
        .lock {
          margin-left: 5px;
          color: red;
        }
        &:hover {
          color:  #409EFF;
        }
      }
    }
    .desc {
      line-height: 22px;
      font-size: 12px;
      color: #323232;
      height: 65px;
      padding: 0px 3px;
      overflow: hidden;
    }
    .toolbar {
      ul {
        display: flex;
        list-style: none;
        padding: 0px 3px;
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
            color: #3f87ae;
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
