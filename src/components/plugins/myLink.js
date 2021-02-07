import linkicon from '../../assets/link.png'
import uiUtils from '../../utils/uiUtils'
let text
let link
function getTextDiv () {
  let div = document.createElement('div')
  div.style = 'margin: 5px'
  let textLabel = uiUtils.getLabel('Text:', 50)
  div.appendChild(textLabel)
  let textInput = uiUtils.getInput(200)
  text = textInput
  div.appendChild(textInput)
  return div
}
function getUrlDiv () {
  let div = document.createElement('div')
  div.style = 'margin: 5px'
  let textLabel = uiUtils.getLabel('Link:', 50)
  div.appendChild(textLabel)
  let textInput = uiUtils.getInput(200)
  link = textInput
  div.appendChild(textInput)
  return div
}

function getBtn (editor, panel) {
  let div = document.createElement('div')
  div.style = 'margin: 5px;height: 28px;'

  let btn = uiUtils.getOkButton('OK')
  btn.style.float = 'right'
  div.appendChild(btn)

  btn.addEventListener('click', () => {
    if (!text.value && !link.value) {
      return
    }
    panel.hide()
    let t = text.value || link.value
    let l = link.value || text.value
    if (targetElement) {
      targetElement.innerHTML = t
      targetElement.dataset.ckeSavedHref = l
    } else {
      editor.insertHtml('<a href="' + l + '">' + t + '</a>')
    }
  })

  let cancelBtn = uiUtils.getCancelButton('Cancel')
  cancelBtn.style.float = 'right'
  div.appendChild(cancelBtn)
  cancelBtn.addEventListener('click', () => {
    panel.hide()
  })
  return div
}

let targetElement
export default {
  init: function () {
    window.CKEDITOR.plugins.add('mylink', {
      icons: 'mylink',
      init: function (editor) {
        editor.addCommand('mylink', {
          exec: function (editor) {
            console.log(editor.getData())
          }
        })
        editor.ui.add('MyLink', window.CKEDITOR.UI_PANELBUTTON, {
          label: 'Link',
          title: 'Link',
          icon: linkicon,
          command: 'mylink',
          panel: {
            css: window.CKEDITOR.skin.getPath('editor'),
            attributes: {role: 'listbox', 'aria-label': 'mylink'}
          },
          select: function (callback) {
            console.log(callback)
          },
          onOpen: function () {
            let selection = editor.getSelection()
            var element = selection.getStartElement()
            let a = element && element.getAscendant('a', true)
            if (a) {
              targetElement = a.$
              text.value = targetElement.innerHTML
              link.value = a.$.dataset.ckeSavedHref
            } else {
              targetElement = null
              text.value = selection.getSelectedText()
              text.placeHolder = '{{link}}'
              link.value = '{{link}}'
            }
          },
          onBlock: function (panel, block) {
            block.autoSize = true
            let div = document.createElement('div')
            div.style = 'width: 300px;padding: 10px'
            div.appendChild(getTextDiv())
            div.appendChild(getUrlDiv())
            div.appendChild(getBtn(editor, panel))
            block.element.$.appendChild(div)
          }
        })
      }
    })
  }
}

