import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';
import '../assets/echarts/map/china';

export default class ShadeMapScatter extends Basic {
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
      tooltip: {
        enterable: true,
        trigger: 'item',
        // formatter(params) {
        //   return `${params.seriesName}<br>${params.name} : ${params.value}`;
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
          normal: {
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
      series: [
        {
          name: '',
          type: 'map',
          geoIndex: 0,
          // tooltip: {show: true},
          data: dataConfig.shadeOptions.province,
        },
      ],
    };
    if (dataConfig.shadeOptions.visualMap) {
      option.visualMap = {
        min: dataConfig.shadeOptions.visualMap.min || 0,
        max: dataConfig.shadeOptions.visualMap.max || 100,
        seriesIndex: [0],
        left: dataConfig.shadeOptions.visualMap.left || 'left',
        top: dataConfig.shadeOptions.visualMap.top || 'bottom',
        text: dataConfig.shadeOptions.visualMap.text || ['高', '低'], // 文本，默认为数值文本
        calculable: dataConfig.shadeOptions.calculable || true,
        inRange: dataConfig.shadeOptions.inRange || { color: ['#e0ffff', '#006edd'] },
      };
    }
    // if (dataConfig.shadeOptions.tooltip) {
    //   option.tooltip = {
    //     show: dataConfig.shadeOptions.tooltip,
    //   };
    // }
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
    dataConfig.scatterOptions.forEach((item, i) => {
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
          const newSca = (val[2] * 7) / caculateCha(dataConfig.scatterOptions)[i];
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
ShadeMapScatter.propTypes = {
  title: PropTypes.object,
  geoCoordMap: PropTypes.object,
  mapConfig: PropTypes.shape({
    areaColor: PropTypes.string,
    hoverColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
  }),
  dataConfig: PropTypes.shape({
    scatterOptions: PropTypes.shape({
      name: PropTypes.string,
      symbol: PropTypes.string,
      color: PropTypes.string,
      data: PropTypes.array,
    }).object,
    shadeOptions: PropTypes.shape({
      province: PropTypes.array,
      visualMap: PropTypes.object,
    }).isRequired,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
