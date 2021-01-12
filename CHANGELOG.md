## 1.2.2

- 给BarChartBasic、LineBarChart、LineChart的X、Y轴添加自定义配置的属性

## 1.2.1

- 解决打包问题

## 1.2.0

- 去除内置的3D人物模型，改为外链加载，减小包体积
- 更新升级AMap API，及兼容性处理
- 升级Echarts版本，及兼容性处理

## 1.1.5

clear chartInstance when componentWillReceiveProps in LineChart

fix bug when dataZoom.start === 0 in LineChart/BarChartBasic/KLineChart/LineBarChart

## 1.1.4

hotfix bug in 1.1.3

## 1.1.3

clear instance when componentWillReceiveProps in KLineChart

## 1.1.2

Add xLabelCallback in KLineChart

modify HeatList

## 1.1.1

fix HeatList conflict

## 1.1.0

add componnets HotWords, DataScatter in Canvas

modify KLineChart, more official

fix isLegendShow bug, add showTooltip and showSymbol two attribute to LineChart

add Basic component WorldCloud

Add Pictogram component ProgressBar

add canvas component RadarSpan

add privilege when y axis is [0] in BarChart3D

modify the map rendering scale in ScatterCurveMap

## 1.0.4

resolve AMapCluster window.AMap.MarkerClusterer is not a constructor

Fix the map's rendering bug in ScatterCurveMap

## 1.0.3

use http to request json in ScatterCurveMap

## 1.0.2

Fix KLineChart's propTypes warning

## 1.0.1

Run gulp again & Add lib

## 1.0.0

Modify third-party map js lib from http protocol to https protocol

Fix AMapDistrictCluster async to false

Fix GraphChart's propTypes warning

Fix KLineChart warning (bar undefined)

## 0.9.10

Fix src/components/index.js
