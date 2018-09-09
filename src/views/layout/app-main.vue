<template>
  <div class="main-app">
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
        return this.tabViews[this.curConfigure].map(item => {
          return item.name
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-app {
    padding: 15px;
  }
</style>
