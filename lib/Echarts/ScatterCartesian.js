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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/11/3.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ScatterCartesian = function (_Basic) {
  _inherits(ScatterCartesian, _Basic);

  function ScatterCartesian() {
    _classCallCheck(this, ScatterCartesian);

    return _possibleConstructorReturn(this, (ScatterCartesian.__proto__ || Object.getPrototypeOf(ScatterCartesian)).apply(this, arguments));
  }

  _createClass(ScatterCartesian, [{
    key: 'setSymbolSize',
    value: function setSymbolSize(now, min, max, minTar, maxTar) {
      if (!now) {
        return 20;
      }
      if (minTar <= maxTar && min <= now <= max) {
        return (now - min) * (maxTar - minTar) / (max - min) + minTar;
      }
      return now || 0;
    }
  }, {
    key: 'getOption',
    value: function getOption(props) {
      var _this2 = this;

      var config = props.config,
          onTooltipFormat = props.onTooltipFormat;

      var options = config.options;
      var color = config.color;
      var markLine = {
        silent: true,
        data: [{ name: '平均线', type: 'average', valueIndex: 0 }, { name: '平均线', type: 'average', valueIndex: 1 }],
        label: {
          normal: {
            formatter: function formatter(params) {
              return '\u5E73\u5747\u503C\n' + (params.value && params.value.toFixed(0) || '');
            }
          }
        },
        lineStyle: { normal: { color: this.fontColor } }
      };
      var option = {
        color: color || this.color,
        toolbox: {
          show: !!config.isToolboxShow,
          itemSize: this.fontSize,
          right: '0%',
          top: 0,
          iconStyle: {
            normal: { borderColor: this.fontColor },
            emphasis: { borderColor: this.emphasisColor }
          },
          feature: {
            mark: { show: true },
            dataZoom: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
          // orient: 'vertical',
          y: 'top',
          x: 'center',
          data: [],
          textStyle: {
            color: this.fontColor
          }
        },
        tooltip: {
          showDelay: 0,
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        xAxis: {
          name: config.xName,
          nameTextStyle: {
            color: this.fontColor,
            fontSize: this.fontSize
          },
          splitLine: {
            lineStyle: {
              color: this.gridColor,
              type: 'dashed'
            }
          },
          axisLabel: {
            show: true,
            textStyle: { color: this.fontColor, fontSize: this.fontSize }
          },
          scale: true
        },
        yAxis: {
          name: config.yName,
          nameTextStyle: {
            color: this.fontColor,
            fontSize: this.fontSize
          },
          splitLine: {
            lineStyle: {
              color: this.gridColor,
              type: 'dashed'
            }
          },
          axisLabel: {
            show: true,
            textStyle: { color: this.fontColor, fontSize: this.fontSize }
          },
          scale: true
        },
        series: []
      };
      if (onTooltipFormat) {
        option.tooltip.formatter = function (params) {
          return onTooltipFormat(params);
        };
      }
      if (config.title) {
        option.title = {
          text: config.title.text,
          subtext: config.title.subtext,
          textStyle: { color: this.titleColor, fontSize: this.titleSize }
        };
      }
      options.forEach(function (item, i) {
        var allVal = [];
        item.data.forEach(function (v) {
          allVal.push(v[2]);
        });
        var max = Math.max.apply(Math, allVal);
        var min = Math.min.apply(Math, allVal);

        option.legend.data.push(item.name);
        option.series.push({
          name: item.name,
          data: item.data,
          type: 'scatter',
          symbolSize: function symbolSize(data) {
            return _this2.setSymbolSize(data[2], min, max, 10, 50);
          },
          markLine: item.markLine ? markLine : '',
          label: {
            normal: {
              show: config.isLabelShow,
              position: 'top',
              color: config.color && Array.isArray(config.color[i]) ? config.color[i][1] : null,
              formatter: function formatter(params) {
                return params.data[3] ? params.data[3] : params.seriesName;
              }
            }
          },
          itemStyle: config.color ? {
            normal: {
              shadowBlur: 5,
              shadowColor: config.color[i][1],
              shadowOffsetY: 2,
              color: Array.isArray(config.color[i]) ? {
                type: 'radial',
                x: 0.4,
                y: 0.4,
                r: 0.6,
                colorStops: [{
                  offset: 0, color: config.color[i][0]
                }, {
                  offset: 1, color: config.color[i][1]
                }],
                globalCoord: false // 缺省为 false
              } : config.color[i]
            }
          } : null
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

  return ScatterCartesian;
}(_Basic3.default);

exports.default = ScatterCartesian;

ScatterCartesian.propTypes = {
  dataConfig: _propTypes2.default.shape({
    options: _propTypes2.default.object.isRequired,
    grid: _propTypes2.default.object,
    title: _propTypes2.default.object,
    color: _propTypes2.default.array
  }),
  style: _propTypes2.default.object,
  onTooltipFormat: _propTypes2.default.func,
  onEvents: _propTypes2.default.object
};