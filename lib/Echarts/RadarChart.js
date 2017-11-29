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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by wimi on 17/9/28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RadarChart = function (_Basic) {
  _inherits(RadarChart, _Basic);

  function RadarChart() {
    _classCallCheck(this, RadarChart);

    return _possibleConstructorReturn(this, (RadarChart.__proto__ || Object.getPrototypeOf(RadarChart)).apply(this, arguments));
  }

  _createClass(RadarChart, [{
    key: 'getOption',
    value: function getOption(props) {
      var _tooltip;

      var config = props.config,
          onTooltipFormat = props.onTooltipFormat;

      var indicator = [];
      var data = [];
      !!config.values.length && config.indicator.forEach(function (val) {
        indicator.push({ text: val, max: config.max });
      });
      config.values.forEach(function (val) {
        data.push({ value: val, name: config.indicator });
      });
      var tooltip = (_tooltip = {
        show: config.formatter,
        trigger: 'item'
      }, _defineProperty(_tooltip, config.position ? 'position' : '', config.position || ''), _defineProperty(_tooltip, config.formatter ? 'formatter' : '', onTooltipFormat || ''), _tooltip);
      var legend = {
        x: 'right',
        data: ['']
      };
      var radar = {
        indicator: indicator,
        center: ['50%', '50%'],
        radius: config.radius,
        shape: 'polygon',
        nameGap: 15,
        splitNumber: 5
      };

      var series = [{
        type: 'radar',
        areaStyle: {
          normal: {
            opacity: config.opacity || 0.7,
            color: config.paddingColor || '#0080ff'
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        lineStyle: {
          normal: {
            color: config.lineColor || '#ffffff'
          }
        },
        itemStyle: {
          normal: {
            color: config.color || '#0080ff'
          }
        },
        data: data
      }];

      var grid = {
        show: false,
        left: config.grid && config.grid.left || 10,
        right: config.grid && config.grid.right || 0,
        top: config.grid && config.grid.top || 30,
        bottom: config.grid && config.grid.bottom || 10,
        borderColor: this.gridColor,
        containLabel: true
      };
      var toolbox = {
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
      };

      var textStyle = config.textStyle || { color: this.fontColor, fontSize: this.fontSize };
      var option = { tooltip: tooltip, legend: legend, radar: radar, series: series, textStyle: textStyle, grid: grid, toolbox: toolbox };

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

  return RadarChart;
}(_Basic3.default);

exports.default = RadarChart;


RadarChart.propTypes = {
  color: _propTypes2.default.array,
  config: _propTypes2.default.shape({
    indicator: _propTypes2.default.array.isRequired,
    values: _propTypes2.default.array.isRequired,
    max: _propTypes2.default.number.isRequired,
    name: _propTypes2.default.string,
    position: _propTypes2.default.string,
    radius: _propTypes2.default.number.isRequired,
    formatter: _propTypes2.default.bool,
    paddingColor: _propTypes2.default.string,
    lineColor: _propTypes2.default.string,
    textStyle: _propTypes2.default.object,
    grid: _propTypes2.default.object,
    toolbox: _propTypes2.default.bool
  }).isRequired,
  style: _propTypes2.default.object,
  onTooltipFormat: _propTypes2.default.func,
  onEvents: _propTypes2.default.object
};