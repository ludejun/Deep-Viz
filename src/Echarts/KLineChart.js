import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';
import { comdify } from '../utils';

export default class KLineChart extends Basic {
  getOption(props) {
    const { color, config, onTooltipFormat } = props;
    const option = {
      color: color || this.color,
      legend: {
        data: (config.y.legend && config.y.legend.length > 0) ? [config.y.legend[0]] : [],
        textStyle: { color: this.fontColor, fontSize: this.fontSize },
        top: 15,
        itemHeight: 10,
        itemWidth: 15,
        itemGap: 5,
      },
      tooltip: {
        show: !!config.tooltipShow || true,
        enterable: true,
        trigger: 'axis',
        backgroundColor: 'transparent',
        padding: 0,
        textStyle: {
          fontSize: 12, color: config.tooltipColor || 'black',
        },
        axisPointer: {
          type: 'cross',
        },
        position: [0, 0],
        formatter: (params) => {
          let tipString = '<div><p>';
          tipString += `时间：${params[0].axisValue} 开：${comdify(params[0].data[1])} 高：${comdify(params[0].data[4])}
           低：${comdify(params[0].data[3])} 收：${comdify(params[0].data[2])}`;
          params.forEach((param, index) => {
            if (index > 0) {
              tipString += ` <span style="color: ${color ? color[index - 1] : this.color[index - 1]}">${param.seriesName}：${comdify(param.data)}</span>`;
            }
          });
          tipString += '</p></div>';
          return tipString;
        },
      },
      axisPointer: {
        link: { xAxisIndex: 'all' },
        label: { backgroundColor: config.crossLabelBackcolor || '#108EE9' },
      },
      xAxis: [],
      yAxis: [],
      // toolbox: {
      //   show: !!config.toolbox,
      //   itemSize: this.fontSize,
      //   iconStyle: {
      //     normal: { borderColor: this.fontColor },
      //     emphasis: { borderColor: this.emphasisColor },
      //   },
      //   feature: {
      //     dataZoom: {},
      //     dataView: { readOnly: false },
      //     restore: {},
      //     saveAsImage: {},
      //   },
      //   right: 15,
      //   top: 0,
      // },
      series: [{
        name: (config.y.legend && config.y.legend.length > 0) && config.y.legend[0],
        type: 'candlestick',
        hoverAnimation: false,
        legendHoverLink: false,
        data: config.y.kData,
        itemStyle: {
          normal: {
            color: config.upColor || '#F04B5B',
            color0: config.downColor || '#2BBE65',
            borderColor: null,
            borderColor0: null,
          },
        },
      }],
    };

    config.y.lineData.forEach((item, index) => {
      option.legend.data.push(config.y.legend[index + 1]);
      option.series.push({
        name: config.y.legend[index + 1],
        type: 'line',
        data: item,
        hoverAnimation: false,
        symbolSize: 0,
      });
    });

    if (config.volume && config.volume.show) {
      option.series.push({
        // name: config.bar.name || '',
        // type: config.bar.type || 'bar',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: config.volume.data,
        axisPointer: { show: false },
      });
      option.visualMap = {
        show: false,
        seriesIndex: 1 + config.y.lineData.length,
        dimension: 2,
        pieces: [{
          value: 1,
          color: config.upColor || '#F04B5B',
        }, {
          value: -1,
          color: config.downColor || '#2BBE65',
        }],
      };
      option.grid = [{
        show: false,
        left: (config.grid && config.grid.left) || 80,
        right: (config.grid && config.grid.right) || 10,
        top: (config.grid && config.grid.top) || 30,
        bottom: (config.grid && config.grid.bottom) || 10,
        height: (config.grid && config.grid.height) || 230,
        borderColor: this.gridColor,
      }, {
        show: false,
        left: (config.grid && config.grid.barLeft) || 80,
        right: (config.grid && config.grid.barRight) || 10,
        top: (config.grid && config.grid.barTop) || 290,
        bottom: (config.grid && config.grid.barBottom) || 10,
        height: (config.grid && config.grid.barHeight) || 80,
        borderColor: this.gridColor,
      }];

      option.xAxis = [{
        type: 'category',
        data: config.x.data,
        name: config.x.name,
        min: 'dataMin',
        max: 'dataMax',
        boundaryGap: false,
        axisLine: { onZero: false, lineStyle: { color: this.fontColor } },
      }, {
        type: 'category',
        data: config.x.data,
        name: config.x.name,
        gridIndex: 1,
        min: 'dataMin',
        max: 'dataMax',
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
      }];

      option.yAxis = [{
        name: config.y.name || null,
        position: config.y.position || 'left',
        scale: true,
        axisLine: { lineStyle: { color: this.fontColor } },
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

      if (config.dataZoom) {
        option.dataZoom = [
          {
            xAxisIndex: [0, 1],
            start: config.dataZoom.start || 30,
            end: config.dataZoom.end || 100,
            type: 'inside',
          },
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            show: true,
            start: config.dataZoom.start || 30,
            end: config.dataZoom.end || 100,
          },
        ];
      }
    } else {
      option.grid = {
        left: (config.grid && config.grid.left) || 30,
        right: (config.grid && config.grid.right) || 10,
        top: (config.grid && config.grid.top) || 30,
        bottom: (config.grid && config.grid.bottom) || 10,
        height: (config.grid && config.grid.height) || 330,
        borderColor: this.gridColor,
        containLabel: true,
      };
      option.xAxis = {
        type: 'category',
        data: config.x.data,
        name: config.x.name,
        min: 'dataMin',
        max: 'dataMax',
        axisLine: { lineStyle: { color: this.fontColor } },
      };
      option.yAxis = {
        name: config.y.name || null,
        position: config.y.position || 'left',
        scale: true,
        axisLine: { lineStyle: { color: this.fontColor } },
        splitLine: { show: false },
      };

      if (config.dataZoom) {
        option.dataZoom = [
          {
            start: config.dataZoom.start || 50,
            end: config.dataZoom.end || 100,
            type: 'inside',
          },
        ];
      }
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
    y: PropTypes.shape({
      kData: PropTypes.array.isRequired,
      lineData: PropTypes.array,
      legend: PropTypes.array,
      position: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    upColor: PropTypes.string,
    downColor: PropTypes.string,
    bar: PropTypes.object,
    dataZoom: PropTypes.object,
    grid: PropTypes.object,
    tooltipColor: PropTypes.string,
    tooltipShow: PropTypes.bool,
    crossLabelBackcolor: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
