<template>
  <div>
    <div class="upload-box">
      <div class="avatar-uploader" v-show="!isShowCropper">
        <el-upload
          action=""
          ref="upload"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="getFile">
          <i class="el-icon-plus avatar-uploader-icon" style="font-size: 24px"></i>
        </el-upload>
        <el-image v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
      </div>
    </div>
    <!-- vueCropper 剪裁图片实现-->
    <div class="vue-cropper-box" v-if="isShowCropper">
      <div class="vue-cropper-content">
        <vueCropper ref="cropper"
                    :img="option.img"
                    :outputSize="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber">
        </vueCropper>
      </div>
      <el-button v-if="isShowCropper" type="danger" @click="onCubeImg">确定裁剪图片</el-button>
    </div>
  </div>
</template>
<script>
  import { fileUpload } from '@/api/upload'
  export default {
    name: 'commonUpload',
    props: {
      // 特殊配置
      cropperOption: {
        type: Object,
        default: () => {
          return null
        }
      },
      // 图片展示高度
      imageHeight: {
        type: String,
        default: '100px'
      },
      type: String,
      iurl: String
    },
    data () {
      return {
        remoteUrl: '', // 图片在服务器的访问地址
        fileName: '',
        imageUrl: '',
        option: {
          img: '', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'png', // 裁剪生成图片的格式
          canScale: false, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 100, // 默认生成截图框宽度
          autoCropHeight: 100, // 默认生成截图框高度
          fixed: false, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1] // 截图框的宽高比例
        },
        isShowCropper: false // 是否显示截图框
      }
    },
    watch: {
      iurl (url) {
        this.imageUrl = url
        this.remoteUrl = url
      }
    },
    methods: {
      getFile (file) {
        let _this = this
        if (!window.FileReader) {
          console.error('当前浏览器版本不支持FileReader')
          return
        }
        let reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onloadend = function () {
          // 根据时间戳构建文件名，如果是同一个知识库重复上传封面则文件名相同
          _this.fileName = _this.fileName || (new Date().getTime() + file.name.substring(file.name.lastIndexOf('.')))
          _this.isShowCropper = true
          _this.option.img = this.result
        }
      },

      // 确定裁剪图片
      onCubeImg () {
        this.$refs.cropper.getCropData((data) => {
          this.isShowCropper = false
          this.imageUrl = data
          let img = new Image()
          let _this = this
          img.src = data
          img.onload = function() {
            // let _data = _this.compress(img)
            let blob = _this.dataURItoBlob(data)
            let formData = new FormData()
            formData.append('file', blob)
            _this.beginUpload(formData)
          }
        })
      },
      beginUpload(formData) {
        formData.append('type', this.type)
        formData.append('fileName', this.fileName)
        fileUpload(formData).then(res => {
          if (res.flag) {
            this.remoteUrl = res.data
          }
        })
      },
      retriveImgUrl() {
        return this.remoteUrl
      },
      // base64转成bolb对象
      dataURItoBlob(base64Data) {
        let byteString
        if (base64Data.split(',')[0].indexOf('base64') >= 0) {
          byteString = atob(base64Data.split(',')[1])
        } else {
          byteString = unescape(base64Data.split(',')[1])
        }
        let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
        let ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ia], { type: mimeString })
      },
      // 初始化配置文件
      initOptions () {
        this.isShowCropper = false
        if (this.cropperOption) {
          for (let key in this.option) {
            this.option[key] = this.cropperOption[key] || this.option[key]
          }
        }
      }
    },
    created () {
      this.initOptions()
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet">
  .avatar-uploader {
    display: flex;
    justify-content: space-between;
    &-icon {
      border: 1px dashed grey;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      &:hover {
        border-color: #409EFF;
      }
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .vue-cropper-box {
    display: flex;
    flex-direction: column;
    .vue-cropper-content {
      height: 200px
    }
  }


</style>
