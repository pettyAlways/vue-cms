<template>
  <el-row class="permission-management">
    <el-col :span="5">
      <el-input
        placeholder="输入关键字进行过滤"
        size="small"
        v-model="filterText">
      </el-input>
      <div class="resource-panel" :style="{ height: clientHeight + 'px' }">
        <el-tree
          style="margin-top: 5px;"
          class="resource-panel__tree"
          :data="resourceTree"
          :props="defaultProps"
          node-key="id"
          highlight-current
          :default-expanded-keys="expandKey"
          :expand-on-click-node="false"
          @node-click="nodeClick"
          :filter-node-method="filterNode"
          ref="aTree">
         <span style="display: flex; flex-direction: row; align-items: center" slot-scope="{ node, data }">
           <icon-svg :iconClass="resType[data.type]"></icon-svg>
           <span style="margin-left: 5px">{{node.label}}</span>
         </span>
          <span>
          <el-button
            type="text"
            size="mini">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini">
            Delete
          </el-button>
        </span>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="19" class="resource-represent">
      <div class="search-form">
        <el-form :inline="true" :model="resourceSearchForm" class="demo-form-inline" size="small">
          <el-form-item label="权限名称">
            <el-input v-model="resourceSearchForm.resourceName" placeholder="模糊匹配权限名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="searchForm">查询</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="resourceSearchForm.resourceName = ''">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row class="operate-btn-group" type="flex" justify="start">
        <el-button v-if="noAuthShowBtn || power['资源新增']" type="primary" icon="el-icon-circle-plus" size="small" @click="add">新增</el-button>
        <el-button v-if="noAuthShowBtn || power['资源删除']" type="primary" icon="el-icon-delete" size="small" @click="batchDelete">批量删除</el-button>
      </el-row>
      <div class="table-represent">
        <el-table
          class="role-manage-table"
          :data="resourceList"
          @selection-change="selectDelIds"
          stripe>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="resourceName"
            label="权限名称">
          </el-table-column>
          <el-table-column
            prop="resourcePath"
            label="路径"
            width="300">
          </el-table-column>
          <el-table-column
            prop="resourceIcon"
            label="资源图标"
            align="center">
            <template slot-scope="scope">
              <icon-svg v-if="scope.row.resourceIcon" :iconClass="scope.row.resourceIcon"></icon-svg>
            </template>
          </el-table-column>
          <el-table-column
            prop="resourceTypeName"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="inUseName"
            label="是否启用">
          </el-table-column>
          <el-table-column
            prop="resourceSort"
            label="排序">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <el-button v-if="noAuthShowBtn || power['资源更新']" type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button v-if="noAuthShowBtn || power['资源查询']" type="text" @click="view(scope.row)">查看</el-button>
              <el-button v-if="noAuthShowBtn || power['资源删除']" type="text" @click="curDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="resourceList.length !== 0" type="flex" justify="center" class="table-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paging.page"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="paging.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paging.total"
            background>
          </el-pagination>
        </el-row>
      </div>
      <common-dialog :title="dialogTitle[dialogType]" :visible="visible" @cancel="cancel" @confirm="confirm" :hasButton="!isView">
        <el-form :rules="rules" ref="resourceForm" :model="resourceForm" label-width="80px">
          <el-form-item label="上级权限" prop="parentResourceName">
            <el-input v-model="resourceForm.parentResourceName" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限名称" prop="resourceName">
            <el-input v-model="resourceForm.resourceName" :disabled="isView"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型" prop="resourceType">
                <el-select v-model="resourceForm.resourceType" :disabled="isView">
                  <el-option label="模块" value="module"></el-option>
                  <el-option label="菜单" value="menu"></el-option>
                  <el-option label="页面" value="page"></el-option>
                  <el-option label="按钮" value="button"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="['module', 'menu', 'page'].indexOf(resourceForm.resourceType) != -1">
              <el-form-item label="资源图标" prop="resourceIcon">
                <icons-show :iconVal="resourceForm.resourceIcon" ref="iconPanel"></icons-show>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item v-if="['page', 'button'].indexOf(resourceForm.resourceType) != -1" label="资源路径" prop="resourcePath">
            <el-input v-model="resourceForm.resourcePath" :disabled="isView"></el-input>
          </el-form-item>
          <el-row>
            <el-col v-if="['page'].indexOf(resourceForm.resourceType) != -1" :span="12">
              <el-form-item label="默认页面" prop="defaultPage">
                <el-select v-model="resourceForm.defaultPage" :disabled="isView">
                  <el-option label="是" value="Y"></el-option>
                  <el-option label="否" value="N"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="['module'].indexOf(resourceForm.resourceType) != -1" :span="12">
              <el-form-item label="模块归属"  prop="belongs">
                <el-select v-model="resourceForm.belongs" :disabled="isView" @change="belongsChange">
                  <el-option label="内部" value="internal"></el-option>
                  <el-option label="外部" value="external"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否启用" prop="inUse">
                <el-select v-model="resourceForm.inUse" :disabled="isView">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="唯一编码" prop="alias" v-if="aliasShow && ['module', 'menu'].indexOf(resourceForm.resourceType) != -1">
            <el-input v-model="resourceForm.alias" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="resourceSort">
            <el-input v-model="resourceForm.resourceSort" :disabled="isView"></el-input>
          </el-form-item>
        </el-form>
      </common-dialog>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getMenu, subPower, saveResource, editResource, deleteAll } from '../../api/permission'
  export default {
    name: 'resourceManage',
    data() {
      return {
        aliasShow: true,
        clientHeight: '',
        loading: false,
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        resourceSearchForm: {
          resourceName: ''
        },
        selectionIds: [],
        resourceList: [],
        filterText: '',
        resourceTree: [],
        expandKey: [],
        curNode: '',
        resourceForm: {
          parentResourceName: '',
          resourceName: '',
          resourceIcon: '',
          resourcePath: '',
          resourceType: 'page',
          belongs: '',
          defaultPage: 'N',
          alias: '',
          inUse: '1',
          resourceSort: ''
        },
        rules: {
          resourceName: [
            { required: true, message: '权限名称不能为空', trigger: 'blur' }
          ],
          powerUrl: [
            { required: true, message: '权限路径不能为空', trigger: 'blur' }
          ],
          resourcePath: [
            { required: true, message: '资源路径不能为空', trigger: 'blur' }
          ]

        },
        dialogType: '',
        dialogTitle: { save: '新增资源', edit: '修改资源', view: '查看资源' },
        visible: false,
        viewVisible: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        power: [],
        resType: {
          root: 'tree',
          module: 'trunk',
          exModule: 'folder',
          menu: 'branch',
          page: 'leaf',
          button: 'bug'
        },
        timer: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.aTree.filter(val)
      },
      pageMenus: {
        handler(newMenus) {
          this.power = newMenus[this.$route.path]
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    components: {
      commonDialog: () => import('@/components/common-dialog'),
      iconsShow: () => import('@/components/custom-select/icon_show')
    },
    computed: {
      ...mapGetters([
        'pageMenus',
        'sysParam'
      ]),
      isView() {
        return this.dialogType === 'view'
      },
      noAuthShowBtn() {
        return this.sysParam['no_auth_represent'] === 'represent'
      }
    },
    mounted() {
      this.clientHeight = document.body.clientHeight - 168
      this.loadPrepresentData()
    },
    methods: {
      belongsChange(status) {
        this.aliasShow = status === 'internal'
      },
      view(item) {
        this.dialogType = 'view'
        this.resourceForm = {
          parentResourceName: this.curNode.name,
          resourceName: item.resourceName,
          resourceIcon: item.resourceIcon,
          resourcePath: item.resourcePath,
          resourceType: item.resourceType + '',
          defaultPage: item.defaultPage,
          belongs: item.belongs,
          alias: item.alias,
          inUse: item.inUse + '',
          resourceSort: item.resourceSort
        }
        this.visible = true
      },
      add() {
        this.dialogType = 'save'
        this.resourceForm.parentResourceName = this.curNode.name
        this.resourceForm.resourceSort = this.generateMaxId(this.curNode)
        this.visible = true
      },
      edit(item) {
        this.visible = true
        this.dialogType = 'edit'
        this.resourceForm = {
          parentResourceName: this.curNode.name,
          resourceName: item.resourceName,
          resourceIcon: item.resourceIcon,
          resourcePath: item.resourcePath,
          resourceType: item.resourceType,
          defaultPage: item.defaultPage,
          belongs: item.belongs,
          alias: item.alias,
          inUse: item.inUse,
          resourceSort: item.resourceSort
        }
        this.resourceForm.id = item.id
      },
      curDelete(id) {
        let _this = this
        this.$confirm('请确认删除当前数据', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              deleteAll({ ids: id }).then(res => {
                if (res.flag) {
                  _this.$message({
                    type: 'success',
                    message: '删除成功'
                  })
                  _this.loadPrepresentData()
                }
              })
            }
          }
        })
      },
      batchDelete() {
        if (!this.selectionIds.length) {
          this.$message({
            type: 'error',
            message: '请勾选要删除的资源'
          })
          return
        }
        let _this = this
        this.$confirm('请确认删除当前数据', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              deleteAll({ ids: _this.selectionIds.join(',') }).then(res => {
                if (res.flag) {
                  _this.$message({
                    type: 'success',
                    message: '删除成功'
                  })
                  _this.loadPrepresentData()
                }
              })
            }
          }
        })
      },
      selectDelIds(val) {
        this.selectionIds = val.map(item => item.id)
      },
      async loadPrepresentData() {
        // await必须是Promise对象才有意义（等待resolve的返回）
        let curNodeId = await this.loadTree()
        // 异步加载需要时间，在这个事件内切换其他模块当前的this注销，则这个树引用找不到，所以需要判断
        if (this.$refs.aTree) {
          this.$refs.aTree.setCurrentKey(curNodeId)
        }
        this.loadTableDatas({parentId: curNodeId, ...{ page: this.paging.page, size: this.paging.size }})
      },
      // 树节点切换时一些公用数据重置
      switchNodeClear() {
        this.paging = {
          page: 1,
          total: 0,
          size: 10
        }
        this.resourceSearchForm = {
          resourceName: ''
        }
      },
      loadTree() {
        return new Promise(resolve => {
          getMenu().then(res => {
            if (res.flag) {
              this.resourceTree = [res.data]
              this.curNode = this.updateCurNode(res.data) || res.data
              this.expandKey.push(this.curNode.id)
              resolve(this.curNode.id)
            }
          })
        })
      },
      initForm() {
        this.resourceForm = {
          parentResourceName: '',
          resourceName: '',
          resourceIcon: '',
          resourcePath: '',
          resourceType: 'page',
          defaultPage: 'N',
          belongs: '',
          alias: '',
          inUse: '1',
          resourceSort: ''
        }
        // 调用子组件方法清除，调用这个方法清除而不是置空resourceForm.resourceIcon触发props清空的原因：
        // 主要是在新增的时候resourceForm.resourceIcon传递是空，点取消是置空resourceIcon,前后没有发生变化所以不会触发props
        // 导致在选择图标再取消不会清空输入框图标内容
        if (this.$refs.iconPanel) {
          this.$refs.iconPanel.clearIcon()
        }
        this.$refs.resourceForm.clearValidate()
      },
      cancel() {
        this.initForm()
        this.visible = false
      },
      confirm() {
        this.$refs['resourceForm'].validate((valid) => {
          if (valid) {
            this.resourceForm.parentId = this.curNode.id
            this.resourceForm.belongs = this.resourceForm.belongs ? this.resourceForm.belongs : this.curNode.belongs
            if (this.$refs.iconPanel) {
              this.resourceForm.resourceIcon = this.$refs.iconPanel.getSelectVal()
            }
            let operMethod = this.dialogType === 'save' ? saveResource : editResource
            operMethod(this.resourceForm).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.dialogType === 'save' ? '新增' : '修改'}资源成功`,
                  type: 'success'
                })
                this.loadPrepresentData()
                this.visible = false
                this.initForm()
              }
            })
          }
        })
      },
      searchForm() {
        let params = { parentId: this.curNode.id, ...{ page: 1, size: this.paging.size }, ...this.resourceSearchForm }
        this.loadTableDatas(params)
      },
      loadTableDatas(params) {
        subPower(params).then(res => {
          if (res.flag) {
            this.loading = false
            this.resourceList = res.data
            this.paging.total = res.total
            this.resourceList.forEach(resource => {
              resource.resourceTypeName = {module: '模块', menu: '菜单', page: '页面', button: '按钮'}[resource.resourceType]
              resource.inUseName = ['', '是', '否'][resource.inUse]
            })
          }
        })
      },
      // 树节点切换处理
      nodeClick(item) {
        this.switchNodeClear()
        this.curNode = item
        let params = {parentId: this.curNode.id, ...{page: this.paging.page, size: this.paging.size}}
        this.loadTableDatas(params)
      },
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleSizeChange(val) {
        let params = { parentId: this.curNode.id, ...{ page: this.paging.page, size: val }, ...this.resourceSearchForm }
        this.loadTableDatas(params)
      },
      handleCurrentChange(val) {
        let params = { parentId: this.curNode.id, ...{ page: val, size: this.paging.size }, ...this.resourceSearchForm }
        this.loadTableDatas(params)
      },
      generateMaxId(curNode) {
        let child = curNode.children || []
        let maxId = 0
        child.forEach(item => {
          if (item.sort > maxId) {
            maxId = item.sort
          }
        })
        return maxId + 1
      },
      updateCurNode(node) {
        let back
        if (node.id === this.curNode.id) {
          return node
        }
        let child = node.children || []
        for (let item of child) {
          back = this.updateCurNode(item)
          if (back) {
            break
          }
        }
        return back
      }
    }
  }
</script>

<style scoped lang='scss'>
  .permission-management {
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    .resource-panel {
      overflow: hidden;
      .resource-panel__tree {
        border: 0px;
        width: calc(100% + 20px);
        height: 100%;
        overflow-y: auto;
      }
    }
    .resource-represent {
      padding: 0px 10px;
      /deep/ .el-table__empty-block {
        width: 100% !important;
      }
      .operate-btn-group {
        margin-bottom: 15px;
      }
      a{
        cursor: pointer;
      }
    }
    .table-pagination {
      margin-top: 15px;
    }
  }
</style>
