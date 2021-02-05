<template>
  <div>
    <ckeditor ref="editor" :config="config" v-model="editorData"
              @namespaceloaded="onNamespaceLoaded" @ready="onEditorReady"></ckeditor>
  </div>
</template>

<script>
  import myImage from './plugins/myImage'
  import myDialog from './plugins/myDialog'
  export default {
    name: 'Editor',
    data () {
      return {
        editorData: ''
      }
    },
    props: {
      value : {
        type: String,
        default: ''
      },
      config: {
        type: Object,
        default: () => {}
      },
      ready: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      onNamespaceLoaded (CKEDITOR) {
        console.log(CKEDITOR)
        myImage.init()
        myDialog.init()
        CKEDITOR.addCss(`body{background: #7b8b6f;color: white;}`)
      },
      onEditorReady (editor) {
        this.ready(editor)

        editor.on( 'paste', async evt => {
          if(evt.data.dataTransfer.getFilesCount() > 0) {
            evt.data.dataValue = ''
            let res = await this.handleTransferImage(evt)
            if(res){
              editor.insertHtml(`<img src="${res.url}"/>`)
            }
          }
        })

        editor.on( 'key', function( event ) {
          let keycode = event.data.keyCode;
          if( keycode == 9 ) {
            event.cancel();
            editor.execCommand('indent')
          }
        })
      },
      setContent (data) {
        this.editorData = data
        //this.$refs.editor.instance.setData(data)
      },
      getContent () {
        //return this.$refs.editor.instance.getData()
        return this.editorData
      },
      insertHtml (html) {
        this.$refs.editor.instance.insertHtml(html)
      },
      execCommand (command) {
        this.$refs.editor.instance.execCommand(command)
      },
      setReadonly (readonly) {
        this.$refs.editor.instance.setReadOnly(readonly)
      },
      isReadonly () {
        return this.$refs.editor.instance.readOnly
      },
      setDisable(command, disable) {
        if(disable) {
          this.$refs.editor.instance.commands[command].enable()
        } else {
          this.$refs.editor.instance.commands[command].disable()
        }
      },
      async handleTransferImage(evt) {
        if(evt.data.dataTransfer.getFilesCount()) {
          let file = evt.data.dataTransfer.getFile(0)
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.$refs.editor.instance.insertHtml(`<img src="${reader.result}"/>`)
          }
          reader.onerror = error => {
            console.error(error)
          }
        }
      },
      getCommand (command) {
        return this.$refs.editor.instance.commands[command]
      }
    }
  }
</script>

<style scoped>

</style>