<template>
  <el-card class="workbench">
    <div class="workbench__article">
      <custom-card02 title="最近编辑">
        <div class="workbench__article__content">
          <div class="article-item" v-for="index in 6" :key="index">
            <div class="article-icon">
              <i class="el-icon-tickets"></i>
            </div>
            <div class="article-body">
              <div class="article-body--top">
                <a>实战卖酒官网搭建</a>
                <i class="el-icon-edit-outline"></i>
              </div>
              <div class="article-body--center">
                <ul>
                  <li>
                    <a>Java Web</a>
                  </li>
                  <li>
                    /
                  </li>
                  <li>
                    <a>web应用</a>
                  </li>
                </ul>
                <div class="date">2019-05-14</div>
              </div>
            </div>
          </div>
        </div>
      </custom-card02>
    </div>
    <div class="workbench__knowledge">
      <custom-card02 title="最近知识库">
        <div class="workbench__article__content">
          <div class="article-item" v-for="index in 6" :key="index">
            <div class="article-icon">
              <i class="el-icon-document-copy"></i>
            </div>
            <div class="article-body">
              <div class="article-body--top">
                <a>架构师</a>
                <i class="el-icon-edit-outline"></i>
              </div>
              <div class="article-body--center">
                <a>Java Web</a>
              </div>
            </div>
          </div>
        </div>
      </custom-card02>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'workbench',
    components: {
      customCard02: () => import('@/components/custom-card-02')
    }
  }
</script>

<style lang="scss" scoped>
  .workbench {
    &__article {
      &__content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        .article-item {
          display: flex;
          align-items: center;
          width: 260px;
          margin: 15px 0px;
          .article-icon {
            flex-shrink: 0;
            width: 30px;
            margin-right: 10px;
            i {
              font-size: 30px;
            }
          }
          .article-body {
            flex-grow: 1;
            width: 230px;
            &--top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              a {
                width: 80%;
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 21px;
                font-size: 13px;
                font-weight: 400;
                color: #333;
                overflow: hidden;
              }
              i {
                width: 15px;
                font-size: 14px;
              }
            }
            &--center {
              display: flex;
              justify-content: space-between;
              ul {
                display: flex;
                list-style: none;
                padding: 0px;
                li {
                  margin-right: 3px;
                  font-size: 12px;
                  color: #595959;
                }
              }
              .date {
                font-size: 12px;
                color: #595959;
              }
            }
          }
        }
      }
    }
  }
</style>
