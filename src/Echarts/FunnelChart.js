/**
 * Created by wimi on 17/10/10.
 */
import React from 'react';
import PropTypes from 'prop-types';
import REcharts from 'echarts-for-react';
import Basic from './Basic';

export default class FunnelChart extends Basic {

  getOption(props) {
    const { config, onTooltipFormat } = props;

    const tooltip = {
      trigger: 'axis',
      show: !!config.name,
      [config.position ? 'position' : '']: config.position || '',
    };
    const legend = {
      x: 'right',
      data: [''],
    };
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

    const series = [
      {
        type: 'funnel',
        min: config.min,
        max: config.max,
        sort: config.sort || 'ascending',
        left: 0,
        right: 0,
        width: '100%',
        top: 0,
        bottom: 60,
        label: {
          normal: {
            show: true,
            position: 'inside',
            textStyle: {
              color: (config.label && config.label.color) || '#ccc',
            },
          },
          emphasis: {
            textStyle: {
              color: (config.label && config.label.emphasis) || '#fff',
            },
          },
        },

        data: config.data.map((e, i) => {
          return {
            name: e.name,
            value: e.value || 0,
            itemStyle: {
              normal: {
                color: e.normalColor || this.color[i % config.data.length],
              },
              emphasis: {
                color: e.emphasisColor || this.color[i % config.data.length],
              },
            },
          };
        }),
      },
    ];

    const textStyle = config.textStyle || { color: this.fontColor, fontSize: this.fontSize };

    const option = { tooltip, legend, series, textStyle, grid, toolbox };

    if (onTooltipFormat) {
      option.tooltip.formatter = params => onTooltipFormat(params);
    }

    return option;
  }

  render() {
    return (
      <REcharts
        {...this.props}
        style={this.props.style || { height: 250, width: '100%' }}
        option={this.getOption(this.props)}
        notMerge
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }

}


FunnelChart.propTypes = {
  config: PropTypes.shape({
    sort: PropTypes.string,
    label: PropTypes.object,
    data: PropTypes.array,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    grid: PropTypes.object,
    toolbox: PropTypes.bool,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
