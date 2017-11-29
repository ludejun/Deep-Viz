'use strict';

var _LineChart = require('./Echarts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _BarChartBasic = require('./Echarts/BarChartBasic');

var _BarChartBasic2 = _interopRequireDefault(_BarChartBasic);

var _BarHorizontal = require('./Echarts/BarHorizontal');

var _BarHorizontal2 = _interopRequireDefault(_BarHorizontal);

var _HeatmapCartesian = require('./Echarts/HeatmapCartesian');

var _HeatmapCartesian2 = _interopRequireDefault(_HeatmapCartesian);

var _PieChart = require('./Echarts/PieChart');

var _PieChart2 = _interopRequireDefault(_PieChart);

var _RadarChart = require('./Echarts/RadarChart');

var _RadarChart2 = _interopRequireDefault(_RadarChart);

var _FunnelChart = require('./Echarts/FunnelChart');

var _FunnelChart2 = _interopRequireDefault(_FunnelChart);

var _ShadeMap = require('./Echarts/ShadeMap');

var _ShadeMap2 = _interopRequireDefault(_ShadeMap);

var _GraphChart = require('./Echarts/GraphChart');

var _GraphChart2 = _interopRequireDefault(_GraphChart);

var _KLineChart = require('./Echarts/KLineChart');

var _KLineChart2 = _interopRequireDefault(_KLineChart);

var _ScatterNet = require('./Echarts/ScatterNet');

var _ScatterNet2 = _interopRequireDefault(_ScatterNet);

var _BaiduMapPoint = require('./Map/BaiduMapPoint');

var _BaiduMapPoint2 = _interopRequireDefault(_BaiduMapPoint);

var _BaiduMapPolygon = require('./Map/BaiduMapPolygon');

var _BaiduMapPolygon2 = _interopRequireDefault(_BaiduMapPolygon);

var _BaiduMapHeatMap = require('./Map/BaiduMapHeatMap');

var _BaiduMapHeatMap2 = _interopRequireDefault(_BaiduMapHeatMap);

var _BaiduMapCrossCurve = require('./Map/BaiduMapCrossCurve');

var _BaiduMapCrossCurve2 = _interopRequireDefault(_BaiduMapCrossCurve);

var _AMapIndoor = require('./Map/AMapIndoor');

var _AMapIndoor2 = _interopRequireDefault(_AMapIndoor);

var _BaiduMapPolygonWithPoint = require('./Map/BaiduMapPolygonWithPoint');

var _BaiduMapPolygonWithPoint2 = _interopRequireDefault(_BaiduMapPolygonWithPoint);

var _BaiduMapHeatMapWithPoint = require('./Map/BaiduMapHeatMapWithPoint');

var _BaiduMapHeatMapWithPoint2 = _interopRequireDefault(_BaiduMapHeatMapWithPoint);

var _AMapDistrictCluster = require('./Map/AMapDistrictCluster');

var _AMapDistrictCluster2 = _interopRequireDefault(_AMapDistrictCluster);

var _AMapCluster = require('./Map/AMapCluster');

var _AMapCluster2 = _interopRequireDefault(_AMapCluster);

var _LineBarChart = require('./Echarts/LineBarChart');

var _LineBarChart2 = _interopRequireDefault(_LineBarChart);

var _MapScatter = require('./Echarts/MapScatter');

var _MapScatter2 = _interopRequireDefault(_MapScatter);

var _ShadeMapScatter = require('./Echarts/ShadeMapScatter');

var _ShadeMapScatter2 = _interopRequireDefault(_ShadeMapScatter);

var _ScatterCartesian = require('./Echarts/ScatterCartesian');

var _ScatterCartesian2 = _interopRequireDefault(_ScatterCartesian);

var _ImageBar = require('./Pictogram/ImageBar');

var _ImageBar2 = _interopRequireDefault(_ImageBar);

var _ImagePercent = require('./Pictogram/ImagePercent');

var _ImagePercent2 = _interopRequireDefault(_ImagePercent);

var _RainbowRain = require('./Canvas/RainbowRain');

var _RainbowRain2 = _interopRequireDefault(_RainbowRain);

var _Gauge = require('./Canvas/Gauge');

var _Gauge2 = _interopRequireDefault(_Gauge);

var _GaugePan = require('./Canvas/GaugePan');

var _GaugePan2 = _interopRequireDefault(_GaugePan);

var _ScatterCurveMap = require('./Canvas/ScatterCurveMap');

var _ScatterCurveMap2 = _interopRequireDefault(_ScatterCurveMap);

var _CircleAnimate = require('./Canvas/CircleAnimate');

var _CircleAnimate2 = _interopRequireDefault(_CircleAnimate);

var _PillarList = require('./Canvas/PillarList');

var _PillarList2 = _interopRequireDefault(_PillarList);

var _ScratchOff = require('./Canvas/ScratchOff');

var _ScratchOff2 = _interopRequireDefault(_ScratchOff);

var _BallMove = require('./SVG/BallMove');

var _BallMove2 = _interopRequireDefault(_BallMove);

var _PieChartSvg = require('./SVG/PieChartSvg');

var _PieChartSvg2 = _interopRequireDefault(_PieChartSvg);

var _CirclePan = require('./SVG/CirclePan');

var _CirclePan2 = _interopRequireDefault(_CirclePan);

var _BarChart3D = require('./WebGL/BarChart3D');

var _BarChart3D2 = _interopRequireDefault(_BarChart3D);

var _ThreeModel = require('./WebGL/ThreeModel');

var _ThreeModel2 = _interopRequireDefault(_ThreeModel);

var _GlobePointLine = require('./WebGL/GlobePointLine');

var _GlobePointLine2 = _interopRequireDefault(_GlobePointLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AbstractCanvasVisualization from './Canvas/AbstractCanvasVisualization';
// import LineCircle from './Canvas/LineCircle';
// import Clock from './Canvas/Clock';

// svg

// map
// import MapBasic from './Echarts/MapBasic';

// Kline

// radar


// heatMap


// bar
module.exports = {
  LineChart: _LineChart2.default,
  BarChartBasic: _BarChartBasic2.default,
  BarHorizontal: _BarHorizontal2.default,
  HeatmapCartesian: _HeatmapCartesian2.default,
  PieChart: _PieChart2.default,
  RadarChart: _RadarChart2.default,
  FunnelChart: _FunnelChart2.default,
  ShadeMap: _ShadeMap2.default,
  GraphChart: _GraphChart2.default,
  KLineChart: _KLineChart2.default,
  ScatterNet: _ScatterNet2.default,
  BaiduMapPoint: _BaiduMapPoint2.default,
  BaiduMapPolygon: _BaiduMapPolygon2.default,
  BaiduMapHeatMap: _BaiduMapHeatMap2.default,
  BaiduMapCrossCurve: _BaiduMapCrossCurve2.default,
  AMapIndoor: _AMapIndoor2.default,
  BaiduMapPolygonWithPoint: _BaiduMapPolygonWithPoint2.default,
  BaiduMapHeatMapWithPoint: _BaiduMapHeatMapWithPoint2.default,
  AMapDistrictCluster: _AMapDistrictCluster2.default,
  AMapCluster: _AMapCluster2.default,
  LineBarChart: _LineBarChart2.default,
  MapScatter: _MapScatter2.default,
  ShadeMapScatter: _ShadeMapScatter2.default,
  ScatterCartesian: _ScatterCartesian2.default,
  ImageBar: _ImageBar2.default,
  ImagePercent: _ImagePercent2.default,
  RainbowRain: _RainbowRain2.default,
  Gauge: _Gauge2.default,
  GaugePan: _GaugePan2.default,
  ScatterCurveMap: _ScatterCurveMap2.default,
  CircleAnimate: _CircleAnimate2.default,
  PillarList: _PillarList2.default,
  ScratchOff: _ScratchOff2.default,
  BallMove: _BallMove2.default,
  PieChartSvg: _PieChartSvg2.default,
  CirclePan: _CirclePan2.default,
  BarChart3D: _BarChart3D2.default,
  ThreeModel: _ThreeModel2.default,
  GlobePointLine: _GlobePointLine2.default
};
// WebGL


// canvas

// Pictogram start

// mixed

// graph

// funnel

// pie
// Echarts start
// line