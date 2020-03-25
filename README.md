# hg-datepicker

![build](https://travis-ci.org/hamger/hg-datepicker.svg?branch=master)
![NPM](https://img.shields.io/npm/l/hg-datepicker.svg?color=orange)
[![npm](https://img.shields.io/npm/v/hg-datepicker.svg?color=blue)](https://www.npmjs.com/package/hg-datepicker)

移动端的日期选择器，支持多种类型的日期选择。具有很好的适应性，可以在任何前端框架中使用。

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

### 在 vue 等框架中使用

```vue
<template>
  <div @click="select">选择年月</div>
</template>
<script>
import "hg-datepicker/picker.css";
import DatePicker from "hg-datepicker";

export default {
  data() {
    return {
      picker: null
    };
  },
  methods: {
    select() {
      this.picker.show();
    }
  },
  mounted() {
    this.picker = new DatePicker({
      type: "month", // 选择器类型
      start: [2020, 2], // 开始时间
      end: [2120, 4], // 结束时间
      hasSuffix: "no", // 不添加时间单位
      onOk: function(arr) {
        console.log(arr);
      }
    });
  },
  beforeDestroy() {
    if (this.picker) {
      this.picker.destroy();
      this.picker = null;
    }
  }
};
</script>
```

> 组件销毁时需要销毁 DatePicker 实例，防止内存溢出

### 在传统页面中使用

```html
<head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://unpkg.com/hg-datepicker/picker.css"
  />
  <script src="https://unpkg.com/hg-datepicker/dist/hg-datepicker.js"></script>
</head>
<body>
  <div onclick="select(1)" id="date-input1">选择年月日</div>
  <script>
    var picker = new DatePicker({
      title: "日期选择",
      initValue: [2018, 3, 31],
      cancel: function() {
        console.log("取消日期选择");
      },
      onOk: function(arr) {
        // 回调函数
        console.log(arr);
        document.getElementById(
          "date-input" + picker.get("pickerNumber")
        ).innerHTML = arr;
      }
    });
    window.select = function(number) {
      picker.set({
        pickerNumber: number,
        title: `${number}号选择器`
      });
      picker.show();
    };
  </script>
</body>
```

调用实例方法 show 呼起选择器，完整案例见[这里](https://github.com/hamger/hg-datepicker/blob/master/index.html)。

## 配置项

`configuration`是一个配置项的对象，可以接受如下选项：

| key        | value                            | description                                                                                    |
| ---------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| onOk       | Funtion                          | 确定后的回调函数，第一个参数为表示时间的数组，如[2002,2,2]表示 2002 年 2 月 2 号，必填         |
| cancel     | Funtion                          | 点击取消按钮或者背景后的回调函数，选填                                                         |
| type       | `time`/`dateTime`/`date`/`month` | 日期选择器的类型，`time`（分时），`dateTime`(年月日时分)，`month`(年月)，默认 `date`（年月日） |
| start      | Array\<Number\>                  | 规定选择范围的开始时间，默认四年前                                                             |
| end        | Array\<Number\>                  | 规定选择范围的结束时间，默认四年后                                                             |
| initValue  | Array\<Number\>                  | 规定初始显示的时间，默认当前时间                                                               |
| title      | String                           | 选择器标题，默认为空                                                                           |
| sureText   | String                           | 确定按钮文本，默认为“确定”                                                                     |
| cancelText | String                           | 取消按钮文本，默认为“取消”                                                                     |
| hasSuffix  | `yes`/`no`                       | 是否添加时间单位，默认 `yes`                                                                   |
| hasZero    | `yes`/`no`                       | 一位数前是否加零，默认 `yes`                                                                   |
| a          | Number                           | 惯性滚动加速度（正数, 单位 px/(ms \* ms)），规定滚动阻力，加速度越小缓冲距离越长，默认 `0.001` |
| style      | Object                           | 包含样式配置的对象                                                                             |

`style`对象可以接受如下选项（以下配置项若仍无法满足需求，可自行修改并引入`picker.css`）：

| key             | value  | description                         |
| --------------- | ------ | ----------------------------------- |
| liHeight        | Number | 每一个选择栏的高度（px），默认 `40` |
| btnHeight       | Number | 按钮栏的高度（px），默认 `44`       |
| btnOffset       | String | 按钮离边框的距离，默认 `20px`       |
| titleColor      | String | 选择器标题的字体颜色                |
| okColor         | String | 选择器确定按钮的字体颜色            |
| cancelColor     | String | 选择器取消按钮的字体颜色            |
| btnBgColor      | String | 选择器按钮栏的背景颜色              |
| contentColor    | String | 选择器选择区域的文字颜色            |
| contentBgColor  | String | 选择器选择区域的背景颜色            |
| upShadowColor   | String | 选择器顶部朦层颜色                  |
| downShadowColor | String | 选择器底部朦层颜色                  |
| lineColor       | String | 选择器分隔线颜色                    |

## 实例方法

| function  | param      | description    |
| --------- | ---------- | -------------- |
| show()    | `--`       | 呼起选择框     |
| hide()    | `--`       | 关闭选择框     |
| set(obj)  | obj:Object | 设置选择器属性 |
| get(key)  | key:String | 获取选择框属性 |
| destroy() | `--`       | 销毁选择器     |

当 key 为`title`、`cancelText`、`okText`、`a`、`onOk`、`onCancel`时，视为设置/获取对应的选择器配置。当 key 为`value`时，视为设置/获取选择器的值。其实情况视为自定义的参数。

> picker.set({value: [1992, 3]}) 可用于实现动态地设置呼起选择器时初始显示的时间

## Change Log

### 2020.3.19

> v2.2.2 实现选择器销毁的实例方法

### 2020.3.17

> v2.1.0 实现设置选择器值的实例方法，配置项 initialOption 变更为 initValue

### 2020.3.16

> v2.0.2 支持年月选择

### 2019.6.29

> v2.0.0 使用 ES6 重构项目 & 添加实例方法 set、get
