<template>
  <el-row class="configuration-manage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="常量配置" name="constManagement">
        <const-configuration></const-configuration>
      </el-tab-pane>
      <!--<el-tab-pane label="枚举配置" name="second">-->
        <!--<enumeration-manage></enumeration-manage>-->
      <!--</el-tab-pane>-->
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
      constConfiguration: () => import('./constConfiguration'),
      enumerationManage: () => import('./enumerationManage')
    }
  }
</script>

<style scoped lang='scss'>
</style>
