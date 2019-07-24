<template>
  <div class="profile-panel w1200">
    <div class="profile-panel__header">
      <el-image :src="require('./assets/profile.jpg')" class="profile-bg"></el-image>
      <div class="profile-panel__header__space">
        <div class="nickname">{{ profileInfo.userName }}</div>
        <div class="edit-btn">编辑个人资料</div>
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
    </div>
    <div class="profile-panel__body">
      <div class="content-panel">
        <div class="content-panel__header">
          <ul>
            <li :class="{ active: (type === 'catalogue') }">
              <i class="el-icon-notebook-2" ></i>
              <a>最近文章</a>
            </li>
            <li :class="{ active: (type === 'recentPost') }">
              <i class="el-icon-alarm-clock"></i>
              <a>TA的知识库</a>
            </li>
            <li :class="{ active: (type === '参与的知识库') }">
              <i class="el-icon-star-off"></i>
              <a>最近编辑</a>
            </li>
          </ul>
        </div>
        <div class="content-panel__body">
          <ul>
            <li v-for="(item, index) in recentArticleList" :key="index">
              <article-panel01 :content="item.content" :img="img">
                <template slot="title">
                  <a @click="goArticle(item.articleId)">{{ item.articleTitle }}</a>
                </template>
                <template slot="tipPanel">
                  <ul class="tipPanel">
                    <li class="author-img">
                      <img :src="require('./assets/author01.jpg')" />
                    </li>
                    <li class="author-info">
                      <a>{{ item.authorName }}</a>
                      <span>发布于</span>
                      <span>{{ item.postTime }}</span>
                    </li>
                    <li class="love">
                      <a><i class="el-icon-star-off"></i></a>
                      <span>2</span>
                      <span>点赞</span>
                    </li>
                  </ul>
                </template>
              </article-panel01>
            </li>
          </ul>
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
        mask: false,
        userId: '',
        type: 'catalogue',
        recentArticleList: [],
        userKnowledgeList: [],
        userParticipantKnowledgeList: [],
        profileInfo: ''
      }
    },
    components: {
      articlePanel01: () => import('@/components/article-panel-01')
    },
    mounted() {
      this.userId = this.$route.params.userId
      this.init()
    },
    methods: {
      init() {
        this.userProfile()
        this.userRecentPost()
      },
      userRecentPost() {
        retrieveUserRecentPost({ userId: this.userId, page: this.paging.page, size: this.paging.size }).then(res => {
          if (res.flag) {
            this.recentArticleList = res.data
            console.error(this.recentArticleList)
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
      bottom: 20px;
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
  }
  &__body {
    display: flex;
    margin-top: 5px;
    .content-panel {
      width: 900px;
      &__header {
        height: 40px;
        border-bottom: 1px solid #e6e6e6;
        background-color: #ffffff;
        border-bottom: 1px solid gainsboro;
        padding-left: 10px;
        ul {
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0px;
          li {
            height: 40px;
            margin-right: 15px;
            line-height: 40px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
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
        min-height: 180px;
        background-color: #ffffff;
        ul {
          list-style: none;
          padding: 0px;
          li {
            .tipPanel {
              display: flex;
              list-style: none;
              padding: 0px;
              .author-img {
                img {
                  width: 20px;
                  height: 20px;
                  object-fit: cover;
                  border: 2px solid burlywood;
                  border-radius: 50%;
                }
              }
              .author-info {
                margin-left: 10px;
                a {
                  color: #4c84be;
                  &:hover {
                    color:  #409EFF;
                  }
                }
                span{
                  margin-left: 5px;
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
    }
    .other-panel {
      width: 300px;
    }
  }
}
</style>
