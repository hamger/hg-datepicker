import {
  generateUUID,
  errLog
} from './utils'

  /**
   * 根据选择器类型确定 maps
   */
function initmaps () {
  switch (this.type) {
    case 'date':
      this.maps = [this.yearMap, this.monthMap, this.dayMap]
      break
    case 'month':
      this.maps = [this.yearMap, this.monthMap]
      break
    case 'time':
      this.maps = [
        undefined,
        undefined,
        undefined,
        this.hourMap,
        this.minuteMap
      ]
      break
    case 'dateTime':
      this.maps = [
        this.yearMap,
        this.monthMap,
        this.dayMap,
        this.hourMap,
        this.minuteMap
      ]
      break
    default:
      errLog('配置项 type 不合法')
  }
}
function label () {
  this.previousTime = [] // 储存前一次操作的时间
  this.yearMap = [] // 储存年份的数组
  this.monthMap = [] // 储存月份的数组
  this.dayMap = [] // 储存日期的数组
  this.dayNumArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 储存每月天数的数组
  this.hourMap = [] // 储存小时的数组
  this.minuteMap = [] // 储存分钟的数组
  this.maps = [] // 储存各项时间的选择范围
  this.dateIndex = [] // 储存当前各项时间索引的数组
  this.suffix =
    this.hasSuffix === 'yes' ? ['年', '月', '日', '时', '分'] : ['', '', '', '', ''] // 储存各项时间后缀的数组
  this.wrapId = generateUUID() + '-wrap' // 选择器外包裹元素ID
  this.ulCount = 0 // 展示的列数
  this.liHeight =
    this.style && this.style.liHeight ? this.style.liHeight : 40 // 每个li的高度
  this.btnHeight =
    this.style && this.style.btnHeight ? this.style.btnHeight : 44 // 按钮的高度
  this.dateUl = [] // 每个ul元素
  this.liCount = [] // 每个ul中有多少个可选li
  this.curDis = [] // 每个ul当前偏离的距离
  this.curPos = [] // touchstart时每个ul偏离的距离
  this.startY = 0 // touchstart的位置
  this.startTime = 0 // touchstart的时间
  this.endTime = 0 // touchend的时间
  this.moveY = 0 // touchmove的位置
  this.moveTime = 0 // touchmove的时间
  this.moveNumber = 1 // touchmove规定时间间隔下的次数
  this.moveSpeed = [] // touchmove规定时间间隔下的平均速度
  this.abled = true // 标识滚动是否进行中
  this.containerId = this.wrapId + '-container' // 选择器容器ID
  this.boxId = this.wrapId + '-box' // 选择器按钮区域ID
  this.contentId = this.wrapId + '-content' // 选择器选择区域ID
  this.cancelId = this.wrapId + '-cancel' // 选择器取消按钮ID
  this.okId = this.wrapId + '-ok' // 选择器确定按钮ID
  this.titleId = this.wrapId + '-title' // 选择器确定按钮ID
  for (let i = 0; i < this.initValue.length; i++) {
    this.previousTime.push(this.initValue[i])
    if (this.initValue[i]) {
      this.calculateMap(i)
      this.calculateDis(i)
      this.ulCount++
    }
  }
  initmaps.call(this)
  this.liCount = this.maps.map(item => item && item.length)
}

export default label
