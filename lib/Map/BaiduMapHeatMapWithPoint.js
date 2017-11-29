'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _BaiduMapControlBase2 = require('./BaiduMapControlBase');

var _BaiduMapControlBase3 = _interopRequireDefault(_BaiduMapControlBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */


// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
var disZoomMap = [[50, 18], [100, 17], [200, 16], [500, 15], [1000, 14], [2000, 13], [5000, 12], [10000, 11], [20000, 10], [25000, 9], [50000, 8], [100000, 7], [200000, 6], [500000, 5], [1000000, 4], [2000000, 3]];
var random = Math.random();
var messageLabelMask = {};

var BaiduMapHeatMapWithPoint = function (_BaiduMapControlBase) {
  _inherits(BaiduMapHeatMapWithPoint, _BaiduMapControlBase);

  function BaiduMapHeatMapWithPoint() {
    _classCallCheck(this, BaiduMapHeatMapWithPoint);

    return _possibleConstructorReturn(this, (BaiduMapHeatMapWithPoint.__proto__ || Object.getPrototypeOf(BaiduMapHeatMapWithPoint)).apply(this, arguments));
  }

  _createClass(BaiduMapHeatMapWithPoint, [{
    key: 'showMessage',
    value: function showMessage(msg, point, map) {
      if (!msg) {
        return;
      }
      function MsgShow(mpoint, mmsg, mmap) {
        this._point = mpoint;
        this._msg = mmsg;
        this.map = mmap;
      }
      MsgShow.prototype = new window.BMap.Overlay();
      MsgShow.prototype.initialize = function () {
        var _this2 = this;

        var div = this._div = document.createElement('div');
        div.style.position = 'absolute';
        var divID = 'map_tooltip_' + Math.random();
        div.id = divID;
        div.style.zIndex = window.BMap.Overlay.getZIndex(this._point.lat);
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
          offset: new window.BMap.Size(-50, -50)
        };
        if (typeof msg === 'string') {
          if (messageLabelMask) {
            messageLabelMask.label = new window.BMap.Label(msg, opts);
            messageLabelMask.label.setStyle({
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
            map.addOverlay(messageLabelMask.label);
          }
        } else if (typeof msg === 'function') {
          if (messageLabelMask) {
            messageLabelMask.label = new MsgShow(point, msg, map);
            map.addOverlay(messageLabelMask.label);
          }
        }
      };
    }
  }, {
    key: 'removeMessage',
    value: function removeMessage(map) {
      return function () {
        map.removeOverlay(messageLabelMask.label);
      };
    }
  }, {
    key: 'mapLoad',
    value: function mapLoad() {
      var _this3 = this;

      var _props = this.props,
          point = _props.point,
          datas = _props.datas,
          points = _props.points,
          _props$radius = _props.radius,
          radius = _props$radius === undefined ? 20 : _props$radius,
          _props$opacity = _props.opacity,
          opacity = _props$opacity === undefined ? 0 : _props$opacity,
          _props$gradient = _props.gradient,
          gradient = _props$gradient === undefined ? {
        0.45: 'rgb(0,0,255)',
        0.55: 'rgb(0,255,255)',
        0.65: 'rgb(0,255,0)',
        0.95: 'yellow',
        1.0: 'rgb(255,0,0)'
      } : _props$gradient,
          superProps = _objectWithoutProperties(_props, ['point', 'datas', 'points', 'radius', 'opacity', 'gradient']);

      var BMap = window.BMap;
      var map = new BMap.Map('map' + random);
      var center = void 0;
      if (!point) {
        if (datas.length === 1) {
          center = new BMap.Point(datas[0].lng, datas[0].lat);
          map.centerAndZoom(center, 13);
        } else {
          // 计算最佳中心点和设置初始比例尺
          var distance = 0;
          var centerLng = void 0;
          var centerLat = void 0;
          for (var i = 0; i < datas.length - 1; i++) {
            for (var j = i; j < datas.length; j++) {
              var newDis = map.getDistance(new BMap.Point(datas[i].lng, datas[i].lat), new BMap.Point(datas[j].lng, datas[j].lat));
              if (newDis > distance) {
                centerLng = (datas[i].lng + datas[j].lng) / 2;
                centerLat = (datas[i].lat + datas[j].lat) / 2;
                distance = newDis;
              }
            }
          }
          center = new BMap.Point(centerLng, centerLat);
          var tempFilter = disZoomMap.filter(function (item) {
            return item[0] > distance;
          });
          if (tempFilter.length > 1) {
            map.centerAndZoom(center, tempFilter[0][1] > 16 ? 18 : tempFilter[0][1] + 2);
          }
        }
      } else {
        center = new BMap.Point(point.lng, point.lat);
        map.centerAndZoom(center, 13);
      }
      this.initMapControl(map, superProps);
      map.clearOverlays();
      var script2 = document.createElement('script');
      script2.async = true;
      script2.type = 'text/javascript';
      script2.src = 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js';
      document.head.appendChild(script2);
      script2.onload = function () {
        var heatmapOverlay = new window.BMapLib.HeatmapOverlay({ radius: radius, opacity: opacity, gradient: gradient });
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({ data: datas, max: 100 });
        heatmapOverlay.show();

        Array.isArray(points) && points.length > 0 && points.forEach(function (val) {
          var curPoint = new BMap.Point(val.location.lng, val.location.lat);
          if (!val.icon) {
            var Circle = function Circle(tpoint, color, cradius, tmap) {
              this.map = tmap;
              this._point = tpoint;
              this._color = color;
              this._radius = cradius;
            };

            Circle.prototype = new BMap.Overlay();
            Circle.prototype.initialize = function () {
              var div = _this3._div = document.createElement('div');
              div.style.position = 'absolute';
              div.style.borderRadius = '50%';
              div.style.width = _this3._radius + 'px';
              div.style.height = _this3._radius + 'px';
              div.style.background = _this3._color;
              div.style.zIndex = BMap.Overlay.getZIndex(_this3._point.lat);
              _this3.map.getPanes().labelPane.appendChild(div);
              return div;
            };
            Circle.prototype.draw = function () {
              var pixel = _this3.map.pointToOverlayPixel(_this3._point);
              _this3._div.style.left = pixel.x - _this3._radius / 2 + 'px';
              _this3._div.style.top = pixel.y - _this3._radius / 2 + 'px';
            };
            var circle = new Circle(curPoint, val.color || 'red', val.radius || 12, map);
            map.addOverlay(circle);
            circle._div.addEventListener('mouseover', _this3.showMessage(val.name, curPoint, map));
            circle._div.addEventListener('mouseout', _this3.removeMessage(map));
          } else if (!val.icon.size) {
            console.log('请输入图片大小！');
          } else {
            var myIcon = new BMap.Icon(val.icon.url, new BMap.Size(val.icon.size.width, val.icon.size.height), val.icon.offsetSize && {
              imageOffset: new BMap.Size(val.icon.offsetSize.width, val.icon.offsetSize.height)
            });
            myIcon.imageSize = new BMap.Size(val.icon.size.width, val.icon.size.height);
            var marker = new BMap.Marker(curPoint, { icon: myIcon });
            marker.addEventListener('mouseover', _this3.showMessage(val.name, curPoint, map));
            marker.addEventListener('mouseout', _this3.removeMessage(map));
            map.addOverlay(marker);
          }
        });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$style = this.props.style,
          style = _props$style === undefined ? {} : _props$style;

      window['mapload' + random.toString().substr(2)] = this.mapLoad.bind(this);
      if (typeof window.BMap === 'undefined') {
        loadScript();
      } else {
        setTimeout(this.mapLoad.bind(this), 0);
      }
      function loadScript() {
        var script = document.createElement('script');
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapload' + random.toString().substr(2);
        document.body.appendChild(script);
      }

      return _react2.default.createElement('div', { id: 'map' + random, style: _extends({ height: '100%', width: '100%' }, style) });
    }
  }]);

  return BaiduMapHeatMapWithPoint;
}(_BaiduMapControlBase3.default);

BaiduMapHeatMapWithPoint.propTypes = {
  style: _propTypes2.default.object,
  point: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired
  }),
  datas: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired,
    count: _propTypes2.default.number.isRequired
  })).isRequired,
  opacity: _propTypes2.default.number,
  radius: _propTypes2.default.number,
  gradient: _propTypes2.default.object,
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
  }))
};

exports.default = BaiduMapHeatMapWithPoint;