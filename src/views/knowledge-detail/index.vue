<template>
  <div class="knowledge-detail w1200">
    <div class="top-panel">
      <site-nav>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/platform/blog/knowledge' }">知识库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/platform/blog/knowledge/detail' }">vue文档</el-breadcrumb-item>
        </el-breadcrumb>
      </site-nav>
      <div class="btn-panel">
        <el-button class="btn" type="primary" size="small" @click="showCover=false">管理</el-button>
        <el-button class="btn" type="primary" size="small" @click="createArticle">新建文档</el-button>
      </div>
    </div>
    <div class="knowledge-detail__container" v-if="showCover">
      <div class="knowledge-detail__header">
        <h1 class="cover-title">
          <span>Vue文档</span>
        </h1>
        <div class="cover-descr">
          <span>vue开发技能</span>
        </div>
        <div class="cover-author">
          <ul>
            <li>
              <img :src="require('./assets/author01.jpg')">
            </li>
          </ul>
        </div>
      </div>
      <div class="knowledge-detail__body">
        <ul>
          <li v-for="(item, index) in tableData" :key="index">
            <span class="name">
              <a @click="goArticle(item.id, knowledgeId)">
                {{item.articleTitle}}
              </a>
            </span>
            <span class="line"></span>
            <span class="author">{{item.createName}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="knowledge-manager" v-else>
      <div class="manager-header">
        <div class="info">
          <h2><span>管理</span></h2>
          <span class="extra">共{{tableData.length}}个文档</span>
        </div>
        <div class="search">
          <el-input
            size="small"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          >
          </el-input>
        </div>
      </div>
      <div class="manager-body">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="文章标题"
            min-width="200">
            <template slot-scope="scope">
              <a @click="goArticle(scope.row.id, knowledgeId)">{{scope.row.articleTitle}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="createName"
            label="创建者"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="postTime"
            label="发布时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="100">
            <template slot-scope="scope">
              <el-button v-if="noAuthShowBtn || (otherPower['文章编辑'] && shareAuth('文章共享修改', scope.row))"
                         type="text" @click="editArticle(scope.row)"><i class="el-icon-edit-outline"></i>编辑</el-button>
              <el-button v-if="noAuthShowBtn || (otherPower['文章删除'] && shareAuth('文章共享删除', scope.row))"
                         type="text" @click="delArticle(scope.row)"><i class="el-icon-delete"></i>删除</el-button>
              <el-button type="text" @click="copyArticle(scope.row)"><i class="el-icon-share"></i>复制</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="复制到其它知识库"
      :visible.sync="copyVisible"
      width="30%">
      <p>可复制到您所参与编辑的知识库</p>
      <el-select v-model="copyKnowledgeId" placeholder="请选择">
        <el-option
          v-for="(item, index) in participantKnowledge"
          :key="index"
          :label="item.kname"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmCopy()">确 定</el-button>
        <el-button @click="copyVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { listArticle, deleteShareArticle, deleteArticle, copyArticle } from '@/api/article'
  import { retrieveKnowledge } from '@/api/knowledge'
  export default {
    name: 'knowledgeDetail',
    data() {
      return {
        copyVisible: false,
        knowledgeId: '',
        showCover: true,
        tableData: [],
        power: [],
        otherPower: [],
        knowledge: '',
        participantKnowledge: [],
        copyKnowledgeId: '',
        copyArticleId: ''
      }
    },
    mounted() {
      this.knowledgeId = this.$route.query.knowledgeId
      this.listArticle(this.knowledgeId)
    },
    computed: {
      ...mapGetters([
        'pageMenus',
        'sysParam',
        'currentUser'
      ]),
      noAuthShowBtn() {
        return this.sysParam['no_auth_represent'] === 'represent'
      },
      shareAuth() {
        return (auth, article) => {
          return this.currentUser.id === article.creatorId || article.knowledgeCreator === this.currentUser.id || this.otherPower[auth]
        }
      }
    },
    watch: {
      pageMenus: {
        handler(newMenus) {
          if (newMenus) {
            this.power = newMenus[this.$route.path]
            // 需要用到文章显示页面的按钮权限
            this.otherPower = newMenus['/platform/blog/knowledge/article/show']
          }
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    methods: {
      goArticle(articleId, knowledgeId) {
        this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: articleId, knowledgeId: knowledgeId } })
      },
      confirmCopy() {
        copyArticle({ knowledgeId: this.copyKnowledgeId, articleId: this.copyArticleId }).then(res => {
          if (res.flag) {
            this.$message({
              type: 'success',
              message: '复制文章成功'
            })
            this.copyVisible = false
          }
        })
      },
      copyArticle(article) {
        retrieveKnowledge().then(res => {
          if (res.flag) {
            this.participantKnowledge = res.data
          }
        })
        this.copyArticleId = article.id
        this.copyVisible = true
      },
      editArticle(article) {
        this.$router.push({ path: '/platform/blog/knowledge/article/editor', query: { articleId: article.id, knowledgeId: this.knowledgeId } })
      },
      delArticle(article) {
        let _this = this
        this.$confirm('请确认删除当前文章', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              // 判断是否有共享删除权限，有就执行共享删除请求
              let del = _this.otherPower['文章共享删除'] ? deleteShareArticle : deleteArticle
              del({ articleId: article.id }).then(res => {
                if (res.flag) {
                  _this.$message({
                    type: 'success',
                    message: '删除文章成功'
                  })
                }
                _this.listArticle(_this.knowledgeId)
              })
            }
          }
        })
      },
      createArticle() {
        this.$router.push({ path: '/platform/blog/knowledge/article/editor', query: { knowledgeId: this.knowledgeId } })
      },
      listArticle(knowledgeId) {
        listArticle({ knowledgeId: knowledgeId }).then(res => {
          if (res.flag) {
            this.tableData = res.data
          }
        })
      }
    },
    components: {
      siteNav: () => import('@/components/site-nav')
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-detail {
    .top-panel {
      display: flex;
      justify-content: space-between;
      .btn-panel {
        display: inline-flex;
        align-self: center;
        .btn {
          margin-right: 15px;
        }
      }
    }
    .knowledge-manager {
      border-radius: 5px;
      border: 1px solid #e8e8e8;
      padding: 15px;
      background: #fff;
      .manager-header {
        display: flex;
        justify-content: space-between;
        .info {
          display: flex;
          align-items: center;
          h2 {
            font-size: 18px;
          }
          .extra {
            margin-left: 15px;
            font-size: 12px;
            font-weight: 500;
            color: #595959;
          }
        }
        .search {

        }
      }
      .manager-body {
        i {
          margin-right: 10px;
        }
        .more {
          transform:rotate(90deg);
          -ms-transform:rotate(90deg);
          -webkit-transform:rotate(90deg);
        }
      }
    }
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 400px;
      border-radius: 5px;
      border: 1px solid #e8e8e8;
      padding: 88px 0 64px;
      background: #fff;
    }
    &__header {
      display: flex;
      width: 700px;
      flex-direction: column;
      align-items: center;
      .cover-title {
        color: #262626;
        font-size: 24px;
      }
      .cover-descr {
        margin-top: 10px;
        font-size: 14px;
        color: #595959;
        line-height: 24px;
      }
      .cover-author {
        margin-top: 10px;
        ul {
          display: flex;
          list-style: none;
          padding: 0px;
          li {
            margin-right: 10px;
            img {
              width: 30px;
              height: 30px;
              border: 2px solid darkgoldenrod;
              border-radius: 50%;
            }
          }
        }
      }
    }
    &__body {
      width: 700px;
      ul {
        list-style: none;
        padding: 0px;
        li {
          position: relative;
          display: flex;
          align-items: center;
          height: 40px;
          .name {
            display: block;
            flex-shrink: 0;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 700;
            color: #595959;
          }
          .line {
            display: block;
            flex-grow: 1;
            height: 1px;
            align-self: center;
            border-bottom: 1px dashed #e8e8e8;
            margin: 0px 15px;
          }
          .author {
            flex-shrink: 0;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
            color: #bfbfbf;
          }
        }
      }
    }
  }
</style>
