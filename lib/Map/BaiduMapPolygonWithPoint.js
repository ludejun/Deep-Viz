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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */


// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
var random = Math.random();
var messageLabelMask = {};

var BaiduMapPolygonWithPoint = function (_BaiduMapControlBase) {
  _inherits(BaiduMapPolygonWithPoint, _BaiduMapControlBase);

  function BaiduMapPolygonWithPoint() {
    _classCallCheck(this, BaiduMapPolygonWithPoint);

    return _possibleConstructorReturn(this, (BaiduMapPolygonWithPoint.__proto__ || Object.getPrototypeOf(BaiduMapPolygonWithPoint)).apply(this, arguments));
  }

  _createClass(BaiduMapPolygonWithPoint, [{
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

        console.log('initialize');
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
          _props$circleColor = _props.circleColor,
          circleColor = _props$circleColor === undefined ? '#108EE9' : _props$circleColor,
          _props$labelColor = _props.labelColor,
          labelColor = _props$labelColor === undefined ? '#FFFFFF' : _props$labelColor,
          datas = _props.datas,
          points = _props.points,
          outsideLabel = _props.outsideLabel,
          _props$zoomBias = _props.zoomBias,
          zoomBias = _props$zoomBias === undefined ? 1 : _props$zoomBias,
          superProps = _objectWithoutProperties(_props, ['point', 'circleColor', 'labelColor', 'datas', 'points', 'outsideLabel', 'zoomBias']);

      var BMap = window.BMap;
      var map = new BMap.Map('map' + random);
      var center = new BMap.Point(point.lng, point.lat);

      this.initMapControl(map, superProps);

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

      Array.isArray(points) && points.length > 0 && points.forEach(function (val) {
        var curPoint = new BMap.Point(val.location.lng, val.location.lat);
        if (!val.icon) {
          var Circle = function Circle(tpoint, color, radius, tmap) {
            this.map = tmap;
            this._point = tpoint;
            this._color = color;
            this._radius = radius;
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

  return BaiduMapPolygonWithPoint;
}(_BaiduMapControlBase3.default);

BaiduMapPolygonWithPoint.propTypes = {
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
  zoomBias: _propTypes2.default.number,
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

exports.default = BaiduMapPolygonWithPoint;