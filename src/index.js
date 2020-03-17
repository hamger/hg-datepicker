import {
  setChildStyle,
  $id,
  errLog,
  getArr
} from './utils'
import check, {
  checkValue
} from './check'
import label from './label'
import create from './create'
import event from './event'

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
        if (config.start.length < 2) errLog('配置项 start 不完整')
        this.start = [
          undefined,
          undefined,
          undefined,
          config.start[0],
          config.start[1]
        ]
      } else this.start = [undefined, undefined, undefined, 0, 0]
      if (config.end) {
        if (config.end.length < 2) errLog('配置项 end 不完整')
        this.end = [
          undefined,
          undefined,
          undefined,
          config.end[0],
          config.end[1]
        ]
      } else this.end = [undefined, undefined, undefined, 23, 59]
      if (config.initValue) {
        if (config.initValue.length < 2) {
          errLog('配置项 initValue 不完整')
        }
        this.initValue = [
          undefined,
          undefined,
          undefined,
          config.initValue[0],
          config.initValue[1]
        ]
      } else {
        this.initValue = [
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
      this.initValue = config.initValue || [
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
      this.initValue = config.initValue || [
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
      this.initValue = config.initValue || [
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
    this[property] = {} // 存放自定义的参数
    check.call(this) // 检查配置项是否合法
    label.call(this) // 初始化标签
    create.call(this) // 创建选择器
    event.call(this) // 绑定事件
  }
  /**
   * 计算并返回当前项的枚举
   * Explain : @i 需要处理的列的索引
   */
  calculateMap (i) {
    let curTime = null
    let startTime = null
    let endTime = null
    switch (i) {
      case 0:
        this.yearMap = getArr(this.start[0], this.end[0])
        break
      case 1:
        this.monthMap = []
        if (this.start[i - 1] === this.end[i - 1]) {
          this.monthMap = getArr(this.start[i], this.end[i])
        } else if (this.curDate(i - 1) === this.start[i - 1]) {
          this.monthMap = getArr(this.start[i], 12)
        } else if (this.curDate(i - 1) === this.end[i - 1]) {
          this.monthMap = getArr(1, this.end[i])
        } else this.monthMap = getArr(1, 12)
        break
      case 2:
        this.dayMap = []
        // 如果是闰年，2月改为29天
        if (this.isLeapYear(this.curDate(0))) this.dayNumArr[1] = 29
        else this.dayNumArr[1] = 28
        curTime = new Date(
          this.curDate(0),
          this.curDate(1) - 1
        ).getTime()
        startTime = new Date(this.start[0], this.start[1] - 1).getTime()
        endTime = new Date(this.end[0], this.end[1] - 1).getTime()
        if (startTime === endTime) {
          this.dayMap = getArr(this.start[2], this.end[2])
        } else if (curTime === startTime) {
          this.dayMap = getArr(
            this.start[2],
            this.dayNumArr[this.curDate(1) - 1]
          )
        } else if (curTime === endTime) this.dayMap = getArr(1, this.end[2])
        else this.dayMap = getArr(1, this.dayNumArr[this.curDate(1) - 1])
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
          if (startTime === endTime) {
            this.hourMap = getArr(this.start[i], this.end[i])
          } else if (curTime === startTime) {
            this.hourMap = getArr(this.start[i], 23)
          } else if (curTime === endTime) this.hourMap = getArr(0, this.end[i])
          else this.hourMap = getArr(0, 23)
        } else {
          this.hourMap = getArr(this.start[i], this.end[i])
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
          if (startTime === endTime) {
            this.minuteMap = getArr(this.start[i], this.end[i])
          } else if (curTime === startTime) {
            this.minuteMap = getArr(this.start[i], 59)
          } else if (curTime === endTime) {
            this.minuteMap = getArr(0, this.end[i])
          } else this.minuteMap = getArr(0, 59)
        } else {
          if (this.start[i - 1] === this.end[i - 1]) {
            this.minuteMap = getArr(this.start[i], this.end[i])
          } else if (this.curDate(i - 1) === this.start[i - 1]) {
            this.minuteMap = getArr(this.start[i], 59)
          } else if (this.curDate(i - 1) === this.end[i - 1]) {
            this.minuteMap = getArr(0, this.end[i])
          } else this.minuteMap = getArr(0, 59)
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
    if (i === 0) curArr = this.yearMap
    if (i === 1) curArr = this.monthMap
    if (i === 2) curArr = this.dayMap
    if (i === 3) curArr = this.hourMap
    if (i === 4) curArr = this.minuteMap
    return curArr
  }
  /**
   * 获取对应列的结果
   * Explain : @i 需要处理的列的索引
   */
  curDate (i) {
    let curDate = 0
    // this.maps 还没有被赋值的情况
    if (this.maps.length === 0) curDate = this.initValue[i]
    else {
      if (this.maps[i] === undefined) curDate = undefined
      else curDate = this.maps[i][this.dateIndex[i]]
    }
    return curDate
  }
  /**
   * 计算并返回当前项所在的位置
   * Explain : @i 需要处理的列的索引
   */
  calculateDis (i) {
    let curArr = this.CurArr(i)
    if (this.previousTime[i] > curArr[curArr.length - 1]) this.dateIndex[i] = curArr.length - 1
    else if (this.previousTime[i] < curArr[0]) this.dateIndex[i] = 0
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
   * 根据选择器类型确定 maps
   */
  initmaps () {
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
  /**
   * 判断每个 ul 中有多少个 li 选项
   * Explain : @index 需要处理的列的索引
   */
  initLiNum (index) {
    if (index) {
      if (this.maps[index] !== undefined) {
        this.liNum[index] = this.maps[index].length
      }
    } else {
      for (let i = 0; i < this.maps.length; i++) {
        if (this.maps[i] !== undefined) {
          this.liNum[i] = this.maps[i].length
        }
      }
    }
  }
  /**
   * 渲染 li 元素
   * Explain : @i 需要处理的列的索引
   */
  renderLi (i) {
    this.dateUl[i].innerHTML = ''
    let lis = '<li></li><li></li>'
    this.maps[i].forEach((val) => {
      val = this.addZero(val)
      lis += '<li>' + val + this.suffix[i] + '</li>'
    })
    lis += '<li></li><li></li>'
    this.dateUl[i].innerHTML = lis
    if (this.liHeight !== 40) {
      setChildStyle(this.dateUl[i], 'height', this.liHeight + 'px')
    }
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
   * 确定 ul 最终的位置
   * Explain : @i 需要定位的列的索引
   */
  fixate (i) {
    if (this.curDis[i] <= -1 * (this.liNum[i] - 1) * this.liHeight) {
      this.dateIndex[i] = this.liNum[i] - 1
    } else if (this.curDis[i] >= 0) this.dateIndex[i] = 0
    else this.dateIndex[i] = -1 * Math.round(this.curDis[i] / this.liHeight)
    this.curDis[i] = -1 * this.liHeight * this.dateIndex[i]
  }
  /**
   * 边界判断
   * Explain : @i 需要判断边界的列的索引
   *  如果已经到边界则改变视图
   */
  changeDate (i) {
    this.calculateMap(i)
    this.maps[i] = this.CurArr(i)
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
    for (let i = 0; i < this.maps.length; i++) {
      if (this.maps[i]) arr.push(this.maps[i][this.dateIndex[i]])
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
      } else if (/^(value)$/.test(key)) {
        checkValue.call(this, value)
        this.previousTime = value
        for (let i = 0; i < value.length; i++) {
          if (value[i]) {
            this.changeDate(i)
          }
        }
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
    } else if (/^(value)$/.test(key)) {
      return this.getResult()
    } else {
      return this[property][key]
    }
  }
}
