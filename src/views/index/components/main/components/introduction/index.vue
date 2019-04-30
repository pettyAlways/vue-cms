<template>
  <div class="intro-panel">
    <div class="intro-panel__header w1200">
      <wine-panel-title width="160px" height="40px" title="品牌视频" note="Brand Vedio"></wine-panel-title>
    </div>
    <div class="intro-panel__body">
      <div class="intro-panel__body--center w1200">
        <div class="intro-panel__body__video">
          <video src="./asserts/v.f20.mp4" type="video/mp4" autoplay="autoplay" controls="controls">
            你的浏览器不支持视频播放器
          </video>
        </div>
        <div class="intro-panel__body--center__link">
          <a>白酒文化</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inroduction',
    data() {
      return {
      }
    },
    components: {
      'winePanelTitle': () => import('@/components/wine-panel-title')
    }
  }
</script>

<style lang="scss" scoped>
  .intro-panel {
    width: 100%;
    color: red;
    display: flex;
    flex-direction: column;
    margin: 0px auto 20px;

    &__header {
      height: 40px;
      margin-bottom: 15px;
    }
    &__body {
      width: 100%;
      background: url(./asserts/video_bg2.jpg) no-repeat top center;
      margin: 0px auto;
      &--center {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 530px;
        &__video {
          flex-shrink: 0;
          width: 699px;
          height: 460px;
        }
        &__link {
          width: 386px;
          a {
            display: block;
            height: 59px;
            font-size: 18px;
            color: #ffffff;
            line-height: 60px;
            text-align: center;
            margin-bottom: 16px;
            border: 1px solid #fff;
            &:hover {
              color: #cc9966;
              border: 1px solid #cc9966;
            }
          }
        }
      }
    }

  }
</style>
