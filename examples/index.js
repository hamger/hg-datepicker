import DatePicker from '@';
// import DatePicker from '../dist/hg-datepicker.js';
import '../picker.css';

var now = new Date()
var a1 = now.getFullYear()
var a2 = now.getMonth() + 1
var a3 = now.getDate()
var pass = new Date(now.getTime() - 86400 * 1000 * 5000)
var a4 = pass.getFullYear()
var a5 = pass.getMonth() + 1
var a6 = pass.getDate()
new DatePicker({
  inputId: 'date-input', // 目标DOM元素ID
  // start: [a4,a5,a6], // 开始时间
  // end: [a1,a2,a3], // 结束时间
  // style: {
  //     btnLocation: 'bottom',
  //     liHeight: 45,
  //     btnHeight: 50,
  //     btnOffset: '30px',
  //     // sureColor: '#5bcffe',
  //     // cancleColor: 'rgb(221, 159, 159)',
  //     // btnBgColor: 'rgba(141, 240, 128, 0.55)',
  //     // contentBgColor: '#adf499',
  //     // contentColor: '#000',
  //     // titleColor: 'green',
  //     // lineColor: '#00ff2f',
  //     // upShadow: 'linear-gradient(to bottom, rgb(14, 140, 14), rgba(14, 140, 14, 0))',
  //     // downShadow: 'linear-gradient(to top, rgb(14, 140, 14), rgba(14, 140, 14, 0))',
  // },
  title: '日期选择',
  initialOption: [2018, 3, 31],
  cancel: function () {
    console.log('取消日期选择');
  },
  // beforeShow: function () {
  //     console.log('beforeSuccess回调触发了')  
  // },
  success: function (arr) { // 回调函数
    console.log(arr);
    document.getElementById('date-input').innerHTML = arr;
  }
});
new DatePicker({
  inputId: 'date-input2',
  type: 'time', // 选择器类型
  start: [2, 30], // 开始时间
  end: [22, 20], // 结束时间
  style: {
    btnHeight: 46
  },
  success: function (arr) {
    console.log(arr);
    document.getElementById('date-input2').innerHTML = arr;
  }
});
var picker = new DatePicker({
  type: 'dateTime',
  style: {
    btnHeight: 44
  },
  start: [2020, 2, 2, 2, 20], // 开始时间
  end: [2120, 4, 4, 5, 50], // 结束时间
  hasSuffix: 'no', // 不添加时间单位
  hasZero: 'no', // 单位数不显两位
  success: function (arr) {
    console.log(arr);
    document.getElementById('date-input' + this.pickerNumber).innerHTML = arr;
  }
});
 
window.select = function select(number) {
  picker.pickerNumber = number
  picker.setTitle(number + '号选择器')
  picker.show()
}
new DatePicker({
  inputId: 'start_date',
  type: 'date',
  start: [2017, 1, 1],
  end: [2018, 9, 17],
  initialOption: [2018, 9, 10],
  success: function (arr) {
    console.log(arr)
  }
});