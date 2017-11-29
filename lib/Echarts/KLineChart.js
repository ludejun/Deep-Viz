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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KLineChart = function (_Basic) {
  _inherits(KLineChart, _Basic);

  function KLineChart() {
    _classCallCheck(this, KLineChart);

    return _possibleConstructorReturn(this, (KLineChart.__proto__ || Object.getPrototypeOf(KLineChart)).apply(this, arguments));
  }

  _createClass(KLineChart, [{
    key: 'getOption',
    value: function getOption(props) {
      var color = props.color,
          config = props.config,
          onTooltipFormat = props.onTooltipFormat;

      var option = {
        color: color || this.color,
        legend: {
          data: [],
          inactiveColor: '#777',
          textStyle: { color: this.fontColor, fontSize: this.fontSize }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // animation: false,
            type: 'cross'
          }
        },
        axisPointer: {
          link: { xAxisIndex: 'all' }
        },
        // visualMap: {
        //     show: false,
        //     seriesIndex: 0,
        //     dimension: 2,
        //     pieces: [{
        //         value: 1,
        //         color: '#ec0000',
        //     }, {
        //         value: -1,
        //         color: '#00da3c',
        //     }]
        // },
        grid: [],
        xAxis: [],
        yAxis: [],
        toolbox: {
          show: !!config.toolbox,
          itemSize: this.fontSize,
          iconStyle: {
            normal: { borderColor: this.fontColor },
            emphasis: { borderColor: this.emphasisColor }
          },
          feature: {
            dataZoom: {},
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          },
          right: 15,
          top: 0
        },
        dataZoom: [],
        series: []
      };
      if (config.title) {
        option.title = {
          text: config.title,
          subtext: config.subtitle,
          textStyle: { color: this.titleColor, fontSize: this.titleSize }
        };
        option.legend.right = 10;
      }

      if (config.bar) {
        option.series.push({
          name: config.bar.name || '',
          type: config.bar.type || 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: config.bar.data
        });
        option.visualMap = {
          show: false,
          seriesIndex: 0,
          dimension: 2,
          pieces: [{
            value: 1,
            color: '#ec0000'
          }, {
            value: -1,
            color: '#00da3c'
          }]
        };
        option.grid = [{
          left: config.grid && config.grid.left || 80,
          right: config.grid && config.grid.right || 0,
          top: config.grid && config.grid.top || 60,
          bottom: config.grid && config.grid.bottom || 10,
          height: config.grid && config.grid.height || 230,
          borderColor: this.gridColor,
          containLabel: true
        }, {
          left: config.grid && config.grid.barLeft || 80,
          right: config.grid && config.grid.barRight || 0,
          top: config.grid && config.grid.barTop || 340,
          bottom: config.grid && config.grid.barBottom || 10,
          height: config.grid && config.grid.barHeight || 80,
          borderColor: this.gridColor,
          containLabel: true
        }];

        option.xAxis = [{
          type: 'category',
          data: config.x.data,
          name: config.x.name,
          axisLine: { lineStyle: { color: '#8392A5' } }
        }, {
          type: 'category',
          data: config.x.data,
          name: config.x.name,
          gridIndex: 1,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false }
        }];

        option.yAxis = [{
          name: config.y.name || null,
          scale: true,
          splitArea: {
            show: true
          },
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: false }
        }, {
          name: config.y.name || null,
          gridIndex: 1,
          scale: true,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        }];
      } else {
        option.grid = {
          left: config.grid && config.grid.left || 80,
          right: config.grid && config.grid.right || 0,
          top: config.grid && config.grid.top || 60,
          bottom: config.grid && config.grid.bottom || 10,
          height: config.grid && config.grid.barHeight || 330,
          borderColor: this.gridColor,
          containLabel: true
        };
        option.xAxis = {
          type: 'category',
          data: config.x.data,
          name: config.x.name,
          axisLine: { lineStyle: { color: '#8392A5' } }
        };
        option.yAxis = {
          name: config.y.name || null,
          scale: true,
          splitArea: {
            show: true
          },
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: false }
        };
      }

      config.y.forEach(function (v) {
        v.data.forEach(function (item, index) {
          option.legend.data.push(v.legend[index]);
          option.series.push({
            name: v.legend[index],
            type: v.type[index],
            data: item
          });
        });
      });

      if (config.bar) {
        option.series[1].itemStyle = {
          normal: {
            color: '#00da3c',
            color0: '#ec0000'
          }
        };
      } else {
        option.series[0].itemStyle = {
          normal: {
            color: '#00da3c',
            color0: '#ec0000'
          }
        };
      }

      if (onTooltipFormat) {
        option.tooltip.formatter = function (params) {
          return onTooltipFormat(params);
        };
      }
      if (config.dataZoom) {
        option.dataZoom.push([{
          textStyle: {
            color: '#8392A5'
          },
          xAxisIndex: [0, 1],
          start: config.dataZoom.start || 30,
          end: config.dataZoom.end || 80,
          type: 'inside'
        }, {
          type: 'slider',
          xAxisIndex: [0, 1],
          show: true,
          start: config.dataZoom.start || 30,
          end: config.dataZoom.end || 80
        }]);
      }
      return option;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_echartsForReact2.default, {
        option: this.getOption(this.props),
        style: this.props.style || { height: 450, width: '100%' },
        notMerge: true,
        lazyUpdate: false,
        onEvents: this.props.onEvents
      });
    }
  }]);

  return KLineChart;
}(_Basic3.default);

exports.default = KLineChart;


KLineChart.propTypes = {
  color: _propTypes2.default.array,
  config: _propTypes2.default.shape({
    x: _propTypes2.default.object.isRequired,
    y: _propTypes2.default.array.isRequired,
    bar: _propTypes2.default.object.isRequired,
    title: _propTypes2.default.string,
    subtitle: _propTypes2.default.string,
    dataZoom: _propTypes2.default.object,
    grid: _propTypes2.default.object,
    toolbox: _propTypes2.default.bool
  }).isRequired,
  style: _propTypes2.default.object,
  onTooltipFormat: _propTypes2.default.func,
  onEvents: _propTypes2.default.object
};