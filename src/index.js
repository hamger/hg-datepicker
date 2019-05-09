import { setChildStyle, generateUUID, $id, calculateBuffer } from './utils';

export default class ParaPicker {
  constructor(config) {
    this.data = config.data; // json 数据，必填
    this.valueKey = config.valueKey || 'value'; // 需要展示的数据的键名，选填
    this.childKey = config.childKey || 'child'; // 子数据的键名，选填
    this.success = config.success; // 确定按钮回调函数，必填
    this.cancel = config.cancel || null; // 取消按钮回调函数，选填
    this.title = config.title || ''; // 选择器标题，选填
    this.sureText = config.sureText || '确定'; // 确定按钮文本，选填
    this.cancelText = config.cancelText || '取消'; // 取消按钮文本，选填
    this.a = config.a || 0.001; // 惯性滚动加速度（正数, 单位 px/(ms * ms)），选填，默认 0.001
    this.style = config.style; // 选择器样式, 选填
    this.initTab(); // 初始化标签
    this.initUI(); // 初始化UI
    this.initEvent(); // 初始化事件
  }
  /**
   * 定义初始化标签函数
   */
  initTab() {
    this.wrapId = `${generateUUID()}-wrap`; // 选择器外包裹元素ID
    this.paraIndex = []; // 存放每列地址的索引
    this.ulCount = this.data.length; // 当前展示的列数
    this.liNum = []; // 每个ul有多少个可选li
    for (let i = 0; i < this.ulCount; i++) {
      this.liNum[i] = this.data[i].length;
    }
    this.liHeight = this.style && this.style.liHeight ? this.style.liHeight : 40; // 每个li的高度
    this.btnHeight = this.style && this.style.btnHeight ? this.style.btnHeight : 44; // 按钮的高度
    this.paraUl = []; // 每个ul元素
    this.curDis = []; // 每个ul当前偏离的距离
    this.curPos = []; // 记录 touchstart 时每个ul的竖向距离
    this.startY = 0; // touchstart的位置
    this.startTime = 0; // touchstart的时间
    this.endTime = 0; // touchend的时间
    this.moveY = 0; // touchmove的位置
    this.moveTime = 0; // touchmove的时间
    this.moveNumber = 1; // touchmove规定时间间隔下的次数
    this.moveSpeed = []; // touchmove规定时间间隔下的平均速度
    this.abled = true; // 标识滚动是否进行中
    this.containerId = `${this.wrapId}-container`; // 选择器容器ID
    this.boxId = `${this.wrapId}-box`; // 选择器按钮区域ID
    this.contentId = `${this.wrapId}-content`; // 选择器选择区域ID
    this.abolishId = `${this.wrapId}-abolish`; // 选择器取消按钮ID
    this.sureId = `${this.wrapId}-sure`; // 选择器确定按钮ID
    this.titleId = `${this.wrapId}-title`; // 选择器确定按钮ID
  }
  /**
   * 定义初始化 UI 函数
   */
  initUI() {
    // 创建选择器的外包裹元素
    this.createContainer();
    // 初始化选择器内容
    this.renderContent();
  }
  /**
   * 定义初始化事件函数
   */
  initEvent() {
    this.container = $id(this.containerId);
    // 点击确定按钮隐藏选择器并输出结果
    $id(this.sureId).addEventListener('click', () => {
      this.success(this.getResult());
      this.hide();
    });
    // 点击取消隐藏选择器
    $id(this.abolishId).addEventListener('click', () => {
      if (this.cancel) this.cancel();
      this.hide();
    });
    // 点击背景隐藏选择器
    this.wrap.addEventListener('click', e => {
      if (e.target.id === this.wrapId && this.wrap.classList.contains('hg-picker-bg-show')) {
        if (this.cancel) this.cancel();
        this.hide();
      }
    });
  }
  /**
   * 创建选择器外包裹元素
   */
  createContainer() {
    const div = document.createElement('div');
    div.id = this.wrapId;
    document.body.appendChild(div);
    this.wrap = $id(this.wrapId);
    this.wrap.classList.add('hg-picker-bg');
  }
  /**
   * 获取需要被展示的数据
   * Return : Array
   * Explain : @arr 需要被取值的数组
   */
  getValue(arr) {
    const tempArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] === 'object') tempArr.push(arr[i][this.valueKey]);
      else tempArr.push(arr[i]);
    }
    return tempArr;
  }
  /**
   * 渲染并列选择器的内容
   */
  renderContent() {
    const btnHTML =
      `<div class="hg-picker-btn-box" id="${this.boxId}">` +
      `<div class="hg-picker-btn" id="${this.abolishId}">${this.cancelText}</div>` +
      `<div class="hg-picker-btn" id="${this.sureId}">${this.sureText}</div>` +
      `<span id="${this.titleId}" >${this.title}</span> ` +
      `</div>`;

    const contentHtml =
      `<div class="hg-picker-content" id="${this.contentId}">` +
      `<div class="hg-picker-up-shadow"></div>` +
      `<div class="hg-picker-down-shadow"></div>` +
      `<div class="hg-picker-line"></div>` +
      `</div>`;
    let html = '';
    // 设置按钮位置
    if (this.style && this.style.btnLocation === 'bottom') {
      html = `<div  class="hg-picker-container" id="${
        this.containerId
      }">${contentHtml}${btnHTML}</div>`;
    } else {
      html = `<div  class="hg-picker-container" id="${
        this.containerId
      }">${btnHTML}${contentHtml}</div>`;
    }
    this.wrap.innerHTML = html;
    for (let i = 0; i < this.ulCount; i++) {
      this.renderUl(i);
      this.paraIndex[i] = 0;
      this.curDis[i] = 0 * this.liHeight;
      this.bindRoll(i);
    }
    this.setStyle();
    this.setUlWidth();
  }
  /**
   * 设置选择器样式
   */
  setStyle() {
    if (!this.style) return;
    const obj = this.style;
    const container = $id(this.containerId);
    const content = $id(this.contentId);
    const box = $id(this.boxId);
    const sureBtn = $id(this.sureId);
    const cancelBtn = $id(this.abolishId);
    const len = content.children.length;
    // 设置高度
    if (obj.liHeight !== 40) {
      for (let i = 0; i < this.ulCount; i++) {
        setChildStyle(content.children[i], 'height', `${this.liHeight}px`);
      }
      content.children[len - 3].style.height = `${this.liHeight * 2}px`;
      content.children[len - 2].style.height = `${this.liHeight * 2}px`;
      content.children[len - 1].style.height = `${this.liHeight}px`;
      content.children[len - 1].style.top = `${this.liHeight * 2}px`;
      content.style.height = `${this.liHeight * 5}px`;
      content.style.lineHeight = `${this.liHeight}px`;
    }
    if (obj.btnHeight !== 44) {
      box.style.height = `${this.btnHeight}px`;
      box.style.lineHeight = `${this.btnHeight}px`;
    }
    if (obj.btnOffset) {
      sureBtn.style.marginRight = obj.btnOffset;
      cancelBtn.style.marginLeft = obj.btnOffset;
    }
    if (obj.liHeight !== 40 || obj.btnHeight !== 44)
      container.style.height = `${this.liHeight * 5 + this.btnHeight}px`;
    // 设置配色
    if (obj.titleColor) box.style.color = obj.titleColor;
    if (obj.sureColor) sureBtn.style.color = obj.sureColor;
    if (obj.cancelColor) cancelBtn.style.color = obj.cancelColor;
    if (obj.btnBgColor) box.style.backgroundColor = obj.btnBgColor;
    if (obj.contentColor) content.style.color = obj.contentColor;
    if (obj.contentBgColor) content.style.backgroundColor = obj.contentBgColor;
    if (obj.upShadowColor) content.children[len - 3].style.backgroundImage = obj.upShadowColor;
    if (obj.downShadowColor) content.children[len - 2].style.backgroundImage = obj.downShadowColor;
    if (obj.lineColor) content.children[len - 1].style.borderColor = obj.lineColor;
  }
  /**
   * 渲染 ul 元素
   * Explain : @i 需要处理的列的索引
   */
  renderUl(i) {
    const parentNode = $id(this.contentId);
    const newUl = document.createElement('ul');
    newUl.setAttribute('id', `${this.wrapId}-ul-${i}`);
    parentNode.insertBefore(newUl, parentNode.children[parentNode.children.length - 3]);
    this.paraUl[i] = $id(`${this.wrapId}-ul-${i}`);
    this.renderLi(i);
  }
  /**
   * 渲染 li 元素
   * Explain : @i 需要处理的列的索引
   */
  renderLi(i) {
    this.paraUl[i].innerHTML = '';
    let lis = '<li></li><li></li>';
    this.getValue(this.data[i]).forEach(val => {
      lis += `<li>${val}</li>`;
    });
    lis += '<li></li><li></li>';
    this.paraUl[i].innerHTML = lis;
    if (this.liHeight !== 40) setChildStyle(this.paraUl[i], 'height', `${this.liHeight}px`);
  }
  /**
   * 设置 ul 元素宽度
   */
  setUlWidth() {
    for (let i = 0; i < this.ulCount; i++) {
      this.paraUl[i].style.width = `${(100 / this.ulCount).toFixed(2)}%`;
    }
  }
  /**
   * 绑定滑动事件
   * Explain : @i 需要处理的列的索引
   */
  bindRoll(i) {
    this.paraUl[i].addEventListener(
      'touchstart',
      () => {
        this.touch(i);
      },
      false,
    );
    this.paraUl[i].addEventListener(
      'touchmove',
      () => {
        this.touch(i);
      },
      false,
    );
    this.paraUl[i].addEventListener(
      'touchend',
      () => {
        this.touch(i);
      },
      true,
    );
  }
  /**
   * 控制列表的滚动
   * Explain : @i 需要处理的列的索引
   * @time 滚动持续时间
   */
  roll(i, time) {
    if (this.curDis[i] || this.curDis[i] === 0) {
      this.paraUl[i].style.transform = `translate3d(0, ${this.curDis[i]}px, 0)`;
      this.paraUl[i].style.webkitTransform = `translate3d(0, ${this.curDis[i]}px, 0)`;
      if (time) {
        this.paraUl[i].style.transition = `transform ${time}s ease-out`;
        this.paraUl[i].style.webkitTransition = `-webkit-transform ${time}s ease-out`;
      }
    }
  }
  /**
   * 并列选择器触摸事件
   * Explain : @i 需要处理的列的索引
   */
  touch(i) {
    const event = window.event;
    event.preventDefault();
    switch (event.type) {
      case 'touchstart': {
        this.startTime = new Date();
        // 列表滚动中禁止二次操作
        if (this.startTime - this.endTime < 200) {
          this.abled = false;
          return;
        }
        this.abled = true;
        this.startY = event.touches[0].clientY;
        this.curPos[i] = this.curDis[i]; // 记录当前位置
        this.moveNumber = 1;
        this.moveSpeed = [];
        break;
      }
      case 'touchmove': {
        if (!this.abled) return;
        event.preventDefault();
        this.moveY = event.touches[0].clientY;
        const offset = this.startY - this.moveY; // 向上为正数，向下为负数
        this.curDis[i] = this.curPos[i] - offset;
        if (this.curDis[i] >= 1.5 * this.liHeight) this.curDis[i] = 1.5 * this.liHeight;
        if (this.curDis[i] <= -1 * (this.liNum[i] - 1 + 1.5) * this.liHeight)
          this.curDis[i] = -1 * (this.liNum[i] - 1 + 1.5) * this.liHeight;
        this.roll(i);
        // 每运动 130 毫秒，记录一次速度
        if (this.moveTime - this.startTime >= 130 * this.moveNumber) {
          this.moveNumber++;
          this.moveSpeed.push(offset / (this.moveTime - this.startTime));
        }
        break;
      }
      case 'touchend': {
        if (!this.abled) return;
        this.endTime = Date.now();
        let speed = 0;
        if (this.moveNumber === 1) {
          speed = (this.startY - event.changedTouches[0].clientY) / (this.endTime - this.startTime);
        } else {
          speed = this.moveSpeed[this.moveSpeed.length - 1];
        }
        this.curDis[i] = this.curDis[i] - calculateBuffer(speed, this.a);
        this.fixate(i);
        break;
      }
      default: {
        break;
      }
    }
  }
  /**
   * 固定 ul 最终的位置、更新视图
   * Explain : @i 需要处理的列的索引
   */
  fixate(i) {
    this.getPosition(i);
    this.roll(i, 0.2);
  }
  /**
   * 获取定位数据
   * Explain : @i 需要处理的列的索引
   */
  getPosition(i) {
    if (this.curDis[i] <= -1 * (this.liNum[i] - 1) * this.liHeight)
      this.paraIndex[i] = this.liNum[i] - 1;
    else if (this.curDis[i] >= 0) this.paraIndex[i] = 0;
    else this.paraIndex[i] = -1 * Math.round(this.curDis[i] / this.liHeight);
    this.curDis[i] = -1 * this.liHeight * this.paraIndex[i];
  }
  /**
   * 获取结果的数组
   */
  getResult() {
    return new Array(this.ulCount).fill(1).reduce((pre, cur, i) => {
      pre.push(this.data[i][this.paraIndex[i]]);
      return pre;
    }, []);
  }
  /**
   * 显示选择器
   */
  show() {
    this.wrap.classList.add('hg-picker-bg-show');
    this.container.classList.add('hg-picker-container-up');
  }
  /**
   * 隐藏选择器
   */
  hide() {
    this.wrap.classList.remove('hg-picker-bg-show');
    this.container.classList.remove('hg-picker-container-up');
  }
  /**
   * 设置选择器标题
   */
  setTitle(text) {
    this.title = text;
    $id(this.titleId).innerHTML = this.title;
  }
}
