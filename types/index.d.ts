// Type definitions for deep-viz
// Project: https://github.com/ludejun/Deep-Viz
//
// The components are written in JavaScript with propTypes; these declarations
// mirror those propTypes. Where a prop is passed straight through to ECharts or
// to the Baidu/AMap SDK it is typed as a plain record rather than invented,
// so the types stay honest about what is actually validated.

import type { ComponentType, CSSProperties, ReactElement } from 'react';

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

/** An arbitrary ECharts option fragment, merged into the generated option. */
export type EChartsOptionFragment = Record<string, unknown>;

/** ECharts event name -> handler, forwarded to echarts-for-react. */
export type EChartsEvents = Record<string, (params: never, instance: never) => void>;

/** Tooltip formatter, receiving ECharts' raw tooltip params. */
export type TooltipFormatter = (params: never) => string;

/** Props every ECharts-backed chart accepts. */
export interface EChartsCommonProps {
  /** Inline styles for the chart container. Set a height here. */
  style?: CSSProperties;
  /** ECharts events to bind, e.g. `{ click: (p) => … }`. */
  onEvents?: EChartsEvents;
}

/** A WGS84/BD09 coordinate pair, as the map SDKs expect it. */
export interface LatLng {
  lat: number;
  lng: number;
}

/** Pixel dimensions for a marker icon. */
export interface IconSize {
  width?: number | string;
  height?: number | string;
}

/** A marker icon loaded from a URL. */
export interface MarkerIcon {
  url: string;
  size?: IconSize;
  offsetSize?: IconSize;
}

/** A single marker on a Baidu map. */
export interface MapMarker {
  /** Label text, or a function returning it. */
  name?: string | ((...args: never[]) => string);
  location: LatLng;
  icon?: MarkerIcon;
  radius?: number;
}

/** A weighted point for the heat map layers. */
export interface HeatMapPoint extends LatLng {
  count: number;
}

/** Shared options for the Baidu map base component. */
export interface BaiduMapControlProps {
  mapStyle?:
    | 'light'
    | 'dark'
    | 'redalert'
    | 'googlelite'
    | 'grassgreen'
    | 'midnight'
    | 'pink'
    | 'darkgreen'
    | 'grayscale';
  disableDragging?: boolean;
  navigationControl?: boolean;
  disableMapRuler?: boolean;
  showMapType?: boolean;
}

// ---------------------------------------------------------------------------
// ECharts — cartesian charts
// ---------------------------------------------------------------------------

export interface LineChartProps extends EChartsCommonProps {
  /** Series colours, in order. */
  color?: string[];
  config: {
    x: EChartsOptionFragment;
    y: EChartsOptionFragment[];
    title?: string;
    subtitle?: string;
    dataZoom?: EChartsOptionFragment;
    grid?: EChartsOptionFragment;
    toolbox?: boolean;
  };
  onTooltipFormat?: TooltipFormatter;
}
export const LineChart: ComponentType<LineChartProps>;

/** Same shape as {@link LineChartProps}: bars and lines on one cartesian grid. */
export type LineBarChartProps = LineChartProps;
export const LineBarChart: ComponentType<LineBarChartProps>;

export interface BarChartBasicProps extends EChartsCommonProps {
  color?: string[];
  config: {
    x: EChartsOptionFragment;
    y: EChartsOptionFragment;
    title?: string;
    subtitle?: string;
    dataZoom?: EChartsOptionFragment;
    grid?: EChartsOptionFragment;
    toolbox?: boolean;
    datalable?: EChartsOptionFragment;
  };
  onTooltipFormat?: TooltipFormatter;
}
export const BarChartBasic: ComponentType<BarChartBasicProps>;

export interface BarHorizontalProps extends EChartsCommonProps {
  color?: string[];
  config: {
    x: EChartsOptionFragment;
    y: EChartsOptionFragment;
    title?: string;
    subtitle?: string;
    grid?: EChartsOptionFragment;
    toolbox?: boolean;
    datalable?: EChartsOptionFragment;
    /** Track drawn behind each bar. */
    shadowBar?: EChartsOptionFragment;
  };
}
export const BarHorizontal: ComponentType<BarHorizontalProps>;

export interface KLineChartProps extends EChartsCommonProps {
  color?: string[];
  config: {
    x: EChartsOptionFragment;
    y: {
      /** Candles, as [open, close, low, high] tuples. */
      kData: unknown[];
      lineData?: unknown[];
      legend?: unknown[];
      position?: string;
      name?: string;
    };
    upColor?: string;
    downColor?: string;
    bar?: EChartsOptionFragment;
    dataZoom?: EChartsOptionFragment;
    grid?: EChartsOptionFragment;
    tooltipColor?: string;
    tooltipShow?: boolean;
    crossLabelBackcolor?: string;
  };
  onTooltipFormat?: TooltipFormatter;
}
export const KLineChart: ComponentType<KLineChartProps>;

export interface HeatmapCartesianProps {
  config: {
    data?: unknown[];
    x?: EChartsOptionFragment;
    y?: EChartsOptionFragment;
  };
  width?: string;
}
export const HeatmapCartesian: ComponentType<HeatmapCartesianProps>;

export interface ScatterCartesianProps extends EChartsCommonProps {
  dataConfig?: {
    options: EChartsOptionFragment;
    grid?: EChartsOptionFragment;
    title?: EChartsOptionFragment;
    color?: string[];
  };
  onTooltipFormat?: TooltipFormatter;
}
export const ScatterCartesian: ComponentType<ScatterCartesianProps>;

export interface ScatterNetProps {
  config?: {
    x: EChartsOptionFragment;
    y: EChartsOptionFragment;
    data: unknown[];
  };
}
export const ScatterNet: ComponentType<ScatterNetProps>;

// ---------------------------------------------------------------------------
// ECharts — non-cartesian charts
// ---------------------------------------------------------------------------

export interface PieChartProps extends EChartsCommonProps {
  color?: string[];
  config: {
    data: Array<{ name?: string; value?: number; [key: string]: unknown }>;
    legend?: EChartsOptionFragment;
    /** Renders a donut; the object carries the inner/outer radii. */
    concentric?: EChartsOptionFragment;
    roseType?: string | boolean;
    title?: string;
    subtitle?: string;
    grid?: EChartsOptionFragment;
    toolbox?: boolean;
  };
  onTooltipFormat?: TooltipFormatter;
}
export const PieChart: ComponentType<PieChartProps>;

export interface RadarChartProps extends EChartsCommonProps {
  color?: string[];
  config: {
    indicator: unknown[];
    values: unknown[];
    max: number;
    name?: string;
    position?: string;
    radius: number | string;
    formatter?: boolean;
    paddingColor?: string;
    lineColor?: string;
    textStyle?: EChartsOptionFragment;
    grid?: EChartsOptionFragment;
    toolbox?: boolean;
  };
  onTooltipFormat?: TooltipFormatter;
}
export const RadarChart: ComponentType<RadarChartProps>;

export interface FunnelChartProps extends EChartsCommonProps {
  config: {
    sort?: string;
    label?: EChartsOptionFragment;
    data?: unknown[];
    max: number;
    min: number;
    grid?: EChartsOptionFragment;
    toolbox?: boolean;
  };
  onTooltipFormat?: TooltipFormatter;
}
export const FunnelChart: ComponentType<FunnelChartProps>;

export interface GraphChartProps extends EChartsCommonProps {
  config: {
    data: unknown[];
    links: unknown[];
    categories: unknown[];
    legend: EChartsOptionFragment;
    title?: string;
    subtitle?: string;
    draggable?: boolean;
    toolbox?: boolean;
  };
  onTooltipFormat?: TooltipFormatter;
}
export const GraphChart: ComponentType<GraphChartProps>;

export interface WordCloudProps extends EChartsCommonProps {
  config: {
    data: Array<{ name?: string; value?: number; [key: string]: unknown }>;
    gridSize?: number;
    sizeRange?: number[];
    rotationRange?: number[];
    rotationStep?: number;
    left?: string;
    right?: string;
    center?: string;
    bottom?: string;
    width?: string;
    height?: string;
    fontFamily?: string;
    fontWeight?: string;
    title?: string;
    subtitle?: string;
  };
  onTooltipFormat?: TooltipFormatter;
}
export const WordCloud: ComponentType<WordCloudProps>;

// ---------------------------------------------------------------------------
// ECharts — geo maps
// ---------------------------------------------------------------------------

/** Styling for the base geo layer shared by the shaded-map components. */
export interface GeoMapConfig {
  areaColor?: string;
  hoverColor?: string;
  borderWidth?: number | string;
  borderColor?: string;
}

export interface ShadeMapProps extends EChartsCommonProps {
  mapConfig?: GeoMapConfig;
  dataConfig: {
    title?: EChartsOptionFragment;
    visualMap?: EChartsOptionFragment;
    tooltip?: boolean;
    backgroundcolor?: string;
    name?: string;
    value?: number;
  };
}
export const ShadeMap: ComponentType<ShadeMapProps>;

export interface MapScatterProps extends EChartsCommonProps {
  title?: EChartsOptionFragment;
  /** Place name -> [lng, lat]. */
  geoCoordMap?: Record<string, [number, number]>;
  mapConfig?: GeoMapConfig;
  dataConfig: {
    name?: string;
    symbol?: string;
    color?: string;
    data?: unknown[];
  };
  onTooltipFormat?: TooltipFormatter;
}
export const MapScatter: ComponentType<MapScatterProps>;

export interface ShadeMapScatterProps extends EChartsCommonProps {
  title?: EChartsOptionFragment;
  geoCoordMap?: Record<string, [number, number]>;
  mapConfig?: GeoMapConfig;
  dataConfig: {
    scatterOptions?: {
      name?: string;
      symbol?: string;
      color?: string;
      data?: unknown[];
    };
    shadeOptions: {
      province?: unknown[];
      visualMap?: EChartsOptionFragment;
    };
  };
  onTooltipFormat?: TooltipFormatter;
}
export const ShadeMapScatter: ComponentType<ShadeMapScatterProps>;

// ---------------------------------------------------------------------------
// E-maps — Baidu
// ---------------------------------------------------------------------------

export interface BaiduMapPointProps extends BaiduMapControlProps {
  style?: CSSProperties;
  centerPoint?: LatLng;
  points: MapMarker[];
  initZoom?: number;
}
export const BaiduMapPoint: ComponentType<BaiduMapPointProps>;

export interface BaiduMapPolygonProps extends BaiduMapControlProps {
  style?: CSSProperties;
  point: LatLng;
  circleColor?: string;
  labelColor?: string;
  /** Concentric rings, each with a radius in metres and a label. */
  datas: Array<{ radius: number; label: ReactElement | string }>;
  outsideLabel?: ReactElement | string;
  zoomBias?: number;
}
export const BaiduMapPolygon: ComponentType<BaiduMapPolygonProps>;

export interface BaiduMapPolygonWithPointProps extends BaiduMapPolygonProps {
  points?: MapMarker[];
}
export const BaiduMapPolygonWithPoint: ComponentType<BaiduMapPolygonWithPointProps>;

export interface BaiduMapHeatMapProps extends BaiduMapControlProps {
  style?: CSSProperties;
  point?: LatLng;
  datas: HeatMapPoint[];
  opacity?: number;
  radius?: number;
  /** Stop (0–1 as a string) -> colour. */
  gradient?: Record<string, string>;
}
export const BaiduMapHeatMap: ComponentType<BaiduMapHeatMapProps>;

export interface BaiduMapHeatMapWithPointProps extends BaiduMapHeatMapProps {
  points?: MapMarker[];
}
export const BaiduMapHeatMapWithPoint: ComponentType<BaiduMapHeatMapWithPointProps>;

export interface BaiduMapCrossCurveProps extends BaiduMapControlProps {
  style?: CSSProperties;
  /** The hub the curves radiate from. */
  point: LatLng & { name?: string };
  radiusGradients?: number[];
  radiusColor?: string;
  datas: Array<LatLng & { name?: string; value?: number; color?: string }>;
  direction: string;
  tooltipFormat?: (...args: never[]) => string;
  labelFormat?: (...args: never[]) => string;
}
export const BaiduMapCrossCurve: ComponentType<BaiduMapCrossCurveProps>;

// ---------------------------------------------------------------------------
// E-maps — AMap
// ---------------------------------------------------------------------------

export interface AMapClusterProps {
  style?: CSSProperties;
  point?: unknown[];
  dragEnable?: boolean;
  zoomEnable?: boolean;
  bgColor?: string;
  fontColor?: string;
  borderColor?: string;
  width?: string;
  borderRadius?: string;
  boxShadow?: string;
  innerHTML?: string;
}
export const AMapCluster: ComponentType<AMapClusterProps>;

export interface AMapIndoorProps {
  style?: CSSProperties;
  point: LatLng;
  dragEnable?: boolean;
  zoomEnable?: boolean;
}
export const AMapIndoor: ComponentType<AMapIndoorProps>;

export interface AMapDistrictClusterProps {
  style?: CSSProperties;
  labelConfig?: {
    type: string;
    fillStyle: string;
    color: string;
  };
}
export const AMapDistrictCluster: ComponentType<AMapDistrictClusterProps>;

// ---------------------------------------------------------------------------
// Canvas
// ---------------------------------------------------------------------------

export interface GaugeProps {
  /** Animates from the previous value to this one. */
  value?: number;
}
export const Gauge: ComponentType<GaugeProps>;

export interface GaugePanProps {
  /** Animates the needle to this number. */
  number?: number;
  startNumber?: number;
  numberInterval?: number;
  unit?: string;
  leftLabel?: string;
  rightLabel?: string;
  displayLable?: boolean;
}
export const GaugePan: ComponentType<GaugePanProps>;

export interface CircleAnimateProps {
  width?: number;
  height?: number;
}
export const CircleAnimate: ComponentType<CircleAnimateProps>;

export interface RainbowRainProps {
  width?: number;
  height?: number;
}
export const RainbowRain: ComponentType<RainbowRainProps>;

export interface PillarListProps {
  data: unknown[];
}
export const PillarList: ComponentType<PillarListProps>;

export interface ScatterCurveMapProps {
  mapConfig: {
    /** GeoJSON consumed by the curve layer. */
    map: EChartsOptionFragment;
  };
}
export const ScatterCurveMap: ComponentType<ScatterCurveMapProps>;

export interface ScratchOffProps {
  width?: number | string;
  height?: number | string;
  /** The image or colour revealed underneath. */
  background?: string;
  textContent?: string;
  textColor?: string;
  scratchPosition?: unknown;
  earserOpt?: EChartsOptionFragment;
}
export const ScratchOff: ComponentType<ScratchOffProps>;

export interface RadarSpanProps {
  theme?: string;
}
export const RadarSpan: ComponentType<RadarSpanProps>;

export interface HotWordsProps {
  words?: unknown[];
  speed?: number;
  circleOutline?: boolean;
}
/** Exported from src/Canvas/HeatList. */
export const HotWords: ComponentType<HotWordsProps>;

export interface DataScatterProps {
  items?: unknown[];
  row?: number;
  col?: number;
}
export const DataScatter: ComponentType<DataScatterProps>;

// ---------------------------------------------------------------------------
// Pictogram
// ---------------------------------------------------------------------------

export interface ImageBarProps {
  dataList: Array<{
    /** URL of the image tiled to fill the bar. */
    itemImage: string;
    percent: number;
    color?: string;
  }>;
  /** Bar orientation; defaults to horizontal. */
  direction?: 'x' | 'y';
}
export const ImageBar: ComponentType<ImageBarProps>;

export interface ImagePercentProps {
  dataList: Array<{
    /** Image URL, or an element to render in its place. */
    itemImage: string | ReactElement;
    percent?: string | number;
    color?: string;
    name?: string;
  }>;
}
export const ImagePercent: ComponentType<ImagePercentProps>;

export interface ProgressBarProps {
  data: Array<{
    name: string;
    value: number;
    backgroundColor?: string;
  }>;
  config?: {
    unit?: string;
    namePosition?: string;
    height?: string;
    margin?: string;
    color?: string;
    fontSize?: string;
  };
}
export const ProgressBar: ComponentType<ProgressBarProps>;

// ---------------------------------------------------------------------------
// SVG
// ---------------------------------------------------------------------------

export interface PieChartSvgProps {
  data: Array<{ name?: string; value: number }>;
  color?: string[];
  unit?: string;
  width?: number;
  height?: number;
}
export const PieChartSvg: ComponentType<PieChartSvgProps>;

export interface BallMoveProps {
  ballColor?: string;
  width?: string;
}
export const BallMove: ComponentType<BallMoveProps>;

export interface CirclePanProps {
  data: unknown[];
}
export const CirclePan: ComponentType<CirclePanProps>;

// ---------------------------------------------------------------------------
// WebGL
// ---------------------------------------------------------------------------

export interface BarChart3DProps {
  config: { data: unknown[] };
}
export const BarChart3D: ComponentType<BarChart3DProps>;

export interface GlobePointLineProps {
  config: { data: unknown[] };
}
export const GlobePointLine: ComponentType<GlobePointLineProps>;

export interface ThreeModelProps {
  width?: number | string;
  height?: number | string;
  /** Path to the .obj model to load. */
  modelPath?: string;
  /** @deprecated No longer supported — pass `modelPath` instead. */
  modelType?: string;
  pointLightColor?: string;
  pointLightPosition?: number[];
  ambientLightColor?: string;
  cameraY?: number;
  cameraZ?: number;
  isOnMouseMove?: boolean;
  rotatateY?: number;
  /** Called while the model downloads. */
  onProgress?: (loaded: number, total: number, item?: string) => void;
  /** Called if the model fails to load; otherwise the failure is logged. */
  onError?: (error: unknown) => void;
}
export const ThreeModel: ComponentType<ThreeModelProps>;
