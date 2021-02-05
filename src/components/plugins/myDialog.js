import d from '../../assets/div.png'

export default {
  init () {
    window.CKEDITOR.plugins.add('myDialog', {
      icons:"myDialog",
      init: function(editor){
        editor.addCommand("myDialog", {
          exec: function( editor ) {
            console.log(editor)
            editor.dialog.show()
          }
        });
        editor.ui.addButton('MyDialog',{
          label:'Show Dialog',
          icon:  d,
          command:'myDialog'
        });
      }
    })
  }
}