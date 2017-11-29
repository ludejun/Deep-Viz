import React from 'react';
import PropTypes from 'prop-types';

class AMapIndoor extends React.Component {
  componentDidMount() {
    window.mapRender = this.mapRender.bind(this);
    if (!window.AMap) {
      const script = document.createElement('script');
      script.src = 'http://webapi.amap.com/maps?v=1.3&key=5f47a71f72692f5e7160f7b577d72a82&callback=mapRender';
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

    // const { mapStyle = 'normal' } = this.props;
    const mapStyle = 'normal';
    const {
      dragEnable = true,
      zoomEnable = true,
    } = this.props;
    this.amap = new window.AMap.Map('ampContainer', {
      resizeEnable: true,
      center: [point.lng, point.lat],
      zoom: 18,
      scrollWheel: false,
      showIndoorMap: true,
      mapStyle: `amap://styles/${mapStyle}`,
      dragEnable,
      zoomEnable,
    });
  }

  render() {
    const { style = {} } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <div id="ampContainer" style={{ width: '100%', height: 630, ...style }} />
      </div>
    );
  }
}

AMapIndoor.propTypes = {
  style: PropTypes.object,
  point: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  dragEnable: PropTypes.bool,
  zoomEnable: PropTypes.bool,
};

export default AMapIndoor;
