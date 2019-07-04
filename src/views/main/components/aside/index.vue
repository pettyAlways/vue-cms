<template>
  <div class="aside-panel">
    <ul>
      <li v-for="(item, index) in navResource" :key="index">
        <icon-svg :iconClass="item.icon"></icon-svg>
        <router-link :to="{ path: item.path }">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'asideNav',
    computed: {
      ...mapGetters([
        'permissions'
      ]),
      navResource() {
        let navResource = this.permissions['navigation'].children || []
        return navResource
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
        i {
          margin-right: 10px;
        }

      }
    }
  }
</style>
