<template>
  <div>
    <editor ref="editor" :ready="init"></editor>
  </div>
</template>

<script>
  import Editor from './Editor'
  export default {
    name: 'BasicEditor',
    data () {
      return {
        editorData: '<p>This is my basic editor.</p>'
      }
    },
    mounted () {
    },
    methods: {
      init () {
        this.$refs.editor.setContent(this.editorData)
      },
      getContent () {
        return this.$refs.editor.getContent()
      },
      insertContent (content) {
        this.$refs.editor.insertHtml(content)
      },
      switchSource () {
        this.$refs.editor.execCommand('source')
      },
      setReadonly (readonly) {
        this.$refs.editor.setReadonly(readonly)
      },
      isReadonly () {
        return this.$refs.editor.isReadonly()
      },
      setDisable(command, disable) {
        this.$refs.editor.setDisable(command, disable)
      },
      getCommand (command) {
        return this.$refs.editor.getCommand(command)
      }
    },
    components: {
      Editor
    }
  }
</script>

<style scoped>

</style>