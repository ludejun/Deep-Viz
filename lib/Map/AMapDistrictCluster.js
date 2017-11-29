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

require('./amp.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: ["error", 180] */


var AMapDistrictCluster = function (_React$Component) {
  _inherits(AMapDistrictCluster, _React$Component);

  function AMapDistrictCluster() {
    _classCallCheck(this, AMapDistrictCluster);

    return _possibleConstructorReturn(this, (AMapDistrictCluster.__proto__ || Object.getPrototypeOf(AMapDistrictCluster)).apply(this, arguments));
  }

  _createClass(AMapDistrictCluster, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.mapRender = this.mapRender.bind(this);
      if (!window.AMap) {
        var script = document.createElement('script');
        script.src = 'http://webapi.amap.com/maps?v=1.3&key=5f47a71f72692f5e7160f7b577d72a82&callback=mapRender&plugin=AMap.ToolBar';
        document.head.appendChild(script);
      } else {
        this.mapRender();
      }
      var script2 = document.createElement('script');
      script2.async = true;
      script2.type = 'text/javascript';
      script2.src = 'http://webapi.amap.com/ui/1.0/main.js?v=1.0.11';
      document.head.appendChild(script2);
      script2.onload = function () {
        // 加载相关组件
        window.AMapUI.load(['ui/geo/DistrictCluster', 'lib/$', 'lib/utils'], function (DistrictCluster, $, utils) {
          window.DistrictCluster = DistrictCluster;
          // 启动页面
          if (_this2.props.labelConfig) {
            _this2.initPage(DistrictCluster, $, utils);
          } else if (!_this2.props.labelConfig) {
            _this2.initPage1(DistrictCluster, $, utils);
          }
        });
      };
    }
  }, {
    key: 'mapRender',
    value: function mapRender() {
      this.amap = new window.AMap.Map('ampClusterContainer', {
        zoom: 4,
        center: [139.1, 234.5]
      });
      this.amap.addControl(new window.AMap.ToolBar());
    }
  }, {
    key: 'initPage1',
    value: function initPage1(DistrictCluster, $) {
      var distCluster = new DistrictCluster({
        map: this.amap,
        getPosition: function getPosition(item) {
          if (!item) {
            return null;
          }
          var parts = item.split(',');
          // 返回经纬度
          return [parseFloat(parts[0]), parseFloat(parts[1])];
        }
      });
      window.distCluster = distCluster;

      $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
      // $.get('http://a.amap.com/amap-ui/static/data/10w.txt', (csv) => {
      $('#loadingTip').remove();
      distCluster.setData(this.props.point);
      // });
    }
  }, {
    key: 'initPage',
    value: function initPage(DistrictCluster, $, utils) {
      var map = this.amap;
      var that = this;
      function MyRender(ctx, polygons, styleOptions, feature, dataItems) {
        MyRender.__super__.constructor.call(this, ctx, polygons, styleOptions, feature, dataItems);
      }
      // 继承默认引擎
      utils.inherit(MyRender, DistrictCluster.Render.Default);
      utils.extend(MyRender.prototype, {
        drawFeaturePolygons: function drawFeaturePolygons(ctx, polygons, styleOptions, feature, dataItems) {
          // 调用父类方法
          MyRender.__super__.drawFeaturePolygons.call(this, ctx, polygons, styleOptions, feature, dataItems);
          // 直接绘制聚合信息
          this.drawMyLabel(feature, dataItems);
        },
        _initContainter: function _initContainter(ctx, polygons, styleOptions, feature, dataItems) {
          // 调用父类方法
          MyRender.__super__._initContainter.call(this, ctx, polygons, styleOptions, feature, dataItems);
          this._createCanvas('mylabel', this._container);
        },
        drawMyLabel: function drawMyLabel(feature, dataItems) {
          var pixelRatio = this.getPixelRatio(); // 高清下存在比例放大
          var pos = feature.properties.centroid || feature.properties.center;
          var containerPos = map.lngLatToContainer(pos);
          var labelCtx = this._getCanvasCxt('mylabel');

          // 文字的中心点
          var centerX = containerPos.getX() * pixelRatio;
          var centerY = containerPos.getY() * pixelRatio;
          labelCtx.save();

          labelCtx.font = '14 * ' + pixelRatio + 'px \u5FAE\u8F6F\u96C5\u9ED1';
          var text = feature.properties.name + '(' + dataItems.length + ')';
          var textMetrics = labelCtx.measureText(text);
          var halfTxtWidth = textMetrics.width / 2;

          if (that.props.labelConfig.type === 'rect') {
            labelCtx.fillStyle = that.props.labelConfig.fillStyle || '#108EE9';
            labelCtx.fillRect(centerX - halfTxtWidth - 3 * pixelRatio, centerY - 11 * pixelRatio, textMetrics.width + 6 * pixelRatio, 22 * pixelRatio);
            labelCtx.fillStyle = that.props.labelConfig.color || '#fff';
            labelCtx.textBaseline = 'middle';
            labelCtx.fillText(text, centerX - halfTxtWidth, centerY);
          } else if (that.props.labelConfig.type === 'circle') {
            labelCtx.beginPath();
            labelCtx.arc(centerX, centerY, halfTxtWidth * pixelRatio / 2, 0, 2 * Math.PI);
            labelCtx.fillStyle = that.props.labelConfig.fillStyle || '#108EE9';
            labelCtx.fill();
            labelCtx.closePath();
            labelCtx.fillStyle = that.props.labelConfig.color || '#fff';
            labelCtx.textBaseline = 'middle';
            labelCtx.fillText(text, centerX - halfTxtWidth, centerY);

            labelCtx.restore();
          }
        }
      });

      var distCluster = new DistrictCluster({
        zIndex: 200,
        map: this.amap,
        getPosition: function getPosition(item) {
          if (!item) {
            return null;
          }
          var parts = item.split(',');
          // 返回经纬度
          return [parseFloat(parts[0]), parseFloat(parts[1])];
        },

        renderConstructor: MyRender,
        renderOptions: {
          getClusterMarker: null,
          featureClickToShowSub: true
          // featureStyle: {
          //   fillStyle: 'black',
          //   lineWidth: 5,
          //   strokeStyle:'red',
          //   hoverOptions: {
          //     fillStyle:'pink',
          //     lineWidth: 1,
          //     strokeStyle:'red',
          //   },
          // },
        }
      });
      window.distCluster = distCluster;

      $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
      // $.get('http://a.amap.com/amap-ui/static/data/10w.txt', (csv) => {
      $('#loadingTip').remove();
      // const data = csv.split('\n');
      distCluster.setData(this.props.point);
      // });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$style = this.props.style,
          style = _props$style === undefined ? {} : _props$style;

      return _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        _react2.default.createElement('div', { id: 'ampClusterContainer', style: _extends({ width: '100%', height: 630 }, style) })
      );
    }
  }]);

  return AMapDistrictCluster;
}(_react2.default.Component);

exports.default = AMapDistrictCluster;


AMapDistrictCluster.propTypes = {
  style: _propTypes2.default.object,
  labelConfig: _propTypes2.default.shape({
    type: _propTypes2.default.string.isRequired,
    fillStyle: _propTypes2.default.string.isRequired,
    color: _propTypes2.default.string.isRequired
  })
};