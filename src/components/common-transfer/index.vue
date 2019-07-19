<template>
  <div class="common-transfer">
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入角色名"
      :titles="titles"
      v-model="chooseRole"
      :data="roleList">
    </el-transfer>
  </div>
</template>

<script>
  import { listAll } from '../../api/role'
  import { acquireRoles } from '../../api/knowledge'
  export default {
    name: 'my-transfer',
    props: {
      titles: Array
    },
    data() {
      return {
        roleList: [],
        chooseRole: []
      }
    },
    methods: {
      async loadRoleInfomation(userId) {
        let res = await acquireRoles({ id: userId })
        if (res.flag) {
          this.chooseRole = res.data
          this.loadRoleList()
        }
      },
      // 提供清除选中内容接口
      clearTransfer() {
        this.chooseRole = []
      },
      // 提供获取选中内容接口
      acquireChoooseRole() {
        return this.chooseRole
      },
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      },
      loadRoleList() {
        listAll().then(res => {
          if (res.flag) {
            res.data = res.data || []
            this.roleList = res.data.map(item => {
              return {
                label: item.roleName,
                key: item.id
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang='scss'>
  .common-transfer {
    /deep/ .el-transfer-panel__filter .el-input__inner {
      border-radius: 0px;
    }
    /deep/ .el-transfer {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      .el-transfer-panel {
        width: 100%;
        .el-transfer-panel__empty {
          text-align: center;
        }
      }
    }
  }
</style>
