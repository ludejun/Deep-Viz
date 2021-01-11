/**
 * Created by Administrator on 2017/11/3.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';
import '../assets/echarts/map/china';

export default class ScatterCartesian extends Basic {
  setSymbolSize(now, min, max, minTar, maxTar) {
    if (!now) {
      return 20;
    }
    if (minTar <= maxTar && min <= now <= max) {
      return (now - min) * (maxTar - minTar) / (max - min) + minTar;
    }
    return now || 0;
  }
  getOption(props) {
    const { config, onTooltipFormat } = props;
    const options = config.options;
    const color = config.color;
    const markLine = {
      silent: true,
      data: [
        { name: '平均线', type: 'average', valueIndex: 0 },
        { name: '平均线', type: 'average', valueIndex: 1 },
      ],
      label: {
        normal: {
          formatter: (params) => {
            return `平均值\n${(params.value && params.value.toFixed(0)) || ''}`;
          },
        },
      },
      lineStyle: { normal: { color: this.fontColor } },
    };
    const option = {
      color: color || this.color,
      toolbox: {
        show: !!config.isToolboxShow,
        itemSize: this.fontSize,
        right: '0%',
        top: 0,
        iconStyle: {
          normal: { borderColor: this.fontColor },
          emphasis: { borderColor: this.emphasisColor },
        },
        feature: {
          mark: { show: true },
          dataZoom: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      grid: {
        show: false,
        left: (config.grid && config.grid.left) || 30,
        right: (config.grid && config.grid.right) || 20,
        top: (config.grid && config.grid.top) || 10,
        bottom: (config.grid && config.grid.bottom) || 10,
        borderColor: this.gridColor,
        containLabel: true,
      },
      legend: {
        // orient: 'vertical',
        y: 'top',
        x: 'center',
        data: [],
        textStyle: {
          color: this.fontColor,
        },
      },
      tooltip: {
        showDelay: 0,
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1,
          },
        },
      },
      xAxis: {
        name: config.xName,
        nameTextStyle: {
          color: this.fontColor,
          fontSize: this.fontSize,
        },
        splitLine: {
          lineStyle: {
            color: this.gridColor,
            type: 'dashed',
          },
        },
        axisLabel: {
          show: true,
          textStyle: { color: this.fontColor, fontSize: this.fontSize },
        },
        scale: true,
      },
      yAxis: {
        name: config.yName,
        nameTextStyle: {
          color: this.fontColor,
          fontSize: this.fontSize,
        },
        splitLine: {
          lineStyle: {
            color: this.gridColor,
            type: 'dashed',
          },
        },
        axisLabel: {
          show: true,
          textStyle: { color: this.fontColor, fontSize: this.fontSize },
        },
        scale: true,
      },
      series: [],
    };
    if (onTooltipFormat) {
      option.tooltip.formatter = params => onTooltipFormat(params);
    }
    if (config.title) {
      option.title = {
        text: config.title.text,
        subtext: config.title.subtext,
        textStyle: { color: this.titleColor, fontSize: this.titleSize },
      };
    }
    options.forEach((item, i) => {
      const allVal = [];
      item.data.forEach((v) => {
        allVal.push(v[2]);
      });
      const max = Math.max(...allVal);
      const min = Math.min(...allVal);

      option.legend.data.push(item.name);
      option.series.push({
        name: item.name,
        data: item.data,
        type: 'scatter',
        symbolSize: (data) => {
          return this.setSymbolSize(data[2], min, max, 10, 50);
        },
        markLine: item.markLine ? markLine : '',
        label: {
          normal: {
            show: config.isLabelShow,
            position: 'top',
            color: config.color && Array.isArray(config.color[i]) ? config.color[i][1] : null,
            formatter: (params) => {
              return params.data[3] ? params.data[3] : params.seriesName;
            },
          },
        },
        itemStyle: config.color ? {
          normal: {
            shadowBlur: 5,
            shadowColor: config.color[i][1],
            shadowOffsetY: 2,
            color: Array.isArray(config.color[i]) ? {
              type: 'radial',
              x: 0.4,
              y: 0.4,
              r: 0.6,
              colorStops: [{
                offset: 0, color: config.color[i][0],
              }, {
                offset: 1, color: config.color[i][1],
              }],
              globalCoord: false, // 缺省为 false
            } : config.color[i],
          },
        } : null,
      });
    });
    return option;
  }
  render() {
    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        notMerge
        lazyUpdate={false}
        style={this.props.style || { height: 250, width: '100%' }}
        onEvents={this.props.onEvents}
      />
    );
  }
}
ScatterCartesian.propTypes = {
  dataConfig: PropTypes.shape({
    options: PropTypes.object.isRequired,
    grid: PropTypes.object,
    title: PropTypes.object,
    color: PropTypes.array,
  }),
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
