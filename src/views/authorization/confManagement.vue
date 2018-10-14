<template>
  <el-row class="configuration-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="字典配置" name="constManagement">
        <dictionary-manage></dictionary-manage>
      </el-tab-pane>
      <el-tab-pane label="枚举配置" name="second">
        <enumeration-manage></enumeration-manage>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
  export default {
    name: 'configurationManage',
    data() {
      return {
        activeName: 'constManagement'

      }
    },
    components: {
      dictionaryManage: () => import('./dictionaryManage'),
      enumerationManage: () => import('./enumerationManage')
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
      handleClick() {
      }
    }
  }
</script>

<style scoped lang='scss'>
</style>
