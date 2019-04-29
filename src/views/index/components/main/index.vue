<template>
  <div class="main-panel">
    <div class="main-panel__content">
      <introduction></introduction>
      <show-paint></show-paint>
      <show-place></show-place>
      <sub-banner></sub-banner>
      <produce></produce>
      <news></news>
      <comments></comments>
      <society></society>
      <custom></custom>
      <join></join>
      <link-panel></link-panel>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mainNav',
    components: {
      'introduction': () => import('./components/introduction'),
      'showPaint': () => import('./components/show-paint'),
      'showPlace': () => import('./components/show-place'),
      'subBanner': () => import('./components/sub-banner'),
      'produce': () => import('./components/show-product'),
      'news': () => import('./components/show-news'),
      'comments': () => import('./components/show-comments'),
      'society': () => import('./components/show-society'),
      'custom': () => import('./components/show-custom'),
      'join': () => import('./components/show-join'),
      'linkPanel': () => import('./components/show-link')
    }

  }
</script>

<style lang="scss" scoped>
  .main-panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0px auto;
    width: 1000px;
    padding: 15px 20px;
    background: white;
    &__content {
      width: 960px;
    }
  }
</style>
