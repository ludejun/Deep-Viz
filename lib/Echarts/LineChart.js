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

var LineChart = function (_Basic) {
  _inherits(LineChart, _Basic);

  function LineChart() {
    _classCallCheck(this, LineChart);

    return _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).apply(this, arguments));
  }

  _createClass(LineChart, [{
    key: 'getOption',
    value: function getOption(props) {
      var _this2 = this;

      var color = props.color,
          config = props.config,
          onTooltipFormat = props.onTooltipFormat;

      var option = {
        color: color || this.color,
        tooltip: {
          trigger: 'axis',
          enterable: true
        },
        grid: {
          show: false,
          left: config.grid && config.grid.left || 10,
          right: config.grid && config.grid.right || 0,
          top: config.grid && config.grid.top || 30,
          bottom: config.grid && config.grid.bottom || 10,
          borderColor: this.gridColor,
          containLabel: true
        },
        legend: {
          show: config.isLegendShow !== false,
          data: [],
          textStyle: { color: this.fontColor, fontSize: this.fontSize }
        },
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
        xAxis: {
          show: config.x.isXAxisShow !== false,
          type: 'category',
          boundaryGap: false,
          data: config.x.data,
          name: config.x.name,
          nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
          axisLabel: {
            textStyle: { color: this.fontColor, fontSize: this.fontSize },
            rotate: config.x.rotate || 0,
            interval: config.x.showAll ? 0 : 'auto'
          }
        },
        yAxis: [],
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

      config.y.forEach(function (yItem, yIndex) {
        yItem.data.forEach(function (item, index) {
          option.legend.data.push(yItem.legend[index]);
          option.series.push({
            name: yItem.legend[index],
            type: 'line',
            smooth: !!yItem.smooth,
            yAxisIndex: yIndex < 1 ? 0 : 1,
            data: item,
            stack: yItem.stack || null,
            areaStyle: yItem.areaStyle ? yItem.areaStyle[index] : null,
            lineStyle: yItem.lineStyle ? yItem.lineStyle[index] : null
          });
        });
        option.yAxis.push({
          show: yItem.isYAxisShow !== false,
          type: 'value',
          min: yItem.min,
          max: yItem.max,
          name: yItem.name || null,
          nameTextStyle: { color: _this2.fontColor, fontSize: _this2.fontSize },
          splitLine: { show: !!yItem.splitLine, lineStyle: { type: 'dotted' } },
          nameGap: 12,
          axisLabel: {
            formatter: '{value}',
            textStyle: { color: _this2.fontColor, fontSize: _this2.fontSize }
          }
        });
      });
      if (onTooltipFormat) {
        option.tooltip.formatter = function (params) {
          return onTooltipFormat(params);
        };
      }
      if (config.dataZoom) {
        option.dataZoom = [{
          show: true,
          realtime: true,
          start: config.dataZoom.start || 30,
          end: config.dataZoom.end || 100
        }];
      }

      return option;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_echartsForReact2.default, {
        option: this.getOption(this.props),
        style: this.props.style || { height: 250, width: '100%' },
        notMerge: true,
        lazyUpdate: false,
        onEvents: this.props.onEvents
      });
    }
  }]);

  return LineChart;
}(_Basic3.default);

exports.default = LineChart;


LineChart.propTypes = {
  color: _propTypes2.default.array,
  config: _propTypes2.default.shape({
    x: _propTypes2.default.object.isRequired,
    y: _propTypes2.default.array.isRequired,
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