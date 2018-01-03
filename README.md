# hg-datepicker
移动端的日期选择器
## Demo
[点击这里可跳转到演示页面](https://hamger.github.io/demo/picker/picker.html)，请在移动端打开或者使用浏览器移动端调试工具打开。 
## 下载插件
`npm i hg-datepicker`下载
## 快速使用 
首先引入文件
```html
<!-- 日期和地址选择器公共css样式 -->
<link rel="stylesheet" type="text/css" href="./picker.css" />
<!-- 使用日期选择器需要引入的js文件 -->
<script src="./datePicker.js"></script>
```
如果你使用构建工具，这样引入
```js
import 'hg-datepicker/picker.css'; // 引入插件 css 文件
import DatePicker from 'hg-datepicker'; // 引入插件 js 文件
```
实例化日期选择器`new DatePicker(option)`
```js
new DatePicker({
    inputId: 'date-input', // 目标DOM元素ID
    success: function(arr) { // 回调函数
        console.log(arr);
    }
});
```
## 日期选择器配置项
`option`是一个配置项的对象，可以接受如下参数：

key | value | description
--------|------|-----
inputId | <string> | 目标DOM元素ID，必填
success | <function>  |  确定后的回调函数，返回一个参数，该参数为表示时间的数组，如[2002,2,2]表示2002年2月2号，必填
cancel | <function>  |  点击取消按钮或者背景后的回调函数，选填
type | `date` \| `dateTime` \| `time` | 日期选择器的类型，`time`（分时），`dateTime`(年月日时分)，默认 `date`（年月日）
start | <array> | 开始时间的数组，默认四年前
end | <array> | 结束时间的数组，默认四年后
firstTime | <array> | 初始显示时间的数组，默认当前时间
title | <string> | 选择器标题，默认为空
sureText | <string> | 确定按钮文本，默认为“确定”
cancelText | <string> | 取消按钮文本，默认为“取消”
hasSuffix | `yes` \| `no` | 是否添加时间单位，默认 `yes`
hasZero | `yes` \| `no` | 一位数前是否加零，默认 `yes`
f | <number> | 惯性滚动阈值（正数, 单位 px/ms），默认 `0.85`
a | <number> | 惯性滚动加速度（正数, 单位 px/(ms * ms)），默认 `0.001`
style | <object> | 包含样式配置的对象

`style`对象可以接受如下参数：

key | value | description
--------|------|-----
liHeight | <number> | 每一个选择栏的高度（px），默认 `40`
btnHeight | <number> | 按钮栏的高度（px），默认 `40`
btnOffset | <string> | 按钮离边框的距离，默认 `20px`
width | <string> | 选择器的宽度，默认 `100%`
left | <string> | 选择器的左边缘与左侧屏幕的距离，默认 `0px`
right | <string> | 选择器的右边缘与右侧屏幕的距离，默认不设置
top | <string> | 选择器的上边缘与顶部屏幕的距离，默认不设置
bottom | <string> | 选择器的下边缘与底部屏幕的距离，默认 `0px`
location | `top` \| `bottom` \| `center` | 选择器垂直方向的位置，优先级高于`top`和`bottom`，默认不设置
radius | <string> | 选择器的圆角设置，默认不设置
titleColor | <string> | 选择器标题的字体颜色
sureBtnColor | <string> | 选择器确定按钮的字体颜色
abolishBtnColor | <string> | 选择器取消按钮的字体颜色
btnBgColor | <string> | 选择器按钮栏的背景颜色
contentColor | <string> | 选择器选择区域的文字颜色
contentBgColor | <string> | 选择器选择区域的背景颜色
upShadowColor | <string> | 选择器顶部朦层颜色
downShadowColor | <string> | 选择器底部朦层颜色
lineColor | <string> | 选择器分隔线颜色
