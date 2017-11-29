'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _echartsForReact = require('echarts-for-react');

var _echartsForReact2 = _interopRequireDefault(_echartsForReact);

var _Basic2 = require('./Basic');

var _Basic3 = _interopRequireDefault(_Basic2);

require('../assets/echarts/map/china');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by wxl on 2017/10/23.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MapScatter = function (_Basic) {
  _inherits(MapScatter, _Basic);

  function MapScatter() {
    _classCallCheck(this, MapScatter);

    return _possibleConstructorReturn(this, (MapScatter.__proto__ || Object.getPrototypeOf(MapScatter)).apply(this, arguments));
  }

  _createClass(MapScatter, [{
    key: 'getOption',
    value: function getOption(props) {
      var dataConfig = props.dataConfig,
          mapConfig = props.mapConfig,
          geoCoordMap = props.geoCoordMap,
          onTooltipFormat = props.onTooltipFormat;

      function caculateCha(val) {
        var arr = [];
        val.forEach(function (item) {
          var allVal = [];
          item.data.forEach(function (item1) {
            allVal.push(item1.value);
          });
          var max = Math.max.apply(Math, allVal);
          var min = Math.min.apply(Math, allVal);
          var step = max - min;
          arr.push(step);
        });
        return arr;
      }
      function convertData(data1) {
        var res = [];
        for (var i = 0; i < data1.length; i++) {
          var geoCoord = geoCoordMap[data1[i].name];
          if (geoCoord) {
            res.push({
              name: data1[i].name,
              value: geoCoord.concat(data1[i].value)
            });
          }
        }
        return res;
      }

      var option = {
        // backgroundColor: mapConfig.backgroundColor || '#fff',
        tooltip: {
          enterable: true,
          trigger: 'item'
          // formatter(params) {
          //   return `${params.seriesName}<br>${params.name} : ${params.value[2]}`;
          // },
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: [],
          textStyle: {
            color: this.fontColor
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: mapConfig && mapConfig.areaColor ? mapConfig.areaColor : '#f3f3f3',
              borderColor: mapConfig && mapConfig.borderColor ? mapConfig.borderColor : '#C0B796',
              borderWidth: mapConfig && mapConfig.borderWidth ? mapConfig.borderWidth : 1
            },
            emphasis: {
              areaColor: mapConfig && mapConfig.hoverColor ? mapConfig.hoverColor : 'rgba(243,243,243,.5)'
            }
          }
        },
        series: []
      };
      if (onTooltipFormat) {
        option.tooltip.formatter = function (params) {
          return onTooltipFormat(params);
        };
      }
      if (dataConfig.title) {
        option.title = {
          text: dataConfig.title.text,
          subtext: dataConfig.title.subtext,
          textStyle: { color: this.titleColor, fontSize: this.titleSize }
        };
      }
      dataConfig.options.forEach(function (item, i) {
        option.legend.data.push(item.name);
        option.series.push({
          name: item.name,
          type: item.type,
          coordinateSystem: 'geo',
          // showEffectOn: 'emphasis',
          data: convertData(item.data),
          // showEffectOn: 'emphasis',
          rippleEffect: {
            brushType: 'stroke'
          },
          symbol: item.symbol,
          symbolSize: function symbolSize(val) {
            var newSca = val[2] * 7 / caculateCha(dataConfig.options)[i];
            return newSca > 15 ? 15 : newSca < 8 ? 8 : newSca;
          },

          itemStyle: {
            normal: {
              color: item.color
            },
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        });
      });
      return option;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_echartsForReact2.default, {
        option: this.getOption(this.props),
        notMerge: true,
        lazyUpdate: false,
        style: this.props.style || { height: 250, width: '100%' },
        onEvents: this.props.onEvents
      });
    }
  }]);

  return MapScatter;
}(_Basic3.default);

exports.default = MapScatter;

MapScatter.propTypes = {
  title: _propTypes2.default.object,
  geoCoordMap: _propTypes2.default.object,
  mapConfig: _propTypes2.default.shape({
    areaColor: _propTypes2.default.string,
    hoverColor: _propTypes2.default.string,
    borderWidth: _propTypes2.default.number,
    borderColor: _propTypes2.default.string
  }),
  dataConfig: _propTypes2.default.shape({
    name: _propTypes2.default.string,
    symbol: _propTypes2.default.string,
    color: _propTypes2.default.string,
    data: _propTypes2.default.array
  }).isRequired,
  style: _propTypes2.default.object,
  onTooltipFormat: _propTypes2.default.func,
  onEvents: _propTypes2.default.object
};