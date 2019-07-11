<template>
  <div class="aside-panel">
    <ul>
      <li v-for="(item, index) in navResource" :key="index" @click="clickHandler(item.path)" :class="{ activeMenu: item.path == curNav }">
        <icon-svg :iconClass="item.icon"></icon-svg>
        <a>{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'asideNav',
    mounted() {
      // 解决刷新时当前菜单显示
      this.switchMenu(this.retriveRealCurNav(this.$route.path))
    },
    computed: {
      ...mapGetters([
        'permissions',
        'curNav',
        'defaultPage'
      ]),
      navResource() {
        let navResource = this.permissions['navigation'].children || []
        return navResource
      }
    },
    methods: {
      ...mapActions([
        'switchMenu'
      ]),
      // 点击切换菜单是当前菜单显示
      clickHandler(curNav) {
        this.switchMenu(curNav)
        this.$router.push({ path: curNav })
      },
      retriveRealCurNav(path) {
        if (path === '/index') {
          path = this.defaultPage
        }
        return path
      }
    },
    watch: {
      // 解决按历史地址回退时的当前菜单显示
      $route (to, from) {
        this.switchMenu(this.retriveRealCurNav(to.path))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .aside-panel {
    ul {
      list-style: none;
      padding: 0px;
      li {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 16px;
        color: #595959;
        i {
          margin-right: 10px;
        }
        &:hover {
          background-color: gainsboro;
        }
      }
      .activeMenu {
        color: #262626;
        font-weight: 700;
      }
    }
  }
</style>
