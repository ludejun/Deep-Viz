import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';

export default class LineBarChart extends Basic {
  getOption(props) {
    const { color, config, onTooltipFormat } = props;
    const option = {
      color: color || this.color,
      tooltip: {
        trigger: 'axis',
        enterable: true,
      },
      grid: {
        show: false,
        left: (config.grid && config.grid.left) || 10,
        right: (config.grid && config.grid.right) || 0,
        top: (config.grid && config.grid.top) || 30,
        bottom: (config.grid && config.grid.bottom) || 10,
        borderColor: this.gridColor,
        containLabel: true,
      },
      legend: {
        data: [],
        textStyle: { color: this.fontColor, fontSize: this.fontSize },
      },
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
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: config.x.data,
        name: config.x.name,
        nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
        axisLabel: {
          textStyle: { color: this.fontColor, fontSize: this.fontSize },
          rotate: config.x.rotate || 0,
          interval: config.x.showAll ? 0 : 'auto',
        },
      },
      yAxis: [],
      series: [],
    };

    if (config.title) {
      option.title = {
        text: config.title,
        subtext: config.subtitle,
        textStyle: { color: this.titleColor, fontSize: this.titleSize },
      };
      option.legend.right = 10;
    }
    config.y.forEach((yItem, yIndex) => {
      yItem.data && yItem.data.forEach((item, index) => {
        // legend
        option.legend.data.push(yItem.legend[index]);
        // series
        option.series.push({
          name: yItem.legend[index],
          type: yItem.type || (yIndex === 0 ? 'bar' : 'line'),
          smooth: !!yItem.smooth,
          yAxisIndex: yIndex === 0 ? 0 : 1,
          areaStyle: yItem.areaStyle ? yItem.areaStyle[index] : null,
          data: item,
          stack: yItem.stack || null,
          barGap: yItem.barGap || 0,
          itemStyle: yItem.color ? {
            normal: {
              color: Array.isArray(yItem.color[index]) ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: yItem.color[index][0],
                }, {
                  offset: 1,
                  color: config.y.color[index][1],
                }],
                globalCoord: false,
              } : yItem.color[index],
            },
          } : null,
        });
      });
      // yAxis
      option.yAxis.push({
        type: 'value',
        min: yItem.min,
        max: yItem.max,
        name: yItem.name || null,
        nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
        splitLine: { show: !!yItem.splitLine, lineStyle: { type: 'dotted' } },
        nameGap: 12,
        axisLabel: {
          formatter: '{value}',
          textStyle: { color: this.fontColor, fontSize: this.fontSize },
        },
        position: yIndex < 1 ? 'left' : 'right',
      });
    });

    if (onTooltipFormat) {
      option.tooltip.formatter = params => onTooltipFormat(params);
    }

    if (config.dataZoom) {
      option.dataZoom = [
        {
          show: true,
          realtime: true,
          start: config.dataZoom.start || 30,
          end: config.dataZoom.end || 100,
        },
      ];
    }

    return option;
  }

  render() {
    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        style={this.props.style || { height: 250, width: '100%' }}
        notMerge
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }
}

LineBarChart.propTypes = {
  color: PropTypes.array,
  config: PropTypes.shape({
    x: PropTypes.object.isRequired,
    y: PropTypes.array.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    dataZoom: PropTypes.object,
    grid: PropTypes.object,
    toolbox: PropTypes.bool,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
