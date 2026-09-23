# Changelog

All notable changes to this project are documented here. Versions follow
[Semantic Versioning](https://semver.org/).

## 2.0.0 — 2026-09-23

### Breaking

- **ECharts 4 → 5.** Every chart component renders through ECharts 5 now. A
  project pinned to ECharts 4 has to move with it. ECharts stays on 5 rather
  than 6 because echarts-wordcloud 2.1 still declares a peer of `^5.0.1`.
- **three 0.88 → 0.186**, and `three-obj-loader` is dropped for the `OBJLoader`
  three itself ships. Only `ThreeModel` is affected.
- **immutable 3 → 5**, **echarts-for-react 2 → 3**, **echarts-gl 1 → 2**,
  **echarts-wordcloud 1 → 2**.
- **The tarball no longer ships `src/`.** Anything importing from
  `deep-viz/src/...` has to use `deep-viz/lib/...` instead.
- **`ThreeModel` no longer logs to the console.** Load progress and failures are
  reported through the new `onProgress` and `onError` props; an unhandled
  failure goes to `console.error` rather than being printed unconditionally.
- **Node >= 18** is declared in `engines`.
- This is the first stable release since 1.2.3; `1.2.4-beta2` had been the
  `latest` tag since 2022.

### Fixed

- **React 19 compatibility.** Seven components still used
  `componentWillReceiveProps`, which React 19 removed — on React 19 they stopped
  reacting to prop changes entirely. All seven now use `componentDidUpdate`:
  `Gauge`, `GaugePan`, `AMapCluster`, `AMapIndoor`, `BaiduMapCrossCurve`,
  `LineChart` and `KLineChart`.
- **`prop-types` was missing from `dependencies`** despite being imported by 39
  files. It only resolved because another package happened to hoist it.
- **ECharts 5 compatibility.** `GlobePointLine` and `BaiduMapCrossCurve` used
  `import echarts from 'echarts'`; ECharts 5 removed the default export.
- **The bundled China map threw on import.** `src/assets/echarts/map/china.js`
  was an ECharts 4-era UMD bundle that read `root.echarts` at module top level.
  Under ESM the top-level `this` is `undefined`, so importing it threw
  `Cannot read properties of undefined (reading 'echarts')` and took
  `ShadeMap`, `ShadeMapScatter`, `ScatterCartesian` and `MapScatter` down with
  it. It now imports `echarts` directly; the map data is unchanged, and ECharts
  5 accepts it as-is.
- **`ScatterCurveMap` had the map JSON URL hard-coded** to a GitHub Pages host.
  `mapConfig.map.baseUrl` now overrides it; the old URL stays the default.
- `PieChartSvg` had a `` `hsl(…)` || '#000' `` fallback that could never be
  reached, because a template literal is always truthy. The fallback now
  triggers on a missing colour, as intended.
- `ThreeModel` no longer logs load progress and errors to the console. Progress
  and failures are reported through new `onProgress` and `onError` props;
  unhandled load failures go to `console.error` instead of being swallowed.
- Removed an always-true `if (1)` in `GaugePan` left behind by a commented-out
  branch.

### Changed

- **Build.** The gulp 3 pipeline could not run on Node 12 or later. It is
  replaced by `scripts/build.mjs`, which does the same three things — Babel for
  the JS, LESS to minified CSS, and repointing the `.less` imports in the output
  at the emitted `.css`.
- **Dependencies.** ECharts 4 → 5.6, echarts-for-react 2 → 3, echarts-gl 1 → 2,
  echarts-wordcloud 1 → 2, three 0.88 → 0.186, immutable 3 → 5, Babel 6 → 8.
  ECharts stays on 5 rather than 6 because echarts-wordcloud 2.1 still declares
  a peer of `^5.0.1`.
- `three-obj-loader`, which is unmaintained and patched the `THREE` namespace,
  is dropped in favour of the `OBJLoader` that ships with three itself.
- The package uses pnpm.
- `files` no longer ships `src/`, and the stale `gulpfile` entry is gone.

### Added

- **TypeScript declarations** for all 44 exported components, hand-written to
  match the runtime propTypes. No `@types/deep-viz` needed.
- ESLint 9 flat config (replacing airbnb + the unmaintained babel-eslint) and
  Prettier. 0 errors.
- Vitest, with tests that guard the public export surface, check that every
  export has a declared type, and fail if a lifecycle React removed reappears.
- `CONTRIBUTING.md`, in English and Chinese.
- English `README.md` and Chinese `README_CN.md`, split out of the single mixed
  README.

## 1.2.3

- Fix the custom-configuration props.

## 1.2.2

- Add custom configuration for the X and Y axes of `BarChartBasic`,
  `LineBarChart` and `LineChart`.

## 1.2.1

- Fix the build.

## 1.2.0

- Drop the bundled 3D character models in favour of loading them by URL, which
  shrinks the package considerably.
- Upgrade the AMap API and handle the compatibility fallout.
- Upgrade ECharts and handle the compatibility fallout.

## 1.1.5

- Clear the chart instance on prop changes in `LineChart`.
- Fix `dataZoom.start === 0` in `LineChart`, `BarChartBasic`, `KLineChart` and
  `LineBarChart`.

## 1.1.4

- Fix the bug introduced in 1.1.3.

## 1.1.3

- Clear the chart instance on prop changes in `KLineChart`.

## 1.1.2

- Add `xLabelCallback` to `KLineChart`.
- Rework `HeatList`.

## 1.1.1

- Fix a naming conflict in `HeatList`.

## 1.1.0

- Add the Canvas components `HotWords` and `DataScatter`.
- Rework `KLineChart` to follow the standard presentation more closely.
- Fix `isLegendShow`, and add `showTooltip` and `showSymbol` to `LineChart`.
- Add the `WordCloud` chart.
- Add the `ProgressBar` pictogram.
- Add the `RadarSpan` Canvas component.
- Handle a y-axis of `[0]` in `BarChart3D`.
- Adjust the map rendering scale in `ScatterCurveMap`.

## 1.0.4

- Fix `window.AMap.MarkerClusterer is not a constructor` in `AMapCluster`.
- Fix the map rendering in `ScatterCurveMap`.

## 1.0.3

- Request the JSON over HTTP in `ScatterCurveMap`.

## 1.0.2

- Fix a propTypes warning in `KLineChart`.

## 1.0.1

- Re-run gulp and publish `lib`.

## 1.0.0

- Load the third-party map libraries over HTTPS rather than HTTP.
- Set `async` to false in `AMapDistrictCluster`.
- Fix a propTypes warning in `GraphChart`.
- Fix an undefined `bar` warning in `KLineChart`.

## 0.9.10

- Fix `src/components/index.js`.
