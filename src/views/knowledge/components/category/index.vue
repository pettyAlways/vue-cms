<template>
  <div class="category-panel">
    <div class="category-panel__body">
      <common-panel-one title="知识库分类" :hStyle="{ height: '45px' }">
        <template slot="more">
          <span class="header-tip">AUTHOR-INFO</span>
        </template>
        <template slot="body">
          <div class="category-panel__body__container">
            <div class="knowledge__content" v-if="knowledgeList.length">
              <knowledge-panel :knowledge="item" v-for="(item, index) in knowledgeList" :key="index"></knowledge-panel>
            </div>
            <div class="no-data" v-if="!knowledgeList.length">
              <icon-svg iconClass="empty" :vStyle="{ width: '60px', height: '60px' }"></icon-svg>
              <p class="tip">暂无数据,赶紧加入完善吧</p>
            </div>
          </div>
        </template>
      </common-panel-one>
      <div class="category-panel__scroll-panel">
        <ul v-if="categoryList.length">
          <li v-for="(item, index) in categoryList" :key="index">
            <a :class="{'active': (showCategory === item.categoryId) }" @click="searchKnowledge(item)">{{ item.categoryName }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { retrieveAllCategory } from '@/api/category'
  import { retrieveKnowledgeList } from '@/api/knowledge'
  import { mapGetters } from 'vuex'
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
    computed: {
      ...mapGetters([
        'userShow'
      ])
    },
    components: {
      commonPanelOne: () => import('@/components/common-panel-one'),
      knowledgePanel: () => import('@/components/knowledge-panel')
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
          this.knowledgeList = res.data || []
        }
      },
      searchKnowledge(category) {
        this.showCategory = category.categoryId
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
      .header-tip {
        font-size: 12px;
        color: #cccccc;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
      }
      /deep/ .custom-panel__body {
        padding: 15px 20px 15px 0px;
      }
      &__container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        .knowledge__content {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          min-height: 300px;
        }
        .no-data {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 180px;
          height: 180px;
          .tip {
            margin-top: 5px;
            color: #777;
          }
        }
      }

    }
    &__scroll-panel {
      position: absolute;
      top: 0px;
      left: 80px;
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
            height: 45px;
            line-height: 45px;
            font-weight: 400;
            color: #333;
            &:hover {
              color: #409EFF;
            }
          }
        }
      }
    }
    .active {
      color: #409EFF;
    }
  }
</style>
