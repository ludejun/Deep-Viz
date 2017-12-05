import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import Basic from './Basic';

export default class HeatmapCartesian extends Basic {
  getOption(props) {
    const { x, y, data, color, option, title } = props.config;
    const vals = [];
    for (let i = 0; i < data.length; i++) {
      vals.push(data[i][2]);
    }

    const max = Math.max.apply(null, vals);

    const options = {
      title: title || '',
      animation: false,
      xAxis: {
        name: 'name' in x ? x.name : '',
        type: 'category',
        data: x.data,
        splitArea: {
          show: true,
        },
        nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
        axisLabel: {
          textStyle: { color: this.fontColor, fontSize: this.fontSize },
        },
      },
      yAxis: {
        name: 'name' in x ? y.name : '',
        type: 'category',
        data: y.data,
        splitArea: {
          show: true,
        },
        nameTextStyle: { color: this.fontColor, fontSize: this.fontSize },
        axisLabel: {
          textStyle: { color: this.fontColor, fontSize: this.fontSize },
        },
      },
      visualMap: {
        show: false,
        min: 0,
        max,
        calculable: true,
        orient: 'horizontal',
        inRange: {
          color,
        },
        // controller: {
        //   inRange: {
        //     color: 'green',
        //   },
        // },
      },
      series: [
        {
          type: 'heatmap',
          data,
          label: {
            normal: {
              show: true,
              // formatter: params => {
              //   return `${(params.value[2] * 100).toFixed(2)}%`;
              // },
            },
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 5,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
      tooltip: {
        position: 'top',
        formatter: (params) => {
          return params.value[2];
        },
      },
      ...option,
    };
    return options;
  }
  render() {
    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        style={this.props.style || { height: 300, width: '100%' }}
        notMerge
        lazyUpdate={false}
      />
    );
  }
}

HeatmapCartesian.propTypes = {
  config: PropTypes.shape({ data: PropTypes.array, x: PropTypes.object, y: PropTypes.object })
    .isRequired,
  width: PropTypes.string,
};
