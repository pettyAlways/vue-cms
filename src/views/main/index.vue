<template>
  <div class="main-panel">
    <carousel></carousel>
    <el-card class="main-panel__content w1200">
      <news></news>
      <sub-banner></sub-banner>
      <introduction></introduction>
      <show-place></show-place>
      <produce></produce>
      <brand></brand>
      <custom></custom>
      <franchise></franchise>
      <link-panel></link-panel>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'mainNav',
    components: {
      'carousel': () => import('../carousel'),
      'news': () => import('./components/show-news'),
      'subBanner': () => import('./components/sub-banner'),
      'introduction': () => import('./components/introduction'),
      'showPlace': () => import('./components/show-place'),
      'produce': () => import('./components/show-product'),
      'brand': () => import('./components/show-brand'),
      'custom': () => import('./components/show-custom'),
      'franchise': () => import('./components/show-franchise'),
      'linkPanel': () => import('./components/show-link')
    }

  }
</script>

<style lang="scss" scoped>
  .main-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px auto;
    &__content {
      margin-top: 15px;
      background: white;
    }
  }
</style>
