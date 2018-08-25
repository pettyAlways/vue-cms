<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <div class="sys-sidebar" :is="curConfigure"></div>
    <div class="main-container">
      <tabs-view></tabs-view>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
  import Navbar from './navbar'
  import TabsView from './tabs-view'
  import AppMain from './app-main'
  import { mapGetters } from 'vuex'
  import loadComponents from '../../utils/loadComponents'
  export default {
    computed: {
      ...mapGetters([
        'curConfigure'
      ])
    },
    components: {
      Navbar,
      TabsView,
      AppMain,
      ...loadComponents
    }
  }
</script>
<style scoped lang="scss">
  .app-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    .main-container {
      padding-left: 201px;
      padding-top: 61px;
    }
  }
</style>
