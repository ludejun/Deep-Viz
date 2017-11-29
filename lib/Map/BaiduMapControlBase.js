'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaiduMapControlBase = function (_React$Component) {
  _inherits(BaiduMapControlBase, _React$Component);

  function BaiduMapControlBase() {
    _classCallCheck(this, BaiduMapControlBase);

    return _possibleConstructorReturn(this, (BaiduMapControlBase.__proto__ || Object.getPrototypeOf(BaiduMapControlBase)).apply(this, arguments));
  }

  _createClass(BaiduMapControlBase, [{
    key: 'initMapControl',
    value: function initMapControl(map, props) {
      var BMap = window.BMap;
      var _props$disableDraggin = props.disableDragging,
          disableDragging = _props$disableDraggin === undefined ? false : _props$disableDraggin,
          _props$mapStyle = props.mapStyle,
          mapStyle = _props$mapStyle === undefined ? 'midnight' : _props$mapStyle,
          _props$navigationCont = props.navigationControl,
          navigationControl = _props$navigationCont === undefined ? true : _props$navigationCont,
          _props$disableMapRule = props.disableMapRuler,
          disableMapRuler = _props$disableMapRule === undefined ? false : _props$disableMapRule,
          _props$showMapType = props.showMapType,
          showMapType = _props$showMapType === undefined ? true : _props$showMapType;

      if (navigationControl) {
        map.addControl(new BMap.NavigationControl());
      }

      map.setMapStyle({ style: mapStyle });

      if (disableDragging) {
        map.disableDragging();
      } else {
        map.enableDragging();
      }
      if (!disableMapRuler) {
        map.addControl(new BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT }));
      }
      if (showMapType) {
        map.addControl(new BMap.MapTypeControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
      }
    }
  }]);

  return BaiduMapControlBase;
}(_react2.default.Component);

BaiduMapControlBase.propTypes = {
  mapStyle: _propTypes2.default.oneOf(['light', 'dark', 'redalert', 'googlelite', 'grassgreen', 'midnight', 'pink', 'darkgreen', 'grayscale']),
  disableDragging: _propTypes2.default.bool,
  navigationControl: _propTypes2.default.bool,
  disableMapRuler: _propTypes2.default.bool,
  showMapType: _propTypes2.default.bool
};

exports.default = BaiduMapControlBase;