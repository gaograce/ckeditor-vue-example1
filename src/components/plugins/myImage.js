import img from '../../assets/img.png'

export default {
  init () {
    window.CKEDITOR.plugins.add('myImage', {
      icons:"myImage",
      init: function(editor){
        let CKEDITOR = window.CKEDITOR
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
        if (editor.addMenuItems) {
          editor.addMenuGroup('image', 10)
          let size = ['50%', '80%', '100%', '150%', '200%']
          let items = {}
          for (let i in size) {
            let s = size[i]
            let name = 'imgsize-' + s
            editor.addCommand(name, {
              exec: async function (editor) {
                let element = editor.getSelection().getStartElement()
                if (element.getName() === 'img') {
                  let imgSize = await getImgOriginalSize(element.$)
                  element.setAttribute('width', parseInt(s) / 100 * imgSize.width)
                  element.setAttribute('height', parseInt(s) / 100 * imgSize.height)
                }
              }
            })
            editor.addMenuItem(name, {
              label: s,
              group: 'image',
              order: i + 10,
              command: name
            })
            items[name] = CKEDITOR.TRISTATE_OFF
          }
          editor.addCommand('border', {
            exec: function (editor) {
              let element = editor.getSelection().getStartElement()
              if (element.getName() === 'img') {
                if (element.$.style.border) {
                  element.removeStyle('border')
                } else {
                  element.setStyle('border', '1px solid #ccc')
                }
              }
            }
          })
          editor.addCommand('imgProperties', {
            exec: function (editor) {
              editor.imageProperties.show(editor.getSelection().getStartElement().$)
            }
          })
          editor.addMenuItems(
              {
                imageSize: {
                  label: 'Image Size',
                  group: 'image',
                  order: 1,
                  getItems: function () {
                    return items
                  }
                },
                border: {
                  label: 'Border',
                  group: 'image',
                  order: 2,
                  command: 'border'
                },
                imageProperties: {
                  label: 'Image Properties',
                  group: 'image',
                  order: 3,
                  command: 'imgProperties'
                }
              })
        }
        function isBorder (element) {
          return element.$.style.border
        }
        async function getImgOriginalSize (img) {
          return new Promise(resolve => {
            if (typeof img.naturalWidth === 'undefined') {
              var temImg = new Image()
              temImg.onload = function () {
                resolve({width: temImg.width, height: temImg.height})
              }
              temImg.src = img.src
            } else {
              resolve({width: img.naturalWidth, height: img.naturalHeight})
            }
          })
        }
        if (editor.contextMenu) {
          editor.contextMenu.addListener(function(element) {
            if (element.getName() === 'img') {
              return {
                imageSize: CKEDITOR.TRISTATE_OFF,
                border: isBorder(element) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF,
                imageProperties: CKEDITOR.TRISTATE_OFF
              }
            }
            return null
          })
        }
      }
    })
  }
}