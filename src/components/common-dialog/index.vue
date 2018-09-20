<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="closeDialog">
      <slot></slot>
      <span slot="footer" class="dialog-footer" v-if="hasButton">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      visible: Boolean,
      width: 300,
      title: String,
      hasButton: true
    },
    name: 'common-dialog',
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set() {}
      }
    },
    methods: {
      closeDialog() {
        this.$emit('cancel')
      },
      cancel() {
        this.$emit('cancel')
      },
      confirm() {
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped>

</style>
