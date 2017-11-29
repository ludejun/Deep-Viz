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

var PieChart = function (_Basic) {
  _inherits(PieChart, _Basic);

  function PieChart() {
    _classCallCheck(this, PieChart);

    return _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).apply(this, arguments));
  }

  _createClass(PieChart, [{
    key: 'getOption',
    value: function getOption(props) {
      var color = props.color,
          config = props.config,
          onTooltipFormat = props.onTooltipFormat;

      var option = {
        color: color || this.color,
        tooltip: {
          trigger: 'item',
          enterable: true,
          formatter: '{b}: {d}%'
        },
        grid: {
          show: false,
          left: config.grid && config.grid.left || 0,
          right: config.grid && config.grid.right || 0,
          top: config.grid && config.grid.top || 0,
          bottom: config.grid && config.grid.bottom || 0,
          borderColor: this.gridColor,
          containLabel: true
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
        series: [{
          type: 'pie',
          radius: config.concentric ? [config.concentric.innerRadius || '50%', config.concentric.outerRadius || '70%'] : '70%',
          center: ['50%', '50%'],
          data: config.data,
          label: {
            normal: {
              formatter: '{b}', // : {d}%
              textStyle: {
                color: '#666666',
                fontSize: this.fontSize
              }
            }
            // emphasis: {
            //     show: true,
            //     textStyle: !!this.props.concentric && {
            //         // fontSize: '30',
            //         fontWeight: 'bold'
            //     }
            // }
          },
          // labelLine: {
          //     normal: {
          //         show: !this.props.concentric
          //     }
          // },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          roseType: config.roseType || false
        }]
      };

      if (config.title) {
        option.title = {
          text: config.title,
          subtext: config.subtitle,
          textStyle: { color: this.titleColor, fontSize: this.titleSize }
        };
        option.legend.right = 10;
      }
      if (config.legend) {
        var _config$legend = config.legend,
            position = _config$legend.position,
            orient = _config$legend.orient;

        option.legend = {
          top: position.y || (orient === 'vertical' ? 'top' : 'bottom'),
          left: position.x || (orient === 'vertical' ? 'right' : 'center'),
          orient: orient || 'horizontal',
          data: config.data ? config.data.map(function (v) {
            return v.name;
          }) : null
        };
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
        style: this.props.style || { height: 250, width: '100%' },
        notMerge: true,
        lazyUpdate: false,
        onEvents: this.props.onEvents
      });
    }
  }]);

  return PieChart;
}(_Basic3.default);

exports.default = PieChart;


PieChart.propTypes = {
  color: _propTypes2.default.array,
  config: _propTypes2.default.shape({
    data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    legend: _propTypes2.default.object,
    concentric: _propTypes2.default.object,
    roseType: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    title: _propTypes2.default.string,
    subtitle: _propTypes2.default.string,
    grid: _propTypes2.default.object,
    toolbox: _propTypes2.default.bool
  }).isRequired,
  style: _propTypes2.default.object,
  onTooltipFormat: _propTypes2.default.func,
  onEvents: _propTypes2.default.object
};