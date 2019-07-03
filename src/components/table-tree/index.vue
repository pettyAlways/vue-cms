<template>
  <div class="resource-tree-panel">
    <el-table :data="datas" border style="width: 100%" :row-key="getRowKey" :expand-row-keys="expands"
              :tree-props="{children: 'children'}">
      <el-table-column v-for="(column, index) in columns" v-if="index == 0" width="200" align="left" :label="column.text" :key="column.name">
        <template slot-scope="scope" >
          <span v-if="scope.row.type==='page'">
            <el-checkbox @change="checked => selectDeal(checked, scope.row)" v-model="scope.row.isSelect"></el-checkbox>
          </span>
          <span class="ms-tree-space"></span>
          {{scope.row[column.name]}}
        </template>
      </el-table-column>
      <el-table-column v-else :label="column.text">
        <template slot-scope="scope">
          <div class="btn-box">
            <span class="btn-list" v-if="scope.row.children" >
              <el-checkbox @change="checked => selectDeal(checked, scope.row)" v-model="scope.row.isSelect"></el-checkbox>
            </span>
            <span class="btn-list" v-if="scope.row.buttonList" v-for="item in scope.row.buttonList">
              <el-checkbox @change="checked => selectDeal(checked, item)" v-model="item.isSelect">{{item.name}}</el-checkbox>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: 'powerlist',
    props: {
      datas: Array
    },
    data() {
      return {
        expands: [],
        columns: [
          {
            text: '菜单列表',
            name: 'name'
          }, {
            text: '功能权限',
            name: 'buttons'
          }
        ]
      }
    },
    mounted() {
      if (this.datas) {
        this.expands.push(this.datas[0].id)
      }
    },
    methods: {
      getRowKey(row) {
        console.log(row.id)
        return row.id
      },
      acquireResource() {
        return this.selectedResource(this.datas[0].children)
      },
      selectedResource(resources) {
        let plain = []
        // 空指针转换
        resources = resources || []
        // 递归将树结构数据转换成扁平类型数据
        resources.forEach(item => {
          if (item.isSelect) {
            plain.push(item.id)
            if (item.type === 'page') {
              plain = [...plain, ...this.selectedResource(item.buttonList)]
            } else {
              plain = [...plain, ...this.selectedResource(item.children)]
            }
          }
        })
        return plain
      },
      selectDeal(checked, row) {
        // 本级设置选中状态
        this.$set(row, 'isSelect', checked)
        // 祖先级设置选中状态
        this.ancestorHandle(checked, row)
        // 子孙级设置选中状态
        this.descendantHandle(checked, row)
      },
      // 祖先级处理
      ancestorHandle(checked, row) {
        if (checked && row._parent) {
          this.$set(row._parent, 'isSelect', checked)
          this.ancestorHandle(checked, row._parent)
        }
        if (!checked && row._parent) {
          let ancestor = row.type === 'button' ? row._parent.buttonList : row._parent.children
          ancestor = ancestor || []
          let filter = ancestor.filter(item => {
            return item.isSelect
          })
          if (!filter.length) {
            this.$set(row._parent, 'isSelect', checked)
          }
          this.ancestorHandle(checked, row._parent)
        }
      },
      // 子孙级处理
      descendantHandle(checked, row) {
        if (row.children && row.children.length > 0) {
          row.children.forEach(item => {
            this.$set(item, 'isSelect', checked)
            this.descendantHandle(checked, item)
          })
        }
        if (row.buttonList && row.buttonList.length > 0) {
          row.buttonList.forEach(item => {
            this.$set(item, 'isSelect', checked)
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .resource-tree-panel {
    .btn-box{
      padding: 10px 0;
    }
    .btn-list{
      padding:0 5px;
    }
    .ms-tree-space{
      position: relative;
      top: 1px;
      display: inline-block;
      font-family: 'Glyphicons Halflings';
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      width: 10px;
      height: 14px;
    }
  }
</style>
