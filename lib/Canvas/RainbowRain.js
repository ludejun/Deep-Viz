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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/9/29.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RainbowRain = function (_React$Component) {
  _inherits(RainbowRain, _React$Component);

  function RainbowRain() {
    _classCallCheck(this, RainbowRain);

    return _possibleConstructorReturn(this, (RainbowRain.__proto__ || Object.getPrototypeOf(RainbowRain)).apply(this, arguments));
  }

  _createClass(RainbowRain, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // initial
      var colors = [];
      var dots = [];
      var dotsVel = [];
      var canvasEle = document.getElementById('_rainbowrain');
      var ctx = canvasEle.getContext('2d');
      var w = canvasEle.width = this.props.width ? this.props.width : window.innerWidth;
      var h = canvasEle.height = this.props.height ? this.props.height : window.innerHeight;
      // parameters
      var total = w;
      var accelleration = 0.05;
      // afterinitial calculations
      var size = w / total;
      var occupation = w / total;
      var repaintColor = 'rgba(0, 0, 0, 0.04)';
      // setting the colors' hue
      // and y level for all dots
      var portion = 360 / total;
      for (var i = 0; i < total; ++i) {
        colors[i] = portion * i;
        dots[i] = h;
        dotsVel[i] = 10;
      }
      function anim() {
        // #sourceURl
        window.requestAnimationFrame(anim);
        ctx.fillStyle = repaintColor;
        ctx.fillRect(0, 0, w, h);
        for (var _i = 0; _i < total; ++_i) {
          var currentY = dots[_i] - 1;
          dots[_i] += dotsVel[_i] += accelleration;
          ctx.fillStyle = 'hsl(' + colors[_i] + ', 80%, 50%)';
          ctx.fillRect(occupation * _i, currentY, size, dotsVel[_i] + 1);
          if (dots[_i] > h && Math.random() < 0.01) {
            dots[_i] = dotsVel[_i] = 0;
          }
        }
      }

      anim();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('canvas', { id: '_rainbowrain' })
        )
      );
    }
  }]);

  return RainbowRain;
}(_react2.default.Component);

exports.default = RainbowRain;

RainbowRain.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number
};