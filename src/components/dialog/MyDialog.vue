<template>
  <el-dialog title="A Test Dialog" :visible.sync="showDialog" width="30%">
    <span>Test</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="showDialog = false">Cancel</el-button>
    <el-button type="primary" @click="showDialog = false">OK</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'MyDialog',
    data () {
      return {
        showDialog: false
      }
    },
    methods: {
      show () {
        this.showDialog = true
      }
    }
  }
</script>

<style scoped>

</style>