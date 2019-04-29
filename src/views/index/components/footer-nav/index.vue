<template>
  <div class="footer-panel">
    <el-row type="flex" justify="center">
      <div class="footer-panel__content">
        <div class="footer-panel__content__item" v-for="(item, index) in footerInfo" :key="index">
          <div class="footer-panel__content__item__header">
            <span>{{item.type}}</span>
          </div>
          <div class="footer-panel__content__item__body">
            <ul>
              <li v-for="(tItem, index) in item.items" :key="index">
                <a :href="tItem.link" v-if="!tItem.vx">{{tItem.subName}}</a>
                <el-image v-else :src="tItem.vx" style="width: 134px;height: 132px;margin-top: 8px"></el-image>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'footerNav',
    data() {
      return {
        footerInfo: [
          {
            type: '关于怀庄',
            items: [
              {
                subName: '企业概况',
                link: ''
              },
              {
                subName: '企业领导',
                link: ''
              },
              {
                subName: '董事长致辞',
                link: ''
              },
              {
                subName: '组织机构',
                link: ''
              },
              {
                subName: '荣誉资质',
                link: ''
              },
              {
                subName: '企业文化',
                link: ''
              },
              {
                subName: '怀庄历程',
                link: ''
              }
            ]
          },
          {
            type: '产品中心',
            items: [
              {
                subName: '怀庄系列',
                link: ''
              },
              {
                subName: '人民公社系列',
                link: ''
              },
              {
                subName: '政酒系列',
                link: ''
              },
              {
                subName: '精品茅系列',
                link: ''
              },
              {
                subName: '典酱台系列',
                link: ''
              },
              {
                subName: '台酱坊系列',
                link: ''
              },
              {
                subName: '倚天酱系列',
                link: ''
              },
              {
                subName: '醉美怀庄',
                link: ''
              }
            ]
          },
          {
            type: '怀庄酒韵',
            items: [
              {
                subName: '私人定制',
                link: ''
              },
              {
                subName: '怀庄历程',
                link: ''
              },
              {
                subName: '企业歌曲',
                link: ''
              },
              {
                subName: '书画展示',
                link: ''
              },
              {
                subName: '怀庄赋',
                link: ''
              }
            ]
          },
          {
            type: '相关网站',
            items: [
              {
                subName: '怀庄商城',
                link: ''
              },
              {
                subName: '手机商城',
                link: ''
              }
            ]
          },
          {
            type: '微信公众号',
            items: [
              {
                vx: require('../fix-right/asserts/vx.jpg')
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer-panel {
    margin-top: 20px;
    background: url("./asserts/footer-bg.jpg") repeat-x;
    &__content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 960px;
      &__item {
        display: flex;
        flex-direction: column;
        &__header {
          height: 40px;
          line-height: 40px;
          color: #cccccc;
          font-size: 14px;
          font-weight: bolder;
          line-height: 35px;
        }
        &__body {
          ul {
            list-style: none;
            padding: 0px;
            li {
              margin-top: 8px;
              color: #cccccc;
              font: 14px/1.5 Arial 宋体;
              a:hover {
                color: #FFF;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }

  }
</style>
