<template>
  <el-card class="category">
    <custom-card02 title="参与的分类">
      <template slot="more">
        <i class="el-icon-collection"></i>
      </template>
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
    </custom-card02>
  </el-card>
</template>

<script>
  export default {
    name: 'category',
    data() {
      return {
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
