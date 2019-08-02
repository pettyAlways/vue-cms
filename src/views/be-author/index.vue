<template>
  <el-container class="login-container">
    <div class="site-title">
      <icon-svg iconClass="laoying" :vStyle="{width: '5em', height: '5em'}"></icon-svg>
      <p class="title">欢迎申请成为鹰嘴豆网站的作者</p>
    </div>
    <div class="author-form">
      <el-card>
        <div slot="header">
          <h2 class="login-title">申请理由</h2>
        </div>
        <div class="body">
          <el-form :rules="rules" ref="auditForm" :model="auditForm" label-width="0px">
            <el-form-item prop="reason">
              <el-input type="textarea" v-model="auditForm.reason" style="height: 300px"
                        placeholder="请输出50-100个字简单介绍自己和加入的理由"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="submitAudit">提交</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </el-container>
</template>
<script>
  import { postAudit } from '../../api/audit'

  export default {
    data() {
      // pwd 验证
      return {
        auditForm: {
          reason: '',
          applyUser: ''
        },
        rules: {
          reason: [
            { required: true, message: '请输入申请理由', trigger: ['blur', 'change'] },
            { min: 50, max: 100, message: '请输入 50 - 100 个字符串', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    methods: {
      submitAudit() {
        this.$refs['auditForm'].validate((valid) => {
          if (valid) {
            postAudit(this.auditForm).then(res => {
              if (res.flag) {
                this.$message({
                  message: '已经提交审批',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push({ path: '/index' })
                }, 1000 * 3)
              }
            })
          }
        })
      }
    },
    mounted() {
      this.auditForm.applyUser = this.$route.params.userId
    }
  }
</script>
<style scoped lang="scss">
  $dark_gray:#889aa4;
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f3f3f3;
    .site-title {
      position: absolute;
      top: 50px;
      left: calc(50% - 180px);
      display: flex;
      height: 60px;
      line-height: 80px;
      .title {
        font-size: 18px;
        font-weight: 700;
      }
    }
    .author-form {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      .el-card {
        width: 900px;
        height: 450px;
        background: #f9f9f9;
        .login-title {
          margin: 0;
          text-align: center;
        }
        .body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          /deep/ .el-textarea__inner {
            height: 100%;
          }
          .btn {
            margin: 0px auto;
          }
        }
      }
    }

  }
</style>
