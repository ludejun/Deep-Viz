<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/ludejun/Deep-Viz@master/assets/logo.svg" width="96" height="96" alt="Deep-Viz" />
</p>

<h1 align="center">Deep-Viz</h1>

<p align="center">
  React 数据可视化组件库 —— 基于 ECharts、Canvas、SVG、WebGL 和国内电子地图，
  提供简洁、统一、漂亮的图表，糅合多年商业数据展示实践。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/deep-viz"><img src="https://img.shields.io/npm/v/deep-viz.svg?logo=npm&color=cb3837" alt="npm 版本" /></a>
  <a href="https://www.npmjs.com/package/deep-viz"><img src="https://img.shields.io/npm/dm/deep-viz.svg?color=cb3837" alt="npm 月下载量" /></a>
  <a href="https://bundlephobia.com/package/deep-viz"><img src="https://img.shields.io/bundlephobia/minzip/deep-viz?label=minzipped" alt="包体积" /></a>
  <a href="https://www.npmjs.com/package/deep-viz"><img src="https://img.shields.io/npm/types/deep-viz.svg?logo=typescript&logoColor=white" alt="内置类型定义" /></a>
  <br />
  <a href="https://github.com/ludejun/Deep-Viz/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/deep-viz.svg?color=blue" alt="开源协议" /></a>
  <a href="https://github.com/ludejun/Deep-Viz/stargazers"><img src="https://img.shields.io/github/stars/ludejun/Deep-Viz?logo=github&color=yellow" alt="GitHub Star 数" /></a>
  <a href="https://github.com/ludejun/Deep-Viz/blob/master/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PR-欢迎提交-brightgreen.svg" alt="欢迎 PR" /></a>
  <img src="https://img.shields.io/badge/react-%3E%3D16.8-61dafb?logo=react&logoColor=white" alt="react >= 16.8" />
  <img src="https://img.shields.io/badge/echarts-5.x-ba160c" alt="echarts 5" />
</p>

<p align="center">
  <b><a href="https://ludejun.github.io/deepviz/">组件展示网站</a></b>
  ·
  <a href="https://www.npmjs.com/package/deep-viz">npm</a>
  ·
  <a href="./CHANGELOG.md">更新日志</a>
  ·
  <a href="./CONTRIBUTING.md">贡献指南</a>
  ·
  <a href="./README.md">English</a>
</p>

---

大多数图表库会把底层引擎的全部配置项原样抛给你，设计决策留给使用者自己做。Deep-Viz 走的是相反的路：44 个组件，每个只暴露实际会变化的配置，并且已经按同一套视觉规范调好。确实需要引擎全部能力的时候，所有 ECharts 组件依然支持直接透传原始 option 片段。

## 特性

- **44 个组件**，覆盖六种渲染方式：ECharts、百度/高德电子地图、Canvas、SVG、WebGL，以及纯 DOM 象形图。
- **配置极简。** 几行代码就能画出完整、统一的图表；剩下约 90% 的需求，通过透传 option 片段即可覆盖。
- **统一视觉规范。** 配色、字号、网格、tooltip 样式在所有组件间共享，拼出来的看板是「设计过的」而不是「拼起来的」。
- **完整 TypeScript 类型定义**，手写并与运行时 propTypes 严格对齐。
- **支持按需引入** —— 只引一个组件，不会把整个库带进来。

## 环境要求

|         |                                        |
| ------- | -------------------------------------- |
| React   | `>= 16.8`                              |
| ECharts | 5.x（已作为依赖内置）                  |
| 浏览器  | 支持 Canvas 即可；WebGL 组件另需 WebGL |
| Node    | 开发环境 `>= 22`                       |

## 安装

```shell
pnpm add deep-viz
# 或
npm install deep-viz --save
```

## 快速开始

```jsx
import { LineChart } from 'deep-viz';

const config = {
  x: { data: lineData.date },
  y: [
    {
      data: [lineData.y1, lineData.y2],
      legend: ['legend1', 'legend2'],
      name: 'yAxisName/unit',
    },
  ],
};

<LineChart config={config} />;
```

**按需引入单个组件：**

```javascript
import LineChart from 'deep-viz/lib/Echarts/LineChart';
```

每个组件的完整配置和效果，见[展示网站](https://ludejun.github.io/deepviz/)。

## 组件一览

| 渲染方式                 | 组件                                                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **ECharts — 直角坐标系** | `LineChart` `LineBarChart` `BarChartBasic` `BarHorizontal` `KLineChart` `HeatmapCartesian` `ScatterCartesian` `ScatterNet`        |
| **ECharts — 其他**       | `PieChart` `RadarChart` `FunnelChart` `GraphChart` `WordCloud`                                                                    |
| **ECharts — 地理**       | `ShadeMap` `MapScatter` `ShadeMapScatter`                                                                                         |
| **百度地图**             | `BaiduMapPoint` `BaiduMapPolygon` `BaiduMapPolygonWithPoint` `BaiduMapHeatMap` `BaiduMapHeatMapWithPoint` `BaiduMapCrossCurve`    |
| **高德地图**             | `AMapCluster` `AMapIndoor` `AMapDistrictCluster`                                                                                  |
| **Canvas**               | `Gauge` `GaugePan` `CircleAnimate` `RainbowRain` `PillarList` `ScatterCurveMap` `ScratchOff` `RadarSpan` `HotWords` `DataScatter` |
| **SVG**                  | `PieChartSvg` `BallMove` `CirclePan`                                                                                              |
| **WebGL**                | `BarChart3D` `GlobePointLine` `ThreeModel`                                                                                        |
| **象形图**               | `ImageBar` `ImagePercent` `ProgressBar`                                                                                           |

地图组件需要宿主页面自行引入百度或高德的 JavaScript SDK，组件从 `window` 上读取。

## TypeScript

类型定义随包发布，不需要额外装 `@types/deep-viz`。

```tsx
import { LineChart, type LineChartProps } from 'deep-viz';
```

## 本地开发

```shell
pnpm install
pnpm build       # 把 src/ 编译到 lib/，含 LESS 和类型声明
pnpm test        # 运行 vitest
pnpm lint        # 运行 eslint
pnpm typecheck   # tsc --noEmit
```

欢迎贡献代码 —— fork → Pull Request 的流程见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 致谢

秉持不重复造轮子的初衷，组件库大量使用或借鉴了其他开源社区的图表方案，在此一并致谢。想深入了解某个组件的，也可以去对应的源头项目看看：

- [ECharts](https://echarts.apache.org/)
- [百度地图 JavaScript API](https://lbsyun.baidu.com/index.php?title=jspopular)
- [高德地图 JavaScript API](https://lbs.amap.com/api/javascript-api/summary/)
- [three.js](https://threejs.org/)
- [heatmap.js](https://github.com/pa7/heatmap.js)
- [anime.js](https://animejs.com/)

第一版由大数据前端开发和设计小组完成，这个库至今仍建立在他们的工作之上，感谢他们卓有成效的付出。

## 开源协议

[MIT](./LICENSE)
