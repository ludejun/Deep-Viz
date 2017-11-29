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

var AbstractCanvasVisualization = function (_React$Component) {
  _inherits(AbstractCanvasVisualization, _React$Component);

  function AbstractCanvasVisualization() {
    _classCallCheck(this, AbstractCanvasVisualization);

    return _possibleConstructorReturn(this, (AbstractCanvasVisualization.__proto__ || Object.getPrototypeOf(AbstractCanvasVisualization)).apply(this, arguments));
  }

  _createClass(AbstractCanvasVisualization, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.isCanvasSupported()) {
        var c = document.getElementById('AbstractCanvasVisualizationShow');
        c.width = this.props.width || 400;
        c.height = this.props.height || 400;
        var cw = c.width;
        var ch = c.height;
        var cl = this.smoothTrail(c, cw, ch);

        this.setupRAF();
        cl.init();
      }
    }
  }, {
    key: 'setupRAF',
    value: function setupRAF() {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
      }
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
          clearTimeout(id);
        };
      }
    }
  }, {
    key: 'isCanvasSupported',
    value: function isCanvasSupported() {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }
  }, {
    key: 'smoothTrail',
    value: function smoothTrail(c, cw, ch) {
      var _this3 = this;

      this.init = function () {
        _this3.loop();
      };
      var _this = this;
      this.c = c;
      this.ctx = c.getContext('2d');
      this.cw = cw;
      this.ch = ch;
      this.mx = 0;
      this.my = 0;
      // trail
      this.trail = [];
      this.maxTrail = 200;
      this.mouseDown = false;

      this.ctx.lineWidth = 0.1;
      this.ctx.lineJoin = 'round';

      this.radius = 1;
      this.speed = 0.4;
      this.angle = 0;
      this.arcx = 0;
      this.arcy = 0;
      this.growRadius = true;
      this.seconds = 0;
      this.milliseconds = 0;
      this.rand = function (rMi, rMa) {
        return ~~(Math.random() * (rMa - rMi + 1) + rMi);
      };
      this.hitTest = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
      };
      this.createPoint = function (a, b) {
        _this3.trail.push({
          x: a,
          y: b
        });
      };
      this.updateTrail = function () {
        if (_this3.trail.length < _this3.maxTrail) {
          _this3.createPoint(_this3.arcx, _this3.arcy);
        }
        if (_this3.trail.length >= _this3.maxTrail) {
          _this3.trail.splice(0, 1);
        }
      };
      this.updateArc = function () {
        _this3.arcx = _this3.cw / 2 + Math.sin(_this3.angle) * _this3.radius;
        _this3.arcy = _this3.ch / 2 + Math.cos(_this3.angle) * _this3.radius;
        var d = new Date();
        _this3.seconds = d.getSeconds();
        _this3.milliseconds = d.getMilliseconds();
        _this3.angle += _this3.speed * (_this3.seconds + 1 + _this3.milliseconds / 1000);

        if (_this3.radius <= 1) {
          _this3.growRadius = true;
        }
        if (_this3.radius >= 200) {
          _this3.growRadius = false;
        }

        if (_this3.growRadius) {
          _this3.radius += 1;
        } else {
          _this3.radius -= 1;
        }
      };
      this.renderTrail = function () {
        // let i = this.trail.length;

        _this3.ctx.beginPath();
        for (var i = _this3.trail.length - 1; i > -1; i--) {
          var point = _this3.trail[i];
          var nextPoint = i === _this3.trail.length ? _this3.trail[i + 1] : _this3.trail[i];

          var m = (point.x + nextPoint.x) / 2;
          var d = (point.y + nextPoint.y) / 2;
          _this3.ctx.quadraticCurveTo(Math.round(_this3.arcx), Math.round(_this3.arcy), m, d);
        }
        _this3.ctx.strokeStyle = _this3.props.color || 'hsla(' + _this3.rand(170, 300) + ', 100%, ' + _this3.rand(50, 75) + '%, 1)';
        _this3.ctx.stroke();
        _this3.ctx.closePath();
      };
      this.clearCanvas = function () {
        // this.ctx.globalCompositeOperation = 'source-over';
        // winconstdowthis.ctx.clearRect(0,0,this.cw,this.ch);

        _this3.ctx.globalCompositeOperation = 'destination-out';
        _this3.ctx.fillStyle = 'rgba(0,0,0,.1)';
        _this3.ctx.fillRect(0, 0, _this3.cw, _this3.ch);
        _this3.ctx.globalCompositeOperation = 'lighter';
      };
      this.loop = function () {
        function loopIt() {
          requestAnimationFrame(loopIt, _this.c);
          _this.clearCanvas();
          _this.updateArc();
          _this.updateTrail();
          _this.renderTrail();
        }
        loopIt();
      };
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('canvas', { id: 'AbstractCanvasVisualizationShow' });
    }
  }]);

  return AbstractCanvasVisualization;
}(_react2.default.Component);

exports.default = AbstractCanvasVisualization;


AbstractCanvasVisualization.propTypes = {
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  color: _propTypes2.default.string
};