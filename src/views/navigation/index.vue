<template>
  <div class='nav' :class="{'nav-fix': fixed}">
    <ul class="nav-panel w1200">
      <li class="nav-panel__item" v-for="item in navInfo" :key="item.name" @mouseenter="item.show=true" @mouseleave="item.show=false">
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
            link: '',
            show: false
          },
          {
            name: '基酒分类',
            link: '/category',
            index: '常规基酒',
            show: false
          },
          {
            name: '首酒贴牌',
            link: '/brand',
            index: '贴牌政策',
            show: false
          },
          {
            name: '首酒定制',
            link: '',
            show: false
          },
          {
            name: '行业资讯',
            link: '',
            show: false
          },
          {
            name: '企业相关',
            link: '',
            show: false
          },
          {
            name: '联系我们',
            link: '',
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
        if (scrollTop > 160) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav {
    height: 40px;
    width: 100%;
    background: #7b0002;
    font: 16px/1.5 微软雅黑,Arial;
    font-weight: 700;
    color: #fff;
    z-index: 3;
    &-fix {
      position: fixed;
      top: 0px;
    }
    &-panel {
      display: flex;
      flex-direction: row;
      list-style: none;
      padding: 0px;
      &__item {
        position: relative;
        width: 120px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }
  }
</style>
