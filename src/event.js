import {
  $id,
  calculateBuffer
} from './utils'
/**
 * 时间选择器触摸事件
 * Explain : @i 需要处理的列的索引
 */
function bindTouch (i) {
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
      if (this.curDis[i] >= 1.5 * this.liHeight) {
        this.curDis[i] = 1.5 * this.liHeight
      }
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
      for (let j = i; j < this.maps.length - 1; j++) {
        if (this.maps[j + 1]) this.changeDate(j + 1)
      }
      this.previousTime[i] = this.curDate(i)
      break
  }
}

function event () {
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
          bindTouch.call(this, index)
        },
        false
      )
      val.addEventListener(
        'touchmove',
        () => {
          bindTouch.call(this, index)
        },
        false
      )
      val.addEventListener(
        'touchend',
        () => {
          bindTouch.call(this, index)
        },
        true
      )
    }
  })
}

export default event
