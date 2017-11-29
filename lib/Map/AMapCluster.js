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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AMapCluster = function (_React$Component) {
  _inherits(AMapCluster, _React$Component);

  function AMapCluster() {
    _classCallCheck(this, AMapCluster);

    return _possibleConstructorReturn(this, (AMapCluster.__proto__ || Object.getPrototypeOf(AMapCluster)).apply(this, arguments));
  }

  _createClass(AMapCluster, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.mapRender = this.mapRender.bind(this);
      if (!window.AMap) {
        var script = document.createElement('script');
        script.src = 'http://webapi.amap.com/maps?v=1.3&key=5f47a71f72692f5e7160f7b577d72a82&callback=mapRender&plugin=AMap.MarkerClusterer,AMap.ToolBar';
        document.head.appendChild(script);
      } else {
        this.mapRender(this.props);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof window.AMap !== 'undefined' && nextProps) {
        this.mapRender(nextProps);
      }
    }
  }, {
    key: 'mapRender',
    value: function mapRender(props) {
      var point = void 0;
      if (props && props.point !== this.props.point) {
        point = props.point;
      } else {
        point = this.props.point;
      }

      var markers = [];
      var _props = this.props,
          _props$dragEnable = _props.dragEnable,
          dragEnable = _props$dragEnable === undefined ? true : _props$dragEnable,
          _props$zoomEnable = _props.zoomEnable,
          zoomEnable = _props$zoomEnable === undefined ? true : _props$zoomEnable,
          bgColor = _props.bgColor,
          fontColor = _props.fontColor,
          borderColor = _props.borderColor,
          width = _props.width,
          borderRadius = _props.borderRadius,
          boxShadow = _props.boxShadow,
          innerHTML = _props.innerHTML;


      this.amap = new window.AMap.Map('ampContainer', {
        center: [105, 34],
        zoom: 4,
        scrollWheel: false,
        dragEnable: dragEnable,
        zoomEnable: zoomEnable
      });

      point.forEach(function (value) {
        markers.push(new window.AMap.Marker({
          position: value.lnglat,
          content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
          offset: new window.AMap.Pixel(-15, -15)
        }));
      });

      var count = markers.length;
      var _renderCluserMarker = function _renderCluserMarker(context) {
        var div = document.createElement('div');
        var Hue = 180 - Math.pow(context.count / count, 1 / 18) * 180;
        var bgColors = bgColor || 'hsla(' + Hue + ', 100%, 50%, 0.7)';
        var fontColors = fontColor || 'hsla(' + Hue + ', 100%, 20%, 1)';
        var borderColors = borderColor || 'hsla(' + Hue + ', 100%, 40%, 1)';
        var shadowColors = 'hsla(' + Hue + ', 100%, 50%, 1)';
        div.style.backgroundColor = bgColors;
        var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
        div.style.width = div.style.height = width || size + 'px';
        div.style.border = 'solid 1px ' + borderColors;
        div.style.borderRadius = borderRadius || size / 2 + 'px';
        div.style.boxShadow = boxShadow || '0 0 1px ' + shadowColors;
        div.innerHTML = innerHTML || context.count;
        div.style.lineHeight = size + 'px';
        div.style.color = fontColors;
        div.style.fontSize = '14px';
        div.style.textAlign = 'center';
        context.marker.setOffset(new window.AMap.Pixel(-size / 2, -size / 2));
        context.marker.setContent(div);
      };

      this.cluster = new window.AMap.MarkerClusterer(this.amap, markers, { gridSize: 80, renderCluserMarker: _renderCluserMarker });

      this.amap.addControl(new window.AMap.ToolBar());
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$style = this.props.style,
          style = _props$style === undefined ? {} : _props$style;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { id: 'ampContainer', style: _extends({ width: '100%', height: 500 }, style) })
      );
    }
  }]);

  return AMapCluster;
}(_react2.default.Component);

exports.default = AMapCluster;


AMapCluster.propTypes = {
  style: _propTypes2.default.object,
  point: _propTypes2.default.array,
  dragEnable: _propTypes2.default.bool,
  zoomEnable: _propTypes2.default.bool,
  bgColor: _propTypes2.default.string,
  fontColor: _propTypes2.default.string,
  borderColor: _propTypes2.default.string,
  width: _propTypes2.default.string,
  borderRadius: _propTypes2.default.string,
  boxShadow: _propTypes2.default.string,
  innerHTML: _propTypes2.default.string
};