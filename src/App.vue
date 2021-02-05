<template>
  <div id="app">
    <el-form :inline="true">
      <el-form-item>
        <el-button @click="getContent">Get Content</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="insertContent">Insert Content</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="switchSource">Toggle Source</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="setReadonly">Toggle Readonly</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="() => toggleDisable('source')">Disable/Enable Source</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeEditor" type="card">
      <el-tab-pane name="basic" label="Basic Editor">
        <BasicEditor ref="basic"/>
      </el-tab-pane>
      <el-tab-pane  name="custom" label="Custom Editor">
        <CustomEditor ref="custom"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CustomEditor from './components/CustomEditor.vue'
  import BasicEditor from './components/BasicEditor.vue'


export default {
  name: 'App',
  data () {
    return {
      activeEditor: 'custom'
    }
  },
  methods: {
    getContent () {
      alert(this.$refs[this.activeEditor].getContent())
    },
    insertContent () {
      this.$refs[this.activeEditor].insertContent('<div style="background: #1B181B;color: white;">This is a insert test.</div>')
    },
    switchSource () {
      this.$refs[this.activeEditor].switchSource()
    },
    setReadonly () {
      let readonly = this.$refs[this.activeEditor].isReadonly()
      console.log(readonly)
      this.$refs[this.activeEditor].setReadonly(!readonly)
    },
    toggleDisable (commandName) {
      let command = this.$refs[this.activeEditor].getCommand(commandName)
      if(command.state === 0) {
        this.$refs[this.activeEditor].setDisable(commandName, true)
      } else {
        this.$refs[this.activeEditor].setDisable(commandName, false)
      }
    }
  },
  components: {
    BasicEditor,
    CustomEditor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
