<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon-svg',
    props: {
      iconClass: {
        type: String,
        required: true
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .svg-icon {
    width: 1.25em;
    height: 1.25em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
