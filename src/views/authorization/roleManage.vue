<template>
  <el-row class="role-manage">
    <el-col :span="24" class="resource-represent">
      <div class="search-form">
        <el-form :inline="true" :model="roleSearchForm" class="demo-form-inline" size="small">
          <el-form-item label="角色名称">
            <el-input v-model="roleSearchForm.roleName" placeholder="模糊匹配角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="searchForm">查询</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="roleSearchForm.roleName = ''">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row class="operate-btn-group" type="flex" justify="start">
        <el-button v-if="noAuthShowBtn || power['角色新增']" type="primary" icon="el-icon-circle-plus" size="small" @click="add">新增</el-button>
        <el-button v-if="noAuthShowBtn || power['角色删除']" type="primary" icon="el-icon-delete" size="small" @click="batchDelete">批量删除</el-button>
      </el-row>
      <div class="table-represent">
        <el-table
          class="role-manage-table"
          :data="roleList"
          @selection-change="selectDelIds"
          stripe>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="index" label="编号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{((paging.page-1) * paging.size + scope.$index+1)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="inUseName"
            label="是否启用"
            width="100">
          </el-table-column>
          <el-table-column
            prop="mark"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <el-button v-if="noAuthShowBtn || power['角色更新']" type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button v-if="noAuthShowBtn || power['角色删除']" type="text" @click="curDelete(scope.row.id)">删除</el-button>
              <el-button v-if="noAuthShowBtn || power['角色查询']" type="text" @click="view(scope.row)">查看</el-button>
              <el-button v-if="noAuthShowBtn || power['角色授权']" type="text" @click="auth(scope.row)">授权</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="roleList.length !== 0" type="flex" justify="center" class="table-pagination">
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
      <el-form :rules="rules" ref="roleForm" :model="roleForm" label-width="80px">
        <el-form-item label="角色名" prop="roleName" >
          <el-input v-model="roleForm.roleName" :disabled="isView"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="inUse">
          <el-select v-model="roleForm.inUse" :disabled="isView">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input v-model="roleForm.mark" :disabled="isView"></el-input>
        </el-form-item>
      </el-form>
    </common-dialog>
    <common-dialog title="分配资源" :visible="authVisible" @cancel="authCancel" @confirm="authConfirm" :hasButton="!isView">
      <table-tree ref="tableTree" :datas="resourceTree"></table-tree>
    </common-dialog>
  </el-row>
</template>

<script>
  import { list, save, edit, deleteAll, resourceAuth, acquireResource } from '../../api/role'
  import { getMenu } from '../../api/permission'
  import { mapGetters } from 'vuex'
  export default {
    name: 'roleManage',
    data() {
      return {
        loading: false,
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        roleSearchForm: {
          roleName: ''
        },
        selectionIds: [],
        roleList: [],
        curNode: '',
        roleForm: {
          roleName: '',
          inUse: '1',
          mark: ''
        },
        rules: {
          roleName: [
            { required: true, message: '角色名不能为空', trigger: 'blur' }
          ]
        },
        dialogType: '',
        dialogTitle: { save: '新增角色', edit: '修改角色', view: '查看角色' },
        visible: false,
        authVisible: false,
        resourceTree: [],
        curRoleId: '',
        power: []
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
    watch: {
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
      tableTree: () => import('@/components/table-tree')
    },
    mounted() {
      this.loadPrepresentData()
    },
    methods: {
      // 递归所有资源，根据当前配置角色授权的资源判断是否选中资源
      recursiveResource(resource, chooseResource) {
        let result = []
        if (resource) {
          result = resource.map(item => {
            if (chooseResource.indexOf(item.id) !== -1) {
              item.isSelect = true
            }
            if (item.type === 'page') {
              item.buttonList = item.children || []

              item.buttonList.forEach(btn => {
                if (chooseResource.indexOf(btn.id) !== -1) {
                  btn.isSelect = true
                }
                btn._parent = item
              })
              delete item.children
            }
            this.recursiveResource(item.children, chooseResource)
            return item
          })
        }
        return result
      },
      authConfirm() {
        let resources = this.$refs.tableTree.acquireResource()
        resourceAuth({ resources: resources, id: this.curRoleId }).then(res => {
          if (res.flag) {
            this.$message({
              type: 'success',
              message: '配置成功'
            })
            this.authVisible = false
            this.resourceTree = []
          }
        })
      },
      authCancel() {
        this.authVisible = false
        this.resourceTree = []
      },
      // 查询当前配置角色的资源然后递归设置树结构资源是否选中
      auth(item) {
        this.curRoleId = item.id
        getMenu().then(res => {
          if (res.flag) {
            acquireResource({ id: item.id }).then(back => {
              if (back.flag) {
                if (back.data && back.data.length) {
                  res.data.isSelect = true
                }
                this.resourceTree = this.recursiveResource([res.data], back.data)
                this.authVisible = true
              }
            })
          }
        })
      },
      view(item) {
        this.dialogType = 'view'
        this.roleForm = {
          roleName: item.roleName,
          inUse: item.inUse,
          mark: item.mark
        }
        this.visible = true
      },
      add() {
        this.dialogType = 'save'
        this.visible = true
      },
      edit(item) {
        this.visible = true
        this.dialogType = 'edit'
        this.roleForm = {
          roleName: item.roleName,
          inUse: item.inUse,
          mark: item.mark
        }
        this.roleForm.id = item.id
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
            message: '请勾选要删除的数据'
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
        this.loadChildren({ page: this.paging.page, size: this.paging.size })
      },
      initForm() {
        this.roleForm = {
          roleName: '',
          inUse: '1',
          mark: ''
        }
        this.$refs.roleForm.clearValidate()
      },
      cancel() {
        this.initForm()
        this.visible = false
      },
      confirm() {
        this.$refs['roleForm'].validate((valid) => {
          if (valid) {
            let operMethod = this.dialogType === 'save' ? save : edit
            operMethod(this.roleForm).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.dialogType === 'save' ? '新增' : '修改'}角色成功`,
                  type: 'success'
                })
                this.loadChildren({ page: this.paging.page, size: this.paging.size })
                this.visible = false
                this.initForm()
              }
            })
          }
        })
      },
      searchForm() {
        let params = { ...{ page: 1, size: this.paging.size }, ...this.roleSearchForm }
        this.loadChildren(params)
      },
      loadChildren(params) {
        if (this.$loadingHelper.startLoading('.resource-represent')) {
          list(params).then(res => {
            this.$loadingHelper.stopLoading()
            if (res.flag) {
              this.loading = false
              this.roleList = res.data
              this.paging.total = res.counts
              this.roleList.map(role => {
                role.inUseName = ['', '是', '否'][role.inUse]
              })
            }
          })
        }
      },
      handleSizeChange(val) {
        this.paging.size = val
        let params = { ...{ page: this.paging.page, size: this.paging.size }, ...this.orgSearchForm }
        this.loadChildren(params)
      },
      handleCurrentChange(val) {
        this.paging.page = val
        let params = { ...{ page: this.paging.page, size: this.paging.size }, ...this.orgSearchForm }
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
