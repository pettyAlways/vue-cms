<template>
  <div class="banner">
    <div class="banner__extra">
      <div class="banner__extra__description">
        知识库所属指定分类，包含一类的文章，可由多个作者协作编辑，对感兴趣的知识库可申请加入哟
      </div>
      <div class="banner__extra__join">
        <a @click="goCategory">JOIN NOW</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeBanner',
    methods: {
      goCategory() {
        this.$router.push({ path: '/knowledge#category' })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .banner {
    position: relative;
    margin-top: 0.5px;
    width: 100%;
    height: 200px;
    background: url("../../asserts/knowledge-bg.jpg") no-repeat center center fixed;
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
</style>
