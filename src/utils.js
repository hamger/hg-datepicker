/**
 * 生成 UUID (Universally Unique IDentifier, 通用唯一标识符)
 */
export function generateUUID () {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return uuid
}

/**
 * 以 id 获取 DOM
 */
export function $id (id) {
  return document.getElementById(id)
}

/**
 * 设置子元素样式
 */
export function setChildStyle (parent, key, val) {
  const {
    children
  } = parent
  for (let i = 0; i < children.length; i++) {
    children[i].style[key] = val
  }
}

/**
 * 计算滚动缓冲距离
 * Return : Number
 * Explain : @v 速度（正负表示运动方向, 单位 px/ms）
 * @a 加速度（正数, 单位 px/(ms * ms)）
 */
export function calculateBuffer (v, a) {
  if (Math.abs(v) < 0.25) return 0
  return (v / Math.abs(v)) * ((0.5 * v * v) / a)
}

/**
 * 获取从 start 到 end 的数组
 * Return : Array
 */
export function getArr (start, end) {
  var arr = []
  for (var i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}

/**
 * 个位数前加 0
 * Return : String
 */
export function tf (i) {
  return (i < 10 ? '0' : '') + i
}

/**
 * 是否是每项为数字的数组
 * Return : Boolean
 */
export function isNumberArr (arr) {
  if (arr instanceof Array) {
    return arr.every(function (val) {
      return typeof val === 'number' || typeof val === 'undefined'
    })
  } else return false
}

/**
 * 判断两个数组是否相等
 * Return : Boolean
 */
export function equiArr (arr, arr2) {
  if (arr instanceof Array && arr2 instanceof Array) {
    var len = arr.length > arr2.length ? arr.length : arr2.length
    return Array(len).fill(1).every(function (val, index) {
      return arr[index] === arr2[index]
    })
  } else return false
}

/**
 * 错误打印
 */
export function errLog (msg) {
  throw Error(`[Error in hg-datepicker]: ${msg}`)
}
