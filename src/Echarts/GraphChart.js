import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';

export default class GraphChart extends Basic {
  getOption(props) {
    const { color, config, onTooltipFormat } = props;
    const option = {
      color: color || this.color,
      toolbox: {
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
      },
      tooltip: {},
      animationDuration: 1000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        name: '关系图',
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 100,
        },
        data: [],
        links: [],
        categories: [],
        roam: false,
        label: {
          normal: {
            show: true,
            position: 'right',
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
          },
        },
        lineStyle: {
          normal: {
            width: 1,
            color: 'source',
            curveness: 0,
            type: 'solid',
          },
        },
      }],
    };
    const arr = [];
    config.data.forEach((v) => {
      arr.push(v.value);
    });
    const maxVal = Math.max(...arr);
    const minVal = Math.min(...arr);
    config.data.forEach((v) => {
      const newVal = 10 + v.value - minVal / (maxVal - minVal) * 30;
      option.series[0].data.push({
        name: v.name,
        category: v.category,
        symbolSize: newVal || 20,
        draggable: config.draggable || true,
      });
    });
    option.series[0].links = config.links;
    option.series[0].categories = config.categories;
    if (config.legend) {
      option.legend = {
        show: true,
        data: config.legend.data,
        textStyle: { color: this.fontColor, fontSize: this.fontSize },
      };
    }
    if (config.title) {
      option.title = {
        text: config.title,
        subtext: config.subtitle,
        textStyle: { color: this.titleColor, fontSize: this.titleSize },
      };
      option.legend.right = 10;
    }
    if (onTooltipFormat) {
      option.tooltip.formatter = params => onTooltipFormat(params);
    }
    return option;
  }
  render() {
    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        style={this.props.style || { height: 400, width: '100%' }}
        notMerge
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }
}

GraphChart.propTypes = {
  config: PropTypes.shape({
    data: PropTypes.array.isRequired,
    links: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    legend: PropTypes.object.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    draggable: PropTypes.bool,
    toolbox: PropTypes.bool,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
