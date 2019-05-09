# hg-datepicker

![build](https://travis-ci.org/hamger/hg-datepicker.svg?branch=master)
![NPM](https://img.shields.io/npm/l/hg-datepicker.svg?color=orange)
[![npm](https://img.shields.io/npm/v/hg-datepicker.svg?color=blue)](https://www.npmjs.com/package/hg-datepicker)

移动端的日期选择器，支持三种类型的日期选择。

> 这里是 2.x 的文档，1.x 文档请点击[这里](https://github.com/hamger/hg-datepicker/tree/v1.x)。

## Demo

[点击这里跳转到演示页面](https://hamger.github.io/hg-datepicker/)，请在移动端打开或者使用浏览器移动端调试工具打开。

## Install

- yarn 下载：`yarn add hg-datepicker`
- npm 下载：`npm install --save hg-datepicker`
- CND 地址：
  - js：`https://unpkg.com/hg-datepicker/dist/hg-datepicker.js`
  - css：`https://unpkg.com/hg-datepicker/picker.css`


## Usage

首先引入文件

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://unpkg.com/hg-parapicker/picker.css"
/>
<script src="https://unpkg.com/hg-parapicker/dist/hg-parapicker.js"></script>
```

实例化日期选择器`new DatePicker(configuration)`

```js
var datePicker = new DatePicker({
  success: function(arr) {
    // 回调函数
    console.log(arr);
  }
});
```

如果你使用构建工具，可以这样引入

```js
import "hg-datepicker/picker.css";
import DatePicker from "hg-datepicker";
```

## 配置项

`configuration`是一个配置项的对象，可以接受如下选项：

| key           | value                          | description                                                                                    |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| success       | Funtion                        | 确定后的回调函数，第一个参数为表示时间的数组，如[2002,2,2]表示 2002 年 2 月 2 号，必填         |
| cancel        | Funtion                        | 点击取消按钮或者背景后的回调函数，选填                                                         |
| type          | `time` \| `dateTime` \| `date` | 日期选择器的类型，`time`（分时），`dateTime`(年月日时分)，默认 `date`（年月日）                |
| start         | Array\<Number\>                | 规定选择范围的开始时间，默认四年前                                                             |
| end           | Array\<Number\>                | 规定选择范围的结束时间，默认四年后                                                             |
| initialOption | Array\<Number\>                | 规定初始显示的时间，默认当前时间                                                               |
| title         | String                         | 选择器标题，默认为空                                                                           |
| sureText      | String                         | 确定按钮文本，默认为“确定”                                                                     |
| cancelText    | String                         | 取消按钮文本，默认为“取消”                                                                     |
| hasSuffix     | `yes` \| `no`                  | 是否添加时间单位，默认 `yes`                                                                   |
| hasZero       | `yes` \| `no`                  | 一位数前是否加零，默认 `yes`                                                                   |
| a             | Number                         | 惯性滚动加速度（正数, 单位 px/(ms \* ms)），规定滚动阻力，加速度越小缓冲距离越长，默认 `0.001` |
| style         | Object                         | 包含样式配置的对象                                                                             |

`style`对象可以接受如下选项（以下配置项若仍无法满足需求，可自行修改并引入`picker.css`）：

| key             | value  | description                         |
| --------------- | ------ | ----------------------------------- |
| liHeight        | Number | 每一个选择栏的高度（px），默认 `40` |
| btnHeight       | Number | 按钮栏的高度（px），默认 `44`       |
| btnOffset       | String | 按钮离边框的距离，默认 `20px`       |
| titleColor      | String | 选择器标题的字体颜色                |
| sureColor       | String | 选择器确定按钮的字体颜色            |
| cancelColor     | String | 选择器取消按钮的字体颜色            |
| btnBgColor      | String | 选择器按钮栏的背景颜色              |
| contentColor    | String | 选择器选择区域的文字颜色            |
| contentBgColor  | String | 选择器选择区域的背景颜色            |
| upShadowColor   | String | 选择器顶部朦层颜色                  |
| downShadowColor | String | 选择器底部朦层颜色                  |
| lineColor       | String | 选择器分隔线颜色                    |

## 实例方法

| function       | param          | description                        |
| -------------- | -------------- | ---------------------------------- |
| show()         | `--`           | 呼起选择框（受 forbidSelect 限制） |
| hide()         | `--`           | 关闭选择框                         |
| setTitle(text) | text: `String` | 修改标题内容                       |

## Change Log

### 2019.5.10

> v2.0.0 使用 ES6 重构项目
