<template>
  <div class="knowledge-panel">
    <el-card>
      <div class="knowledge-panel__container  w1200">
        <div class="knowledge-panel__info">
          <el-form ref="knowledgeForm" :rules="rules" :model="formData" class="form" label-position="top" size="small" label-width="80px">
            <el-form-item label="名称" prop="kName">
              <el-input placeholder="知识库名称" v-model="formData.kName"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="kDesc">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="知识库的简括"
                v-model="formData.kDesc">
              </el-input>
            </el-form-item>
            <el-form-item label="封面" prop="kUrl">
              <common-upload ref="commonUpload" type="knowledge_cover"></common-upload>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属分类" prop="kType">
                  <el-select v-model="formData.kType" filterable placeholder="请选择">
                    <el-option
                      v-for="item in categoryList"
                      :key="item.id"
                      :label="item.categoryName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="可见范围" style="margin-left: 10px;" prop="kAccess">
                  <el-select v-model="formData.kAccess" placeholder="请选择">
                    <el-option label="私有" value="1"></el-option>
                    <el-option label="公开" value="2"></el-option>
                    <el-option label="加密" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="密码" prop="kReserveO" v-if="formData.kAccess==='3'">
              <el-input placeholder="输入密码" v-model="formData.kReserveO"></el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="confirm">新建</el-button>
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
  import { searchCategory } from '@/api/category'
  import { saveKnowledge, editKnowledge } from '@/api/knowledge'
  export default {
    name: 'newKnowledge',
    data() {
      return {
        categoryList: [],
        operateType: 'save',
        formData: {
          kName: '',
          kDesc: '',
          kUrl: '',
          kAccess: '2',
          kType: '',
          kReserveO: ''
        },
        rules: {
          kName: [
            // 同一个校验字段里面trigger必须保持相同
            { required: true, message: '知识库名字不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 20, message: '知识库名字不能超过20个字符', trigger: ['blur', 'change'] }
          ],
          kType: [
            { required: true, message: '类型不能为空', trigger: ['blur', 'change'] }
          ],
          kReserveO: [
            { required: true, message: '密码不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 20, message: '密码不能超过20个字符', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    components: {
      commonUpload: () => import('@/components/common-upload')
    },
    mounted() {
      searchCategory().then(res => {
        if (res.flag) {
          this.categoryList = res.data
        }
      })
    },
    methods: {
      confirm() {
        this.$refs['knowledgeForm'].validate((valid) => {
          if (valid) {
            let operMethod = this.operateType === 'save' ? saveKnowledge : editKnowledge
            this.formData.kUrl = this.$refs.commonUpload.retriveImgUrl()
            operMethod(this.formData).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.operateType === 'save' ? '创建' : '修改'}知识库成功`,
                  type: 'success'
                })
                this.visible = false
                this.initForm()
                setTimeout(() => {
                  this.$router.push({ path: '/platform/blog/knowledge' })
                }, 3 * 1000 + 1)
              }
            })
          }
        })
      },
      initForm() {
        this.formData = {
          kName: '',
          kDesc: '',
          kUrl: '',
          kAccess: '2',
          kType: '',
          kReserveO: ''
        }
      }
    }
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
        width: 450px;
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
