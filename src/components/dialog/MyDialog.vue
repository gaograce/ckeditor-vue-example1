<template>
  <el-dialog title="Insert A Div" :visible.sync="showDialog" width="50%">
    <el-form>
      <el-form-item label="color:" label-width="100">
        <el-color-picker v-model="color"></el-color-picker>
      </el-form-item>
      <el-form-item label="background:">
        <el-color-picker v-model="background"></el-color-picker>
      </el-form-item>
      <el-form-item label="border">
        <el-input v-model="border" style="width: 300px"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="showDialog = false">Cancel</el-button>
    <el-button type="primary" @click="save">OK</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'MyDialog',
    data () {
      return {
        showDialog: false,
        color: '#000',
        background: '#fff',
        border: '1px solid #ccc'
      }
    },
    methods: {
      show () {
        this.showDialog = true
      },
      save () {
        let div = `<div style="color: ${this.color}; background: ${this.background}; border: ${this.border}; padding:5px 10px;">&nbsp;</div>`
        this.$emit('content-changed', div)
        this.showDialog = false
      }
    }
  }
</script>

<style scoped>

</style>