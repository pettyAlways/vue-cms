<template>
  <div class="resource-tree-panel">
    <el-table :row-style="showTr" :data="resources" border style="width: 100%">
      <el-table-column v-for="(column, index) in columns" v-if="index == 0" width="200" align="left" :label="column.text" :key="column.name">
        <template slot-scope="scope" >
          <span v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
          <span v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)" style="border:0;background:transparent;outline:none;" class="button is-outlined is-primary is-small">
            <i v-if="!scope.row._expanded" class="el-icon-caret-right"  aria-hidden="true"></i>
            <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
          </span>
          <span v-else-if="index===0 && scope.row._level==0" class="ms-tree-space"></span>
          <span v-else><el-checkbox @change="checked => selectDeal(checked, scope.row)" v-model="scope.row.isSelect"></el-checkbox></span>
          {{scope.row[column.name]}}
        </template>
      </el-table-column>
      <el-table-column v-else :label="column.text">
        <template slot-scope="scope">
          <div class="btn-box">
            <span class="btn-list" v-if="scope.row.children" ><el-checkbox @change="checked => selectDeal(checked, scope.row)" v-model="scope.row.isSelect"></el-checkbox></span>
            <span class="btn-list" v-if="scope.row.buttonList" v-for="item in scope.row.buttonList"><el-checkbox @change="checked => selectDeal(checked, item)" v-model="item.isSelect">{{item.name}}</el-checkbox></span>
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
        temp: [],
        columns: [
          {
            text: '菜单列表',
            name: 'name'
          }, {
            text: '功能权限',
            name: 'buttons'
          }
        ],
        defaultExpandAll: false
      }
    },
    computed: {
      resources() {
        let data = this.treeToArray(this.datas, null, null, this.defaultExpandAll)
        return data
      }
    },
    methods: {
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
      treeToArray(data, parent, level, expandedAll) {
        let tmp = []
        data.forEach(record => {
          if (record._expanded === undefined) {
            let expanded = parent ? expandedAll : true
            this.$set(record, '_expanded', expanded)
          }
          if (parent) {
            this.$set(record, '_parent', parent)
          }
          let _level = 0
          if (level !== undefined && level !== null) {
            _level = level + 1
          }
          this.$set(record, '_level', _level)
          tmp.push(record)
          if (record.children && record.children.length > 0) {
            let children = this.treeToArray(record.children, record, _level, expandedAll)
            tmp = tmp.concat(children)
          }
        })
        return tmp
      },
      showTr(item) {
        let show = (item.row._parent ? (item.row._parent._expanded && item.row._parent._show) : true)
        item.row._show = show
        return show ? '' : 'display:none;'
      },
      toggleIconShow(index, record) {
        if (index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      spaceIconShow(index) {
        if (index === 0) {
          return true
        }
        return false
      },
      toggle(trIndex) {
        let record = this.resources[trIndex]
        record._expanded = !record._expanded
      },
      singleSelect(checked, row) {
        if (checked) {
          this.$set(row, 'isSelect', checked)
        }
        if (row._parent && checked) {
          this.$set(row._parent, 'isSelect', checked)
        }
        if (row._parent._parent) {
          this.singleSelect(checked, row._parent)
        }
      },
      selectDeal(checked, row) {
        // 本级设置选中状态
        this.$set(row, 'isSelect', checked)
        // 组先级设置选中状态
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
      },
      allEmpty(parentPowerCode) {
        let data = this.data
        let parent = null
        data.forEach(item => {
          if (item.powerCode === parentPowerCode) parent = item
        })
        if (!parent) return
        if (parent.buttonList != null && parent.buttonList.length > 0) {
          let isSelect = false
          parent.buttonList.forEach(res => {
            if (res.isSelect) isSelect = true
          })
          this.$set(parent, 'isSelect', isSelect)
        }
        if (parent.powerList != null && parent.powerList.length > 0) {
          let isSelect = false
          parent.powerList.forEach(res => {
            if (res.isSelect) isSelect = true
          })
          this.$set(parent, 'isSelect', isSelect)
        }
        if (!parent.isSelect) this.allEmpty(parent.parentPowerCode)
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
      width: 18px;
      height: 14px;
    }
  }
</style>
