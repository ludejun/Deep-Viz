import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as deepViz from '../src/index';

/**
 * The public surface is 44 components. These tests guard it against accidental
 * drift: a component renamed or dropped without a major version, or added
 * without a matching entry in types/index.d.ts.
 */
const EXPECTED = [
  // ECharts — cartesian
  'LineChart',
  'LineBarChart',
  'BarChartBasic',
  'BarHorizontal',
  'KLineChart',
  'HeatmapCartesian',
  'ScatterCartesian',
  'ScatterNet',
  // ECharts — other
  'PieChart',
  'RadarChart',
  'FunnelChart',
  'GraphChart',
  'WordCloud',
  // ECharts — geo
  'ShadeMap',
  'MapScatter',
  'ShadeMapScatter',
  // Baidu maps
  'BaiduMapPoint',
  'BaiduMapPolygon',
  'BaiduMapPolygonWithPoint',
  'BaiduMapHeatMap',
  'BaiduMapHeatMapWithPoint',
  'BaiduMapCrossCurve',
  // AMap
  'AMapCluster',
  'AMapIndoor',
  'AMapDistrictCluster',
  // Canvas
  'Gauge',
  'GaugePan',
  'CircleAnimate',
  'RainbowRain',
  'PillarList',
  'ScatterCurveMap',
  'ScratchOff',
  'RadarSpan',
  'HotWords',
  'DataScatter',
  // Pictogram
  'ImageBar',
  'ImagePercent',
  'ProgressBar',
  // SVG
  'PieChartSvg',
  'BallMove',
  'CirclePan',
  // WebGL
  'BarChart3D',
  'GlobePointLine',
  'ThreeModel',
];

describe('public API', () => {
  it('exports exactly the documented set of components', () => {
    expect(Object.keys(deepViz).sort()).toEqual([...EXPECTED].sort());
  });

  it.each(EXPECTED)('%s is a renderable component', (name) => {
    const exported = deepViz[name];
    expect(exported, `${name} is missing`).toBeDefined();
    expect(['function', 'object']).toContain(typeof exported);
  });

  it('declares a type for every export', () => {
    const declarations = readFileSync(resolve(process.cwd(), 'types/index.d.ts'), 'utf8');
    const undeclared = EXPECTED.filter(
      (name) => !new RegExp(`export const ${name}\\s*:`).test(declarations),
    );
    expect(undeclared).toEqual([]);
  });
});

describe('modern React compatibility', () => {
  it('uses no lifecycle React 19 removed', async () => {
    const { globSync } = await import('node:fs');
    const removed = ['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate'];
    const offenders = [];

    for (const file of globSync('src/**/*.js')) {
      const source = readFileSync(file, 'utf8');
      for (const hook of removed) {
        // UNSAFE_-prefixed versions are still supported.
        if (new RegExp(`(?<!UNSAFE_)\\b${hook}\\s*\\(`).test(source)) {
          offenders.push(`${file}: ${hook}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});
