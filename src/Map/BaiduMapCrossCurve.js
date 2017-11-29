import React from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import BaiduMapControlBase from './BaiduMapControlBase';

// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
const disZoomMap = [[50, 18], [100, 17], [200, 16], [500, 15], [1000, 14], [2000, 13], [5000, 12],
  [10000, 11], [20000, 10], [25000, 9], [50000, 8], [100000, 7], [200000, 6], [500000, 5],
  [1000000, 4], [2000000, 3],
];

const random = Math.random();

class BaiduMapCrossCurve extends BaiduMapControlBase {
  constructor(props) {
    super(props);
    this.color = props.colors || [
      '#FDB933',
      '#D64F44',
      '#00A6AC',
      '#1D953F',
      '#E0861A',
      '#45B97C',
      '#F3715C',
      '#F26522',
      '#7FB80E',
      '#63C5FA',
    ];
    this.symbol = [
      'circle',
      'rect',
      'roundRect',
      'triangle',
      'diamond',
      'pin',
      'arrow',
      'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
    ];
    this.EMap = null;
    this.myChart = null;
    this.customOverlays = [];
  }

  componentDidMount() {
    window[`mapload${random.toString().substr(2)}`] = this.mapload.bind(this);
    if (typeof BMap === 'undefined') {
      this.loadScript();
    } else {
      this.mapload();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.mapload(nextProps);
  }

  loadScript() {
    const script = document.createElement('script');
    script.src = `http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapload${random.toString().substr(2)}`;
    document.body.appendChild(script);
  }

  mapload(nextProps) {
    let currentProps = this.props;
    if (nextProps) {
      if (nextProps.point === this.props.point
        && nextProps.datas === this.props.datas
        && nextProps.direction === this.props.direction) {
        return;
      } else {
        currentProps = nextProps;
      }
    }
    const {
      direction,
      datas,
      point,
      tooltipFormat,
      labelFormat,
      radiusColor = '#4990E2',
    } = currentProps;
    if (this.EMap && this.customOverlays.length > 0) {
      this.customOverlays.forEach((overlay) => {
        this.EMap.removeOverlay(overlay);
      });
      this.customOverlays = [];
    }
    const planePath = this.symbol[6];
    const color = this.color;
    if (!this.myChart) {
      this.myChart = echarts.init(document.getElementById(`map${random}`));
    }
    const bmap = {
      roam: false,
    };
    const arrayCenter = [];
    arrayCenter.push(point.lng, point.lat, 100);
    const centerPoint = {
      name: point.name,
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      zlevel: 2,
      tooltip: {
        position: 'right',
        formatter: '{b}',
      },
      rippleEffect: {
        brushType: 'stroke',
        scale: 3,
      },
      symbolSize: 15,
      showEffectOn: 'render',
      data: [
        {
          name: point.name,
          value: arrayCenter,
        },
      ],
    };
    let totalValue = 0;
    datas.forEach((item) => {
      totalValue += item.value || 0;
    });
    const toPoints = {
      name: point.name,
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke',
        scale: 3,
      },
      tooltip: {
        position: 'right',
        formatter: tooltipFormat || null,
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: labelFormat || null,
        },
      },
      symbolSize: (val) => {
        return val[2] && totalValue > 0 ?
          parseInt((val[2] / totalValue) * 100, 10) / 4 : 10;
      },
      showEffectOn: 'render',
      itemStyle: {
        normal: {},
      },
      data: datas.map((dataItem, index) => {
        const valeArray = [];
        valeArray.push(
          dataItem.lng,
          dataItem.lat,
          dataItem.value || null,
        );
        return {
          name: dataItem.name,
          value: valeArray,
          itemStyle: {
            normal: {
              color: dataItem.color || color[index],
            },
          },
        };
      }),
    };
    const arrayFrom = [];
    arrayFrom.push(point.lng, point.lat);
    const data = datas.map((item, i) => {
      const itemArray = [];
      itemArray.push(item.lng, item.lat);
      return {
        fromName: direction === 'in' ? item.name : point.name,
        toName: direction === 'in' ? point.name : item.name,
        name: item.name,
        coords: direction === 'in' ? [itemArray, arrayFrom] : [arrayFrom, itemArray],
        lineStyle: {
          normal: {
            color: item.color || color[i],
          },
        },
      };
    });

    const lines = {
      type: 'lines',
      coordinateSystem: 'bmap',
      zlevel: 2,
      effect: {
        show: true,
        period: 2,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 8,
      },
      lineStyle: {
        normal: {
          width: 3,
          opacity: 0.7,
          curveness: 0.2,
        },
      },
      data,
    };

    const series = [];
    series.push(centerPoint, toPoints, lines);

    const option = {
      bmap,
      tooltip: {
        trigger: 'item',
      },
      series,
      color: ['#108EE9'],
    };
    this.myChart.setOption(option);
    this.EMap = this.myChart.getModel().getComponent('bmap').getBMap();
    const BMap = window.BMap;
    const topLeftNavigation = new BMap.NavigationControl();
    this.EMap.enableDragging();
    this.EMap.addControl(topLeftNavigation);
    const bmapPoint = new BMap.Point(point.lng, point.lat);
    const circle = this.props.radiusGradients || [];
    circle.forEach((item) => {
      const bmapCircle = new BMap.Circle(bmapPoint, item, {
        fillColor: radiusColor,
        fillOpacity: 0.3,
        strokeOpacity: 0.3,
        strokeColor: radiusColor,
        strokeWeight: 1,
      });
      this.EMap.addOverlay(bmapCircle);
      this.customOverlays.push(bmapCircle);
      const circleNorthEast = bmapCircle.getBounds().getNorthEast();
      const label = new BMap.Label(`${item / 1000}km`, {
        position: new BMap.Point(bmapPoint.lng, circleNorthEast.lat),
        offset: new BMap.Size(0, 0),
      });
      label.setStyle({
        color: '#fff',
        fontSize: '8px',
        border: 'none',
        backgroundColor: 'transparent',
      });
      this.EMap.addOverlay(label);
      this.customOverlays.push(label);
    });

    // 计算最佳中心点和设置初始比例尺
    let distance = 0;
    this.props.datas.forEach((item) => {
      const newDis = this.EMap.getDistance(new BMap.Point(item.lng, item.lat),
        new BMap.Point(point.lng, point.lat));
      distance = newDis > distance ? newDis : distance;
    });
    const tempFilter = disZoomMap.filter(item => item[0] > distance);
    this.EMap.centerAndZoom(new BMap.Point(point.lng, point.lat),
      tempFilter[0][1] > 16 ? 18 : (tempFilter[0][1] + 2));
    this.initMapControl(this.EMap, currentProps);
  }

  render() {
    const {
      style = {},
    } = this.props;

    return (
      <div id={`map${random}`} style={{ height: '100%', width: '100%', ...style }} />
    );
  }
}

BaiduMapCrossCurve.propTypes = {
  style: PropTypes.object,
  point: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    name: PropTypes.string,
  }).isRequired,
  radiusGradients: PropTypes.arrayOf(PropTypes.number),
  radiusColor: PropTypes.string,
  datas: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    name: PropTypes.string,
    value: PropTypes.number,
    color: PropTypes.string,
  })).isRequired,
  direction: PropTypes.string.isRequired,
  tooltipFormat: PropTypes.func,
  labelFormat: PropTypes.func,
};

export default BaiduMapCrossCurve;
