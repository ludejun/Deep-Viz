'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _echarts = require('echarts');

var _echarts2 = _interopRequireDefault(_echarts);

require('echarts-gl');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlobePointLine = function (_Component) {
  _inherits(GlobePointLine, _Component);

  function GlobePointLine(props) {
    _classCallCheck(this, GlobePointLine);

    var _this = _possibleConstructorReturn(this, (GlobePointLine.__proto__ || Object.getPrototypeOf(GlobePointLine)).call(this, props));

    _this.randomNumber = Math.round(Math.random() * 10000);
    return _this;
  }

  _createClass(GlobePointLine, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var chart = _echarts2.default.init(document.getElementById('earth' + this.randomNumber));
      var config = this.props.config;

      var option = {
        backgroundColor: 'transparent',
        globe: {
          baseTexture: config.baseTexture || require('../assets/imgs/data-1491890179041-Hkj-elqpe.jpg'),
          heightTexture: 'heightTexture' in config && config.heightTexture && 'show' in config.heightTexture && config.heightTexture.show === false ? null : config.heightTexture && 'text' in config.heightTexture ? config.heightTexture.text : require('../assets/imgs/data-1491889019097-rJQYikcpl.jpg'),
          displacementScale: 0.1,
          shading: 'lambert',
          globeRadius: 85,
          top: '1%',

          light: {
            ambient: {
              intensity: 0.1
            },
            main: {
              intensity: 1.5
            }
          },
          layers: [{
            type: 'blend',
            show: config.blend && 'show' in config.blend ? config.blend.show : true,
            blendTo: 'emission',
            texture: config.blend && 'text' in config.blend ? config.blend.text : require('../assets/imgs/data-1491890291849-rJ2uee5ag.jpg')
          }, {
            type: 'overlay',
            show: config.overlay && 'show' in config.overlay ? config.overlay.show : true,
            texture: config.overlay && 'text' in config.overlay ? config.overlay.text : require('../assets/imgs/data-1491890092270-BJEhJg96l.png'),
            shading: 'lambert',
            distance: 5
          }]
        },
        series: []
      };
      config.data && config.data.length >= 0 && config.data.forEach(function (item) {
        var tmp = {};
        tmp.data = item.typeData;
        tmp.type = item.type;
        tmp.coordinateSystem = 'globe';
        tmp.coordinateSystem = 'globe';
        if (item.type === 'lines3D') {
          tmp.lineStyle = {};
          tmp.lineStyle.color = item.color;
          tmp.lineStyle.width = item.width;
          tmp.effect = { show: true };
        } else {
          tmp.itemStyle = {};
          tmp.itemStyle.color = item.color;
          tmp.symbol = item.symbol;
          tmp.symbolSize = item.symbolSize;
          tmp.label = {};
          tmp.label.show = !!item.itemStyle.formatter;
          tmp.label.position = item.itemStyle.position || 'top';
          tmp.label.formatter = item.itemStyle.formatter;
          tmp.label.textStyle = {};
          tmp.label.textStyle.color = item.itemStyle.color || '#005BAC';
          tmp.label.textStyle.fontSize = item.itemStyle.fontSize || 16;
          tmp.zLevel = 1000;
        }
        option.series.push(_extends({}, tmp, item.option));
      });
      chart.setOption(option);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        id: 'earth' + this.randomNumber,
        style: _extends({ width: 'inherit', height: 'inherit' }, this.props.style)
      });
    }
  }]);

  return GlobePointLine;
}(_react.Component);

exports.default = GlobePointLine;

GlobePointLine.propTypes = {
  config: _propTypes2.default.shape({
    data: _propTypes2.default.array.isRequired
  }).isRequired
};