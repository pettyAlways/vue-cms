<template>
  <div class="tabs-container">
    <div class="tabs-container__sidebarSwitch">
      <icon-svg :iconClass="switchIcon" @click.native="switchSidebar"></icon-svg>
    </div>
    <router-link class="tags-view-item" :class="isActive(tag) ? 'active' : '' "
                 v-for="(tag, index) in tabViews[curConfigure]" :to="tag.path" :key="index">
      <el-tag
        closable
        :disable-transitions="false"
        @close.prevent.stop="handleClose(tag)">
        {{tag.tagName}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import iconSvg from '@/components/icon-svg'
  export default {
    computed: {
      ...mapGetters([
        'tabViews',
        'curActive',
        'curConfigure',
        'isCollapse'
      ]),
      switchIcon() {
        return this.isCollapse ? 'switch-right' : 'switch-left'
      }
    },
    components: {
      iconSvg
    },
    methods: {
      ...mapActions([
        'addVisitedTabsView',
        'delVisitedTabsView',
        'collapseMenu'
      ]),
      ...mapMutations(['ACTIVE_TAG']),
      isActive(route) {
        return route.path === this.curActive[this.curConfigure]
      },
      handleClose(tag) {
        this.delVisitedTabsView({menuSwitch: this.curConfigure, route: tag}).then(tags => {
          let routePath = {}
          let distPath
          routePath['path'] = this.curActive[this.curConfigure]
          if (this.isActive(tag)) {
            const lastTag = tags[this.curConfigure].slice(-1)[0]
            if (lastTag) {
              routePath['path'] = lastTag.path
              distPath = lastTag.path
              this.$router.push(lastTag.path)
            } else {
              routePath['path'] = ''
              distPath = '/home/homePage'
            }
          }
          routePath['menuSwitch'] = this.curConfigure
          this.ACTIVE_TAG(routePath)
          this.$router.push(distPath)
        })
      },
      switchSidebar() {
        this.collapseMenu(!this.isCollapse)
      }
    }
  }
</script>

<style scoped lang="scss">
  .tabs-container {
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #dfdfdf;
    z-index: 1999;
    .tabs-container__sidebarSwitch {
      margin-left: 5px;
      margin-right: 6px;
    }
    .tags-view-item {
      .el-tag {
        margin: 0 3px;
        &:first-child {
          margin-left: 0;
        }
      }
      &.active {
        .el-tag {
          background-color: #00b4aa;
          color: #fff;
          /deep/ .el-icon-close {
            color: #fff;
          }
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
  }
</style>
