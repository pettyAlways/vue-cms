<template>
  <div class="article-panel" :style="bStyle">
    <div class="article-panel--left">
      <div class="article-panel__header">
        <slot name="title"><a class="title" @click="goArticle(article.articleId)">{{article.articleTitle}}</a></slot>
      </div>
      <div class="article-panel__tip">
        <ul class="tipPanel">
          <li class="author-info">
            <a @click="goProfile(article.authorId)">{{ article.authorName }}</a>
            <span class="m-r-5 m-l-5">发布于</span>
            <a @click="goKnowledge(article.knowledgeId)">{{ article.knowledgeName }}</a>
            <span class="m-r-5">分类</span>
            <a @click="goCategory(article.categoryId)">{{ article.categoryName}}</a>
            <span class="m-l-5 m-r-5">发布时间</span>
            <span>{{ article.postTime }}</span>
            <div v-if="article.participantList && article.participantList.length">
              <span class="m-l-5">协作人</span>
              <a @click="goProfile(item.userId)" :key="index" v-for="(item, index) in article.participantList">
                {{item.userName}}
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div class="article-panel__body">
        <slot name="content">{{article.content}}</slot>
      </div>
    </div>
    <div class="article-panel--right" v-if="true">
      <img :src="article.coverUrl">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'articlePanel',
    props: {
      article: Object,
      bStyle: {
        type: Object,
        default: () => ({ padding: '0px' })
      }
    },
    methods: {
      goArticle(articleId) {
        this.$router.push({ name: 'articleShow', params: { articleId: articleId } })
      },
      goCategory(categoryId) {
        this.$router.push({ path: '/knowledge#category', query: { categoryId: categoryId } })
      },
      goKnowledge(knowledgeId) {
        this.$router.push({ name: 'knowledgeDetail', params: { knowledgeId: knowledgeId } })
      },
      goProfile(userId) {
        this.$router.push({ name: 'profile', params: { userId: userId } })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-panel {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #dcdfe6;
    margin-top: 10px;
    &--left {
      flex-grow: 1;
    }
    &__header {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 400;
      .title {
        font-size: 14px;
        font-weight: 700;
        color: #333;
      }
    }
    &__tip {
      .tipPanel {
        list-style: none;
        display: flex;
        list-style: none;
        padding: 0px;
        font-size: 12px;
        .author-info {
          display: flex;
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
    &__body {
      margin-top: 5px;
      font-size: 13px;
      color: #777;
    }
    &--right {
      flex-shrink: 0;
      img {
        width: 200px;
        height: 100px;
        object-fit: cover;
      }
    }
  }
</style>
