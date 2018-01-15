# hg-citypicker
![build](https://img.shields.io/badge/build-passed-brightgreen.svg)
![npm](https://img.shields.io/badge/npm-v0.2.7-blue.svg)
![licence](https://img.shields.io/badge/licence-MIT-orange.svg)
## Demo
![hg-citypicker png](http://olislpb6q.bkt.clouddn.com/hg-citypicker.png)

[点击这里可跳转到演示页面](https://hamger.github.io/demo/citypicker/citypicker.html)，请在移动端打开或者使用浏览器移动端调试工具打开。 
## 下载插件
* Github下载：[下载地址](https://github.com/hamger/hg-citypicker)
* npm下载：`npm i hg-citypicker`
## 快速使用 
首先引入文件
```html
<link rel="stylesheet" type="text/css" href="./picker.min.css" />
<script src="./citypicker.min.js"></script>
```
实例化日期选择器`new CityPicker(option)`
```js
new CityPicker({
    inputId: 'city-input', // 目标DOM元素ID
    data: city, // 符合格式的 json 数据
    success: function(arr) { // 回调函数
        console.log(arr);
    }
});
```

如果你使用构建工具，可以这样引入
```js
import 'hg-citypicker/picker.min.css';
import CityPicker from 'hg-citypicker';
```
在`vue`中实例化插件，如果数据是异步请求过来的，实例化写在请求成功后的回调中
```js
...
mounted () {
	this.$nextTick(() => {
		new CityPicker({
		    inputId: 'city-input', // 目标DOM元素ID
		    data: city, // 符合格式的 json 数据
		    success: function(arr) { // 回调函数
		        console.log(arr);
		    }
		});
	});
}
...
```
## 日期选择器配置项
`option`是一个配置项的对象，可以接受如下参数：

key | value | description
--------|------|-----
inputId | String | 目标DOM元素ID，必填
data | Array | 符合格式的 json 数据，必填
valueKey | String | 需要展示的数据的键名，默认`value`
childKey | String | 子数据的键名，默认`child`
success | Function  |  确定后的回调函数，返回一个结果数组，必填
cancel | Function  |  点击取消按钮或者背景后的回调函数，选填
title | String | 选择器标题，默认为空
sureText | String | 确定按钮文本，默认为“确定”
cancelText | String | 取消按钮文本，默认为“取消”
f | Number | 惯性滚动阈值（正数, 单位 px/ms），规定滚动速度多大时采用缓冲动画，默认 `0.85`
a | Number | 惯性滚动加速度（正数, 单位 px/(ms * ms)），规定滚动阻力，加速度越小缓冲距离越长，默认 `0.001`
style | Obeject | 包含样式配置的对象

`style`对象可以接受如下参数：

key | value | description
--------|------|-----
liHeight | Number | 每一个选择栏的高度（px），默认 `40`
btnHeight | Number | 按钮栏的高度（px），默认 `44`
btnOffset | String | 按钮离边框的距离，默认 `20px`
titleColor | String | 选择器标题的字体颜色
sureColor | String | 选择器确定按钮的字体颜色
cancelColor | String | 选择器取消按钮的字体颜色
btnBgColor | String | 选择器按钮栏的背景颜色
contentColor | String | 选择器选择区域的文字颜色
contentBgColor | String | 选择器选择区域的背景颜色
upShadowColor | String | 选择器顶部朦层颜色
downShadowColor | String | 选择器底部朦层颜色
lineColor | String | 选择器分隔线颜色
