import {
  tf,
  isNumberArr,
  errLog
} from './utils'

export function checkValue (value) {
  if (!isNumberArr(value)) errLog('设置的 value 不合法')
  let start = null
  let end = null
  let first = null
  switch (this.type) {
    case 'date':
      if (!(value[0] && value[1] && value[2])) errLog('设置的 value 不完整')
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
        value[0],
        value[1] - 1,
        value[2]
      ).getTime()
      break
    case 'month':
      if (!(value[0] && value[1])) errLog('设置的 value 不完整')
      start = new Date(
        this.start[0],
        this.start[1] - 1,
      ).getTime()
      end = new Date(
        this.end[0],
        this.end[1] - 1,
      ).getTime()
      first = new Date(
        value[0],
        value[1] - 1,
      ).getTime()
      break
    case 'time':
      if (!(value[3] && value[4])) errLog('设置的 value 不完整')
      let startStr = this.start[3] + tf(this.start[4])
      start = parseInt(startStr)
      let endStr = this.end[3] + tf(this.end[4])
      end = parseInt(endStr)
      let firstStr = value[3] + tf(value[4])
      first = parseInt(firstStr)
      break
    case 'dateTime':
      if (!(value[0] && value[1] && value[2] && value[3] && value[4])) errLog('设置的 value 不完整')
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
        value[0],
        value[1] - 1,
        value[2],
        value[3],
        value[4]
      ).getTime()
      break
  }
  if (first > end) errLog('设置的 value 不能大于结束时间')
  if (first < start) errLog('设置的 value 不能小于开始时间')
}

function check () {
  if (!this.onOk) errLog('配置项 onOk 不能为空.')
  if (this.hasSuffix !== 'yes' && this.hasSuffix !== 'no') {
    errLog('配置项 hasSuffix 不合法.')
  }
  if (this.hasZero !== 'yes' && this.hasZero !== 'no') {
    errLog('配置项 hasZero 不合法.')
  }
  if (
    this.type !== 'time' &&
    this.type !== 'dateTime' &&
    this.type !== 'month' &&
    this.type !== 'date'
  ) {
    errLog('配置项 type 不合法.')
  }
  if (!isNumberArr(this.start)) errLog('配置项 start 不合法')
  if (!isNumberArr(this.end)) errLog('配置项 end 不合法')
  if (!isNumberArr(this.initValue)) {
    errLog('配置项 initValue 不合法')
  }
  let start = null
  let end = null
  let first = null
  switch (this.type) {
    case 'date':
      if (!(this.start[0] && this.start[1] && this.start[2])) errLog('配置项 start 不完整')
      if (!(this.end[0] && this.end[1] && this.end[2])) errLog('配置项 end 不完整')
      if (!(this.initValue[0] && this.initValue[1] && this.initValue[2])) errLog('配置项 initValue 不完整')
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
        this.initValue[0],
        this.initValue[1] - 1,
        this.initValue[2]
      ).getTime()
      if (start > end) errLog('开始时间不能大于结束时间.')
      if (first > end) this.initValue = this.end
      if (first < start) this.initValue = this.start
      break
    case 'month':
      if (!(this.start[0] && this.start[1])) errLog('配置项 start 不完整')
      if (!(this.end[0] && this.end[1])) errLog('配置项 end 不完整')
      if (!(this.initValue[0] && this.initValue[1])) errLog('配置项 initValue 不完整')
      start = new Date(
        this.start[0],
        this.start[1] - 1,
      ).getTime()
      end = new Date(
        this.end[0],
        this.end[1] - 1,
      ).getTime()
      first = new Date(
        this.initValue[0],
        this.initValue[1] - 1,
      ).getTime()
      if (start > end) errLog('开始时间不能大于结束时间.')
      if (first > end) this.initValue = this.end
      if (first < start) this.initValue = this.start
      break
    case 'time':
      if (!(this.start[3] && this.start[4])) errLog('配置项 start 不完整')
      if (!(this.end[3] && this.end[4])) errLog('配置项 end 不完整')
      if (!(this.initValue[3] && this.initValue[4])) errLog('配置项 initValue 不完整')
      let startStr = this.start[3] + tf(this.start[4])
      start = parseInt(startStr)
      let endStr = this.end[3] + tf(this.end[4])
      end = parseInt(endStr)
      let firstStr = this.initValue[3] + tf(this.initValue[4])
      first = parseInt(firstStr)
      if (start > end) errLog('开始时间不能大于结束时间.')
      if (first > end) this.initValue = this.end
      if (first < start) this.initValue = this.start
      break
    case 'dateTime':
      if (!(this.start[0] && this.start[1] && this.start[2] && this.start[3] && this.start[4])) errLog('配置项 start 不完整')
      if (!(this.end[0] && this.end[1] && this.end[2] && this.end[3] && this.end[4])) errLog('配置项 end 不完整')
      if (!(this.initValue[0] && this.initValue[1] && this.initValue[2] && this.initValue[3] && this.initValue[4])) errLog('配置项 initValue 不完整')
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
        this.initValue[0],
        this.initValue[1] - 1,
        this.initValue[2],
        this.initValue[3],
        this.initValue[4]
      ).getTime()
      if (start > end) errLog('开始时间不能大于结束时间.')
      if (first > end) this.initValue = this.end
      if (first < start) this.initValue = this.start
      break
  }
}

export default check
