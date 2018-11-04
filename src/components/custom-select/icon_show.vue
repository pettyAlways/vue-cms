<template>
  <div class="custom_icon_show">
    <el-select v-model="selectVal" placeholder="请选择" filterable>
      <el-option
        style="width: 100%"
        v-for="(icon, index) in svgIconList"
        :key="index"
        :label="icon"
        :value="icon">
        <div style="display: flex; flex-direction: row; justify-content:space-between; align-items: center">
          <icon-svg :iconClass="icon"></icon-svg>
          <span>{{ icon }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'icon_show',
    data() {
      return {
        selectVal: ''
      }
    },
    computed: {
      ...mapGetters([
        'svgIconList'
      ])
    },
    methods: {
      getSelectVal() {
        return this.selectVal
      }
    }
  }
</script>

<style scoped lang="scss">
 .custom_icon_show {
   custom_input {
     width: 100%;
   }
   .explain {
     float: right;
     color: #8492a6;
     font-size: 13px
   }
 }
</style>
