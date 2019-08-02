<template>
  <div class="profile-panel w1200">
    <div class="profile-panel__header">
      <div class="profile-cover">
        <el-image v-if="profileInfo.coverUrl" :src="profileInfo.coverUrl" class="profile-bg"></el-image>
        <el-image v-else :src="require('./assets/person-cover.jpg')" fit="cover" class="profile-bg"></el-image>
        <el-dialog
          title="用户资料封面"
          :visible.sync="cDialog.visible"
          :modal="false"
          top="28vh"
          width="1200px">
          <image-cut-upload ref="imageCutUpload" type="user_profile_cover"
                            :imageUrl="cDialog.imageUrl"
                            :fileName="cDialog.fileName"
                            :cropperOption="{fixedNumber: [4, 1], autoCropWidth: 200, autoCropHeight: 50}"
                            @getRemoteUrl="cRemoteUrl"></image-cut-upload>
        </el-dialog>
      </div>
      <div class="profile-panel__header__space">
        <div class="nickname">{{ profileInfo.userName }}<span class="signature">{{ profileInfo.signature }}</span></div>
        <div class="edit-btn" @click="editUserProfile" v-if="!editProfile && isCurLogin">编辑个人资料</div>
        <div class="edit-btn" @click="backProfile" v-else-if="editProfile && isCurLogin">返回个人主页</div>
      </div>
      <div class="user-img" @mouseenter="mask = true" @mouseleave="mask = false">
        <el-upload
          v-if="isCurLogin"
          class="user-upload"
          action=""
          ref="upload"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="getFile">
          <div class="internal">
            <el-image :src="profileInfo.avatarUrl ? profileInfo.avatarUrl : require('./assets/person.png')" fit="cover">
            </el-image>
            <div v-if="mask" class="camera">
              <i class="el-icon-camera"></i>
              <span>修改我的头像</span>
            </div>
          </div>
        </el-upload>
        <el-image v-else :src="profileInfo.avatarUrl ? profileInfo.avatarUrl : require('./assets/person.png')"
                  fit="cover" style="cursor: default;">
        </el-image>
      </div>
      <div v-if="isCurLogin" class="cover-img">
        <el-upload
          action=""
          ref="upload"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="getCoverFile">
          <div class="internal">
            <i class="el-icon-camera"></i>
            <span>修改封面图片</span>
          </div>
        </el-upload>
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
                <article-panel :article="item" :bStyle="{ padding: '0px' }">
                </article-panel>
              </li>
            </ul>
          </div>
          <div v-if="type === 'hisKnowledge' && userKnowledgeList.length" class="his-knowledge">
            <div class="knowledge-item" v-for="(item, index) in userKnowledgeList" :key="index">
              <knowledge-card :knowledge="item" shadow="always" :bStyle="{padding: '0px'}"></knowledge-card>
            </div>
          </div>
          <div v-if="type === 'participantKnowledge' && userParticipantKnowledgeList.length" class="his-knowledge">
            <div class="knowledge-item" v-for="(item, index) in userParticipantKnowledgeList" :key="index">
              <knowledge-card :knowledge="item" shadow="always" :bStyle="{padding: '0px'}"></knowledge-card>
            </div>
          </div>
          <div v-if="!hasList" class="no-content">
            <icon-svg iconClass="coffee" :vStyle="{ width: '60px', height: '60px' }"></icon-svg>
            <p>暂无内容</p>
          </div>
        </div>
      </div>
      <div class="other-panel">
        <common-panel-one title="用户信息" :hStyle="{ height: '60px' }" :bStyle="{ padding: '10px'}">
          <template slot="more">
            <span class="header-tip">AUTHOR-INFO</span>
          </template>
          <template slot="body">
            <user-card :userInfo="profileInfo"></user-card>
          </template>
        </common-panel-one>
      </div>
    </div>
    <el-dialog
      title="编辑头像"
      :visible.sync="uDialog.visible"
      width="30%">
      <image-cut-upload ref="imageCutUpload" type="user_portrait"
                        :cropperOption="{fixedNumber: [1, 1], autoCropWidth: 100, autoCropHeight: 100, img: uDialog.imageUrl}"
                        :imageUrl="uDialog.imageUrl"
                        :fileName="uDialog.fileName"
                        @getRemoteUrl="remoteUrl"></image-cut-upload>
    </el-dialog>
  </div>
</template>

<script>
  import { retrieveUserRecentPost } from '../../api/article'
  import { retrieveUserKnowledge, retrieveUserParticipant } from '../../api/knowledge'
  import { retrieveUserProfile, saveUserInfo } from '../../api/user'
  import { getImageUrl } from '../../utils/images'
  import { mapGetters } from 'vuex'

  export default {
    name: 'profile',
    data() {
      return {
        paging: {
          page: 1,
          total: 0,
          size: 100
        },
        uDialog: {
          visible: false,
          imageUrl: '',
          fileName: ''
        },
        cDialog: {
          visible: false,
          imageUrl: '',
          fileName: ''
        },
        editProfile: false,
        mask: false,
        userId: '',
        type: 'newPost',
        recentArticleList: [],
        userKnowledgeList: [],
        userParticipantKnowledgeList: [],
        profileInfo: '',
        skillList: []
      }
    },
    computed: {
      ...mapGetters([
        'userShow'
      ]),
      isCurLogin() {
        return parseInt(this.userShow.userId) === parseInt(this.userId)
      },
      hasList() {
        return (this.type === 'newPost' && this.recentArticleList.length) ||
          (this.type === 'hisKnowledge' && this.userKnowledgeList.length) ||
          (this.type === 'participantKnowledge' && this.userParticipantKnowledgeList.length)
      }
    },
    components: {
      articlePanel: () => import('@/components/article-panel'),
      knowledgeCard: () => import('@/components/knowledge-card'),
      imageCutUpload: () => import('@/components/image-cut-upload'),
      commonPanelOne: () => import('@/components/common-panel-one'),
      userCard: () => import('@/components/user-card')
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.userId = this.$route.params.userId
        this.refreshEditProfile(this.$route.path)
        this.userProfile()
        this.userRecentPost()
      },
      remoteUrl(url) {
        saveUserInfo({ id: this.userId, userAvatar: url }).then(res => {
          if (res.flag) {
            this.profileInfo.avatarUrl = url
            this.uDialog.visible = false
          }
        })
      },
      cRemoteUrl(url) {
        saveUserInfo({ id: this.userId, coverUrl: url }).then(res => {
          if (res.flag) {
            this.profileInfo.coverUrl = url
            this.cDialog.visible = false
          }
        })
      },
      getFile(file) {
        getImageUrl(file, (fileName, imageUrl) => {
          this.uDialog.visible = true
          this.uDialog.imageUrl = imageUrl
          this.uDialog.fileName = fileName
        })
      },
      getCoverFile(file) {
        getImageUrl(file, (fileName, imageUrl) => {
          this.cDialog.visible = true
          this.cDialog.imageUrl = imageUrl
          this.cDialog.fileName = fileName
        })
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
        this.init()
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
    .profile-cover {
      /deep/ .el-dialog__body {
        padding: 0px;
      }
    }
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
        flex-grow: 1;
        margin-left: 220px;
        width: 200px;
        height: 40px;
        font-size: 30px;
        font-weight: 700;
        .signature {
          margin-left: 20px;
          font-family: 仿宋;
          font-size: 13px;
          color: #ccc;
        }
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
        cursor: pointer;
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
      height:140px;
      overflow: hidden;
      background-color: gainsboro;
      border: 2px solid #fff;
      border-radius: 8px;
      cursor: pointer;
      .user-upload {
        width: 100%;
        height: 100%;
      }
      /deep/ .el-upload {
        width: 100%;
        height: 100%;
      }
      /deep/ .el-image {
        width: 100%;
        height: 100%;
      }
      .internal {
        width: 100%;
        height: 100%;
        position: relative;
        .camera {
          position: absolute;
          left: 0;
          top: 0;
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

    }
    .cover-img {
      position: absolute;
      top: 15px;
      right: 50px;
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
      .internal {
        padding: 0 16px;
      }
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
      background-color: #ffffff;
      &__header {
        height: 60px;
        border-bottom: 1px solid #dcdfe6;
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
        min-height: 250px;
        background-color: #ffffff;
        padding: 0px 15px;
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
          margin-top: 15px;
          .knowledge-item {
            background-color: white;
            width: 280px;
            height: 273px;
            margin-right: 10px;
            margin-bottom: 15px;
            background-color: white;
          }
        }
        .no-content {
          margin-top: 50px;
          width: 80px;
          height: 80px;
        }

      }
    }
    .other-panel {
      background-color: #fff;
      padding: 0px 5px 15px 0px;
      width: 300px;
      .header-tip {
        font-size: 12px;
        color: #cccccc;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
      }
    }
  }
}
</style>
