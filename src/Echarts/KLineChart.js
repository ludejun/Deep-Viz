import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';

export default class KLineChart extends Basic {

  getOption(props) {
    const { color, config, onTooltipFormat } = props;
    const option = {
      color: color || this.color,
      legend: {
        data: [],
        inactiveColor: '#777',
        textStyle: { color: this.fontColor, fontSize: this.fontSize },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // animation: false,
          type: 'cross',
        },
      },
      axisPointer: {
        link: { xAxisIndex: 'all' },
      },
      // visualMap: {
      //     show: false,
      //     seriesIndex: 0,
      //     dimension: 2,
      //     pieces: [{
      //         value: 1,
      //         color: '#ec0000',
      //     }, {
      //         value: -1,
      //         color: '#00da3c',
      //     }]
      // },
      grid: [],
      xAxis: [],
      yAxis: [],
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
      dataZoom: [],
      series: [
      ],
    };
    if (config.title) {
      option.title = {
        text: config.title,
        subtext: config.subtitle,
        textStyle: { color: this.titleColor, fontSize: this.titleSize },
      };
      option.legend.right = 10;
    }

    if (config.bar) {
      option.series.push({
        name: config.bar.name || '',
        type: config.bar.type || 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: config.bar.data,
      });
      option.visualMap = {
        show: false,
        seriesIndex: 0,
        dimension: 2,
        pieces: [{
          value: 1,
          color: '#ec0000',
        }, {
          value: -1,
          color: '#00da3c',
        }],
      };
      option.grid = [{
        left: (config.grid && config.grid.left) || 80,
        right: (config.grid && config.grid.right) || 0,
        top: (config.grid && config.grid.top) || 60,
        bottom: (config.grid && config.grid.bottom) || 10,
        height: (config.grid && config.grid.height) || 230,
        borderColor: this.gridColor,
        containLabel: true,
      }, {
        left: (config.grid && config.grid.barLeft) || 80,
        right: (config.grid && config.grid.barRight) || 0,
        top: (config.grid && config.grid.barTop) || 340,
        bottom: (config.grid && config.grid.barBottom) || 10,
        height: (config.grid && config.grid.barHeight) || 80,
        borderColor: this.gridColor,
        containLabel: true,
      }];

      option.xAxis = [{
        type: 'category',
        data: config.x.data,
        name: config.x.name,
        axisLine: { lineStyle: { color: '#8392A5' } },
      }, {
        type: 'category',
        data: config.x.data,
        name: config.x.name,
        gridIndex: 1,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
      }];

      option.yAxis = [{
        name: config.y.name || null,
        scale: true,
        splitArea: {
          show: true,
        },
        axisLine: { lineStyle: { color: '#8392A5' } },
        splitLine: { show: false },
      }, {
        name: config.y.name || null,
        gridIndex: 1,
        scale: true,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      }];
    } else {
      option.grid = {
        left: (config.grid && config.grid.left) || 80,
        right: (config.grid && config.grid.right) || 0,
        top: (config.grid && config.grid.top) || 60,
        bottom: (config.grid && config.grid.bottom) || 10,
        height: (config.grid && config.grid.barHeight) || 330,
        borderColor: this.gridColor,
        containLabel: true,
      };
      option.xAxis = {
        type: 'category',
        data: config.x.data,
        name: config.x.name,
        axisLine: { lineStyle: { color: '#8392A5' } },
      };
      option.yAxis = {
        name: config.y.name || null,
        scale: true,
        splitArea: {
          show: true,
        },
        axisLine: { lineStyle: { color: '#8392A5' } },
        splitLine: { show: false },
      };
    }

    config.y.forEach((v) => {
      v.data.forEach((item, index) => {
        option.legend.data.push(v.legend[index]);
        option.series.push({
          name: v.legend[index],
          type: v.type[index],
          data: item,
        });
      });
    });

    if (config.bar) {
      option.series[1].itemStyle = {
        normal: {
          color: '#00da3c',
          color0: '#ec0000',
        },
      };
    } else {
      option.series[0].itemStyle = {
        normal: {
          color: '#00da3c',
          color0: '#ec0000',
        },
      };
    }

    if (onTooltipFormat) {
      option.tooltip.formatter = params => onTooltipFormat(params);
    }
    if (config.dataZoom) {
      option.dataZoom.push([
        {
          textStyle: {
            color: '#8392A5',
          },
          xAxisIndex: [0, 1],
          start: config.dataZoom.start || 30,
          end: config.dataZoom.end || 80,
          type: 'inside',
        },
        {
          type: 'slider',
          xAxisIndex: [0, 1],
          show: true,
          start: config.dataZoom.start || 30,
          end: config.dataZoom.end || 80,
        },
      ]);
    }
    return option;
  }

  render() {
    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        style={this.props.style || { height: 450, width: '100%' }}
        notMerge
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }
}

KLineChart.propTypes = {
  color: PropTypes.array,
  config: PropTypes.shape({
    x: PropTypes.object.isRequired,
    y: PropTypes.array.isRequired,
    bar: PropTypes.object.isRequired,
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
