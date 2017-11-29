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

require('echarts-gl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart3D = function (_Component) {
  _inherits(BarChart3D, _Component);

  function BarChart3D() {
    _classCallCheck(this, BarChart3D);

    return _possibleConstructorReturn(this, (BarChart3D.__proto__ || Object.getPrototypeOf(BarChart3D)).apply(this, arguments));
  }

  _createClass(BarChart3D, [{
    key: 'genOption',
    value: function genOption(props) {
      var config = props.config;
      var option = _extends({
        title: _extends({}, 'title' in config && config.title),
        tooltip: {},
        xAxis3D: _extends({
          name: '',
          type: 'category'
        }, 'x' in config && config.x),
        yAxis3D: _extends({
          name: '',
          type: 'category'
        }, 'y' in config && config.y),
        zAxis3D: _extends({
          name: '',
          type: 'value'
        }, 'z' in config && config.z),
        grid3D: {
          boxHeight: config.box && 'height' in config.box ? config.box.height : 10,
          boxWidth: config.box && 'width' in config.box ? config.box.width : 100,
          boxDepth: config.box && 'depth' in config.box ? config.box.depth : 80,
          viewControl: {
            zoomSensitivity: 0,
            // distance: 120,
            rotateSensitivity: 0,
            alpha: config.view && 'alpha' in config.view ? config.view.alpha : 0,
            beta: config.view && 'beta' in config.view ? config.view.beta : 40
          },
          light: {
            main: {
              alpha: config.light && 'alpha' in config.light ? config.light.alpha : 40,
              beta: config.light && 'beta' in config.light ? config.light.beta : 40
            }
          }
        },
        series: []
      }, config.option);
      if (config.data && Array.isArray(config.data)) {
        config.data.forEach(function (item, index) {
          var color = props.color && Array.isArray(props.color) ? {
            itemStyle: {
              color: props.color[index]
            }
          } : {};
          option.series.push(_extends({
            type: 'bar3D',
            shading: 'lambert',
            data: item.map(function (i) {
              return {
                value: [i[0], i[1], i[2]]
              };
            })
          }, color));
        });
      }

      return option;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_echartsForReact2.default
      // ref="echarts_Instance"
      , { option: this.genOption(this.props),
        style: this.props.style || { height: 450, width: '100%' },
        notMerge: false,
        lazyUpdate: false
      });
    }
  }]);

  return BarChart3D;
}(_react.Component);

exports.default = BarChart3D;


BarChart3D.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  config: _propTypes2.default.shape({ data: _propTypes2.default.array.isRequired }).isRequired
  /* eslint-enable react/no-unused-prop-types */
};