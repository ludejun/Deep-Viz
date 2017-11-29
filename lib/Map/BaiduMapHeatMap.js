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

var _BaiduMapControlBase2 = require('./BaiduMapControlBase');

var _BaiduMapControlBase3 = _interopRequireDefault(_BaiduMapControlBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
var disZoomMap = [[50, 18], [100, 17], [200, 16], [500, 15], [1000, 14], [2000, 13], [5000, 12], [10000, 11], [20000, 10], [25000, 9], [50000, 8], [100000, 7], [200000, 6], [500000, 5], [1000000, 4], [2000000, 3]];

var BaiduMapHeatMap = function (_BaiduMapControlBase) {
  _inherits(BaiduMapHeatMap, _BaiduMapControlBase);

  function BaiduMapHeatMap() {
    _classCallCheck(this, BaiduMapHeatMap);

    return _possibleConstructorReturn(this, (BaiduMapHeatMap.__proto__ || Object.getPrototypeOf(BaiduMapHeatMap)).apply(this, arguments));
  }

  _createClass(BaiduMapHeatMap, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          point = _props.point,
          datas = _props.datas,
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
          superProps = _objectWithoutProperties(_props, ['style', 'point', 'datas', 'radius', 'opacity', 'gradient']);

      var initControl = this.initMapControl;
      var random = Math.random();
      window['mapload' + random.toString().substr(2)] = mapLoad;
      if (typeof window.BMap === 'undefined') {
        loadScript();
      } else {
        setTimeout(mapLoad, 0);
      }
      function loadScript() {
        var script = document.createElement('script');
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapload' + random.toString().substr(2);
        document.body.appendChild(script);
      }

      function mapLoad() {
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
        initControl(map, superProps);
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
        };
      }

      return _react2.default.createElement('div', { id: 'map' + random, style: _extends({ height: '100%', width: '100%' }, style) });
    }
  }]);

  return BaiduMapHeatMap;
}(_BaiduMapControlBase3.default);

BaiduMapHeatMap.propTypes = {
  style: _propTypes2.default.object,
  point: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired
  }),
  // disableDragging: PropTypes.bool,
  datas: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired,
    count: _propTypes2.default.number.isRequired
  })).isRequired,
  opacity: _propTypes2.default.number,
  radius: _propTypes2.default.number,
  gradient: _propTypes2.default.object
};

exports.default = BaiduMapHeatMap;