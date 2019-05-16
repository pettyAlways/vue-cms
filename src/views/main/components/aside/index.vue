<template>
  <div class="aside-panel">
    <ul>
      <li>
        <i class="el-icon-s-home"></i>
        <router-link :to="{ path: '/index/workbench' }">工作台</router-link>
      </li>
      <li>
        <i class="el-icon-postcard"></i>
        <router-link :to="{ path: '/index/category' }">分类</router-link>
      </li>
      <li>
        <i class="el-icon-reading"></i>
        <router-link :to="{ path: '/index/knowledge' }">知识库</router-link>
      </li>
      <li>
        <i class="el-icon-document"></i>
        <a>文档</a>
      </li>
      <li>
        <i class="el-icon-s-data"></i>
        <a>审核</a>
      </li>
      <li>
        <i class="el-icon-message"></i>
        <a>消息</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'asideNav'
  }
</script>

<style lang="scss" scoped>
  .aside-panel {
    ul {
      list-style: none;
      padding: 0px;
      li {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 16px;
        i {
          margin-right: 10px;
        }

      }
    }
  }
</style>
