<template>
  <div class="footer">
    <div class="footer__panel w1200">
      <div class="footer__panel__top">
        <div class="footer__panel__top__left">
          <el-image :src="require('./asserts/footer-left.jpg')"></el-image>
        </div>
        <div class="footer__panel__top__center">
          <div class="footer__panel__top__center__header">
            <div class="footer__panel__top__center__header__vx">
              <el-image :src="require('./asserts/icon_vx.png')"></el-image>
              <span>微信</span>
            </div>
            <div class="footer__panel__top__center__header__email">
              <el-image :src="require('./asserts/icon-info.png')"></el-image>
              <span>邮箱</span>
            </div>
          </div>
          <div class="footer__panel__top__center__body">
            茅台镇散酒_茅台镇酒厂基酒_茅台酒厂代理_贵州首酒酒业官网&nbsp;&nbsp;&nbsp;&nbsp;<br>
            地址：贵州省仁怀市国威路国酒社区茅台白金酒厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br>贵州贵阳市观山湖区长岭北路6号东原财富广场5楼<br>

            电话：15338528869&nbsp;&nbsp;&nbsp;&nbsp;电话：0851-84105458 &nbsp;&nbsp;&nbsp;&nbsp;咨询热线：400-861-7998
          </div>
          <div class="footer__panel__top__center__bottom">
            友情链接：
            <a href="http://www.itmxx.com" target="_blank">贵州网站建设</a>
            <a href="http://yinjiuren.com" target="_blank">引酒人</a>
            <a href="http://www.txsizu.com" target="_blank">广州按摩</a>
            <a href="http://www.qlpearl.com" target="_blank">上海按摩</a>
          </div>
        </div>
        <div class="footer__panel__top__right">
          <el-image :src="require('./asserts/footer-right.jpg')"></el-image>
        </div>
      </div>
      <div class="footer__panel__bottom">
        <span>Copyright © 2018-2020 贵州首酒酒业有限公司 版权所有</span>
        <a>黔ICP备18009371号-1</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footerNav',
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .footer{
    background: #1a1a1a;
    margin: 0px auto;
    &__panel {
      display: flex;
      flex-direction: column;
      &__top {
        display: flex;
        height: 200px;
        &__left {
          align-self: center;
          flex-shrink: 0;
          width: 200px;
          height: 80px;
          border-right: 1px solid #cc9966;
        }
        &__center {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
          flex-grow: 1;
          &__header {
            display: flex;
            margin-bottom: 15px;
            &__vx {
              display: flex;
              align-items: center;
              margin-right: 10px;
              span {
                margin-left: 15px;
              }
            }
            &__email {
              display: flex;
              align-items: center;
              span {
                margin-left: 15px;
              }
            }
          }
          &__body {
            font-size: 14px;
            color: #808080;
          }
          &__bottom {
            margin-top: 15px;
            a {
              margin-left: 8px;
              font-size: 14px;
              color: #fff;
              &:hover {
                color: #fff;
                text-decoration: underline;
              }
            }
          }
        }
        &__right {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          width: 150px;
        }
      }
      &__bottom {
        align-self: center;
        span {
          font-size: 14px;
          color: #808080;
        }
        a {
          color: #FFF;
          font-size: 14px;
        }
      }
    }
  }
</style>
