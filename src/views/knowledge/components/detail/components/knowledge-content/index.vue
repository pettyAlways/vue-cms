<template>
  <div class="knowledge-content" ref="demo">
    <div class="knowledge-content__header">
      <ul>
        <li :class="{ active: (type === 'catalogue') }">
          <i class="el-icon-notebook-2" ></i>
          <a @click="knowledgeCatalogue">文章列表</a>
        </li>
        <li :class="{ active: (type === 'recentPost') }">
          <i class="el-icon-alarm-clock"></i>
          <a @click="recentPost">最近发布</a>
        </li>
        <li :class="{ active: (type === 'recentEdit') }">
          <i class="el-icon-star-off"></i>
          <a @click="recentEdit">最近编辑</a>
        </li>
        <li :class="{ active: (type === 'concise') }">
          <i class="el-icon-tickets"></i>
          <a @click="articleConcise">精简列表</a>
        </li>
      </ul>
    </div>
    <div v-if="type !== 'concise'" class="knowledge-content__body">
      <ul>
        <li v-for="(item, index) in articleList" :key="index">
          <article-panel :article="item"></article-panel>
        </li>
      </ul>
    </div>
    <div v-else class="knowledge-content__concise">
      <ul>
        <li v-for="(item, index) in articleList" :key="index" :class ="{ 'no-bottom': (index >= (rows-1)*3) }">
          <a @click="goArticle(item.articleId)"><i class="el-icon-tickets icons"></i>{{ item.articleTitle }}</a>
          <span>{{ item.postTime | toDate }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { retrieveKnowledgeCatalogue, retrieveRecentPost, retrieveRecentEdit, retrieveArticleConcise } from '@/api/article'
  import { mapGetters } from 'vuex'
  export default {
    name: 'knowledgeContent',
    inject: ['kData'],
    data() {
      return {
        type: 'catalogue',
        paging: {
          page: 1,
          total: 0,
          size: 100
        },
        rows: '',
        img: require('./assets/knowledge01.jpg'),
        knowledgeId: '',
        articleList: [],
        token: '',
        loading: false
      }
    },
    components: {
      articlePanel: () => import('@/components/article-panel')
    },
    computed: {
      ...mapGetters([
        'userShow'
      ]),
      noMore () {
        return this.articleList.length >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    mounted() {
      this.token = this.$route.params.token
      this.knowledgeId = this.kData.knowledgeId
      this.init()
    },
    methods: {
      init() {
        this.knowledgeCatalogue()
      },
      goArticle(articleId) {
        this.$router.push({ name: 'articleShow', params: { articleId: articleId, token: this.token } })
      },
      knowledgeCatalogue() {
        this.type = 'catalogue'
        this.articleList = []
        retrieveKnowledgeCatalogue({ knowledgeId: this.knowledgeId, token: this.token, userId: this.userShow.userId, page: this.paging.page, size: this.paging.size })
          .then(res => {
            if (res.flag) {
              this.articleList = res.data
            }
          })
      },
      recentPost() {
        this.type = 'recentPost'
        this.articleList = []
        retrieveRecentPost({ knowledgeId: this.knowledgeId, token: this.token, userId: this.userShow.userId, page: this.paging.page, size: this.paging.size })
          .then(res => {
            if (res.flag) {
              this.articleList = res.data
            }
          })
      },
      recentEdit() {
        this.type = 'recentEdit'
        this.articleList = []
        retrieveRecentEdit({ knowledgeId: this.knowledgeId, token: this.token, userId: this.userShow.userId, page: this.paging.page, size: this.paging.size })
          .then(res => {
            if (res.flag) {
              this.articleList = res.data
            }
          })
      },
      articleConcise() {
        this.type = 'concise'
        this.articleList = []
        retrieveArticleConcise({ knowledgeId: this.knowledgeId, token: this.token, userId: this.userShow.userId, page: this.paging.page, size: this.paging.size })
          .then(res => {
            if (res.flag) {
              this.articleList = res.data
              this.rows = Math.ceil(this.articleList.length / 3)
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-content {
    border-right: 1px solid #e6e6e6;
    &__header {
      height: 40px;
      border-bottom: 1px solid #e6e6e6;
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
    }
    &__body {
      min-height: 180px;
      padding: 0px 15px;
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
    .active {
      color: #3f87ae;
    }
    &__concise {
      min-height: 180px;
      ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0px;
        .no-bottom {
          border-bottom: none;
        }
        li {
          display: flex;
          justify-content: space-between;
          width: 290px;
          height: 80px;
          line-height: 80px;
          padding-right: 30px;
          border-bottom: 1px solid #ebebeb;
          a {
            font-size: 13px;
            cursor: pointer;
            color: #433f3f;
            overflow: hidden;
            max-width: 180px;
            white-space: nowrap;
            text-overflow: ellipsis;
            i {
              margin-right: 5px;
            }
          }
          span {
            font-size: 11px;
            color: #a9a9a9;
          }
        }
      }
    }
  }
</style>
