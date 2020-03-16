import {
  setChildStyle,
  generateUUID,
  $id,
  calculateBuffer,
  getArr,
  tf,
  isNumberArr
} from './utils'

const property = Symbol('property')

export default class DatePicker {
  constructor (config) {
    this.type = config.type || 'date' // 选择器类型，选填
    this.title = config.title || '' // 选择器标题，选填
    this.okText = config.okText || '确定' // 确定按钮文本，选填
    this.cancelText = config.cancelText || '取消' // 取消按钮文本，选填
    // 初始化开始、结束、初始显示时间, 选填
    if (this.type === 'time') {
      if (config.start) {
        if (config.start.length < 2) throw Error('配置项 start 不完整')
        this.start = [
          undefined,
          undefined,
          undefined,
          config.start[0],
          config.start[1]
        ]
      } else this.start = [undefined, undefined, undefined, 0, 0]
      if (config.end) {
        if (config.end.length < 2) throw Error('配置项 end 不完整')
        this.end = [
          undefined,
          undefined,
          undefined,
          config.end[0],
          config.end[1]
        ]
      } else this.end = [undefined, undefined, undefined, 23, 59]
      if (config.initialOption) {
        if (config.initialOption.length < 2) { throw Error('配置项 initialOption 不完整') }
        this.initialOption = [
          undefined,
          undefined,
          undefined,
          config.initialOption[0],
          config.initialOption[1]
        ]
      } else {
        this.initialOption = [
          undefined,
          undefined,
          undefined,
          new Date().getHours(),
          new Date().getMinutes()
        ]
      }
    } else if (this.type === 'dateTime') {
      this.start = config.start || [
        new Date().getFullYear() - 4,
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ]
      this.end = config.end || [
        new Date().getFullYear() + 4,
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ]
      this.initialOption = config.initialOption || [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ]
    } else if (this.type === 'month') {
      this.start = config.start || [
        new Date().getFullYear() - 4,
        new Date().getMonth() + 1
      ]
      this.end = config.end || [
        new Date().getFullYear() + 4,
        new Date().getMonth() + 1
      ]
      this.initialOption = config.initialOption || [
        new Date().getFullYear(),
        new Date().getMonth() + 1
      ]
    } else {
      this.start = config.start || [
        new Date().getFullYear() - 4,
        new Date().getMonth() + 1,
        new Date().getDate()
      ]
      this.end = config.end || [
        new Date().getFullYear() + 4,
        new Date().getMonth() + 1,
        new Date().getDate()
      ]
      this.initialOption = config.initialOption || [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      ]
    }
    this.a = config.a || 0.001 // 惯性滚动加速度（正数, 单位 px/(ms * ms)），选填，默认 0.001
    this.style = config.style // 选择器样式, 选填
    this.hasSuffix = config.hasSuffix || 'yes' // 是否添加时间单位，选填
    this.hasZero = config.hasZero || 'yes' // 一位数是否显示两位，选填
    this.onOk = config.onOk // 成功的回调函数，必填
    this.onCancel = config.onCancel || null // 取消按钮回调函数，选填
    this.beforeShow = config.beforeShow || null // 规定呼起选择器前的逻辑，选填
    this[property] = {} // 存放自定义的属性
    this.check() // 检查配置项是否合法
    this.initTab() // 初始化标签
    this.initUI() // 初始化UI
    this.initEvent() // 初始化事件
  }
  /**
   * 检查配置项是否合法
   */
  check () {
    if (!this.onOk) throw Error('配置项 onOk 不能为空.')
    if (this.hasSuffix !== 'yes' && this.hasSuffix !== 'no') { throw Error('配置项 hasSuffix 不合法.') }
    if (this.hasZero !== 'yes' && this.hasZero !== 'no') { throw Error('配置项 hasZero 不合法.') }
    if (
      this.type !== 'time' &&
      this.type !== 'dateTime' &&
      this.type !== 'month' &&
      this.type !== 'date'
    ) { throw Error('配置项 type 不合法.') }
    if (!isNumberArr(this.start)) throw Error('配置项 start 不合法')
    if (!isNumberArr(this.end)) throw Error('配置项 end 不合法')
    if (!isNumberArr(this.initialOption)) { throw Error('配置项 initialOption 不合法') }
    let start = null
    let end = null
    let first = null
    switch (this.type) {
      case 'date':
        if (this.start.length < 3) throw Error('配置项 start 不完整')
        if (this.end.length < 3) throw Error('配置项 end 不完整')
        if (this.initialOption.length < 3) { throw Error('配置项 initialOption 不完整') }
        start = new Date(
          this.start[0],
          this.start[1] - 1,
          this.start[2]
        ).getTime()
        end = new Date(
          this.end[0],
          this.end[1] - 1,
          this.end[2]
        ).getTime()
        first = new Date(
          this.initialOption[0],
          this.initialOption[1] - 1,
          this.initialOption[2]
        ).getTime()
        if (start > end) throw Error('开始时间不能大于结束时间.')
        if (first > end) this.initialOption = this.end
        if (first < start) this.initialOption = this.start
        break
      case 'month':
        if (this.start.length < 2) throw Error('配置项 start 不完整')
        if (this.end.length < 2) throw Error('配置项 end 不完整')
        if (this.initialOption.length < 2) { throw Error('配置项 initialOption 不完整') }
        start = new Date(
          this.start[0],
          this.start[1] - 1,
        ).getTime()
        end = new Date(
          this.end[0],
          this.end[1] - 1,
        ).getTime()
        first = new Date(
          this.initialOption[0],
          this.initialOption[1] - 1,
        ).getTime()
        if (start > end) throw Error('开始时间不能大于结束时间.')
        if (first > end) this.initialOption = this.end
        if (first < start) this.initialOption = this.start
        break
      case 'time':
        let startStr = this.start[3] + tf(this.start[4])
        start = parseInt(startStr)
        let endStr = this.end[3] + tf(this.end[4])
        end = parseInt(endStr)
        let firstStr = this.initialOption[3] + tf(this.initialOption[4])
        first = parseInt(firstStr)
        if (start > end) throw Error('开始时间不能大于结束时间.')
        if (first > end) this.initialOption = this.end
        if (first < start) this.initialOption = this.start
        break
      case 'dateTime':
        if (this.start.length < 5) throw Error('配置项 start 不完整')
        if (this.end.length < 5) throw Error('配置项 end 不完整')
        if (this.initialOption.length < 5) { throw Error('配置项 initialOption 不完整') }
        start = new Date(
          this.start[0],
          this.start[1] - 1,
          this.start[2],
          this.start[3],
          this.start[4]
        ).getTime()
        end = new Date(
          this.end[0],
          this.end[1] - 1,
          this.end[2],
          this.end[3],
          this.end[4]
        ).getTime()
        first = new Date(
          this.initialOption[0],
          this.initialOption[1] - 1,
          this.initialOption[2],
          this.initialOption[3],
          this.initialOption[4]
        ).getTime()
        if (start > end) throw Error('开始时间不能大于结束时间.')
        if (first > end) this.initialOption = this.end
        if (first < start) this.initialOption = this.start
        break
    }
  }
  /**
   * 定义初始化标签函数
   */
  initTab () {
    this.previousTime = [] // 储存前一次操作的时间
    this.yearArr = [] // 储存年份的数组
    this.monthArr = [] // 储存月份的数组
    this.dayArr = [] // 储存日期的数组
    this.dayNumArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 储存每月天数的数组
    this.hourArr = [] // 储存小时的数组
    this.minuteArr = [] // 储存分钟的数组
    this.dateArr = [] // 储存各项时间的数组
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
    this.liNum = [] // 每个ul中有多少个可选li
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
  }
  /**
   * 定义初始化 UI 函数
   */
  initUI () {
    for (let i = 0; i < this.initialOption.length; i++) {
      this.previousTime.push(this.initialOption[i])
      if (this.initialOption[i]) {
        this.calculateArr(i)
        this.calculateDis(i)
        this.ulCount++
      }
    }
    this.initDateArr()
    this.initLiNum()
    this.createContainer()
    this.renderpicker()
    for (let i = 0; i < this.dateArr.length; i++) {
      if (this.dateArr[i]) this.roll(i)
    }
  }
  /**
   * 定义初始化事件函数
   */
  initEvent () {
    this.container = $id(this.containerId)

    // 点击保存按钮隐藏选择器并输出结果
    $id(this.okId).addEventListener('click', () => {
      this.onOk(this.getResult())
      this.hide()
    })

    // 点击取消隐藏选择器
    $id(this.cancelId).addEventListener('click', () => {
      this.onCancel && this.onCancel()
      this.hide()
    })

    // 点击背景隐藏选择器
    this.wrap.addEventListener('click', (e) => {
      if (
        e.target.id === this.wrapId &&
        this.wrap.classList.contains('hg-picker-bg-show')
      ) {
        this.onCancel && this.onCancel()
        this.hide()
      }
    })

    // 为每个 ul 元素绑定 touch 事件
    this.dateUl.forEach((val, index) => {
      if (val) {
        val.addEventListener(
          'touchstart',
          () => {
            this.touch(index)
          },
          false
        )
        val.addEventListener(
          'touchmove',
          () => {
            this.touch(index)
          },
          false
        )
        val.addEventListener(
          'touchend',
          () => {
            this.touch(index)
          },
          true
        )
      }
    })
  }
  /**
   * 计算并返回当前项显示的数组
   * Explain : @i 需要处理的列的索引
   */
  calculateArr (i) {
    let curTime = null
    let startTime = null
    let endTime = null
    switch (i) {
      case 0:
        this.yearArr = getArr(this.start[0], this.end[0])
        break
      case 1:
        this.monthArr = []
        if (this.start[i - 1] === this.end[i - 1]) { this.monthArr = getArr(this.start[i], this.end[i]) } else if (this.curDate(i - 1) === this.start[i - 1]) { this.monthArr = getArr(this.start[i], 12) } else if (this.curDate(i - 1) === this.end[i - 1]) { this.monthArr = getArr(1, this.end[i]) } else this.monthArr = getArr(1, 12)
        break
      case 2:
        this.dayArr = []
        // 如果是闰年，2月改为29天
        if (this.isLeapYear(this.curDate(0))) this.dayNumArr[1] = 29
        else this.dayNumArr[1] = 28
        curTime = new Date(
          this.curDate(0),
          this.curDate(1) - 1
        ).getTime()
        startTime = new Date(this.start[0], this.start[1] - 1).getTime()
        endTime = new Date(this.end[0], this.end[1] - 1).getTime()
        if (startTime === endTime) { this.dayArr = getArr(this.start[2], this.end[2]) } else if (curTime === startTime) {
          this.dayArr = getArr(
            this.start[2],
            this.dayNumArr[this.curDate(1) - 1]
          )
        } else if (curTime === endTime) this.dayArr = getArr(1, this.end[2])
        else this.dayArr = getArr(1, this.dayNumArr[this.curDate(1) - 1])
        break
      case 3:
        if (this.type === 'dateTime') {
          curTime = new Date(
            this.curDate(0),
            this.curDate(1) - 1,
            this.curDate(2)
          ).getTime()
          startTime = new Date(
            this.start[0],
            this.start[1] - 1,
            this.start[2]
          ).getTime()
          endTime = new Date(
            this.end[0],
            this.end[1] - 1,
            this.end[2]
          ).getTime()
          if (startTime === endTime) { this.hourArr = getArr(this.start[i], this.end[i]) } else if (curTime === startTime) { this.hourArr = getArr(this.start[i], 23) } else if (curTime === endTime) this.hourArr = getArr(0, this.end[i])
          else this.hourArr = getArr(0, 23)
        } else {
          this.hourArr = getArr(this.start[i], this.end[i])
        }
        break
      case 4:
        if (this.type === 'dateTime') {
          curTime = new Date(
            this.curDate(0),
            this.curDate(1) - 1,
            this.curDate(2),
            this.curDate(3)
          ).getTime()
          startTime = new Date(
            this.start[0],
            this.start[1] - 1,
            this.start[2],
            this.start[3]
          ).getTime()
          endTime = new Date(
            this.end[0],
            this.end[1] - 1,
            this.end[2],
            this.end[3]
          ).getTime()
          if (startTime === endTime) { this.minuteArr = getArr(this.start[i], this.end[i]) } else if (curTime === startTime) { this.minuteArr = getArr(this.start[i], 59) } else if (curTime === endTime) { this.minuteArr = getArr(0, this.end[i]) } else this.minuteArr = getArr(0, 59)
        } else {
          if (this.start[i - 1] === this.end[i - 1]) { this.minuteArr = getArr(this.start[i], this.end[i]) } else if (this.curDate(i - 1) === this.start[i - 1]) { this.minuteArr = getArr(this.start[i], 59) } else if (this.curDate(i - 1) === this.end[i - 1]) { this.minuteArr = getArr(0, this.end[i]) } else this.minuteArr = getArr(0, 59)
        }
        break
    }
  }
  /**
   * 获取对应列的所有数据
   * Explain : @i 需要处理的列的索引
   */
  CurArr (i) {
    let curArr = []
    if (i === 0) curArr = this.yearArr
    if (i === 1) curArr = this.monthArr
    if (i === 2) curArr = this.dayArr
    if (i === 3) curArr = this.hourArr
    if (i === 4) curArr = this.minuteArr
    return curArr
  }
  /**
   * 获取对应列的结果
   * Explain : @i 需要处理的列的索引
   */
  curDate (i) {
    let curDate = 0
    // this.dateArr 还没有被赋值的情况
    if (this.dateArr.length === 0) curDate = this.initialOption[i]
    else {
      if (this.dateArr[i] === undefined) curDate = undefined
      else curDate = this.dateArr[i][this.dateIndex[i]]
    }
    return curDate
  }
  /**
   * 计算并返回当前项所在的位置
   * Explain : @i 需要处理的列的索引
   */
  calculateDis (i) {
    let curArr = this.CurArr(i)
    if (this.previousTime[i] > curArr[curArr.length - 1]) { this.dateIndex[i] = curArr.length - 1 } else if (this.previousTime[i] < curArr[0]) this.dateIndex[i] = 0
    else {
      for (let j = 0; j < curArr.length; j++) {
        if (curArr[j] === this.previousTime[i]) {
          this.dateIndex[i] = j
          break
        }
      }
    }
    this.curDis[i] = -1 * this.liHeight * this.dateIndex[i]
  }
  /**
   * 根据选择器类型确定 dateArr
   */
  initDateArr () {
    switch (this.type) {
      case 'date':
        this.dateArr = [this.yearArr, this.monthArr, this.dayArr]
        break
      case 'month':
        this.dateArr = [this.yearArr, this.monthArr]
        break
      case 'time':
        this.dateArr = [
          undefined,
          undefined,
          undefined,
          this.hourArr,
          this.minuteArr
        ]
        break
      case 'dateTime':
        this.dateArr = [
          this.yearArr,
          this.monthArr,
          this.dayArr,
          this.hourArr,
          this.minuteArr
        ]
        break
      default:
        throw Error('Please set a right type of hg-picker.')
    }
  }
  /**
   * 判断每个 ul 中有多少个 li 选项
   * Explain : @index 需要处理的列的索引
   */
  initLiNum (index) {
    if (index) {
      if (this.dateArr[index] !== undefined) {
        this.liNum[index] = this.dateArr[index].length
      }
    } else {
      for (let i = 0; i < this.dateArr.length; i++) {
        if (this.dateArr[i] !== undefined) {
          this.liNum[i] = this.dateArr[i].length
        }
      }
    }
  }
  /**
   * 创建选择器外包裹元素
   */
  createContainer () {
    let div = document.createElement('div')
    div.id = this.wrapId
    document.body.appendChild(div)
    this.wrap = $id(this.wrapId)
    this.wrap.classList.add('hg-picker-bg')
  }
  /**
   * 渲染选择器
   */
  renderpicker () {
    let len = this.dateArr.length

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
      if (this.dateArr[i] !== undefined) str += this.renderUl(i)
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
      if (this.dateArr[i] !== undefined) {
        this.dateUl[i] = $id(this.wrapId + '-ul-' + i)
        this.dateUl[i].style.width = (100 / this.ulCount).toFixed(2) + '%'
        this.renderLi(i)
      }
    }
    this.setStyle()
  }
  /**
   * 设置选择器样式
   */
  setStyle () {
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
    if (obj.contentBgColor) { content.style.backgroundColor = obj.contentBgColor }
    if (obj.upShadowColor) { content.children[len - 3].style.backgroundImage = obj.upShadowColor }
    if (obj.downShadowColor) { content.children[len - 2].style.backgroundImage = obj.downShadowColor }
    if (obj.lineColor) { content.children[len - 1].style.borderColor = obj.lineColor }
  }
  /**
   * 渲染 ul 元素
   * Explain : @i 需要处理的列的索引
   * Return : String
   */
  renderUl (i) {
    return '<ul id="' + this.wrapId + '-ul-' + i + '"></ul>'
  }
  /**
   * 渲染 li 元素
   * Explain : @i 需要处理的列的索引
   */
  renderLi (i) {
    this.dateUl[i].innerHTML = ''
    let lis = '<li></li><li></li>'
    this.dateArr[i].forEach((val) => {
      val = this.addZero(val)
      lis += '<li>' + val + this.suffix[i] + '</li>'
    })
    lis += '<li></li><li></li>'
    this.dateUl[i].innerHTML = lis
    if (this.liHeight !== 40) { setChildStyle(this.dateUl[i], 'height', this.liHeight + 'px') }
  }
  /**
   * 控制列表的滚动
   * Explain : @i 需要处理的列的索引
   * @time 滚动持续时间
   */
  roll (i, time) {
    if (this.curDis[i] || this.curDis[i] === 0) {
      this.dateUl[i].style.transform =
        'translate3d(0, ' + this.curDis[i] + 'px, 0)'
      this.dateUl[i].style.webkitTransform =
        'translate3d(0, ' + this.curDis[i] + 'px, 0)'
      if (time) {
        this.dateUl[i].style.transition = 'transform ' + time + 's ease-out'
        this.dateUl[i].style.webkitTransition =
          '-webkit-transform ' + time + 's ease-out'
      }
    }
  }
  /**
   * 时间选择器触摸事件
   * Explain : @i 需要处理的列的索引
   */
  touch (i) {
    const event = window.event
    event.preventDefault()
    switch (event.type) {
      case 'touchstart':
        this.startTime = Date.now()
        // 列表滚动中禁止二次操作
        if (this.startTime - this.endTime < 200) {
          this.abled = false
          return
        } else this.abled = true
        this.startY = event.touches[0].clientY
        this.curPos[i] = this.curDis[i]
        this.previousTime[i] = this.curDate(i)
        this.moveNumber = 1
        this.moveSpeed = []
        break
      case 'touchmove':
        if (!this.abled) return
        event.preventDefault()
        this.moveY = event.touches[0].clientY
        let offset = this.startY - this.moveY // 向上为正数，向下为负数
        this.moveTime = Date.now()
        this.curDis[i] = this.curPos[i] - offset
        if (this.curDis[i] >= 1.5 * this.liHeight) { this.curDis[i] = 1.5 * this.liHeight }
        if (
          this.curDis[i] <=
          -1 * (this.liNum[i] - 1 + 1.5) * this.liHeight
        ) {
          this.curDis[i] = -1 * (this.liNum[i] - 1 + 1.5) * this.liHeight
        }
        this.roll(i)
        // 每运动 130 毫秒，记录一次速度
        if (this.moveTime - this.startTime >= 130 * this.moveNumber) {
          this.moveNumber++
          this.moveSpeed.push(offset / (this.moveTime - this.startTime))
        }
        break
      case 'touchend':
        if (!this.abled) return
        this.endTime = Date.now()
        let speed = null
        if (this.moveNumber === 1) {
          speed =
            (this.startY - event.changedTouches[0].clientY) /
            (this.endTime - this.startTime)
        } else {
          speed = this.moveSpeed[this.moveSpeed.length - 1]
        }
        this.curDis[i] = this.curDis[i] - calculateBuffer(speed, this.a)
        this.fixate(i)
        this.roll(i, 0.2)
        for (let j = i; j < this.dateArr.length - 1; j++) {
          if (this.dateArr[j + 1]) this.changeDate(j + 1)
        }
        this.previousTime[i] = this.curDate(i)
        break
    }
  }
  /**
   * 确定 ul 最终的位置
   * Explain : @i 需要定位的列的索引
   */
  fixate (i) {
    if (this.curDis[i] <= -1 * (this.liNum[i] - 1) * this.liHeight) { this.dateIndex[i] = this.liNum[i] - 1 } else if (this.curDis[i] >= 0) this.dateIndex[i] = 0
    else this.dateIndex[i] = -1 * Math.round(this.curDis[i] / this.liHeight)
    this.curDis[i] = -1 * this.liHeight * this.dateIndex[i]
  }
  /**
   * 边界判断
   * Explain : @i 需要判断边界的列的索引
   *  如果已经到边界则改变视图
   */
  changeDate (i) {
    this.calculateArr(i)
    this.dateArr[i] = this.CurArr(i)
    this.calculateDis(i)
    this.initLiNum(i)
    this.renderLi(i)
    this.roll(i)
  }
  /**
   * 判断是否是闰年
   * Explain : @year 年份
   */
  isLeapYear (year) {
    let cond1 = year % 4 === 0
    let cond2 = year % 100 !== 0
    let cond3 = year % 400 === 0
    let cond = (cond1 && cond2) || cond3
    if (cond) return true
    else return false
  }
  /**
   * 返回最终结果的数组
   * Return : Array
   */
  getResult () {
    let arr = []
    for (let i = 0; i < this.dateArr.length; i++) {
      if (this.dateArr[i]) arr.push(this.dateArr[i][this.dateIndex[i]])
    }
    return arr
  }
  /**
   * 加零，一位数显示为两位
   * Explain : @num 需要处理的数字
   * Return : Number
   */
  addZero (num) {
    if (this.hasZero === 'yes' && num < 10) num = '0' + num
    return num
  }
  /**
   * 显示选择器
   */
  show () {
    this.wrap.classList.add('hg-picker-bg-show')
    this.container.classList.add('hg-picker-container-up')
  }
  /**
   * 隐藏选择器
   */
  hide () {
    this.wrap.classList.remove('hg-picker-bg-show')
    this.container.classList.remove('hg-picker-container-up')
  }
  /**
   * 设置选择器属性
   */
  set (obj) {
    for (let [key, value] of Object.entries(obj)) {
      if (/^(title|cancelText|okText|a|onOk|onCancel)$/.test(key)) {
        this[key] = value
        if (key === 'title') $id(this.titleId).innerHTML = value
        else if (key === 'okText') $id(this.okId).innerHTML = value
        else if (key === 'cancelText') $id(this.cancelId).innerHTML = value
      } else {
        this[property][key] = value
      }
    }
    return this
  }
  /**
   * 获取选择器属性
   */
  get (key) {
    if (/^(title|cancelText|okText|a|onOk|onCancel)$/.test(key)) {
      return this[key]
    } else {
      return this[property][key]
    }
  }
}
