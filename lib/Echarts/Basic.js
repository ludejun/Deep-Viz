'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Basic = function (_Component) {
  _inherits(Basic, _Component);

  function Basic(props) {
    _classCallCheck(this, Basic);

    var _this = _possibleConstructorReturn(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).call(this, props));

    _this.color = ['#2CA51A', '#0BBEFE', '#EA6C6B', '#F8B853', '#8AAAF6', '#4F76D1', '#C1DFFF', '#F7F7F7'];
    _this.fontSize = 12;
    _this.fontColor = '#999999';
    _this.gridColor = '#E9E9E9';
    _this.emphasisColor = '#108EE9';
    _this.titleColor = '#4A4A4A';
    _this.titleSize = 14;
    return _this;
  }

  return Basic;
}(_react.Component);

exports.default = Basic;