<template>
  <el-row class="constConfiguration-manage">
    <el-col :span="24" class="resource-represent">
      <div class="search-form">
        <el-form :inline="true" :model="constSearchForm" class="demo-form-inline" size="small">
          <el-form-item label="名称">
            <el-input v-model="constSearchForm.constName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="键">
            <el-input v-model="constSearchForm.constKey" placeholder="请输入Key"></el-input>
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
      </el-row>
      <div class="table-represent">
        <el-table
          class="role-manage-table"
          :data="constList"
          @selection-change="selectDelIds"
          stripe>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="编号"
            width="55">
            <template slot-scope="scope">
              {{(paging.page-1) * paging.size + scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
            prop="constName"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="constKey"
            label="键">
          </el-table-column>
          <el-table-column
            prop="constValue"
            label="值">
          </el-table-column>
          <el-table-column
            prop="inUseName"
            label="是否启用">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <a type="text" size="small" @click="edit(scope.row)">编辑</a>
              <a type="text" size="small" @click="view(scope.row)">查看</a>
              <a type="text" size="small" @click="curDelete(scope.row.id)">删除</a>
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
          <el-form-item label="名称" prop="constName">
            <el-input v-model="constForm.constName" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="键" prop="constKey">
            <el-input v-model="constForm.constKey" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="值" prop="constValue">
            <el-input v-model="constForm.constValue" :disabled="isView"></el-input>
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
          constName: '',
          constKey: ''
        },
        selectionIds: [],
        constList: [],
        // 常量区分标志，接口都需要带上
        type: '1',
        constForm: {
          constName: '',
          constKey: '',
          constValue: '',
          inUse: '1'
        },
        rules: {
          constKey: [
            { required: true, message: '键不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 30, message: '键不能超过30个字符', trigger: ['blur', 'change'] }
          ],
          constValue: [
            { required: true, message: '值不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 100, message: '值不能超过100个字符', trigger: ['blur', 'change'] }
          ],
          constName: [
            { min: 0, max: 30, message: '值不能超过30个字符', trigger: ['blur', 'change'] }
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
          constName: item.constName,
          constKey: item.constKey,
          constValue: item.constValue,
          inUse: item.inUse
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
          constName: item.constName,
          constKey: item.constKey,
          constValue: item.constValue,
          inUse: item.inUse
        }
        this.constForm.id = item.id
      },
      curDelete(id) {
        let _this = this
        this.$confirm('请确认删除当前数据', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              deleteAll({ ids: id, type: '1' }).then(res => {
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
              deleteAll({ ids: _this.selectionIds.join(','), type: '1' }).then(res => {
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
        this.loadConstItems(this.paging)
      },
      initForm() {
        this.constForm = {
          constName: '',
          constKey: '',
          constValue: '',
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
            let param = { ...this.constForm, type: this.type }
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
          params['type'] = this.type
          list(params).then(res => {
            this.$loadingHelper.stopLoading()
            if (res.flag) {
              this.loading = false
              this.constList = res.data
              this.paging.total = res.counts
              this.constList.forEach(resource => {
                resource.inUseName = ['', '是', '否'][resource.inUse]
              })
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
