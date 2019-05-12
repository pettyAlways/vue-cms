<template>
  <div class='nav' :class="{'nav-fix': fixed}">
    <ul class="nav-panel w1200">
      <li class="nav-panel__item" :class="{'active': item.show, 'nav-panel--noactive': !item.show}" v-for="item in navInfo" :key="item.name" @click="navClickHandler(item)" >
        <router-link :to="{path: item.link, query: {name: item.index}}">{{item.name}}</router-link>
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
            name: '站点首页',
            link: '/index',
            show: true
          },
          {
            name: '知识库',
            link: '/knowledge',
            index: '常规基酒',
            show: false
          },
          {
            name: '文章',
            link: '/brand',
            index: '贴牌政策',
            show: false
          },
          {
            name: '书籍',
            link: '/custom',
            index: '企业定制',
            show: false
          },
          {
            name: '音乐',
            link: '/news',
            index: '公司新闻',
            show: false
          },
          {
            name: '计划',
            link: '/relative',
            index: '首酒简介',
            show: false
          },
          {
            name: '视频',
            link: '/contact',
            show: false
          },
          {
            name: '关于我',
            link: '/contact',
            show: false
          }
        ]
      }
    },
    mounted() {
      window.addEventListener('scroll', this.navHandler)
    },
    methods: {
      navHandler() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 150) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      },
      navClickHandler(item) {
        for (let nav of this.navInfo) {
          nav.show = false
        }
        item.show = true
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
