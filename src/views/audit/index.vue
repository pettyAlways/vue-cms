<template>
  <div class="audit-panel">
    <el-tabs v-model="activeName" @tab-click="switchTab">
      <el-tab-pane v-if="power['加入知识库']" label="加入知识库" name="joinKnowledge">
        <join-knowledge ref="joinKnowledge"></join-knowledge>
      </el-tab-pane>
      <el-tab-pane v-if="power['作者申请']" label="申请作者" name="beAuthor">
        <be-author ref="beAuthor"></be-author>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'auditPanel',
    data() {
      return {
        activeName: '',
        power: []
      }
    },
    components: {
      beAuthor: () => import('./components/be-author'),
      joinKnowledge: () => import('./components/join-knowledge')
    },
    computed: {
      ...mapGetters([
        'pageMenus'
      ])
    },
    watch: {
      pageMenus: {
        handler(newMenus) {
          this.power = newMenus['/platform/blog/center/audit']
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    // mounted 是在dom元素渲染期间执行，这样可能导致activeName赋值以后不去执行activeName下组件的mounted数据初始化
    created() {
      let active = this.$route.params.activeName || 'joinKnowledge'
      if (active) {
        this.activeName = active
      }
    },
    methods: {
      switchTab() {
        this.$refs[this.activeName].init()
      }
    }
  }
</script>

<style scoped>

</style>
