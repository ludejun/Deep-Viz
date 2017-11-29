'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Created by Administrator on 2017/10/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this.timer = null;

    var Clocks = function () {
      function Clocks(opts) {
        _classCallCheck(this, Clocks);

        this.ctx = opts.ctx;
        this.rem = opts.rem;
        this.r = opts.r;
      }

      _createClass(Clocks, [{
        key: 'drawCircle',
        value: function drawCircle() {
          var _this2 = this;

          this.ctx.save();
          this.ctx.translate(this.r, this.r);
          this.ctx.beginPath();
          this.ctx.lineWidth = 10 * this.rem;
          this.ctx.arc(0, 0, this.r - this.ctx.lineWidth / 2, 2 * Math.PI, false);
          this.ctx.stroke();

          var hoursNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
          this.ctx.font = '(16 *' + this.rem + ')px Arial';
          this.ctx.textAlign = 'center';
          this.ctx.textBaseline = 'middle';
          hoursNumbers.forEach(function (number, i) {
            var rad = 2 * Math.PI / 12 * i;
            var x = Math.cos(rad) * (_this2.r - 30 * _this2.rem);
            var y = Math.sin(rad) * (_this2.r - 30 * _this2.rem);
            _this2.ctx.fillText(number, x, y);
          });
          for (var i = 0; i < 60; i++) {
            var rad = 2 * Math.PI / 60 * i;
            var x = Math.cos(rad) * (this.r - 18 * this.rem);
            var y = Math.sin(rad) * (this.r - 18 * this.rem);
            this.ctx.beginPath();
            if (i % 5 === 0) {
              this.ctx.fillStyle = '#ccc';
              this.ctx.arc(x, y, 3 * this.rem, 0, 2 * Math.PI, false);
            } else {
              this.ctx.fillStyle = '#000';
              this.ctx.arc(x, y, 2 * this.rem, 0, 2 * Math.PI, false);
            }
            this.ctx.fill();
          }
        }
      }, {
        key: 'drawHour',
        value: function drawHour(hour, minute) {
          this.ctx.save();
          this.ctx.beginPath();
          var rad = 2 * Math.PI / 12 * hour;
          var mrad = 2 * Math.PI / 12 / 60 * minute;
          this.ctx.rotate(rad + mrad);
          this.ctx.lineWidth = 6 * this.rem;
          this.ctx.lineCap = 'round';
          this.ctx.moveTo(0 * this.rem, 10 * this.rem);
          this.ctx.lineTo(0 * this.rem, -this.r / 2);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }, {
        key: 'drawMinute',
        value: function drawMinute(minute) {
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.fillStyle = '#ccc';
          var rad = 2 * Math.PI / 60 * minute;
          this.ctx.rotate(rad);
          this.ctx.lineWidth = 3 * this.rem;
          this.ctx.lineCap = 'round';
          this.ctx.moveTo(0 * this.rem, 10 * this.rem);
          this.ctx.lineTo(0 * this.rem, -this.r + 40 * this.rem);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }, {
        key: 'drawSecond',
        value: function drawSecond(second) {
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.fillStyle = '#ff0000';
          var rad = 2 * Math.PI / 60 * second;
          this.ctx.rotate(rad);
          this.ctx.lineWidth = 3 * this.rem;
          this.ctx.lineCap = 'round';
          this.ctx.moveTo(-2 * this.rem, 20 * this.rem);
          this.ctx.lineTo(2 * this.rem, 20 * this.rem);
          this.ctx.lineTo(1, -this.r + 20 * this.rem);
          this.ctx.lineTo(-1, -this.r / 2);
          this.ctx.fill();
          this.ctx.restore();
        }
      }, {
        key: 'drawcircledot',
        value: function drawcircledot() {
          this.ctx.beginPath();
          this.ctx.fillStyle = '#fff';
          this.ctx.arc(0, 0, 3 * this.rem, 2 * Math.PI, false);
          this.ctx.fill();
          this.ctx.restore();
        }
      }]);

      return Clocks;
    }();

    _this.draw = function () {
      var dom = document.getElementById('_clockCanvas');
      var ctx = dom.getContext('2d');
      ctx.canvas.width = _this.props.width || 200;
      ctx.canvas.height = _this.props.height || 200;
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      var r = width / 2;
      var rem = width / 200;
      var clock = new Clocks({
        ctx: ctx,
        width: width,
        height: height,
        r: r,
        rem: rem
      });
      ctx.clearRect(0, 0, width, height);
      clock.drawCircle();
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      clock.drawHour(hour, minute);
      clock.drawMinute(minute);
      clock.drawSecond(second);
      clock.drawcircledot();
      ctx.restore();
    };
    return _this;
  }

  _createClass(Clock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.draw();
      clearInterval(this.timer);
      this.timer = setInterval(this.draw, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timer);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('canvas', { id: '_clockCanvas', width: 200, height: 200 })
      );
    }
  }]);

  return Clock;
}(_react2.default.Component);

exports.default = Clock;

Clock.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number
};