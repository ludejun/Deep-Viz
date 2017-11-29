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

var _echartsForReact = require('echarts-for-react');

var _echartsForReact2 = _interopRequireDefault(_echartsForReact);

var _Basic2 = require('./Basic');

var _Basic3 = _interopRequireDefault(_Basic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by wimi on 17/10/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FunnelChart = function (_Basic) {
  _inherits(FunnelChart, _Basic);

  function FunnelChart() {
    _classCallCheck(this, FunnelChart);

    return _possibleConstructorReturn(this, (FunnelChart.__proto__ || Object.getPrototypeOf(FunnelChart)).apply(this, arguments));
  }

  _createClass(FunnelChart, [{
    key: 'getOption',
    value: function getOption(props) {
      var _this2 = this;

      var config = props.config,
          onTooltipFormat = props.onTooltipFormat;


      var tooltip = _defineProperty({
        trigger: 'axis',
        show: !!config.name
      }, config.position ? 'position' : '', config.position || '');
      var legend = {
        x: 'right',
        data: ['']
      };
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

      var series = [{
        type: 'funnel',
        min: config.min,
        max: config.max,
        sort: config.sort || 'ascending',
        left: 0,
        right: 0,
        width: '100%',
        top: 0,
        bottom: 60,
        label: {
          normal: {
            show: true,
            position: 'inside',
            textStyle: {
              color: config.label && config.label.color || '#ccc'
            }
          },
          emphasis: {
            textStyle: {
              color: config.label && config.label.emphasis || '#fff'
            }
          }
        },

        data: config.data.map(function (e, i) {
          return {
            name: e.name,
            value: e.value || 0,
            itemStyle: {
              normal: {
                color: e.normalColor || _this2.color[i % config.data.length]
              },
              emphasis: {
                color: e.emphasisColor || _this2.color[i % config.data.length]
              }
            }
          };
        })
      }];

      var textStyle = config.textStyle || { color: this.fontColor, fontSize: this.fontSize };

      var option = { tooltip: tooltip, legend: legend, series: series, textStyle: textStyle, grid: grid, toolbox: toolbox };

      if (onTooltipFormat) {
        option.tooltip.formatter = function (params) {
          return onTooltipFormat(params);
        };
      }

      return option;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_echartsForReact2.default, _extends({}, this.props, {
        style: this.props.style || { height: 250, width: '100%' },
        option: this.getOption(this.props),
        notMerge: true,
        lazyUpdate: false,
        onEvents: this.props.onEvents
      }));
    }
  }]);

  return FunnelChart;
}(_Basic3.default);

exports.default = FunnelChart;


FunnelChart.propTypes = {
  config: _propTypes2.default.shape({
    sort: _propTypes2.default.string,
    label: _propTypes2.default.object,
    data: _propTypes2.default.array,
    max: _propTypes2.default.number.isRequired,
    min: _propTypes2.default.number.isRequired,
    grid: _propTypes2.default.object,
    toolbox: _propTypes2.default.bool
  }).isRequired,
  style: _propTypes2.default.object,
  onTooltipFormat: _propTypes2.default.func,
  onEvents: _propTypes2.default.object
};