<template>
  <div class="intro-panel">
    <div class="intro-panel__header">
      <wine-panel-title width="160px" height="40px" title="推荐视频" note="VIDEO"></wine-panel-title>
    </div>
    <div class="intro-panel__body">
      <div class="intro-panel__body--center">
        <div class="intro-panel__body--center__video" v-for="(item, index) in vedioInfo.datas" v-if="item.show" :key="index">
          <video src="./asserts/v.f20.mp4" type="video/mp4" controls="controls"  width="699px"  height="389px">
            你的浏览器不支持视频播放器
          </video>
        </div>
        <div class="intro-panel__body--center__link">
          <ul>
            <li v-for="(item, index) in vedioInfo.datas" :class="{'active': item.show}" @click="chooseVideoHandler(item)" :key="index">
              <i>{{index+1}}.</i>
              <a>{{item.title}}</a>
            </li>
          </ul>
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
        vedioInfo: {
          datas: [
            {
              title: 'Java高并发编程',
              show: true
            },
            {
              title: 'JMM内存模型',
              show: false
            },
            {
              title: 'Redis缓存使用',
              show: false
            },
            {
              title: 'Tomcat优化',
              show: false
            },
            {
              title: 'Liunx命令详解',
              show: false
            }
          ]
        }
      }
    },
    components: {
      'winePanelTitle': () => import('@/components/wine-panel-title')
    },
    methods: {
      chooseVideoHandler(item) {
        for (let video of this.vedioInfo.datas) {
          video.show = false
        }
        item.show = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .intro-panel {
    width: 100%;
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
        align-items: center;
        padding: 20px;
        &__video {
        }
        &__link {
          width: 389px;
          margin-left: 15px;
          ul {
            list-style: none;
            padding: 0px;
            .active {
              background-color: #cc9966;
            }
            li {
              display: flex;
              align-items: center;
              border: 1px solid #fff;
              margin-bottom: 16px;
              padding-left: 20px;
              i {
                font-size: 18px;
                color: #ffffff;
              }
              a {
                display: block;
                margin-left: 15px;
                height: 59px;
                font-size: 18px;
                color: #ffffff;
                line-height: 60px;
                text-align: center;
              }
              &:hover {
                color: white;
                border: 1px solid #cc9966;
              }
            }
            li:last-of-type {
              margin-bottom: 0px;
            }
          }
        }
      }
    }

  }
</style>
