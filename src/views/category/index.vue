<template>
  <div class="common-page">
    <div class="common-page__panel w1200">
      <div class="common-page__panel__left">
        <ul>
          <li v-for="(item, index) in showData" :key="index">
            <a @click="goHandler(item)" :class="{'isActive': $route.query.name==item.name}">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="common-page__panel__center">
        <div class="common-page__panel__center__bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>当前位置</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/'}">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/category', query: {name: '常规基酒'}}">基酒分类</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="common-page__panel__center__main">
          <div class="common-page__panel__center__main__category-panel">
            <wine-border-panel :title="title" :english="english">
              <div class="common-page__panel__center__main__category-panel__list">
                <div class="category-panel__list__item" v-for="(item, index) in listDatas" :key="index">
                  <a :href="item.link"><el-image :src="item.pic"></el-image></a>
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="common-page__panel__center__main__category-panel__pagination">
                <el-pagination
                  :page-size="20"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="1000">
                </el-pagination>
              </div>
            </wine-border-panel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'category',
    data() {
      return {
        showData: [
          {
            name: '常规基酒',
            link: '/category'
          },
          {
            name: '调味基酒',
            link: '/category'
          },
          {
            name: '轮次基酒',
            link: '/category'
          },
          {
            name: '窖藏基酒',
            link: '/category'
          }
        ],
        title: '',
        english: '',
        englishInfo: {
          '常规基酒': 'PRODUCT DISPLAYS',
          '调味基酒': 'Latest Activity',
          '轮次基酒': 'PRODUCT DISPLAYS',
          '窖藏基酒': 'PRODUCT DISPLAYS'
        },
        categoryInfo: {
          '常规基酒': [
            {
              name: '兼香四号 ',
              link: '',
              pic: require('./asserts/wine01.jpg')
            },
            {
              name: '兼香三号',
              link: '',
              pic: require('./asserts/wine02.jpg')
            },
            {
              name: '兼香二号',
              link: '',
              pic: require('./asserts/wine03.jpg')
            },
            {
              name: '兼香一号',
              link: '',
              pic: require('./asserts/wine04.jpg')
            }
          ],
          '调味基酒': [
            {
              name: '兼香四号 ',
              link: '',
              pic: require('./asserts/wine01.jpg')
            },
            {
              name: '兼香三号',
              link: '',
              pic: require('./asserts/wine02.jpg')
            },
            {
              name: '兼香二号',
              link: '',
              pic: require('./asserts/wine03.jpg')
            },
            {
              name: '兼香一号',
              link: '',
              pic: require('./asserts/wine04.jpg')
            }
          ],
          '轮次基酒': [
            {
              name: '兼香四号 ',
              link: '',
              pic: require('./asserts/wine01.jpg')
            },
            {
              name: '兼香三号',
              link: '',
              pic: require('./asserts/wine02.jpg')
            },
            {
              name: '兼香二号',
              link: '',
              pic: require('./asserts/wine03.jpg')
            },
            {
              name: '兼香一号',
              link: '',
              pic: require('./asserts/wine04.jpg')
            }
          ],
          '窖藏基酒': [
            {
              name: '兼香四号 ',
              link: '',
              pic: require('./asserts/wine01.jpg')
            },
            {
              name: '兼香三号',
              link: '',
              pic: require('./asserts/wine02.jpg')
            },
            {
              name: '兼香二号',
              link: '',
              pic: require('./asserts/wine03.jpg')
            },
            {
              name: '兼香一号',
              link: '',
              pic: require('./asserts/wine04.jpg')
            }
          ]
        },
        listDatas: [
          {
            name: '兼香四号 ',
            link: '',
            pic: require('./asserts/wine01.jpg')
          },
          {
            name: '兼香三号',
            link: '',
            pic: require('./asserts/wine02.jpg')
          },
          {
            name: '兼香二号',
            link: '',
            pic: require('./asserts/wine03.jpg')
          },
          {
            name: '兼香一号',
            link: '',
            pic: require('./asserts/wine04.jpg')
          }
        ]
      }
    },
    mounted() {
      this.queryHandler(this.$route.query.name)
    },
    methods: {
      goHandler(item) {
        this.$router.push({ path: item.link, query: { name: item.name } })
      },
      queryHandler(params) {
        this.listDatas = this.categoryInfo[params]
        this.title = params
        this.english = this.englishInfo[params]
      }
    },
    components: {
      'wineBorderPanel': () => import('@/components/wine-border-panel')
    },
    watch: {
      $route(to, from) {
        this.queryHandler(this.$route.query.name)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .common-page {
    margin-bottom: 20px;
    &__panel {
      display: flex;
      justify-content: space-between;
      &__left {
        width: 200px;
        height: 100%;
        border: 1px solid #e0caa8;
        ul {
          list-style: none;
          padding: 0px;
          li {
            display: flex;
            justify-content: center;
            a {
              height: 56px;
              width: 170px;
              color: #4c4c4c;
              font-size: 18px;
              line-height: 56px;
              display: block;
              text-align: center;
              border-bottom: 1px solid #e6e6e6;
            }
            a:hover{
              background: #c59d5e;
              color: #ffffff;
              width: 198px;
              height: 57px;
              text-align: center;
              border-bottom: none;
            }
            .isActive{
              background: #c59d5e;
              color: #ffffff;
              width: 198px;
              height: 57px;
              text-align: center;
              border-bottom: none;
            }
          }
        }
      }
      &__center {
        width: 980px;
        &__bread {
          margin-bottom: 30px;
          /deep/ .el-breadcrumb {
            font-size: 16px;
            color: #333;
            text-decoration: none;
            &__inner.is-link {
              font-weight: 400
            }
          }
        }
        &__main {
          &__category-panel {
            &__list {
              display: flex;
              margin-bottom: 20px;
              &__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 364px;
                width: 225px;
                margin-left: 8px;
                margin-right: 7px;
                a {
                  display: block;
                  width: 223px;
                  height: 312px;
                  border: 1px solid #f2f2f2;
                }
                span {
                  display: block;
                  width: 225px;
                  height: 50px;
                  line-height: 50px;
                  font-size: 14px;
                  color: #313131;
                  text-align: center;
                }
              }
            }
            &__pagination {
              display: flex;
              flex-direction: row;
              justify-content: center;
            }
          }
        }
      }
    }
  }
</style>
