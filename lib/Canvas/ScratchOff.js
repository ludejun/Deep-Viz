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

var ScratchOff = function (_React$Component) {
  _inherits(ScratchOff, _React$Component);

  function ScratchOff(props) {
    _classCallCheck(this, ScratchOff);

    var _this = _possibleConstructorReturn(this, (ScratchOff.__proto__ || Object.getPrototypeOf(ScratchOff)).call(this, props));

    _this.mouseDown = function (e) {
      var x = e.clientX - _this.Rect.left;
      var y = e.clientY - _this.Rect.top;
      _this.context = _this.canvas.getContext('2d');
      _this.context.beginPath();
      _this.context.rect(_this.offsetX, _this.offsetY, _this.scratchWidth, _this.scratchHeight);
      if (_this.context.isPointInPath(x, y)) {
        _this.scratch = true;
        if (_this.earser) {
          _this.earser.x = x;
          _this.earser.y = y;
        } else {
          _this.earser = new _this.Earser(x, y, _this.earserOpt.radius, _this.earserOpt.color, 1, _this.context);
        }
      } else {
        _this.scratch = false;
      }
    };

    _this.mouseMove = function (e) {
      var x = e.clientX - _this.Rect.left;
      var y = e.clientY - _this.Rect.top;
      _this.context = _this.canvas.getContext('2d');
      _this.context.beginPath();
      _this.context.rect(_this.offsetX, _this.offsetY, _this.scratchWidth, _this.scratchHeight);
      if (_this.scratch && _this.context.isPointInPath(x, y)) {
        _this.earser.x = x;
        _this.earser.y = y;
        _this.context.save();
        _this.earser.createPath();
        _this.context.clip();
        _this.context.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
        _this.context.restore();
        _this.context.save();
        _this.earser.createClipPath();
        _this.context.clip();
        _this.context.drawImage(_this.offScreen, 0, 0);
        _this.context.restore();
      }
    };

    _this.mouseUp = function () {
      _this.scratch = false;
    };

    _this.canvas = null;
    _this.context = null;
    _this.canvasWidth = 0;
    _this.canvasHeight = 0;
    _this.img = null;
    _this.offScreen = document.createElement('canvas');
    _this.offContext = _this.offScreen.getContext('2d');
    _this.offsetX = 0;
    _this.offsetY = 0;
    _this.scratchWidth = 0;
    _this.scratchHeight = 0;
    _this.scratch = false;
    _this.earser = null;
    _this.earserOpt = { radius: 10, color: '#fff' };
    _this.Earser = Earser;
    _this.text = '祝君好运';
    function Earser(x, y, radius, color, lineWidth, context) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.lineWidth = lineWidth;
      this.context = context;
    }
    Earser.prototype.createPath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    };
    Earser.prototype.createClipPath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius + 1, 0, Math.PI * 2);
    };
    // Earser.prototype.drawEarser = function () {
    //   this.createPath();
    //   this.context.save();
    //   this.context.fillStyle = this.color;
    //   this.context.fill();
    //   this.context.restore();
    // };
    _this.scratchOffCanvas = null;
    return _this;
  }

  _createClass(ScratchOff, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.canvas = this.scratchOffCanvas;
      this.context = this.canvas.getContext('2d');
      this.canvasWidth = this.props.width || 500;
      this.canvasHeight = this.props.height || 300;
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
      this.offScreen.width = this.canvasWidth;
      this.offScreen.height = this.canvasHeight;
      if (this.props.background) {
        this.img = new Image();
        this.img.onload = function () {
          _this2.offContext.drawImage(_this2.img, 0, 0, _this2.canvasWidth, _this2.canvasHeight);
          if (_this2.props.scratchPosition) {
            _this2.scratchWidth = _this2.props.scratchPosition.width || 200;
            _this2.scratchHeight = _this2.props.scratchPosition.height || 100;
            _this2.offsetX = _this2.props.scratchPosition.offserX || _this2.canvasWidth - _this2.scratchWidth - 10;
            _this2.offsetY = _this2.props.scratchPosition.offsetY || _this2.canvasHeight - _this2.scratchHeight - 10;
          }
          var fontSize = _this2.scratchHeight * 0.5;
          _this2.offContext.font = fontSize + 'px serial';
          _this2.props.textContent && typeof _this2.props.textContent === 'string' && (_this2.text = _this2.props.textContent);
          _this2.offContext.fillStyle = 'black';
          var tx = _this2.canvasWidth - _this2.scratchWidth / 2 - 10;
          var ty = _this2.canvasHeight - _this2.scratchHeight / 2 - 10;
          _this2.offContext.textAlign = 'center';
          _this2.offContext.textBaseline = 'middle';
          _this2.offContext.fillStyle = _this2.props.textColor || 'black';
          _this2.offContext.fillText(_this2.text, tx, ty, _this2.scratchWidth - 20);
          _this2.context = _this2.canvas.getContext('2d');
          _this2.context.drawImage(_this2.offScreen, 0, 0);
          _this2.context.beginPath();
          _this2.context.save();
          _this2.context.fillStyle = 'lightgray';
          _this2.context.rect(_this2.offsetX, _this2.offsetY, _this2.scratchWidth, _this2.scratchHeight);
          _this2.context.fill();
          _this2.context.restore();
        };
        this.img.src = this.props.background;
        this.earserOpt = Object.assign(this.earserOpt, this.props.earserOpt || {});
        this.Rect = this.canvas.getBoundingClientRect();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'canvas',
          { id: 'canvas', style: { cursor: 'pointer' }, onMouseMove: this.mouseMove, onMouseDown: this.mouseDown, onMouseUp: this.mouseUp, ref: function ref(_ref) {
              _this3.scratchOffCanvas = _ref;
            } },
          '\u5BF9\u4E0D\u8D77\uFF0C\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u522E\u5956\uFF01\u8BF7\u5347\u7EA7\u6D4F\u89C8\u5668'
        )
      );
    }
  }]);

  return ScratchOff;
}(_react2.default.Component);

exports.default = ScratchOff;