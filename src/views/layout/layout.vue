<template>
  <div class="cms-container">
    <!-- 采用fixed固定脱离文档流-->
    <navbar></navbar>
    <template v-if="curConfigure !== 'HomePage'">
      <!-- 采用fixed固定脱离文档流-->
      <div :class="[isCollapse ? 'cms-container__sidebar--hide' : '', 'cms-container__sidebar']" :is="curConfigure">
      </div>
      <!-- 使用relative定位从navbar和sidebar位置偏离到中间-->
      <div :class="[isCollapse ? 'cms-container__main--hide' : 'cms-container__main']">
        <tabs-view></tabs-view>
        <app-main></app-main>
      </div>
    </template>
    <div class="cms-container__home" v-else>
      <router-view></router-view>
    </div>
    <web-socket></web-socket>
  </div>
</template>
<script>
  import Navbar from './navbar'
  import TabsView from './tabs-view'
  import AppMain from './app-main'
  import WebSocket from './WebSocket'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import loadComponents from '../../utils/loadComponents'
  export default {
    data() {
      return {
        clientHeight: ''
      }
    },
    mounted() {
      this.clientHeight = document.body.clientHeight - 61
    },
    computed: {
      ...mapGetters([
        'curConfigure',
        'curActive',
        'isCollapse'
      ])
    },
    components: {
      Navbar,
      TabsView,
      AppMain,
      WebSocket,
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
  .cms-container {
    position: relative;
    width: 100%;
    height: 100%;
    .cms-container__home {
      padding-top: 70px;
    }
    .cms-container__sidebar:not(.cms-container__sidebar--hide) {
      position: fixed;
      top: 61px;
      height: 100%;
      width: 200px;
      z-index: 2000;
    }
    .cms-container__sidebar.cms-container__sidebar--hide {
      position: fixed;
      top: 61px;
      height: 100%;
      z-index: 10000;
      /deep/ .el-menu--collapse {
        width: 90px;
      }
      /deep/ .el-menu-vertical {
        height: 100%
      }
      /deep/ .sidebar-menu:not(.secondary_menu) {
          > .sidebar-menu__item  {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: 80px;
            > .el-submenu > .el-submenu__title {
              padding: 0px !important;
              height: 100%;
              width: 100%;
              line-height: 100%;
              .sidebar-menus-bar {
                text-align: center;
                .collapse_menu_title {
                  display: block !important;
                  margin-top: 5px;
                }
                .collapse_icon {
                  width: 2em;
                  height: 2em;
                }
              }
              .el-submenu__icon-arrow {
                display: none !important;
              }
            }
          }
      }
    }
    .cms-container__main {
      position: relative;
      left: 201px;
      top: 61px;
      width: calc(100% - 201px);
      height: calc(100% - 61px);
      background: #3a8ee6;
    }
    .cms-container__main--hide {
      position: relative;
      height: 100%;
      padding-left: 91px;
      padding-top: 61px;
    }
  }
</style>
