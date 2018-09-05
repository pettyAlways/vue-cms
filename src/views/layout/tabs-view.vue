<template>
  <div class="tabs-container">
    <router-link class="tags-view-item" :class="isActive(tag) ? 'active' : '' " v-for="(tag, index) in tabViews[curConfigure]" :to="tag.path" :key="index">
      <el-tag
        closable
        :disable-transitions="false"
        @close.prevent.stop="handleClose(tag)">
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {}
    },
    created() {
      this.addTabsView()
    },
    computed: {
      ...mapGetters([
        'tabViews',
        'curConfigure'
      ])
    },
    methods: {
      ...mapActions([
        'addVisitedTabsView',
        'delVisitedTabsView'
      ]),
      addTabsView() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        let payload = {menuSwitch: this.curConfigure, route: route}
        this.addVisitedTabsView(payload)
      },
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive(route) {
        return route.path === this.$route.path && route.name === this.$route.name
      },
      handleClose(tag) {
        this.delVisitedTabsView({menuSwitch: this.curConfigure, route: tag}).then((tags) => {
          if (this.isActive(tag)) {
            const lastTag = tags.slice(-1)[0]
            if (lastTag) {
              console.info(1)
              this.$router.push(lastTag.path)
            } else {
              console.info(2)
              this.$router.push('/')
            }
          }
        })
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
  .tabs-container {
    height: 40px;
    padding: 5px;
    border-bottom: 1px solid #dfdfdf;
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
