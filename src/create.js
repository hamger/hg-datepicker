import {
  $id,
  setChildStyle
} from './utils'

/**
 * 设置选择器样式
 */
function setStyle () {
  if (!this.style) return
  let obj = this.style
  let container = $id(this.containerId)
  let content = $id(this.contentId)
  let box = $id(this.boxId)
  let sureBtn = $id(this.okId)
  let cancelBtn = $id(this.cancelId)
  let len = content.children.length
  // 设置高宽
  if (obj.liHeight !== 40) {
    for (let i = 0; i < this.ulCount; i++) {
      setChildStyle(content.children[i], 'height', this.liHeight + 'px')
    }
    content.children[len - 3].style.height = this.liHeight * 2 + 'px'
    content.children[len - 2].style.height = this.liHeight * 2 + 'px'
    content.children[len - 1].style.height = this.liHeight + 'px'
    content.children[len - 1].style.top = this.liHeight * 2 + 'px'
    content.style.height = this.liHeight * 5 + 'px'
    content.style.lineHeight = this.liHeight + 'px'
  }
  if (obj.btnHeight !== 44) {
    box.style.height = this.btnHeight + 'px'
    box.style.lineHeight = this.btnHeight + 'px'
  }
  if (obj.btnOffset) {
    sureBtn.style.marginRight = obj.btnOffset
    cancelBtn.style.marginLeft = obj.btnOffset
  }
  if (obj.liHeight !== 40 || obj.btnHeight !== 44) {
    container.style.height = this.liHeight * 5 + this.btnHeight + 'px'
  }
  // 设置配色
  if (obj.titleColor) box.style.color = obj.titleColor
  if (obj.okColor) sureBtn.style.color = obj.okColor
  if (obj.cancelColor) cancelBtn.style.color = obj.cancelColor
  if (obj.btnBgColor) box.style.backgroundColor = obj.btnBgColor
  if (obj.contentColor) content.style.color = obj.contentColor
  if (obj.contentBgColor) {
    content.style.backgroundColor = obj.contentBgColor
  }
  if (obj.upShadowColor) {
    content.children[len - 3].style.backgroundImage = obj.upShadowColor
  }
  if (obj.downShadowColor) {
    content.children[len - 2].style.backgroundImage = obj.downShadowColor
  }
  if (obj.lineColor) {
    content.children[len - 1].style.borderColor = obj.lineColor
  }
}

function create () {
  // 创建选择器的父容器
  let div = document.createElement('div')
  div.id = this.wrapId
  document.body.appendChild(div)
  this.wrap = $id(this.wrapId)
  this.wrap.classList.add('hg-picker-bg')

  // 渲染选择器
  let len = this.maps.length
  let btnHTML =
    '<div class="hg-picker-btn-box" id="' +
    this.boxId +
    '">' +
    '<div class="hg-picker-btn" id="' +
    this.cancelId +
    '">' +
    this.cancelText +
    '</div>' +
    '<div class="hg-picker-btn" id="' +
    this.okId +
    '">' +
    this.okText +
    '</div>' +
    '<span id="' +
    this.titleId +
    '" >' +
    this.title +
    '</span> ' +
    '</div>'

  let str = ''
  for (let i = 0; i < len; i++) {
    if (this.maps[i] !== undefined) str += '<ul id="' + this.wrapId + '-ul-' + i + '"></ul>'
  }

  let contentHtml =
    '<div class="hg-picker-content" id="' +
    this.contentId +
    '">' +
    str +
    '<div class="hg-picker-up-shadow"></div>' +
    '<div class="hg-picker-down-shadow"></div>' +
    '<div class="hg-picker-line"></div>' +
    '</div>'
  let html = ''
  // 设置按钮位置
  if (this.style && this.style.btnLocation === 'bottom') {
    html =
      '<div  class="hg-picker-container" id="' +
      this.containerId +
      '">' +
      contentHtml +
      btnHTML +
      '</div>'
  } else {
    html =
      '<div  class="hg-picker-container" id="' +
      this.containerId +
      '">' +
      btnHTML +
      contentHtml +
      '</div>'
  }

  this.wrap.innerHTML = html
  for (let i = 0; i < len; i++) {
    if (this.maps[i] !== undefined) {
      this.dateUl[i] = $id(this.wrapId + '-ul-' + i)
      this.dateUl[i].style.width = (100 / this.ulCount).toFixed(2) + '%'
      this.renderLi(i)
    }
  }
  setStyle.call(this)
  for (let i = 0; i < this.maps.length; i++) {
    if (this.maps[i]) this.roll(i)
  }
}

export default create
