# hg-datepicker

![build passed](https://img.shields.io/badge/build-passed-brightgreen.svg)
![licence MIT](https://img.shields.io/badge/licence-MIT-orange.svg)

移动端的日期选择器，支持三种类型的日期选择。

## Demo

[点击这里跳转到演示页面](https://hamger.github.io/hg-datepicker/)，请在移动端打开或者使用浏览器移动端调试工具打开。

## Install

- npm 下载：`npm install hg-datepicker`
- Github 下载：[下载地址](https://github.com/hamger/hg-datepicker)

## Usage

首先引入文件

```html
<link rel="stylesheet" type="text/css" href="./picker.css" />
<script src="./datepicker.js"></script>
```

实例化日期选择器`new DatePicker(configuration)`

```js
var datePicker = new DatePicker({
  inputId: "date-input", // 触发选择的元素ID
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

在`vue`中实例化插件

```js
var datePicker = null
...
mounted () {
    datePicker = this.$nextTick(() => {
        new DatePicker({
            inputId: 'date-input',
            success: function(arr) {
                console.log(arr);
            }
        });
    });
}
```

## 配置项

`configuration`是一个配置项的对象，可以接受如下选项：

| key           | value                          | description                                                                                    |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| inputId       | String                         | 目标 DOM 元素 ID，选填                                                                         |
| success       | Funtion                        | 确定后的回调函数，第一个参数为表示时间的数组，如[2002,2,2]表示 2002 年 2 月 2 号，必填         |
| cancel        | Funtion                        | 点击取消按钮或者背景后的回调函数，选填                                                         |
| type          | `time` \| `dateTime` \| `date` | 日期选择器的类型，`time`（分时），`dateTime`(年月日时分)，默认 `date`（年月日）                |
| beforeShow    | Function                       | 规定选择框呼起前的逻辑，选填                                                                   |
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

> 在多个元素共享一个选择器的情况，不需要针对每个元素 id 都实例化一个选择器，可以不填写 inputId，使用实例方法`show`来呼起选择器，使用`setTitle`来区别不同的元素。

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

| function             | param                  | description                                                                             |
| -------------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| show()               | `--`                   | 呼起选择框（受 forbidSelect 限制）                                                      |
| hide()               | `--`                   | 关闭选择框                                                                              |
| setTitle(text)       | text: `String`         | 修改标题内容                                                                            |
| forbidSelect(status) | status: `true`/`false` | 是否禁用选择框，`true`表示禁用，`false`表示不禁用，禁用状态下 beforeShow 回调依然会执行 |

## Changelog

### 2019.3.26

> v1.3.4 show 受 forbidSelect 限制

### 2019.3.25

> v1.3.2 修复日期自动切换后结果未变的问题

> v1.3.1 修复 initialOption 配置失效

> v1.3.0 支持 inputId 不填，添加实例方法 show 、 hide 和 setTitle

### 2018.8.18

> v1.2.3 修改 readme 内容

### 2018.6.17

> v1.2.2 删除压缩文件

### 2018.6.16

> v1.2.1 修复选择器隐藏时依然触发 cancel 回调的问题

> v1.2.0 添加实例方法 forbidSelect ，配置项 firstTime 更名为 initialOption

### 2018.6.15

> v1.1.0 添加 boforeShow 配置项

### 2018.4.11

> v1.0.0 修改项目文件结构

### 2018.2.21

> v0.2.10 添加日期选择器简介

### 2018.1.17

> v0.2.9 添加 js 和 css 压缩文件

### 2018.1.16

> v0.2.7 取消滑动阈值配置

### 2018.1.15

> v0.2.4 取消定位配置，采用底部上滑显示

### 2018.1.14

> v0.1.16 添加使用说明和 API 配置说明

### 2018.1.3

> v0.1.12 创建日期选择器
