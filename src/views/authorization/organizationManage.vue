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
  import { loadOrgTree, list } from '../../api/organization'
  export default {
    name: 'organizationManage',
    data() {
      return {
        currentPage4: 4,
        formInline: {
          user: '',
          region: ''
        },
        orgList: [],
        filterText: '',
        orgTree: [],
        curNode: '',
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
    mounted() {
      loadOrgTree().then(res => {
        if (res.data.flag) {
          this.orgTree = [res.data.datas]
        }
      })
    },
    methods: {
      nodeClick(item) {
        this.curNode = item
        list({ parentId: item.id }).then(res => {
          if (res.data.flag) {
            this.orgList = res.data.datas.childrenEntityList
            this.orgList.map(org => {
              org.parentName = res.data.datas.label
            })
          }
        })
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
  .organization-manage {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    .resource-represent {
      padding: 0px 10px;
    }
  }
</style>
