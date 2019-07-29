<template>
  <div>
    <!-- vueCropper 剪裁图片实现-->
    <div class="vue-cropper-box">
      <div class="vue-cropper-content">
        <vueCropper ref="cropper"
                    :img="imageUrl"
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
      <el-button type="danger" @click="onCubeImg">确定裁剪图片</el-button>
    </div>
  </div>
</template>
<script>
  import { fileUpload } from '@/api/upload'
  export default {
    name: 'imageCutUpload',
    props: {
      // 特殊配置
      cropperOption: {
        type: Object,
        default: () => {
          return null
        }
      },
      imageUrl: String,
      type: String,
      fileName: String
    },
    data () {
      return {
        remoteUrl: '', // 图片在服务器的访问地址
        option: {
          img: '', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'png', // 裁剪生成图片的格式
          canScale: true, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 100, // 默认生成截图框宽度
          autoCropHeight: 100, // 默认生成截图框高度
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1] // 截图框的宽高比例 [宽度, 高度]
        }
      }
    },
    methods: {
      // 确定裁剪图片
      onCubeImg () {
        this.$refs.cropper.getCropData((data) => {
          let img = new Image()
          let _this = this
          img.src = data
          img.onload = function() {
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
            this.$emit('getRemoteUrl', res.data)
          }
        })
      },
      // base64转成blob对象
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
