<template>
  <el-row class="online-user-manage">
    <el-col :span="24" class="resource-represent">
      <div class="search-form">
        <el-form :inline="true" :model="onlineSearchForm" class="demo-form-inline" size="small">
          <el-form-item label="账号">
            <el-input v-model="onlineSearchForm.userAccount" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="onlineSearchForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="searchForm">查询</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="initSearchForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-represent" style="margin-top: 15px">
        <el-table
          class="role-manage-table"
          :data="onlineList"
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
            prop="userName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="userAccount"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="所属角色">
          </el-table-column>
          <el-table-column
            prop="loginTime"
            label="上次登录">
          </el-table-column>
          <el-table-column
            prop="departName"
            label="所属部门">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <a v-if="(noAuthShowBtn || power['用户踢出']) && currentUser.id !== scope.row.userId" type="text" size="small" @click="kickout(scope.row)">踢出</a>
              <a v-if="(noAuthShowBtn || power['用户禁用']) && currentUser.id !== scope.row.userId" type="text" size="small" @click="invalidUser(scope.row)">禁用</a>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="onlineList.length !== 0" type="flex" justify="center" class="table-pagination">
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
  import { list, kickout, invalidUser } from '../../api/online'
  import { mapGetters } from 'vuex'
  export default {
    name: 'onLineUserManage',
    data() {
      return {
        activeName: 'constManagement',
        loading: false,
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        power: {},
        onlineSearchForm: {
          userAccount: '',
          userName: ''
        },
        onlineList: []
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
        'sysParam',
        'currentUser'
      ]),
      noAuthShowBtn() {
        return this.sysParam['no_auth_represent'] === 'represent'
      }
    },
    mounted() {
      this.loadPrepresentData()
    },
    methods: {
      async kickout(row) {
        let res = await kickout({ userId: row.userId })
        if (res.flag) {
          this.$message({
            type: 'success',
            message: `已踢出用户[${row.userName}]`
          })
          this.paging.page = 1
          this.loadPrepresentData()
        }
      },
      async invalidUser(row) {
        let res = await invalidUser({ userId: row.userId })
        if (res.flag) {
          this.$message({
            type: 'success',
            message: `已禁用用户[${row.userName}]`
          })
          this.paging.page = 1
          this.loadPrepresentData()
        }
      },
      async loadPrepresentData() {
        this.loadOnlineUser(this.paging)
      },
      searchForm() {
        let params = { ...{ page: 1, size: this.paging.size }, ...this.onlineSearchForm }
        this.loadOnlineUser(params)
      },
      loadOnlineUser(params) {
        if (this.$loadingHelper.startLoading('.online-user-manage')) {
          list(params).then(res => {
            this.$loadingHelper.stopLoading()
            if (res.flag) {
              this.onlineList = res.data
              this.paging.total = res.counts
            }
          })
        }
      },
      handleSizeChange(val) {
        let params = { ...{ page: this.paging.page, size: val }, ...this.onlineSearchForm }
        this.loadOnlineUser(params)
      },
      handleCurrentChange(val) {
        let params = { ...{ page: val, size: this.paging.size }, ...this.onlineSearchForm }
        this.loadOnlineUser(params)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .online-user-manage {
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
