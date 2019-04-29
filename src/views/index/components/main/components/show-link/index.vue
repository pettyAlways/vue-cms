<template>
  <div class="link-panel">
    <div class="link-panel__left">
      <el-image :src="linkInfo.left.pic" style="width: 157px;height: 61px"></el-image>
    </div>
    <div class="link-panel__right">
      <div class="link-panel__right__item" v-for="(item, index) in linkInfo.right.links" :key="index">
        <a :href="item.link"> {{item.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'linkPanel',
    data() {
      return {
        linkInfo: {
          left: {
            pic: require('./asserts/link.jpg')
          },
          right: {
            links: [
              {
                name: '怀庄酒业',
                link: ''
              },
              {
                name: '月子米酒',
                link: ''
              },
              {
                name: '白酒团购',
                link: ''
              },
              {
                name: '怀庄酒业商城',
                link: ''
              },
              {
                name: '怀庄酒业集团',
                link: ''
              },
              {
                name: '贵州怀庄酒业集团',
                link: ''
              },
              {
                name: '贵州怀庄酒业',
                link: ''
              }
            ]
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link-panel {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    border: 1px solid #e8e8e8;
    &__left {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: 170px;
      margin: 30px;
      border-right: 1px solid #e8e8e8;
    }
    &__right {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-grow: 1;
      &__item {
        font: 14px/1.5 Arial 宋体;
        color: black;
        margin-left: 15px;
        a:hover {
          color: red;
          text-decoration: none;
        }
      }
    }
  }
</style>
