import React from 'react';
import PropTypes from 'prop-types';
import BaiduMapControlBase from './BaiduMapControlBase';

// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
const disZoomMap = [[50, 18], [100, 17], [200, 16], [500, 15], [1000, 14], [2000, 13], [5000, 12],
  [10000, 11], [20000, 10], [25000, 9], [50000, 8], [100000, 7], [200000, 6], [500000, 5],
  [1000000, 4], [2000000, 3],
];
class BaiduMapHeatMap extends BaiduMapControlBase {
  render() {
    const {
      style = {},
      point,
      datas,
      radius = 20,
      opacity = 0,
      gradient = {
        0.45: 'rgb(0,0,255)',
        0.55: 'rgb(0,255,255)',
        0.65: 'rgb(0,255,0)',
        0.95: 'yellow',
        1.0: 'rgb(255,0,0)',
      },
      ...superProps
    } = this.props;
    const initControl = this.initMapControl;
    const random = Math.random();
    window[`mapload${random.toString().substr(2)}`] = mapLoad;
    if (typeof window.BMap === 'undefined') {
      loadScript();
    } else {
      setTimeout(mapLoad, 0);
    }
    function loadScript() {
      const script = document.createElement('script');
      script.src = `http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapload${random.toString().substr(2)}`;
      document.body.appendChild(script);
    }

    function mapLoad() {
      const BMap = window.BMap;
      const map = new BMap.Map(`map${random}`);
      let center;
      if (!point) {
        if (datas.length === 1) {
          center = new BMap.Point(datas[0].lng, datas[0].lat);
          map.centerAndZoom(center, 13);
        } else {
          // 计算最佳中心点和设置初始比例尺
          let distance = 0;
          let centerLng;
          let centerLat;
          for (let i = 0; i < datas.length - 1; i++) {
            for (let j = i; j < datas.length; j++) {
              const newDis = map.getDistance(new BMap.Point(datas[i].lng, datas[i].lat),
                new BMap.Point(datas[j].lng, datas[j].lat));
              if (newDis > distance) {
                centerLng = (datas[i].lng + datas[j].lng) / 2;
                centerLat = (datas[i].lat + datas[j].lat) / 2;
                distance = newDis;
              }
            }
          }
          center = new BMap.Point(centerLng, centerLat);
          const tempFilter = disZoomMap.filter(item => item[0] > distance);
          if (tempFilter.length > 1) {
            map.centerAndZoom(center, tempFilter[0][1] > 16 ? 18 : (tempFilter[0][1] + 2));
          }
        }
      } else {
        center = new BMap.Point(point.lng, point.lat);
        map.centerAndZoom(center, 13);
      }
      initControl(map, superProps);
      map.clearOverlays();
      const script2 = document.createElement('script');
      script2.async = true;
      script2.type = 'text/javascript';
      script2.src = 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js';
      document.head.appendChild(script2);
      script2.onload = () => {
        const heatmapOverlay = new window.BMapLib.HeatmapOverlay({ radius, opacity, gradient });
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({ data: datas, max: 100 });
        heatmapOverlay.show();
      };
    }

    return (
      <div id={`map${random}`} style={{ height: '100%', width: '100%', ...style }} />
    );
  }
}

BaiduMapHeatMap.propTypes = {
  style: PropTypes.object,
  point: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  // disableDragging: PropTypes.bool,
  datas: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
  opacity: PropTypes.number,
  radius: PropTypes.number,
  gradient: PropTypes.object,
};

export default BaiduMapHeatMap;
