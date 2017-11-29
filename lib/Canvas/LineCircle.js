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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/11/8.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var LineCircle = function (_React$Component) {
  _inherits(LineCircle, _React$Component);

  function LineCircle(props) {
    _classCallCheck(this, LineCircle);

    var _this = _possibleConstructorReturn(this, (LineCircle.__proto__ || Object.getPrototypeOf(LineCircle)).call(this, props));

    var Circle = function () {
      function Circle(opts) {
        _classCallCheck(this, Circle);

        this.ctx = opts.context;
        this.width = opts.width;
        this.height = opts.height;
        this.x = Math.random() * opts.width;
        this.y = Math.random() * opts.height;
        this.r = Math.random() * 20;
        this.movex = Math.random() * 0.8;
        this.movey = Math.random() * 0.8;
      }

      _createClass(Circle, [{
        key: 'drawCircle',
        value: function drawCircle() {
          this.ctx.beginPath();
          this.ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
          // this.ctx.fillStyle = 'green';
          this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
          this.ctx.fill();
          this.ctx.closePath();
        }
      }, {
        key: 'drawLine',
        value: function drawLine(currentCircle) {
          var dx = this.x - currentCircle.x;
          var dy = this.y - currentCircle.y;

          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(currentCircle.x, currentCircle.y);
            this.ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
            this.ctx.closePath();
            this.ctx.stroke();
          }
        }
        // 圆圈移动的距离必须在屏幕范围内

      }, {
        key: 'move',
        value: function move(w, h) {
          if (this.x + this.movex - this.r < 0 || this.x + this.movex + this.r > w) {
            this.movex = -this.movex;
          }
          if (this.y + this.movey - this.r < 0 || this.y + this.movey + this.r > h) {
            this.movey = -this.movey;
          }
          this.x += this.movex;
          this.y += this.movey;
        }
      }]);

      return Circle;
    }();

    _this.init = function (w, h, cirNum) {
      var canvas = document.getElementById('_lincircle');
      var context = canvas.getContext('2d');
      var width = w;
      var height = h;
      canvas.width = width;
      canvas.height = height;
      var circles = [];
      // let current_circle;
      for (var i = 0; i < cirNum / 2; i++) {
        var c = new Circle({
          context: context,
          width: width,
          height: height
        });
        circles.push(c);
      }

      function draw() {
        context.clearRect(0, 0, width, height);
        for (var _i = 0; _i < circles.length; _i++) {
          circles[_i].drawCircle();
          circles[_i].move(width, height);
          for (var j = _i + 1; j < circles.length; j++) {
            circles[_i].drawLine(circles[j]);
          }
        }
        requestAnimationFrame(draw);
      }
      requestAnimationFrame(draw);
    };
    return _this;
  }

  _createClass(LineCircle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setCanvasSize();
      window.addEventListener('resize', function () {
        _this2.setCanvasSize();
      }, false);
    }
  }, {
    key: 'setCanvasSize',
    value: function setCanvasSize() {
      var parentWidth = parseInt(getComputedStyle(document.getElementById('_linecircleContainer')).width, 10);
      var cirNum = parseInt(parentWidth * 120 / window.innerWidth, 10);
      var w = parentWidth || window.innerWidth;
      var h = this.props.height || window.innerHeight;
      this.init(w, h, cirNum);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: '_linecircleContainer' },
        _react2.default.createElement('canvas', { id: '_lincircle' })
      );
    }
  }]);

  return LineCircle;
}(_react2.default.Component);

exports.default = LineCircle;

LineCircle.propTypes = {
  height: _propTypes2.default.number
};