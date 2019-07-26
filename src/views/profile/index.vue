<template>
  <div class="profile-panel w1200">
    <div class="profile-panel__header">
      <el-image :src="require('./assets/profile.jpg')" class="profile-bg"></el-image>
      <div class="profile-panel__header__space">
        <div class="nickname">{{ profileInfo.userName }}</div>
        <div class="edit-btn" @click="editUserProfile" v-if="!editProfile">编辑个人资料</div>
        <div class="edit-btn" @click="backProfile" v-else>返回个人主页</div>
      </div>
      <div class="user-img" @mouseenter="mask = true" @mouseleave="mask = false">
        <el-image :src="profileInfo.avatarUrl ? profileInfo.avatarUrl : require('./assets/person.png')"></el-image>
        <div class="camera" v-if="mask">
          <i class="el-icon-camera"></i>
          <span>修改我的头像</span>
        </div>
      </div>
      <div class="cover-img">
        <i class="el-icon-camera"></i>
        <span>修改封面图片</span>
      </div>
      <router-view class="profile--extra" v-if="editProfile" />
    </div>
    <div class="profile-panel__body" v-if="!editProfile">
      <div class="content-panel">
        <div class="content-panel__header">
          <ul>
            <li :class="{ active: (type === 'newPost') }" @click="goNewPost">
              <icon-svg iconClass="article" :vStyle="{ width: '14px', height: '14px' }"></icon-svg>
              <a>TA的文章</a>
            </li>
            <li :class="{ active: (type === 'hisKnowledge') }" @click="goKnowledgeList">
              <icon-svg iconClass="knowledge" :vStyle="{ width: '16px', height: '16px' }"></icon-svg>
              <a>TA的知识库</a>
            </li>
            <li :class="{ active: (type === 'participantKnowledge') }" @click="goParticipant">
              <icon-svg iconClass="participant" :vStyle="{ width: '18px', height: '18px' }"></icon-svg>
              <a>TA的参与</a>
            </li>
          </ul>
        </div>
        <div class="content-panel__body">
          <div class="recent-post" v-if="type === 'newPost' && recentArticleList.length">
            <ul>
              <li v-for="(item, index) in recentArticleList" :key="index">
                <article-panel01 :content="item.content" :img="item.coverUrl">
                  <template slot="title">
                    <a @click="goArticle(item.articleId)">{{ item.articleTitle }}</a>
                  </template>
                  <template slot="tipPanel">
                    <ul class="tipPanel">
                      <li class="author-info">
                        <span>{{ item.authorName }}</span>
                        <span>发布于</span>
                        <a>{{ item.knowledgeName }}</a>
                        <span>分类</span>
                        <span>{{ item.categoryName}}</span>
                        <span>发布时间</span>
                        <span>{{ item.postTime }}</span>
                      </li>
                    </ul>
                  </template>
                </article-panel01>
              </li>
            </ul>
          </div>
          <div v-if="type === 'hisKnowledge' && userKnowledgeList.length" class="his-knowledge">
            <div class="knowledge-item" v-for="(item, index) in userKnowledgeList" :key="index">
              <knowledge-card
                :knowledgeId="item.knowledgeId"
                :title="item.knowledgeName"
                :desc="item.knowledgeDesc"
                :createTime="item.createTime"
                :knowledgeCover="item.knowledgeCover"
                :creator="item.creator"
                :creatorName="item.creatorName"
                :categoryName="item.categoryName"
                :articleNum="item.articleCounts"
                :participantNum="item.participantCounts"
              ></knowledge-card>
            </div>
          </div>
          <div v-if="type === 'participantKnowledge' && userParticipantKnowledgeList.length" class="his-knowledge">
            <div class="knowledge-item" v-for="(item, index) in userParticipantKnowledgeList" :key="index">
              <knowledge-card
                :knowledgeId="item.knowledgeId"
                :title="item.knowledgeName"
                :desc="item.knowledgeDesc"
                :createTime="item.createTime"
                :knowledgeCover="item.knowledgeCover"
                :creator="item.creator"
                :creatorName="item.creatorName"
                :categoryName="item.categoryName"
                :articleNum="item.articleCounts"
                :participantNum="item.participantCounts"
              ></knowledge-card>
            </div>
          </div>
          <div v-if="!hasList" class="no-content">
            <icon-svg iconClass="coffee" :vStyle="{ width: '60px', height: '60px' }"></icon-svg>
            <p>暂无内容</p>
          </div>
        </div>
      </div>
      <div class="other-panel">

      </div>
    </div>
  </div>
</template>

<script>
  import { retrieveUserRecentPost } from '../../api/article'
  import { retrieveUserKnowledge, retrieveUserParticipant } from '../../api/knowledge'
  import { retrieveUserProfile } from '../../api/user'

  export default {
    name: 'profile',
    data() {
      return {
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        editProfile: false,
        mask: false,
        userId: '',
        type: 'newPost',
        recentArticleList: [],
        userKnowledgeList: [],
        userParticipantKnowledgeList: [],
        profileInfo: '',
        showxx: '123'
      }
    },
    computed: {
      hasList() {
        return this.recentArticleList.length || this.userKnowledgeList.length || this.userParticipantKnowledgeList.length
      }
    },
    components: {
      articlePanel01: () => import('@/components/article-panel-01'),
      knowledgeCard: () => import('@/components/knowledge-card')
    },
    mounted() {
      this.userId = this.$route.params.userId
      this.refreshEditProfile(this.$route.path)
      this.init()
    },
    methods: {
      init() {
        this.userProfile()
        this.userRecentPost()
      },
      refreshEditProfile(path) {
        if (/^\/profile-edit\/\w*$/.test(path)) {
          this.editProfile = true
        }
      },
      editUserProfile() {
        this.$router.push({ name: 'editProfile', params: { userId: this.userId } })
      },
      backProfile() {
        this.$router.push({ name: 'profile', params: { userId: this.userId } })
      },
      goNewPost() {
        this.type = 'newPost'
        this.userRecentPost()
      },
      goKnowledgeList() {
        this.type = 'hisKnowledge'
        this.userKnowledge()
      },
      goParticipant() {
        this.type = 'participantKnowledge'
        this.userParticipant()
      },
      userRecentPost() {
        retrieveUserRecentPost({ userId: this.userId, page: this.paging.page, size: this.paging.size }).then(res => {
          if (res.flag) {
            this.recentArticleList = res.data
          }
        })
      },
      userKnowledge() {
        retrieveUserKnowledge({ userId: this.userId, page: this.paging.page, size: this.paging.size }).then(res => {
          if (res.flag) {
            this.userKnowledgeList = res.data
          }
        })
      },
      userParticipant() {
        retrieveUserParticipant({ userId: this.userId, page: this.paging.page, size: this.paging.size }).then(res => {
          if (res.flag) {
            this.userParticipantKnowledgeList = res.data
          }
        })
      },
      userProfile() {
        retrieveUserProfile({ userId: this.userId }).then(res => {
          if (res.flag) {
            this.profileInfo = res.data
          }
        })
      }
    },
    watch: {
      $route(to) {
        if (/^\/profile-edit\/\w*$/.test(to.path)) {
          this.editProfile = true
        }
        if (/^\/profile\/\w*$/.test(to.path)) {
          this.editProfile = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.profile-panel {
  margin-top: 10px;
  &__header {
    position: relative;
    background-color: #ffffff;
    .profile-bg {
      width: 1200px;
      height: 250px;
    }
    &__space {
      display: flex;
      justify-content: space-between;
      align-items: start;
      height: 80px;
      .nickname {
        margin-left: 220px;
        width: 200px;
        height: 40px;
        font-size: 30px;
        font-weight: 700;
      }
      .edit-btn {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #0084ff;
        border: 1px solid #0084ff;
        font-size: 14px;
        margin-right: 15px;
      }
    }
    .user-img {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 180px;
      left: 50px;
      width: 140px;
      height: 140px;
      overflow: hidden;
      background-color: gainsboro;
      border: 4px solid #fff;
      border-radius: 8px;
      cursor: pointer;
      .camera {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: rgba(#1a1a1a, 0.6);
        color: #fff;
        i {
          text-align: center;
          font-size: 36px;
        }
        span {
          text-align: center;
          font-size: 16px;
        }
      }
    }
    .cover-img {
      position: absolute;
      top: 15px;
      right: 50px;
      padding: 0 16px;
      font-size: 14px;
      line-height: 32px;
      color: #8590a6;
      text-align: center;
      cursor: pointer;
      background: none;
      border: 1px solid hsla(0,0%,100%,.24);
      border-radius: 3px;
      color: hsla(0, 0%, 100%, .6);
      -webkit-transition: color, border-color .3s;
      transition: color, border-color .3s;
      &:hover {
        border-color: hsla(0, 0%, 100%, .6);
        color: hsla(0,0%,100%,.7);
      }
    }
    .profile--extra {
      padding-left: 200px;
    }
  }
  &__body {
    display: flex;
    margin-top: 5px;
    .content-panel {
      width: 900px;
      &__header {
        height: 60px;
        border-bottom: 1px solid #ece6e6;
        background-color: #ffffff;
        padding-left: 10px;
        ul {
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0px;
          height: 100%;
          li {
            display: flex;
            align-items: center;
            height: 40px;
            margin-right: 15px;
            line-height: 40px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            a {
              margin-left: 5px;
            }
            :hover {
              color: #3f87ae;
            }
          }
        }
        .active {
          color: #3f87ae;
        }
      }
      &__body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 250px;
        background-color: #ffffff;
        padding: 15px;
        .recent-post {
          width: 100%;
          ul {
            list-style: none;
            padding: 0px;
            li {
              .tipPanel {
                display: flex;
                list-style: none;
                padding: 0px;
                font-size: 12px;
                .author-info {
                  margin-right: 10px;
                  a {
                    color: #4c84be;
                    &:hover {
                      color:  #409EFF;
                    }
                  }
                  span{
                    color: #999;
                  }
                }
                .love {
                  margin-left: 10px;

                }
              }
            }
          }
        }
        .his-knowledge {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .knowledge-item {
            width: 280px;
            height: 300px;
            margin-right: 10px;
          }
        }
        .no-content {
          width: 80px;
          height: 80px;
        }

      }
    }
    .other-panel {
      width: 300px;
    }
  }
}
</style>
