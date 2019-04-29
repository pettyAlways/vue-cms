<template>
  <div ref="scrollPanel" class="auto-scroll" :style="{'width': width, 'height': height}">
    <div ref="firstPanel" class="auto-scroll__panel">
      <slot :data="linkInfo"></slot>
    </div>
    <div ref="secondPanel" class="auto-scroll__panel"></div>
  </div>
</template>

<script>
  export default {
    name: 'join',
    props: {
      linkInfo: Object,
      height: {
        type: String,
        default() {
          return '100%'
        }
      },
      width: {
        type: String,
        default() {
          return '100px%'
        }
      },
      speed: {
        type: Number,
        default() {
          return 30
        }
      }
    },
    data() {
      return {
        timer: ''
      }
    },
    mounted() {
      this.$refs.secondPanel.innerHTML = this.$refs.firstPanel.innerHTML
      this.timer = setInterval(this.scrollHandler, this.speed)
      // 鼠标经过容器的时候清除定时器
      this.$refs.scrollPanel.onmouseover = () => { clearInterval(this.timer) }
      // 鼠标移开容器的时候开始定时器
      this.$refs.scrollPanel.onmouseout = () => { this.timer = setInterval(this.scrollHandler, this.speed) }
    },
    destroy() {
      clearInterval(this.timer)
    },
    methods: {
      scrollHandler() {
        if (this.$refs.scrollPanel.scrollLeft - this.$refs.firstPanel.offsetWidth > 0) {
          this.$refs.scrollPanel.scrollLeft = 0
        }
        this.$refs.scrollPanel.scrollLeft++
      }
    }
  }
</script>

<style lang="scss" scoped>
  .auto-scroll {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    &__panel {
      display: flex;
      flex-direction: row;
    }
  }
</style>
