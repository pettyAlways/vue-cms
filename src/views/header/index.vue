<template>
  <div class="header-logo">
    <div class="header-logo__main w1200">
      <div class="header-logo__main--left">
        <div class="header-logo__main--left__logo"></div>
        <div class="header-logo__main--left__text">
          记录走过的点点滴滴
        </div>
        <div class="header-logo__main--left__search">
          <input type="search" id="text-input" placeholder="全文搜索"/>
          <input type="submit" id="search" value="搜索"/>
        </div>
      </div>
      <div class="header-logo__main--right">
        <ul>
          <li>注册</li>
          <li>登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headerNav',
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    &__main {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: url("./asserts/header-bg.jpg");
      background-size: cover;
      &--left {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-grow: 1;
        &__logo {
          height: 46px;
          width: 200px;
          background: url("./asserts/logo.png");
        }
        &__text {
          height: 60px;
          line-height: 60px;
          font-size: 14px;
          text-align: center;
        }
        &__search {
          margin-left: 30px;
          input#text-input {
            height: 30px;
            width: 300px;
            padding: 8px 6px;
            border: 1px solid darkgray;
            box-sizing: border-box;
            font-size: 12px;
            &:focus {
              outline:none;
              border: 1px solid gray;
            }
          }
          input#search {
            width: 50px;
            height: 30px;
            padding: 6px 10px;
            border: 1px solid darkgray;
            background: #f8f8f8;
            border-radius: 2px;
            color: #555;
            font-size: 12px;
            cursor: pointer;
            overflow: visible;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
            margin-left: 5px;
            &:focus {
              outline:none;
              border: 1px solid gray;
            }
          }

        }
      }
      &--right {
        flex-shrink: 0;
        width: 237px;
        ul {
          display: flex;
          flex-direction: row;
          list-style: none;
          padding: 0px;
          li {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }

  }
</style>
