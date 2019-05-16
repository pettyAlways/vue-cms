<template>
  <div class="knowledge-panel">
    <el-card>
      <div class="knowledge-panel__container  w1200">
        <div class="knowledge-panel__info">
          <el-form class="form" label-position="top" size="small" label-width="80px">
            <el-form-item label="名称">
              <el-input placeholder="知识库名称"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="知识库的简括"
                v-model="textarea">
              </el-input>
            </el-form-item>
            <el-form-item label="所属分类">
              <el-select v-model="value" placeholder="请选择">
              </el-select>
            </el-form-item>
            <el-form-item label="可见范围">
              <el-select v-model="value" placeholder="请选择">
                <el-option value="仅自己可见"></el-option>
                <el-option value="公开"></el-option>
                <el-option value="加密"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" style="width: 100%">新建</el-button>
          </el-form>
        </div>
        <div class="knowledge-panel__cover">
          <img :src="require('./assets/bg01.jpg')">
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style lang="scss" scoped>
  .knowledge-panel {
    margin: 15px auto;

    &__container {
      display: flex;
    }
    &__info {
      display: flex;
      justify-content: center;
      flex-shrink: 0;
      width: 600px;
      border-right: 2px solid #e8e8e8;
      .form {
        width: 400px;
      }
    }
    &__cover {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
      img {
        width: 200px;
        height: 200px;
      }
    }
  }
</style>
