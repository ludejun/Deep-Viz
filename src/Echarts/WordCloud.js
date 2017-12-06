import React from 'react';
import PropTypes from 'prop-types';
import 'echarts-wordcloud';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';

export default class WordCloud extends Basic {
  getOption(props) {
    const { config, onTooltipFormat } = props;
    const option = {
      tooltip: {
        trigger: 'axis',
        enterable: true,
      },
      series: [{
        type: 'wordCloud',
        sizeRange: config.sizeRange || [6, 66], // 字的大小区间范围
        rotationRange: config.rotationRange || [-90, 90], // 字的旋转角度区间范围
        shape: 'circle',
        left: config.left || 'center',
        top: config.top || 'center',
        width: config.width || '70%',
        height: config.height || '80%',
        right: config.right || null,
        bottom: config.bottom || null,
        rotationStep: config.rotationStep || 45,
        gridSize: config.gridSize || 10, // 字间距
        drawOutOfBound: false,
        textStyle: {
          normal: {
            fontFamily: config.fontFamily || 'sans-serif',
            fontWeight: config.fontWeight || 'bold',
            color: () => {
              return `rgb(${[
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
              ].join(',')})`;
            },
          },
          emphasis: {
            shadowBlur: config.shadowBlur || 10, // 阴影的模糊级数
            shadowColor: config.shadowColor || '#333', // 阴影的颜色
          },
        },
        data: config.data,
      }],
    };


    if (config.title) {
      option.title = {
        text: config.title,
        subtext: config.subtitle,
        textStyle: { color: this.titleColor, fontSize: this.titleSize },
        x: 'center',
      };
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
        style={this.props.style || { height: 500, width: '100%' }}
        notMerge
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }
}

WordCloud.propTypes = {
  config: PropTypes.shape({
    data: PropTypes.array.isRequired,
    gridSize: PropTypes.number,
    sizeRange: PropTypes.array,
    rotationRange: PropTypes.array,
    rotationStep: PropTypes.number,
    left: PropTypes.string,
    right: PropTypes.string,
    center: PropTypes.string,
    bottom: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    fontFamily: PropTypes.string,
    fontWeight: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};

