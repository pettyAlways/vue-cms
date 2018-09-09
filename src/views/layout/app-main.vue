<template>
  <div class="main-app">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app-main',
    data() {
      return {
        a: '测试'
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-app {
    padding: 15px;
  }
</style>
