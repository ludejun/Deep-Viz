/* eslint max-len: ["error", 180] */
import React from 'react';
import PropTypes from 'prop-types';
import './amp.less';

class AMapDistrictCluster extends React.Component {
  componentDidMount() {
    window.mapRender = this.mapRender.bind(this);
    if (!window.AMap) {
      const script = document.createElement('script');
      script.src = 'http://webapi.amap.com/maps?v=1.3&key=5f47a71f72692f5e7160f7b577d72a82&callback=mapRender&plugin=AMap.ToolBar';
      document.head.appendChild(script);
    } else {
      this.mapRender();
    }
    const script2 = document.createElement('script');
    script2.async = true;
    script2.type = 'text/javascript';
    script2.src = 'http://webapi.amap.com/ui/1.0/main.js?v=1.0.11';
    document.head.appendChild(script2);
    script2.onload = () => {
      // 加载相关组件
      window.AMapUI.load(['ui/geo/DistrictCluster', 'lib/$', 'lib/utils'], (DistrictCluster, $, utils) => {
        window.DistrictCluster = DistrictCluster;
        // 启动页面
        if (this.props.labelConfig) {
          this.initPage(DistrictCluster, $, utils);
        } else if (!this.props.labelConfig) {
          this.initPage1(DistrictCluster, $, utils);
        }
      });
    };
  }

  mapRender() {
    this.amap = new window.AMap.Map('ampClusterContainer', {
      zoom: 4,
      center: [139.1, 234.5],
    });
    this.amap.addControl(new window.AMap.ToolBar());
  }

  initPage1(DistrictCluster, $) {
    const distCluster = new DistrictCluster({
      map: this.amap,
      getPosition(item) {
        if (!item) {
          return null;
        }
        const parts = item.split(',');
        // 返回经纬度
        return [parseFloat(parts[0]), parseFloat(parts[1])];
      },
    });
    window.distCluster = distCluster;

    $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
    // $.get('http://a.amap.com/amap-ui/static/data/10w.txt', (csv) => {
    $('#loadingTip').remove();
    distCluster.setData(this.props.point);
    // });
  }

  initPage(DistrictCluster, $, utils) {
    const map = this.amap;
    const that = this;
    function MyRender(ctx, polygons, styleOptions, feature, dataItems) {
      MyRender.__super__.constructor.call(this, ctx, polygons, styleOptions, feature, dataItems);
    }
    // 继承默认引擎
    utils.inherit(MyRender, DistrictCluster.Render.Default);
    utils.extend(MyRender.prototype, {
      drawFeaturePolygons(ctx, polygons, styleOptions, feature, dataItems) {
        // 调用父类方法
        MyRender.__super__.drawFeaturePolygons.call(this, ctx, polygons, styleOptions, feature, dataItems);
        // 直接绘制聚合信息
        this.drawMyLabel(feature, dataItems);
      },
      _initContainter(ctx, polygons, styleOptions, feature, dataItems) {
        // 调用父类方法
        MyRender.__super__._initContainter.call(this, ctx, polygons, styleOptions, feature, dataItems);
        this._createCanvas('mylabel', this._container);
      },
      drawMyLabel(feature, dataItems) {
        const pixelRatio = this.getPixelRatio(); // 高清下存在比例放大
        const pos = feature.properties.centroid || feature.properties.center;
        const containerPos = map.lngLatToContainer(pos);
        const labelCtx = this._getCanvasCxt('mylabel');

        // 文字的中心点
        const centerX = containerPos.getX() * pixelRatio;
        const centerY = containerPos.getY() * pixelRatio;
        labelCtx.save();

        labelCtx.font = `14 * ${pixelRatio}px 微软雅黑`;
        const text = `${feature.properties.name}(${dataItems.length})`;
        const textMetrics = labelCtx.measureText(text);
        const halfTxtWidth = textMetrics.width / 2;

        if (that.props.labelConfig.type === 'rect') {
          labelCtx.fillStyle = that.props.labelConfig.fillStyle || '#108EE9';
          labelCtx.fillRect(centerX - halfTxtWidth - 3 * pixelRatio,
            centerY - 11 * pixelRatio,
            textMetrics.width + 6 * pixelRatio,
            22 * pixelRatio);
          labelCtx.fillStyle = that.props.labelConfig.color || '#fff';
          labelCtx.textBaseline = 'middle';
          labelCtx.fillText(text, centerX - halfTxtWidth, centerY);
        } else if (that.props.labelConfig.type === 'circle') {
          labelCtx.beginPath();
          labelCtx.arc(centerX, centerY, halfTxtWidth * pixelRatio / 2, 0, 2 * Math.PI);
          labelCtx.fillStyle = that.props.labelConfig.fillStyle || '#108EE9';
          labelCtx.fill();
          labelCtx.closePath();
          labelCtx.fillStyle = that.props.labelConfig.color || '#fff';
          labelCtx.textBaseline = 'middle';
          labelCtx.fillText(text, centerX - halfTxtWidth, centerY);

          labelCtx.restore();
        }
      },
    });

    const distCluster = new DistrictCluster({
      zIndex: 200,
      map: this.amap,
      getPosition(item) {
        if (!item) {
          return null;
        }
        const parts = item.split(',');
        // 返回经纬度
        return [parseFloat(parts[0]), parseFloat(parts[1])];
      },
      renderConstructor: MyRender,
      renderOptions: {
        getClusterMarker: null,
        featureClickToShowSub: true,
        // featureStyle: {
        //   fillStyle: 'black',
        //   lineWidth: 5,
        //   strokeStyle:'red',
        //   hoverOptions: {
        //     fillStyle:'pink',
        //     lineWidth: 1,
        //     strokeStyle:'red',
        //   },
        // },
      },
    });
    window.distCluster = distCluster;

    $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
    // $.get('http://a.amap.com/amap-ui/static/data/10w.txt', (csv) => {
    $('#loadingTip').remove();
      // const data = csv.split('\n');
    distCluster.setData(this.props.point);
    // });
  }

  render() {
    const { style = {} } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <div id="ampClusterContainer" style={{ width: '100%', height: 630, ...style }} />
      </div>
    );
  }
}

export default AMapDistrictCluster;

AMapDistrictCluster.propTypes = {
  style: PropTypes.object,
  labelConfig: PropTypes.shape({
    type: PropTypes.string.isRequired,
    fillStyle: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};
