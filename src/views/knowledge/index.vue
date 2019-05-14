<template>
  <div class="knowledge-panel">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'category',
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
    },
    watch: {
      $route(to, from) {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-panel {
    margin-bottom: 15px;
  }
</style>
