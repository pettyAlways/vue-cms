<template>
  <el-card class="knowledge">
    <custom-card02 title="参与的知识库">
      <template slot="more">
        <a @click="isList=!isList" style="font-size: 18px;"><i :class="{'el-icon-s-unfold': isList, 'el-icon-s-fold': !isList}"></i></a>
      </template>
      <div v-if="isList" class="knowledge__list">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="分类名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="owner"
            label="所属"
            width="180">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">置顶</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="knowledge__block">
        <ul>
          <li v-for="index in 6" :key="index">
            <el-card :body-style="{ padding: '0px' }">
              <div class="knowledge__block__item">
                <div class="item__header">
                  <img :src="require('./assets/book-cover.jpg')">
                  <div class="item_right">
                    <span><router-link :to="{ path: '/knowledge/detail' }">Vue文档</router-link></span>
                    <span>vue开发技能</span>
                  </div>
                </div>
                <div class="item__body">
                  <ul>
                    <li v-for="index in 6" :key="index">
                      <span>实战卖酒网站搭建</span>
                      <span>2019-05-15</span>
                    </li>
                  </ul>
                </div>
              </div>
            </el-card>
          </li>
        </ul>
      </div>
    </custom-card02>

  </el-card>
</template>

<script>
  export default {
    name: 'knowledge',
    data() {
      return {
        isList: false,
        activeName: 'block',
        tableData: [{
          name: 'Web应用',
          owner: '王小虎',
          description: '构建Web服务应用'
        }, {
          name: '高并发',
          owner: '鹰嘴豆',
          description: '高并发的基础理论'
        }, {
          name: '分布式',
          owner: '鹰嘴豆',
          description: '分布式在Web的应用'
        }, {
          name: '架构',
          owner: '王小虎',
          description: '架构师实战之路'
        }]
      }
    },
    components: {
      customCard02: () => import('@/components/custom-card-02')
    },
    methods: {
      handleClick() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge {
    &__block {
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        list-style: none;
        padding: 0px;
        li {
          margin-bottom: 15px;
        }
      }
      &__item {
        width: 300px;
        height: 230px;
        padding: 10px 15px;
        .item__header {
          display: flex;
          height: 68px;
          align-items: center;
          border-bottom: 1px solid #e8e8e8;
          img {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            object-fit: cover;
          }
          .item_right {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            margin-left: 15px;
            width: 230px;
            span {
              display: block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            span:nth-of-type(1) {
              font-size: 13px;
              font-weight: 400;
              color: #333;
            }
            span:nth-of-type(2) {
              font-size: 12px;
              color: #8c8c8c;
            }
          }
        }
        .item__body {
          margin-top: 15px;
          ul {
            display: flex;
            flex-direction: column;
            padding: 0px;
            margin-left: 16px;
            li {
              position: relative;
              display: flex;
              justify-content: space-between;
              line-height: 21px;
              color: #8c8c8c;
              &:before {
                content: "";
                width: 4px;
                height: 4px;
                border-radius: 4px;
                background-color: #8c8c8c;
                position: absolute;
                left: -16px;
                top: 50%;
                margin-top: -2px;
              }
              span:nth-of-type(1) {
                overflow: hidden;
                margin-right: 5px;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              span:nth-of-type(2) {
                color: #bfbfbf;
                min-width: 80px;
              }
            }
          }
        }
      }
    }
    &__list {

    }
  }
</style>
