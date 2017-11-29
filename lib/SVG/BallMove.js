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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BallMove = function (_Component) {
  _inherits(BallMove, _Component);

  function BallMove(props) {
    _classCallCheck(this, BallMove);

    var _this = _possibleConstructorReturn(this, (BallMove.__proto__ || Object.getPrototypeOf(BallMove)).call(this, props));

    _this.randomNumber = Math.round(Math.random() * 10000);
    return _this;
  }

  _createClass(BallMove, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.onresize = function () {
        var svgFather = document.querySelector('.ball-move-container' + _this2.randomNumber);
        var svgContainer = document.querySelector('.svg-container' + _this2.randomNumber);
        svgContainer.style.width = svgFather.offsetWidth + 'px';
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          ballColor = _props.ballColor,
          width = _props.width,
          dur = _props.dur,
          direction = _props.direction;

      var keyPoints = direction === 'alternate' ? '0;1;0' : '0;1';
      var keyTimes = direction === 'alternate' ? '0;0.5;1' : '0;1';
      var time = direction === 'alternate' ? dur ? parseFloat(dur) * 2 + 's' : '10s' : dur || '5s';
      return _react2.default.createElement(
        'div',
        { className: 'ball-move-container' + this.randomNumber },
        _react2.default.createElement(
          'svg',
          {
            width: width || '727px'
            // height="105px"
            , viewBox: '0 0 727 105',
            version: '1.1',
            className: 'svg-container' + this.randomNumber
          },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'linearGradient',
              {
                x1: '0%',
                y1: '55.5784881%',
                x2: '95.7643905%',
                y2: '55.5784881%',
                id: 'linearGradient-ball'
              },
              _react2.default.createElement('stop', { stopColor: '#FFFFFF', offset: '0%' }),
              _react2.default.createElement('stop', { stopColor: '#A3D8FB', offset: '27.9690011%' }),
              _react2.default.createElement('stop', { stopColor: '#0091F3', offset: '42.7341854%' }),
              _react2.default.createElement('stop', { stopColor: '#0076EF', offset: '62.0846864%' }),
              _react2.default.createElement('stop', { stopColor: '#0064EC', stopOpacity: '0.317933697', offset: '81.04108%' }),
              _react2.default.createElement('stop', { stopColor: '#005BEA', stopOpacity: '0', offset: '100%' })
            )
          ),
          _react2.default.createElement(
            'g',
            {
              transform: 'translate(1.000000, -171.000000)',
              stroke: 'url(#linearGradient-ball)',
              strokeWidth: '4',
              fill: 'none',
              fillRule: 'evenodd'
            },
            _react2.default.createElement('path', {
              d: 'M0.03515625,245.310547 C85.0371094,266.837891 71.703125,226.107422 117.441406,226.107422 C163.179688,226.107422 159.878906,257.753906 182.974609,257.988281 C206.070313,258.222656 209.035156,237.564453 231.331471,241.0585 C253.627786,244.552546 259.465434,273.121307 292.297542,273.121307 C325.12965,273.121307 323.280488,173 360.313025,173 C397.345561,173 392.163811,261.140801 430.115164,261.201676 C468.066518,261.262551 476.003906,223.060654 515.537109,223.060654 C555.070313,223.060654 584.207031,279.454971 636.119141,251.257812 C688.03125,223.060654 697.224609,266.382812 757.988281,266.382812',
              id: 'ballPath'
            }),
            _react2.default.createElement(
              'circle',
              {
                id: 'ball',
                r: '5',
                cx: '0',
                cy: '0',
                fill: ballColor || 'orange',
                stroke: 'white',
                strokeWidth: '1'
              },
              _react2.default.createElement('animate', {
                attributeType: 'CSS',
                attributeName: 'opacity',
                values: '0;1;0',
                dur: dur || '5s',
                repeatCount: 'indefinite',
                begin: '0s'
              })
            )
          ),
          _react2.default.createElement(
            'animateMotion',
            {
              xlinkHref: '#ball',
              repeatCount: 'indefinite',
              begin: '0s',
              dur: time,
              keyPoints: keyPoints,
              keyTimes: keyTimes,
              calcMode: 'linear'
            },
            _react2.default.createElement('mpath', { xlinkHref: '#ballPath' })
          )
        )
      );
    }
  }]);

  return BallMove;
}(_react.Component);

exports.default = BallMove;


BallMove.propTypes = {
  ballColor: _propTypes2.default.string,
  width: _propTypes2.default.string
};