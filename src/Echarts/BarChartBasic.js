import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';

export default class BarChartBasic extends Basic {
  defaultSupportedConfig = [
    'x',
    'y',
    'title',
    'subtitle',
    'dataZoom',
    'grid',
    'toolbox',
    'dataLable',
    //
    'markPoint',
  ];
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
        show: !!config.y.legend,
        data: config.y.legend,
        textStyle: { color: this.fontColor, fontSize: this.fontSize },
      },
      toolbox: {
        show: config.toolbox,
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
      xAxis: [
        {
          show: config.x.isXAxisShow !== false,
          type: 'category',
          boundaryGap: config.x.boundaryGap !== false,
          data: config.x.data,
          name: config.x.name,
          nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
          axisLabel: {
            textStyle: { color: this.fontColor, fontSize: this.fontSize },
            rotate: config.x.rotate || 0,
            interval: config.x.showAll ? 0 : 'auto',
          },
          axisTick: {
            show: config.x.axisTickShow !== false,
            alignWithLabel: true,
          },
          // nameLocation: config.x.nameLocation || 'middle',
          axisLine: { lineStyle: { color: '#333' } },
        },
      ],
      yAxis: [
        {
          show: config.y.isYAxisShow !== false,
          type: 'value',
          min: config.y.min,
          max: config.y.max,
          name: config.y.name,
          nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
          nameGap: 12,
          nameLocation: config.y.nameLocation || 'end',
          axisLine: { lineStyle: { color: '#333' } },
          splitLine: { show: !!config.y.splitLine, lineStyle: { type: 'dotted' } },
          axisTick: {
            show: config.y.axisTickShow !== false,
          },
          axisLabel: {
            show: config.y.labelShow !== false,
            textStyle: { color: this.fontColor, fontSize: this.fontSize },
          },
        },
      ],
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
    if (onTooltipFormat) {
      option.tooltip.formatter = params => onTooltipFormat(params);
    }
    // // For shadow 柱子背后的阴影
    // if (config.shadowBar) {
    //   option.series.unshift({
    //     type: 'bar',
    //     itemStyle: {
    //       normal: { color: config.shadowBar.color || 'rgba(0,0,0,0.05)' },
    //     },
    //     barGap: '-100%',
    //     barCategoryGap: '40%',
    //     data: new Array(config.x.data.length)
    //       .fill(config.shadowBar.value || Math.max.apply(null, config.y.data)),
    //     animation: false,
    //   });
    // }

    // filter & copy
    const configUndefinedKeys = {};
    Object.keys(config).forEach((v) => {
      if (this.defaultSupportedConfig.indexOf(v) < 0) {
        configUndefinedKeys[v] = config[v];
      }
    });

    if (config.y.data && Array.isArray(config.y.data)) {
      if (config.markPoint) {
        // 为了防止点legend把mark点掉，单独加一列数据
        option.series.push({
          type: 'bar',
          markPoint: config.markPoint,
          stack: true,
        });
      }
      config.y.data.forEach((barData, index) => {
        option.series.push({
          ...configUndefinedKeys,
          type: 'bar',
          name: config.y.legend ? config.y.legend[index] : null,
          barGap: config.y.barGap || 0,
          barWidth: config.y.barWidth || null,
          stack: config.y.stack || (config.markPoint && index === 0) || null, //
          label: {
            normal: {
              formatter: `{c}${(config.dataLable && config.dataLable.unit) || ''}`,
              show: !!config.dataLable,
              position: (config.dataLable && config.dataLable.position) || 'top',
              color: (config.dataLable && config.dataLable.color) || null,
            },
          },
          data: barData,
          itemStyle: config.y.color
            ? {
              normal: {
                color: Array.isArray(config.y.color[index])
                    ? {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: config.y.color[index][0],
                        },
                        {
                          offset: 1,
                          color: config.y.color[index][1],
                        },
                      ],
                      globalCoord: false,
                    }
                    : config.y.color[index],
              },
            }
            : null,
        });
      });
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

BarChartBasic.propTypes = {
  color: PropTypes.array,
  config: PropTypes.shape({
    x: PropTypes.object.isRequired,
    y: PropTypes.object.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    dataZoom: PropTypes.object,
    grid: PropTypes.object,
    toolbox: PropTypes.bool,
    datalable: PropTypes.object,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
