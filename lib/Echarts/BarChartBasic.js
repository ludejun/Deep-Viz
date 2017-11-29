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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChartBasic = function (_Basic) {
  _inherits(BarChartBasic, _Basic);

  function BarChartBasic() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BarChartBasic);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BarChartBasic.__proto__ || Object.getPrototypeOf(BarChartBasic)).call.apply(_ref, [this].concat(args))), _this), _this.defaultSupportedConfig = ['x', 'y', 'title', 'subtitle', 'dataZoom', 'grid', 'toolbox', 'dataLable',
    //
    'markPoint'], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BarChartBasic, [{
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
          show: !!config.y.legend,
          data: config.y.legend,
          textStyle: { color: this.fontColor, fontSize: this.fontSize }
        },
        toolbox: {
          show: config.toolbox,
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
        xAxis: [{
          show: config.x.isXAxisShow !== false,
          type: 'category',
          boundaryGap: config.x.boundaryGap !== false,
          data: config.x.data,
          name: config.x.name,
          nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
          axisLabel: {
            textStyle: { color: this.fontColor, fontSize: this.fontSize },
            rotate: config.x.rotate || 0,
            interval: config.x.showAll ? 0 : 'auto'
          },
          axisTick: {
            show: config.x.axisTickShow !== false,
            alignWithLabel: true
          },
          // nameLocation: config.x.nameLocation || 'middle',
          axisLine: { lineStyle: { color: '#333' } }
        }],
        yAxis: [{
          show: config.y.isYAxisShow !== false,
          type: 'value',
          min: config.y.min,
          max: config.y.max,
          name: config.y.name,
          nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
          nameGap: 12,
          nameLocation: config.y.nameLocation || 'end',
          axisLine: { lineStyle: { color: '#333' } },
          splitLine: { show: !!config.y.splitLine, lineStyle: { type: 'dotted' } },
          axisTick: {
            show: config.y.axisTickShow !== false
          },
          axisLabel: {
            show: config.y.labelShow !== false,
            textStyle: { color: this.fontColor, fontSize: this.fontSize }
          }
        }],
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
      if (onTooltipFormat) {
        option.tooltip.formatter = function (params) {
          return onTooltipFormat(params);
        };
      }
      // // For shadow 柱子背后的阴影
      // if (config.shadowBar) {
      //   option.series.unshift({
      //     type: 'bar',
      //     itemStyle: {
      //       normal: { color: config.shadowBar.color || 'rgba(0,0,0,0.05)' },
      //     },
      //     barGap: '-100%',
      //     barCategoryGap: '40%',
      //     data: new Array(config.x.data.length)
      //       .fill(config.shadowBar.value || Math.max.apply(null, config.y.data)),
      //     animation: false,
      //   });
      // }

      // filter & copy
      var configUndefinedKeys = {};
      Object.keys(config).forEach(function (v) {
        if (_this2.defaultSupportedConfig.indexOf(v) < 0) {
          configUndefinedKeys[v] = config[v];
        }
      });

      if (config.y.data && Array.isArray(config.y.data)) {
        if (config.markPoint) {
          // 为了防止点legend把mark点掉，单独加一列数据
          option.series.push({
            type: 'bar',
            markPoint: config.markPoint,
            stack: true
          });
        }
        config.y.data.forEach(function (barData, index) {
          option.series.push(_extends({}, configUndefinedKeys, {
            type: 'bar',
            name: config.y.legend ? config.y.legend[index] : null,
            barGap: config.y.barGap || 0,
            barWidth: config.y.barWidth || null,
            stack: config.y.stack || config.markPoint && index === 0 || null, //
            label: {
              normal: {
                formatter: '{c}' + (config.dataLable && config.dataLable.unit || ''),
                show: !!config.dataLable,
                position: config.dataLable && config.dataLable.position || 'top',
                color: config.dataLable && config.dataLable.color || null
              }
            },
            data: barData,
            itemStyle: config.y.color ? {
              normal: {
                color: Array.isArray(config.y.color[index]) ? {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: config.y.color[index][0]
                  }, {
                    offset: 1,
                    color: config.y.color[index][1]
                  }],
                  globalCoord: false
                } : config.y.color[index]
              }
            } : null
          }));
        });
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

  return BarChartBasic;
}(_Basic3.default);

exports.default = BarChartBasic;


BarChartBasic.propTypes = {
  color: _propTypes2.default.array,
  config: _propTypes2.default.shape({
    x: _propTypes2.default.object.isRequired,
    y: _propTypes2.default.object.isRequired,
    title: _propTypes2.default.string,
    subtitle: _propTypes2.default.string,
    dataZoom: _propTypes2.default.object,
    grid: _propTypes2.default.object,
    toolbox: _propTypes2.default.bool,
    datalable: _propTypes2.default.object
  }).isRequired,
  style: _propTypes2.default.object,
  onTooltipFormat: _propTypes2.default.func,
  onEvents: _propTypes2.default.object
};