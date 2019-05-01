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
            <el-breadcrumb-item :to="{path: '/category', query: {name: '企业定制'}}">首酒定制</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="common-page__panel__center__main">
          <div class="common-page__panel__center__main__custom-panel">
            <wine-border-panel :title="title" :english="english">
              <div class="common-page__panel__center__main__custom-panel__list">
                <div class="common-page__panel__center__main__custom-panel__list__item" v-for="(item, index) in listDatas" :key="index">
                  <a :href="item.link"><el-image :src="item.pic"></el-image></a>
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="common-page__panel__center__main__custom-panel__pagination" v-if="listDatas.length!=0">
                <el-pagination
                  :page-size="20"
                  layout="prev, pager, next"
                  :total="listDatas.length">
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
            name: '企业定制',
            link: '/custom'
          },
          {
            name: '宴席定制',
            link: '/custom'
          },
          {
            name: '私人定制',
            link: '/custom'
          },
          {
            name: '封藏定制',
            link: '/custom'
          },
          {
            name: '封坛定制',
            link: '/custom'
          }
        ],
        title: '',
        english: '',
        englishInfo: {
          '企业定制': 'PRODUCT DISPLAYS',
          '宴席定制': 'Latest Activity',
          '私人定制': 'PRODUCT DISPLAYS',
          '封藏定制': 'PRODUCT DISPLAYS',
          '封坛定制': 'PRODUCT DISPLAYS'
        },
        customInfo: {
          '企业定制': [],
          '宴席定制': [
            {
              name: '迎宾酒7',
              link: '',
              pic: require('./asserts/feast/custom01.jpg')
            },
            {
              name: '迎宾酒6',
              link: '',
              pic: require('./asserts/feast/custom02.jpg')
            },
            {
              name: '迎宾酒5',
              link: '',
              pic: require('./asserts/feast/custom03.jpg')
            },
            {
              name: '迎宾酒4',
              link: '',
              pic: require('./asserts/feast/custom04.jpg')
            },
            {
              name: '迎宾酒3',
              link: '',
              pic: require('./asserts/feast/custom05.jpg')
            },
            {
              name: '迎宾酒2',
              link: '',
              pic: require('./asserts/feast/custom06.jpg')
            },
            {
              name: '迎宾酒1',
              link: '',
              pic: require('./asserts/feast/custom07.jpg')
            }
          ],
          '私人定制': [
            {
              name: '国威酒6',
              link: '',
              pic: require('./asserts/private/custom01.jpg')
            },
            {
              name: '国威酒5',
              link: '',
              pic: require('./asserts/private/custom02.jpg')
            },
            {
              name: '国威酒4',
              link: '',
              pic: require('./asserts/private/custom03.jpg')
            },
            {
              name: '国威酒3',
              link: '',
              pic: require('./asserts/private/custom04.jpg')
            },
            {
              name: '国威酒2',
              link: '',
              pic: require('./asserts/private/custom05.jpg')
            },
            {
              name: '国威酒1',
              link: '',
              pic: require('./asserts/private/custom06.jpg')
            }
          ],
          '封藏定制': [
            {
              name: '贵州迎宾酒',
              link: '',
              pic: require('./asserts/store/custom01.jpg')
            },
            {
              name: '贵州嘉宾酒',
              link: '',
              pic: require('./asserts/store/custom02.jpg')
            },
            {
              name: '贵州御宾酒',
              link: '',
              pic: require('./asserts/store/custom03.jpg')
            },
            {
              name: '贵州贵宾酒',
              link: '',
              pic: require('./asserts/store/custom04.jpg')
            }
          ],
          '封坛定制': []
        },
        listDatas: []
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
        this.listDatas = this.customInfo[params]
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
          &__custom-panel {
            &__list {
              display: flex;
              flex-wrap: wrap;
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
