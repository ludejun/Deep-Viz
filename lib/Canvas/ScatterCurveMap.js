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

// import WorldMapJson from './WorldMap.json';

var ScatterCurveMap = function (_React$Component) {
  _inherits(ScatterCurveMap, _React$Component);

  function ScatterCurveMap(props) {
    _classCallCheck(this, ScatterCurveMap);

    // [-85.05112877980659，85.05112877980659]。这个是墨卡托的维度范围
    // 把大地坐标转化为web墨卡托坐标
    var _this = _possibleConstructorReturn(this, (ScatterCurveMap.__proto__ || Object.getPrototypeOf(ScatterCurveMap)).call(this, props));

    _this.mapLoad = function () {
      var bdary = new BMap.Boundary(); // eslint-disable-line
      bdary.get(_this.props.mapConfig.map.name || '徐汇区', function (rs) {
        var pointsArray = [];
        rs.boundaries.length > 0 && (pointsArray = rs.boundaries[0].split(';'));
        var points = pointsArray.map(function (it) {
          var point = it.split(',');
          return _this.lonlatTomercator([Number(point[0]), Number(point[1])]);
        });
        _this.chinaPoints = points;
        _this.renderMap();
        _this.renderCircle();
        _this.offContext.drawImage(_this.canvas, 0, 0);
      });
    };

    _this.loadScript = function () {
      var script = document.createElement('script');
      script.src = 'http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapLoad';
      document.body.appendChild(script);
    };

    _this.renderMap = function () {
      if (Array.isArray(_this.chinaPoints) && _this.chinaPoints.length > 0) {
        _this.maxScreenDis = Math.min(_this.canvas.width, _this.canvas.height);
        _this.minLng = _this.chinaPoints[0][0];
        _this.maxLat = _this.chinaPoints[0][1];
        _this.maxLng = _this.chinaPoints[0][0];
        _this.minLat = _this.chinaPoints[0][1];
        _this.chinaPoints.forEach(function (it) {
          _this.minLng = Math.min(_this.minLng, it[0]);
          _this.maxLat = Math.max(_this.maxLat, it[1]);
          _this.maxLng = Math.max(_this.maxLng, it[0]);
          _this.minLat = Math.min(_this.maxLat, it[1]);
        });
        _this.centerPoint = [(_this.minLng + _this.maxLng) / 2, (_this.maxLat + _this.minLat) / 2];
        _this.currentSource = _this.centerPoint;
        _this.ratio = 1.3 * Math.min(_this.canvas.width, _this.canvas.height) / _this.distancePoint([_this.minLng, _this.maxLat], [_this.maxLng, _this.minLat]);
        _this.chinaPoints.forEach(function (it) {
          _this.maxLength = Math.max(_this.maxLength, _this.distancePoint([_this.minLng, _this.maxLat], it));
        });
        _this.ratio = _this.maxScreenDis / _this.maxLength;
        var screenPoints = [];
        _this.chinaPoints.forEach(function (it) {
          var y = -(it[1] - _this.centerPoint[1]) * _this.ratio;
          var x = (it[0] - _this.centerPoint[0]) * _this.ratio;
          screenPoints.push([x, y]);
        });
        _this.context.fillStyle = _this.props.mapConfig.map.mapBackgroundColor || '#020B22';
        _this.context.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
        _this.context.translate(_this.canvas.width / 2 + 0.5, _this.canvas.height / 2 + 0.5);
        _this.context.beginPath();
        screenPoints.forEach(function (it, index) {
          index === 0 ? _this.context.moveTo(it[0], it[1]) : _this.context.lineTo(it[0], it[1]);
        });
        _this.context.closePath();
        _this.context.fillStyle = 'rgba(3,23,60,0.8)';
        _this.context.strokeStyle = '#2268A0';
        if (_this.props.mapConfig && _this.props.mapConfig.map && _this.props.mapConfig.map.areaBackgroundColor) {
          _this.context.fillStyle = _this.props.mapConfig.map.areaBackgroundColor;
        }
        if (_this.props.mapConfig && _this.props.mapConfig.map && _this.props.mapConfig.map.areaLineColor) {
          _this.context.strokeStyle = _this.props.mapConfig.map.areaLineColor;
        }
        _this.context.stroke();
        _this.context.fill();
      }
    };

    _this.renderCircle = function () {
      if (_this.props.mapConfig && _this.props.mapConfig.toPoints && _this.props.mapConfig.fromPoint && Array.isArray(_this.props.mapConfig.fromPoint) && Array.isArray(_this.props.mapConfig.toPoints)) {
        var travelType = false;
        var travelDirection = true;
        if (_this.props.mapConfig && _this.props.mapConfig.travelDirection && _this.props.mapConfig.travelDirection === 'to-from') {
          travelDirection = false;
        }
        if (_this.props.mapConfig && _this.props.mapConfig.travelType && _this.props.mapConfig.travelType === 'circle') {
          travelType = true;
        }
        var frompoint = [(_this.lonlatTomercator(_this.props.mapConfig.fromPoint)[0] - _this.currentSource[0]) * _this.ratio, (_this.currentSource[1] - _this.lonlatTomercator(_this.props.mapConfig.fromPoint)[1]) * _this.ratio];
        _this.props.mapConfig.toPoints.forEach(function (it) {
          var Tpoint = _this.lonlatTomercator(it);
          var point = [(Tpoint[0] - _this.currentSource[0]) * _this.ratio, (_this.currentSource[1] - Tpoint[1]) * _this.ratio];
          var col = _this.color[Math.floor(Math.random() * 13)];
          var circle = new _this.CirclePoint(point[0], point[1], 8, col, _this.context, _this.offCanvas, _this.props.mapConfig.map.type);
          circle.start();
          _this.circles.push(point);
          var line = new _this.LineStroke(travelDirection ? frompoint : point, travelDirection ? point : frompoint, _this.context, col, 1, _this.offCanvas, _this.CirclePoint, travelType, _this.props.mapConfig.map.type);
          line.start();
          _this.lines.push(line);
        });
        _this.circle = new _this.CirclePoint(frompoint[0], frompoint[1], 8, _this.color[Math.floor(Math.random() * 13)], _this.context, _this.offCanvas, _this.props.mapConfig.map.type);
        _this.circle.start();
      }
    };

    _this.lonlatTomercator = function (lonlats) {
      var lonlat = lonlats;
      var mercator = [];
      var x = lonlat[0] * 20037508.34 / 180;
      if (Math.abs(lonlat[1]) > 85.05112877980659) {
        lonlat[1] = 85.05112877980659 * Math.abs(lonlat[1]) / lonlat[1];
      }
      var y = Math.log(Math.tan((90 + lonlat[1]) * Math.PI / 360)) / (Math.PI / 180);
      y = y * 20037508.34 / 180;
      mercator[0] = x;
      mercator[1] = y;
      return mercator;
    };
    // 求两点之间的距离
    _this.distancePoint = function (point1, point2) {
      var dx = point1[0] - point2[0];
      var dy = point1[1] - point2[1];
      return Math.sqrt(dx * dx + dy * dy);
    };
    // canvas随机id
    _this.id = Math.random() + '-canvas';
    // canvas
    _this.canvas = null;
    // canvas绘图上下文
    _this.context = null;
    // 离屏canvas
    _this.offCanvas = document.createElement('canvas');
    // 离屏canvas的context
    _this.offContext = _this.offCanvas.getContext('2d');
    // canvas画布对角线值
    _this.maxScreenDis = 0;
    // 世界地图中左上角的墨卡托坐标
    _this.sourceTomer = _this.lonlatTomercator([-180, 85.05112877980659]);
    // 大地坐标对角线值
    _this.maxGeoDis = _this.distancePoint(_this.sourceTomer, _this.lonlatTomercator([180, -85.05112877980659]));
    // 大地坐标与屏幕坐标距离的比例值
    _this.ratio = 0;
    // 世界地理区域对象数组容器
    _this.areaArray = [];
    // 中国内部墨卡托坐标数组容器
    _this.chinaPoints = [];
    // 中国内部屏幕坐标数组
    _this.screenPoints = [];
    // canvas相对于窗口位置信息
    _this.Rect = null;
    // 鼠标上次划过的地理区域
    _this.lastArea = null;
    // 鼠标上次划过的连线
    _this.lastLine = null;
    // 绘图环境缩放比例
    _this.scaleRatio = 3;
    // 最小经度
    _this.minLng = 0;
    // 最大纬度
    _this.maxLat = 0;
    // 距离经纬度原点的最大值
    _this.maxLength = 0;
    // 打的圆点数组
    _this.circles = [];
    // from点
    _this.circle = null;
    // 迁徙线数组
    _this.lines = [];
    // 需要的最大经度
    _this.maxLng = null;
    // 需要的最小经度
    _this.minLng = null;
    // 需要的最大维度
    _this.maxLat = null;
    // 需要的最小维度
    _this.minLat = null;
    // 需要自己算的中点坐标
    _this.centerPoint = null;
    // 默认的配色
    _this.color = ['#FDB933', '#D64F44', '#00A6AC', '#1D953F', '#E0861A', '#45B97C', '#F3715C', '#F26522', '#7FB80E', '#63C5FA', '#DDF8FF', '#FFF3DD', '#D45156'];
    // 圆点对象
    _this.CirclePoint = function (x, y, radius, color, context, offCanvas, mapType) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.context = context;
      this.offCanvas = offCanvas;
      this.tempRadius = this.radius;
      this.mapType = mapType;
      this.centerCirclePath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.centerCirclePath.setAttribute('cx', this.x);
      this.centerCirclePath.setAttribute('cy', this.y);
      this.centerCirclePath.setAttribute('r', this.radius);
      this.centerCirclePath.setAttribute('fill', this.color);
    };
    _this.CirclePoint.prototype.createAreaPath = function () {
      this.context.beginPath();
      this.context.rect(this.x - 2 * this.radius - this.context.lineWidth, this.y - 2 * this.radius - this.context.lineWidth, this.radius * 4 + this.context.lineWidth, this.radius * 4 + this.context.lineWidth);
    };
    _this.CirclePoint.prototype.createCenterCirclePath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    };
    _this.CirclePoint.prototype.createCenterCircleClipPath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
    };
    _this.CirclePoint.prototype.strokePath = function () {
      this.context.save();
      this.context.strokeStyle = this.color;
      this.context.stroke();
      this.context.restore();
    };
    _this.CirclePoint.prototype.strokeCirclePath = function () {
      this.context.save();
      this.context.strokeStyle = this.color;
      this.context.stroke();
      this.context.restore();
      this.context.restore();
    };
    _this.CirclePoint.prototype.fillPath = function () {
      this.context.save();
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.restore();
    };
    _this.CirclePoint.prototype.createFlashCirclePath = function (radius) {
      this.context.beginPath();
      this.context.save();
      this.context.globalAlpha = (3 * this.radius - radius) / (this.radius * 2);
      this.context.arc(this.x, this.y, radius, 0, Math.PI * 2);
    };
    _this.CirclePoint.prototype.drawAnimate = function () {
      this.context.beginPath();
      this.context.clearRect(this.x - 8 / 3 * this.radius - this.context.lineWidth, this.y - 8 / 3 * this.radius - this.context.lineWidth, this.radius * 16 / 3 + this.context.lineWidth * 2, this.radius * 16 / 3 + this.context.lineWidth * 2);
      this.context.drawImage(this.offCanvas, this.mapType !== 'province' && this.mapType !== 'district' ? this.x - 8 / 3 * this.radius - this.context.lineWidth : this.x - 8 / 3 * this.radius - this.context.lineWidth + this.offCanvas.width / 2 + 0.5, this.mapType !== 'province' && this.mapType !== 'district' ? this.y - 8 / 3 * this.radius - this.context.lineWidth : this.y - 8 / 3 * this.radius - this.context.lineWidth + this.offCanvas.height / 2 + 0.5, this.radius * 16 / 3 + this.context.lineWidth * 2, this.radius * 16 / 3 + this.context.lineWidth * 2, this.x - 8 / 3 * this.radius - this.context.lineWidth, this.y - 8 / 3 * this.radius - this.context.lineWidth, this.radius * 16 / 3 + this.context.lineWidth * 2, this.radius * 16 / 3 + this.context.lineWidth * 2);
      this.createCenterCirclePath();
      this.fillPath();
      this.createFlashCirclePath(this.tempRadius + this.radius / 3);
      this.strokeCirclePath();
      this.createFlashCirclePath(this.tempRadius + this.radius * 2 / 3);
      this.strokeCirclePath();
      this.createFlashCirclePath(this.tempRadius);
      this.strokeCirclePath();
    };
    // this.mapType !== 'province' ? this.x - 8 / 3 * this.radius - this.context.lineWidth :
    // this.x - 8 / 3 * this.radius - this.context.lineWidth - this.offCanvas.width / 2,
    // this.mapType !== 'province' ? this.y - 8 / 3 * this.radius - this.context.lineWidth :
    // this.y - 8 / 3 * this.radius - this.context.lineWidth - this.offCanvas.height / 2,
    _this.CirclePoint.prototype.animate = function () {
      if (this.tempRadius >= this.radius * 2) {
        this.tempRadius = this.radius;
      } else {
        this.tempRadius += 0.2;
        this.drawAnimate();
      }
      window.requestAnimationFrame(this.animate.bind(this));
    };
    _this.CirclePoint.prototype.start = function () {
      window.requestAnimationFrame(this.animate.bind(this));
    };
    // 运动的线对象
    _this.LineStroke = function (from, to, context, color, width, offCanvas, CirclePoint, travelCircle, mapType) {
      this.from = from;
      this.to = to;
      this.context = context;
      this.color = color;
      this.width = width;
      this.offCanvas = offCanvas;
      this.mapType = mapType;
      this.path = window.document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this.pathLength = 0;
      this.interLength = 0;
      this.step = 0;
      this.CirclePoint = CirclePoint;
      this.circle = new this.CirclePoint(this.from[0], this.from[1], travelCircle ? 8 : 4, travelCircle ? this.color : 'rgba(255,255,255,0.8)', context, offCanvas);
      this.secondcircle = null;
    };
    _this.LineStroke.prototype.getControlPoint = function () {
      var point1 = this.to[1] > this.from[1] ? this.to : this.from;
      var point2 = this.to[1] > this.from[1] ? this.from : this.to;
      var dy = point1[1] - point2[1];
      var dx = point1[0] - point2[0];
      var centerX = (point1[0] + point2[0]) / 2;
      var centerY = (point1[1] + point2[1]) / 2;
      var distance = Math.sqrt(dy * dy + dx * dx);
      var angle = Math.atan2(dy, dx);
      var rx = centerX - Math.sin(angle) * distance / 5;
      var ry = centerY - Math.cos(angle) * distance / 5;
      return [rx, ry];
    };
    _this.LineStroke.prototype.createCurvePath = function () {
      this.context.beginPath();
      this.context.moveTo(this.from[0], this.from[1]);
      var oneControl = this.getControlPoint();
      this.context.quadraticCurveTo(oneControl[0], oneControl[1], this.to[0], this.to[1]);
    };
    _this.LineStroke.prototype.strokeCurve = function () {
      this.context.save();
      this.context.strokeStyle = this.color;
      if (props.mapConfig && props.mapConfig.travelType === 'circle') {
        this.context.strokeStyle = 'transparent';
      }
      this.context.lineWidth = this.width;
      this.context.stroke();
      this.context.restore();
    };
    _this.LineStroke.prototype.createPath = function () {
      var controlP = this.getControlPoint();
      this.path.setAttributeNS(null, 'd', 'M' + this.from[0] + ' ' + this.from[1] + ' Q' + controlP[0] + ' ' + controlP[1] + ' ' + this.to[0] + ' ' + this.to[1]);
      this.pathLength = this.path.getTotalLength();
      this.interLength = this.pathLength / 100;
    };
    _this.LineStroke.prototype.start = function () {
      this.createCurvePath();
      this.strokeCurve();
      this.createPath();
      window.requestAnimationFrame(this.animate.bind(this));
    };
    _this.LineStroke.prototype.animate = function () {
      this.step >= this.pathLength && (this.step = 0);
      this.step += this.interLength;
      var x = parseInt(this.path.getPointAtLength(this.step).x, 10);
      var y = parseInt(this.path.getPointAtLength(this.step).y, 10);
      if (props.mapConfig && props.mapConfig.travelType !== 'circle') {
        if (!this.secondcircle) {
          this.secondcircle = new this.CirclePoint(this.circle.x, this.circle.y, 3, 'rgba(255,255,255,0.6)', this.context, this.offCanvas);
        }
        if (this.step === this.interLength && !this.thirdcircle) {
          this.thirdcircle = new this.CirclePoint(this.circle.x, this.circle.y, 2, 'rgba(255,255,255,0.4)', this.context, this.offCanvas);
        }
        if (this.step === 2 * this.interLength && !this.fourthcircle) {
          this.fourthcircle = new this.CirclePoint(this.circle.x, this.circle.y, 1, 'rgba(255,255,255,0.2)', this.context, this.offCanvas);
        }
      }

      // fourth尾巴
      if (this.fourthcircle) {
        this.context.save();
        this.fourthcircle.createCenterCirclePath();
        this.context.clip();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.restore();

        this.context.save();
        this.fourthcircle.createCenterCircleClipPath();
        this.context.clip();
        this.mapType !== 'province' && this.mapType !== 'district' ? this.context.drawImage(this.offCanvas, 0, 0) : this.context.drawImage(this.offCanvas, -this.offCanvas.width / 2, -this.offCanvas.height / 2);
        this.context.restore();
      }
      // third尾巴
      if (this.thirdcircle) {
        this.context.save();
        this.thirdcircle.createCenterCirclePath();
        this.context.clip();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.restore();

        this.context.save();
        this.thirdcircle.createCenterCircleClipPath();
        this.context.clip();
        this.mapType !== 'province' && this.mapType !== 'district' ? this.context.drawImage(this.offCanvas, 0, 0) : this.context.drawImage(this.offCanvas, -this.offCanvas.width / 2, -this.offCanvas.height / 2);
        this.context.restore();
      }
      // second尾巴
      if (this.secondcircle) {
        this.context.save();
        this.secondcircle.createCenterCirclePath();
        this.context.clip();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.restore();

        this.context.save();
        this.secondcircle.createCenterCircleClipPath();
        this.context.clip();
        this.mapType !== 'province' && this.mapType !== 'district' ? this.context.drawImage(this.offCanvas, 0, 0) : this.context.drawImage(this.offCanvas, -this.offCanvas.width / 2, -this.offCanvas.height / 2);
        this.context.restore();
      }
      // first尾巴
      this.context.save();
      this.circle.createCenterCirclePath();
      this.context.clip();
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.context.restore();

      this.context.save();
      this.circle.createCenterCircleClipPath();
      this.context.clip();
      this.mapType !== 'province' && this.mapType !== 'district' ? this.context.drawImage(this.offCanvas, 0, 0) : this.context.drawImage(this.offCanvas, -this.offCanvas.width / 2, -this.offCanvas.height / 2);
      this.context.restore();
      // 画线
      this.createCurvePath();
      this.strokeCurve();
      // 画第四节尾巴
      if (this.fourthcircle) {
        this.fourthcircle.x = this.thirdcircle.x;
        this.fourthcircle.y = this.thirdcircle.y;
        this.fourthcircle.createCenterCirclePath();
        this.fourthcircle.fillPath();
      }
      // 画第三节
      if (this.thirdcircle) {
        this.thirdcircle.x = this.secondcircle.x;
        this.thirdcircle.y = this.secondcircle.y;
        this.thirdcircle.createCenterCirclePath();
        this.thirdcircle.fillPath();
      }
      // 尾巴第二节
      if (this.secondcircle) {
        this.secondcircle.x = this.circle.x;
        this.secondcircle.y = this.circle.y;
        this.secondcircle.createCenterCirclePath();
        this.secondcircle.fillPath();
      }

      // 尾巴第一节
      this.circle.x = x;
      this.circle.y = y;
      this.circle.createCenterCirclePath();
      this.circle.fillPath();

      window.requestAnimationFrame(this.animate.bind(this));
    };
    // 坐标点对象
    _this.Point = function (x, y) {
      this.x = x;
      this.y = y;
    };
    // 地图区域对象
    _this.Area = function (points, context) {
      this.points = points;
      this.context = context;
    };
    _this.Area.prototype.createMapPath = function () {
      var _this2 = this;

      if ('length' in this.points) {
        this.context.beginPath();
        this.points.forEach(function (it, index) {
          index === 0 ? _this2.context.moveTo(it.x, it.y) : _this2.context.lineTo(it.x, it.y);
        });
        this.context.closePath();
      }
    };
    _this.Area.prototype.drawMap = function () {
      this.createMapPath();
      this.context.save();
      this.context.translate(0.5, 0.5);
      this.context.fillStyle = 'rgba(3,23,60,0.8)';
      this.context.strokeStyle = '#2268A0';
      if (props.mapConfig && props.mapConfig.map && props.mapConfig.map.areaBackgroundColor) {
        this.context.fillStyle = props.mapConfig.map.areaBackgroundColor;
      }
      if (props.mapConfig && props.mapConfig.map && props.mapConfig.map.areaLineColor) {
        this.context.strokeStyle = props.mapConfig.map.areaLineColor;
      }
      this.context.fill();
      this.context.stroke();
      this.context.restore();
    };
    _this.Area.prototype.cleardrawMap = function () {
      this.createMapPath();
      this.context.save();
      this.context.clip();
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.context.fillStyle = '#020B22';
      if (props.mapConfig && props.mapConfig.map && props.mapConfig.map.mapBackgroundColor) {
        this.context.fillStyle = props.mapConfig.map.mapBackgroundColor;
      }
      this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.context.restore();
      this.context.save();
      this.context.translate(0.5, 0.5);
      this.context.fillStyle = 'rgba(3,23,60,0.8)';
      this.context.strokeStyle = '#2268A0';
      if (props.mapConfig && props.mapConfig.map && props.mapConfig.map.areaBackgroundColor) {
        this.context.fillStyle = props.mapConfig.map.areaBackgroundColor;
      }
      if (props.mapConfig && props.mapConfig.map && props.mapConfig.map.areaLineColor) {
        this.context.strokeStyle = props.mapConfig.map.areaLineColor;
      }
      this.context.fill();
      this.context.stroke();
      this.context.restore();
    };
    _this.Area.prototype.drawPath = function () {
      this.context.fill();
      this.context.stroke();
    };
    return _this;
  }

  _createClass(ScatterCurveMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.canvas = document.getElementById(this.id);
      this.context = this.canvas.getContext('2d');
      var styleDom = window.getComputedStyle(this.canvas.parentNode);
      var width = Math.floor(window.parseInt(styleDom.width));
      var height = Math.floor(window.parseInt(styleDom.height));
      this.canvas.style.width = width + 'px';
      this.canvas.style.height = height + 'px';
      this.canvas.width = width * this.scaleRatio;
      this.canvas.height = height * this.scaleRatio;
      this.offCanvas.width = width * this.scaleRatio;
      this.offCanvas.height = height * this.scaleRatio;
      this.maxScreenDis = Math.sqrt(this.canvas.width * this.canvas.width + this.canvas.height * this.canvas.height);
      // 渲染世界地图
      if (this.props.mapConfig && this.props.mapConfig.map && this.props.mapConfig.map.type === 'world') {
        this.currentSource = this.sourceTomer;
        this.ratio = this.maxScreenDis / this.maxGeoDis;
        var WorldMapJson = require('../assets/map/WorldMap.json');
        WorldMapJson.features.forEach(function (it) {
          if (it.geometry.type === 'Polygon') {
            var points = [];
            it.geometry.coordinates[0].forEach(function (item) {
              var geo = _this3.lonlatTomercator(item);
              var x = (geo[0] - _this3.sourceTomer[0]) * _this3.ratio;
              var y = Math.abs(geo[1] - _this3.sourceTomer[1]) * _this3.ratio;
              var point = new _this3.Point(x, y);
              points.push(point);
            });
            var area = new _this3.Area(points, _this3.context);
            _this3.areaArray.push(area);
          } else if (it.geometry.type === 'MultiPolygon') {
            it.geometry.coordinates.forEach(function (item) {
              var points = [];
              item[0].forEach(function (tmp) {
                var geo = _this3.lonlatTomercator(tmp);
                var x = (geo[0] - _this3.sourceTomer[0]) * _this3.ratio;
                var y = -(geo[1] - _this3.sourceTomer[1]) * _this3.ratio;
                var point = new _this3.Point(x, y);
                points.push(point);
              });
              var area = new _this3.Area(points, _this3.context);
              _this3.areaArray.push(area);
            });
          }
        });
        // this.context.save();
        this.context.fillStyle = this.props.mapConfig.map.mapBackgroundColor || '#020B22';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.translate(0.5, 0.5);
        this.areaArray.forEach(function (it) {
          it.drawMap();
        });
        this.offContext.drawImage(this.canvas, 0, 0);
        this.renderCircle();
        // this.context.restore();
      }
      // 渲染中国省份
      if (this.props.mapConfig && this.props.mapConfig.map && this.props.mapConfig.map.type === 'province') {
        if (this.props.mapConfig.map.name) {
          var province = require('../assets/map/' + this.props.mapConfig.map.name + '.json');
          province.features.forEach(function (it) {
            if (it.geometry.type === 'Polygon') {
              var points = [];
              it.geometry.coordinates[0].forEach(function (item) {
                var geo = _this3.lonlatTomercator(item);
                var x = geo[0];
                var y = geo[1];
                _this3.maxLng === null ? _this3.maxLng = x : _this3.maxLng = Math.max(_this3.maxLng, x);
                _this3.minLng === null ? _this3.minLng = x : _this3.minLng = Math.min(_this3.minLng, x);
                _this3.maxLat === null ? _this3.maxLat = y : _this3.maxLat = Math.max(_this3.maxLat, y);
                _this3.minLat === null ? _this3.minLat = y : _this3.minLat = Math.min(_this3.minLat, y);
                var point = new _this3.Point(x, y);
                points.push(point);
              });
              var area = new _this3.Area(points, _this3.context);
              _this3.areaArray.push(area);
            } else if (it.geometry.type === 'MultiPolygon') {
              it.geometry.coordinates.forEach(function (item) {
                var points = [];
                item[0].forEach(function (tmp) {
                  var geo = _this3.lonlatTomercator(tmp);
                  var x = geo[0];
                  var y = geo[1];
                  _this3.maxLng === null ? _this3.maxLng = x : _this3.maxLng = Math.max(_this3.maxLng, x);
                  _this3.minLng === null ? _this3.minLng = x : _this3.minLng = Math.min(_this3.minLng, x);
                  _this3.maxLat === null ? _this3.maxLat = y : _this3.maxLat = Math.max(_this3.maxLat, y);
                  _this3.minLat === null ? _this3.minLat = y : _this3.minLat = Math.min(_this3.minLat, y);
                  var point = new _this3.Point(x, y);
                  points.push(point);
                });
                var area = new _this3.Area(points, _this3.context);
                _this3.areaArray.push(area);
              });
            }
          });
          this.centerPoint = [(this.minLng + this.maxLng) / 2, (this.maxLat + this.minLat) / 2];
          this.currentSource = this.centerPoint;
          this.ratio = 1.3 * Math.min(this.canvas.width, this.canvas.height) / this.distancePoint([this.minLng, this.maxLat], [this.maxLng, this.minLat]);
          for (var i = this.areaArray.length - 1; i >= 0; i--) {
            var it = this.areaArray[i].points;
            for (var j = it.length - 1; j >= 0; j--) {
              var item = it[j];
              var x = (item.x - this.centerPoint[0]) * this.ratio;
              var y = -(item.y - this.centerPoint[1]) * this.ratio;
              item.x = x;
              item.y = y;
            }
          }
          this.context.fillStyle = this.props.mapConfig.map.mapBackgroundColor || '#020B22';
          this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
          // this.context.save();
          this.context.translate(this.canvas.width / 2 + 0.5, this.canvas.height / 2 + 0.5);
          this.areaArray.forEach(function (it) {
            it.drawMap();
          });
          this.offContext.drawImage(this.canvas, 0, 0);
          this.renderCircle();
          // this.context.drawImage(this.offCanvas, 0, 0);
          // this.context.restore();
        }
      }
      if (this.props.mapConfig && this.props.mapConfig.map && this.props.mapConfig.map.type === 'district') {
        window.mapLoad = this.mapLoad.bind(this);
        if (typeof BMap === 'undefined') {
          this.loadScript();
        } else {
          this.mapLoad();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { position: 'relative', width: '100%', height: '100%' } },
        _react2.default.createElement(
          'canvas',
          { id: this.id },
          '\u5BF9\u4E0D\u8D77\uFF0C\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301canvas'
        )
      );
    }
  }]);

  return ScatterCurveMap;
}(_react2.default.Component);

exports.default = ScatterCurveMap;

ScatterCurveMap.propTypes = {
  mapConfig: _propTypes2.default.shape({
    map: _propTypes2.default.object.isRequired
  }).isRequired
};