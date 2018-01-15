# hg-datepicker
![build](https://img.shields.io/badge/build-passed-brightgreen.svg)
![npm](https://img.shields.io/badge/npm-v0.1.16-blue.svg)
![licence](https://img.shields.io/badge/licence-MIT-orange.svg)
## Demo
[点击这里可跳转到演示页面](https://hamger.github.io/demo/datepicker/datepicker.html)，请在移动端打开或者使用浏览器移动端调试工具打开。 
## 下载插件
* Github下载：[下载地址](https://github.com/hamger/hg-datepicker)
* npm下载：`npm i hg-datepicker`
## 快速使用 
首先引入文件
```html
<link rel="stylesheet" type="text/css" href="./picker.min.css" />
<script src="./datepicker.min.js"></script>
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

如果你使用构建工具，可以这样引入
```js
import 'hg-datepicker/picker.min.css';
import DatePicker from 'hg-datepicker';
```
在`vue`中实例化插件，如果数据是异步请求过来的，实例化写在请求成功后的回调中
```js
...
mounted () {
	this.$nextTick(() => {
		new DatePicker({
		    inputId: 'date-input', // 目标DOM元素ID
		    success: function(arr) { // 回调函数
		        console.log(arr);
		    }
		});
	});
}
...
```
## 日期选择器配置项
`option`是一个配置项的对象，可以接受如下选项：

key | value | description
--------|------|-----
inputId | String | 目标DOM元素ID，必填
success | Funtion  |  确定后的回调函数，第一个参数为表示时间的数组，如[2002,2,2]表示2002年2月2号，必填
cancel | Funtion  |  点击取消按钮或者背景后的回调函数，选填
type | `time` \| `dateTime` \| `date` | 日期选择器的类型，`time`（分时），`dateTime`(年月日时分)，默认 `date`（年月日）
start | Array<Number> | 开始时间的数组，默认四年前
end | Array<Number> | 结束时间的数组，默认四年后
firstTime | Array<Number> | 初始显示时间的数组，默认当前时间
title | String | 选择器标题，默认为空
sureText | String | 确定按钮文本，默认为“确定”
cancelText | String | 取消按钮文本，默认为“取消”
hasSuffix | `yes` \| `no` | 是否添加时间单位，默认 `yes`
hasZero | `yes` \| `no` | 一位数前是否加零，默认 `yes`
f | Number | 惯性滚动阈值（正数, 单位 px/ms），默认 `0.85`
a | Number | 惯性滚动加速度（正数, 单位 px/(ms * ms)），默认 `0.001`
style | Obeject | 包含样式配置的对象

`style`对象可以接受如下选项：

key | value | description
--------|------|-----
liHeight | Number | 每一个选择栏的高度（px），默认 `40`
btnHeight | Number | 按钮栏的高度（px），默认 `44`
btnOffset | String | 按钮离边框的距离，默认 `20px`
titleColor | String | 选择器标题的字体颜色
sureBtnColor | String | 选择器确定按钮的字体颜色
abolishBtnColor | String | 选择器取消按钮的字体颜色
btnBgColor | String | 选择器按钮栏的背景颜色
contentColor | String | 选择器选择区域的文字颜色
contentBgColor | String | 选择器选择区域的背景颜色
upShadowColor | String | 选择器顶部朦层颜色
downShadowColor | String | 选择器底部朦层颜色
lineColor | String | 选择器分隔线颜色
