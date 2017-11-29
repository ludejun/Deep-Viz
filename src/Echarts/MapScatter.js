/**
 * Created by wxl on 2017/10/23.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';
import '../assets/echarts/map/china';

export default class MapScatter extends Basic {
  getOption(props) {
    const { dataConfig, mapConfig, geoCoordMap, onTooltipFormat } = props;
    function caculateCha(val) {
      const arr = [];
      val.forEach((item) => {
        const allVal = [];
        item.data.forEach((item1) => {
          allVal.push(item1.value);
        });
        const max = Math.max(...allVal);
        const min = Math.min(...allVal);
        const step = max - min;
        arr.push(step);
      });
      return arr;
    }
    function convertData(data1) {
      const res = [];
      for (let i = 0; i < data1.length; i++) {
        const geoCoord = geoCoordMap[data1[i].name];
        if (geoCoord) {
          res.push({
            name: data1[i].name,
            value: geoCoord.concat(data1[i].value),
          });
        }
      }
      return res;
    }

    const option = {
      // backgroundColor: mapConfig.backgroundColor || '#fff',
      tooltip: {
        enterable: true,
        trigger: 'item',
        // formatter(params) {
        //   return `${params.seriesName}<br>${params.name} : ${params.value[2]}`;
        // },
      },
      legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: [],
        textStyle: {
          color: this.fontColor,
        },
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            areaColor: mapConfig && mapConfig.areaColor ? mapConfig.areaColor : '#f3f3f3',
            borderColor: mapConfig && mapConfig.borderColor ? mapConfig.borderColor : '#C0B796',
            borderWidth: mapConfig && mapConfig.borderWidth ? mapConfig.borderWidth : 1,
          },
          emphasis: {
            areaColor: mapConfig && mapConfig.hoverColor ? mapConfig.hoverColor : 'rgba(243,243,243,.5)',
          },
        },
      },
      series: [],
    };
    if (onTooltipFormat) {
      option.tooltip.formatter = params => onTooltipFormat(params);
    }
    if (dataConfig.title) {
      option.title = {
        text: dataConfig.title.text,
        subtext: dataConfig.title.subtext,
        textStyle: { color: this.titleColor, fontSize: this.titleSize },
      };
    }
    dataConfig.options.forEach((item, i) => {
      option.legend.data.push(item.name);
      option.series.push({
        name: item.name,
        type: item.type,
        coordinateSystem: 'geo',
        // showEffectOn: 'emphasis',
        data: convertData(item.data),
        // showEffectOn: 'emphasis',
        rippleEffect: {
          brushType: 'stroke',
        },
        symbol: item.symbol,
        symbolSize(val) {
          const newSca = (val[2] * 7) / caculateCha(dataConfig.options)[i];
          return newSca > 15 ? 15 :
            newSca < 8 ? 8 : newSca;
        },
        itemStyle: {
          normal: {
            color: item.color,
          },
          emphasis: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
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
MapScatter.propTypes = {
  title: PropTypes.object,
  geoCoordMap: PropTypes.object,
  mapConfig: PropTypes.shape({
    areaColor: PropTypes.string,
    hoverColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
  }),
  dataConfig: PropTypes.shape({
    name: PropTypes.string,
    symbol: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.array,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
