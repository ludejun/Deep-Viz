'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BaiduMapControlBase2 = require('./BaiduMapControlBase');

var _BaiduMapControlBase3 = _interopRequireDefault(_BaiduMapControlBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */


var random = Math.random();

var BaiduMapPoint = function (_BaiduMapControlBase) {
  _inherits(BaiduMapPoint, _BaiduMapControlBase);

  function BaiduMapPoint(props) {
    _classCallCheck(this, BaiduMapPoint);

    return _possibleConstructorReturn(this, (BaiduMapPoint.__proto__ || Object.getPrototypeOf(BaiduMapPoint)).call(this, props));
  }

  _createClass(BaiduMapPoint, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window['mapload' + random.toString().substr(2)] = this.mapload.bind(this);
      if (typeof BMap === 'undefined') {
        this.loadScript();
      } else {
        this.mapload();
      }
    }
  }, {
    key: 'loadScript',
    value: function loadScript() {
      var script = document.createElement('script');
      script.src = 'http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapload' + random.toString().substr(2);
      document.body.appendChild(script);
    }
  }, {
    key: 'showMessage',
    value: function showMessage(msg, point, map, labelMask) {
      if (!msg) {
        return;
      }
      function MsgShow(point, msg, map) {
        this._point = point;
        this._msg = msg;
        this.map = map;
      }
      MsgShow.prototype = new BMap.Overlay();
      MsgShow.prototype.initialize = function () {
        var _this2 = this;

        var div = this._div = document.createElement("div");
        div.style.position = "absolute";
        var divID = 'map_tooltip_' + Math.random();
        div.id = divID;
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        // div.innerHTML = this._msg();
        setTimeout(function () {
          var section = _reactDom2.default.render(_this2._msg(), document.getElementById(divID));
          div.appendChild(section);
        }, 0);
        this.map.getPanes().labelPane.appendChild(div);
        return div;
      };
      MsgShow.prototype.draw = function () {
        var pixel = this.map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x + 'px';
        this._div.style.top = pixel.y + 'px';
      };
      return function () {
        var opts = {
          position: point,
          offset: new BMap.Size(-50, -50)
        };
        if (typeof msg === 'string') {
          labelMask.label = new BMap.Label(msg, opts);
          labelMask.label.setStyle({
            color: 'black',
            borderColor: '#FFFFFF',
            textAlign: 'center',
            fontSize: '12px',
            height: '30px',
            width: '100px',
            lineHeight: '30px',
            borderRadius: '15px',
            fontFamily: '微软雅黑',
            boxShadow: '5px 5px 5px gray'
          });
          map.addOverlay(labelMask.label);
        } else if (typeof msg === 'function') {
          labelMask.label = new MsgShow(point, msg, map);
          map.addOverlay(labelMask.label);
        }
      };
    }
  }, {
    key: 'removeMessage',
    value: function removeMessage(map, labelMask) {
      return function () {
        map.removeOverlay(labelMask.label);
      };
    }
  }, {
    key: 'mapload',
    value: function mapload() {
      var _this3 = this;

      var _props = this.props,
          centerPoint = _props.centerPoint,
          points = _props.points,
          _props$initZoom = _props.initZoom,
          initZoom = _props$initZoom === undefined ? 5 : _props$initZoom,
          superProps = _objectWithoutProperties(_props, ['centerPoint', 'points', 'initZoom']);

      var initControl = this.initMapControl;
      var BMap = window.BMap;
      var map = new BMap.Map('map' + random);
      initControl(map, superProps);
      map.clearOverlays();

      var center = new BMap.Point(centerPoint && centerPoint.lng || points[0].location.lng, centerPoint && centerPoint.lat || points[0].location.lat);
      map.centerAndZoom(center, initZoom);

      Array.isArray(points) && points.length > 0 && points.forEach(function (val) {
        var point = new BMap.Point(val.location.lng, val.location.lat);
        if (!val.icon) {
          var Circle = function Circle(point, color, radius, map) {
            this.map = map;
            this._point = point;
            this._color = color;
            this._radius = radius;
          };

          Circle.prototype = new BMap.Overlay();
          Circle.prototype.initialize = function () {
            var div = this._div = document.createElement("div");
            div.style.position = "absolute";
            div.style.borderRadius = "50%";
            div.style.width = this._radius + 'px';
            div.style.height = this._radius + 'px';
            div.style.background = this._color;
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            this.map.getPanes().labelPane.appendChild(div);
            return div;
          };
          Circle.prototype.draw = function () {
            var pixel = this.map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - this._radius / 2 + 'px';
            this._div.style.top = pixel.y - this._radius / 2 + 'px';
          };
          var circle = new Circle(point, val.color || 'red', val.radius || 12, map);
          map.addOverlay(circle);
          var labelMask = {};
          circle._div.addEventListener('mouseover', _this3.showMessage(val.name, point, map, labelMask));
          circle._div.addEventListener('mouseout', _this3.removeMessage(map, labelMask));
        } else {
          if (!val.icon.size) {
            console.log('请输入图片大小！');
          } else {
            var myIcon = new BMap.Icon(val.icon.url, new BMap.Size(val.icon.size.width, val.icon.size.height), val.icon.offsetSize && { imageOffset: new BMap.Size(val.icon.offsetSize.width, val.icon.offsetSize.height) });
            myIcon.imageSize = new BMap.Size(val.icon.size.width, val.icon.size.height);
            var marker = new BMap.Marker(point, { icon: myIcon });
            var _labelMask = {};
            marker.addEventListener('mouseover', _this3.showMessage(val.name, point, map, _labelMask));
            marker.addEventListener('mouseout', _this3.removeMessage(map, _labelMask));
            map.addOverlay(marker);
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$style = this.props.style,
          style = _props$style === undefined ? {} : _props$style;

      return _react2.default.createElement('div', { id: 'map' + random, style: _extends({ height: '100%', width: '100%' }, style) });
    }
  }]);

  return BaiduMapPoint;
}(_BaiduMapControlBase3.default);

BaiduMapPoint.propTypes = {
  style: _propTypes2.default.object,
  centerPoint: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired
  }),
  // disableDragging: PropTypes.bool,
  points: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    location: _propTypes2.default.shape({
      lat: _propTypes2.default.number.isRequired,
      lng: _propTypes2.default.number.isRequired
    }).isRequired,
    icon: _propTypes2.default.shape({
      url: _propTypes2.default.string.isRequired,
      size: _propTypes2.default.shape({
        width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
        height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
      }),
      offsetSize: _propTypes2.default.shape({
        width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
        height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
      })
    }),
    radius: _propTypes2.default.number
  })).isRequired,
  initZoom: _propTypes2.default.number
};

exports.default = BaiduMapPoint;