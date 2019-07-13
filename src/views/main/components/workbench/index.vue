<template>
  <el-card class="workbench">
    <div class="workbench__article">
      <custom-card02 title="最近编辑">
        <div class="workbench__article__content">
          <div class="article-item" v-for="(item, index) in recentArticle" :key="index">
            <div class="article-icon">
              <i class="el-icon-tickets"></i>
            </div>
            <div class="article-body">
              <div class="article-body--top">
                <a @click="goArticle(item.articleId, item.knowledgeId)">{{item.articleTitle}}</a>
                <i class="el-icon-edit-outline"></i>
              </div>
              <div class="article-body--center">
                <ul>
                  <li>
                    <a class="category">{{item.categoryName}}</a>
                  </li>
                  <li>
                    /
                  </li>
                  <li>
                    <a class="knowledge" @click="goKnowledge(item.knowledgeId)">{{item.knowledgeName}}</a>
                  </li>
                </ul>
                <div class="date">{{item.postTime}}</div>
              </div>
            </div>
          </div>
        </div>
      </custom-card02>
    </div>
    <div class="workbench__knowledge">
      <custom-card02 title="最近知识库">
        <div class="workbench__article__content">
          <div class="article-item" v-for="(item, index) in recentKnowledge" :key="index">
            <div class="article-icon">
              <i class="el-icon-document-copy"></i>
            </div>
            <div class="article-body">
              <div class="article-body--top">
                <a @click="goKnowledge(item.knowledgeId)">{{item.knowledgeName}}</a>
                <i class="el-icon-edit-outline"></i>
              </div>
              <div class="article-body--center">
                <a>{{item.categoryName}}</a>
              </div>
            </div>
          </div>
        </div>
      </custom-card02>
    </div>
    <div class="workbench__post">
      <custom-card02 title="最近动态">
        <div class="post_body">
          <el-tag type="warning" v-for="(item, index) in operRecord" :key="index" style="margin-right: 10px; margin-bottom: 10px;">
            {{index+1}}.<a>{{item.operUserName}}</a>{{item.operTime}}
            <span v-if="item.operType === '审核' ">{{item.operType}}了{{item.objType}}[<a>{{item.objName}}</a>]的修改</span>
            <span v-else-if="item.operType === '申请' ">{{item.operType}}了{{item.objType}}[<a>{{item.objName}}</a>]的加入</span>
            <span v-else-if="item.operType === '移除' ">{{item.operType}}了<a>{{item.targetName}}</a>的参与{{item.objType}}[<a>{{item.objName}}</a>]</span>
            <span v-else-if="item.objType === '文章' ">在<a>{{item.targetName}}</a>下{{item.operType}}了{{item.objType}}[<a>{{item.objName}}</a>]</span>
            <span v-else-if="item.objType in ['分类','知识库'] && item.operType === '修改' ">将{{item.objType}}{{item.reserve}}{{item.operType}}成了[<a>{{item.objName}}</a>]</span>
            <span v-else>{{item.operType}}了{{item.objType}}[<a>{{item.objName}}</a>]</span>
          </el-tag>
        </div>
      </custom-card02>
    </div>
  </el-card>
</template>

<script>
  import { recentArticle, recentKnowledge, recentPost } from '@/api/recent-post'
  export default {
    name: 'workbench',
    data() {
      return {
        recentArticle: [],
        recentKnowledge: [],
        operRecord: []
      }
    },
    components: {
      customCard02: () => import('@/components/custom-card-02')
    },
    mounted() {
      this.recentArticleList()
      this.recentKnowledgeList()
      this.recentPost()
    },
    methods: {
      recentPost() {
        recentPost().then(res => {
          if (res.flag) {
            this.operRecord = res.data
          }
        })
      },
      goArticle(articleId, knowledgeId) {
        this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: articleId, knowledgeId: knowledgeId } })
      },
      goKnowledge(knowledgeId) {
        this.$router.push({ path: '/platform/blog/knowledge/detail', query: { knowledgeId: knowledgeId } })
      },
      recentArticleList() {
        recentArticle().then(res => {
          if (res.flag) {
            this.recentArticle = res.data
          }
        })
      },
      recentKnowledgeList() {
        recentKnowledge().then(res => {
          if (res.flag) {
            this.recentKnowledge = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .workbench {
    &__article {
      &__content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        min-height: 100px;
        .article-item {
          display: flex;
          align-items: center;
          width: 260px;
          margin-top: 15px;
          margin-bottom: 15px;
          margin-right: 15px;
          padding: 10px;
          &:hover {
            background-color: gainsboro;
          }
          .article-icon {
            flex-shrink: 0;
            width: 30px;
            margin-right: 10px;
            i {
              font-size: 30px;
            }
          }
          .article-body {
            flex-grow: 1;
            width: 230px;
            &--top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              a {
                width: 80%;
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 21px;
                font-size: 13px;
                font-weight: 400;
                color: #333;
                overflow: hidden;
                cursor: pointer;
              }
              i {
                width: 15px;
                font-size: 14px;
              }
            }
            &--center {
              display: flex;
              justify-content: space-between;
              ul {
                display: flex;
                list-style: none;
                padding: 0px;
                li {
                  margin-right: 3px;
                  font-size: 12px;
                  color: #595959;
                  .category {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 55px;
                  }
                  .knowledge {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 65px;
                  }
                  a {
                    display: block;

                  }
                }
              }
              .date {
                font-size: 12px;
                color: #595959;
              }
            }
          }
        }
      }
    }
    &__post {
      .post_body {
        min-height: 90px;
        a {
          color: #7e7eee
        }
      }
    }
  }
</style>
