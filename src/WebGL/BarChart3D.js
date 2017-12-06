import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

import 'echarts-gl';

export default class BarChart3D extends Component {
  genXList(config) {
    if (config.y.data.length !== 1) {
      return config.x.data;
    } else {
      const list = [];
      for (let i = 0; i < config.x.data.length; i++) {
        list.push({ value: '' }, { value: config.x.data[i] });
      }
      list.push({ value: '' });
      return list;
    }
  }
  genOption(props) {
    const config = props.config;
    const option = {
      title: { ...('title' in config && config.title) },
      tooltip: {},
      xAxis3D: {
        name: '',
        type: 'category',
        ...('x' in config && config.x),
        data: this.genXList(config),
      },
      yAxis3D: {
        name: '',
        type: 'category',
        ...('y' in config && config.y),
      },
      zAxis3D: {
        name: '',
        type: 'value',
        ...('z' in config && config.z),
      },
      grid3D: {
        boxHeight: config.box && 'height' in config.box ? config.box.height : 10,
        boxWidth: config.box && 'width' in config.box ? config.box.width : 100,
        boxDepth: config.box && 'depth' in config.box ? config.box.depth : 80,
        viewControl: {
          zoomSensitivity: 0,
          // distance: 120,
          rotateSensitivity: 0,
          alpha: config.view && 'alpha' in config.view ? config.view.alpha : 0,
          beta: config.view && 'beta' in config.view ? config.view.beta : 40,
        },
        light: {
          main: {
            alpha: config.light && 'alpha' in config.light ? config.light.alpha : 40,
            beta: config.light && 'beta' in config.light ? config.light.beta : 40,
          },
        },
      },
      series: [],
      ...config.option,
    };
    if (config.data && Array.isArray(config.data)) {
      config.data.forEach((item, index) => {
        const color =
          props.color && Array.isArray(props.color)
            ? {
              itemStyle: {
                color: props.color[index],
              },
            }
            : {};
        // y only one row
        if (config.y.data.length === 1) {
          option.series.push({
            type: 'bar3D',
            shading: 'lambert',
            data: item.map((it, i) => {
              return {
                value: [2 * i + 1, 0, it],
              };
            }),
            ...color,
          });
        } else {
          option.series.push({
            type: 'bar3D',
            shading: 'lambert',
            data: item.map((i) => {
              return {
                value: [i[0], i[1], i[2]],
              };
            }),
            ...color,
          });
        }
      });
    }

    return option;
  }
  render() {
    return (
      <ReactEcharts
        // ref="echarts_Instance"
        option={this.genOption(this.props)}
        style={this.props.style || { height: 450, width: '100%' }}
        notMerge={false}
        lazyUpdate={false}
      />
    );
  }
}

BarChart3D.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  config: PropTypes.shape({ data: PropTypes.array.isRequired }).isRequired,
  /* eslint-enable react/no-unused-prop-types */
};
