import img from '../../assets/img.png'

export default {
  init () {
    window.CKEDITOR.plugins.add('myImage', {
      icons:"myImage",
      init: function(editor){
        editor.addCommand("myImage", {
          exec: function( editor ) {
            let file = document.createElement('input')
            file.type = 'file'
            file.accept = 'image/*'
            file.addEventListener('change', () => {
              const reader = new FileReader();
              reader.readAsDataURL(file.files[0]);
              reader.onload = () => {
                editor.insertHtml(`<img src="${reader.result}"/>`)
              };
              reader.onerror = error => {
                console.error(error)
              };
            })
            file.click()
          }
        });
        editor.ui.addButton('MyImage',{
          label:'Insert Image',
          icon:  img,
          command:'myImage'
        });
      }
    })
  }
}