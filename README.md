<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/ludejun/Deep-Viz@master/assets/logo.svg" width="96" height="96" alt="Deep-Viz" />
</p>

<h1 align="center">Deep-Viz</h1>

<p align="center">
  A React chart library: concise, consistent and good-looking charts built on
  ECharts, Canvas, SVG, WebGL and Chinese e-maps — distilled from years of
  commercial data-visualisation practice.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/deep-viz"><img src="https://img.shields.io/npm/v/deep-viz.svg?logo=npm&color=cb3837" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/deep-viz"><img src="https://img.shields.io/npm/dm/deep-viz.svg?color=cb3837" alt="npm downloads" /></a>
  <a href="https://bundlephobia.com/package/deep-viz"><img src="https://img.shields.io/bundlephobia/minzip/deep-viz?label=minzipped" alt="bundle size" /></a>
  <a href="https://www.npmjs.com/package/deep-viz"><img src="https://img.shields.io/npm/types/deep-viz.svg?logo=typescript&logoColor=white" alt="types included" /></a>
  <br />
  <a href="https://github.com/ludejun/Deep-Viz/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/deep-viz.svg?color=blue" alt="license" /></a>
  <a href="https://github.com/ludejun/Deep-Viz/stargazers"><img src="https://img.shields.io/github/stars/ludejun/Deep-Viz?logo=github&color=yellow" alt="GitHub stars" /></a>
  <a href="https://github.com/ludejun/Deep-Viz/blob/master/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" /></a>
  <img src="https://img.shields.io/badge/react-%3E%3D16.8-61dafb?logo=react&logoColor=white" alt="react >= 16.8" />
  <img src="https://img.shields.io/badge/echarts-5.x-ba160c" alt="echarts 5" />
</p>

<p align="center">
  <b><a href="https://ludejun.github.io/deepviz/">Component gallery</a></b>
  ·
  <a href="https://www.npmjs.com/package/deep-viz">npm</a>
  ·
  <a href="./CHANGELOG.md">Changelog</a>
  ·
  <a href="./CONTRIBUTING.md">Contributing</a>
  ·
  <a href="./README_CN.md">中文文档</a>
</p>

---

Most chart libraries hand you the whole configuration surface of the engine
underneath and leave the design decisions to you. Deep-Viz takes the opposite
position: 44 components, each with the options that actually vary in practice,
already styled to one visual system. Where you do need the engine's full power,
every ECharts-backed component still takes raw option fragments.

## Features

- **44 components** across six rendering backends: ECharts, Baidu / AMap e-maps,
  Canvas, SVG, WebGL and plain DOM pictograms.
- **Short configuration.** A handful of lines produces a complete, consistent
  chart; roughly 90% of the remaining cases are covered by passing option
  fragments straight through.
- **One visual system.** Colours, type scale, grid and tooltip styling are
  shared across every component, so a dashboard looks designed rather than
  assembled.
- **TypeScript declarations** for the whole public API, hand-written to match
  the runtime propTypes.
- **Tree-shakeable** — import a single component and nothing else comes with it.

## Requirements

|          |                                                                |
| -------- | -------------------------------------------------------------- |
| React    | `>= 16.8`                                                      |
| ECharts  | 5.x (bundled as a dependency)                                  |
| Browsers | Anything with Canvas; WebGL components additionally need WebGL |
| Node     | `>= 22` for development                                        |

## Install

```shell
pnpm add deep-viz
# or
npm install deep-viz --save
```

## Quick start

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

Import a single component when you do not want the rest of the library:

```javascript
import LineChart from 'deep-viz/lib/Echarts/LineChart';
```

Every component and its options are shown in the
[gallery](https://ludejun.github.io/deepviz/).

## Components

| Backend                 | Components                                                                                                                        |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **ECharts — cartesian** | `LineChart` `LineBarChart` `BarChartBasic` `BarHorizontal` `KLineChart` `HeatmapCartesian` `ScatterCartesian` `ScatterNet`        |
| **ECharts — other**     | `PieChart` `RadarChart` `FunnelChart` `GraphChart` `WordCloud`                                                                    |
| **ECharts — geo**       | `ShadeMap` `MapScatter` `ShadeMapScatter`                                                                                         |
| **Baidu maps**          | `BaiduMapPoint` `BaiduMapPolygon` `BaiduMapPolygonWithPoint` `BaiduMapHeatMap` `BaiduMapHeatMapWithPoint` `BaiduMapCrossCurve`    |
| **AMap**                | `AMapCluster` `AMapIndoor` `AMapDistrictCluster`                                                                                  |
| **Canvas**              | `Gauge` `GaugePan` `CircleAnimate` `RainbowRain` `PillarList` `ScatterCurveMap` `ScratchOff` `RadarSpan` `HotWords` `DataScatter` |
| **SVG**                 | `PieChartSvg` `BallMove` `CirclePan`                                                                                              |
| **WebGL**               | `BarChart3D` `GlobePointLine` `ThreeModel`                                                                                        |
| **Pictogram**           | `ImageBar` `ImagePercent` `ProgressBar`                                                                                           |

The map components expect the Baidu or AMap JavaScript SDK to be loaded by the
host page; they read it off `window`.

## TypeScript

Types ship with the package — no `@types/deep-viz` needed.

```tsx
import { LineChart, type LineChartProps } from 'deep-viz';
```

## Development

```shell
pnpm install
pnpm build       # compiles src/ to lib/, including LESS and the declarations
pnpm test        # vitest
pnpm lint        # eslint
pnpm typecheck   # tsc --noEmit
```

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) for the
fork → pull request flow.

## Credits

The library deliberately builds on existing work rather than reinventing it.
Thanks to:

- [ECharts](https://echarts.apache.org/)
- [Baidu Map JavaScript API](https://lbsyun.baidu.com/index.php?title=jspopular)
- [AMap JavaScript API](https://lbs.amap.com/api/javascript-api/summary/)
- [three.js](https://threejs.org/)
- [heatmap.js](https://github.com/pa7/heatmap.js)
- [anime.js](https://animejs.com/)

The first version was built by the big-data front-end and design team, whose
work this library still rests on.

## License

[MIT](./LICENSE)
