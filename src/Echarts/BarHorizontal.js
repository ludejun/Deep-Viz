import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';

export default class BarHorizontal extends Basic {
  getOption(props) {
    const { color, config } = props;
    const option = {
      color: color || this.color,
      tooltip: {
        show: false,
        trigger: 'axis',
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
        show: !!config.x.legend,
        data: config.x.legend,
        textStyle: { color: this.fontColor, fontSize: this.fontSize },
      },
      toolbox: {
        show: !!config.toolbox,
        itemSize: 12,
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
        type: 'value',
        show: !!config.x.axisShow,
        min: config.x.min,
        max: config.x.max,
        splitLine: { show: true, lineStyle: { type: 'dotted' } },
        axisLabel: {
          show: true,
          textStyle: {
            color: this.fontColor,
            fontSize: this.fontSize,
          },
        },
      },
      yAxis: {
        show: config.y.axisShow !== false,
        type: 'category',
        name: config.y.name,
        nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
        nameGap: 12,
        nameLocation: config.y.nameLocation || 'end',
        axisLine: { show: config.y.axisLine !== false, lineStyle: { color: '#333' } },
        axisTick: {
          show: !!config.y.axisTickShow,
        },
        axisLabel: {
          show: config.y.labelShow !== false,
          textStyle: {
            color: config.y.labelColor || this.fontColor,
            fontSize: config.y.labelSize || this.fontSize,
          },
        },
        data: config.y.data,
      },
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
    // if (onTooltipFormat) {
    //   option.tooltip.formatter = params => onTooltipFormat(params);
    // }

    if (config.x.data && Array.isArray(config.x.data)) {
      config.x.data.forEach((barData, index) => {
        option.series.push(
          {
            type: 'bar',
            name: config.x.legend ? config.x.legend[index] : null,
            barGap: config.x.barGap || 0,
            barWidth: config.x.barWidth || null,
            stack: config.x.stack || null,
            label: {
              normal: {
                formatter: `{c}${(config.dataLable && config.dataLable.unit) || ''}`,
                show: config.dataLable !== false,
                position: (config.dataLable && config.dataLable.position) || 'right',
                color: (config.dataLable && config.dataLable.color) || null,
              },
            },
            data: barData,
            itemStyle: config.x.color ? {
              normal: {
                color: Array.isArray(config.x.color[index]) ? {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: config.x.color[index][0],
                  }, {
                    offset: 1,
                    color: config.x.color[index][1],
                  }],
                  globalCoord: false,
                } : config.x.color[index],
              },
            } : null,
          },
        );
      });
    }
    // For shadow 柱子背后的阴影
    if (config.shadowBar && config.x.data[0]) {
      option.series.push({
        type: 'bar',
        itemStyle: {
          normal: { color: config.shadowBar.color || 'rgba(0,0,0,0.05)' },
        },
        barGap: '-100%',
        barWidth: config.x.barWidth || null,
        barCategoryGap: '40%',
        data: new Array(config.x.data[0].length)
          .fill(config.shadowBar.value || Math.max.apply(null, config.x.data[0])),
        animation: false,
      });
    }
    // if (config.dataZoom) {
    //   option.dataZoom = [
    //     {
    //       show: true,
    //       realtime: true,
    //       start: config.dataZoom.start || 30,
    //       end: config.dataZoom.end || 100,
    //     },
    //   ];
    // }

    return option;
  }

  render() {
    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        style={this.props.style || { height: 300, width: '100%' }}
        notMerge
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }
}

BarHorizontal.propTypes = {
  color: PropTypes.array,
  config: PropTypes.shape({
    x: PropTypes.object.isRequired,
    y: PropTypes.object.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    // dataZoom: PropTypes.object,
    grid: PropTypes.object,
    toolbox: PropTypes.bool,
    datalable: PropTypes.object,
    shadowBar: PropTypes.object,
  }).isRequired,
  style: PropTypes.object,
  // onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
