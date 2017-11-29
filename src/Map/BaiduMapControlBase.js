import React from 'react';
import PropTypes from 'prop-types';

class BaiduMapControlBase extends React.Component {
  initMapControl(map, props) {
    const BMap = window.BMap;
    const { disableDragging = false, mapStyle = 'midnight', navigationControl = true, disableMapRuler = false, showMapType = true } = props;
    if (navigationControl) {
      map.addControl(new BMap.NavigationControl());
    }

    map.setMapStyle({ style: mapStyle });

    if (disableDragging) {
      map.disableDragging();
    } else {
      map.enableDragging();
    }
    if (!disableMapRuler) {
      map.addControl(new BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT }));
    }
    if (showMapType) {
      map.addControl(new BMap.MapTypeControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }
  }
}

BaiduMapControlBase.propTypes = {
  mapStyle: PropTypes.oneOf(['light', 'dark', 'redalert', 'googlelite', 'grassgreen', 'midnight', 'pink', 'darkgreen', 'grayscale']),
  disableDragging: PropTypes.bool,
  navigationControl: PropTypes.bool,
  disableMapRuler: PropTypes.bool,
  showMapType: PropTypes.bool,
};

export default BaiduMapControlBase;
