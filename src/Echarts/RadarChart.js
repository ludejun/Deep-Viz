/**
 * Created by wimi on 17/9/28.
 */
import React from 'react';
import PropTypes from 'prop-types';
import REcharts from 'echarts-for-react';
import Basic from './Basic';

export default class RadarChart extends Basic {

  getOption(props) {
    const { config, onTooltipFormat } = props;
    const indicator = [];
    const data = [];
    !!config.values.length &&
    config.indicator.forEach((val) => {
      indicator.push({ text: val, max: config.max });
    });
    config.values.forEach((val) => {
      data.push({ value: val, name: config.indicator });
    });
    const tooltip = {
      show: config.formatter,
      trigger: 'item',
      [config.position ? 'position' : '']: config.position || '',
      [config.formatter ? 'formatter' : '']: onTooltipFormat || '',

    };
    const legend = {
      x: 'right',
      data: [''],
    };
    const radar = {
      indicator,
      center: ['50%', '50%'],
      radius: config.radius,
      shape: 'polygon',
      nameGap: 15,
      splitNumber: 5,
    };

    const series = [
      {
        type: 'radar',
        areaStyle: {
          normal: {
            opacity: config.opacity || 0.7,
            color: config.paddingColor || '#0080ff',
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
        lineStyle: {
          normal: {
            color: config.lineColor || '#ffffff',
          },
        },
        itemStyle: {
          normal: {
            color: config.color || '#0080ff',
          },
        },
        data,
      },
    ];

    const grid = {
      show: false,
      left: (config.grid && config.grid.left) || 10,
      right: (config.grid && config.grid.right) || 0,
      top: (config.grid && config.grid.top) || 30,
      bottom: (config.grid && config.grid.bottom) || 10,
      borderColor: this.gridColor,
      containLabel: true,
    };
    const toolbox = {
      show: !!config.toolbox,
      itemSize: this.fontSize,
      iconStyle: {
        normal: { borderColor: this.fontColor },
        emphasis: { borderColor: this.emphasisColor },
      },
      feature: {
        dataZoom: {},
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
      right: 15,
      top: 0,
    };

    const textStyle = config.textStyle || { color: this.fontColor, fontSize: this.fontSize };
    const option = { tooltip, legend, radar, series, textStyle, grid, toolbox };

    return option;
  }


  render() {
    return (
      <REcharts
        option={this.getOption(this.props)}
        style={this.props.style || { height: 250, width: '100%' }}
        notMerge
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }
}

RadarChart.propTypes = {
  color: PropTypes.array,
  config: PropTypes.shape({
    indicator: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    max: PropTypes.number.isRequired,
    name: PropTypes.string,
    position: PropTypes.string,
    radius: PropTypes.number.isRequired,
    formatter: PropTypes.bool,
    paddingColor: PropTypes.string,
    lineColor: PropTypes.string,
    textStyle: PropTypes.object,
    grid: PropTypes.object,
    toolbox: PropTypes.bool,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
