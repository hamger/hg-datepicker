/**
 * Created by Hanger on 2017/7/18.
 */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.DatePicker = factory());
})(this, function() {
  /**
   * 生成 UUID (Universally Unique IDentifier, 通用 唯一标识符)
   */
  function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
    });
    return uuid;
  }

  /**
   * 以 id 获取 DOM
   */
  function $id(id) {
    return document.getElementById(id);
  }

  /**
   * 设置子元素样式
   */
  function setChildStyle(parent, key, val) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
      children[i].style[key] = val;
    }
  }

  /**
   * 获取从 start 到 end 的数组
   * Return : Array
   */
  function getArr(start, end) {
    var arr = [];
    for (var i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }

  /**
   * 创建构造函数
   */
  function DatePicker(config) {
    this.inputId = config.inputId; // 目标 input 元素，选填
    this.type = config.type || "date"; // 选择器类型，选填
    this.title = config.title || ""; // 选择器标题，选填
    this.sureText = config.sureText || "确定"; // 确定按钮文本，选填
    this.cancelText = config.cancelText || "取消"; // 取消按钮文本，选填
    // 初始化开始、结束、初始显示时间, 选填
    if (this.type === "time") {
      if (config.start) {
        if (config.start.length < 2) throw Error("配置项 start 不完整");
        this.start = [
          undefined,
          undefined,
          undefined,
          config.start[0],
          config.start[1]
        ];
      } else this.start = [undefined, undefined, undefined, 0, 0];
      if (config.end) {
        if (config.end.length < 2) throw Error("配置项 end 不完整");
        this.end = [
          undefined,
          undefined,
          undefined,
          config.end[0],
          config.end[1]
        ];
      } else this.end = [undefined, undefined, undefined, 23, 59];
      if (config.initialOption) {
        if (config.initialOption.length < 2)
          throw Error("配置项 initialOption 不完整");
        this.initialOption = [
          undefined,
          undefined,
          undefined,
          config.initialOption[0],
          config.initialOption[1]
        ];
      } else
        this.initialOption = [
          undefined,
          undefined,
          undefined,
          new Date().getHours(),
          new Date().getMinutes()
        ];
    } else if (this.type === "dateTime") {
      this.start = config.start || [
        new Date().getFullYear() - 4,
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ];
      this.end = config.end || [
        new Date().getFullYear() + 4,
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ];
      this.initialOption = config.initialOption || [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ];
    } else {
      this.start = config.start || [
        new Date().getFullYear() - 4,
        new Date().getMonth() + 1,
        new Date().getDate()
      ];
      this.end = config.end || [
        new Date().getFullYear() + 4,
        new Date().getMonth() + 1,
        new Date().getDate()
      ];
      this.initialOption = config.initialOption || [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      ];
    }
    this.a = config.a || 0.001; // 惯性滚动加速度（正数, 单位 px/(ms * ms)），选填，默认 0.001
    this.style = config.style; // 选择器样式, 选填
    this.hasSuffix = config.hasSuffix || "yes"; // 是否添加时间单位，选填
    this.hasZero = config.hasZero || "yes"; // 一位数是否显示两位，选填
    this.success = config.success; // 成功的回调函数，必填
    this.cancel = config.cancel || null; // 取消按钮回调函数，选填
    this.beforeShow = config.beforeShow || null; // 规定呼起选择器前的逻辑，选填
    this.check(); // 检查配置项是否合法
    this.initTab(); // 初始化标签
    this.initUI(); // 初始化UI
    this.initEvent(); // 初始化事件
  }

  /**
   * 定义构造函数的原型
   */
  DatePicker.prototype = {
    // 明确构造器指向
    constructor: DatePicker,
    /**
     * 检查配置项是否合法
     */
    check: function() {
      function isNumberArr(arr) {
        if (arr instanceof Array) {
          return arr.every(function(val) {
            return typeof val === "number" || typeof val === "undefined";
          });
        } else return false;
      }
      if (!this.success) throw Error("配置项 success 不能为空.");
      if (this.hasSuffix !== "yes" && this.hasSuffix !== "no")
        throw Error("配置项 hasSuffix 不合法.");
      if (this.hasZero !== "yes" && this.hasZero !== "no")
        throw Error("配置项 hasZero 不合法.");
      if (
        this.type !== "time" &&
        this.type !== "dateTime" &&
        this.type !== "date"
      )
        throw Error("配置项 type 不合法.");
      if (!isNumberArr(this.start)) throw Error("配置项 start 不合法");
      if (!isNumberArr(this.end)) throw Error("配置项 end 不合法");
      if (!isNumberArr(this.initialOption))
        throw Error("配置项 initialOption 不合法");
      switch (this.type) {
        case "date":
          if (this.start.length < 3) throw Error("配置项 start 不完整");
          if (this.end.length < 3) throw Error("配置项 end 不完整");
          if (this.initialOption.length < 3)
            throw Error("配置项 initialOption 不完整");
          var start = new Date(
            this.start[0],
            this.start[1] - 1,
            this.start[2]
          ).getTime();
          var end = new Date(
            this.end[0],
            this.end[1] - 1,
            this.end[2]
          ).getTime();
          var first = new Date(
            this.initialOption[0],
            this.initialOption[1],
            this.initialOption[2]
          ).getTime();
          if (start > end) throw Error("开始时间不能大于结束时间.");
          if (first > end) this.initialOption = this.end;
          if (first < start) this.initialOption = this.start;
          break;
        case "time":
          function tf(i) {
            return (i < 10 ? "0" : "") + i;
          }
          var startStr = this.start[3] + tf(this.start[4]);
          var start = parseInt(startStr);
          var endStr = this.end[3] + tf(this.end[4]);
          var end = parseInt(endStr);
          var firstStr = this.initialOption[3] + tf(this.initialOption[4]);
          var first = parseInt(firstStr);
          if (start > end) throw Error("开始时间不能大于结束时间.");
          if (first > end) this.initialOption = this.end;
          if (first < start) this.initialOption = this.start;
          break;
        case "dateTime":
          if (this.start.length < 5) throw Error("配置项 start 不完整");
          if (this.end.length < 5) throw Error("配置项 end 不完整");
          if (this.initialOption.length < 5)
            throw Error("配置项 initialOption 不完整");
          var start = new Date(
            this.start[0],
            this.start[1] - 1,
            this.start[2],
            this.start[3],
            this.start[4]
          ).getTime();
          var end = new Date(
            this.end[0],
            this.end[1] - 1,
            this.end[2],
            this.end[3],
            this.end[4]
          ).getTime();
          var first = new Date(
            this.initialOption[0],
            this.initialOption[1] - 1,
            this.initialOption[2],
            this.initialOption[3],
            this.initialOption[4]
          ).getTime();
          if (start > end) throw Error("开始时间不能大于结束时间.");
          if (first > end) this.initialOption = this.end;
          if (first < start) this.initialOption = this.start;
          break;
      }
    },
    /**
     * 定义初始化标签函数
     */
    initTab: function() {
      this.previousTime = []; // 储存前一次操作的时间
      this.yearArr = []; // 储存年份的数组
      this.monthArr = []; // 储存月份的数组
      this.dayArr = []; // 储存日期的数组
      this.dayNumArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 储存每月天数的数组
      this.hourArr = []; // 储存小时的数组
      this.minuteArr = []; // 储存分钟的数组
      this.dateArr = []; // 储存各项时间的数组
      this.dateIndex = []; // 储存当前各项时间索引的数组
      this.suffix =
        this.hasSuffix === "yes"
          ? ["年", "月", "日", "时", "分"]
          : ["", "", "", "", ""]; // 储存各项时间后缀的数组
      this.wrapId = generateUUID() + "-wrap"; // 选择器外包裹元素ID
      this.ulCount = 0; // 展示的列数
      this.liHeight =
        this.style && this.style.liHeight ? this.style.liHeight : 40; // 每个li的高度
      this.btnHeight =
        this.style && this.style.btnHeight ? this.style.btnHeight : 44; // 按钮的高度
      this.dateUl = []; // 每个ul元素
      this.liNum = []; // 每个ul中有多少个可选li
      this.curDis = []; // 每个ul当前偏离的距离
      this.curPos = []; // touchstart时每个ul偏离的距离
      this.startY = 0; // touchstart的位置
      this.startTime = 0; // touchstart的时间
      this.endTime = 0; // touchend的时间
      this.moveY = 0; // touchmove的位置
      this.moveTime = 0; // touchmove的时间
      this.moveNumber = 1; // touchmove规定时间间隔下的次数
      this.moveSpeed = []; // touchmove规定时间间隔下的平均速度
      this.abled = true; // 标识滚动是否进行中
      this.containerId = this.wrapId + "-container"; // 选择器容器ID
      this.boxId = this.wrapId + "-box"; // 选择器按钮区域ID
      this.contentId = this.wrapId + "-content"; // 选择器选择区域ID
      this.abolishId = this.wrapId + "-abolish"; // 选择器取消按钮ID
      this.sureId = this.wrapId + "-sure"; // 选择器确定按钮ID
      this.titleId = this.wrapId + "-title"; // 选择器确定按钮ID
      this.isSelect = true; // 是否呼起选择框
    },
    /**
     * 定义初始化 UI 函数
     */
    initUI: function() {
      for (var i = 0; i < this.initialOption.length; i++) {
        this.previousTime.push(this.initialOption[i]);
      }
      for (var i = 0; i < this.initialOption.length; i++) {
        if (this.initialOption[i]) {
          this.calculateArr(i);
          this.calculateDis(i);
          this.ulCount++;
        }
      }
      this.initDateArr();
      this.initLiNum();
      this.createContainer();
      this.renderpicker();
      for (var i = 0; i < this.dateArr.length; i++) {
        if (this.dateArr[i]) this.roll(i);
      }
    },
    /**
     * 定义初始化事件函数
     */
    initEvent: function() {
      var that = this;
      var wrap = that.wrap;
      that.container = $id(that.containerId);

      // 点击目标元素显示选择器
      if (that.inputId) {
        $id(that.inputId).addEventListener("click", function() {
          that.beforeShow && that.beforeShow();
          if (that.isSelect) that.show();
        });
      }
      // 点击保存按钮隐藏选择器并输出结果
      $id(that.sureId).addEventListener("click", function() {
        that.success(that.result(that.previousTime));
        that.hide();
      });

      // 点击取消隐藏选择器
      $id(that.abolishId).addEventListener("click", function() {
        that.cancel && that.cancel();
        that.hide();
      });

      // 点击背景隐藏选择器
      wrap.addEventListener("click", function(e) {
        if (
          e.target.id === that.wrapId &&
          wrap.classList.contains("hg-picker-bg-show")
        ) {
          that.cancel && that.cancel();
          that.hide();
        }
      });

      // 为每个 ul 元素绑定 touch 事件
      that.dateUl.forEach(function(val, index) {
        if (val) {
          val.addEventListener(
            "touchstart",
            function() {
              that.touch(index);
            },
            false
          );
          val.addEventListener(
            "touchmove",
            function() {
              that.touch(index);
            },
            false
          );
          val.addEventListener(
            "touchend",
            function() {
              that.touch(index);
            },
            true
          );
        }
      });
    },
    /**
     * 计算并返回当前项显示的数组
     * Explain : @i 需要处理的列的索引
     */
    calculateArr: function(i) {
      switch (i) {
        case 0:
          this.yearArr = getArr(this.start[0], this.end[0]);
          break;
        case 1:
          this.monthArr = [];
          if (this.start[i - 1] === this.end[i - 1])
            this.monthArr = getArr(this.start[i], this.end[i]);
          else if (this.curDate(i - 1) === this.start[i - 1])
            this.monthArr = getArr(this.start[i], 12);
          else if (this.curDate(i - 1) === this.end[i - 1])
            this.monthArr = getArr(1, this.end[i]);
          else this.monthArr = getArr(1, 12);
          break;
        case 2:
          this.dayArr = [];
          // 如果是闰年，2月改为29天
          if (this.isLeapYear(this.curDate(0))) this.dayNumArr[1] = 29;
          else this.dayNumArr[1] = 28;
          var curTime = new Date(
            this.curDate(0),
            this.curDate(1) - 1
          ).getTime();
          var startTime = new Date(this.start[0], this.start[1] - 1).getTime();
          var endTime = new Date(this.end[0], this.end[1] - 1).getTime();
          if (startTime === endTime)
            this.dayArr = getArr(this.start[2], this.end[2]);
          else if (curTime === startTime)
            this.dayArr = getArr(
              this.start[2],
              this.dayNumArr[this.curDate(1) - 1]
            );
          else if (curTime === endTime) this.dayArr = getArr(1, this.end[2]);
          else this.dayArr = getArr(1, this.dayNumArr[this.curDate(1) - 1]);
          break;
        case 3:
          if (this.type === "dateTime") {
            var curTime = new Date(
              this.curDate(0),
              this.curDate(1) - 1,
              this.curDate(2)
            ).getTime();
            var startTime = new Date(
              this.start[0],
              this.start[1] - 1,
              this.start[2]
            ).getTime();
            var endTime = new Date(
              this.end[0],
              this.end[1] - 1,
              this.end[2]
            ).getTime();
            if (startTime === endTime)
              this.hourArr = getArr(this.start[i], this.end[i]);
            else if (curTime === startTime)
              this.hourArr = getArr(this.start[i], 23);
            else if (curTime === endTime) this.hourArr = getArr(0, this.end[i]);
            else this.hourArr = getArr(0, 23);
          } else {
            this.hourArr = getArr(this.start[i], this.end[i]);
          }
          break;
        case 4:
          if (this.type === "dateTime") {
            var curTime = new Date(
              this.curDate(0),
              this.curDate(1) - 1,
              this.curDate(2),
              this.curDate(3)
            ).getTime();
            var startTime = new Date(
              this.start[0],
              this.start[1] - 1,
              this.start[2],
              this.start[3]
            ).getTime();
            var endTime = new Date(
              this.end[0],
              this.end[1] - 1,
              this.end[2],
              this.end[3]
            ).getTime();
            if (startTime === endTime)
              this.minuteArr = getArr(this.start[i], this.end[i]);
            else if (curTime === startTime)
              this.minuteArr = getArr(this.start[i], 59);
            else if (curTime === endTime)
              this.minuteArr = getArr(0, this.end[i]);
            else this.minuteArr = getArr(0, 59);
          } else {
            if (this.start[i - 1] === this.end[i - 1])
              this.minuteArr = getArr(this.start[i], this.end[i]);
            else if (this.curDate(i - 1) === this.start[i - 1])
              this.minuteArr = getArr(this.start[i], 59);
            else if (this.curDate(i - 1) === this.end[i - 1])
              this.minuteArr = getArr(0, this.end[i]);
            else this.minuteArr = getArr(0, 59);
          }
          break;
      }
    },
    /**
     * 获取对应列的所有数据
     * Explain : @i 需要处理的列的索引
     */
    CurArr: function(i) {
      var curArr = [];
      if (i === 0) curArr = this.yearArr;
      if (i === 1) curArr = this.monthArr;
      if (i === 2) curArr = this.dayArr;
      if (i === 3) curArr = this.hourArr;
      if (i === 4) curArr = this.minuteArr;
      return curArr;
    },
    /**
     * 获取对应列的结果
     * Explain : @i 需要处理的列的索引
     */
    curDate: function(i) {
      var curDate = 0;
      // this.dateArr 还没有被赋值的情况
      if (this.dateArr.length === 0) curDate = this.initialOption[i];
      else {
        if (this.dateArr[i] === undefined) curDate = undefined;
        else curDate = this.dateArr[i][this.dateIndex[i]];
      }
      return curDate;
    },
    /**
     * 计算并返回当前项所在的位置
     * Explain : @i 需要处理的列的索引
     */
    calculateDis: function(i) {
      var curArr = this.CurArr(i);
      if (this.previousTime[i] > curArr[curArr.length - 1])
        this.dateIndex[i] = curArr.length - 1;
      else if (this.previousTime[i] < curArr[0]) this.dateIndex[i] = 0;
      else {
        for (var j = 0; j < curArr.length; j++) {
          if (curArr[j] === this.previousTime[i]) {
            this.dateIndex[i] = j;
            break;
          }
        }
      }
      this.curDis[i] = -1 * this.liHeight * this.dateIndex[i];
    },
    /**
     * 根据选择器类型确定 dateArr
     */
    initDateArr: function() {
      switch (this.type) {
        case "date":
          this.dateArr = [this.yearArr, this.monthArr, this.dayArr];
          break;
        case "time":
          this.dateArr = [
            undefined,
            undefined,
            undefined,
            this.hourArr,
            this.minuteArr
          ];
          break;
        case "dateTime":
          this.dateArr = [
            this.yearArr,
            this.monthArr,
            this.dayArr,
            this.hourArr,
            this.minuteArr
          ];
          break;
        default:
          throw Error("Please set a right type of hg-picker.");
      }
    },
    /**
     * 判断每个 ul 中有多少个 li 选项
     * Explain : @index 需要处理的列的索引
     */
    initLiNum: function(index) {
      if (index) {
        if (this.dateArr[index] !== undefined) {
          this.liNum[index] = this.dateArr[index].length;
        }
      } else {
        for (var i = 0; i < this.dateArr.length; i++) {
          if (this.dateArr[i] !== undefined) {
            this.liNum[i] = this.dateArr[i].length;
          }
        }
      }
    },
    /**
     * 创建选择器外包裹元素
     */
    createContainer: function() {
      var div = document.createElement("div");
      div.id = this.wrapId;
      // 放在 body 中最后的位置
      document.body.appendChild(div);
      // 每一目标元素对应一个唯一的选择器外包裹元素
      this.wrap = $id(this.wrapId);
      this.wrap.classList.add("hg-picker-bg");
    },
    /**
     * 渲染选择器
     */
    renderpicker: function() {
      var len = this.dateArr.length;

      var btnHTML =
        '<div class="hg-picker-btn-box" id="' +
        this.boxId +
        '">' +
        '<div class="hg-picker-btn" id="' +
        this.abolishId +
        '">' +
        this.cancelText +
        "</div>" +
        '<div class="hg-picker-btn" id="' +
        this.sureId +
        '">' +
        this.sureText +
        "</div>" +
        '<span id="' +
        this.titleId +
        '" >' +
        this.title +
        "</span> " +
        "</div>";

      var str = "";
      for (var i = 0; i < len; i++) {
        if (this.dateArr[i] !== undefined) str += this.renderUl(i);
      }

      var contentHtml =
        '<div class="hg-picker-content" id="' +
        this.contentId +
        '">' +
        str +
        '<div class="hg-picker-up-shadow"></div>' +
        '<div class="hg-picker-down-shadow"></div>' +
        '<div class="hg-picker-line"></div>' +
        "</div>";

      // 设置按钮位置
      if (this.style && this.style.btnLocation === "bottom") {
        var html =
          '<div  class="hg-picker-container" id="' +
          this.containerId +
          '">' +
          contentHtml +
          btnHTML +
          "</div>";
      } else {
        var html =
          '<div  class="hg-picker-container" id="' +
          this.containerId +
          '">' +
          btnHTML +
          contentHtml +
          "</div>";
      }

      this.wrap.innerHTML = html;
      for (var i = 0; i < len; i++) {
        if (this.dateArr[i] !== undefined) {
          this.dateUl[i] = $id(this.wrapId + "-ul-" + i);
          this.dateUl[i].style.width = (100 / this.ulCount).toFixed(2) + "%";
          this.renderLi(i);
        }
      }
      this.setStyle();
    },
    /**
     * 设置选择器样式
     */
    setStyle: function() {
      if (!this.style) return;
      var obj = this.style;
      var container = $id(this.containerId);
      var content = $id(this.contentId);
      var box = $id(this.boxId);
      var sureBtn = $id(this.sureId);
      var cancelBtn = $id(this.abolishId);
      var len = content.children.length;
      // 设置高宽
      if (obj.liHeight !== 40) {
        for (var i = 0; i < this.ulCount; i++) {
          setChildStyle(content.children[i], "height", this.liHeight + "px");
        }
        content.children[len - 3].style.height = this.liHeight * 2 + "px";
        content.children[len - 2].style.height = this.liHeight * 2 + "px";
        content.children[len - 1].style.height = this.liHeight + "px";
        content.children[len - 1].style.top = this.liHeight * 2 + "px";
        content.style.height = this.liHeight * 5 + "px";
        content.style.lineHeight = this.liHeight + "px";
      }
      if (obj.btnHeight !== 44) {
        box.style.height = this.btnHeight + "px";
        box.style.lineHeight = this.btnHeight + "px";
      }
      if (obj.btnOffset) {
        sureBtn.style.marginRight = obj.btnOffset;
        cancelBtn.style.marginLeft = obj.btnOffset;
      }
      if (obj.liHeight !== 40 || obj.btnHeight !== 44) {
        container.style.height = this.liHeight * 5 + this.btnHeight + "px";
      }
      // 设置配色
      if (obj.titleColor) box.style.color = obj.titleColor;
      if (obj.sureColor) sureBtn.style.color = obj.sureColor;
      if (obj.cancelColor) cancelBtn.style.color = obj.cancelColor;
      if (obj.btnBgColor) box.style.backgroundColor = obj.btnBgColor;
      if (obj.contentColor) content.style.color = obj.contentColor;
      if (obj.contentBgColor)
        content.style.backgroundColor = obj.contentBgColor;
      if (obj.upShadowColor)
        content.children[len - 3].style.backgroundImage = obj.upShadowColor;
      if (obj.downShadowColor)
        content.children[len - 2].style.backgroundImage = obj.downShadowColor;
      if (obj.lineColor)
        content.children[len - 1].style.borderColor = obj.lineColor;
    },
    /**
     * 渲染 ul 元素
     * Explain : @i 需要处理的列的索引
     * Return : String
     */
    renderUl: function(i) {
      return '<ul id="' + this.wrapId + "-ul-" + i + '"></ul>';
    },
    /**
     * 渲染 li 元素
     * Explain : @i 需要处理的列的索引
     */
    renderLi: function(i) {
      var that = this;
      that.dateUl[i].innerHTML = "";
      var lis = "<li></li><li></li>";
      that.dateArr[i].forEach(function(val, index) {
        val = that.addZero(val);
        lis += "<li>" + val + that.suffix[i] + "</li>";
      });
      lis += "<li></li><li></li>";
      that.dateUl[i].innerHTML = lis;
      if (this.liHeight !== 40)
        setChildStyle(that.dateUl[i], "height", this.liHeight + "px");
    },
    /**
     * 控制列表的滚动
     * Explain : @i 需要处理的列的索引
     * @time 滚动持续时间
     */
    roll: function(i, time) {
      if (this.curDis[i] || this.curDis[i] === 0) {
        this.dateUl[i].style.transform =
          "translate3d(0, " + this.curDis[i] + "px, 0)";
        this.dateUl[i].style.webkitTransform =
          "translate3d(0, " + this.curDis[i] + "px, 0)";
        if (time) {
          this.dateUl[i].style.transition = "transform " + time + "s ease-out";
          this.dateUl[i].style.webkitTransition =
            "-webkit-transform " + time + "s ease-out";
        }
      }
    },
    /**
     * 时间选择器触摸事件
     * Explain : @i 需要处理的列的索引
     */
    touch: function(i) {
      var event = event || window.event;
      event.preventDefault();
      switch (event.type) {
        case "touchstart":
          this.startTime = Date.now();
          // 列表滚动中禁止二次操作
          if (this.startTime - this.endTime < 200) {
            this.abled = false;
            return;
          } else this.abled = true;
          this.startY = event.touches[0].clientY;
          this.curPos[i] = this.curDis[i];
          this.previousTime[i] = this.curDate(i);
          this.moveNumber = 1;
          this.moveSpeed = [];
          break;
        case "touchmove":
          if (!this.abled) return;
          event.preventDefault();
          this.moveY = event.touches[0].clientY;
          var offset = this.startY - this.moveY; // 向上为正数，向下为负数
          this.moveTime = Date.now();
          this.curDis[i] = this.curPos[i] - offset;
          if (this.curDis[i] >= 1.5 * this.liHeight)
            this.curDis[i] = 1.5 * this.liHeight;
          if (
            this.curDis[i] <=
            -1 * (this.liNum[i] - 1 + 1.5) * this.liHeight
          ) {
            this.curDis[i] = -1 * (this.liNum[i] - 1 + 1.5) * this.liHeight;
          }
          this.roll(i);
          // 每运动 130 毫秒，记录一次速度
          if (this.moveTime - this.startTime >= 130 * this.moveNumber) {
            this.moveNumber++;
            this.moveSpeed.push(offset / (this.moveTime - this.startTime));
          }
          break;
        case "touchend":
          if (!this.abled) return;
          this.endTime = Date.now();
          if (this.moveNumber === 1)
            var speed =
              (this.startY - event.changedTouches[0].clientY) /
              (this.endTime - this.startTime);
          else var speed = this.moveSpeed[this.moveSpeed.length - 1];
          this.curDis[i] = this.curDis[i] - this.calculateBuffer(speed, this.a);
          this.fixate(i);
          this.roll(i, 0.2);
          for (var j = i; j < this.dateArr.length - 1; j++) {
            if (this.dateArr[j + 1]) this.changeDate(j + 1);
          }
          this.previousTime[i] = this.curDate(i);
          break;
      }
    },
    /**
     * 计算滚动缓冲距离
     * Return : Number
     * Explain : @v 速度（正负表示运动方向, 单位 px/ms）
     * @a 加速度（正数, 单位 px/(ms * ms)）
     */
    calculateBuffer: function(v, a) {
      if (Math.abs(v) < 0.25) return 0;
      else return (v / Math.abs(v)) * ((0.5 * v * v) / a);
    },
    /**
     * 确定 ul 最终的位置
     * Explain : @i 需要定位的列的索引
     */
    fixate: function(i) {
      if (this.curDis[i] <= -1 * (this.liNum[i] - 1) * this.liHeight)
        this.dateIndex[i] = this.liNum[i] - 1;
      else if (this.curDis[i] >= 0) this.dateIndex[i] = 0;
      else this.dateIndex[i] = -1 * Math.round(this.curDis[i] / this.liHeight);
      this.curDis[i] = -1 * this.liHeight * this.dateIndex[i];
    },
    /**
     * 边界判断
     * Explain : @i 需要判断边界的列的索引
     *  如果已经到边界则改变视图
     */
    changeDate: function(i) {
      this.calculateArr(i);
      this.dateArr[i] = this.CurArr(i);
      this.calculateDis(i);
      this.initLiNum(i);
      this.renderLi(i);
      this.roll(i);
    },
    /**
     * 判断是否是闰年
     * Explain : @year 年份
     */
    isLeapYear: function(year) {
      var cond1 = year % 4 === 0;
      var cond2 = year % 100 !== 0;
      var cond3 = year % 400 === 0;
      var cond = (cond1 && cond2) || cond3;
      if (cond) return true;
      else return false;
    },
    /**
     * 返回最终结果的数组
     * Return : Array
     */
    result: function(arr) {
      var arr2 = [];
      for (var i = 0; i < this.dateArr.length; i++) {
        if (this.dateArr[i]) arr2.push(arr[i]);
      }
      return arr2;
    },
    /**
     * 加零，一位数显示为两位
     * Explain : @num 需要处理的数字
     * Return : Number
     */
    addZero: function(num) {
      if (this.hasZero === "yes" && num < 10) num = "0" + num;
      return num;
    },
    /**
     * 显示选择器
     */
    show: function() {
      this.wrap.classList.add("hg-picker-bg-show");
      this.container.classList.add("hg-picker-container-up");
    },
    /**
     * 隐藏选择器
     */
    hide: function() {
      this.wrap.classList.remove("hg-picker-bg-show");
      this.container.classList.remove("hg-picker-container-up");
    },
    /**
     * 是否禁止呼起选择框
     */
    forbidSelect: function(status) {
      this.isSelect = !status;
    },
    /**
     * 设置选择器标题
     */
    setTitle: function(text) {
      $id(this.titleId).innerHTML = text;
    }
  };

  return DatePicker;
});
