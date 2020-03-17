!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof exports?exports.DatePicker=i():t.DatePicker=i()}(window,(function(){return function(t){var i={};function e(s){if(i[s])return i[s].exports;var h=i[s]={i:s,l:!1,exports:{}};return t[s].call(h.exports,h,h.exports,e),h.l=!0,h.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var h in t)e.d(s,h,function(i){return t[i]}.bind(null,h));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";function s(t){return document.getElementById(t)}function h(t,i,e){for(var s=t.children,h=0;h<s.length;h++)s[h].style[i]=e}function a(t,i){for(var e=[],s=t;s<=i;s++)e.push(s);return e}function n(t){return(t<10?"0":"")+t}function r(t){return t instanceof Array&&t.every((function(t){return"number"==typeof t||void 0===t}))}function l(t){throw Error("[Error in hg-datepicker]: "+t)}function o(t){r(t)||l("设置的 value 不合法");var i=null,e=null,s=null;switch(this.type){case"date":t[0]&&t[1]&&t[2]||l("设置的 value 不完整"),i=new Date(this.start[0],this.start[1]-1,this.start[2]).getTime(),e=new Date(this.end[0],this.end[1]-1,this.end[2]).getTime(),s=new Date(t[0],t[1]-1,t[2]).getTime();break;case"month":t[0]&&t[1]||l("设置的 value 不完整"),i=new Date(this.start[0],this.start[1]-1).getTime(),e=new Date(this.end[0],this.end[1]-1).getTime(),s=new Date(t[0],t[1]-1).getTime();break;case"time":t[3]&&t[4]||l("设置的 value 不完整");var h=this.start[3]+n(this.start[4]);i=parseInt(h);var a=this.end[3]+n(this.end[4]);e=parseInt(a);var o=t[3]+n(t[4]);s=parseInt(o);break;case"dateTime":t[0]&&t[1]&&t[2]&&t[3]&&t[4]||l("设置的 value 不完整"),i=new Date(this.start[0],this.start[1]-1,this.start[2],this.start[3],this.start[4]).getTime(),e=new Date(this.end[0],this.end[1]-1,this.end[2],this.end[3],this.end[4]).getTime(),s=new Date(t[0],t[1]-1,t[2],t[3],t[4]).getTime()}s>e&&l("设置的 value 不能大于结束时间"),s<i&&l("设置的 value 不能小于开始时间")}e.r(i),e.d(i,"default",(function(){return f}));var d=function(){this.onOk||l("配置项 onOk 不能为空."),"yes"!==this.hasSuffix&&"no"!==this.hasSuffix&&l("配置项 hasSuffix 不合法."),"yes"!==this.hasZero&&"no"!==this.hasZero&&l("配置项 hasZero 不合法."),"time"!==this.type&&"dateTime"!==this.type&&"month"!==this.type&&"date"!==this.type&&l("配置项 type 不合法."),r(this.start)||l("配置项 start 不合法"),r(this.end)||l("配置项 end 不合法"),r(this.initValue)||l("配置项 initValue 不合法");var t=null,i=null,e=null;switch(this.type){case"date":this.start[0]&&this.start[1]&&this.start[2]||l("配置项 start 不完整"),this.end[0]&&this.end[1]&&this.end[2]||l("配置项 end 不完整"),this.initValue[0]&&this.initValue[1]&&this.initValue[2]||l("配置项 initValue 不完整"),t=new Date(this.start[0],this.start[1]-1,this.start[2]).getTime(),i=new Date(this.end[0],this.end[1]-1,this.end[2]).getTime(),e=new Date(this.initValue[0],this.initValue[1]-1,this.initValue[2]).getTime(),t>i&&l("开始时间不能大于结束时间."),e>i&&(this.initValue=this.end),e<t&&(this.initValue=this.start);break;case"month":this.start[0]&&this.start[1]||l("配置项 start 不完整"),this.end[0]&&this.end[1]||l("配置项 end 不完整"),this.initValue[0]&&this.initValue[1]||l("配置项 initValue 不完整"),t=new Date(this.start[0],this.start[1]-1).getTime(),i=new Date(this.end[0],this.end[1]-1).getTime(),e=new Date(this.initValue[0],this.initValue[1]-1).getTime(),t>i&&l("开始时间不能大于结束时间."),e>i&&(this.initValue=this.end),e<t&&(this.initValue=this.start);break;case"time":this.start[3]&&this.start[4]||l("配置项 start 不完整"),this.end[3]&&this.end[4]||l("配置项 end 不完整"),this.initValue[3]&&this.initValue[4]||l("配置项 initValue 不完整");var s=this.start[3]+n(this.start[4]);t=parseInt(s);var h=this.end[3]+n(this.end[4]);i=parseInt(h);var a=this.initValue[3]+n(this.initValue[4]);e=parseInt(a),t>i&&l("开始时间不能大于结束时间."),e>i&&(this.initValue=this.end),e<t&&(this.initValue=this.start);break;case"dateTime":this.start[0]&&this.start[1]&&this.start[2]&&this.start[3]&&this.start[4]||l("配置项 start 不完整"),this.end[0]&&this.end[1]&&this.end[2]&&this.end[3]&&this.end[4]||l("配置项 end 不完整"),this.initValue[0]&&this.initValue[1]&&this.initValue[2]&&this.initValue[3]&&this.initValue[4]||l("配置项 initValue 不完整"),t=new Date(this.start[0],this.start[1]-1,this.start[2],this.start[3],this.start[4]).getTime(),i=new Date(this.end[0],this.end[1]-1,this.end[2],this.end[3],this.end[4]).getTime(),e=new Date(this.initValue[0],this.initValue[1]-1,this.initValue[2],this.initValue[3],this.initValue[4]).getTime(),t>i&&l("开始时间不能大于结束时间."),e>i&&(this.initValue=this.end),e<t&&(this.initValue=this.start)}};var u=function(){var t;this.previousTime=[],this.yearMap=[],this.monthMap=[],this.dayMap=[],this.dayNumArr=[31,28,31,30,31,30,31,31,30,31,30,31],this.hourMap=[],this.minuteMap=[],this.maps=[],this.dateIndex=[],this.suffix="yes"===this.hasSuffix?["年","月","日","时","分"]:["","","","",""],this.wrapId=(t=(new Date).getTime(),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(i){var e=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===i?e:7&e|8).toString(16)}))+"-wrap"),this.ulCount=0,this.liHeight=this.style&&this.style.liHeight?this.style.liHeight:40,this.btnHeight=this.style&&this.style.btnHeight?this.style.btnHeight:44,this.dateUl=[],this.liNum=[],this.curDis=[],this.curPos=[],this.startY=0,this.startTime=0,this.endTime=0,this.moveY=0,this.moveTime=0,this.moveNumber=1,this.moveSpeed=[],this.abled=!0,this.containerId=this.wrapId+"-container",this.boxId=this.wrapId+"-box",this.contentId=this.wrapId+"-content",this.cancelId=this.wrapId+"-cancel",this.okId=this.wrapId+"-ok",this.titleId=this.wrapId+"-title";for(var i=0;i<this.initValue.length;i++)this.previousTime.push(this.initValue[i]),this.initValue[i]&&(this.calculateMap(i),this.calculateDis(i),this.ulCount++);this.initmaps(),this.initLiNum()};function c(){if(this.style){var t=this.style,i=s(this.containerId),e=s(this.contentId),a=s(this.boxId),n=s(this.okId),r=s(this.cancelId),l=e.children.length;if(40!==t.liHeight){for(var o=0;o<this.ulCount;o++)h(e.children[o],"height",this.liHeight+"px");e.children[l-3].style.height=2*this.liHeight+"px",e.children[l-2].style.height=2*this.liHeight+"px",e.children[l-1].style.height=this.liHeight+"px",e.children[l-1].style.top=2*this.liHeight+"px",e.style.height=5*this.liHeight+"px",e.style.lineHeight=this.liHeight+"px"}44!==t.btnHeight&&(a.style.height=this.btnHeight+"px",a.style.lineHeight=this.btnHeight+"px"),t.btnOffset&&(n.style.marginRight=t.btnOffset,r.style.marginLeft=t.btnOffset),40===t.liHeight&&44===t.btnHeight||(i.style.height=5*this.liHeight+this.btnHeight+"px"),t.titleColor&&(a.style.color=t.titleColor),t.okColor&&(n.style.color=t.okColor),t.cancelColor&&(r.style.color=t.cancelColor),t.btnBgColor&&(a.style.backgroundColor=t.btnBgColor),t.contentColor&&(e.style.color=t.contentColor),t.contentBgColor&&(e.style.backgroundColor=t.contentBgColor),t.upShadowColor&&(e.children[l-3].style.backgroundImage=t.upShadowColor),t.downShadowColor&&(e.children[l-2].style.backgroundImage=t.downShadowColor),t.lineColor&&(e.children[l-1].style.borderColor=t.lineColor)}}var p=function(){var t=document.createElement("div");t.id=this.wrapId,document.body.appendChild(t),this.wrap=s(this.wrapId),this.wrap.classList.add("hg-picker-bg");for(var i=this.maps.length,e='<div class="hg-picker-btn-box" id="'+this.boxId+'"><div class="hg-picker-btn" id="'+this.cancelId+'">'+this.cancelText+'</div><div class="hg-picker-btn" id="'+this.okId+'">'+this.okText+'</div><span id="'+this.titleId+'" >'+this.title+"</span> </div>",h="",a=0;a<i;a++)void 0!==this.maps[a]&&(h+='<ul id="'+this.wrapId+"-ul-"+a+'"></ul>');var n='<div class="hg-picker-content" id="'+this.contentId+'">'+h+'<div class="hg-picker-up-shadow"></div><div class="hg-picker-down-shadow"></div><div class="hg-picker-line"></div></div>',r="";r=this.style&&"bottom"===this.style.btnLocation?'<div  class="hg-picker-container" id="'+this.containerId+'">'+n+e+"</div>":'<div  class="hg-picker-container" id="'+this.containerId+'">'+e+n+"</div>",this.wrap.innerHTML=r;for(var l=0;l<i;l++)void 0!==this.maps[l]&&(this.dateUl[l]=s(this.wrapId+"-ul-"+l),this.dateUl[l].style.width=(100/this.ulCount).toFixed(2)+"%",this.renderLi(l));c.call(this);for(var o=0;o<this.maps.length;o++)this.maps[o]&&this.roll(o)};function m(t){var i,e,s=window.event;switch(s.preventDefault(),s.type){case"touchstart":if(this.startTime=Date.now(),this.startTime-this.endTime<200)return void(this.abled=!1);this.abled=!0,this.startY=s.touches[0].clientY,this.curPos[t]=this.curDis[t],this.previousTime[t]=this.curDate(t),this.moveNumber=1,this.moveSpeed=[];break;case"touchmove":if(!this.abled)return;s.preventDefault(),this.moveY=s.touches[0].clientY;var h=this.startY-this.moveY;this.moveTime=Date.now(),this.curDis[t]=this.curPos[t]-h,this.curDis[t]>=1.5*this.liHeight&&(this.curDis[t]=1.5*this.liHeight),this.curDis[t]<=-1*(this.liNum[t]-1+1.5)*this.liHeight&&(this.curDis[t]=-1*(this.liNum[t]-1+1.5)*this.liHeight),this.roll(t),this.moveTime-this.startTime>=130*this.moveNumber&&(this.moveNumber++,this.moveSpeed.push(h/(this.moveTime-this.startTime)));break;case"touchend":if(!this.abled)return;this.endTime=Date.now();var a=null;a=1===this.moveNumber?(this.startY-s.changedTouches[0].clientY)/(this.endTime-this.startTime):this.moveSpeed[this.moveSpeed.length-1],this.curDis[t]=this.curDis[t]-(i=a,e=this.a,Math.abs(i)<.25?0:i/Math.abs(i)*(.5*i*i/e)),this.fixate(t),this.roll(t,.2);for(var n=t;n<this.maps.length-1;n++)this.maps[n+1]&&this.changeDate(n+1);this.previousTime[t]=this.curDate(t)}}var g=function(){var t=this;this.container=s(this.containerId),s(this.okId).addEventListener("click",(function(){t.onOk(t.getResult()),t.hide()})),s(this.cancelId).addEventListener("click",(function(){t.onCancel&&t.onCancel(),t.hide()})),this.wrap.addEventListener("click",(function(i){i.target.id===t.wrapId&&t.wrap.classList.contains("hg-picker-bg-show")&&(t.onCancel&&t.onCancel(),t.hide())})),this.dateUl.forEach((function(i,e){i&&(i.addEventListener("touchstart",(function(){m.call(t,e)}),!1),i.addEventListener("touchmove",(function(){m.call(t,e)}),!1),i.addEventListener("touchend",(function(){m.call(t,e)}),!0))}))},v=Symbol("property"),f=function(){function t(t){this.type=t.type||"date",this.title=t.title||"",this.okText=t.okText||"确定",this.cancelText=t.cancelText||"取消","time"===this.type?(t.start?(t.start.length<2&&l("配置项 start 不完整"),this.start=[void 0,void 0,void 0,t.start[0],t.start[1]]):this.start=[void 0,void 0,void 0,0,0],t.end?(t.end.length<2&&l("配置项 end 不完整"),this.end=[void 0,void 0,void 0,t.end[0],t.end[1]]):this.end=[void 0,void 0,void 0,23,59],t.initValue?(t.initValue.length<2&&l("配置项 initValue 不完整"),this.initValue=[void 0,void 0,void 0,t.initValue[0],t.initValue[1]]):this.initValue=[void 0,void 0,void 0,(new Date).getHours(),(new Date).getMinutes()]):"dateTime"===this.type?(this.start=t.start||[(new Date).getFullYear()-4,(new Date).getMonth()+1,(new Date).getDate(),(new Date).getHours(),(new Date).getMinutes()],this.end=t.end||[(new Date).getFullYear()+4,(new Date).getMonth()+1,(new Date).getDate(),(new Date).getHours(),(new Date).getMinutes()],this.initValue=t.initValue||[(new Date).getFullYear(),(new Date).getMonth()+1,(new Date).getDate(),(new Date).getHours(),(new Date).getMinutes()]):"month"===this.type?(this.start=t.start||[(new Date).getFullYear()-4,(new Date).getMonth()+1],this.end=t.end||[(new Date).getFullYear()+4,(new Date).getMonth()+1],this.initValue=t.initValue||[(new Date).getFullYear(),(new Date).getMonth()+1]):(this.start=t.start||[(new Date).getFullYear()-4,(new Date).getMonth()+1,(new Date).getDate()],this.end=t.end||[(new Date).getFullYear()+4,(new Date).getMonth()+1,(new Date).getDate()],this.initValue=t.initValue||[(new Date).getFullYear(),(new Date).getMonth()+1,(new Date).getDate()]),this.a=t.a||.001,this.style=t.style,this.hasSuffix=t.hasSuffix||"yes",this.hasZero=t.hasZero||"yes",this.onOk=t.onOk,this.onCancel=t.onCancel||null,this.beforeShow=t.beforeShow||null,this[v]={},d.call(this),u.call(this),p.call(this),g.call(this)}var i=t.prototype;return i.calculateMap=function(t){var i=null,e=null,s=null;switch(t){case 0:this.yearMap=a(this.start[0],this.end[0]);break;case 1:this.monthMap=[],this.start[t-1]===this.end[t-1]?this.monthMap=a(this.start[t],this.end[t]):this.curDate(t-1)===this.start[t-1]?this.monthMap=a(this.start[t],12):this.curDate(t-1)===this.end[t-1]?this.monthMap=a(1,this.end[t]):this.monthMap=a(1,12);break;case 2:this.dayMap=[],this.isLeapYear(this.curDate(0))?this.dayNumArr[1]=29:this.dayNumArr[1]=28,i=new Date(this.curDate(0),this.curDate(1)-1).getTime(),e=new Date(this.start[0],this.start[1]-1).getTime(),s=new Date(this.end[0],this.end[1]-1).getTime(),this.dayMap=e===s?a(this.start[2],this.end[2]):i===e?a(this.start[2],this.dayNumArr[this.curDate(1)-1]):a(1,i===s?this.end[2]:this.dayNumArr[this.curDate(1)-1]);break;case 3:"dateTime"===this.type?(i=new Date(this.curDate(0),this.curDate(1)-1,this.curDate(2)).getTime(),e=new Date(this.start[0],this.start[1]-1,this.start[2]).getTime(),s=new Date(this.end[0],this.end[1]-1,this.end[2]).getTime(),this.hourMap=e===s?a(this.start[t],this.end[t]):i===e?a(this.start[t],23):a(0,i===s?this.end[t]:23)):this.hourMap=a(this.start[t],this.end[t]);break;case 4:"dateTime"===this.type?(i=new Date(this.curDate(0),this.curDate(1)-1,this.curDate(2),this.curDate(3)).getTime(),e=new Date(this.start[0],this.start[1]-1,this.start[2],this.start[3]).getTime(),s=new Date(this.end[0],this.end[1]-1,this.end[2],this.end[3]).getTime(),this.minuteMap=e===s?a(this.start[t],this.end[t]):i===e?a(this.start[t],59):a(0,i===s?this.end[t]:59)):this.start[t-1]===this.end[t-1]?this.minuteMap=a(this.start[t],this.end[t]):this.curDate(t-1)===this.start[t-1]?this.minuteMap=a(this.start[t],59):this.curDate(t-1)===this.end[t-1]?this.minuteMap=a(0,this.end[t]):this.minuteMap=a(0,59)}},i.CurArr=function(t){var i=[];return 0===t&&(i=this.yearMap),1===t&&(i=this.monthMap),2===t&&(i=this.dayMap),3===t&&(i=this.hourMap),4===t&&(i=this.minuteMap),i},i.curDate=function(t){var i=0;return i=0===this.maps.length?this.initValue[t]:void 0===this.maps[t]?void 0:this.maps[t][this.dateIndex[t]],i},i.calculateDis=function(t){var i=this.CurArr(t);if(this.previousTime[t]>i[i.length-1])this.dateIndex[t]=i.length-1;else if(this.previousTime[t]<i[0])this.dateIndex[t]=0;else for(var e=0;e<i.length;e++)if(i[e]===this.previousTime[t]){this.dateIndex[t]=e;break}this.curDis[t]=-1*this.liHeight*this.dateIndex[t]},i.initmaps=function(){switch(this.type){case"date":this.maps=[this.yearMap,this.monthMap,this.dayMap];break;case"month":this.maps=[this.yearMap,this.monthMap];break;case"time":this.maps=[void 0,void 0,void 0,this.hourMap,this.minuteMap];break;case"dateTime":this.maps=[this.yearMap,this.monthMap,this.dayMap,this.hourMap,this.minuteMap];break;default:l("配置项 type 不合法")}},i.initLiNum=function(t){if(t)void 0!==this.maps[t]&&(this.liNum[t]=this.maps[t].length);else for(var i=0;i<this.maps.length;i++)void 0!==this.maps[i]&&(this.liNum[i]=this.maps[i].length)},i.renderLi=function(t){var i=this;this.dateUl[t].innerHTML="";var e="<li></li><li></li>";this.maps[t].forEach((function(s){s=i.addZero(s),e+="<li>"+s+i.suffix[t]+"</li>"})),e+="<li></li><li></li>",this.dateUl[t].innerHTML=e,40!==this.liHeight&&h(this.dateUl[t],"height",this.liHeight+"px")},i.roll=function(t,i){(this.curDis[t]||0===this.curDis[t])&&(this.dateUl[t].style.transform="translate3d(0, "+this.curDis[t]+"px, 0)",this.dateUl[t].style.webkitTransform="translate3d(0, "+this.curDis[t]+"px, 0)",i&&(this.dateUl[t].style.transition="transform "+i+"s ease-out",this.dateUl[t].style.webkitTransition="-webkit-transform "+i+"s ease-out"))},i.fixate=function(t){this.curDis[t]<=-1*(this.liNum[t]-1)*this.liHeight?this.dateIndex[t]=this.liNum[t]-1:this.curDis[t]>=0?this.dateIndex[t]=0:this.dateIndex[t]=-1*Math.round(this.curDis[t]/this.liHeight),this.curDis[t]=-1*this.liHeight*this.dateIndex[t]},i.changeDate=function(t){this.calculateMap(t),this.maps[t]=this.CurArr(t),this.calculateDis(t),this.initLiNum(t),this.renderLi(t),this.roll(t)},i.isLeapYear=function(t){return!!(t%4==0&&t%100!=0||t%400==0)},i.getResult=function(){for(var t=[],i=0;i<this.maps.length;i++)this.maps[i]&&t.push(this.maps[i][this.dateIndex[i]]);return t},i.addZero=function(t){return"yes"===this.hasZero&&t<10&&(t="0"+t),t},i.show=function(){this.wrap.classList.add("hg-picker-bg-show"),this.container.classList.add("hg-picker-container-up")},i.hide=function(){this.wrap.classList.remove("hg-picker-bg-show"),this.container.classList.remove("hg-picker-container-up")},i.set=function(t){for(var i=0,e=Object.entries(t);i<e.length;i++){var h=e[i],a=h[0],n=h[1];if(/^(title|cancelText|okText|a|onOk|onCancel)$/.test(a))this[a]=n,"title"===a?s(this.titleId).innerHTML=n:"okText"===a?s(this.okId).innerHTML=n:"cancelText"===a&&(s(this.cancelId).innerHTML=n);else if(/^(value)$/.test(a)){o.call(this,n),this.previousTime=n;for(var r=0;r<n.length;r++)n[r]&&this.changeDate(r)}else this[v][a]=n}return this},i.get=function(t){return/^(title|cancelText|okText|a|onOk|onCancel)$/.test(t)?this[t]:/^(value)$/.test(t)?this.getResult():this[v][t]},t}()}]).default}));