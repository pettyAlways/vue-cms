<template>
  <div class="custom-panel">
    <div class="custom-panel__header">
      <wine-panel-title width="160px" height="40px" title="网站介绍" note="INTRODUCE"></wine-panel-title>
    </div>
    <div class="custom-panel__body">
      <div class="custom-panel__body__content">
        本网站是一个知识库协同网站,和现在主流的如语雀等网站有点区别，语雀是面相多个团体构建文档，而本网站是针对一个团体
        构建知识库，这个团体的特征是人员不宜太多，大概5个人左右，人一多就难控制从而导致知识库质量下降。网站提供了github
        这第三方登录，登录后可以在头像下进入个人资料绑定账号和密码，这样免去了繁琐的注册步骤。拥有了账号可以在头像下申请
        成为作者，申请通过后就开放了工作台功能，可以在工作台中创建知识库写文章等操作。网站欢迎喜欢写作的同学加入，人数有限
        不要犹豫了哟
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'custom',
    data() {
      return {
      }
    },
    components: {
      'winePanelTitle': () => import('@/components/wine-panel-title'),
      'autoScroll': () => import('@/components/auto-scroll')
    }
  }
</script>

<style lang="scss" scoped>
  .custom-panel {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    &__header {
      margin-bottom: 20px;
    }
    &__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__content {
       font-size: 15px;
      }
    }
  }
</style>
