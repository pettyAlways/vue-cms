<template>
  <el-row class="user-manage">
    <el-col :span="5" class="resource-tree">
      <el-input
        placeholder="输入关键字进行过滤"
        size="small"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="orgTree"
        node-key="id"
        :props="defaultProps"
        highlight-current
        :default-expanded-keys="expandKey"
        :expand-on-click-node="false"
        @node-click="nodeClick"
        :filter-node-method="filterNode"
        ref="aTree">
        <span style="display: flex; flex-direction: row; align-items: center" slot-scope="{ node, data }">
           <icon-svg :iconClass="treeIcon[data.children.length ? 0 : 1]"></icon-svg>
           <span style="margin-left: 5px">{{node.label}}</span>
        </span>
      </el-tree>
    </el-col>
    <el-col :span="19" class="resource-represent">
      <div class="search-form">
        <el-form :inline="true" :model="userSearchForm" class="demo-form-inline" size="small">
          <el-form-item label="姓名">
            <el-input v-model="userSearchForm.userName" placeholder="模糊匹配姓名"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="userSearchForm.userAccount" placeholder="模糊匹配账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="searchForm">查询</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="initUserSearchForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row class="operate-btn-group" type="flex" justify="start">
        <el-button v-if="noAuthShowBtn || power['用户新增']" type="primary" icon="el-icon-circle-plus" size="small" @click="add">新增</el-button>
        <el-button v-if="noAuthShowBtn || power['用户删除']" type="primary" icon="el-icon-delete" size="small" @click="batchDelete">批量删除</el-button>
      </el-row>
      <div class="table-represent">
        <el-table
          class="role-manage-table"
          :data="userList"
          @selection-change="selectDelIds"
          stripe>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="55">
            <template slot-scope="scope">
              {{(paging.page-1) * paging.size + scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
            prop="userAccount"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="userAccount"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="userStatusName"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="userSexName"
            label="性别">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <el-button v-if="noAuthShowBtn || power['用户更新']" type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button v-if="noAuthShowBtn || power['用户删除']" type="text" size="small" @click="curDelete(scope.row.id)">删除</el-button>
              <el-button v-if="noAuthShowBtn || power['用户查询']" type="text" size="small" @click="view(scope.row)">查看</el-button>
              <el-button v-if="noAuthShowBtn || power['用户赋角']" type="text" size="small" @click="auth(scope.row)">赋角</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="userList.length !== 0" type="flex" justify="center" class="table-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paging.page"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="paging.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paging.total"
            background>
          </el-pagination>
        </el-row>
      </div>
    </el-col>
    <common-dialog :title="dialogTitle[dialogType]" :visible="visible" @cancel="cancel" @confirm="confirm" :hasButton="!isView">
      <el-form :rules="rules" ref="userForm" :model="userForm" label-width="80px">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="userForm.userName" :disabled="isView"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="userSex">
              <el-select v-model="userForm.userSex" :disabled="isView">
                <el-option label="未知" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
                <el-option label="男" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户状态" prop="userStatus">
              <el-select v-model="userForm.userStatus" :disabled="isView">
                <el-option label="正常" value="1"></el-option>
                <el-option label="锁定" value="2"></el-option>
                <el-option label="禁用" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="账号" prop="userAccount">
          <el-input v-model="userForm.userAccount" :disabled="isView"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="userForm.userPassword" :disabled="isView"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="userTel">
          <el-input v-model="userForm.userTel" :disabled="isView"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="userMail">
          <el-input v-model="userForm.userMail" :disabled="isView"></el-input>
        </el-form-item>
      </el-form>
    </common-dialog>
    <common-dialog title="用户授权" :visible="authVisible" @cancel="authCancel" @confirm="authConfirm" :hasButton="true">
      <common-transfer ref="authTransfer" :titles="authorTitles"></common-transfer>
    </common-dialog>
  </el-row>
</template>

<script>
  import { list, save, edit, deleteAll, authUser } from '../../api/user'
  import { loadOrgTree } from '../../api/organization'
  import { telValidate } from '../../utils/validate'
  import { mapGetters } from 'vuex'
  export default {
    name: 'userManage',
    data() {
      return {
        loading: false,
        paging: {
          page: 1,
          total: 0,
          size: 10
        },
        userSearchForm: {
          userName: '',
          userAccount: ''
        },
        selectionIds: [],
        userList: [],
        filterText: '',
        orgTree: [],
        expandKey: [],
        curNode: '',
        userForm: {
          userName: '',
          userSex: '0',
          userAccount: '',
          userPassword: '',
          userStatus: '1',
          userTel: '',
          userMail: ''
        },
        rules: {
          userName: [
            // 同一个校验字段里面trigger必须保持相同
            { required: true, message: '用户名字不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 30, message: '用户名不能超过30个字符', trigger: ['blur', 'change'] }
          ],
          userAccount: [
            { required: true, message: '账号不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 30, message: '账号不能超过30个字符', trigger: ['blur', 'change'] }
          ],
          userPassword: [
            { required: true, message: '密码不能为空', trigger: ['blur', 'change'] },
            { min: 0, max: 255, message: '密码不能超过255个字符', trigger: ['blur', 'change'] }
          ],
          userMail: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          userTel: [
            { validator: telValidate, trigger: ['blur', 'change'] }
          ]
        },
        dialogType: '',
        dialogTitle: { save: '新增用户', edit: '修改用户', view: '查看用户' },
        visible: false,
        authVisible: false,
        viewVisible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        authorTitles: ['待选角色', '已选角色'],
        curAuthUser: '',
        treeIcon: ['folder', 'file'],
        power: []
      }
    },
    watch: {
      filterText(val) {
        this.$refs.aTree.filter(val)
      },
      pageMenus: {
        handler(newMenus) {
          this.power = newMenus[this.$route.path]
        },
        // 不管有没有变化立即执行
        immediate: true,
        deep: true
      }
    },
    computed: {
      ...mapGetters([
        'pageMenus',
        'sysParam'
      ]),
      isView() {
        return this.dialogType === 'view'
      },
      noAuthShowBtn() {
        return this.sysParam['no_auth_represent'] === 'represent'
      }
    },
    components: {
      commonDialog: () => import('@/components/common-dialog'),
      commonTransfer: () => import('@/components/common-transfer')
    },
    mounted() {
      this.loadPrepresentData()
    },
    methods: {
      // 用户授权
      authUser(data) {
        authUser(data).then(res => {
          if (res.flag) {
            this.$message({
              type: 'success',
              message: '授权成功'
            })
            this.authVisible = false
          }
        })
      },
      authCancel() {
        this.authVisible = false
        // 通过ref引用对象调用第三方组件方法
        console.log(this.$refs)
        this.$refs.authTransfer.clearTransfer()
      },
      authConfirm() {
        let chooseRole = this.$refs.authTransfer.acquireChoooseRole()
        // 等授权结果完成在关闭对话框
        this.authUser({ roles: chooseRole, id: this.curAuthUser })
      },
      // 资源授权
      async auth(item) {
        this.dialogType = 'auth'
        this.authVisible = true
        this.curAuthUser = item.id
        this.$nextTick(() => {
          this.$refs.authTransfer.loadRoleInfomation(item.id)
        })
      },
      view(item) {
        this.dialogType = 'view'
        this.userForm = {
          userName: item.userName,
          userSex: item.userSex,
          userAccount: item.userAccount,
          userPassword: item.userPassword,
          userStatus: item.userStatus,
          userTel: item.userTel,
          userMail: item.userMail
        }
        this.visible = true
      },
      add() {
        this.dialogType = 'save'
        this.visible = true
        // 会将初始化的值设置并校验因此移除开始的校验
        this.$nextTick(() => {
          this.$refs.userForm.clearValidate()
        })
      },
      edit(item) {
        this.visible = true
        this.dialogType = 'edit'
        this.userForm = {
          userName: item.userName,
          userSex: item.userSex,
          userAccount: item.userAccount,
          userPassword: item.userPassword,
          userStatus: item.userStatus,
          userTel: item.userTel,
          userMail: item.userMail,
          id: item.id
        }
      },
      curDelete(id) {
        let _this = this
        this.$confirm('请确认删除当前数据', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              deleteAll([id]).then(res => {
                if (res.flag) {
                  _this.$message({
                    type: 'success',
                    message: '删除成功'
                  })
                  _this.loadPrepresentData()
                }
              })
            }
          }
        })
      },
      batchDelete() {
        if (!this.selectionIds.length) {
          this.$message({
            type: 'error',
            message: '请勾选要删除的用户'
          })
          return
        }
        let _this = this
        this.$confirm('请确认删除当前数据', '确认删除', {
          callback(action) {
            if (action === 'confirm') {
              deleteAll(_this.selectionIds).then(res => {
                if (res.flag) {
                  _this.$message({
                    type: 'success',
                    message: '删除成功'
                  })
                  _this.loadPrepresentData()
                }
              })
            }
          }
        })
      },
      selectDelIds(val) {
        this.selectionIds = val.map(item => item.id)
      },
      async loadPrepresentData() {
        // await必须是Promise对象才有意义（等待resolve的返回）
        let curNodeId = await this.loadTree()
        // 异步加载需要时间，在这个事件内切换其他模块当前的this注销，则这个树引用找不到，所以需要判断
        if (this.$refs.aTree) {
          this.$refs.aTree.setCurrentKey(curNodeId)
        }
        this.loadUser({ userDepart: curNodeId, ...this.paging })
      },
      // 树节点切换时一些公用数据重置
      switchNodeClear() {
        this.paging = {
          page: 1,
          total: 0,
          size: 10
        }
        this.orgSearchForm = {
          orgName: ''
        }
      },
      loadTree() {
        return new Promise(resolve => {
          loadOrgTree().then(res => {
            if (res.flag) {
              this.orgTree = [res.data]
              this.curNode = this.curNode || res.data
              this.expandKey.push(this.curNode.id)
              resolve(this.curNode.id)
            }
          })
        })
      },
      initForm() {
        this.userForm = {
          userName: '',
          userSex: '0',
          userAccount: '',
          userPassword: '',
          userStatus: '1',
          userTel: '',
          userMail: ''
        }
        this.$refs.userForm.clearValidate()
      },
      initUserSearchForm() {
        this.userSearchForm = {
          userName: '',
          userAccount: ''
        }
      },
      cancel() {
        this.initForm()
        this.visible = false
      },
      confirm() {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            this.userForm.userDepart = this.curNode.id
            let operMethod = this.dialogType === 'save' ? save : edit
            operMethod(this.userForm).then(res => {
              if (res.flag) {
                this.$message({
                  message: `${this.dialogType === 'save' ? '新增' : '修改'}用户成功`,
                  type: 'success'
                })
                this.loadUser({ userDepart: this.curNode.id, ...{ page: this.paging.page, size: this.paging.size } })
                this.loadTree()
                this.visible = false
                this.initForm()
              }
            })
          }
        })
      },
      searchForm() {
        let params = { userDepart: this.curNode.id, ...{ page: 1, size: this.paging.size }, ...this.userSearchForm }
        this.loadUser(params)
      },
      loadUser(params) {
        if (this.$loadingHelper.startLoading('.resource-represent')) {
          list(params).then(res => {
            this.$loadingHelper.stopLoading()
            if (res.flag) {
              this.loading = false
              this.userList = res.data.users
              this.userList.map(item => {
                item.userSexName = ['未知', '女', '男'][item.userSex]
                item.userStatusName = ['', '正常', '锁定', '禁用'][item.userStatus]
              })
              this.paging.total = res.counts
            }
          })
        }
      },
      // 树节点切换处理
      nodeClick(item) {
        this.switchNodeClear()
        this.curNode = item
        let params = { userDepart: this.curNode.id, ...this.paging }
        this.loadUser(params)
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleSizeChange(val) {
        this.paging.size = val
        let params = { userDepart: this.curNode.id, ...{ page: this.paging.page, size: this.paging.size }, ...this.orgSearchForm }
        this.loadUser(params)
      },
      handleCurrentChange(val) {
        this.paging.page = val
        let params = { userDepart: this.curNode.id, ...{ page: this.paging.page, size: this.paging.size }, ...this.orgSearchForm }
        this.loadUser(params)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .user-manage {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    .resource-represent {
      padding: 0px 10px;
    }
  }
</style>
