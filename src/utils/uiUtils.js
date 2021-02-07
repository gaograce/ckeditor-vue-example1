let inputStyle = '    height: 28px;\n' +
                 '    line-height: 28px;' +
                 '    background-color: #FFF;\n' +
                 '    background-image: none;\n' +
                 '    border-radius: 4px;\n' +
                 '    border: 1px solid #DCDFE6;\n' +
                 '    box-sizing: border-box;\n' +
                 '    color: #606266;\n' +
                 '    display: inline-block;\n' +
                 '    font-size: 12px;\n' +
                 '    outline: 0;\n' +
                 '    padding: 0 15px;\n' +
                 '    transition: border-color .2s cubic-bezier(.645,.045,.355,1);\n'

let buttonStyle = '    display: inline-block;\n' +
                  '    line-height: 1;\n' +
                  '    white-space: nowrap;\n' +
                  '    cursor: pointer;\n' +
                  '    border: 1px solid #DCDFE6;\n' +
                  '    -webkit-appearance: none;\n' +
                  '    text-align: center;\n' +
                  '    box-sizing: border-box;\n' +
                  '    outline: 0;\n' +
                  '    margin: 0;\n' +
                  '    transition: .1s;\n' +
                  '    font-weight: 500;\n' +
                  '    padding: 7px 15px;\n' +
                  '    font-size: 12px;\n' +
                  '    border-radius: 3px;' +
                  '    margin-left: 5px;\n'
let okButtonStyle = {
  color: '#FFF',
  backgroundColor: '#409EFF',
  borderColor: '#409EFF'
}
let okHoverButtonStyle = {
  backgroundColor: ' #66b1ff',
  borderColor: '#66b1ff',
  color: '#FFF'
}
let cancelButtonStyle = {
  color: '#606266',
  backgroundColor: '#FFF',
  borderColor: '#DCDFE6'
}

let cancelHoverButtonStyle = {
  color: '#409EFF',
  backgroundColor: '#ecf5ff',
  borderColor: '#c6e2ff'
}

let labelStyle = '    vertical-align: middle;\n' +
                 '    float: left;\n' +
                 '    font-size: 14px;\n' +
                 '    color: #606266;\n' +
                 '    line-height: 28px;\n' +
                 '    padding: 0 12px 0 0;\n' +
                 '    box-sizing: border-box;\n' +
                 '    text-align: left;'
function getInput (width) {
  width = width || 200
  let input = document.createElement('input')
  input.style = inputStyle + `width: ${width}px;`
  input.addEventListener('focus', () => {
    input.style.borderColor = '#409EFF'
  })
  input.addEventListener('blur', () => {
    input.style.borderColor = '#DCDFE6'
  })
  return input
}

function getStyleStr (style) {
  let str = ''
  for (let key of Object.keys(style)) {
    str += key.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + style[key] + ';\n'
  }
  console.log(str)
  return str
}
function updateStyle (element, style) {
  for (let key of Object.keys(style)) {
    element.style[key] = style[key]
  }
}
function getOkButton (text) {
  let button = document.createElement('button')
  button.style = buttonStyle + getStyleStr(okButtonStyle)
  button.innerHTML = text
  button.addEventListener('focus', () => {
    updateStyle(button, okHoverButtonStyle)
  })
  button.addEventListener('blur', () => {
    updateStyle(button, okButtonStyle)
  })
  button.addEventListener('mouseover', () => {
    updateStyle(button, okHoverButtonStyle)
  })
  button.addEventListener('mouseout', () => {
    updateStyle(button, okButtonStyle)
  })
  return button
}
function getCancelButton (text) {
  let button = document.createElement('button')
  button.style = buttonStyle + getStyleStr(cancelButtonStyle)
  button.innerHTML = text
  button.addEventListener('focus', () => {
    updateStyle(button, cancelHoverButtonStyle)
  })
  button.addEventListener('blur', () => {
    updateStyle(button, cancelButtonStyle)
  })
  button.addEventListener('mouseover', () => {
    updateStyle(button, cancelHoverButtonStyle)
  })
  button.addEventListener('mouseout', () => {
    updateStyle(button, cancelButtonStyle)
  })
  return button
}
function getLabel (text, width = 100) {
  let label = document.createElement('label')
  label.style = labelStyle + `width: ${width}px;`
  label.innerHTML = text
  return label
}
export default {
  getInput: getInput,
  getOkButton: getOkButton,
  getCancelButton: getCancelButton,
  getLabel
}
