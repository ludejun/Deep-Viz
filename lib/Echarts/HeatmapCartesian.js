'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _echartsForReact = require('echarts-for-react');

var _echartsForReact2 = _interopRequireDefault(_echartsForReact);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Basic2 = require('./Basic');

var _Basic3 = _interopRequireDefault(_Basic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatmapCartesian = function (_Basic) {
  _inherits(HeatmapCartesian, _Basic);

  function HeatmapCartesian() {
    _classCallCheck(this, HeatmapCartesian);

    return _possibleConstructorReturn(this, (HeatmapCartesian.__proto__ || Object.getPrototypeOf(HeatmapCartesian)).apply(this, arguments));
  }

  _createClass(HeatmapCartesian, [{
    key: 'getOption',
    value: function getOption(props) {
      var _props$config = props.config,
          x = _props$config.x,
          y = _props$config.y,
          data = _props$config.data,
          color = _props$config.color,
          option = _props$config.option,
          title = _props$config.title;

      var vals = [];
      for (var i = 0; i < data.length; i++) {
        vals.push(data[i][2]);
      }

      var max = Math.max.apply(null, vals);

      var options = _extends({
        title: title || '',
        animation: false,
        xAxis: {
          name: 'name' in x ? x.name : '',
          type: 'category',
          data: x.data,
          splitArea: {
            show: true
          },
          nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
          axisLabel: {
            textStyle: { color: this.fontColor, fontSize: this.fontSize }
          }
        },
        yAxis: {
          name: 'name' in x ? y.name : '',
          type: 'category',
          data: y.data,
          splitArea: {
            show: true
          },
          nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
          axisLabel: {
            textStyle: { color: this.fontColor, fontSize: this.fontSize }
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: max,
          calculable: true,
          orient: 'horizontal',
          inRange: {
            color: color
          }
          // controller: {
          //   inRange: {
          //     color: 'green',
          //   },
          // },
        },
        series: [{
          type: 'heatmap',
          data: data,
          label: {
            normal: {
              show: true
              // formatter: params => {
              //   return `${(params.value[2] * 100).toFixed(2)}%`;
              // },
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 5,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }],
        tooltip: {
          position: 'top',
          formatter: function formatter(params) {
            return params.value[2];
          }
        }
      }, option);
      return options;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_echartsForReact2.default, {
        option: this.getOption(this.props),
        style: this.props.style || { height: 300, width: '100%' },
        notMerge: true,
        lazyUpdate: false
      });
    }
  }]);

  return HeatmapCartesian;
}(_Basic3.default);

exports.default = HeatmapCartesian;


HeatmapCartesian.propTypes = {
  config: _propTypes2.default.shape({ data: _propTypes2.default.array, x: _propTypes2.default.object, y: _propTypes2.default.object }).isRequired,
  width: _propTypes2.default.string
};