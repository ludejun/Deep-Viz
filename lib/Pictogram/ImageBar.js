'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./ImageBar.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// <WDImageBar
//     dataList={[
//     {
//       itemImage: 'img/icon_male.png',
//       percent: this.props.customerPic.sex.male,
//       color: '#4C9DFF',
//     },
//     {
//       itemImage: 'img/icon_female.png',
//       percent: this.props.customerPic.sex.female,
//       color: '#EA6C6B',
//     },
//   ]}
//   />;

var ImageBar = function (_Component) {
  _inherits(ImageBar, _Component);

  function ImageBar() {
    _classCallCheck(this, ImageBar);

    return _possibleConstructorReturn(this, (ImageBar.__proto__ || Object.getPrototypeOf(ImageBar)).apply(this, arguments));
  }

  _createClass(ImageBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dataList = _props.dataList,
          direction = _props.direction;

      if (dataList && Array.isArray(dataList)) {
        var _positionMap;

        var positionMap = (_positionMap = {}, _defineProperty(_positionMap, dataList.length - 1, 'right'), _defineProperty(_positionMap, 0, 'left'), _positionMap);
        if (direction === 'y') {
          return _react2.default.createElement(
            'div',
            { className: 'image-bar-y ' + (this.props.className || ''), style: this.props.style },
            dataList.map(function (v, i) {
              return !!(v && v.itemImage) && _react2.default.createElement(
                'div',
                { key: 'y' + i, className: 'bar-container' },
                _react2.default.createElement('div', {
                  className: 'blank',
                  style: {
                    height: 'calc(100% - 24px - ' + v.percent + '% + ' + v.percent * 0.24 + 'px)'
                  }
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'percent', style: { color: v.color || '#000' } },
                  v.percent.toFixed(0) + '%'
                ),
                _react2.default.createElement('div', {
                  className: 'back-image',
                  style: {
                    backgroundImage: 'url(' + v.itemImage + ')',
                    height: 'calc(' + v.percent + '% - ' + v.percent * 0.24 + 'px)'
                  }
                })
              );
            })
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: 'image-bar-x ' + (this.props.className || ''), style: this.props.style },
            dataList.map(function (v, i) {
              return !!(v && v.itemImage) && _react2.default.createElement(
                'div',
                {
                  key: 'x' + i,
                  className: 'line',
                  style: {
                    width: !v.color ? v.percent + '%' : '100%'
                  }
                },
                _react2.default.createElement('span', {
                  className: 'back-image',
                  style: {
                    backgroundImage: 'url(' + v.itemImage + ')',
                    // 减掉的是百分比所占的位置
                    width: v.color ? 'calc(' + v.percent + '% - ' + 0.6 * v.percent + 'px)' : '100%',
                    backgroundPosition: v.color ? 'left' : positionMap[i] || 'center'
                  }
                }),
                v.color && _react2.default.createElement(
                  'span',
                  { className: 'percent', style: { color: v.color || '#000' } },
                  v.percent.toFixed(0) + '%'
                )
              );
            })
          );
        }
      } else {
        return null;
      }
    }
  }]);

  return ImageBar;
}(_react.Component);

exports.default = ImageBar;


ImageBar.propTypes = {
  dataList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    itemImage: _propTypes2.default.string.isRequired,
    percent: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string
  })).isRequired,
  direction: _propTypes2.default.oneOf(['x', 'y'])
};