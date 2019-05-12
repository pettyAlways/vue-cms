<template>
  <div class="knowledge-panel">
    <konwledge-banner/>
    <el-card class="knowledge-panel__content-panel w1200">
      <router-view />
    </el-card>
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
    components: {
      'konwledgeBanner': () => import('./components/banner')
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
    &__banner {
      position: relative;
      margin-top: 0.5px;
      width: 100%;
      height: 200px;
      background: url("./asserts/knowledge-bg.jpg") no-repeat center center fixed;
      background-size: cover;
      &:after {
        content: "";
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
        background: inherit;
        filter: blur(2px);
        filter:brightness(70%);
        z-index: 2;
      }
      &__extra {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        transform: translate(-50%, -50%);
        width: 700px;
        z-index: 3;
        &__description {
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: 700;
          color: #F9FAF3;
        }
        &__join {
          display: inline-flex;
          flex-direction: row;
          justify-content: center;
          a {
            display: block;
            padding: 10px 15px;
            border: 1px solid red;
            font-family: "Droid Sans Mono Dotted";
            font-weight: 700;
            font-size: 16px;
            color: red;
            &:hover {
              border: 1px solid orangered;
              color: orangered;
            }
          }
        }
      }

    }
    &__content-panel {
      margin-top: 10px;
      &__center {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        &--left {
          flex-shrink: 0;
          width: 900px;
        }
        &--right {
          display: flow;
          flex-direction: column;
          flex-grow: 1;
          margin-left: 15px;
          width: 280px;
        }
      }
    }
  }
</style>
