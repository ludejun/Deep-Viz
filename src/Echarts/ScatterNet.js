import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import Basic from './Basic';

export default class ScatterNet extends Basic {
  genOption(props) {
    const { config, color } = props;
    const { data, x, y, maxSize, minSize } = config;
    let dataN = [];
    let dataE = [];
    let styleN = {};
    let styleE = {};
    data.forEach((d) => {
      if (d.type === 'effect') {
        dataE = d.typeData;
        styleE = 'option' in d ? d.option : {};
      } else {
        dataN = d.typeData;
        styleN = 'option' in d ? d.option : {};
      }
    });
    // symbolSize
    const maxW = maxSize || 20;
    const minW = minSize || 5;
    const list = dataN.length > 0 ? dataN : dataE;
    const maxD = list.reduce((pre, cur) => {
      return pre[2] > cur[2] ? pre : cur;
    })[2];
    const minD = list.reduce((pre, cur) => {
      return pre[2] > cur[2] ? cur : pre;
    })[2];
    const axisStyle = {
      type: 'category',
      data: [],
      splitLine: {
        show: true,
        lineStyle: {
          color: this.fontColor,
          type: 'dashed',
        },
      },
      nameTextStyle: {
        color: this.fontColor,
        fontSize: this.fontSize,
      },
      axisLabel: {
        textStyle: {
          color: this.fontColor,
          fontSize: this.fontSize,
        },
      },
      scale: true,
    };
    const options = {
      grid: {
        left: 20,
        right: 20,
        bottom: 0,
        top: 50,
        containLabel: true,
      },
      title: {
        text: '',
      },
      legend: {
        show: false,
      },
      tooltip: {
        formatter: (params) => {
          return params.value[2];
        },
      },
      xAxis: {
        ...axisStyle,
        // axisLine: { show: false },
        ...x,
      },
      yAxis: {
        ...axisStyle,
        nameLocation: 'start',
        ...y,
      },
      series: [
        {
          type: 'scatter',
          itemStyle: {
            normal: { color: color && 'normal' in color ? color.normal : '#D7D7D7' },
          },
          symbolSize: (val) => {
            return minW + (val[2] - minD + 0.1) / (maxD - minD + 0.1) * (maxW - minW);
          },
          animationDelay: (idx) => {
            return idx * 5;
          },
          data: dataN,
          ...styleN,
        },
        {
          type: 'effectScatter',
          itemStyle: { normal: { color: color && 'effect' in color ? color.effect : '#108EE9' } },
          z: 10,
          symbolSize: (val) => {
            return minW + (val[2] - minD + 0.1) / (maxD - minD + 0.1) * (maxW - minW);
          },
          data: dataE,
          ...styleE,
        },
      ],
      ...config.option,
    };
    return options;
  }

  render() {
    return (
      <ReactEcharts
        style={this.props.style || { height: 450, width: '100%' }}
        option={this.genOption(this.props)}
        lazyUpdate={false}
        notMerge
      />
    );
  }
}

ScatterNet.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  config: PropTypes.shape({
    x: PropTypes.object.isRequired,
    y: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
  }),
  /* eslint-enable react/no-unused-prop-types */
};
