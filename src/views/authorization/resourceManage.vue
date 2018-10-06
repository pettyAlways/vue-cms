<template>
  <el-row class="permission-management">
    <el-col :span="5" class="resource-tree">
      <el-input
        placeholder="输入关键字进行过滤"
        size="small"
        v-model="filterText">
      </el-input>
      <el-tree
        style="margin-top: 5px;"
        class="resource-tree"
        :data="resourceTree"
        :props="defaultProps"
        node-key="id"
        highlight-current
        :default-expanded-keys="expandKey"
        :expand-on-click-node="false"
        @node-click="nodeClick"
        :filter-node-method="filterNode"
        ref="aTree">
      </el-tree>
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
        <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="add">新增</el-button>
        <el-button type="primary" icon="el-icon-delete" size="small" @click="batchDelete">批量删除</el-button>
      </el-row>
      <div class="table-represent">
        <el-table
          class="role-manage-table"
          :data="resourceList"
          @selection-change="selectDelIds"
          border
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
            label="资源图标">
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
              <a type="text" size="small" @click="edit(scope.row)" class="ml10">编辑</a>
              <a type="text" size="small" @click="view(scope.row)" class="ml10">查看</a>
              <a type="text" size="small" @click="curDelete(scope.row.id)" class="ml10 del">删除</a>
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
          <el-form-item label="资源图标" prop="resourceIcon">
            <el-input v-model="resourceForm.resourceIcon" :disabled="isView" placeholder="确保唯一"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="resourcePath">
            <el-input v-model="resourceForm.resourcePath" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="默认页面" prop="defaultPage">
            <el-select v-model="resourceForm.defaultPage" :disabled="isView">
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="resourceType">
            <el-select v-model="resourceForm.resourceType" :disabled="isView">
              <el-option label="模块" value="module"></el-option>
              <el-option label="菜单" value="menu"></el-option>
              <el-option label="页面" value="page"></el-option>
              <el-option label="按钮" value="button"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="inUse">
            <el-select v-model="resourceForm.inUse" :disabled="isView">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
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
  import { getMenu, subPower, saveResource, editResource, deleteAll } from '../../api/permission'
  export default {
    name: 'permissionManagement',
    data() {
      return {
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
          resourceType: '1',
          inUse: '',
          resourceSort: ''
        },
        rules: {
          powerName: [
            { required: true, message: '权限名称不能为空', trigger: 'blur' }
          ],
          powerUrl: [
            { required: true, message: '权限路径不能为空', trigger: 'blur' }
          ]

        },
        dialogType: '',
        dialogTitle: { save: '新增部门', edit: '修改部门', view: '查看部门' },
        visible: false,
        viewVisible: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.aTree.filter(val)
      }
    },
    components: {
      commonDialog: () => import('@/components/common-dialog')
    },
    computed: {
      isView() {
        return this.dialogType === 'view'
      }
    },
    mounted() {
      this.loadPrepresentData()
    },
    methods: {
      view(item) {
        this.dialogType = 'view'
        this.resourceForm = {
          parentResourceName: this.curNode.name,
          resourceName: item.resourceName,
          resourceIcon: item.resourceIcon,
          resourcePath: item.resourcePath,
          resourceType: item.resourceType + '',
          defaultPage: item.defaultPage,
          inUse: item.inUse + '',
          resourceSort: item.resourceSort
        }
        this.visible = true
      },
      add() {
        this.dialogType = 'save'
        this.resourceForm.parentResourceName = this.curNode.name
        this.resourceForm.resourceSort = this.curNode.children.length + 1
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
        let _this = this
        return new Promise(resolve => {
          getMenu().then(res => {
            if (res.flag) {
              this.resourceTree = [res.data]
              this.curNode = _this.curNode || res.data
              _this.expandKey.push(this.curNode.id)
              resolve(this.curNode.id)
            }
          })
        })
      },
      initForm() {
        this.resourceForm = {
          parentPowerName: '',
          powerName: '',
          powerUrl: '',
          powerCode: '',
          powerType: '1',
          powerIndex: ''
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
      }
    }
  }
</script>

<style scoped lang='scss'>
  .permission-management {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
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
        color: #20a0ff ;
      }
    }
    .table-pagination {
      margin-top: 15px;
    }
  }
</style>
