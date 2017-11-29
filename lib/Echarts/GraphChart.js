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

var GraphChart = function (_Basic) {
  _inherits(GraphChart, _Basic);

  function GraphChart() {
    _classCallCheck(this, GraphChart);

    return _possibleConstructorReturn(this, (GraphChart.__proto__ || Object.getPrototypeOf(GraphChart)).apply(this, arguments));
  }

  _createClass(GraphChart, [{
    key: 'getOption',
    value: function getOption(props) {
      var color = props.color,
          config = props.config,
          onTooltipFormat = props.onTooltipFormat;

      var option = {
        color: color || this.color,
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
        tooltip: {},
        animationDuration: 1000,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          name: '关系图',
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 100
          },
          data: [],
          links: [],
          categories: [],
          roam: false,
          label: {
            normal: {
              show: true,
              position: 'right',
              fontSize: this.fontSize,
              fontStyle: this.fontStyle
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              color: 'source',
              curveness: 0,
              type: 'solid'
            }
          }
        }]
      };
      var arr = [];
      config.data.forEach(function (v) {
        arr.push(v.value);
      });
      var maxVal = Math.max.apply(Math, arr);
      var minVal = Math.min.apply(Math, arr);
      config.data.forEach(function (v) {
        var newVal = 10 + v.value - minVal / (maxVal - minVal) * 30;
        option.series[0].data.push({
          name: v.name,
          category: v.category,
          symbolSize: newVal || 20,
          draggable: config.draggable || true
        });
      });
      option.series[0].links = config.links;
      option.series[0].categories = config.categories;
      if (config.legend) {
        option.legend = {
          show: true,
          data: config.legend.data,
          textStyle: { color: this.fontColor, fontSize: this.fontSize }
        };
      }
      if (config.title) {
        option.title = {
          text: config.title,
          subtext: config.subtitle,
          textStyle: { color: this.titleColor, fontSize: this.titleSize }
        };
        option.legend.right = 10;
      }
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
      return _react2.default.createElement(_echartsForReact2.default, {
        option: this.getOption(this.props),
        style: this.props.style || { height: 400, width: '100%' },
        notMerge: true,
        lazyUpdate: false,
        onEvents: this.props.onEvents
      });
    }
  }]);

  return GraphChart;
}(_Basic3.default);

exports.default = GraphChart;


GraphChart.propTypes = {
  config: _propTypes2.default.shape({
    data: _propTypes2.default.array.isRequired,
    links: _propTypes2.default.array.isRequired,
    categories: _propTypes2.default.array.isRequired,
    legend: _propTypes2.default.array.isRequired,
    title: _propTypes2.default.string,
    subtitle: _propTypes2.default.string,
    draggable: _propTypes2.default.bool,
    toolbox: _propTypes2.default.bool
  }).isRequired,
  style: _propTypes2.default.object,
  onTooltipFormat: _propTypes2.default.func,
  onEvents: _propTypes2.default.object
};