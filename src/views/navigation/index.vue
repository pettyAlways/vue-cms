<template>
  <div class='nav' :class="{'nav-fix': fixed}">
    <ul class="nav-panel w1200">
      <li class="nav-panel__item" @click="goNav(item.link)" :class="{'active': item.show, 'nav-panel--noactive': !item.show}" v-for="item in navInfo" :key="item.name" >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {
        fixed: false,
        navInfo: [
          {
            name: '首页',
            link: '/index',
            show: false
          },
          {
            name: '知识库',
            link: '/knowledge',
            index: '常规基酒',
            show: false
          }
        ]
      }
    },
    watch: {
      $route(to) {
        this.showNav(to.path)
      }
    },
    mounted() {
      this.showNav(this.$route.path)
      window.addEventListener('scroll', this.navHandler)
    },
    methods: {
      showNav(path) {
        // 刷新页面时会在末尾增加一个/
        if (/\/$/.test(path)) {
          path = path.substring(0, path.length - 1)
        }
        let item = this.navInfo.filter(item => item.link === path)
        for (let nav of this.navInfo) {
          nav.show = false
        }
        if (item && item.length) {
          item[0].show = true
        }
      },
      navHandler() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 150) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      },
      goNav(link) {
        this.$router.push({ path: link })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .active {
    background: white;
    color: #333 !important;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.15);
    text-shadow: 1px 1px white !important;
    background: linear-gradient(to bottom, #e0e0e0, #fff 6px);
  }
  .nav {
    position: relative;
    height: 45px;
    width: 100%;
    background-color: #7b0002;
    background-image: linear-gradient(to bottom, #E03636, #FF534D);
    font-weight: 800;
    font: 16px/1.5 微软雅黑,Arial;
    color: #fff;
    z-index: 3;
    &-fix {
      position: fixed;
      top: 0px;
      z-index: 9999;
    }
    &-panel {
      display: flex;
      flex-direction: row;
      height: 100%;
      list-style: none;
      padding: 0px;
      &__item {
        position: relative;
        width: 120px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        &--noactive {
          color: #fff;
          text-shadow: 1px 1px #000;
        }
      }
    }
  }
</style>
