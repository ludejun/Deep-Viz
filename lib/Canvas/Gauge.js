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

var Gauge = function (_React$Component) {
  _inherits(Gauge, _React$Component);

  function Gauge(props) {
    _classCallCheck(this, Gauge);

    var _this = _possibleConstructorReturn(this, (Gauge.__proto__ || Object.getPrototypeOf(Gauge)).call(this, props));

    _this.animate = function () {
      var nowV = Math.floor(_this.gauge.value);
      var preV = Math.floor(_this.gauge.preValue);
      var direction = (nowV - preV) / Math.abs(nowV - preV);
      if (preV !== nowV) {
        preV = direction * 1 + preV;
        _this.gauge.preValue = preV;
        _this.gauge.draw(preV);
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(_this.animate);
        } else {
          _this.timeid = setTimeout(_this.animate, 1);
        }
      } else {
        _this.gauge.draw(_this.gauge.value);
        _this.timeid && clearTimeout(_this.timeid);
      }
    };

    _this.id = Math.random() + '_canvas_gundam';
    _this.gauge = null;
    function GaugePan(opts) {
      this._width = opts.minLength;
      this._height = opts.minLength;
      this._radius = opts.radius;
      this._outergap = opts.outergap;
      this._innergap = opts.innergap;
      this._value_line_num = opts.valueLineNum;
      this._value_num = opts.valueNum;
      this._value_span = opts.valueSpan;
      this._unite = opts.unite;
      this._context = opts.context;
      this._canvas = opts.canvas;
      this._center_point = opts.centerPoint;
      this.preValue = opts.preValue;
      this.value = opts.value;
    }
    GaugePan.prototype = {
      constructor: GaugePan,
      drawOuterCircle: function drawOuterCircle() {
        this._context.save();
        this._context.shadowColor = 'rgba(0, 0, 0, 0.7)';
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowBlur = 6;
        this._context.fillStyle = 'rgba(100, 140, 230, 0.1)';
        this._context.strokeStyle = 'rgba(100, 140, 230, 0.9)';
        this._context.beginPath();
        this._context.arc(this._center_point.x, this._center_point.y, this._radius, 0, Math.PI * 2, false);
        this._context.stroke();
        this._context.arc(this._center_point.x, this._center_point.y, this._radius - this._outergap, 0, Math.PI * 2, true);
        this._context.fill();
        this._context.restore();
      },
      drawDegree: function drawDegree() {
        this._context.save();
        this._context.beginPath();
        this._context.fillStyle = 'rgba(255, 0, 0, 0.2)';
        this._context.arc(this._center_point.x, this._center_point.y, this._radius - this._outergap, Math.PI / 2, 0, true);
        this._context.arc(this._center_point.x, this._center_point.y, this._radius - this._innergap, 0, Math.PI / 2, false);
        this._context.fill();
        this._context.beginPath();
        this._context.fillStyle = 'rgba(0, 128, 0, 0.2)';
        this._context.arc(this._center_point.x, this._center_point.y, this._radius - this._outergap, Math.PI / 2, Math.PI, false);
        this._context.arc(this._center_point.x, this._center_point.y, this._radius - this._innergap, Math.PI, Math.PI / 2, true);
        this._context.fill();
        this._context.beginPath();
        this._context.fillStyle = 'rgba(0, 0, 255, 0.2)';
        this._context.arc(this._center_point.x, this._center_point.y, this._radius - this._outergap, Math.PI, Math.PI * 2, false);
        this._context.arc(this._center_point.x, this._center_point.y, this._radius - this._innergap, Math.PI * 2, Math.PI, true);
        this._context.fill();
        var DPERANGLE = this.getValueLineAngle();
        for (var i = 0, j = 0; i < Math.PI * 2; i += DPERANGLE, j += 1) {
          this._context.beginPath();
          if (i <= Math.PI / 2) {
            this._context.strokeStyle = 'red';
          } else if (i > Math.PI / 2 && i <= Math.PI) {
            this._context.strokeStyle = 'green';
          } else {
            this._context.strokeStyle = 'blue';
          }
          var x1 = j % 2 === 0 ? this._center_point.x + (this._radius - this._innergap) * Math.cos(i) : this._center_point.x + (this._radius - this._innergap + 3) * Math.cos(i);
          var y1 = j % 2 === 0 ? this._center_point.y + (this._radius - this._innergap) * Math.sin(i) : this._center_point.y + (this._radius - this._innergap + 3) * Math.sin(i);
          var x2 = j % 2 === 0 ? x1 + (this._innergap - this._outergap) * Math.cos(i) : x1 + (this._innergap - this._outergap - 3) * Math.cos(i);
          var y2 = j % 2 === 0 ? y1 + (this._innergap - this._outergap) * Math.sin(i) : y1 + (this._innergap - this._outergap - 3) * Math.sin(i);
          this._context.moveTo(x1, y1);
          this._context.lineTo(x2, y2);
          this._context.stroke();
        }
        this._context.restore();
      },
      getValueLineAngle: function getValueLineAngle() {
        return Math.PI * 2 / this._value_line_num;
      },
      getValueAngle: function getValueAngle() {
        return Math.PI * 2 / this._value_num;
      },
      getMaxValue: function getMaxValue() {
        return this._value_num * this._value_span;
      },
      drawNum: function drawNum() {
        this._context.beginPath();
        this._context.save();
        this._context.shadowColor = 'rgba(0,0,0,0.8)';
        this._context.shadowOffsetX = 1;
        this._context.shadowOffsetY = 1;
        this._context.shadowBlur = 1;
        this._context.fillStyle = 'rgba(0, 0, 230, 0.9)';
        this._context.font = this._radius * 0.08 + 'px Helvetica';
        var PERANGLE = this.getValueAngle();
        for (var i = Math.PI / 2, j = 0; i < Math.PI * 2 + Math.PI / 2; i += PERANGLE, j += 1) {
          var x1 = this._center_point.x + (this._radius - (this._innergap + this._radius * 0.08)) * Math.cos(i);
          var y1 = this._center_point.x + (this._radius - (this._innergap + this._radius * 0.08)) * Math.sin(i);
          j < this._value_num && this._context.fillText(j * this._value_span, x1, y1);
        }
        this._context.restore();
      },
      drawTick: function drawTick(value) {
        var MAXVALUE = this.getMaxValue();
        if (typeof value === 'number' && value <= MAXVALUE) {
          var point = this.caculatePoint(value);
          this._context.save();
          this._context.beginPath();
          this._context.strokeStyle = 'yellow';
          this._context.lineWidth = this._radius * 0.015;
          this._context.moveTo(this._center_point.x, this._center_point.y);
          this._context.lineTo(point.x, point.y);
          this._context.stroke();
          this._context.beginPath();
          this._context.fillStyle = 'rgba(147,210,242,0.6)';
          this._context.arc(this._center_point.x, this._center_point.y, this._radius * 0.05, 0, Math.PI * 2);
          this._context.fill();
          this._context.beginPath();
          this._context.arc(point.x, point.y, this._radius * 0.025, 0, Math.PI * 2);
          this._context.fillStyle = 'rgba(255, 0, 0, 0.6)';
          this._context.fill();
          this._context.restore();
          this._context.font = this._radius * 0.08 + 'px Helvetica';
          this._context.fillText('\u5355\u4F4D:' + this._unite, this._center_point.x, this._center_point.y + this._radius * 0.4);
        }
      },
      caculatePoint: function caculatePoint(value) {
        var angle = value * (this.getValueAngle() / this._value_span) + Math.PI / 2;
        var x = this._center_point.x + this._radius * Math.cos(angle);
        var y = this._center_point.y + this._radius * Math.sin(angle);
        return {
          x: x,
          y: y
        };
      },
      draw: function draw(value) {
        this._context.clearRect(0, 0, this._width, this._height);
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this.drawOuterCircle();
        this.drawDegree();
        this.drawNum();
        this.drawTick(value);
      }
    };
    _this.init = function () {
      var canvas = document.getElementById(_this.id);
      var styleDom = window.getComputedStyle(canvas.parentNode);
      var width = Math.floor(window.parseInt(styleDom.width));
      var height = Math.floor(window.parseInt(styleDom.height));
      var minLength = Math.min(width, height);
      canvas.width = minLength;
      canvas.height = minLength;
      var radius = minLength / 2 * 0.96;
      var outergap = radius * 0.1;
      var innergap = radius * 0.15;
      var valueLineNum = props.tickMarkNum || 60;
      var valueNum = props.valueNum || 6;
      var valueSpan = props.valueSpan || 100;
      var unite = props.unit || 'km/h';
      var context = canvas.getContext('2d');
      var centerPoint = { x: minLength / 2, y: minLength / 2 };
      _this.gauge = new GaugePan({ minLength: minLength,
        radius: radius,
        outergap: outergap,
        innergap: innergap,
        valueLineNum: valueLineNum,
        valueNum: valueNum,
        valueSpan: valueSpan,
        unite: unite,
        context: context,
        canvas: canvas,
        centerPoint: centerPoint,
        value: props.value,
        preValue: 0 });
      _this.gauge.draw(_this.gauge.value);
    };
    return _this;
  }

  _createClass(Gauge, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      var preValue = this.gauge.value;
      this.gauge.preValue = preValue;
      this.gauge.value = nextprops.value;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.animate();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { position: 'relative', width: '100%', height: '100%' } },
        _react2.default.createElement('canvas', { id: this.id })
      );
    }
  }]);

  return Gauge;
}(_react2.default.Component);

exports.default = Gauge;