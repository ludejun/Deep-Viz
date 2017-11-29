'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// <WDImagePercent dataList={[{
//   itemImage: 'icon-client-married',     单个图片
//   percent: 54,                                             百分比，整数
//   color: '#EA6C6B',                                        百分比颜色
//   name: '已婚'                                            标题
// }, {
//   itemImage: require('../../assets/icon_unmarried.png'),
//   percent: 46,
//   color: '#4C9DFF',
//   name: '未婚'
// }]}/>

var ImagePercent = function (_Component) {
  _inherits(ImagePercent, _Component);

  function ImagePercent() {
    _classCallCheck(this, ImagePercent);

    return _possibleConstructorReturn(this, (ImagePercent.__proto__ || Object.getPrototypeOf(ImagePercent)).apply(this, arguments));
  }

  _createClass(ImagePercent, [{
    key: 'render',
    value: function render() {
      var dataList = this.props.dataList;

      return _react2.default.createElement(
        'div',
        { style: styles.line },
        dataList.map(function (v, i) {
          return v && _react2.default.createElement(
            'div',
            {
              key: i,
              style: { display: 'inline-block', width: 1 / dataList.length * 100 + '%' }
            },
            _react2.default.createElement(
              'div',
              { style: styles.center },
              !!v.itemImage && (_typeof(v.itemImage) === 'object' && v.itemImage || typeof v.itemImage === 'string' && _react2.default.createElement('span', {
                style: _extends({}, styles.image, { backgroundImage: 'url(' + v.itemImage + ')' })
              })),
              _react2.default.createElement(
                'span',
                { style: _extends({}, styles.percent, { color: v.color }) },
                v.percent && typeof v.percent === 'number' ? Math.round(v.percent) + '%' : '',
                v.percent && typeof v.percent === 'string' ? v.percent + '%' : ''
              )
            ),
            _react2.default.createElement(
              'p',
              { style: styles.name },
              v.name || ''
            )
          ) || null;
        })
      );
    }
  }]);

  return ImagePercent;
}(_react.Component);

exports.default = ImagePercent;


ImagePercent.propTypes = {
  dataList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    itemImage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
    percent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    color: _propTypes2.default.string,
    name: _propTypes2.default.string
  })).isRequired
};

var styles = {
  line: {
    marginTop: 8,
    marginBottom: 8
  },
  center: {
    textAlign: 'center'
  },
  image: {
    height: 36,
    width: 50,
    display: 'inline-block',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    marginRight: 5
  },

  percent: {
    fontSize: 24,
    fontWeight: 200
    // marginLeft: 5,
  },
  name: {
    color: '#999',
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'center',
    marginTop: 5
  }
};