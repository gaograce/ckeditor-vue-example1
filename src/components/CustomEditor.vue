<template>
 <div>
   <editor ref="editor" :config="editorConfig" :ready="init"></editor>
   <my-dialog ref="dialog" @content-changed="html => insertContent(html)"></my-dialog>
 </div>
</template>

<script>
  import Editor from './Editor'
  import MyDialog from './dialog/MyDialog'
  export default {
    name: 'CkEditor',
    data () {
      return {
        editorData: '<p>This is my custom editor.</p>',
        editorConfig: { // The configuration of the editor.
          height: 500,
          extraPlugins: 'colorbutton, colordialog, dialog, indentblock, indentlist, justify, font, codesnippet, myImage, myDialog, mylink',
          removePlugins: 'resize, image',
          language: 'en',
          allowedContent: true,
          pasteFilter: null,
          toolbar: [
            {
              name: 'code',
              items: ['Source']
            },
            {
              name: 'basicstyles',
              items: [ 'Styles', '-', 'Bold', 'Italic', 'Strike', 'Underline', 'TextColor', 'BGColor', 'Font', 'FontSize' ]
            },
            {
              name: 'styles',
              items: ['RemoveFormat']
            },
            {
              name: 'insert',
              items: [ 'MyImage', 'MyDialog', 'Table',  "SpecialChar", "HorizontalRule", 'CodeSnippet']
            }
            ,
            '/',
            {
              name: 'paragraph',
              items: ['Format', 'NumberedList', 'BulletedList','-', 'Indent', 'Outdent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ]
            },
            {
              name: 'links',
              items: ['MyLink', 'Unlink']
            },

            {
              name: 'document',
              items: ['Undo', 'Redo']
            }
          ]}
      }
    },
    methods: {
      init (editor) {
        //this.$refs.editor.setContent(this.editorData)
        console.log(editor)
        editor.setData(this.editorData)
        editor.dialog = this.$refs.dialog
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
      MyDialog,
      Editor
    }
  }
</script>

<style scoped>

</style>