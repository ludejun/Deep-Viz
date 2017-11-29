/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import BaiduMapControlBase from './BaiduMapControlBase';

// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
const disZoomMap = [[50, 18], [100, 17], [200, 16], [500, 15], [1000, 14], [2000, 13], [5000, 12],
  [10000, 11], [20000, 10], [25000, 9], [50000, 8], [100000, 7], [200000, 6], [500000, 5],
  [1000000, 4], [2000000, 3],
];
const random = Math.random();
const messageLabelMask = {};
class BaiduMapHeatMapWithPoint extends BaiduMapControlBase {
  showMessage(msg, point, map) {
    if (!msg) { return; }
    function MsgShow(mpoint, mmsg, mmap) {
      this._point = mpoint;
      this._msg = mmsg;
      this.map = mmap;
    }
    MsgShow.prototype = new window.BMap.Overlay();
    MsgShow.prototype.initialize = function () {
      const div = (this._div = document.createElement('div'));
      div.style.position = 'absolute';
      const divID = `map_tooltip_${Math.random()}`;
      div.id = divID;
      div.style.zIndex = window.BMap.Overlay.getZIndex(this._point.lat);
      // div.innerHTML = this._msg();
      setTimeout(() => {
        const section = ReactDom.render(this._msg(), document.getElementById(divID));
        div.appendChild(section);
      }, 0);
      this.map.getPanes().labelPane.appendChild(div);
      return div;
    };
    MsgShow.prototype.draw = function () {
      const pixel = this.map.pointToOverlayPixel(this._point);
      this._div.style.left = `${pixel.x}px`;
      this._div.style.top = `${pixel.y}px`;
    };
    return () => {
      const opts = {
        position: point,
        offset: new window.BMap.Size(-50, -50),
      };
      if (typeof msg === 'string') {
        if (messageLabelMask) {
          messageLabelMask.label = new window.BMap.Label(msg, opts);
          messageLabelMask.label.setStyle({
            color: 'black',
            borderColor: '#FFFFFF',
            textAlign: 'center',
            fontSize: '12px',
            height: '30px',
            width: '100px',
            lineHeight: '30px',
            borderRadius: '15px',
            fontFamily: '微软雅黑',
            boxShadow: '5px 5px 5px gray',
          });
          map.addOverlay(messageLabelMask.label);
        }
      } else if (typeof msg === 'function') {
        if (messageLabelMask) {
          messageLabelMask.label = new MsgShow(point, msg, map);
          map.addOverlay(messageLabelMask.label);
        }
      }
    };
  }

  removeMessage(map) {
    return () => {
      map.removeOverlay(messageLabelMask.label);
    };
  }

  mapLoad() {
    const {
      point,
      datas,
      points,
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
    this.initMapControl(map, superProps);
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

      Array.isArray(points) && (points.length > 0) && points.forEach((val) => {
        const curPoint = new BMap.Point(val.location.lng, val.location.lat);
        if (!val.icon) {
          function Circle(tpoint, color, cradius, tmap) {
            this.map = tmap;
            this._point = tpoint;
            this._color = color;
            this._radius = cradius;
          }
          Circle.prototype = new BMap.Overlay();
          Circle.prototype.initialize = () => {
            const div = (this._div = document.createElement('div'));
            div.style.position = 'absolute';
            div.style.borderRadius = '50%';
            div.style.width = `${this._radius}px`;
            div.style.height = `${this._radius}px`;
            div.style.background = this._color;
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            this.map.getPanes().labelPane.appendChild(div);
            return div;
          };
          Circle.prototype.draw = () => {
            const pixel = this.map.pointToOverlayPixel(this._point);
            this._div.style.left = `${pixel.x - this._radius / 2}px`;
            this._div.style.top = `${pixel.y - this._radius / 2}px`;
          };
          const circle = new Circle(
            curPoint,
            val.color || 'red',
            val.radius || 12,
            map,
          );
          map.addOverlay(circle);
          circle._div.addEventListener('mouseover', this.showMessage(val.name, curPoint, map));
          circle._div.addEventListener('mouseout', this.removeMessage(map));
        } else if (!val.icon.size) {
          console.log('请输入图片大小！');
        } else {
          const myIcon = new BMap.Icon(val.icon.url,
            new BMap.Size(val.icon.size.width, val.icon.size.height),
            val.icon.offsetSize && {
              imageOffset: (new BMap.Size(val.icon.offsetSize.width, val.icon.offsetSize.height)),
            },
          );
          myIcon.imageSize = new BMap.Size(val.icon.size.width, val.icon.size.height);
          const marker = new BMap.Marker(curPoint, { icon: myIcon });
          marker.addEventListener('mouseover', this.showMessage(val.name, curPoint, map));
          marker.addEventListener('mouseout', this.removeMessage(map));
          map.addOverlay(marker);
        }
      });
    };
  }

  render() {
    const {
      style = {},
    } = this.props;
    window[`mapload${random.toString().substr(2)}`] = this.mapLoad.bind(this);
    if (typeof window.BMap === 'undefined') {
      loadScript();
    } else {
      setTimeout(this.mapLoad.bind(this), 0);
    }
    function loadScript() {
      const script = document.createElement('script');
      script.src = `http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapload${random.toString().substr(2)}`;
      document.body.appendChild(script);
    }

    return (
      <div id={`map${random}`} style={{ height: '100%', width: '100%', ...style }} />
    );
  }
}

BaiduMapHeatMapWithPoint.propTypes = {
  style: PropTypes.object,
  point: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  datas: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
  opacity: PropTypes.number,
  radius: PropTypes.number,
  gradient: PropTypes.object,
  points: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    icon: PropTypes.shape({
      url: PropTypes.string.isRequired,
      size: PropTypes.shape({
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
      offsetSize: PropTypes.shape({
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    }),
    radius: PropTypes.number,
  })),
};

export default BaiduMapHeatMapWithPoint;
