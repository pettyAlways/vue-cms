<template>
  <div class="footer">
    <div class="copyright">
      Copyright © 2019-2019 yingzuidou. 当前呈现版本 v1<br>
      <span>浙ICP备18029694号-1</span> &nbsp;
      <span class="ml5">鹰嘴豆知识库协同网站</span>
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
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("./asserts/header-bg.jpg") 0 120px;
    margin: 0px auto;
    height: 120px;
    .copyright {
      width: 400px;
      height: 80px;
    }
  }
</style>
