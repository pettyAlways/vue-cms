<template>
  <el-card class="category">
    <custom-card02 title="参与的分类">
      <template slot="more">
        <i class="font-size-24 el-icon-circle-plus-outline" @click="add"></i>
      </template>
      <div class="table-container">
        <el-table
          class="categoryTable"
          :data="datas"
          stripe
          style="width: 100%">
          <el-table-column
            prop="categoryName"
            label="分类名称">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="inUseName"
            label="启用">
          </el-table-column>
          <el-table-column
            prop="categoryDesc"
            label="描述"
            min-width="180"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button v-if="noAuthShowBtn || power['组织新增']" class="ml10" type="text"  @click="edit(scope.row)">编辑</el-button>
              <el-button v-if="noAuthShowBtn || power['组织新增']" class="ml10 del" type="text" @click="deleteCategoy(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </custom-card02>
    <common-dialog :title="dialogTitle[dialogType]" :visible="visible" :hasButton="true" @cancel="cancel" @confirm="confirm">
      <el-form :rules="rules" ref="categoryForm" :model="formData" label-width="80px">
        <el-form-item label="分类名" prop="categoryName">
          <el-input v-model="formData.categoryName"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否启用" prop="inUse">
              <el-select v-model="formData.inUse">
                <el-option label="启用" value="1"></el-option>
                <el-option label="未启用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="formData.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="formData.categoryDesc"></el-input>
        </el-form-item>
      </el-form>
    </common-dialog>
  </el-card>
</template>

<script>
  import { deleteCategory, saveCategory, editCategory, searchCategory } from '@/api/category'
  import { mapGetters } from 'vuex'
  export default {
    name: 'category',
    data() {
      return {
        visible: false,
        dialogType: '',
        dialogTitle: { save: '新增分类', edit: '修改分类' },
        datas: [],
        formData: {
          id: '',
          categoryName: '',
          inUse: '1',
          categoryDesc: '',
          sort: ''
        },
        rules: {
          categoryName: [
            // 同一个校验字段里面trigger必须保持相同
            { required: true, message: '分类名字不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 20, message: '用户名不能超过20个字符', trigger: ['blur', 'change'] }
          ],
          desc: [
            { min: 0, max: 50, message: '账号不能超过50个字符', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    components: {
      customCard02: () => import('@/components/custom-card-02'),
      commonDialog: () => import('@/components/common-dialog')
    },
    mounted() {
      this.searchDatas()
    },
    computed: {
      ...mapGetters([
        'pageMenus',
        'sysParam'
      ]),
      noAuthShowBtn() {
        return this.sysParam['no_auth_represent'] === 'represent'
      }
    },
    watch: {
      pageMenus: {
        handler(newMenus) {
          this.power = newMenus[this.$route.path]
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    methods: {
      deleteCategoy(id) {
        let _this = this
        this.$confirm('请确认删除当前数据', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              deleteCategory({ categoryId: id }).then(res => {
                if (res.flag) {
                  _this.$message({
                    type: 'success',
                    message: '删除成功'
                  })
                  _this.searchDatas()
                }
              })
            }
          }
        })
      },
      edit(row) {
        this.visible = true
        this.dialogType = 'edit'
        this.formData = {
          id: row.id,
          categoryName: row.categoryName,
          inUse: row.inUse,
          categoryDesc: row.categoryDesc,
          sort: row.sort
        }
      },
      add() {
        this.dialogType = 'save'
        // 会将初始化的值设置并校验因此移除开始的校验
        this.$nextTick(() => {
          this.$refs.categoryForm.clearValidate()
        })
        this.formData.sort = this.generateMaxSort()
        this.visible = true
      },
      generateMaxSort() {
        let index = 0
        for (let item of this.datas) {
          if (item.sort > index) {
            index = item.sort
          }
        }
        index = ++index || 1
        return index
      },
      confirm() {
        this.$refs['categoryForm'].validate((valid) => {
          if (valid) {
            let operMethod = this.dialogType === 'save' ? saveCategory : editCategory
            operMethod(this.formData).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.dialogType === 'save' ? '新增' : '修改'}分类成功`,
                  type: 'success'
                })
                this.visible = false
                this.initForm()
                this.searchDatas()
              }
            })
          }
        })
      },
      searchDatas() {
        if (this.$loadingHelper.startLoading('.categoryTable')) {
          searchCategory().then(res => {
            this.$loadingHelper.stopLoading()
            if (res.flag) {
              this.loading = false
              this.datas = res.data
              this.datas.map(item => {
                item.inUseName = ['未知', '启用', '未启用'][item.inUse]
              })
            }
          })
        }
      },
      cancel() {
        this.initForm()
        this.visible = false
      },
      initForm() {
        this.formData = {
          id: '',
          categoryName: '',
          inUse: '1',
          categoryDesc: '',
          sort: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category {
    .font-size-24 {
      font-size: 24px;
    }
    .table-container {
      min-height: 350px;
    }
  }
</style>
