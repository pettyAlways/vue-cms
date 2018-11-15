<template>
  <el-row class="constConfiguration-manage">
    <el-col :span="24" class="resource-represent">
      <div class="search-form">
        <el-form :inline="true" :model="constSearchForm" class="demo-form-inline" size="small">
          <el-form-item label="名称">
            <el-input v-model="constSearchForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="键">
            <el-input v-model="constSearchForm.key" placeholder="请输入Key"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="searchForm">查询</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="initSearchForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row class="operate-btn-group" type="flex" justify="start">
        <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="add">新增</el-button>
        <el-button type="primary" icon="el-icon-delete" size="small" @click="batchDelete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-delete" size="small" @click="">刷新缓存</el-button>
      </el-row>
      <div class="table-represent">
        <el-table
          class="role-manage-table"
          :data="constList"
          @selection-change="selectDelIds"
          border
          stripe>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="编号"
            width="180">
            <template slot-scope="scope">
              {{(pageInfo.pageNum-1) * pageInfo.pageSize + scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="key"
            label="键">
          </el-table-column>
          <el-table-column
            prop="value"
            label="值">
          </el-table-column>
          <el-table-column
            prop="inUse"
            label="是否启用">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <a type="text" size="small" @click="edit(scope.row)" class="ml10">编辑</a>
              <a type="text" size="small" @click="view(scope.row)" class="ml10">查看</a>
              <a type="text" size="small" @click="curDelete(scope.row.sysConstantsId)" class="ml10 del">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="constList.length !== 0" type="flex" justify="center" class="table-pagination">
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
        <el-form :rules="rules" ref="constForm" :model="constForm" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="constForm.name" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="键" prop="key">
            <el-input v-model="constForm.key" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="值" prop="value">
            <el-input v-model="constForm.value" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="inUse">
            <el-select v-model="constForm.inUse" :disabled="isView">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </common-dialog>
    </el-col>
  </el-row>
</template>

<script>
  import { list, save, edit, deleteAll } from '../../../api/const'
  export default {
    name: 'constConfiguration',
    data() {
      return {
        activeName: 'constManagement',
        loading: false,
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        constSearchForm: {
          name: '',
          key: ''
        },
        selectionIds: [],
        constList: [],
        constForm: {
          name: '',
          key: '',
          value: '',
          inUse: '1'
        },
        rules: {
          value: [
            { required: true, message: '值不能为空', trigger: 'blur' }
          ]
        },
        dialogType: '',
        dialogTitle: { save: '新增常量', edit: '修改常量', view: '查看常量' },
        visible: false
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
    components: {
      commonDialog: () => import('@/components/common-dialog')
    },
    methods: {
      view(item) {
        this.dialogType = 'view'
        this.constForm = {
          name: item.indexCode,
          code: item.code,
          indexCode: '',
          value: item.value
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
        this.constForm = {
          name: item.indexCode,
          code: item.code,
          indexCode: '',
          value: item.value
        }
        this.constForm.sysConstantsId = item.sysConstantsId
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
            message: '请勾选要删除的常量'
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
        this.selectionIds = val.map(item => item.sysConstantsId)
      },
      async loadPrepresentData() {
        this.loadConstItems({ ...this.pageInfo })
      },
      initForm() {
        this.constForm = {
          name: '',
          key: '',
          value: '',
          inUse: '1'
        }
        this.$refs.constForm.clearValidate()
      },
      cancel() {
        this.initForm()
        this.visible = false
      },
      confirm() {
        this.$refs['constForm'].validate((valid) => {
          if (valid) {
            let operMethod = this.dialogType === 'save' ? save : edit
            let param = this.constForm
            operMethod(param).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.dialogType === 'save' ? '新增' : '修改'}参数成功`,
                  type: 'success'
                })
                this.loadConstItems({ ...{ page: this.paging.page, size: this.paging.size } })
                this.visible = false
                this.initForm()
              }
            })
          }
        })
      },
      searchForm() {
        let params = { ...{ page: 1, size: this.paging.size }, ...this.constSearchForm }
        this.loadConstItems(params)
      },
      loadConstItems(params) {
        if (this.$loadingHelper.startLoading('.constConfiguration-manage')) {
          list(params).then(res => {
            if (res.flag) {
              this.loading = false
              this.constList = res.data
              this.pageInfo = res.page
            }
          })
        }
      },
      handleSizeChange(val) {
        let params = { ...{ page: this.paging.page, size: val }, ...this.constSearchForm }
        this.loadConstItems(params)
      },
      handleCurrentChange(val) {
        let params = { ...{ page: val, size: this.paging.size }, ...this.constSearchForm }
        this.loadConstItems(params)
      },
      initSearchForm() {
        this.constSearchForm = {
          name: '',
          key: ''
        }
      }
    }
  }
</script>

<style scoped lang='scss'>
  .constConfiguration-manage {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    .resource-represent {
      padding: 0px 10px;
      .operate-btn-group {
        margin-bottom: 15px;
      }
      a{
        cursor: pointer;
        color: #20a0ff ;
      }
    }
  }
</style>
