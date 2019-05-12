<template>
  <div class="category-panel">
    <div class="category-panel__body">
      <custom-card01 title="知识库分类" note="CATEGORY">
        <div class="category-panel__body__container">
          <div class="category-panel__body__container__item" v-for="index in 16" :key="index">
            <div class="category-panel__body__container__item--left">
              <el-image :src="require('./assets/blog01.jpg')" style="width: 60px; height: 60px;" fit="cover"></el-image>
              <div class="center">
                <span class="icon">+</span>
                <a class="join">加入</a>
              </div>
            </div>
            <div class="category-panel__body__container__item--right">
              <div class="title">
                <a>如何成为高效的程序员</a>
              </div>
              <div class="content">
                <span>在日常的繁重工作中,如何才能解脱出来就能享受生活，因此高效率是人们生活在当下...</span>
                <a>[详情]</a>
              </div>
            </div>
          </div>
        </div>
      </custom-card01>
      <div class="category-panel__scroll-panel">
        <ul>
          <li><a>Java</a></li>
          <li><a>JavaScript</a></li>
          <li><a>CSS</a></li>
          <li><a>Vue</a></li>
          <li><a>Spring</a></li>
          <li><a>Mysql</a></li>
          <li><a>Oracle</a></li>
          <li><a>JVM</a></li>
          <li><a>高并发</a></li>
          <li><a>分布式</a></li>
          <li><a>C++</a></li>
          <li><a>PHP</a></li>
          <li><a>.Net</a></li>
          <li><a>分布式</a></li>
          <li><a>C++</a></li>
          <li><a>PHP</a></li>
          <li><a>.Net</a></li>
          <li><a>分布式</a></li>
          <li><a>C++</a></li>
          <li><a>PHP</a></li>
          <li><a>.Net</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeCategory',
    components: {
      'customCard01': () => import('@/components/custom-card-01')
    }
  }
</script>

<style lang="scss" scoped>
  .category-panel {
    position: relative;
    min-height: 300px;
    &__body {
      width: 900px;
      /deep/ .custom-panel__body {
        padding: 15px 20px 15px 0px;
      }
      &__container {
        display: flex;
        flex-wrap: wrap;
        &__item {
          display: flex;
          margin-top: 15px;
          width: 290px;
          height: 100px;
          padding-left: 20px;
          border-bottom: 1px dotted #eee;
          &--left {
            display: flex;
            flex-direction: column;
            width: 60px;
            flex-shrink: 0;
            .center {
              display: flex;
              justify-content: center;
              align-items: center;
              .icon {
                font-size: 16px;
                font-weight: bold;
              }
              a.join {
                margin-left: 5px;
                font-size: 13px;
                color:  #4c84be;
                cursor: pointer;
                &:hover {
                  color:  #409EFF;
                }
              }
            }
          }
          &--right {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            margin-left: 10px;
            .title {
              margin-bottom: 5px;
              font-size: 14px;
              font-weight: 700;
              color: #6b747d;
            };
            .content {
              a {
                color:  #4c84be;
                cursor: pointer;
                &:hover {
                  color:  #409EFF;
                }
              }
            }
          }

        }
      }

    }
    &__scroll-panel {
      position: absolute;
      top: 0px;
      left: 180px;
      width: 660px;
      height: 40px;
      margin-left: 15px;
      overflow: hidden;
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        list-style: none;
        padding: 0px;
        width: 660px;
        overflow-x: scroll;
        li {
          flex-shrink: 0;
          margin-right: 15px;
          a {
            display: block;
            height: 40px;
            line-height: 40px;
            color: #4c84be;
            &:hover {
              color: #409EFF;
            }
          }
        }
      }
    }
  }
</style>
