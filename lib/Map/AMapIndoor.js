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

var AMapIndoor = function (_React$Component) {
  _inherits(AMapIndoor, _React$Component);

  function AMapIndoor() {
    _classCallCheck(this, AMapIndoor);

    return _possibleConstructorReturn(this, (AMapIndoor.__proto__ || Object.getPrototypeOf(AMapIndoor)).apply(this, arguments));
  }

  _createClass(AMapIndoor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.mapRender = this.mapRender.bind(this);
      if (!window.AMap) {
        var script = document.createElement('script');
        script.src = 'http://webapi.amap.com/maps?v=1.3&key=5f47a71f72692f5e7160f7b577d72a82&callback=mapRender';
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

      // const { mapStyle = 'normal' } = this.props;
      var mapStyle = 'normal';
      var _props = this.props,
          _props$dragEnable = _props.dragEnable,
          dragEnable = _props$dragEnable === undefined ? true : _props$dragEnable,
          _props$zoomEnable = _props.zoomEnable,
          zoomEnable = _props$zoomEnable === undefined ? true : _props$zoomEnable;

      this.amap = new window.AMap.Map('ampContainer', {
        resizeEnable: true,
        center: [point.lng, point.lat],
        zoom: 18,
        scrollWheel: false,
        showIndoorMap: true,
        mapStyle: 'amap://styles/' + mapStyle,
        dragEnable: dragEnable,
        zoomEnable: zoomEnable
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$style = this.props.style,
          style = _props$style === undefined ? {} : _props$style;

      return _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        _react2.default.createElement('div', { id: 'ampContainer', style: _extends({ width: '100%', height: 630 }, style) })
      );
    }
  }]);

  return AMapIndoor;
}(_react2.default.Component);

AMapIndoor.propTypes = {
  style: _propTypes2.default.object,
  point: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired
  }).isRequired,
  dragEnable: _propTypes2.default.bool,
  zoomEnable: _propTypes2.default.bool
};

exports.default = AMapIndoor;