<template>
  <el-row class="organization-manage">
    <el-col :span="5" class="resource-tree">
      <el-input
        placeholder="输入关键字进行过滤"
        size="small"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="orgTree"
        :props="defaultProps"
        highlight-current
        default-expand-all
        :default-expanded-keys="expandKey"
        :expand-on-click-node="false"
        @node-click="nodeClick"
        :filter-node-method="filterNode"
        ref="tree2">
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
          <el-button-group>
            <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="add">新增</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small">批量删除</el-button>
          </el-button-group>
        </el-row>
        <div class="table-represent">
          <el-table
            class="role-manage-table"
            :data="orgList"
            border
            stripe>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="id"
              label="编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="部门名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="parentName"
              label="上级部门">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="220">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
                <el-button type="text" size="small">查看</el-button>
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
    <common-dialog :title="dialogTitle[dialogType]" :visible="visible" @cancel="cancel" @confirm="confirm">
      <el-form :rules="rules" ref="orgForm" :model="orgForm" label-width="80px">
        <el-form-item label="上级部门" prop="parentName">
          <el-input v-model="orgForm.parentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="orgName">
          <el-input v-model="orgForm.orgName" disable></el-input>
        </el-form-item>
        <el-form-item label="是否展开" prop="expand">
          <el-select v-model="orgForm.expand">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </common-dialog>
  </el-row>
</template>

<script>
  import { loadOrgTree, list, save } from '../../api/organization'
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
        orgList: [],
        filterText: '',
        orgTree: [],
        expandKey: ['1'],
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
        dialogTitle: { add: '新增部门', edit: '修改部门' },
        visible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    components: {
      commonDialog: () => import('@/components/common-dialog')
    },
    mounted() {
      this.loadPrepresentData()
    },
    methods: {
      async loadPrepresentData() {
        // await必须是Promise对象才有意义（等待resolve的返回）
        let parentId = await this.loadTree()
        this.loadChildren({ parentId: parentId, ...this.paging })
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
        let _this = this
        return new Promise(resolve => {
          loadOrgTree().then(res => {
            if (res.flag) {
              this.orgTree = [res.datas]
              this.curNode = _this.curNode || res.datas
              resolve(this.curNode.id)
            }
          })
        })
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
            save(this.orgForm).then(res => {
              if (res.flag) {
                this.$message({
                  message: '新增部门成功',
                  type: 'success'
                })
                this.loadChildren({ parentId: this.curNode.id, ...this.paging })
                this.loadTree()
                this.visible = false
                this.initForm()
              }
            })
          }
        })
      },
      add() {
        this.dialogType = 'add'
        this.orgForm.parentName = this.curNode.label
        this.visible = true
      },
      searchForm() {
        this.paging.page = 1
        let params = { parentId: this.curNode.id, ...this.paging, ...this.orgSearchForm }
        this.loadChildren(params)
      },
      loadChildren(params) {
        this.$loadingHelper.startLoading('.resource-represent')
        list(params).then(res => {
          this.$loadingHelper.stopLoading()
          if (res.flag) {
            this.loading = false
            this.orgList = res.datas.childrenEntityList
            this.paging.total = res.counts
            this.orgList.map(org => {
              org.parentName = res.datas.label
            })
          }
        })
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
        this.paging = { page: 1, size: val }
        let params = { parentId: this.curNode.id, pageInfo: this.paging, searchForm: this.orgSearchForm }
        this.loadChildren(params)
      },
      handleCurrentChange(val) {
        this.paging = { page: val }
        let params = { parentId: this.curNode.id, pageInfo: this.paging, searchForm: this.orgSearchForm }
        this.loadChildren(params)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .organization-manage {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    .resource-represent {
      padding: 0px 10px;
    }
  }
</style>
