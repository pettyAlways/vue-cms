<template>
  <div class="category-panel">
    <div class="category-panel__body">
      <custom-card01 title="知识库分类" note="CATEGORY">
        <div class="category-panel__body__container">
          <div class="category-panel__body__container__item" v-for="(item, index) in knowledgeList" :key="index">
            <div class="category-panel__body__container__item--left">
              <el-image :src="item.knowledgeCover" style="width: 60px; height: 60px;" fit="cover"></el-image>
              <div class="center">
                <span class="icon">+</span>
                <a class="join">加入</a>
              </div>
            </div>
            <div class="category-panel__body__container__item--right">
              <div class="title">
                <a>{{ item.knowledgeName }}</a>
              </div>
              <div class="content">
                <span>{{ item.knowledgeDesc }}</span>
                <a>[详情]</a>
              </div>
            </div>
          </div>
        </div>
      </custom-card01>
      <div class="category-panel__scroll-panel">
        <ul v-if="categoryList.length">
          <li v-for="(item, index) in categoryList" :key="index">
            <a @click="searchKnowledge(item.categoryId)">{{ item.categoryName }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { retrieveAllCategory } from '@/api/category'
  import { retrieveKnowledgeList } from '@/api/knowledge'
  export default {
    name: 'knowledgeCategory',
    data() {
      return {
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        categoryList: [],
        knowledgeList: [],
        showCategory: ''
      }
    },
    components: {
      'customCard01': () => import('@/components/custom-card-01')
    },
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        let res = await retrieveAllCategory()
        this.categoryList = res.data
        if (this.categoryList) {
          this.showCategory = this.categoryList[0].categoryId
          res = await retrieveKnowledgeList({ categoryId: this.showCategory, page: this.paging.page, size: this.paging.size })
          this.knowledgeList = res.data
        }
      },
      searchKnowledge(categoryId) {
        this.showCategory = categoryId
        retrieveKnowledgeList({ categoryId: this.showCategory, page: this.paging.page, size: this.paging.size })
          .then(res => {
            if (res.flag) {
              this.knowledgeList = res.data
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category-panel {
    position: relative;
    min-height: 300px;
    &__body {
      width: 900px;
      /deep/ .custom-panel__body {
        padding: 15px 20px 15px 0px;
      }
      &__container {
        display: flex;
        flex-wrap: wrap;
        min-height: 300px;
        &__item {
          display: flex;
          width: 280px;
          height: 100px;
          border-bottom: 1px dotted #eee;
          padding: 5px;
          &--left {
            display: flex;
            flex-direction: column;
            width: 60px;
            flex-shrink: 0;
            .center {
              display: flex;
              justify-content: center;
              align-items: center;
              .icon {
                font-size: 16px;
                font-weight: bold;
              }
              a.join {
                margin-left: 5px;
                font-size: 13px;
                color:  #4c84be;
                cursor: pointer;
                &:hover {
                  color:  #409EFF;
                }
              }
            }
          }
          &--right {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            margin-left: 10px;
            .title {
              margin-bottom: 5px;
              font-size: 14px;
              font-weight: 400;
              color: #333;
            };
            .content {
              font-size: 12px;
              color: #777;
              a {
                color:  #4c84be;
                cursor: pointer;
                &:hover {
                  color:  #409EFF;
                }
              }
            }
          }
          &:hover {
            background-color: gainsboro;
          }
        }
      }

    }
    &__scroll-panel {
      position: absolute;
      top: 0px;
      left: 180px;
      width: 660px;
      height: 40px;
      margin-left: 15px;
      overflow: hidden;
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        list-style: none;
        padding: 0px;
        width: 660px;
        overflow-x: scroll;
        li {
          flex-shrink: 0;
          margin-right: 15px;
          a {
            display: block;
            height: 40px;
            line-height: 40px;
            color: #4c84be;
            &:hover {
              color: #409EFF;
            }
          }
        }
      }
    }
  }
</style>
