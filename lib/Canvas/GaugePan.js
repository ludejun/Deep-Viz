'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GaugePan = function (_React$Component) {
  _inherits(GaugePan, _React$Component);

  function GaugePan(props) {
    _classCallCheck(this, GaugePan);

    var _this = _possibleConstructorReturn(this, (GaugePan.__proto__ || Object.getPrototypeOf(GaugePan)).call(this, props));

    _this.tickMarkNum = 37;
    _this.bigMarkSpan = 3;
    _this.degreeStart = props.startNumber || 0;
    _this.degreeSpan = props.numberInterval || 20;
    _this.leftLable = props.leftLabel || '男';
    _this.rightLable = props.rightLabel || '女';
    _this.displayLable = props.displayLable || false;
    _this.unite = props.unit || 'km/h';
    _this.startAngle = Math.PI / 4;
    _this.endAngle = Math.PI * 3 / 4;
    _this.canvas = null;
    _this.context = null;
    _this.outerCircle = null;
    _this.innerCircle = null;
    _this.centerCircle = null;
    _this.clockCircle = null;
    _this.tickMark = null;
    _this.hand = null;
    _this.minLength = 0;
    _this.centerX = 0;
    _this.centerY = 0;
    _this.Circle = Circle;
    _this.TickMark = TickMark;
    _this.Hand = Hand;
    _this.offScreen = document.createElement('canvas');
    _this.realContext = null;
    _this.gauge = null;
    _this.GaugeConstructor = GaugeConstructor;
    function GaugeConstructor(outerCircle, innerCircle, hand, centerCircle, clockCircle, tickMark, context, offScreen, offContext, minLength, leftLable, rightLable, displayLable) {
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
        var xl = this.outerCircle.x + Math.cos(this.outerCircle.endAngle) * this.minLength / 2 * 1.15;
        var yl = this.outerCircle.y + Math.sin(this.outerCircle.endAngle) * this.minLength / 2 * 1.15;
        var xr = this.outerCircle.x + Math.cos(this.outerCircle.startAngle) * this.minLength / 2 * 1.15;
        var yr = this.outerCircle.y + Math.sin(this.outerCircle.startAngle) * this.minLength / 2 * 1.15;
        this.context.save();
        this.context.font = Math.floor(this.minLength * 0.042) + 'px serial';
        this.context.fillText(this.leftLable, xl, yl);
        this.context.fillText(this.rightLable, xr, yr);
        this.context.restore();
      }
    };
    GaugeConstructor.prototype.calNum = function (nam) {
      !this.maxNum && (this.maxNum = Math.floor(this.tickMark.tickMarkNum / this.tickMark.bigMarkSpan) * this.tickMark.degreeSpan + this.tickMark.degreeStart);
      !this.numPerDegree && (this.numPerDegree = (Math.PI * 2 - (this.outerCircle.endAngle - this.outerCircle.startAngle)) / this.maxNum);
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
      this.context.font = Math.floor(this.minLength * 0.1) + 'px serial';
      this.context.fillText(this.currentNum, this.minLength / 2, this.minLength - Math.floor(this.minLength * 0.2));
      this.context.fillStyle = 'black';
      this.context.font = Math.floor(this.minLength * 0.05) + 'px serial';
      this.context.fillText('\u5355\u4F4D\uFF1A' + this.tickMark.unite, this.minLength / 2, this.minLength - Math.floor(this.minLength * 0.1));
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
        this.lastNum += this.animateSpan;
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
      var span = 2;
      if (this.lastNum !== null) {
        var direction = Math.abs(this.realVaule - this.lastNum) / (this.realVaule - this.lastNum);
        span = 1 * direction;
        Math.abs(this.realVaule - this.lastNum) > this.maxNum / 2 && (span = 6 * direction);
      }
      this.animateSpan = span;
      this.animateCount = 0;
      window.requestAnimationFrame(this.animateDrawPan.bind(this));
    };
    function Circle(x, y, radius, strokeStyle, fillStyle, startAngle, endAngle, lineWidth, context, clock) {
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
    function TickMark(tickMarkNum, bigMarkLength, smallMarkLength, bigMarkSpan, degreeStart, degreeSpan, context, minLength, startAngle, endAngle, unite) {
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
      var totalAngle = 2 * Math.PI - (this.endAngle - this.startAngle);
      var perAngle = totalAngle / (this.tickMarkNum - 1);
      for (var i = 0, startA = this.endAngle; i < this.tickMarkNum; i += 1, startA += perAngle) {
        var x = this.centerX + (this.minLength / 2 - 4 - 0.5 + Math.ceil(this.minLength * 0.004)) * Math.cos(startA);
        var y = this.centerY + (this.minLength / 2 - 4 - 0.5 + Math.ceil(this.minLength * 0.004)) * Math.sin(startA);
        if (i % 3 === 0) {
          this.context.beginPath();
          this.context.moveTo(x, y);
          this.context.lineTo(x - this.bigMarkLength * Math.cos(startA), y - this.bigMarkLength * Math.sin(startA));
          this.context.save();
          this.context.strokeStyle = '#2B92F9';
          this.context.lineWidth = Math.floor(this.minLength * 0.012) - 0.5;
          this.context.stroke();
          this.context.restore();
          this.context.beginPath();
          var tX = x - (this.bigMarkLength + 7) * Math.cos(startA);
          var tY = y - (this.bigMarkLength + 7) * Math.sin(startA);
          this.context.save();
          this.context.textAlign = 'center';
          this.context.textBaseline = 'middle';
          this.context.font = Math.floor(this.minLength * 0.027) + 'px serial';
          this.context.fillText(this.degreeStart + i / 3 * this.degreeSpan, tX, tY);
          this.context.restore();
        } else {
          this.context.beginPath();
          this.context.moveTo(x, y);
          this.context.lineTo(x - this.smallMarkLength * Math.cos(startA), y - this.smallMarkLength * Math.sin(startA));
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
      this.context.lineTo(this.lx + Math.cos(this.angle) * this.lineLength, this.ly + Math.sin(this.angle) * this.lineLength);
      this.context.stroke();
    };
    Hand.prototype.drawHand = function () {
      var x1 = this.lx + Math.cos(this.angle) * (this.lineLength + Math.ceil(this.minLength * 0.011));
      var y1 = this.ly + Math.sin(this.angle) * (this.lineLength + Math.ceil(this.minLength * 0.011));
      var x2 = this.centerX + Math.cos(this.angle) * this.handLength;
      var y2 = this.centerX + Math.sin(this.angle) * this.handLength;
      this.context.save();
      this.context.fillStyle = this.color;
      this.context.strokeStyle = this.color;
      this.context.beginPath();
      this.context.arc(x1, y1, Math.ceil(this.minLength * 0.011), 0, Math.PI * 2);
      this.context.fill();
      var x3 = x1 + Math.cos(this.angle) * Math.ceil(this.minLength * 0.011);
      var y3 = y1 + Math.sin(this.angle) * Math.ceil(this.minLength * 0.011);
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
    return _this;
  }

  _createClass(GaugePan, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context = this.offScreen.getContext('2d');
      this.realContext = this.canvas.getContext('2d');
      var styleDom = window.getComputedStyle(this.canvas.parentNode);
      var width = Math.floor(window.parseInt(styleDom.width));
      var height = Math.floor(window.parseInt(styleDom.height));
      this.minLength = Math.min(width, height);
      this.centerX = Math.floor(this.minLength / 2) + 0.5;
      this.centerY = Math.floor(this.minLength / 2) - 0.5;
      this.offScreen.width = this.minLength * 1;
      this.offScreen.height = this.minLength * 1;
      this.context.scale(1, 1);
      this.canvas.width = this.minLength;
      this.canvas.height = this.minLength;
      var linearGradient = this.context.createLinearGradient(0, 0, this.minLength, this.minLength);
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
      this.outerCircle = new this.Circle(this.centerX, this.centerY, this.minLength / 2 - 4 + 0.5, linearGradient, null, this.startAngle, this.endAngle, Math.ceil(this.minLength * 0.0088) - 0.5, this.context, true);
      this.innerCircle = new this.Circle(this.centerX, this.centerY, this.minLength / 2 - 4 - Math.floor(this.minLength * 0.15) + 0.5, linearGradient, null, this.startAngle, this.endAngle, Math.floor(this.minLength * 0.0065) + 0.5, this.context, true);
      this.centerCircle = new this.Circle(this.centerX, this.centerY, Math.floor(this.minLength * 0.093) + 0.5, null, 'rgba(43,146,249,0.2)', 0, 2 * Math.PI, 1, this.context, true);
      this.clockCircle = new this.Circle(this.centerX, this.centerY, Math.ceil(this.minLength * 0.031) + 0.5, '#2B92F9', null, 0, 2 * Math.PI, Math.floor(this.minLength * 0.031 / 2) + 0.5, this.context, true);
      this.tickMark = new this.TickMark(this.tickMarkNum, Math.ceil(this.minLength * 0.062), Math.ceil(this.minLength * 0.039), 3, this.degreeStart, this.degreeSpan, this.context, this.minLength, this.startAngle, this.endAngle, this.unite);
      this.hand = new this.Hand(this.centerX, this.centerY, Math.PI * 3 / 4, '#2B92F9', this.minLength, this.context);
      this.gauge = new this.GaugeConstructor(this.outerCircle, this.innerCircle, this.hand, this.centerCircle, this.clockCircle, this.tickMark, this.realContext, this.offScreen, this.context, this.minLength, this.leftLable, this.rightLable, this.displayLable);
      this.gauge.setValue(this.props.number);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      this.gauge.currentNum && (this.gauge.lastNum = this.gauge.currentNum);
      nextprops.number && this.gauge.setValue(nextprops.number);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { style: { position: 'relative', width: '100%', height: '100%' } },
        _react2.default.createElement(
          'canvas',
          { ref: function ref(_ref) {
              _this2.canvas = _ref;
            } },
          '\u5BF9\u4E0D\u8D77\uFF0C\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u884C\uFF0C\u8BF7\u5347\u7EA7\u6D4F\u89C8\u5668\uFF01'
        )
      );
    }
  }]);

  return GaugePan;
}(_react2.default.Component);

exports.default = GaugePan;