<template>
  <div class="header-logo">
    <div class="header-logo__main">
      <div class="header-logo__main__panel">
        <div class="header-logo__main__panel__logo--left">
          <a href="">
            <img :src="siteInfo.logo" />
          </a>
        </div>
        <div class="header-logo__main__panel__logo--right">
          <div class="header-logo__main__panel__logo--right__brand">
            <img v-for="item in siteInfo.otherSite" :src="item" style="width: 55px; height: 55px; margin-left: 10px" :key="item">
          </div>
          <div class="header-logo__main__panel__logo--right__contact">
            <p class="header-logo__main__panel__logo--right__contact--style01">{{siteInfo.contact.contactWay}}</p>
            <p class="header-logo__main__panel__logo--right__contact--style02">{{siteInfo.contact.contactVal}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headerNav',
    data() {
      return {
        siteInfo: {
          logo: require('./asserts/logo.png'),
          otherSite: [
            require('./asserts/link_pg01.png'),
            require('./asserts/link_pg02.png'),
            require('./asserts/link_pg03.png'),
            require('./asserts/link_pg04.png'),
            require('./asserts/link_pg05.png')
          ],
          contact: {
            contactWay: '全国服务电话',
            contactVal: '400-859-9991'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 160px;
    background: #f2f2f2;
    border-top: 1px solid #e50012;
    &__main {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 1075px;
      background: url("./asserts/header_bg.jpg") no-repeat;
      &__panel {
        display: flex;
        flex-direction: row;
        width: 960px;
        margin: 0px auto;
        &__logo--left {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-shrink: 0;
          width: 430px;
          a {
            display: block;
          }
        }
        &__logo--right {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex-grow: 1;
          &__brand {
            display: flex;
            flex-direction: row;
          }
          &__contact {
            flex-direction: column;
            align-items: center;
            &--style01 {
              font-size: 14px;
              color: #7b7b7b;
              font-family: "微软雅黑";
            }
            &--style02 {
              font-size: 30px;
              font-weight: bold;
              font-style: oblique;
              color: #e50012;
            }
          }
        }
      }

    }
  }
</style>
