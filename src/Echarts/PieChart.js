import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import Basic from './Basic';

export default class PieChart extends Basic {
  getOption(props) {
    const { color, config, onTooltipFormat } = props;
    const option = {
      color: color || this.color,
      tooltip: {
        trigger: 'item',
        enterable: true,
        formatter: '{b}: {d}%',
      },
      grid: {
        show: false,
        left: (config.grid && config.grid.left) || 0,
        right: (config.grid && config.grid.right) || 0,
        top: (config.grid && config.grid.top) || 0,
        bottom: (config.grid && config.grid.bottom) || 0,
        borderColor: this.gridColor,
        containLabel: true,
      },
      toolbox: {
        show: !!config.toolbox,
        itemSize: this.fontSize,
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
      series: [
        {
          type: 'pie',
          radius: config.concentric ? [config.concentric.innerRadius || '50%', config.concentric.outerRadius || '70%'] : '70%',
          center: ['50%', '50%'],
          data: config.data,
          label: {
            normal: {
              formatter: '{b}', // : {d}%
              textStyle: {
                color: '#666666',
                fontSize: this.fontSize,
              },
            },
            // emphasis: {
            //     show: true,
            //     textStyle: !!this.props.concentric && {
            //         // fontSize: '30',
            //         fontWeight: 'bold'
            //     }
            // }
          },
          // labelLine: {
          //     normal: {
          //         show: !this.props.concentric
          //     }
          // },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          roseType: config.roseType || false,
        },
      ],
    };

    if (config.title) {
      option.title = {
        text: config.title,
        subtext: config.subtitle,
        textStyle: { color: this.titleColor, fontSize: this.titleSize },
      };
      option.legend.right = 10;
    }
    if (config.legend) {
      const { position, orient } = config.legend;
      option.legend = {
        top: position.y || (orient === 'vertical' ? 'top' : 'bottom'),
        left: position.x || (orient === 'vertical' ? 'right' : 'center'),
        orient: orient || 'horizontal',
        data: config.data ? config.data.map(v => v.name) : null,
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
        style={this.props.style || { height: 250, width: '100%' }}
        notMerge
        lazyUpdate={false}
        onEvents={this.props.onEvents}
      />
    );
  }
}

PieChart.propTypes = {
  color: PropTypes.array,
  config: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    legend: PropTypes.object,
    concentric: PropTypes.object,
    roseType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    grid: PropTypes.object,
    toolbox: PropTypes.bool,
  }).isRequired,
  style: PropTypes.object,
  onTooltipFormat: PropTypes.func,
  onEvents: PropTypes.object,
};
