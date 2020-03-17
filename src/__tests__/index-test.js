/* eslint-env jest */
import DatePicker from '../index'

var picker = new DatePicker({
  start: [2017, 1, 1],
  end: [2018, 9, 17],
  initValue: [2018, 9, 10],
  style: {
    btnLocation: 'bottom',
    liHeight: 45,
    btnHeight: 50,
    btnOffset: '30px',
    okColor: '#5bcffe',
    cancleColor: 'rgb(221, 159, 159)',
    btnBgColor: 'rgba(141, 240, 128, 0.55)',
    contentBgColor: '#adf499',
    contentColor: '#000',
    titleColor: 'green',
    lineColor: '#00ff2f',
    upShadow: 'linear-gradient(to bottom, rgb(14, 140, 14), rgba(14, 140, 14, 0))',
    downShadow: 'linear-gradient(to top, rgb(14, 140, 14), rgba(14, 140, 14, 0))'
  },
  cancel: function () {
    console.log('取消日期选择')
  },
  onOk: function (arr) { // 回调函数
    console.log(arr)
    document.getElementById('date-input' + this.get('pickerNumber')).innerHTML = arr
  }
})
var picker2 = new DatePicker({
  inputId: 'date-input2',
  type: 'time', // 选择器类型
  start: [2, 30], // 开始时间
  end: [22, 20], // 结束时间
  onOk: function (arr) {
    console.log(arr)
    document.getElementById('time-input').innerHTML = arr
  }
})
var picker3 = new DatePicker({
  type: 'dateTime',
  style: {
    btnHeight: 44
  },
  start: [2020, 2, 2, 2, 20], // 开始时间
  end: [2120, 4, 4, 5, 50], // 结束时间
  hasSuffix: 'no', // 不添加时间单位
  hasZero: 'no', // 单位数不显两位
  onOk: function (arr) {
    console.log(arr)
    document.getElementById('datetime-input').innerHTML = arr
  }
})

describe('picker test', () => {
  beforeAll(() => {
    console.error = error => {
      throw new Error(error)
    }
  })

  it('picker', () => {
    picker.set({
      pickerNumber: 1,
      title: '1号选择器',
      cancelText: 'cancel',
      okText: 'ok'
    })
    expect(picker.get('title')).toBe('1号选择器')
    expect(picker.get('pickerNumber')).toBe(1)
    expect(picker.pickerNumber).toBe(undefined)
    expect(picker.getResult()).toEqual([2018, 9, 10])
  })
  it('picker2', () => {
    picker2.show()
    picker2.hide()
  })
  it('picker3', () => {
    picker3.show()
    picker3.hide()
  })
})
