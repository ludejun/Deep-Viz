'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CirclePan;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CirclePan(props) {
  if (props.data && props.data.length > 6) {
    return _react2.default.createElement('div', null);
  }
  var styled = document.getElementById('jin-g-origin');
  styled && styled.parentNode.removeChild(styled);
  setTimeout(function () {
    document.querySelector('body').insertAdjacentHTML('afterBegin', '<style id="jin-g-origin">.g-origin-jin{transform-origin:center center; transform: rotateY(-180deg) rotate(-90deg);}</style>');
  }, 0);
  var keys = [];
  var radius = [80, 70, 60, 50, 40, 30];
  var circum = [503, 440, 377, 314, 252, 189];
  var yArray = [7, 18, 29, 38, 49, 60];
  var yArray2 = [104, 84, 64, 44, 23, 4];
  var color = ['#E96A69', '#80EBFD', '#2592EE', '#d58265', '#c23631', '#619fa8'];
  return _react2.default.createElement(
    'div',
    {
      style: { width: '100%', height: '100%', position: 'relative' }
    },
    props.data.map(function (it, index) {
      keys[index] = Math.random();
      return _react2.default.createElement(
        'style',
        { key: keys[index] },
        '.jin-svg-pan-',
        index,
        ' ',
        '{animation:jin-pan-' + index + ' 1s linear;animation-fill-mode:forwards;}',
        '@keyframes',
        ' jin-pan-' + index + '{from{stroke-dasharray:0,' + circum[index] + '} to{stroke-dasharray:' + circum[index] * it.percent / 100 + ',' + circum[index] + '}}'
      );
    }),
    _react2.default.createElement(
      'svg',
      {
        width: '100%',
        height: '100%',
        viewBox: '0 0 356 176',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg'
      },
      _react2.default.createElement(
        'g',
        { fill: 'none' },
        _react2.default.createElement(
          'g',
          {
            className: 'g-origin-jin',
            style: {}
          },
          props.data && props.data.map(function (it, index) {
            return _react2.default.createElement('circle', { key: index, cx: '86', cy: '88', r: radius[index], strokeWidth: '5', stroke: it.backGround || 'transparent' });
          }),
          ';',
          props.data && props.data.map(function (it, index) {
            return _react2.default.createElement('circle', {
              key: index + Math.random(),
              className: 'jin-svg-pan-' + index,
              cx: '86',
              cy: '88',
              r: radius[index],
              strokeWidth: '5',
              stroke: it.color || color[index],
              strokeDasharray: circum[index] * it.percent / 100 + ',' + circum[index]
            });
          }),
          ';'
        ),
        _react2.default.createElement(
          'g',
          null,
          props.data && props.data.map(function (it, index) {
            return _react2.default.createElement(
              'g',
              { key: index },
              _react2.default.createElement('line', {
                className: 'jin-svg-pan-line',
                x1: '86',
                y1: yArray[index],
                x2: 130 + 180 * it.percent / 100,
                y2: yArray[index],
                stroke: it.color || color[index],
                strokeWidth: '1',
                strokeDasharray: '5,3'
              }),
              _react2.default.createElement('circle', {
                cx: 130 + 180 * it.percent / 100,
                cy: yArray[index],
                r: '3',
                fill: it.color || color[index]
              }),
              _react2.default.createElement(
                'text',
                { fontSize: '10', fill: it.color || color[index] },
                _react2.default.createElement(
                  'tspan',
                  {
                    x: 120 + 180 * it.percent / 100 + 22,
                    y: yArray[index] * 1.1
                  },
                  it.percent + '%'
                )
              )
            );
          })
        ),
        _react2.default.createElement(
          'g',
          { transform: 'translate(270,60)' },
          props.data && props.data.map(function (it, index) {
            return _react2.default.createElement(
              'g',
              { key: Math.random() },
              _react2.default.createElement('circle', { cx: '0', cy: yArray2[index], r: '3', fill: it.color || color[index] }),
              _react2.default.createElement(
                'text',
                { x: '14', y: yArray2[index] + 3, fontSize: '9px', fill: it.textColor || 'black' },
                it.legend
              )
            );
          })
        )
      )
    )
  );
}
CirclePan.propTypes = {
  data: _propTypes2.default.array.isRequired
};