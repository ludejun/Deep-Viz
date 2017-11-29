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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/10/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var CircleAnimate = function (_React$Component) {
  _inherits(CircleAnimate, _React$Component);

  function CircleAnimate(props) {
    _classCallCheck(this, CircleAnimate);

    var _this = _possibleConstructorReturn(this, (CircleAnimate.__proto__ || Object.getPrototypeOf(CircleAnimate)).call(this, props));

    function Circle(opts) {
      this.pos = {};
      this._ctx = opts.ctx;
      this._width = opts.width;
      this._height = opts.height;
      this._fillStyle = opts.fillStyle;
      this.init();
    }
    Circle.prototype = {
      constructor: Circle,
      init: function init() {
        this.pos.x = Math.random() * this._width;
        this.pos.y = this._height + Math.random() * 100;
        this.alpha = 0.1 + Math.random() * 0.3;
        this.scale = 0.1 + Math.random() * 0.3;
        this.velocity = Math.random();
      },
      draw: function draw() {
        if (this.alpha <= 0) {
          this.init();
        }
        this.pos.y -= this.velocity;
        this.alpha -= 0.0005;
        this._ctx.beginPath();
        this._ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false);
        // this._ctx.fillStyle = `rgba(, ${this.alpha})`;
        this._ctx.globalAlpha = this.alpha;
        this._ctx.fillStyle = this._fillStyle;
        this._ctx.fill();
      }
    };
    _this.initHeader = function () {
      var width = _this.props.width ? _this.props.width : window.innerWidth;
      var height = _this.props.height ? _this.props.height : window.innerHeight;
      var animateHeader = true;
      var largeHeader = document.getElementById('_circleanimateBgImg');
      largeHeader.style.height = height + 'px';

      var canvas = document.getElementById('_circleanimate');
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext('2d');
      var fillStyle = _this.props.fillStyle || 'rgb(255,255,255)';
      // create particles
      var circles = [];
      for (var x = 0; x < width * 0.5; x++) {
        var c = new Circle({
          ctx: ctx,
          width: width,
          height: height,
          fillStyle: fillStyle
        });
        circles.push(c);
      }
      function animate() {
        if (animateHeader) {
          ctx.clearRect(0, 0, width, height);
          for (var i = 0; i < circles.length; i++) {
            circles[i].draw();
          }
        }
        requestAnimationFrame(animate);
      }

      animate();
    };
    return _this;
  }

  _createClass(CircleAnimate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Main
      this.initHeader();
    }
  }, {
    key: 'render',
    value: function render() {
      var bgStyle = {
        backgroundImage: 'url(img/default.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { id: '_circleanimateBgImg', style: bgStyle },
          _react2.default.createElement('canvas', { id: '_circleanimate' })
        )
      );
    }
  }]);

  return CircleAnimate;
}(_react2.default.Component);

exports.default = CircleAnimate;

CircleAnimate.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number
};