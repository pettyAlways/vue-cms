<template>
  <el-row class="organization-manage">
    <el-col :span="5" class="resource-tree">
      <el-input
        placeholder="输入关键字进行过滤"
        size="small"
        v-model="filterText">
      </el-input>
      <el-tree
        style="margin-top: 5px;"
        class="filter-tree"
        :data="orgTree"
        :props="defaultProps"
        node-key="id"
        highlight-current
        :default-expanded-keys="expandKey"
        :expand-on-click-node="false"
        @node-click="nodeClick"
        :filter-node-method="filterNode"
        ref="aTree">
        <span style="display: flex; flex-direction: row; align-items: center" slot-scope="{ node, data }">
           <icon-svg :iconClass="treeIcon[data.children.length ? 0 : 1]"></icon-svg>
           <span style="margin-left: 5px">{{node.label}}</span>
        </span>
      </el-tree>
    </el-col>
    <el-col :span="19" class="resource-represent">
        <div class="search-form">
          <el-form :inline="true" :model="orgSearchForm" class="demo-form-inline" size="small">
            <el-form-item label="部门名称">
              <el-input v-model="orgSearchForm.orgName" placeholder="模糊匹配部门名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-delete" size="small" @click="searchForm">查询</el-button>
              <el-button type="primary" icon="el-icon-delete" size="small" @click="orgSearchForm.orgName = ''">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-row class="operate-btn-group" type="flex" justify="start">
          <el-button v-if="noAuthShowBtn || power['组织新增']" type="primary" icon="el-icon-circle-plus" size="small" @click="add">新增</el-button>
          <el-button v-if="noAuthShowBtn || power['组织删除']" type="primary" icon="el-icon-delete" size="small" @click="batchDelete">批量删除</el-button>
        </el-row>
        <div class="table-represent">
          <el-table
            class="role-manage-table"
            :data="orgList"
            @selection-change="selectDelIds"
            stripe>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="id"
              label="编号"
              width="55">
              <template slot-scope="scope">
                {{(paging.page-1) * paging.size + scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="部门名称">
            </el-table-column>
            <el-table-column
              prop="parentName"
              label="上级部门">
            </el-table-column>
            <el-table-column
              prop="expandName"
              label="是否展开">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="220">
              <template slot-scope="scope">
                <el-button v-if="noAuthShowBtn || power['组织更新']" type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button v-if="noAuthShowBtn || power['组织删除']" type="text" @click="curDelete(scope.row.id)">删除</el-button>
                <el-button v-if="noAuthShowBtn || power['组织查询']" type="text" @click="view(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row v-if="orgList.length !== 0" type="flex" justify="center" class="table-pagination">
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
    </el-col>
    <common-dialog :title="dialogTitle[dialogType]" :visible="visible" @cancel="cancel" @confirm="confirm" :hasButton="!isView">
      <el-form :rules="rules" ref="orgForm" :model="orgForm" label-width="80px">
        <el-form-item label="上级部门" prop="parentName">
          <el-input v-model="orgForm.parentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="orgName">
          <el-input v-model="orgForm.orgName" :disabled="isView"></el-input>
        </el-form-item>
        <el-form-item label="是否展开" prop="expand">
          <el-select v-model="orgForm.expand" :disabled="isView">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </common-dialog>
  </el-row>
</template>

<script>
  import { loadOrgTree, list, save, edit, deleteAll } from '../../api/organization'
  import { mapGetters } from 'vuex'
  export default {
    name: 'organizationManage',
    data() {
      return {
        loading: false,
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        orgSearchForm: {
          orgName: ''
        },
        selectionIds: [],
        orgList: [],
        filterText: '',
        orgTree: [],
        expandKey: [],
        curNode: '',
        orgForm: {
          parentName: '',
          orgName: '',
          expand: 'N'
        },
        rules: {
          parentName: [
            { required: true, message: '上级部门不能为空', trigger: 'blur' }
          ],
          orgName: [
            { required: true, message: '部门名称不能为空', trigger: 'blur' }
          ],
          expand: [
            { required: true, message: '请选择是否展开', trigger: 'change' }
          ]
        },
        dialogType: '',
        dialogTitle: { save: '新增部门', edit: '修改部门', view: '查看部门' },
        visible: false,
        viewVisible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeIcon: ['folder', 'file']
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
    components: {
      commonDialog: () => import('@/components/common-dialog')
    },
    mounted() {
      this.loadPrepresentData()
    },
    methods: {
      view(item) {
        this.dialogType = 'view'
        this.orgForm = {
          parentName: this.curNode.label,
          orgName: item.orgName,
          expand: item.expand
        }
        this.visible = true
      },
      add() {
        this.dialogType = 'save'
        this.orgForm.parentName = this.curNode.label
        this.visible = true
      },
      edit(item) {
        this.visible = true
        this.dialogType = 'edit'
        this.orgForm = {
          parentName: this.curNode.label,
          orgName: item.orgName,
          expand: item.expand
        }
        this.orgForm.id = item.id
      },
      curDelete(id) {
        let _this = this
        this.$confirm('请确认删除当前数据', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              deleteAll([id]).then(res => {
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
            message: '请勾选要删除的组织'
          })
          return
        }
        let _this = this
        this.$confirm('请确认删除当前数据', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              deleteAll(_this.selectionIds).then(res => {
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
        this.loadChildren({ parentId: curNodeId, ...this.paging })
      },
      // 树节点切换时一些公用数据重置
      switchNodeClear() {
        this.paging = {
          page: 1,
          total: 0,
          size: 10
        }
        this.orgSearchForm = {
          orgName: ''
        }
      },
      loadTree() {
        return new Promise(resolve => {
          loadOrgTree().then(res => {
            if (res.flag) {
              this.orgTree = [res.data]
              // 重新加载的时候需要清空展开的key
              this.expandKey = []
              // 指定展开部门
              this.expandNode(res.data)
              this.curNode = this.curNode || res.data
              this.expandKey.push(this.curNode.id)
              resolve(this.curNode.id)
            }
          })
        })
      },
      expandNode(orgItems) {
        if (orgItems.children && orgItems.children.length) {
          orgItems.children.forEach(item => {
            if (item.expand === 'Y') {
              this.expandKey.push(item.id)
            }
            this.expandNode(item.children)
          })
        }
      },
      initForm() {
        this.orgForm = {
          orgName: '',
          expand: 'N'
        }
        this.$refs.orgForm.clearValidate()
      },
      cancel() {
        this.initForm()
        this.visible = false
      },
      confirm() {
        this.$refs['orgForm'].validate((valid) => {
          if (valid) {
            this.orgForm.parentId = this.curNode.id
            let operMethod = this.dialogType === 'save' ? save : edit
            operMethod(this.orgForm).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.dialogType === 'save' ? '新增' : '修改'}部门成功`,
                  type: 'success'
                })
                this.loadChildren({ parentId: this.curNode.id, ...{ page: this.paging.page, size: this.paging.size } })
                this.loadTree()
                this.visible = false
                this.initForm()
              }
            })
          }
        })
      },
      searchForm() {
        let params = { parentId: this.curNode.id, ...{ page: 1, size: this.paging.size }, ...this.orgSearchForm }
        this.loadChildren(params)
      },
      loadChildren(params) {
        if (this.$loadingHelper.startLoading('.resource-represent')) {
          list(params).then(res => {
            this.$loadingHelper.stopLoading()
            if (res.flag) {
              this.loading = false
              this.orgList = res.data.childrenEntityList
              this.paging.total = res.counts
              this.orgList.map(org => {
                org.parentName = res.data.label
                org.expandName = org.expand === 'Y' ? '是' : '否'
              })
            }
          })
        }
      },
      // 树节点切换处理
      nodeClick(item) {
        this.switchNodeClear()
        this.curNode = item
        let params = { parentId: this.curNode.id, ...this.paging }
        this.loadChildren(params)
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleSizeChange(val) {
        this.paging.size = val
        let params = { parentId: this.curNode.id, ...{ page: this.paging.page, size: this.paging.size }, ...this.orgSearchForm }
        this.loadChildren(params)
      },
      handleCurrentChange(val) {
        this.paging.page = val
        let params = { parentId: this.curNode.id, ...{ page: this.paging.page, size: this.paging.size }, ...this.orgSearchForm }
        this.loadChildren(params)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .organization-manage {
    .resource-represent {
      padding: 0px 10px;
    }
  }
</style>
