/* eslint-disable */
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import BaiduMapControlBase from './BaiduMapControlBase';

// BaiduMap zoom
// {50m,100m,200m,500m,1km,2km,5km,10km,20km,25km,50km,100km,200km,500km,1000km,2000km}
// index  18 - 3
const random = Math.random();
const messageLabelMask = {};
class BaiduMapPolygonWithPoint extends BaiduMapControlBase {

  showMessage(msg, point, map) {
    if (!msg) { return; }
    function MsgShow(mpoint, mmsg, mmap) {
      this._point = mpoint;
      this._msg = mmsg;
      this.map = mmap;
    }
    MsgShow.prototype = new window.BMap.Overlay();
    MsgShow.prototype.initialize = function () {
      console.log('initialize');
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
      circleColor = '#108EE9',
      labelColor = '#FFFFFF',
      datas,
      points,
      outsideLabel,
      zoomBias = 1,
      ...superProps
    } = this.props;
    const BMap = window.BMap;
    const map = new BMap.Map(`map${random}`);
    const center = new BMap.Point(point.lng, point.lat);

    this.initMapControl(map, superProps);

    map.clearOverlays();
    const circleStyle = {
      fillColor: circleColor,
      strokeColor: circleColor,
      strokeWeight: 1,
      strokeOpacity: 0.3,
      fillOpacity: 0.3,
    };

    const circleCenter = new BMap.Circle(center, 80, {
      fillColor: circleColor,
      strokeColor: circleColor,
      strokeWeight: 1,
      strokeOpacity: 0.8,
      fillOpacity: 0.8,
    });
    map.addOverlay(circleCenter);
    datas.sort((i, j) => {
      return i.radius - j.radius > 0;
    });

    const maxRadius = datas[datas.length - 1].radius;
    const allZooms = [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000];
    let i = 0;
    for (; i < allZooms.length; i++) {
      if (allZooms[i] >= maxRadius) {
        break;
      }
    }
    i = i - 1 < 0 ? 0 : i - 1;
    map.centerAndZoom(center, 18 - i);
    map.setMinZoom(18 - zoomBias - i < 3 ? 3 : (18 - zoomBias - i));
    map.setMaxZoom((18 + zoomBias) - i > 18 ? 18 : ((18 + zoomBias) - i));

    const circleOverlapList = datas.map((data) => {
      const tempCircle = new BMap.Circle(center, data.radius * 1000, circleStyle);
      map.addOverlay(tempCircle);
      return tempCircle;
    });

    datas.map((data, index) => {
      let startPoint;
      let midPoint;
      let endPoint;
      if (index === 0) {
        startPoint = center;
        midPoint = new BMap.Point(point.lng + 0.01, point.lat - 0.01);
        endPoint = new BMap.Point(point.lng + 0.06, point.lat - 0.01);
      } else {
        const currNorthEast = circleOverlapList[index].getBounds().getNorthEast();
        const prevNorthEast = circleOverlapList[index - 1].getBounds().getNorthEast();
        // 计算外部圆正东北点坐标((currLng-centerLng) * Math.sqrt(2) / 2)
        // centerLng 和 内部圆正东北点坐标((prevLng-centerLng) * Math.sqrt(2) / 2) +centerLat 的中心位置。
        startPoint = new BMap.Point(
          (((currNorthEast.lng - prevNorthEast.lng) * Math.sqrt(2)) / 4)
          + (((prevNorthEast.lng - center.lng) * Math.sqrt(2)) / 2) + center.lng,
          (((currNorthEast.lat - prevNorthEast.lat) * Math.sqrt(2)) / 4)
          + (((prevNorthEast.lat - center.lat) * Math.sqrt(2)) / 2) + center.lat,
        );
        midPoint = new BMap.Point(startPoint.lng + 0.005, startPoint.lat + 0.005);
        endPoint = new BMap.Point(startPoint.lng + 0.06, startPoint.lat + 0.005);
      }
      const polyline = new BMap.Polyline(
        [startPoint, midPoint, endPoint],
        { strokeColor: labelColor, strokeWeight: 1 });
      map.addOverlay(polyline);
      if (data.label) {
        const labelStartPoint = new BMap.Circle(startPoint, 50, {
          fillColor: labelColor,
          strokeColor: labelColor,
          strokeWeight: 1,
          strokeOpacity: 1,
          fillOpacity: 1,
        });
        let labelDom;
        if (typeof data.label === 'string') {
          labelDom = `${data.label}`;
        } else if (typeof data.label === 'object') {
          const dom = document.createElement('div');
          ReactDom.render(data.label, dom);
          labelDom = `${dom.innerHTML}`;
        }

        const label = new BMap.Label(`<div style="position: absolute; bottom: 0">${labelDom}</div>`, {
          position: midPoint,
          offset: new BMap.Size(5, 0),
        });
        label.setStyle({ border: '0', backgroundColor: null, color: labelColor });
        map.addOverlay(labelStartPoint);
        map.addOverlay(label);
      }
      return '';
    });

    if (outsideLabel) {
      const maxCircle = circleOverlapList[circleOverlapList.length - 1];
      const northEastPoint = maxCircle.getBounds().getNorthEast();
      const southEastPoint = new BMap.Point(
        northEastPoint.lng,
        (point.lat * 2) - northEastPoint.lat);
      const outsideStartPoint = new BMap.Point(
        (((southEastPoint.lng - point.lng) * Math.sqrt(2)) / 4)
        + (point.lng / 2) + (southEastPoint.lng / 2),
        (((southEastPoint.lat - point.lat) * Math.sqrt(2)) / 4)
        + (point.lat / 2) + (southEastPoint.lat / 2),
      );
      const outsideMidPoint = outsideStartPoint;
      const outsideEndPoint = new BMap.Point(outsideStartPoint.lng + 0.05, outsideStartPoint.lat);
      const polyline = new BMap.Polyline(
        [outsideStartPoint, outsideMidPoint, outsideEndPoint],
        { strokeColor: labelColor, strokeWeight: 1 });
      map.addOverlay(polyline);
      const outsideLabelStartPoint = new BMap.Circle(outsideStartPoint, 50, {
        fillColor: labelColor,
        strokeColor: labelColor,
        strokeWeight: 1,
        strokeOpacity: 1,
        fillOpacity: 1,
      });
      let outsideLabelDom;
      if (typeof outsideLabel === 'string') {
        outsideLabelDom = `${outsideLabel}`;
      } else if (typeof outsideLabel === 'object') {
        const tempDom = document.createElement('div');
        ReactDom.render(outsideLabel, tempDom);
        outsideLabelDom = `${tempDom.innerHTML}`;
      }

      const outsideMapLabel = new BMap.Label(`<div style="position: absolute; bottom: 0">${outsideLabelDom}</div>`, {
        position: outsideMidPoint,
        offset: new BMap.Size(5, 0),
      });
      outsideMapLabel.setStyle({ border: '0', backgroundColor: null, color: labelColor });
      map.addOverlay(outsideLabelStartPoint);
      map.addOverlay(outsideMapLabel);
    }

    Array.isArray(points) && (points.length > 0) && points.forEach((val) => {
      const curPoint = new BMap.Point(val.location.lng, val.location.lat);
      if (!val.icon) {
        function Circle(tpoint, color, radius, tmap) {
          this.map = tmap;
          this._point = tpoint;
          this._color = color;
          this._radius = radius;
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

BaiduMapPolygonWithPoint.propTypes = {
  style: PropTypes.object,
  point: PropTypes.object.isRequired,
  disableDragging: PropTypes.bool,
  circleColor: PropTypes.string,
  labelColor: PropTypes.string,
  datas: PropTypes.arrayOf(PropTypes.shape({
    radius: PropTypes.number.isRequired,
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  })).isRequired,
  outsideLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  zoomBias: PropTypes.number,
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

export default BaiduMapPolygonWithPoint;
