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
          <li v-for="(item, index) in navResource" :key="index" >
            <router-link :class="{ active: item.path == curNav }" :to="{ path: item.path }">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="header-panel__btn">
        <ul>
          <li>
            <router-link :to="{ path: '/platform/blog/knowledge/new' }"><i class="el-icon-circle-plus-outline"></i></router-link>
          </li>
          <li>
            <el-badge :value="messageNum" class="item" v-if="messageNum">
              <a><i class="el-icon-message"></i></a>
            </el-badge>
            <a v-else><i class="el-icon-message"></i></a>
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
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { messageCount } from '@/api/login'
  export default {
    name: 'headerNav',
    data() {
      return {
        fixed: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.navHandler)
      this.messageCount()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'curNav',
        'messageNum'
      ]),
      navResource() {
        let navResource
        if (this.permissions['navigation']) {
          navResource = this.permissions['navigation'].children || []
        }
        return navResource
      }
    },
    methods: {
      ...mapActions([
        'switchMenu'
      ]),
      ...mapMutations({
        setMessage: 'SET_MESSAGE'
      }),
      messageCount() {
        messageCount().then(res => {
          if (res.flag) {
            this.setMessage(res.data)
          }
        })
      },
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
