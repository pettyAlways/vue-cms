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
        node-key="powerCode"
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
            prop="powerName"
            label="权限名称">
          </el-table-column>
          <el-table-column
            prop="powerUrl"
            label="路径"
            width="300">
          </el-table-column>
          <el-table-column
            prop="powerCode"
            label="权限标志"
            width="180">
          </el-table-column>
          <el-table-column
            prop="powerTypeName"
            label="类型"
            width="55">
          </el-table-column>
          <el-table-column
            prop="powerIndex"
            label="排序"
            width="55">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <a type="text" size="small" @click="edit(scope.row)" class="ml10">编辑</a>
              <a type="text" size="small" @click="view(scope.row)" class="ml10">查看</a>
              <a type="text" size="small" @click="curDelete(scope.row.powerCode)" class="ml10 del">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="resourceList.length !== 0" type="flex" justify="center" class="table-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNum"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            background>
          </el-pagination>
        </el-row>
      </div>
      <el-dialog :title="dialogTitle[dialogType]" :visible.sync="visible" width="30%" @close="cancel">
        <el-form :rules="rules" ref="resourceForm" :model="resourceForm" label-width="80px">
          <el-form-item label="上级权限" prop="parentPowerName">
            <el-input v-model="resourceForm.parentPowerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限名称" prop="powerName">
            <el-input v-model="resourceForm.powerName" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="路径" prop="powerUrl">
            <el-input v-model="resourceForm.powerUrl" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="权限标志" prop="powerCode">
            <el-input v-model="resourceForm.powerCode" :disabled="isView" placeholder="确保唯一"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="powerType">
            <el-select v-model="resourceForm.powerType" :disabled="isView">
              <el-option label="菜单" value="1"></el-option>
              <el-option label="按钮" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="powerIndex">
            <el-input v-model="resourceForm.powerIndex" :disabled="isView"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
  import { getMenu, subPower, save, edit, deleteAll } from '../../api/permission'
  export default {
    name: 'permissionManagement',
    data() {
      return {
        loading: false,
        pageInfo: {
          pageSize: 10,
          pageNum: 1,
          total: 1,
          pages: 1
        },
        resourceSearchForm: {
          resourceName: ''
        },
        selectionIds: [],
        resourceList: [],
        filterText: '',
        resourceTree: [],
        expandKey: ['contract'],
        curNode: '',
        resourceForm: {
          parentPowerName: '',
          powerName: '',
          powerUrl: '',
          powerCode: '',
          powerType: '1',
          powerIndex: ''
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
          children: 'powerList',
          label: 'powerName'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.aTree.filter(val)
      }
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
          parentPowerName: this.curNode.powerName,
          powerName: item.powerName,
          powerUrl: item.powerUrl,
          powerCode: item.powerCode,
          powerType: item.powerType + '',
          powerIndex: item.powerIndex
        }
        this.visible = true
      },
      add() {
        this.dialogType = 'save'
        this.resourceForm.parentPowerName = this.curNode.powerName
        this.resourceForm.powerIndex = this.curNode.powerList.length + 1
        this.visible = true
      },
      edit(item) {
        this.visible = true
        this.dialogType = 'edit'
        this.resourceForm = {
          parentPowerName: this.curNode.powerName,
          powerName: item.powerName,
          powerUrl: item.powerUrl,
          powerCode: item.powerCode,
          powerType: item.powerType + '',
          powerIndex: item.powerIndex
        }
        // 独特的权限表设计所需要
        this.resourceForm.oldPowerCode = item.powerCode
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
        this.selectionIds = val.map(item => item.powerCode)
      },
      async loadPrepresentData() {
        // await必须是Promise对象才有意义（等待resolve的返回）
        let powerCode = await this.loadTree()
        this.loadChildren({powerCode: powerCode, ...{ pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize }})
      },
      // 树节点切换时一些公用数据重置
      switchNodeClear() {
        this.pageInfo = {
          pageSize: 10,
          pageNum: 1,
          total: 1,
          pages: 1
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
              this.resourceTree = res.data
              this.curNode = _this.curNode || res.data[1]
              resolve(this.curNode.powerCode)
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
            this.resourceForm.parentPowerCode = this.curNode.powerCode
            let operMethod = this.dialogType === 'save' ? save : edit
            operMethod(this.resourceForm).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.dialogType === 'save' ? '新增' : '修改'}资源成功`,
                  type: 'success'
                })
                this.loadChildren({powerCode: this.curNode.powerCode, ...{ pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize }})
                this.visible = false
                this.initForm()
              }
            })
          }
        })
      },
      searchForm() {
        let params = { powerCode: this.curNode.powerCode, ...{ pageNum: 1, pageSize: this.pageInfo.pageSize }, ...this.resourceSearchForm }
        this.loadChildren(params)
      },
      loadChildren(params) {
        subPower(params).then(res => {
          if (res.flag) {
            this.loading = false
            this.resourceList = res.data
            this.pageInfo = res.page
            this.resourceList.map(org => {
              org.powerTypeName = ['', '菜单', '按钮'][org.powerType]
            })
          }
        })
      },
      // 树节点切换处理
      nodeClick(item) {
        this.switchNodeClear()
        this.curNode = item
        let params = {powerCode: this.curNode.powerCode, ...{pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize}}
        this.loadChildren(params)
      },
      filterNode(value, data) {
        if (!value) return true
        return data.powerName.indexOf(value) !== -1
      },
      handleSizeChange(val) {
        let params = { powerCode: this.curNode.powerCode, ...{ pageNum: this.pageInfo.pageNum, pageSize: val }, ...this.resourceSearchForm }
        this.loadChildren(params)
      },
      handleCurrentChange(val) {
        let params = { powerCode: this.curNode.powerCode, ...{ pageNum: val, pageSize: this.pageInfo.pageSize }, ...this.resourceSearchForm }
        this.loadChildren(params)
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
