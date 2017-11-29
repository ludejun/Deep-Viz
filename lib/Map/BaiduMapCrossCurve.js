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

var _echarts = require('echarts');

var _echarts2 = _interopRequireDefault(_echarts);

require('echarts/extension/bmap/bmap');

var _BaiduMapControlBase2 = require('./BaiduMapControlBase');

var _BaiduMapControlBase3 = _interopRequireDefault(_BaiduMapControlBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
var disZoomMap = [[50, 18], [100, 17], [200, 16], [500, 15], [1000, 14], [2000, 13], [5000, 12], [10000, 11], [20000, 10], [25000, 9], [50000, 8], [100000, 7], [200000, 6], [500000, 5], [1000000, 4], [2000000, 3]];

var random = Math.random();

var BaiduMapCrossCurve = function (_BaiduMapControlBase) {
  _inherits(BaiduMapCrossCurve, _BaiduMapControlBase);

  function BaiduMapCrossCurve(props) {
    _classCallCheck(this, BaiduMapCrossCurve);

    var _this = _possibleConstructorReturn(this, (BaiduMapCrossCurve.__proto__ || Object.getPrototypeOf(BaiduMapCrossCurve)).call(this, props));

    _this.color = props.colors || ['#FDB933', '#D64F44', '#00A6AC', '#1D953F', '#E0861A', '#45B97C', '#F3715C', '#F26522', '#7FB80E', '#63C5FA'];
    _this.symbol = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'];
    _this.EMap = null;
    _this.myChart = null;
    _this.customOverlays = [];
    return _this;
  }

  _createClass(BaiduMapCrossCurve, [{
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.mapload(nextProps);
    }
  }, {
    key: 'loadScript',
    value: function loadScript() {
      var script = document.createElement('script');
      script.src = 'http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapload' + random.toString().substr(2);
      document.body.appendChild(script);
    }
  }, {
    key: 'mapload',
    value: function mapload(nextProps) {
      var _this2 = this;

      var currentProps = this.props;
      if (nextProps) {
        if (nextProps.point === this.props.point && nextProps.datas === this.props.datas && nextProps.direction === this.props.direction) {
          return;
        } else {
          currentProps = nextProps;
        }
      }
      var _currentProps = currentProps,
          direction = _currentProps.direction,
          datas = _currentProps.datas,
          point = _currentProps.point,
          tooltipFormat = _currentProps.tooltipFormat,
          labelFormat = _currentProps.labelFormat,
          _currentProps$radiusC = _currentProps.radiusColor,
          radiusColor = _currentProps$radiusC === undefined ? '#4990E2' : _currentProps$radiusC;

      if (this.EMap && this.customOverlays.length > 0) {
        this.customOverlays.forEach(function (overlay) {
          _this2.EMap.removeOverlay(overlay);
        });
        this.customOverlays = [];
      }
      var planePath = this.symbol[6];
      var color = this.color;
      if (!this.myChart) {
        this.myChart = _echarts2.default.init(document.getElementById('map' + random));
      }
      var bmap = {
        roam: false
      };
      var arrayCenter = [];
      arrayCenter.push(point.lng, point.lat, 100);
      var centerPoint = {
        name: point.name,
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        zlevel: 2,
        tooltip: {
          position: 'right',
          formatter: '{b}'
        },
        rippleEffect: {
          brushType: 'stroke',
          scale: 3
        },
        symbolSize: 15,
        showEffectOn: 'render',
        data: [{
          name: point.name,
          value: arrayCenter
        }]
      };
      var totalValue = 0;
      datas.forEach(function (item) {
        totalValue += item.value || 0;
      });
      var toPoints = {
        name: point.name,
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke',
          scale: 3
        },
        tooltip: {
          position: 'right',
          formatter: tooltipFormat || null
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: labelFormat || null
          }
        },
        symbolSize: function symbolSize(val) {
          return val[2] && totalValue > 0 ? parseInt(val[2] / totalValue * 100, 10) / 4 : 10;
        },
        showEffectOn: 'render',
        itemStyle: {
          normal: {}
        },
        data: datas.map(function (dataItem, index) {
          var valeArray = [];
          valeArray.push(dataItem.lng, dataItem.lat, dataItem.value || null);
          return {
            name: dataItem.name,
            value: valeArray,
            itemStyle: {
              normal: {
                color: dataItem.color || color[index]
              }
            }
          };
        })
      };
      var arrayFrom = [];
      arrayFrom.push(point.lng, point.lat);
      var data = datas.map(function (item, i) {
        var itemArray = [];
        itemArray.push(item.lng, item.lat);
        return {
          fromName: direction === 'in' ? item.name : point.name,
          toName: direction === 'in' ? point.name : item.name,
          name: item.name,
          coords: direction === 'in' ? [itemArray, arrayFrom] : [arrayFrom, itemArray],
          lineStyle: {
            normal: {
              color: item.color || color[i]
            }
          }
        };
      });

      var lines = {
        type: 'lines',
        coordinateSystem: 'bmap',
        zlevel: 2,
        effect: {
          show: true,
          period: 2,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 8
        },
        lineStyle: {
          normal: {
            width: 3,
            opacity: 0.7,
            curveness: 0.2
          }
        },
        data: data
      };

      var series = [];
      series.push(centerPoint, toPoints, lines);

      var option = {
        bmap: bmap,
        tooltip: {
          trigger: 'item'
        },
        series: series,
        color: ['#108EE9']
      };
      this.myChart.setOption(option);
      this.EMap = this.myChart.getModel().getComponent('bmap').getBMap();
      var BMap = window.BMap;
      var topLeftNavigation = new BMap.NavigationControl();
      this.EMap.enableDragging();
      this.EMap.addControl(topLeftNavigation);
      var bmapPoint = new BMap.Point(point.lng, point.lat);
      var circle = this.props.radiusGradients || [];
      circle.forEach(function (item) {
        var bmapCircle = new BMap.Circle(bmapPoint, item, {
          fillColor: radiusColor,
          fillOpacity: 0.3,
          strokeOpacity: 0.3,
          strokeColor: radiusColor,
          strokeWeight: 1
        });
        _this2.EMap.addOverlay(bmapCircle);
        _this2.customOverlays.push(bmapCircle);
        var circleNorthEast = bmapCircle.getBounds().getNorthEast();
        var label = new BMap.Label(item / 1000 + 'km', {
          position: new BMap.Point(bmapPoint.lng, circleNorthEast.lat),
          offset: new BMap.Size(0, 0)
        });
        label.setStyle({
          color: '#fff',
          fontSize: '8px',
          border: 'none',
          backgroundColor: 'transparent'
        });
        _this2.EMap.addOverlay(label);
        _this2.customOverlays.push(label);
      });

      // 计算最佳中心点和设置初始比例尺
      var distance = 0;
      this.props.datas.forEach(function (item) {
        var newDis = _this2.EMap.getDistance(new BMap.Point(item.lng, item.lat), new BMap.Point(point.lng, point.lat));
        distance = newDis > distance ? newDis : distance;
      });
      var tempFilter = disZoomMap.filter(function (item) {
        return item[0] > distance;
      });
      this.EMap.centerAndZoom(new BMap.Point(point.lng, point.lat), tempFilter[0][1] > 16 ? 18 : tempFilter[0][1] + 2);
      this.initMapControl(this.EMap, currentProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$style = this.props.style,
          style = _props$style === undefined ? {} : _props$style;


      return _react2.default.createElement('div', { id: 'map' + random, style: _extends({ height: '100%', width: '100%' }, style) });
    }
  }]);

  return BaiduMapCrossCurve;
}(_BaiduMapControlBase3.default);

BaiduMapCrossCurve.propTypes = {
  style: _propTypes2.default.object,
  point: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired,
    name: _propTypes2.default.string
  }).isRequired,
  radiusGradients: _propTypes2.default.arrayOf(_propTypes2.default.number),
  radiusColor: _propTypes2.default.string,
  datas: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired,
    name: _propTypes2.default.string,
    value: _propTypes2.default.number,
    color: _propTypes2.default.string
  })).isRequired,
  direction: _propTypes2.default.string.isRequired,
  tooltipFormat: _propTypes2.default.func,
  labelFormat: _propTypes2.default.func
};

exports.default = BaiduMapCrossCurve;