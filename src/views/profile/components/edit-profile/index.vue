<template>
  <div class="edit-profile">
    <ul>
      <li>
        <span class="left-label">昵称</span>
        <div class="userNameContent" @mouseenter="username.hover = true" @mouseleave="username.hover = false">
          <div class="showContent" v-if="!username.panelShow">
            <span class="sex-value">{{userProfile.userName}}</span>
            <div class="btn-panel" v-if="username.hover || !userProfile.userName" @click="username.panelShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
          </div>
          <div v-else>
            <el-form ref="userNameForm" :model="userProfile" :inline="true" :rules="rules">
              <el-form-item  prop="username">
                <el-input style="width: 240px" v-model="userProfile.userName" placeholder="请输入您的昵称"></el-input>
              </el-form-item>
              <el-button type="text" @click="saveUsername" style="margin-left: 15px;">保存</el-button>
              <el-button type="text" @click="username.panelShow = false">取消</el-button>
            </el-form>
          </div>
        </div>
      </li>
      <li>
        <span class="left-label">性别</span>
        <div class="sexContent" @mouseenter="sex.hover = true" @mouseleave="sex.hover = false">
          <div class="showContent" v-if="!sex.panelShow">
            <span class="sex-value">{{userProfile.sexName}}</span>
            <div class="btn-panel" v-if="sex.hover" @click="sex.panelShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
          </div>
          <div v-else>
            <el-radio-group v-model="userProfile.userSex">
              <el-radio :label="1">女</el-radio>
              <el-radio :label="2">男</el-radio>
            </el-radio-group>
            <el-button type="text" @click="saveSex" style="margin-left: 15px;">保存</el-button>
            <el-button type="text" @click="sex.panelShow = false">取消</el-button>
          </div>
        </div>
      </li>
      <li v-if="userProfile.thirdPartyId">
        <span class="left-label">账号绑定</span>
        <div class="accountContent">
          <div v-if="userProfile.isBind === 'Y'">
            <span class="account">{{userProfile.userAccount}}</span>
          </div>
          <div class="account-bind" v-else>
            <div v-if="!accountShow" class="btn-panel" @click="accountShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
            <el-form ref="accountForm" v-if="accountShow" :model="userProfile" :inline="true" :rules="rules">
              <el-form-item label="账号" prop="userAccount">
                <el-input v-model="userProfile.userAccount" placeholder="请输入需要绑定的账号"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userPassword">
                <el-input v-model="userProfile.userPassword" placeholder="请输入需要绑定的密码"></el-input>
              </el-form-item>
              <el-button type="text" @click="saveAccount" style="margin-left: 15px;">保存</el-button>
            </el-form>
          </div>
        </div>

      </li>
      <li>
        <span class="left-label">邮箱</span>
        <div class="mailContent" @mouseenter="mail.hover = true" @mouseleave="mail.hover = false">
          <div class="showContent" v-if="!mail.panelShow">
            <span class="sex-value">{{userProfile.userMail}}</span>
            <div class="btn-panel" v-if="mail.hover || !userProfile.userMail" @click="mail.panelShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
          </div>
          <div v-else>
            <el-form ref="mailForm" :model="userProfile" :inline="true" :rules="rules">
              <el-form-item  prop="userMail">
                <el-input v-model="userProfile.userMail" placeholder="请输入您的邮箱"></el-input>
              </el-form-item>
              <el-button type="text" @click="saveMail" style="margin-left: 15px;">保存</el-button>
              <el-button type="text" @click="mail.panelShow = false">取消</el-button>
            </el-form>
          </div>
        </div>
      </li>
      <li>
        <span class="left-label">技能</span>
        <div class="skillContent">
          <el-tag
            :key="index"
            v-for="(tag, index) in skill.skillList"
            closable
            :disable-transitions="false"
            @close="handleClose(tag.skillId)">
            {{tag.skillName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="skill.inputVisible"
            v-model="skill.inputValue"
            ref="skillTag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新技能</el-button>
        </div>
      </li>
      <li>
        <span class="left-label">个性签名</span>
        <div class="signContent" @mouseenter="sign.hover = true" @mouseleave="sign.hover = false">
          <div class="showContent" v-if="!sign.panelShow">
            <span class="sex-value">{{userProfile.signature}}</span>
            <div class="btn-panel" v-if="sign.hover || !userProfile.signature" @click="sign.panelShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
          </div>
          <div v-else>
            <el-form ref="signForm" :model="userProfile" :inline="true" :rules="rules">
              <el-form-item  prop="signature">
                <el-input style="width: 240px" v-model="userProfile.signature" placeholder="请输入你的个性签名"></el-input>
              </el-form-item>
              <el-button type="text" @click="saveSignature" style="margin-left: 15px;">保存</el-button>
              <el-button type="text" @click="sign.panelShow = false">取消</el-button>
            </el-form>
          </div>
        </div>
      </li>
      <li>
        <span class="left-label">自我介绍</span>
        <div class="introduceContent" @mouseenter="introduce.hover = true" @mouseleave="introduce.hover = false">
          <div class="showContent" v-if="!introduce.panelShow">
            <span class="sex-value">{{userProfile.introduce}}</span>
            <div class="btn-panel" v-if="introduce.hover || !userProfile.introduce" @click="introduce.panelShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
          </div>
          <div v-else>
            <el-form ref="introduceForm" :model="userProfile" :inline="true" :rules="rules">
              <el-form-item  prop="introduce">
                <el-input type="textarea" style="width: 340px" v-model="userProfile.introduce" placeholder="请输入您的个人介绍"></el-input>
              </el-form-item>
              <el-button type="text" @click="saveIntroduce" style="margin-left: 15px;">保存</el-button>
              <el-button type="text" @click="introduce.panelShow = false">取消</el-button>
            </el-form>
          </div>
        </div>
      </li>
      <li>
        <span class="left-label">职业</span>
        <div class="workContent" @mouseenter="work.hover = true" @mouseleave="work.hover = false">
          <div class="showContent" v-if="!work.panelShow">
            <span class="sex-value">{{userProfile.work}}</span>
            <div class="btn-panel" v-if="work.hover || !userProfile.work" @click="work.panelShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
          </div>
          <div v-else>
            <el-form ref="workForm" :model="userProfile" :inline="true" :rules="rules">
              <el-form-item  prop="work">
                <el-input style="width: 240px" v-model="userProfile.work" placeholder="请输入你的职业"></el-input>
              </el-form-item>
              <el-button type="text" @click="saveWork" style="margin-left: 15px;">保存</el-button>
              <el-button type="text" @click="work.panelShow = false">取消</el-button>
            </el-form>
          </div>
        </div>
      </li>
      <li>
        <span class="left-label">工作地点</span>
        <div class="placeContent" @mouseenter="place.hover = true" @mouseleave="place.hover = false">
          <div class="showContent" v-if="!place.panelShow">
            <span class="sex-value">{{userProfile.place}}</span>
            <div class="btn-panel" v-if="place.hover || !userProfile.place" @click="place.panelShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
          </div>
          <div v-else>
            <el-form ref="placeForm" :model="userProfile" :inline="true" :rules="rules">
              <el-form-item  prop="place">
                <el-input style="width: 240px" v-model="userProfile.place" placeholder="请输入你的工作城市"></el-input>
              </el-form-item>
              <el-button type="text" @click="savePlace" style="margin-left: 15px;">保存</el-button>
              <el-button type="text" @click="place.panelShow = false">取消</el-button>
            </el-form>
          </div>
        </div>
      </li>
      <li>
        <span class="left-label">爱好</span>
        <div class="hobbyContent" @mouseenter="hobby.hover = true" @mouseleave="hobby.hover = false">
          <div class="showContent" v-if="!hobby.panelShow">
            <span class="sex-value">{{userProfile.hobby}}</span>
            <div class="btn-panel" v-if="hobby.hover || !userProfile.hobby" @click="hobby.panelShow = true">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </div>
          </div>
          <div v-else>
            <el-form ref="hobbyForm" :model="userProfile" :inline="true" :rules="rules">
              <el-form-item  prop="hobby">
                <el-input style="width: 240px" v-model="userProfile.hobby" placeholder="请输入你的爱好"></el-input>
              </el-form-item>
              <el-button type="text" @click="saveHobby" style="margin-left: 15px;">保存</el-button>
              <el-button type="text" @click="hobby.panelShow = false">取消</el-button>
            </el-form>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import { retrieveUserProfileExtra, addUserSkill, delUserSkill, saveUserInfo, bindUserAccount } from '../../../../api/user'
  import { mapActions } from 'vuex'
  export default {
    name: 'profile',
    data() {
      let validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'))
        } else {
          if (!/^[\w]{6,30}$/.test(value)) {
            callback(new Error('账号为a-z|A-Z|0-9组成的6-30个字符'))
          }
          callback()
        }
      }
      return {
        userId: '',
        sex: {
          hover: false,
          panelShow: false
        },
        mail: {
          hover: false,
          panelShow: false
        },
        sign: {
          hover: false,
          panelShow: false
        },
        introduce: {
          hover: false,
          panelShow: false
        },
        work: {
          hover: false,
          panelShow: false
        },
        place: {
          hover: false,
          panelShow: false
        },
        hobby: {
          hover: false,
          panelShow: false
        },
        username: {
          hover: false,
          panelShow: false
        },
        skill: {
          skillList: [],
          inputVisible: false,
          inputValue: ''
        },
        accountShow: false,
        userProfile: '',
        rules: {
          userAccount: [
            { required: true, message: '账号不能为空', trigger: ['blur', 'change'] },
            { validator: validateAccount, trigger: 'blur' }
          ],
          userPassword: [
            { required: true, message: '密码不能为空', trigger: ['blur', 'change'] }
          ],
          userMail: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          signature: [
            { min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: ['blur', 'change'] }
          ],
          introduce: [
            { min: 20, max: 50, message: '长度在 20 到 50 个字符', trigger: ['blur', 'change'] }
          ],
          work: [
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: ['blur', 'change'] }
          ],
          place: [
            { max: 50, message: '最大 50 个字符', trigger: ['blur', 'change'] }
          ],
          hobby: [
            { max: 50, message: '最大 50 个字符', trigger: ['blur', 'change'] }
          ],
          username: [
            { max: 20, message: '最大 20 个字符', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    mounted() {
      this.userId = this.$route.params.userId
      this.init()
    },
    methods: {
      ...mapActions([
        'retrieveUserInfo',
        'userLogin',
        'loginOut'
      ]),
      init() {
        this.userProfileExtra()
      },
      handleClose(tagId) {
        delUserSkill({ skillId: tagId }).then(res => {
          if (res.flag) {
            this.skill.skillList = this.skill.skillList.filter(item => item.skillId !== tagId)
          }
        })
      },
      showInput() {
        this.skill.inputVisible = true
        this.$nextTick(() => {
          if (this.$refs.skillTag) {
            this.$refs.skillTag.$refs.input.focus()
          }
        })
      },
      handleInputConfirm() {
        let inputValue = this.skill.inputValue
        if (inputValue) {
          addUserSkill({ skill: inputValue }).then(res => {
            if (res.flag) {
              console.error(res.data)
              this.skill.skillList.push(res.data)
              this.skill.inputVisible = false
              this.skill.inputValue = ''
            }
          })
        }
      },
      userProfileExtra() {
        retrieveUserProfileExtra().then(res => {
          if (res.flag) {
            this.userProfile = res.data
            this.userProfile.userSex = parseInt(this.userProfile.userSex)
            this.userProfile.sexName = ['未知', '女', '男'][this.userProfile.userSex]
            this.skill.skillList = this.userProfile.skillList
          }
        })
      },
      saveSex() {
        saveUserInfo({ id: this.userId, userSex: this.userProfile.userSex }).then(res => {
          if (res.flag) {
            this.userProfile.sexName = ['未知', '女', '男'][this.userProfile.userSex]
            this.sex.panelShow = false
          }
        })
      },
      saveAccount() {
        this.$refs['accountForm'].validate((valid) => {
          if (valid) {
            bindUserAccount({ id: this.userId, isBind: 'Y', userAccount: this.userProfile.userAccount, userPassword: this.userProfile.userPassword })
              .then(res => {
                if (res.flag) {
                  this.userLogin({ username: this.userProfile.userAccount, password: this.userProfile.userPassword }).then(() => {
                    this.userProfile.isBind = 'Y'
                  })
                }
              })
          }
        })
      },
      saveMail() {
        this.$refs['mailForm'].validate((valid) => {
          if (valid) {
            saveUserInfo({ id: this.userId, userMail: this.userProfile.userMail }).then(res => {
              if (res.flag) {
                this.mail.panelShow = false
              }
            })
          }
        })
      },
      saveSignature() {
        this.$refs['signForm'].validate((valid) => {
          if (valid) {
            saveUserInfo({ id: this.userId, signature: this.userProfile.signature }).then(res => {
              if (res.flag) {
                this.sign.panelShow = false
              }
            })
          }
        })
      },
      saveIntroduce() {
        this.$refs['introduceForm'].validate((valid) => {
          if (valid) {
            saveUserInfo({ id: this.userId, introduce: this.userProfile.introduce }).then(res => {
              if (res.flag) {
                this.introduce.panelShow = false
              }
            })
          }
        })
      },
      saveWork() {
        this.$refs['workForm'].validate((valid) => {
          if (valid) {
            saveUserInfo({ id: this.userId, work: this.userProfile.work }).then(res => {
              if (res.flag) {
                this.work.panelShow = false
              }
            })
          }
        })
      },
      savePlace() {
        this.$refs['placeForm'].validate((valid) => {
          if (valid) {
            saveUserInfo({ id: this.userId, place: this.userProfile.place }).then(res => {
              if (res.flag) {
                this.place.panelShow = false
              }
            })
          }
        })
      },
      saveHobby() {
        this.$refs['hobbyForm'].validate((valid) => {
          if (valid) {
            saveUserInfo({ id: this.userId, hobby: this.userProfile.hobby }).then(res => {
              if (res.flag) {
                this.hobby.panelShow = false
              }
            })
          }
        })
      },
      saveUsername() {
        this.$refs['userNameForm'].validate((valid) => {
          if (valid) {
            saveUserInfo({ id: this.userId, userName: this.userProfile.userName }).then(res => {
              if (res.flag) {
                this.username.panelShow = false
              }
            })
          }
        })
      },
      addSkill(skill) {
        addUserSkill({ skill: skill }).then(res => {
          if (res.flag) {
            this.skillList.push(res.data)
          }
        })
      },
      delSkill(skillId) {
        delUserSkill({ skillId: skillId }).then(res => {
          if (res.flag) {
            this.skillList = this.skillList.filter(item => item.skillId !== skillId)
          }
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .edit-profile {
    width: 100%;
    .btn-panel {
      cursor: pointer;
      font-size: 15px;
      color: #175199;
      i {
        margin-left: 10px;
        margin-right: 3px;
      }
    }
    ul {
      list-style: none;
      padding: 0px;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 80px;
        border-bottom: 1px solid #ebebeb;
        .left-label {
          display: block;
          margin-right: 50px;
          width: 100px;
          text-align: right;
          font-size: 15px;
          font-weight: 600;
          font-synthesis: style;
          color: #444;
        }
        .sexContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          .showContent {
            display: flex;
            .sex-value {
              font-size: 15px;
            }
          }
        }
        .accountContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          .account {
            font-size: 15px;
          }
          .account-bind {
            /deep/ .el-form-item {
              margin-bottom: 0px;
            }
          }
        }
        .mailContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          /deep/ .el-form-item {
            margin-bottom: 0px;
          }
          .showContent {
            display: flex;
            .sex-value {
              font-size: 15px;
            }
          }
        }
        .signContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          /deep/ .el-form-item {
            margin-bottom: 0px;
          }
          .showContent {
            display: flex;
            .sex-value {
              font-size: 15px;
            }
          }
        }
        .introduceContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          /deep/ .el-form-item {
            margin-bottom: 0px;
          }
          .showContent {
            display: flex;
            .sex-value {
              font-size: 15px;
            }
          }
        }
        .workContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          /deep/ .el-form-item {
            margin-bottom: 0px;
          }
          .showContent {
            display: flex;
            .sex-value {
              font-size: 15px;
            }
          }
        }
        .placeContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          /deep/ .el-form-item {
            margin-bottom: 0px;
          }
          .showContent {
            display: flex;
            .sex-value {
              font-size: 15px;
            }
          }
        }
        .hobbyContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          /deep/ .el-form-item {
            margin-bottom: 0px;
          }
          .showContent {
            display: flex;
            .sex-value {
              font-size: 15px;
            }
          }
        }
        .userNameContent {
          display: flex;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          /deep/ .el-form-item {
            margin-bottom: 0px;
          }
          .showContent {
            display: flex;
            .sex-value {
              font-size: 15px;
            }
          }
        }

        .skillContent {
          .el-tag + .el-tag {
            margin-left: 10px;
          }
          .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
          }
          .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
          }
        }

      }
    }
  }
</style>
