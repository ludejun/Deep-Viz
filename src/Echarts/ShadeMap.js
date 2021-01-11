import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';
import '../assets/echarts/map/china';

export default class ShadeMap extends Basic {
  getOption(props) {
    const { mapConfig, dataConfig, onTooltipFormat } = props;
    const option = {
      series: [{
        name: '中国',
        type: 'map',
        mapType: 'china',
        zoom: 1.2,
        selectedMode: false,
        itemStyle: {},
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        data: [],
      }],
    };
    if (dataConfig.visualMap) {
      option.visualMap = {
        min: dataConfig.visualMap.min || 0,
        max: dataConfig.visualMap.max || 100,
        left: dataConfig.visualMap.left || 'left',
        top: dataConfig.visualMap.top || 'bottom',
        text: dataConfig.visualMap.text || ['高', '低'], // 文本，默认为数值文本
        calculable: dataConfig.calculable || true,
        inRange: dataConfig.inRange || { color: ['#e0ffff', '#006edd'] },
      };
    }

    if (mapConfig) {
      option.series[0].itemStyle = {
        normal: {
          areaColor: mapConfig.areaColor || '#F3F3F3',
          borderWidth: mapConfig.borderWidth || 1,
          borderColor: mapConfig.borderColor || '#C0B796',
          label: {
            show: true,
          },
        },
        emphasis: {
          areaColor: mapConfig.hoverColor || 'rgba(243,243,243,.5)',
          label: {
            show: true,
          },
        },
      };
    } else {
      option.series[0].itemStyle = {
        normal: {
          areaColor: '#F3F3F3',
          borderWidth: 1,
          borderColor: '#C0B796',
          label: {
            show: true,
          },
        },
        emphasis: {
          areaColor: 'rgba(243,243,243,.5)',
          label: {
            show: true,
          },
        },
      };
    }

    dataConfig.province.forEach((v) => {
      option.series[0].data.push({
        name: v.name,
        value: v.value,
        itemStyle: {
          normal: {
            label: {
              show: dataConfig.isLableShow,
              textStyle: {
                color: this.fontColor,
                fontSize: this.fontsize,
              },
            },
          },
        },
      });
    });

    if (dataConfig.title) {
      option.title = {
        text: dataConfig.title.text,
        subtext: dataConfig.title.subtext,
        textStyle: dataConfig.title.textStyle ||
        { color: this.titleColor, fontSize: this.titleSize },
        x: dataConfig.title.x || 'center',
        y: dataConfig.title.y || 'top',
      };
    }


    if (dataConfig.tooltip) {
      option.tooltip = {
        show: dataConfig.tooltip,
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
        style={this.props.style || { height: 450, width: '100%' }}
        notMerge={false}
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }
}


ShadeMap.propTypes = {
  mapConfig: PropTypes.shape({
    areaColor: PropTypes.string,
    hoverColor: PropTypes.string,
    borderWidth: PropTypes.string,
    borderColor: PropTypes.string,
  }),
  dataConfig: PropTypes.shape({
    title: PropTypes.Object,
    visualMap: PropTypes.Object,
    tooltip: PropTypes.bool,
    backgroundcolor: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
  }).isRequired,
  style: PropTypes.object,
  onEvents: PropTypes.object,
};
