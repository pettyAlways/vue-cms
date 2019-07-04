<template>
  <el-card class="header-container" :class="{'fixed': fixed}" body-style="padding: 0px">
    <div class="header-panel w1200">
      <div class="header-panel__logo">
        <icon-svg iconClass="laoying"></icon-svg>
        <span>鹰嘴豆</span>
      </div>
      <div class="header-panel__search">
        <el-input placeholder="请输入内容" size="small" prefix-icon="el-icon-search"></el-input>
      </div>
      <div class="header-panel__nav">
        <ul>
          <li><router-link class="active" :to="{ path: '/index/workbench' }">工作台</router-link></li>
          <li><a>知识库</a></li>
          <li><a>分类</a></li>
          <li><a>审核</a></li>
        </ul>
      </div>
      <div class="header-panel__btn">
        <ul>
          <li>
            <router-link :to="{ path: '/knowledge/new' }"><i class="el-icon-circle-plus-outline"></i></router-link>
          </li>
          <li>
            <a><i class="el-icon-message"></i></a>
          </li>
          <li class="author">
            <img :src="require('./assets/author01.jpg')"/>
          </li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'headerNav',
    data() {
      return {
        fixed: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.navHandler)
    },
    methods: {
      navHandler() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 60) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fixed {
    position: fixed;
    width: 100%
  }
  .active {
    color: #262626;
    font-weight: 700;
  }
  .header-container {
    z-index: 9999;
  }
  .header-panel {
    display: flex;
    align-items: center;
    height: 60px;
    z-index: 9999;
    &__logo {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      width: 200px;
      height: 60px;
      /deep/ .svg-icon {
        width: 48px;
        height: 48px;
      }
      span {
        font-size: 20px;
        line-height: 60px;
        color: #262626;
        font-weight: 700;
      }
    }
    &__nav {
      flex-grow: 1;
      margin-left: 15px;
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0px;
        li {
          margin-left: 15px;
          a {
            display: block;
            font-size: 14px;
            color: #595959;
          }
        }
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      width: 200px;
      height: 60px;
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0px;
        li {
          margin-left: 15px;
          i {
            font-size: 25px;
          }
        }
        li.author {
          display: flex;
          align-items: center;
          img {
            width: 25px;
            height: 25px;
            border: 2px solid darkorange;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
