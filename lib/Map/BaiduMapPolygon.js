'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
var BaiduMapPolygon = function (_BaiduMapControlBase) {
  _inherits(BaiduMapPolygon, _BaiduMapControlBase);

  function BaiduMapPolygon() {
    _classCallCheck(this, BaiduMapPolygon);

    return _possibleConstructorReturn(this, (BaiduMapPolygon.__proto__ || Object.getPrototypeOf(BaiduMapPolygon)).apply(this, arguments));
  }

  _createClass(BaiduMapPolygon, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          point = _props.point,
          _props$circleColor = _props.circleColor,
          circleColor = _props$circleColor === undefined ? '#108EE9' : _props$circleColor,
          _props$labelColor = _props.labelColor,
          labelColor = _props$labelColor === undefined ? '#FFFFFF' : _props$labelColor,
          datas = _props.datas,
          outsideLabel = _props.outsideLabel,
          _props$zoomBias = _props.zoomBias,
          zoomBias = _props$zoomBias === undefined ? 1 : _props$zoomBias,
          superProps = _objectWithoutProperties(_props, ['style', 'point', 'circleColor', 'labelColor', 'datas', 'outsideLabel', 'zoomBias']);

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
        var center = new BMap.Point(point.lng, point.lat);

        initControl(map, superProps);

        map.clearOverlays();
        var circleStyle = {
          fillColor: circleColor,
          strokeColor: circleColor,
          strokeWeight: 1,
          strokeOpacity: 0.3,
          fillOpacity: 0.3
        };

        var circleCenter = new BMap.Circle(center, 80, {
          fillColor: circleColor,
          strokeColor: circleColor,
          strokeWeight: 1,
          strokeOpacity: 0.8,
          fillOpacity: 0.8
        });
        map.addOverlay(circleCenter);
        datas.sort(function (i, j) {
          return i.radius - j.radius > 0;
        });

        var maxRadius = datas[datas.length - 1].radius;
        var allZooms = [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000];
        var i = 0;
        for (; i < allZooms.length; i++) {
          if (allZooms[i] >= maxRadius) {
            break;
          }
        }
        i = i - 1 < 0 ? 0 : i - 1;
        map.centerAndZoom(center, 18 - i);
        map.setMinZoom(18 - zoomBias - i < 3 ? 3 : 18 - zoomBias - i);
        map.setMaxZoom(18 + zoomBias - i > 18 ? 18 : 18 + zoomBias - i);

        var circleOverlapList = datas.map(function (data) {
          var tempCircle = new BMap.Circle(center, data.radius * 1000, circleStyle);
          map.addOverlay(tempCircle);
          return tempCircle;
        });

        datas.map(function (data, index) {
          var startPoint = void 0;
          var midPoint = void 0;
          var endPoint = void 0;
          if (index === 0) {
            startPoint = center;
            midPoint = new BMap.Point(point.lng + 0.01, point.lat - 0.01);
            endPoint = new BMap.Point(point.lng + 0.06, point.lat - 0.01);
          } else {
            var currNorthEast = circleOverlapList[index].getBounds().getNorthEast();
            var prevNorthEast = circleOverlapList[index - 1].getBounds().getNorthEast();
            // 计算外部圆正东北点坐标((currLng-centerLng) * Math.sqrt(2) / 2)
            // centerLng 和 内部圆正东北点坐标((prevLng-centerLng) * Math.sqrt(2) / 2) +centerLat 的中心位置。
            startPoint = new BMap.Point((currNorthEast.lng - prevNorthEast.lng) * Math.sqrt(2) / 4 + (prevNorthEast.lng - center.lng) * Math.sqrt(2) / 2 + center.lng, (currNorthEast.lat - prevNorthEast.lat) * Math.sqrt(2) / 4 + (prevNorthEast.lat - center.lat) * Math.sqrt(2) / 2 + center.lat);
            midPoint = new BMap.Point(startPoint.lng + 0.005, startPoint.lat + 0.005);
            endPoint = new BMap.Point(startPoint.lng + 0.06, startPoint.lat + 0.005);
          }
          var polyline = new BMap.Polyline([startPoint, midPoint, endPoint], { strokeColor: labelColor, strokeWeight: 1 });
          map.addOverlay(polyline);
          if (data.label) {
            var labelStartPoint = new BMap.Circle(startPoint, 50, {
              fillColor: labelColor,
              strokeColor: labelColor,
              strokeWeight: 1,
              strokeOpacity: 1,
              fillOpacity: 1
            });
            var labelDom = void 0;
            if (typeof data.label === 'string') {
              labelDom = '' + data.label;
            } else if (_typeof(data.label) === 'object') {
              var dom = document.createElement('div');
              _reactDom2.default.render(data.label, dom);
              labelDom = '' + dom.innerHTML;
            }

            var label = new BMap.Label('<div style="position: absolute; bottom: 0">' + labelDom + '</div>', {
              position: midPoint,
              offset: new BMap.Size(5, 0)
            });
            label.setStyle({ border: '0', backgroundColor: null, color: labelColor });
            map.addOverlay(labelStartPoint);
            map.addOverlay(label);
          }
          return '';
        });

        if (outsideLabel) {
          var maxCircle = circleOverlapList[circleOverlapList.length - 1];
          var northEastPoint = maxCircle.getBounds().getNorthEast();
          var southEastPoint = new BMap.Point(northEastPoint.lng, point.lat * 2 - northEastPoint.lat);
          var outsideStartPoint = new BMap.Point((southEastPoint.lng - point.lng) * Math.sqrt(2) / 4 + point.lng / 2 + southEastPoint.lng / 2, (southEastPoint.lat - point.lat) * Math.sqrt(2) / 4 + point.lat / 2 + southEastPoint.lat / 2);
          var outsideMidPoint = outsideStartPoint;
          var outsideEndPoint = new BMap.Point(outsideStartPoint.lng + 0.05, outsideStartPoint.lat);
          var polyline = new BMap.Polyline([outsideStartPoint, outsideMidPoint, outsideEndPoint], { strokeColor: labelColor, strokeWeight: 1 });
          map.addOverlay(polyline);
          var outsideLabelStartPoint = new BMap.Circle(outsideStartPoint, 50, {
            fillColor: labelColor,
            strokeColor: labelColor,
            strokeWeight: 1,
            strokeOpacity: 1,
            fillOpacity: 1
          });
          var outsideLabelDom = void 0;
          if (typeof outsideLabel === 'string') {
            outsideLabelDom = '' + outsideLabel;
          } else if ((typeof outsideLabel === 'undefined' ? 'undefined' : _typeof(outsideLabel)) === 'object') {
            var tempDom = document.createElement('div');
            _reactDom2.default.render(outsideLabel, tempDom);
            outsideLabelDom = '' + tempDom.innerHTML;
          }

          var outsideMapLabel = new BMap.Label('<div style="position: absolute; bottom: 0">' + outsideLabelDom + '</div>', {
            position: outsideMidPoint,
            offset: new BMap.Size(5, 0)
          });
          outsideMapLabel.setStyle({ border: '0', backgroundColor: null, color: labelColor });
          map.addOverlay(outsideLabelStartPoint);
          map.addOverlay(outsideMapLabel);
        }
      }

      return _react2.default.createElement('div', { id: 'map' + random, style: _extends({ height: '100%', width: '100%' }, style) });
    }
  }]);

  return BaiduMapPolygon;
}(_BaiduMapControlBase3.default);

BaiduMapPolygon.propTypes = {
  style: _propTypes2.default.object,
  point: _propTypes2.default.object.isRequired,
  disableDragging: _propTypes2.default.bool,
  circleColor: _propTypes2.default.string,
  labelColor: _propTypes2.default.string,
  datas: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    radius: _propTypes2.default.number.isRequired,
    label: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]).isRequired
  })).isRequired,
  outsideLabel: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
  zoomBias: _propTypes2.default.number
};

exports.default = BaiduMapPolygon;