<template>
  <div class="knowledge-detail w1200">
    <div class="top-panel">
      <site-nav>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index/knowledge' }">知识库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/knowledge/detail' }">vue文档</el-breadcrumb-item>
        </el-breadcrumb>
      </site-nav>
      <div class="btn-panel">
        <el-button class="btn" type="primary" size="small" @click="showCover=false">管理</el-button>
        <el-button class="btn" type="primary" size="small" @click="createArticle">新建文档</el-button>
      </div>
    </div>
    <div class="knowledge-detail__container" v-if="showCover">
      <div class="knowledge-detail__header">
        <h1 class="cover-title">
          <span>Vue文档</span>
        </h1>
        <div class="cover-descr">
          <span>vue开发技能</span>
        </div>
        <div class="cover-author">
          <ul>
            <li>
              <img :src="require('./assets/author01.jpg')">
            </li>
          </ul>
        </div>
      </div>
      <div class="knowledge-detail__body">
        <ul>
          <li v-for="index in 12" :key="index">
            <span class="name">实战卖酒官网搭建</span>
            <span class="line"></span>
            <span class="author">鹰嘴豆</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="knowledge-manager" v-else>
      <div class="manager-header">
        <div class="info">
          <h2><span>管理</span></h2>
          <span class="extra">共10个文档</span>
        </div>
        <div class="search">
          <el-input
            size="small"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          >
          </el-input>
        </div>
      </div>
      <div class="manager-body">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="所有文档"
            width="120">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建者"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <i class="el-icon-edit-outline"></i>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="more el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                  <el-dropdown-item>复制</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'knowledgeDetail',
    data() {
      return {
        showCover: true,
        tableData: [{
          name: '卖酒官网搭建',
          status: '未发布',
          creator: '鹰嘴豆',
          updateTime: '2019-05-16'
        }, {
          name: '卖酒官网搭建',
          status: '未发布',
          creator: '鹰嘴豆',
          updateTime: '2019-05-16'
        }]
      }
    },
    methods: {
      createArticle() {
        this.$router.push({ path: '/article/editor' })
      }
    },
    components: {
      siteNav: () => import('@/components/site-nav')
    }
  }
</script>

<style lang="scss" scoped>
  .knowledge-detail {
    .top-panel {
      display: flex;
      justify-content: space-between;
      .btn-panel {
        display: inline-flex;
        align-self: center;
        .btn {
          margin-right: 15px;
        }
      }
    }
    .knowledge-manager {
      border-radius: 5px;
      border: 1px solid #e8e8e8;
      padding: 15px;
      background: #fff;
      .manager-header {
        display: flex;
        justify-content: space-between;
        .info {
          display: flex;
          align-items: center;
          h2 {
            font-size: 18px;
          }
          .extra {
            margin-left: 15px;
            font-size: 12px;
            font-weight: 500;
            color: #595959;
          }
        }
        .search {

        }
      }
      .manager-body {
        i {
          margin-right: 10px;
        }
        .more {
          transform:rotate(90deg);
          -ms-transform:rotate(90deg);
          -webkit-transform:rotate(90deg);
        }
      }
    }
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      border: 1px solid #e8e8e8;
      padding: 88px 0 64px;
      background: #fff;
    }
    &__header {
      display: flex;
      width: 700px;
      flex-direction: column;
      align-items: center;
      .cover-title {
        color: #262626;
        font-size: 24px;
      }
      .cover-descr {
        margin-top: 10px;
        font-size: 14px;
        color: #595959;
        line-height: 24px;
      }
      .cover-author {
        margin-top: 10px;
        ul {
          display: flex;
          list-style: none;
          padding: 0px;
          li {
            margin-right: 10px;
            img {
              width: 30px;
              height: 30px;
              border: 2px solid darkgoldenrod;
              border-radius: 50%;
            }
          }
        }
      }
    }
    &__body {
      width: 700px;
      ul {
        list-style: none;
        padding: 0px;
        li {
          position: relative;
          display: flex;
          align-items: center;
          height: 40px;
          .name {
            display: block;
            flex-shrink: 0;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 700;
            color: #595959;
          }
          .line {
            display: block;
            flex-grow: 1;
            height: 1px;
            align-self: center;
            border-bottom: 1px dashed #e8e8e8;
            margin: 0px 15px;
          }
          .author {
            flex-shrink: 0;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
            color: #bfbfbf;
          }
        }
      }
    }
  }
</style>
