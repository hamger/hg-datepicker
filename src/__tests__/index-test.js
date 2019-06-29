/* eslint-env jest */
import DatePicker from '../index'

const data = [
  [
    { value: '预言家', description: '每晚可查验一名玩家' },
    { value: '狼人', description: '每晚可击杀一名玩家' },
    { value: '平民', description: 'xx' },
    { value: '女巫', description: 'xx' },
    { value: '猎人', description: 'xx' },
    { value: '白痴', description: 'xx' }
  ],
  ['存活', '死亡', '吃刀', '票出', '吃毒', '中枪']
]

const picker = new DatePicker({
  data,
  title: '玩家属性',
  style: {
    liHeight: 42,
    btnHeight: 50,
    btnLocation: 'bottom',
    btnOffset: '22px',
    titleColor: 'red',
    okColor: 'red',
    cancelColor: 'red',
    btnBgColor: 'red',
    contentColor: 'red',
    contentBgColor: 'red',
    upShadowColor: 'red',
    downShadowColor: 'red',
    lineColor: 'red'
  },
  cancel () {
    console.log('取消选择')
  },
  onOk (arr) {
    console.log(arr)
    document.getElementById(`para-input${this.playerNumber}`).innerHTML = arr
  }
})
const picker2 = new DatePicker({
  data,
  onOk (arr) {
    console.log(arr)
    document.getElementById(`para-input${this.playerNumber}`).innerHTML = arr
  }
})

describe('picker test', () => {
  beforeAll(() => {
    console.error = error => {
      throw new Error(error)
    }
  })

  it('picker', () => {
    picker.show()
    picker.hide()
    picker.setTitle('1号玩家')
    expect(picker.title).toBe('1号玩家')
  })
  it('picker2', () => {
    expect(picker2.getResult()).toEqual([
      { value: '预言家', description: '每晚可查验一名玩家' },
      '存活'
    ])
  })
})
