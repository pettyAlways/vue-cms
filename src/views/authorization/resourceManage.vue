<template>
  <el-row class="resource-manage">
    <el-col :span="5" class="resource-tree">
      <el-input
        placeholder="输入关键字进行过滤"
        size="small"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="data3"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="nodeClick"
        :filter-node-method="filterNode"
        ref="tree2">
      </el-tree>
    </el-col>
    <el-col :span="19" class="resource-represent">
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
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'resourceManage',
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
        }],
        filterText: '',
        data3: [{
          id: 1,
          label: '一级 121',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
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

    methods: {
      nodeClick(item, node, self) {
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
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
  .resource-manage {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    .resource-represent {
      padding: 0px 10px;
    }
  }
</style>
