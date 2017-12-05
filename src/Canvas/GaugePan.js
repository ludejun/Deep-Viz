import React from 'react';

export default class GaugePan extends React.Component {
  constructor(props) {
    super(props);
    this.tickMarkNum = 37;
    this.bigMarkSpan = 3;
    this.degreeStart = props.startNumber || 0;
    this.degreeSpan = props.numberInterval || 20;
    this.leftLable = props.leftLabel || '男';
    this.rightLable = props.rightLabel || '女';
    this.displayLable = props.displayLable || false;
    this.unite = props.unit || 'km/h';
    this.startAngle = Math.PI / 4;
    this.endAngle = Math.PI * 3 / 4;
    this.canvas = null;
    this.context = null;
    this.outerCircle = null;
    this.innerCircle = null;
    this.centerCircle = null;
    this.clockCircle = null;
    this.tickMark = null;
    this.hand = null;
    this.minLength = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.Circle = Circle;
    this.TickMark = TickMark;
    this.Hand = Hand;
    this.offScreen = document.createElement('canvas');
    this.realContext = null;
    this.gauge = null;
    this.GaugeConstructor = GaugeConstructor;
    function GaugeConstructor(outerCircle,
      innerCircle,
      hand,
      centerCircle,
      clockCircle,
      tickMark,
      context,
      offScreen,
      offContext,
      minLength,
      leftLable,
      rightLable,
      displayLable) {
      this.outerCircle = outerCircle;
      this.innerCircle = innerCircle;
      this.hand = hand;
      this.centerCircle = centerCircle;
      this.clockCircle = clockCircle;
      this.tickMark = tickMark;
      this.context = context;
      this.offScreen = offScreen;
      this.offContext = offContext;
      this.minLength = minLength;
      this.realVaule = 0;
      this.lastNum = null;
      this.leftLable = leftLable;
      this.rightLable = rightLable;
      this.displayLable = displayLable;
    }
    GaugeConstructor.prototype.initPan = function () {
      this.offContext.clearRect(0, 0, this.minLength, this.minLength);
      this.outerCircle.stroke();
      this.innerCircle.stroke();
      this.hand.draw();
      this.centerCircle.fill();
      this.clockCircle.stroke();
      this.tickMark.draw();
      this.context.drawImage(this.offScreen, 0, 0, this.minLength, this.minLength);
      if (this.displayLable) {
        const xl = this.outerCircle.x +
        Math.cos(this.outerCircle.endAngle) * this.minLength / 2 * 1.15;
        const yl = this.outerCircle.y +
        Math.sin(this.outerCircle.endAngle) * this.minLength / 2 * 1.15;
        const xr = this.outerCircle.x +
        Math.cos(this.outerCircle.startAngle) * this.minLength / 2 * 1.15;
        const yr = this.outerCircle.y +
        Math.sin(this.outerCircle.startAngle) * this.minLength / 2 * 1.15;
        this.context.save();
        this.context.font = `${Math.floor(this.minLength * 0.042)}px serial`;
        this.context.fillText(this.leftLable, xl, yl);
        this.context.fillText(this.rightLable, xr, yr);
        this.context.restore();
      }
    };
    GaugeConstructor.prototype.calNum = function (nam) {
      !this.maxNum &&
      (this.maxNum = Math.floor(this.tickMark.tickMarkNum / this.tickMark.bigMarkSpan) *
      this.tickMark.degreeSpan + this.tickMark.degreeStart);
      !this.numPerDegree &&
      (this.numPerDegree = (Math.PI * 2 -
        (this.outerCircle.endAngle - this.outerCircle.startAngle)) / this.maxNum);
      if (nam <= this.maxNum) {
        this.currentDegree = this.outerCircle.endAngle + nam * this.numPerDegree;
        this.hand.angle = this.currentDegree;
        this.currentNum = nam;
      }
    };
    GaugeConstructor.prototype.drawNum = function () {
      this.context.save();
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillStyle = this.hand.color;
      this.context.font = `${Math.floor(this.minLength * 0.1)}px serial`;
      this.context.fillText(this.currentNum,
      this.minLength / 2,
      this.minLength - Math.floor(this.minLength * 0.2));
      this.context.fillStyle = 'black';
      this.context.font = `${Math.floor(this.minLength * 0.05)}px serial`;
      this.context.fillText(`单位：${this.tickMark.unite}`, this.minLength / 2, this.minLength - Math.floor(this.minLength * 0.1));
      this.context.restore();
    };
    GaugeConstructor.prototype.drawPan = function (nam) {
      this.context.clearRect(0, 0, this.minLength, this.minLength);
      this.calNum(nam);
      this.initPan();
      this.drawNum();
    };
    GaugeConstructor.prototype.animateDrawPan = function () {
      if (this.lastNum !== null) {
        this.animateCount += 1;
        this.lastNum += (this.animateSpan);
        this.drawPan(this.lastNum);
        // if (Math.abs(this.animateSpan) === 1) {
        //   if (this.realVaule === this.lastNum) {
        //     window.cancelAnimationFrame(this.animate);
        //   } else {
        //     this.animate = window.requestAnimationFrame(this.animateDrawPan.bind(this));
        //   }
        // }
        if (1) {
          if (Math.abs(this.realVaule - this.lastNum) <= Math.abs(this.animateSpan)) {
            this.drawPan(this.realVaule);
            window.cancelAnimationFrame(this.animate);
          } else {
            window.cancelAnimationFrame(this.animate);
            this.animate = window.requestAnimationFrame(this.animateDrawPan.bind(this));
          }
        }
      } else {
        this.drawPan(this.realVaule);
        this.lastNum = this.realVaule;
      }
    };
    GaugeConstructor.prototype.setValue = function (nam) {
      this.realVaule = nam;
      let span = 2;
      if (this.lastNum !== null) {
        const direction = Math.abs((this.realVaule - this.lastNum)) /
        (this.realVaule - this.lastNum);
        span = 1 * direction;
        (Math.abs(this.realVaule - this.lastNum) > this.maxNum / 2) &&
        (span = 6 * direction);
      }
      this.animateSpan = span;
      this.animateCount = 0;
      window.requestAnimationFrame(this.animateDrawPan.bind(this));
    };
    function Circle(x,
      y,
      radius,
      strokeStyle,
      fillStyle,
      startAngle,
      endAngle,
      lineWidth,
      context,
      clock) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.strokeStyle = strokeStyle;
      this.fillStyle = fillStyle;
      this.startAngle = startAngle;
      this.endAngle = endAngle;
      this.lineWidth = lineWidth;
      this.context = context;
      this.clock = clock;
    }
    Circle.prototype.createPath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.clock);
    };
    Circle.prototype.stroke = function () {
      this.createPath();
      this.context.save();
      this.context.strokeStyle = this.strokeStyle;
      this.context.lineWidth = this.lineWidth;
      this.context.stroke();
      this.context.restore();
    };
    Circle.prototype.fill = function () {
      this.createPath();
      this.context.save();
      this.context.fillStyle = this.fillStyle;
      this.context.fill();
      this.context.restore();
    };
    function TickMark(tickMarkNum,
      bigMarkLength,
      smallMarkLength,
      bigMarkSpan,
      degreeStart,
      degreeSpan,
      context,
      minLength,
      startAngle,
      endAngle,
      unite) {
      this.tickMarkNum = tickMarkNum;
      this.bigMarkLength = bigMarkLength;
      this.smallMarkLength = smallMarkLength;
      this.bigMarkSpan = bigMarkSpan;
      this.degreeStart = degreeStart;
      this.degreeSpan = degreeSpan;
      this.context = context;
      this.minLength = minLength;
      this.startAngle = startAngle;
      this.endAngle = endAngle;
      this.unite = unite;
    }
    TickMark.prototype.draw = function () {
      this.centerX = this.minLength / 2;
      this.centerY = this.minLength / 2;
      const totalAngle = (2 * Math.PI) - (this.endAngle - this.startAngle);
      const perAngle = totalAngle / (this.tickMarkNum - 1);
      for (let i = 0, startA = this.endAngle;
        i < this.tickMarkNum;
        i += 1, startA += perAngle) {
        const x = this.centerX +
        (this.minLength / 2 - 4 - 0.5 +
          Math.ceil(this.minLength * 0.004)) * Math.cos(startA);
        const y = this.centerY +
        (this.minLength / 2 - 4 - 0.5 +
          Math.ceil(this.minLength * 0.004)) * Math.sin(startA);
        if (i % 3 === 0) {
          this.context.beginPath();
          this.context.moveTo(x, y);
          this.context.lineTo(x - this.bigMarkLength * Math.cos(startA),
          y - this.bigMarkLength * Math.sin(startA));
          this.context.save();
          this.context.strokeStyle = '#2B92F9';
          this.context.lineWidth = Math.floor(this.minLength * 0.012) - 0.5;
          this.context.stroke();
          this.context.restore();
          this.context.beginPath();
          const tX = x - (this.bigMarkLength + 7) * Math.cos(startA);
          const tY = y - (this.bigMarkLength + 7) * Math.sin(startA);
          this.context.save();
          this.context.textAlign = 'center';
          this.context.textBaseline = 'middle';
          this.context.font = `${Math.floor(this.minLength * 0.027)}px serial`;
          this.context.fillText(this.degreeStart + i / 3 * this.degreeSpan, tX, tY);
          this.context.restore();
        } else {
          this.context.beginPath();
          this.context.moveTo(x, y);
          this.context.lineTo(x - this.smallMarkLength * Math.cos(startA),
          y - this.smallMarkLength * Math.sin(startA));
          this.context.save();
          this.context.strokeStyle = '#2B92F9';
          this.context.lineWidth = Math.floor(this.minLength * 0.008) - 0.5;
          this.context.stroke();
          this.context.restore();
        }
      }
    };
    function Hand(x, y, angle, color, minLength, context) {
      this.centerX = x;
      this.centerY = y;
      this.angle = angle;
      this.color = color;
      this.minLength = minLength;
      this.lineSpan = Math.ceil(minLength * 0.031) + 0.5;
      this.lineLength = Math.floor(minLength * 0.061);
      this.handLength = Math.ceil(minLength / 2 - Math.floor(minLength * 0.19));
      this.context = context;
    }
    Hand.prototype.drawLine = function () {
      this.lx = this.centerX + Math.cos(this.angle) * this.lineSpan;
      this.ly = this.centerY + Math.sin(this.angle) * this.lineSpan;
      this.context.beginPath();
      this.context.moveTo(this.lx, this.ly);
      this.context.lineTo(this.lx + Math.cos(this.angle) * this.lineLength,
      this.ly + Math.sin(this.angle) * this.lineLength);
      this.context.stroke();
    };
    Hand.prototype.drawHand = function () {
      const x1 = this.lx +
      Math.cos(this.angle) *
      (this.lineLength + Math.ceil(this.minLength * 0.011));
      const y1 = this.ly +
      Math.sin(this.angle) *
      (this.lineLength + Math.ceil(this.minLength * 0.011));
      const x2 = this.centerX + Math.cos(this.angle) * this.handLength;
      const y2 = this.centerX + Math.sin(this.angle) * this.handLength;
      this.context.save();
      this.context.fillStyle = this.color;
      this.context.strokeStyle = this.color;
      this.context.beginPath();
      this.context.arc(x1, y1, Math.ceil(this.minLength * 0.011), 0, Math.PI * 2);
      this.context.fill();
      const x3 = x1 + Math.cos(this.angle) * Math.ceil(this.minLength * 0.011);
      const y3 = y1 + Math.sin(this.angle) * Math.ceil(this.minLength * 0.011);
      this.context.beginPath();
      this.context.moveTo(x3, y3);
      this.context.lineTo(x2, y2);
      this.context.closePath();
      this.context.lineWidth = this.minLength * 0.0133;
      this.context.lineJoin = 'round';
      this.context.stroke();
      this.context.restore();
    };
    Hand.prototype.draw = function () {
      this.drawLine();
      this.drawHand();
    };
  }

  componentDidMount() {
    this.context = this.offScreen.getContext('2d');
    this.realContext = this.canvas.getContext('2d');
    const styleDom = window.getComputedStyle(this.canvas.parentNode);
    const width = Math.floor(window.parseInt(styleDom.width));
    const height = Math.floor(window.parseInt(styleDom.height));
    this.minLength = Math.min(width, height);
    this.centerX = Math.floor(this.minLength / 2) + 0.5;
    this.centerY = Math.floor(this.minLength / 2) - 0.5;
    this.offScreen.width = this.minLength * 1;
    this.offScreen.height = this.minLength * 1;
    this.context.scale(1, 1);
    this.canvas.width = this.minLength;
    this.canvas.height = this.minLength;
    const linearGradient = this.context.createLinearGradient(0, 0, this.minLength, this.minLength);
    linearGradient.addColorStop(0, '#06F0FB');
    linearGradient.addColorStop(0.1, '#13E2FA');
    linearGradient.addColorStop(0.2, '#1CD8F9');
    linearGradient.addColorStop(0.3, '#2ACAF8');
    linearGradient.addColorStop(0.4, '#36BDF6');
    linearGradient.addColorStop(0.5, '#42B0F5');
    linearGradient.addColorStop(0.6, '#50A1F4');
    linearGradient.addColorStop(0.7, '#5D94F3');
    linearGradient.addColorStop(0.8, '#628FF2');
    linearGradient.addColorStop(1, '#6D83F1');
    this.outerCircle = new this.Circle(this.centerX,
                                       this.centerY,
                                       this.minLength / 2 - 4 + 0.5,
                                       linearGradient,
                                       null,
                                       this.startAngle,
                                       this.endAngle,
                                       Math.ceil(this.minLength * 0.0088) - 0.5,
                                       this.context,
                                       true);
    this.innerCircle = new this.Circle(this.centerX,
                                        this.centerY,
                                        this.minLength / 2 - 4
                                         - Math.floor(this.minLength * 0.15) + 0.5,
                                        linearGradient,
                                        null,
                                        this.startAngle,
                                        this.endAngle,
                                        Math.floor(this.minLength * 0.0065) + 0.5,
                                        this.context,
                                        true);
    this.centerCircle = new this.Circle(this.centerX,
                                        this.centerY,
                                          Math.floor(this.minLength * 0.093) + 0.5,
                                          null,
                                          'rgba(43,146,249,0.2)',
                                          0,
                                          2 * Math.PI,
                                          1,
                                          this.context,
                                          true);
    this.clockCircle = new this.Circle(this.centerX,
                                        this.centerY,
                                            Math.ceil(this.minLength * 0.031) + 0.5,
                                            '#2B92F9',
                                            null,
                                            0,
                                            2 * Math.PI,
                                            Math.floor(this.minLength * 0.031 / 2) + 0.5,
                                            this.context,
                                            true);
    this.tickMark = new this.TickMark(this.tickMarkNum,
                                      Math.ceil(this.minLength * 0.062),
                                      Math.ceil(this.minLength * 0.039),
                                      3,
                                      this.degreeStart,
                                      this.degreeSpan,
                                      this.context,
                                      this.minLength,
                                      this.startAngle,
                                      this.endAngle,
                                      this.unite);
    this.hand = new this.Hand(this.centerX, this.centerY, Math.PI * 3 / 4, '#2B92F9', this.minLength, this.context);
    this.gauge = new this.GaugeConstructor(this.outerCircle,
      this.innerCircle,
      this.hand,
      this.centerCircle,
      this.clockCircle,
      this.tickMark,
      this.realContext,
      this.offScreen,
      this.context,
      this.minLength,
      this.leftLable,
      this.rightLable,
      this.displayLable);
    this.gauge.setValue(this.props.number);
  }
  componentWillReceiveProps(nextprops) {
    this.gauge.currentNum && (this.gauge.lastNum = this.gauge.currentNum);
    nextprops.number && (this.gauge.setValue(nextprops.number));
  }
  render() {
    return <div style={{ position: 'relative', width: '100%', height: '100%' }}><canvas ref={(ref) => { this.canvas = ref; }}>对不起，您的浏览器不行，请升级浏览器！</canvas></div>;
  }
}
