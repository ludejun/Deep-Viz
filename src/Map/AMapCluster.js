import React from 'react';
import PropTypes from 'prop-types';

export default class AMapCluster extends React.Component {
  componentDidMount() {
    window.mapRender = this.mapRender.bind(this);
    if (!window.AMap) {
      const script = document.createElement('script');
      script.src = 'https://webapi.amap.com/maps?v=1.3&key=5f47a71f72692f5e7160f7b577d72a82&callback=mapRender';
      document.head.appendChild(script);
    } else {
      this.mapRender(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof window.AMap !== 'undefined' && nextProps) {
      this.mapRender(nextProps);
    }
  }

  mapRender(props) {
    let point;
    if (props && props.point !== this.props.point) {
      point = props.point;
    } else {
      point = this.props.point;
    }

    this.markers = [];
    const {
      dragEnable = true,
      zoomEnable = true,
      bgColor,
      fontColor,
      borderColor,
      width,
      borderRadius,
      boxShadow,
      innerHTML,
    } = this.props;

    this.amap = new window.AMap.Map('ampContainer', {
      center: [105, 34],
      zoom: 4,
      scrollWheel: false,
      dragEnable,
      zoomEnable,
    });

    point.forEach((value) => {
      this.markers.push(new window.AMap.Marker({
        position: value.lnglat,
        content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        offset: new window.AMap.Pixel(-15, -15),
      }));
    });

    const count = this.markers.length;
    this._renderCluserMarker = (context) => {
      const div = document.createElement('div');
      const Hue = 180 - (context.count / count) ** (1 / 18) * 180;
      const bgColors = bgColor || `hsla(${Hue}, 100%, 50%, 0.7)`;
      const fontColors = fontColor || `hsla(${Hue}, 100%, 20%, 1)`;
      const borderColors = borderColor || `hsla(${Hue}, 100%, 40%, 1)`;
      const shadowColors = `hsla(${Hue}, 100%, 50%, 1)`;
      div.style.backgroundColor = bgColors;
      const size = Math.round(30 + (context.count / count) ** (1 / 5) * 20);
      div.style.width = div.style.height = width || `${size}px`;
      div.style.border = `solid 1px ${borderColors}`;
      div.style.borderRadius = borderRadius || `${size / 2}px`;
      div.style.boxShadow = boxShadow || `0 0 1px ${shadowColors}`;
      div.innerHTML = innerHTML || context.count;
      div.style.lineHeight = `${size}px`;
      div.style.color = fontColors;
      div.style.fontSize = '14px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new window.AMap.Pixel(-size / 2, -size / 2));
      context.marker.setContent(div);
    };

    const that = this;
    window.AMap.plugin(['AMap.MarkerClusterer', 'AMap.ToolBar'], () => { // 异步
      that.amap.addControl(new window.AMap.ToolBar());
      that.cluster = new window.AMap.MarkerClusterer(
        that.amap, that.markers, { gridSize: 80, renderCluserMarker: that._renderCluserMarker },
      );
    });
  }
  render() {
    const { style = {} } = this.props;
    return (
      <div>
        <div id="ampContainer" style={{ width: '100%', height: 500, ...style }} />
      </div>
    );
  }
}

AMapCluster.propTypes = {
  style: PropTypes.object,
  point: PropTypes.array,
  dragEnable: PropTypes.bool,
  zoomEnable: PropTypes.bool,
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  borderColor: PropTypes.string,
  width: PropTypes.string,
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string,
  innerHTML: PropTypes.string,
};
