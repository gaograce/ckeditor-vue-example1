<template>
  <el-dialog title='Table Properties' :visible.sync='showDialog' width="80%">
    <div style='overflow-x: auto;overflow-y:hidden;text-align: center'>
      <div style='position: relative;margin: auto;width: 700px;height: 500px;' class="table-dialog">
        <el-form ref='form' :model='form' label-width='80px'  label-position='left' align='left'>
          <el-form-item label='Src'>
            <el-input size='small' v-model='form.src' style='width: 200px'>
            </el-input>
          </el-form-item>
          <el-form-item label='Width'>
            <el-input size='small' v-model='form.width' style='width: 200px'>
            </el-input>
          </el-form-item>
          <el-form-item label='Height'>
            <el-input size='small' v-model='form.height' style='width: 200px'>
            </el-input>
          </el-form-item>
          <el-form-item label='Style'>
            <el-autocomplete size='small'  v-model='key' style='width: 200px'
                             :fetch-suggestions="querySearch">
              <el-button slot="append" icon="el-icon-plus" @click="addStyle"></el-button>
            </el-autocomplete>
            <div style="height: 300px;overflow: auto;width: 220px;">
              <div v-for="(item, index) in styles" v-bind:key="index">
                <div style="position: relative;width: 200px"><label>{{item.key + ":"}}</label>
                  <el-button icon="el-icon-close" size="mini" style="position: absolute;right: 0px;top: 5px"
                             @click="deleteStyle(index)"></el-button></div>
                <el-input size='small' v-model='item.value' style='width: 200px' @change="handleStyleChanged">
                </el-input>
              </div>
            </div>

          </el-form-item>
        </el-form>
        <div style='width: 400px; height: 500px;position: absolute;left: 300px;top: 0px'>
          <div style="border: 1px solid #d1dbe5;border-radius: 4px; background-color: #fff;overflow: hidden;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);height: 400px;padding: 10px;" class='box-card'>
            <div style="height: 40px;border-bottom: 1px solid rgba(0,0,0,.12);margin-bottom: 10px;" class='clearfix'>Preview</div>
            <div ref='preview' style='text-align: center;overflow: auto;width: 100%;height: 350px;position: relative'>
              <div style="width: 380px; height: 40px;position: fixed;background: white">
                Natural Width: {{size.width}} &nbsp;&nbsp;&nbsp;Natural Height: {{size.height}}</div>
              <div style="height: 40px;"></div>
              <img ref="image" :src="form.src" :style="form.style" :width="form.width" :height="form.height"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span slot='footer' class='dialog-footer'>
    <el-button @click='showDialog = false'>Cancel</el-button>
    <el-button type='primary' @click='imagePropertiesChanged'>OK</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'image-properties',
  data () {
    return {
      showDialog: false,
      key: '',
      form: {
        src: '',
        width: '',
        height: '',
        border: '',
        style: ''
      },
      styles: [],
      img: null,
      size: {
        width: '0px',
        height: '0px'
      }
    }
  },
  methods: {
    async show (img) {
      this.showDialog = true
      this.img = img
      this.form.src = img.src
      this.form.width = img.width
      this.form.height = img.height
      this.updateStyle(img.style)
      let size = await this.getImgOriginalSize(img)
      this.size.width = size.width
      this.size.height = size.height
    },
    handleStyleChanged () {
      let res = ''
      for (let style of this.styles) {
        if (style.value) {
          res += `${style.key}: ${style.value};`
        }
      }
      this.form.style = res
    },
    querySearch (queryString, cb) {
      var keys = this.getStyleKeys()
      var results = queryString ? keys.filter(this.createFilter(queryString)) : keys
      cb(results)
    },
    createFilter (queryString) {
      return (key) => {
        return (key.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    updateStyle (style) {
      this.styles = []
      this.form.style = style.cssText
      let re = /(.*):(.*)/
      let styles = style.cssText.split(';')
      for (let style of styles) {
        let match = style.match(re)
        if (match) {
          this.styles.push({
            key: match[1],
            value: match[2]
          })
        }
      }
    },
    getStyleKeys () {
      return ['align-content', 'align-items', 'align-self', 'all', 'animation', 'animation-delay',
        'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count',
        'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'backface-visibility',
        'background', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color',
        'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size',
        'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius',
        'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image', 'border-image-outset',
        'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-left',
        'border-left-color', 'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color',
        'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color',
        'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width',
        'bottom', 'box-align', 'box-direction', 'box-flex', 'box-flex-group', 'box-lines', 'box-ordinal-group', 'box-orient',
        'box-pack', 'box-shadow', 'box-sizing', 'caption-side', 'clear', 'clip', 'color', 'column-count', 'column-fill',
        'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width',
        'columns', 'content', 'counter-increment', 'counter-reset', 'cursor', 'direction', 'display', 'empty-cells', 'filter',
        'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font',
        'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight',
        'grid-columns', 'grid-rows', 'hanging-punctuation', 'height', 'icon', 'justify-content', 'left', 'letter-spacing',
        'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom',
        'margin-left', 'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'mix-blend-mode',
        'object-fit', 'object-position', 'nav-down', 'nav-index', 'nav-left', 'nav-right', 'nav-up', 'opacity', 'order',
        'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow', 'overflow-x', 'overflow-y',
        'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page-break-after', 'page-break-before',
        'page-break-inside', 'perspective', 'perspective-origin', 'position', 'punctuation-trim', 'quotes', 'resize', 'right',
        'rotation', 'tab-size', 'table-layout', 'target', 'target-name', 'target-new', 'target-position', 'text-align',
        'text-align-last', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-style',
        'text-indent', 'text-justify', 'text-outline', 'text-overflow', 'text-shadow', 'text-transform', 'text-wrap', 'top',
        'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration',
        'transition-property', 'transition-timing-function', 'unicode-bidi', 'vertical-align', 'visibility', 'white-space',
        'width', 'word-break', 'word-spacing', 'word-wrap', 'z-index', 'writing-mode'].map(s => { return {'value': s} })
    },
    addStyle () {
      if (!this.key || this.styles.filter(t => t.key === this.key).length > 0) {
        return
      }
      this.styles.push({
        key: this.key,
        value: ''
      })
      this.key = ''
    },
    deleteStyle (idx) {
      this.styles.splice(idx, 1)
      this.handleStyleChanged ()
    },
    imagePropertiesChanged () {
      this.showDialog = false
      if (this.form.src) {
        this.img.style.src = this.form.src
      }
      if (this.form.width) {
        this.img.width = this.form.width
      }
      if (this.form.height) {
        this.img.height = this.form.height
      }
      if (this.form.style) {
        this.img.style = this.form.style
      } else {
        this.img.removeAttribute('style')
      }
    },
    getImgOriginalSize: async function (img) {
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
  }
}
</script>

<style scoped>

</style>
