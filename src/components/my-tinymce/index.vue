<template>
  <div class="tinymce-editor" :class="{'fixed': fixed}">
    <editor v-model="myValue"
            :init="init"
            :disabled="disabled"
            @onClick="onClick">
    </editor>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver'
  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/autoresize'// 插件高度自适应
  import 'tinymce/plugins/wordcount'// 字数统计插件
  import 'tinymce/plugins/textcolor'// 文本颜色
  import 'tinymce/plugins/codesample'// 文本颜色
  export default {
    name: 'myTinymce',
    props: {
      // 传入一个value，使组件支持v-model绑定
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'lists image media table textcolor wordcount autoresize codesample'
      },
      toolbar: {
        type: [String, Array],
        default: 'formatselect bold italic forecolor backcolor fontselect fontsizeselect codesample blockquote alignleft aligncenter alignright alignjustify bullist numlist lists table removeformat'
      }
    },
    data() {
      return {
        fixed: false,
        // 初始化配置
        init: {
          language_url: '/static/tinymce/zh_CN.js',
          height: 300,
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/ui/oxide',
          plugins: this.plugins,
          toolbar: this.toolbar,
          codesample_languages: [
            {text: 'HTML/XML', value: 'markup'},
            {text: 'JavaScript', value: 'javascript'},
            {text: 'CSS', value: 'css'},
            {text: 'PHP', value: 'php'},
            {text: 'Ruby', value: 'ruby'},
            {text: 'Python', value: 'python'},
            {text: 'Java', value: 'java'},
            {text: 'C', value: 'c'},
            {text: 'C#', value: 'csharp'},
            {text: 'C++', value: 'cpp'},
            {text: 'SQL', value: 'sql'},
            {text: 'YML', value: 'yml'},
            {text: 'Shell', value: 'shell'}
          ],
          branding: false,
          menubar: false,
          // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
          images_upload_handler: (blobInfo, success, failure) => {
            const img = 'data:image/jpeg;base64,' + blobInfo.base64()
            success(img)
          }
        },
        myValue: this.value
      }
    },
    components: {
      Editor
    },
    mounted() {
      window.addEventListener('scroll', this.navHandler)
      tinymce.init({})
    },
    methods: {
      // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      // 需要什么事件可以自己增加
      onClick(e) {
        this.$emit('onClick', e, tinymce)
      },
      // 可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = ''
      },
      getContent() {
        return this.myValue
      },
      setContent(content) {
        this.myValue = content
      },
      navHandler() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop >= 280) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue
      },
      myValue(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tinymce-editor {
    height: 100%;
    position: relative;
  }
  .fixed {
    margin-top: 100px;
    /deep/ .tox-toolbar {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 180px;
      margin-left: -120px;
      z-index: 100;
      width: 95px;
      .tox-tbtn__select-label {
        width: 60px;
      }
    }
  }
</style>
