<template>
  <el-card class="knowledge">
    <custom-card02 title="参与的知识库">
      <template slot="more">
        <a @click="switchList" style="font-size: 18px;" v-if="!_.isEmpty(cardKnowledge) || !_.isEmpty(listKnowledge)">
          <i :class="{'el-icon-s-unfold': isList, 'el-icon-s-fold': !isList}"></i>
        </a>
      </template>
      <div v-if="isList" class="knowledge__list">
        <el-table
          :data="listKnowledge"
          style="width: 100%">
          <el-table-column label="知识库名字">
            <template slot-scope="scope">
              <router-link :to="{ path: '/platform/blog/knowledge/detail', query: { knowledgeId: scope.row.knowledgeId } }">
                {{scope.row.knowledgeName}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="createName"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="participantName"
            label="参与者">
          </el-table-column>
          <el-table-column
            prop="knowledgeDesc"
            label="描述"
            min-width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button v-if="noAuthShowBtn || (power['更新知识库'] && shareAuth('共享更新', scope.row))"
                         type="text" size="small" @click="editKnowledge(scope.row)">编辑</el-button>
              <el-button v-if="noAuthShowBtn || (power['移除参与者'] && shareAuth('共享移除参与者', scope.row))"
                         type="text" size="small" @click="removeParticipant(scope.row)">移除参与者</el-button>
              <el-button v-if="noAuthShowBtn || (power['删除知识库'] && shareAuth('共享删除知识库', scope.row))"
                         type="text" size="small" @click="removeKnowledge(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="knowledge__block">
        <ul>
          <li v-for="(item, index) in cardKnowledge" :key="index">
            <el-card :body-style="{ 'padding': '0px', 'padding-bottom': '10px' }">
              <div class="knowledge__block__item">
                <div class="item__header">
                  <img :src="item.knowledgeCover">
                  <div class="item_right">
                    <span class="title">
                      <router-link :to="{ path: '/platform/blog/knowledge/detail', query: { knowledgeId: item.knowledgeId } }">
                        {{item.knowledgeName}}
                      </router-link>
                    </span>
                    <span>{{item.knowledgeDesc}}</span>
                  </div>
                </div>
                <div class="item__body">
                  <ul>
                    <li v-for="(tItem, index) in item.articleEntities" :key="index" @click="goArticle(tItem.articleId, item.knowledgeId)">
                      <span>{{tItem.articleTitle}}</span>
                      <span>{{tItem.postTime | transformDate}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </el-card>
          </li>
        </ul>
      </div>
    </custom-card02>
    <el-dialog
      title="移除参与者"
      :visible.sync="participantVisible"
      width="30%">
      <el-tag
        :key="index"
        v-for="(item, index) in participantList"
        closable
        :disable-transitions="false"
        @close="handleRemoveParticipant(item)">
        {{item.participantName}}
      </el-tag>
    </el-dialog>

  </el-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { listKnowledge, cardKnowledge, removeKnowledge, removeShareKnowledge, removeParticipant, removeShareParticipant } from '@/api/knowledge'
  export default {
    name: 'knowledge',
    data() {
      return {
        power: [],
        showWay: '',
        curKnowledge: '',
        participantList: [],
        participantVisible: false,
        isList: false,
        activeName: 'block',
        cardKnowledge: [],
        listKnowledge: []
      }
    },
    components: {
      customCard02: () => import('@/components/custom-card-02')
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
        return (auth, knowledge) => {
          return this.currentUser.id === knowledge.creator || this.power[auth]
        }
      }
    },
    watch: {
      pageMenus: {
        handler(newMenus) {
          if (newMenus) {
            this.power = newMenus[this.$route.path]
          }
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      ...mapActions([
        'setCurNav'
      ]),
      init() {
        let executeMethod = this.isList ? this.retrieveListKnowledge : this.retrieveCardKnowledge
        executeMethod()
      },
      editKnowledge(knowledge) {
        this.$router.push({ path: '/platform/blog/knowledge/new', query: { knowledgeId: knowledge.knowledgeId } })
      },
      removeKnowledge(knowledge) {
        let _this = this
        this.$confirm('请确认删除当前知识库', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              if (_this.$loadingHelper.startLoading('.article-editor', '正在删除中，请稍后')) {
                let remove = _this.power['共享删除知识库'] ? removeShareKnowledge : removeKnowledge
                remove({ knowledgeId: knowledge.knowledgeId }).then(res => {
                  _this.$loadingHelper.stopLoading()
                  if (res.flag) {
                    _this.$message({
                      type: 'success',
                      message: '删除知识库成功'
                    })
                    _this.init()
                  }
                })
              }
            }
          }
        })
      },
      goArticle(articleId, knowledgeId) {
        this.$router.push({ path: '/platform/blog/knowledge/article/show', query: { articleId: articleId, knowledgeId: knowledgeId } })
      },
      handleRemoveParticipant(item) {
        let _this = this
        this.$confirm('请确认移除当前参与者', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              let remove = _this.power['共享移除参与者'] ? removeShareParticipant : removeParticipant
              remove({ participantId: item.participantId, knowledgeId: _this.curKnowledge }).then(res => {
                if (res.flag) {
                  _this.$message({
                    type: 'success',
                    message: '移除成功'
                  })
                  _this.participantList = _this.participantList.filter(participant => participant.participantId !== item.participantId)
                  _this.init()
                }
              })
            }
          }
        })
      },
      removeParticipant(item) {
        this.curKnowledge = item.knowledgeId
        this.participantList = item.participantEntities
        this.participantVisible = true
      },
      switchList() {
        this.isList = !this.isList
        this.init()
      },
      retrieveCardKnowledge() {
        cardKnowledge().then(res => {
          if (res.flag) {
            this.cardKnowledge = res.data
          }
        })
      },
      retrieveListKnowledge() {
        listKnowledge().then(res => {
          if (res.flag) {
            this.listKnowledge = res.data
            this.listKnowledge.map(item => {
              item.participantName = item.participantEntities.map(temp => temp.participantName).join(',')
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge {
    &__block {
      min-height: 300px;
      ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0px;
        li {
          margin-bottom: 15px;
          margin-right: 6px;
        }
      }
      &__item {
        width: 300px;
        height: 230px;
        padding: 10px 15px;
        .item__header {
          display: flex;
          height: 68px;
          align-items: center;
          border-bottom: 1px solid #e8e8e8;
          img {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            object-fit: cover;
          }
          .item_right {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            margin-left: 15px;
            width: 230px;
            height: 45px;
            span {
              display: block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .title {
              font-weight: 700;
              font-size: 16px;
              color: #262626;
              margin-bottom: 5px;
            }
            span:nth-of-type(1) {
              font-size: 13px;
              font-weight: 400;
              color: #333;
            }
            span:nth-of-type(2) {
              font-size: 12px;
              color: #8c8c8c;
            }
          }
        }
        .item__body {
          margin-top: 10px;
          ul {
            display: flex;
            flex-direction: column;
            padding: 0px;
            margin-left: 16px;
            li {
              position: relative;
              display: flex;
              justify-content: space-between;
              line-height: 21px;
              color: #8c8c8c;
              margin-bottom: 3px;
              &:hover {
                background-color: gainsboro;
                cursor: pointer;
                color: #595959;
              }
              &:before {
                content: "";
                width: 4px;
                height: 4px;
                border-radius: 4px;
                background-color: #8c8c8c;
                position: absolute;
                left: -16px;
                top: 50%;
                margin-top: -2px;
              }
              span:nth-of-type(1) {
                overflow: hidden;
                margin-right: 5px;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              span:nth-of-type(2) {
                color: #bfbfbf;
                font-size: 12px;
                text-align: right;
                min-width: 100px;
              }
            }
          }
        }
      }
    }
    &__list {
      min-height: 300px;
    }
  }
</style>
