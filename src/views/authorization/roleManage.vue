<template>
  <div class="role-manage">
    <div class="search-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-delete" size="small">查询</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="operate-btn-group" type="flex" justify="start">
      <el-button-group>
        <el-button type="primary" icon="el-icon-circle-plus" size="small">新增</el-button>
        <el-button type="primary" icon="el-icon-delete" size="small">批量删除</el-button>
      </el-button-group>
    </el-row>
    <div class="table-represent">
      <el-table
        class="role-manage-table"
        :data="tableData"
        border
        stripe>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="密码">
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
      <el-row type="flex" justify="center" class="table-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          background>
        </el-pagination>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'userManage',
    data() {
      return {
        currentPage4: 4,
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .role-manage {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    .role-manage-table {
      /deep/ .el-table__fixed-right {
        height: 100% !important;
      }
    }
    .search-form {
      /deep/ .el-form-item {
        margin-bottom: 0px !important;
      }
    }
    .operate-btn-group {
      margin: 10px 0px;
    }
    .table-represent {
      .table-pagination {
        margin: 10px 0;
      }
    }
  }
</style>
