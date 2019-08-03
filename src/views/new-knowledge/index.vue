<template>
  <div class="knowledge-panel">
    <el-card>
      <div class="knowledge-panel__container  w1200">
        <div class="knowledge-panel__info">
          <el-form ref="knowledgeForm" :rules="rules" :model="formData" class="form" label-position="top" size="small" label-width="80px">
            <el-form-item label="名称" prop="kname">
              <el-input placeholder="知识库名称" v-model="formData.kname"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="kdesc">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="知识库的简括"
                v-model="formData.kdesc">
              </el-input>
            </el-form-item>
            <el-form-item label="封面" prop="kurl">
              <common-upload ref="commonUpload" type="knowledge_cover" :iurl = "formData.kurl"></common-upload>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属分类" prop="ktype">
                  <el-select v-model="formData.ktype" filterable placeholder="请选择">
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
                <el-form-item label="可见范围" style="margin-left: 10px;" prop="kaccess">
                  <el-select v-model="formData.kaccess" placeholder="请选择" @change="accessChange">
                    <el-option label="私有" value="1"></el-option>
                    <el-option label="公开" value="2"></el-option>
                    <el-option label="加密" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="密码" prop="kreserveO" v-if="formData.kaccess==='3'">
              <el-input placeholder="输入密码" v-model="formData.kreserveO"></el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="confirm">保存</el-button>
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
  import { mapGetters } from 'vuex'
  import { searchCategory } from '@/api/category'
  import { saveKnowledge, editKnowledge, editShareKnowledge, knowledgeItem } from '@/api/knowledge'
  export default {
    name: 'newKnowledge',
    data() {
      return {
        categoryList: [],
        operateType: 'save',
        knowledgeId: '',
        power: [],
        formData: {
          kname: '',
          kdesc: '',
          kurl: '',
          kaccess: '2',
          ktype: '',
          kreserveO: ''
        },
        rules: {
          kname: [
            // 同一个校验字段里面trigger必须保持相同
            { required: true, message: '知识库名字不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 20, message: '知识库名字不能超过20个字符', trigger: ['blur', 'change'] }
          ],
          kdesc: [
            // 同一个校验字段里面trigger必须保持相同
            { required: true, message: '知识库描述不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 300, message: '知识库名字不能超过300个字符', trigger: ['blur', 'change'] }
          ],
          ktype: [
            { required: true, message: '类型不能为空', trigger: ['blur', 'change'] }
          ],
          kreserveO: [
            { required: true, message: '密码不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 20, message: '密码不能超过20个字符', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    components: {
      commonUpload: () => import('@/components/common-upload')
    },
    computed: {
      ...mapGetters([
        'pageMenus'
      ])
    },
    watch: {
      pageMenus: {
        handler(newMenus) {
          if (newMenus) {
            this.power = newMenus['/platform/blog/center/knowledge']
          }
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    mounted() {
      this.knowledgeId = this.$route.query.knowledgeId
      if (this.knowledgeId) {
        this.searchKnowledge(this.knowledgeId)
      }
      this.searchCategory()
    },
    methods: {
      accessChange() {
        this.formData.kreserveO = ''
      },
      searchKnowledge(knowledgeId) {
        knowledgeItem({ knowledgeId: knowledgeId }).then(res => {
          if (res.flag) {
            this.formData.kname = res.data.knowledgeName
            this.formData.kdesc = res.data.knowledgeDesc
            this.formData.kurl = res.data.knowledgeCover
            this.formData.kaccess = res.data.knowledgeAccess
            this.formData.ktype = res.data.categoryType
            this.formData.kreserveO = res.data.reserveO
          }
        })
      },
      searchCategory() {
        searchCategory().then(res => {
          if (res.flag) {
            this.categoryList = res.data
          }
        })
      },
      confirm() {
        this.$refs['knowledgeForm'].validate((valid) => {
          if (valid) {
            let params = {}
            params.kname = this.formData.kname
            params.kdesc = this.formData.kdesc
            params.kurl = this.$refs.commonUpload.retriveImgUrl()
            params.kaccess = this.formData.kaccess
            params.ktype = this.formData.ktype
            params.kreserveO = this.formData.kreserveO
            params.id = this.knowledgeId
            let operMethod = this.knowledgeId ? this.power['共享更新'] ? editShareKnowledge : editKnowledge : saveKnowledge
            operMethod(params).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.knowledgeId ? '修改' : '创建'}知识库成功`,
                  type: 'success'
                })
                this.visible = false
                this.initForm()
                setTimeout(() => {
                  this.$router.push({ path: '/platform/blog/center/knowledge' })
                }, 3 * 1000 + 1)
              }
            })
          }
        })
      },
      initForm() {
        this.formData = {
          kname: '',
          kdesc: '',
          kurl: '',
          kaccess: '2',
          ktype: '',
          kreserveO: ''
        }
        this.$refs.knowledgeForm.resetFields()
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
