<template>
  <div class="common-transfer">
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      :titles="['待选角色', '已选角色']"
      v-model="value2"
      :data="data2">
    </el-transfer>
  </div>
</template>

<script>
  export default {
    name: 'my-transfer',
    data() {
      const generateData2 = _ => {
        const data = []
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          })
        })
        return data
      }
      return {
        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1
        }
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
      }
    }
  }
</style>
