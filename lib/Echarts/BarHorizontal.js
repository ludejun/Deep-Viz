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

var BarHorizontal = function (_Basic) {
  _inherits(BarHorizontal, _Basic);

  function BarHorizontal() {
    _classCallCheck(this, BarHorizontal);

    return _possibleConstructorReturn(this, (BarHorizontal.__proto__ || Object.getPrototypeOf(BarHorizontal)).apply(this, arguments));
  }

  _createClass(BarHorizontal, [{
    key: 'getOption',
    value: function getOption(props) {
      var color = props.color,
          config = props.config;

      var option = {
        color: color || this.color,
        tooltip: {
          show: false,
          trigger: 'axis'
        },
        grid: {
          show: false,
          left: config.grid && config.grid.left || 30,
          right: config.grid && config.grid.right || 20,
          top: config.grid && config.grid.top || 10,
          bottom: config.grid && config.grid.bottom || 10,
          borderColor: this.gridColor,
          containLabel: true
        },
        legend: {
          show: !!config.x.legend,
          data: config.x.legend,
          textStyle: { color: this.fontColor, fontSize: this.fontSize }
        },
        toolbox: {
          show: !!config.toolbox,
          itemSize: 12,
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
          type: 'value',
          show: !!config.x.axisShow,
          min: config.x.min,
          max: config.x.max,
          splitLine: { show: true, lineStyle: { type: 'dotted' } },
          axisLabel: {
            show: true,
            textStyle: {
              color: this.fontColor,
              fontSize: this.fontSize
            }
          }
        },
        yAxis: {
          show: config.y.axisShow !== false,
          type: 'category',
          name: config.y.name,
          nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
          nameGap: 12,
          nameLocation: config.y.nameLocation || 'end',
          axisLine: { show: config.y.axisLine !== false, lineStyle: { color: '#333' } },
          axisTick: {
            show: !!config.y.axisTickShow
          },
          axisLabel: {
            show: config.y.labelShow !== false,
            textStyle: {
              color: config.y.labelColor || this.fontColor,
              fontSize: config.y.labelSize || this.fontSize
            }
          },
          data: config.y.data
        },
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
      // if (onTooltipFormat) {
      //   option.tooltip.formatter = params => onTooltipFormat(params);
      // }

      if (config.x.data && Array.isArray(config.x.data)) {
        config.x.data.forEach(function (barData, index) {
          option.series.push({
            type: 'bar',
            name: config.x.legend ? config.x.legend[index] : null,
            barGap: config.x.barGap || 0,
            barWidth: config.x.barWidth || null,
            stack: config.x.stack || null,
            label: {
              normal: {
                formatter: '{c}' + (config.dataLable && config.dataLable.unit || ''),
                show: config.dataLable !== false,
                position: config.dataLable && config.dataLable.position || 'right',
                color: config.dataLable && config.dataLable.color || null
              }
            },
            data: barData,
            itemStyle: config.x.color ? {
              normal: {
                color: Array.isArray(config.x.color[index]) ? {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: config.x.color[index][0]
                  }, {
                    offset: 1,
                    color: config.x.color[index][1]
                  }],
                  globalCoord: false
                } : config.x.color[index]
              }
            } : null
          });
        });
      }
      // For shadow 柱子背后的阴影
      if (config.shadowBar && config.x.data[0]) {
        option.series.push({
          type: 'bar',
          itemStyle: {
            normal: { color: config.shadowBar.color || 'rgba(0,0,0,0.05)' }
          },
          barGap: '-100%',
          barWidth: config.x.barWidth || null,
          barCategoryGap: '40%',
          data: new Array(config.x.data[0].length).fill(config.shadowBar.value || Math.max.apply(null, config.x.data[0])),
          animation: false
        });
      }
      // if (config.dataZoom) {
      //   option.dataZoom = [
      //     {
      //       show: true,
      //       realtime: true,
      //       start: config.dataZoom.start || 30,
      //       end: config.dataZoom.end || 100,
      //     },
      //   ];
      // }

      return option;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_echartsForReact2.default, {
        option: this.getOption(this.props),
        style: this.props.style || { height: 300, width: '100%' },
        notMerge: true,
        lazyUpdate: false,
        onEvents: this.props.onEvents
      });
    }
  }]);

  return BarHorizontal;
}(_Basic3.default);

exports.default = BarHorizontal;


BarHorizontal.propTypes = {
  color: _propTypes2.default.array,
  config: _propTypes2.default.shape({
    x: _propTypes2.default.object.isRequired,
    y: _propTypes2.default.object.isRequired,
    title: _propTypes2.default.string,
    subtitle: _propTypes2.default.string,
    // dataZoom: PropTypes.object,
    grid: _propTypes2.default.object,
    toolbox: _propTypes2.default.bool,
    datalable: _propTypes2.default.object,
    shadowBar: _propTypes2.default.object
  }).isRequired,
  style: _propTypes2.default.object,
  // onTooltipFormat: PropTypes.func,
  onEvents: _propTypes2.default.object
};