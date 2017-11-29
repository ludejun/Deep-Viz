'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./PieChartSvg.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OUTERR = 190;
var INNERR = 155;

// usage
// <PieChartSvg
// data={this.list.ios.tags}
// color={['#0073CC', '#20CFAF']}
// unit="% "
// infinite />

var PieChartSvg = function (_Component) {
  _inherits(PieChartSvg, _Component);

  function PieChartSvg(props) {
    _classCallCheck(this, PieChartSvg);

    var _this = _possibleConstructorReturn(this, (PieChartSvg.__proto__ || Object.getPrototypeOf(PieChartSvg)).call(this, props));

    _this.outerRef = null;
    _this.innerRef = null;
    _this.state = { outerDashArray: '0', innerDashArray: '0', innerOffset: '0', tagsAngle: [] };
    _this.colors = props.color.map(function (v) {
      return _this.hex2hsl(v);
    });

    var height = props.height,
        width = props.width;


    _this.CENTERX = width / 2;
    _this.CENTERY = height / 2;
    _this.NAMESPACE = '' + ('' + Math.random()).substring(2) + new Date().valueOf();
    return _this;
  }

  _createClass(PieChartSvg, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'init',
    value: function init() {
      // tags: [
      //   { name: '广场', value: 23, line: 'M130,3 L50,80 L0,80' },
      //   { name: '优惠券', value: 20, line: 'M150,130 L20,0 L0,0' },
      //   { name: '电影', value: 17, line: 'M3,75 L80,0 L145,0' },
      //   { name: '闪购', value: 14, line: 'L167,3' },
      //   { name: '门店', value: 12, line: 'L70,70 L118,70' },
      //   { name: '其它', value: 14, line: 'L120,120 L154,120' },
      // ]
      var data = this.props.data;


      if (!(data && data.length)) {
        return null;
      }

      var TOTAL = data.reduce(function (x, y) {
        return x + (y.value || 0);
      }, 0);

      var innerDashArray = '';
      var tagsAngle = []; // 0-2*PI

      var outerDashArray = data.reduce(function (x, y) {
        var value = (y.value / TOTAL || 0) * 2 * Math.PI;

        tagsAngle.push((tagsAngle.length ? tagsAngle[tagsAngle.length - 1] : 0) + value);

        innerDashArray += value * INNERR + ' ';
        return '' + x + value * OUTERR + ' ';
      }, '').trim();
      var innerOffset = innerDashArray.trim().split(' ');
      innerDashArray = innerOffset.splice(1).concat(innerOffset).join(' ');

      tagsAngle.reverse();
      tagsAngle = tagsAngle.map(function (v, i) {
        return i === tagsAngle.length - 1 ? v / 2 : (v + tagsAngle[i + 1]) / 2;
      });
      tagsAngle.reverse();

      this.setState({ outerDashArray: outerDashArray, innerDashArray: innerDashArray, innerOffset: -innerOffset[0], tagsAngle: tagsAngle });
    }

    /*
      * Converts an hex color to HSL
      * Parameters
      *     hex : string containing the hex values
      *
      * Result : 3-element array containing the HSL values
      *
      */

  }, {
    key: 'hex2hsl',
    value: function hex2hsl(hex) {
      var sColor = hex.toLowerCase();
      // 十六进制颜色值的正则表达式
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

      // 处理六位的颜色值
      var rgbArr = [];

      // 如果是16进制颜色
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = '#';
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }

        for (var _i = 1; _i < 7; _i += 2) {
          rgbArr.push(parseInt('0x' + sColor.slice(_i, _i + 2), 16));
        }
        // return `RGB(${rgbArr.join(',')})`;
      } else {
        return;
      }
      // return sColor;

      var r1 = rgbArr[0] / 255;
      var g1 = rgbArr[1] / 255;
      var b1 = rgbArr[2] / 255;

      var maxColor = Math.max(r1, g1, b1);
      var minColor = Math.min(r1, g1, b1);
      // Calculate L:
      var L = (maxColor + minColor) / 2;
      var S = 0;
      var H = 0;
      if (maxColor !== minColor) {
        // Calculate S:
        if (L < 0.5) {
          S = (maxColor - minColor) / (maxColor + minColor);
        } else {
          S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        // Calculate H:
        if (r1 === maxColor) {
          H = (g1 - b1) / (maxColor - minColor);
        } else if (g1 === maxColor) {
          H = 2.0 + (b1 - r1) / (maxColor - minColor);
        } else {
          H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
      }

      L *= 100;
      S *= 100;
      H *= 60;
      if (H < 0) {
        H += 360;
      }
      return [H, S, L];
    }
  }, {
    key: 'calculateTagPath',
    value: function calculateTagPath(startx, starty) {
      var alfa = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var straightx = OUTERR / 2; // 水平直线时沿x的位移
      var crossx = straightx * Math.sin(Math.PI / 4); // 45度斜线时沿x，y的位移

      var tagPath = 'M' + startx + ',' + starty + ' ';

      // 先画线
      if (alfa >= 0 && alfa < Math.PI / 4 || alfa >= 7 * Math.PI / 4 && alfa < 2 * Math.PI) {
        // 往右
        tagPath += 'L' + (startx + straightx) + ',' + starty;
      } else if (alfa < Math.PI / 2) {
        // alfa >= Math.PI / 4
        // 往右下
        tagPath += 'L' + (startx + crossx) + ',' + (starty + crossx) + ' L' + (startx + crossx + straightx) + ',' + (starty + crossx);
      } else if (alfa < 3 * Math.PI / 4) {
        // 往左下
        tagPath += 'L' + (startx - crossx) + ',' + (starty + crossx) + ' L' + (startx - crossx - straightx) + ',' + (starty + crossx);
      } else if (alfa < 5 * Math.PI / 4) {
        // 往左
        tagPath += 'L' + (startx - straightx) + ',' + starty;
      } else if (alfa < 3 * Math.PI / 2) {
        // 往左上
        tagPath += 'L' + (startx - crossx) + ',' + (starty - crossx) + ' L' + (startx - crossx - straightx) + ',' + (starty - crossx);
      } else {
        // if (alfa < 7 * Math.PI / 4)
        // 往右上
        tagPath += 'L' + (startx + crossx) + ',' + (starty - crossx) + ' L' + (startx + crossx + straightx) + ',' + (starty - crossx);
      }

      var tagLast = tagPath.substr(tagPath.lastIndexOf('L') + 1).split(',');
      var lastLx = Number(tagLast[0]);
      var lastLy = Number(tagLast[1]);
      // const tagW = OUTERR;
      var left = false;

      // 画长方形
      if (!(alfa >= 0 && alfa < Math.PI / 2) && !(alfa >= 3 * Math.PI / 2 && alfa < 2 * Math.PI)) {
        // 左半边
        // lastLx -= tagW;
        left = true;
      }

      this.tagStartPoint = { x: lastLx, y: lastLy, left: left };
      // tagPath += ` M${lastLx},${lastLy} V${lastLy + tagH} H${lastLx + tagW} V${lastLy -
      //   tagH} H${lastLx} Z`; //

      return tagPath;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          unit = _props.unit,
          infinite = _props.infinite,
          height = _props.height,
          width = _props.width;
      var tagsAngle = this.state.tagsAngle; // outerDashArray, innerDashArray, innerOffset

      return _react2.default.createElement(
        'svg',
        {
          // width="540px"
          // height="550px"
          viewBox: '0 0 ' + width + ' ' + height,
          version: '1.1',
          xmlns: 'http://www.w3.org/2000/svg',
          xmlnsXlink: 'http://www.w3.org/1999/xlink'
          // {...this.props}
          , className: 'gundam-piechart-svg ' + (this.props.className || ''),
          style: this.props.style
        },
        _react2.default.createElement(
          'defs',
          null,
          ['outer', 'inner'].map(function (v, i) {
            var color = _this2.colors[i % _this2.colors.length];
            return _react2.default.createElement(
              'linearGradient',
              {
                key: v,
                x1: '50%',
                y1: i === 0 ? '0%' : '100%',
                x2: '50%',
                y2: i === 0 ? '100%' : '0%',
                id: 'linearGradient-' + v + '-' + _this2.NAMESPACE
              },
              _react2.default.createElement('stop', { stopColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)', offset: '0%' }),
              _react2.default.createElement('stop', { stopColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + (color[2] - 15) + '%)', offset: '100%' })
            );
          }),
          _react2.default.createElement('polygon', {
            id: 'tags-path-1',
            points: '18.6931818 0 188 0 188 39.8644068 171.977273 56 0 56 0 14.2372881'
          }),
          _react2.default.createElement('circle', { id: 'tag-line-path-1', r: '3', fill: '#fff' })
        ),
        _react2.default.createElement(
          'g',
          { stroke: 'none', strokeWidth: '1', fill: 'none', fillRule: 'evenodd' },
          ['outer', 'inner'].map(function (v, i) {
            var color = _this2.colors[i % _this2.colors.length];
            return _react2.default.createElement(
              'g',
              { key: v },
              _react2.default.createElement('circle', {
                className: 'round-circle-line-' + v,
                stroke: 'hsl(' + color[0] + ',' + color[1] + '%,' + (color[2] + 15) + '%)' || '#000',
                strokeWidth: '2',
                opacity: '0.9',
                strokeDasharray: '10',
                cx: _this2.CENTERX,
                cy: _this2.CENTERY,
                r: i === 0 ? OUTERR : INNERR
              }),
              _react2.default.createElement('circle', {
                className: 'round-circle',
                style: { animationIterationCount: infinite && 'infinite' },
                stroke: 'url(#linearGradient-' + v + '-' + _this2.NAMESPACE + ')',
                strokeWidth: '34',
                cx: _this2.CENTERX,
                cy: _this2.CENTERY,
                r: i === 0 ? OUTERR : INNERR,
                ref: function ref(_ref) {
                  return _this2[v + 'Ref'] = _ref;
                },
                strokeDasharray: _this2.state[v + 'DashArray'] || '',
                strokeDashoffset: _this2.state[v + 'Offset'] || ''
              })
            );
          }),
          data.map(function (v, i) {
            var r = i % 2 === 0 ? OUTERR : INNERR;
            var tagx = _this2.CENTERX + r * Math.cos(tagsAngle[i] || 0);
            var tagy = _this2.CENTERY + r * Math.sin(tagsAngle[i] || 0);
            var color = _this2.colors[i % 2 % _this2.colors.length];
            var strokeColor = 'hsl(' + color[0] + ',' + color[1] + '%,' + (color[2] + 15) + '%)' || '#000';

            return _react2.default.createElement(
              'g',
              { id: 'osuv-tags', key: 'tag' + i, className: 'tag-group-' + i % 2 },
              _react2.default.createElement('path', {
                d: _this2.calculateTagPath(tagx, tagy, tagsAngle[i]),
                className: 'tag-line-line',
                style: { animationIterationCount: infinite && 'infinite' }
                // stroke="#108EE9"
                , stroke: strokeColor
                // fill="url(#tags-linearGradient-3)"
                // fillOpacity="0.5"
              }),
              _react2.default.createElement('use', {
                className: 'tag-line-circle',
                style: { animationIterationCount: infinite && 'infinite' },
                xlinkHref: '#tag-line-path-1',
                x: tagx,
                y: tagy
              }),
              function () {
                var tagW = 18 * ('' + v.value).length + 36 * ('' + (unit || '')).length + 24 * (v.name || '').length + 5;
                var tagH = OUTERR / 4 / 2;

                var lastLx = _this2.tagStartPoint.x - (_this2.tagStartPoint.left ? tagW : 0);
                var lastLy = _this2.tagStartPoint.y;
                return _react2.default.createElement(
                  'g',
                  null,
                  _react2.default.createElement('path', {
                    d: 'M' + lastLx + ',' + lastLy + ' V' + (lastLy + tagH) + ' H' + (lastLx + tagW) + ' V' + (lastLy - tagH) + ' H' + lastLx + ' Z',
                    className: 'tag-line-line',
                    style: { animationIterationCount: infinite && 'infinite' },
                    stroke: strokeColor
                    // fill="url(#tags-linearGradient-3)"
                    , fillOpacity: '0.5'
                  }),
                  _react2.default.createElement(
                    'text',
                    {
                      className: 'tag-text',
                      style: { animationIterationCount: infinite && 'infinite' },
                      fontWeight: 'normal',
                      fill: strokeColor,
                      textAnchor: 'middle',
                      x: lastLx + tagW / 2,
                      y: lastLy + 12,
                      fontSize: '36'
                    },
                    v.value ? v.value + (unit || '') : '',
                    _react2.default.createElement(
                      'tspan',
                      { fontSize: '24' },
                      v.name || ''
                    )
                  )
                );
              }()
            );
          })
        )
      );
    }
  }]);

  return PieChartSvg;
}(_react.Component);

// <PieChartSvg data={list} color={['#0073CC', '#20CFAF']} unit="% " height={1000} width={580} />


exports.default = PieChartSvg;
PieChartSvg.propTypes = {
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    value: _propTypes2.default.number.isRequired
  })).isRequired,
  color: _propTypes2.default.arrayOf(_propTypes2.default.string),
  unit: _propTypes2.default.string,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number
};

PieChartSvg.defaultProps = {
  data: [],
  color: ['#0073CC'],
  unit: '',
  height: 580,
  width: 1000
};