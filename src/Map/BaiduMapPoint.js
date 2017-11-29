/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BaiduMapControlBase from './BaiduMapControlBase';

const random = Math.random();

class BaiduMapPoint extends BaiduMapControlBase {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window[`mapload${random.toString().substr(2)}`] = this.mapload.bind(this);
    if (typeof BMap === 'undefined') {
      this.loadScript();
    } else {
      this.mapload();
    }
  }

  loadScript() {
    const script = document.createElement('script');
    script.src = `http://api.map.baidu.com/api?v=2.0&ak=C4f54f1b740bc62107184968edbb64fb&callback=mapload${random.toString().substr(2)}`;
    document.body.appendChild(script);
  }

  showMessage(msg, point, map, labelMask) {
    if (!msg) { return; }
    function MsgShow(point,msg,map) {
      this._point = point;
      this._msg = msg;
      this.map = map;
    }
    MsgShow.prototype = new BMap.Overlay();
    MsgShow.prototype.initialize = function() {
      const div = (this._div = document.createElement("div"));
      div.style.position = "absolute";
      const divID = 'map_tooltip_' + Math.random();
      div.id = divID;
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      // div.innerHTML = this._msg();
      setTimeout(()=>{
        const section = ReactDOM.render(this._msg(), document.getElementById(divID));
        div.appendChild(section);},0)
      this.map.getPanes().labelPane.appendChild(div);
      return div;
    };
    MsgShow.prototype.draw = function() {
      const pixel = this.map.pointToOverlayPixel(this._point);
      this._div.style.left = `${pixel.x}px`;
      this._div.style.top = `${pixel.y}px`;
    };
    return () => {
      const opts = {
        position: point,
        offset: new BMap.Size(-50, -50),
      };
      if(typeof msg === 'string'){
        labelMask.label = new BMap.Label(msg, opts);
        labelMask.label.setStyle({
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
        map.addOverlay(labelMask.label);
      }else if(typeof msg === 'function'){
        labelMask.label = new MsgShow(point,msg,map);
        map.addOverlay(labelMask.label);
      }
    };
  }

  removeMessage(map, labelMask) {
    return () => {
      map.removeOverlay(labelMask.label);
    };
  }

  mapload() {
    const {
      centerPoint,
      points,
      initZoom = 5,
      ...superProps
    } = this.props;
    const initControl = this.initMapControl;
    const BMap = window.BMap;
    const map = new BMap.Map(`map${random}`);
    initControl(map, superProps);
    map.clearOverlays();

    const center = new BMap.Point((centerPoint && centerPoint.lng) || points[0].location.lng, (centerPoint && centerPoint.lat) || points[0].location.lat);
    map.centerAndZoom(center, initZoom);

    Array.isArray(points) && (points.length > 0) && points.forEach((val) => {
      const point = new BMap.Point(val.location.lng, val.location.lat);
      if (!val.icon) {
        function Circle(point, color, radius, map) {
          this.map = map;
          this._point = point;
          this._color = color;
          this._radius = radius;
        }
        Circle.prototype = new BMap.Overlay();
        Circle.prototype.initialize = function() {
          const div = (this._div = document.createElement("div"));
          div.style.position = "absolute";
          div.style.borderRadius = "50%";
          div.style.width = `${this._radius}px`;
          div.style.height = `${this._radius}px`;
          div.style.background = this._color;
          div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
          this.map.getPanes().labelPane.appendChild(div);
          return div;
        };
        Circle.prototype.draw = function() {
          const pixel = this.map.pointToOverlayPixel(this._point);
          this._div.style.left = `${pixel.x - this._radius / 2}px`;
          this._div.style.top = `${pixel.y - this._radius / 2}px`;
        };
        const circle = new Circle(
          point,
          val.color || 'red',
          val.radius || 12,
          map
        );
        map.addOverlay(circle);
        const labelMask = {};
        circle._div.addEventListener('mouseover', this.showMessage(val.name, point, map, labelMask));
        circle._div.addEventListener('mouseout', this.removeMessage(map, labelMask));
      } else {
        if(!val.icon.size){console.log('请输入图片大小！')}else{
          const myIcon = new BMap.Icon(val.icon.url, new BMap.Size(val.icon.size.width, val.icon.size.height), val.icon.offsetSize && { imageOffset: (new BMap.Size(val.icon.offsetSize.width, val.icon.offsetSize.height)) });
          myIcon.imageSize = new BMap.Size(val.icon.size.width, val.icon.size.height);
          const marker = new BMap.Marker(point, { icon: myIcon });
          const labelMask = {};
          marker.addEventListener('mouseover', this.showMessage(val.name, point, map, labelMask));
          marker.addEventListener('mouseout', this.removeMessage(map, labelMask));
          map.addOverlay(marker);
        }
      }
    });
  }

  render() {
    const { style = {} } = this.props;
    return <div id={`map${random}`} style={{ height: '100%', width: '100%', ...style }} />
  }
}

BaiduMapPoint.propTypes = {
  style: PropTypes.object,
  centerPoint: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  // disableDragging: PropTypes.bool,
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
  })).isRequired,
  initZoom: PropTypes.number,
};

export default BaiduMapPoint;
