<template>
  <div class='nav' :class="{'nav-fix': fixed}">
    <ul class="nav-panel">
      <li class="nav-panel__item" v-for="item in navInfo" :key="item.name" @mouseenter="item.show=true" @mouseleave="item.show=false">
        <a :href="item.link">{{item.name}}</a>
        <ul class="nav-panel__item__second-panel" v-if="item.second&&item.show">
          <li class="nav-panel__item__second-panel__item" v-for="(sItem, index) in item.second" :key="index">
            <a>{{sItem.name}}</a>
          </li>
        </ul>
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
            name: '怀庄首页',
            link: '',
            show: false,
            second: []
          },
          {
            name: '走进怀庄',
            link: '',
            show: false,
            second: [
              {name: '怀庄简介', link: ''},
              {name: '董事长致辞', link: ''},
              {name: '企业管理机构', link: ''},
              {name: '领导关怀', link: ''},
              {name: '企业文化', link: ''},
              {name: '荣誉资质', link: ''},
              {name: '怀庄刊物', link: ''},
              {name: '怀庄办事处', link: ''},
              {name: '品牌故事', link: ''},
              {name: '怀庄工艺', link: ''}
            ]
          },
          {
            name: '怀庄酒韵',
            link: '',
            show: false,
            second: [
              {name: '私人订制', link: ''},
              {name: '怀庄历程', link: ''},
              {name: '企业歌曲', link: ''},
              {name: '书画展示', link: ''},
              {name: '怀庄赋', link: ''}
            ]
          },
          {
            name: '怀庄出品',
            link: '',
            show: false,
            second: [
              {name: '怀庄系列', link: ''},
              {name: '人民公社系列', link: ''},
              {name: '政酒系列', link: ''},
              {name: '精品茅系列', link: ''},
              {name: '典酱台系列', link: ''},
              {name: '红色组歌系列', link: ''},
              {name: '国酱酒系列', link: ''},
              {name: '怀庄秘酿系列', link: ''},
              {name: '唐君酒系列', link: ''},
              {name: '怀庄烧坊系列', link: ''},
              {name: '老怀庄系列', link: ''},
              {name: '怀庄风韵系列', link: ''},
              {name: '中华巨龙酒系列', link: ''},
              {name: '怀庄1983系列', link: ''},
              {name: '贵久液系列', link: ''},
              {name: '怀庄秘酿', link: ''},
              {name: '存台系列', link: ''},
              {name: '金怀庄', link: ''},
              {name: '怀庄（庄魂）酒', link: ''},
              {name: '醉醇风酒', link: ''}
            ]
          },
          {
            name: '新闻资讯',
            link: '',
            show: false,
            second: [
              {name: '公告公示', link: ''},
              {name: '怀庄新闻', link: ''},
              {name: '媒体聚焦', link: ''},
              {name: '行业动态', link: ''},
              {name: '招聘公告', link: ''},
              {name: '焦点视频', link: ''}
            ]
          },
          {
            name: '加盟怀庄',
            link: '',
            show: false,
            second: [
              {name: '加盟政策', link: ''},
              {name: '加盟优势', link: ''},
              {name: '加盟模式', link: ''},
              {name: '加盟条件', link: ''},
              {name: '加盟流程', link: ''}
            ]
          },
          {
            name: '怀庄商城',
            link: '',
            show: false,
            second: []
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
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 55px;
    background: #c2000f;
    font-size: 14px;
    z-index: 3;
    &-fix {
      position: fixed;
      top: 0px;
    }
    &-panel {
      display: flex;
      list-style: none;
      width: 960px;
      padding: 0px;
      &__item {
        position: relative;
        height: 100%;
        width: 110px;
        &:not(:last-of-type) {
          background: url(./asserts/line.jpg) no-repeat right;
        }
        color: #fefefe;
        text-align: center;
        line-height: 55px;
        &__second-panel {
          position: absolute;
          left: 0px;
          top: 55px;
          z-index: 9999;
          padding: 0px;
          background: none rgba(143, 0, 11, 0.8);
          list-style: none;
          &__item {
            height: 30px;
            line-height: 30px;
            width: 110px;
            &:hover {
              background: #700000;
            }
          }
        }
      }
    }
  }
</style>
