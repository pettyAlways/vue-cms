<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <template v-if="curConfigure !== 'HomePage'">
      <div class="sys-sidebar" :is="curConfigure"></div>
      <div class="main-container">
        <tabs-view></tabs-view>
        <app-main></app-main>
      </div>
    </template>
    <div class="home-container" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import Navbar from './navbar'
  import TabsView from './tabs-view'
  import AppMain from './app-main'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import loadComponents from '../../utils/loadComponents'
  export default {
    computed: {
      ...mapGetters([
        'curConfigure',
        'curActive',
        'curConfigure'
      ])
    },
    components: {
      Navbar,
      TabsView,
      AppMain,
      ...loadComponents
    },
    methods: {
      ...mapActions([
        'addVisitedTabsView'
      ]),
      ...mapMutations(['ACTIVE_TAG']),
      addTabsView() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        let payload = {menuSwitch: this.curConfigure, route: route}
        this.addVisitedTabsView(payload)
        this.ACTIVE_TAG({menuSwitch: this.curConfigure, path: route.path})
      },
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      }
    },
    watch: {
      $route() {
        this.addTabsView()
      }
    }
  }
</script>
<style scoped lang="scss">
  .app-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    .main-container {
      height: 100%;
      padding-left: 201px;
      padding-top: 61px;
    }
    .home-container {
      padding-top: 70px;
    }
  }
</style>
