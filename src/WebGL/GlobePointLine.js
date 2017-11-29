import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts-gl';
import PropTypes from 'prop-types';

export default class GlobePointLine extends Component {
  constructor(props) {
    super(props);
    this.randomNumber = Math.round(Math.random() * 10000);
  }

  componentDidMount() {
    const chart = echarts.init(document.getElementById(`earth${this.randomNumber}`));
    const { config } = this.props;
    const option = {
      backgroundColor: 'transparent',
      globe: {
        baseTexture:
          config.baseTexture || require('../assets/imgs/data-1491890179041-Hkj-elqpe.jpg'),
        heightTexture:
          'heightTexture' in config &&
          config.heightTexture &&
          'show' in config.heightTexture &&
          config.heightTexture.show === false
            ? null
            : config.heightTexture && 'text' in config.heightTexture
              ? config.heightTexture.text
              : require('../assets/imgs/data-1491889019097-rJQYikcpl.jpg'),
        displacementScale: 0.1,
        shading: 'lambert',
        globeRadius: 85,
        top: '1%',

        light: {
          ambient: {
            intensity: 0.1,
          },
          main: {
            intensity: 1.5,
          },
        },
        layers: [
          {
            type: 'blend',
            show: config.blend && 'show' in config.blend ? config.blend.show : true,
            blendTo: 'emission',
            texture:
              config.blend && 'text' in config.blend
                ? config.blend.text
                : require('../assets/imgs/data-1491890291849-rJ2uee5ag.jpg'),
          },

          {
            type: 'overlay',
            show: config.overlay && 'show' in config.overlay ? config.overlay.show : true,
            texture:
              config.overlay && 'text' in config.overlay
                ? config.overlay.text
                : require('../assets/imgs/data-1491890092270-BJEhJg96l.png'),
            shading: 'lambert',
            distance: 5,
          },
        ],
      },
      series: [],
    };
    config.data &&
      config.data.length >= 0 &&
      config.data.forEach((item) => {
        const tmp = {};
        tmp.data = item.typeData;
        tmp.type = item.type;
        tmp.coordinateSystem = 'globe';
        tmp.coordinateSystem = 'globe';
        if (item.type === 'lines3D') {
          tmp.lineStyle = {};
          tmp.lineStyle.color = item.color;
          tmp.lineStyle.width = item.width;
          tmp.effect = { show: true };
        } else {
          tmp.itemStyle = {};
          tmp.itemStyle.color = item.color;
          tmp.symbol = item.symbol;
          tmp.symbolSize = item.symbolSize;
          tmp.label = {};
          tmp.label.show = !!item.itemStyle.formatter;
          tmp.label.position = item.itemStyle.position || 'top';
          tmp.label.formatter = item.itemStyle.formatter;
          tmp.label.textStyle = {};
          tmp.label.textStyle.color = item.itemStyle.color || '#005BAC';
          tmp.label.textStyle.fontSize = item.itemStyle.fontSize || 16;
          tmp.zLevel = 1000;
        }
        option.series.push({ ...tmp, ...item.option });
      });
    chart.setOption(option);
  }

  render() {
    return (
      <div
        id={`earth${this.randomNumber}`}
        style={{ width: 'inherit', height: 'inherit', ...this.props.style }}
      />
    );
  }
}
GlobePointLine.propTypes = {
  config: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
};
