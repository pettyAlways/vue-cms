<template>
  <el-row class="join-knowledge-manage">
    <el-col :span="24" class="resource-represent">
      <div class="search-form">
        <el-form :inline="true" :model="authorSearchForm" class="demo-form-inline" size="small">
          <el-form-item label="处理结果">
            <el-select v-model="authorSearchForm.handleResult" placeholder="请选择">
              <el-option label="审核中" value="0"></el-option>
              <el-option label="通过" value="1"></el-option>
              <el-option label="不通过" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="searchForm">查询</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="authorSearchForm.handleResult = '0'">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-represent">
        <el-table
          class="role-manage-table"
          :data="auditList"
          stripe>
          <el-table-column type="index" label="编号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{((paging.page-1) * paging.size + scope.$index+1)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyUserName"
            label="申请人">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="申请理由"
            :show-overflow-tooltip="true"
            width="180">
          </el-table-column>
          <el-table-column
            prop="handleUserName"
            label="处理人">
          </el-table-column>
          <el-table-column
            prop="handleResultName"
            label="处理结果">
          </el-table-column>
          <el-table-column
            prop="rejectReason"
            :show-overflow-tooltip="true"
            label="拒绝理由">
          </el-table-column>
          <el-table-column
            prop="handleTime"
            label="处理时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <el-button v-if="noAuthShowBtn || power['加入审核通过']" type="text" @click="pass(scope.row)">通过</el-button>
              <el-button v-if="noAuthShowBtn || power['加入审核不通过']" type="text" @click="noPass(scope.row)">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="auditList.length !== 0" type="flex" justify="center" class="table-pagination">
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
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { joinKnowledgeList, joinKnowledgePass, joinKnowledgeNoPass } from '../../../../api/audit'

  export default {
    name: 'joinKnowledge',
    data() {
      return {
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        authorSearchForm: {
          handleResult: '0'
        },
        auditList: [],
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
          this.power = newMenus['/platform/blog/center/audit']
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
      init() {
        let params = { handleResult: this.authorSearchForm.handleResult, page: this.paging.page, size: this.paging.size }
        this.getAuthorAuditList(params)
      },
      getAuthorAuditList(params) {
        joinKnowledgeList(params).then(res => {
          this.$loadingHelper.stopLoading()
          if (res.flag) {
            this.auditList = res.data
            this.auditList = this.auditList.map(item => {
              this.$set(item, 'handleResultName', ['申请中', '申请通过', '申请不通过'][item.handleResult])
              return item
            })
          }
        })
      },
      pass(item) {
        joinKnowledgePass({ auditId: item.auditId }).then(res => {
          if (res.flag) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.init()
          }
        })
      },
      checkReason(val) {
        if (!val) {
          return '内容不能为空'
        }
      },
      noPass(item) {
        this.$prompt('审核不通过理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: this.checkReason
        }).then(({ value }) => {
          joinKnowledgeNoPass({ auditId: item.auditId, reason: value }).then(res => {
            if (res.flag) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.init()
            }
          })
        })
      },
      searchForm() {
        let params = { ...{ page: 1, size: this.paging.size }, ...this.authorSearchForm }
        this.getAuthorAuditList(params)
      },
      handleSizeChange(val) {
        this.paging.size = val
        let params = { ...{ page: this.paging.page, size: this.paging.size }, ...this.authorSearchForm }
        this.getAuthorAuditList(params)
      },
      handleCurrentChange(val) {
        this.paging.page = val
        let params = { ...{ page: this.paging.page, size: this.paging.size }, ...this.authorSearchForm }
        this.getAuthorAuditList(params)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .join-knowledge-manage {
    padding: 15px 10px;
    background-color: white;
    .resource-represent {
      .search-form {
        margin-bottom: 15px;
      }
      .table-represent {
      }

    }
  }
</style>
