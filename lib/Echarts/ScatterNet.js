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

var ScatterNet = function (_Basic) {
  _inherits(ScatterNet, _Basic);

  function ScatterNet() {
    _classCallCheck(this, ScatterNet);

    return _possibleConstructorReturn(this, (ScatterNet.__proto__ || Object.getPrototypeOf(ScatterNet)).apply(this, arguments));
  }

  _createClass(ScatterNet, [{
    key: 'genOption',
    value: function genOption(props) {
      var config = props.config,
          color = props.color;
      var data = config.data,
          x = config.x,
          y = config.y,
          maxSize = config.maxSize,
          minSize = config.minSize;

      var dataN = [];
      var dataE = [];
      var styleN = {};
      var styleE = {};
      data.forEach(function (d) {
        if (d.type === 'effect') {
          dataE = d.typeData;
          styleE = 'option' in d ? d.option : {};
        } else {
          dataN = d.typeData;
          styleN = 'option' in d ? d.option : {};
        }
      });
      // symbolSize
      var maxW = maxSize || 20;
      var minW = minSize || 5;
      var list = dataN.length > 0 ? dataN : dataE;
      var maxD = list.reduce(function (pre, cur) {
        return pre[2] > cur[2] ? pre : cur;
      })[2];
      var minD = list.reduce(function (pre, cur) {
        return pre[2] > cur[2] ? cur : pre;
      })[2];
      var axisStyle = {
        type: 'category',
        data: [],
        splitLine: {
          show: true,
          lineStyle: {
            color: this.fontColor,
            type: 'dashed'
          }
        },
        nameTextStyle: {
          color: this.fontColor,
          fontSize: this.fontSize
        },
        axisLabel: {
          textStyle: {
            color: this.fontColor,
            fontSize: this.fontSize
          }
        },
        scale: true
      };
      var options = _extends({
        grid: {
          left: 20,
          right: 20,
          bottom: 0,
          top: 50,
          containLabel: true
        },
        title: {
          text: ''
        },
        legend: {
          show: false
        },
        tooltip: {
          formatter: function formatter(params) {
            return params.value[2];
          }
        },
        xAxis: _extends({}, axisStyle, x),
        yAxis: _extends({}, axisStyle, {
          nameLocation: 'start'
        }, y),
        series: [_extends({
          type: 'scatter',
          itemStyle: {
            normal: { color: color && 'normal' in color ? color.normal : '#D7D7D7' }
          },
          symbolSize: function symbolSize(val) {
            return minW + (val[2] - minD + 0.1) / (maxD - minD + 0.1) * (maxW - minW);
          },
          animationDelay: function animationDelay(idx) {
            return idx * 5;
          },
          data: dataN
        }, styleN), _extends({
          type: 'effectScatter',
          itemStyle: { normal: { color: color && 'effect' in color ? color.effect : '#108EE9' } },
          z: 10,
          symbolSize: function symbolSize(val) {
            return minW + (val[2] - minD + 0.1) / (maxD - minD + 0.1) * (maxW - minW);
          },
          data: dataE
        }, styleE)]
      }, config.option);
      return options;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_echartsForReact2.default, {
        style: this.props.style || { height: 450, width: '100%' },
        option: this.genOption(this.props),
        lazyUpdate: false,
        notMerge: true
      });
    }
  }]);

  return ScatterNet;
}(_Basic3.default);

exports.default = ScatterNet;


ScatterNet.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  config: _propTypes2.default.shape({
    x: _propTypes2.default.object.isRequired,
    y: _propTypes2.default.object.isRequired,
    data: _propTypes2.default.array.isRequired
  })
  /* eslint-enable react/no-unused-prop-types */
};