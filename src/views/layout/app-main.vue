<template>
  <div class="main-container">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cacheViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'app-main',
    data() {
      return {
        a: '测试'
      }
    },
    computed: {
      ...mapGetters([
        'tabViews',
        'curConfigure'
      ]),
      cacheViews() {
        if (this.tabViews[this.curConfigure]) {
          return this.tabViews[this.curConfigure].map(item => {
            return item.name
          })
        }
        return []
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-container {
    position: relative;
    top: 40px;
    height: calc(100% - 40px);
    width: 100%;
    padding: 15px;
  }
</style>
