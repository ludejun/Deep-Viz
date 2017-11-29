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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShadeMap = function (_Basic) {
  _inherits(ShadeMap, _Basic);

  function ShadeMap() {
    _classCallCheck(this, ShadeMap);

    return _possibleConstructorReturn(this, (ShadeMap.__proto__ || Object.getPrototypeOf(ShadeMap)).apply(this, arguments));
  }

  _createClass(ShadeMap, [{
    key: 'getOption',
    value: function getOption(props) {
      var _this2 = this;

      var mapConfig = props.mapConfig,
          dataConfig = props.dataConfig,
          onTooltipFormat = props.onTooltipFormat;

      var option = {
        series: [{
          name: '中国',
          type: 'map',
          mapType: 'china',
          zoom: 1.2,
          selectedMode: false,
          itemStyle: {},
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          data: []
        }]
      };
      if (dataConfig.visualMap) {
        option.visualMap = {
          min: dataConfig.visualMap.min || 0,
          max: dataConfig.visualMap.max || 100,
          left: dataConfig.visualMap.left || 'left',
          top: dataConfig.visualMap.top || 'bottom',
          text: dataConfig.visualMap.text || ['高', '低'], // 文本，默认为数值文本
          calculable: dataConfig.calculable || true,
          inRange: dataConfig.inRange || { color: ['#e0ffff', '#006edd'] }
        };
      }

      if (mapConfig) {
        option.series[0].itemStyle = {
          normal: {
            areaColor: mapConfig.areaColor || '#F3F3F3',
            borderWidth: mapConfig.borderWidth || 1,
            borderColor: mapConfig.borderColor || '#C0B796',
            label: {
              show: true
            }
          },
          emphasis: {
            areaColor: mapConfig.hoverColor || 'rgba(243,243,243,.5)',
            label: {
              show: true
            }
          }
        };
      } else {
        option.series[0].itemStyle = {
          normal: {
            areaColor: '#F3F3F3',
            borderWidth: 1,
            borderColor: '#C0B796',
            label: {
              show: true
            }
          },
          emphasis: {
            areaColor: 'rgba(243,243,243,.5)',
            label: {
              show: true
            }
          }
        };
      }

      dataConfig.province.forEach(function (v) {
        option.series[0].data.push({
          name: v.name,
          value: v.value,
          itemStyle: {
            normal: {
              label: {
                show: dataConfig.isLableShow,
                textStyle: {
                  color: _this2.fontColor,
                  fontSize: _this2.fontsize
                }
              }
            }
          }
        });
      });

      if (dataConfig.title) {
        option.title = {
          text: dataConfig.title.text,
          subtext: dataConfig.title.subtext,
          textStyle: dataConfig.title.textStyle || { color: this.titleColor, fontSize: this.titleSize },
          x: dataConfig.title.x || 'center',
          y: dataConfig.title.y || 'top'
        };
      }

      if (dataConfig.tooltip) {
        option.tooltip = {
          show: dataConfig.tooltip
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
        style: this.props.style || { height: 450, width: '100%' },
        notMerge: false,
        lazyUpdate: false,
        onEvents: this.props.onEvents
      });
    }
  }]);

  return ShadeMap;
}(_Basic3.default);

exports.default = ShadeMap;


ShadeMap.propTypes = {
  mapConfig: _propTypes2.default.shape({
    areaColor: _propTypes2.default.string,
    hoverColor: _propTypes2.default.string,
    borderWidth: _propTypes2.default.string,
    borderColor: _propTypes2.default.string
  }),
  dataConfig: _propTypes2.default.shape({
    title: _propTypes2.default.Object,
    visualMap: _propTypes2.default.Object,
    tooltip: _propTypes2.default.bool,
    backgroundcolor: _propTypes2.default.string,
    name: _propTypes2.default.string,
    value: _propTypes2.default.number
  }).isRequired,
  style: _propTypes2.default.object,
  onEvents: _propTypes2.default.object
};