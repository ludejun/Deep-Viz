/**
 * Created by Administrator on 2017/9/29.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.less';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: this.props.data,
    };
  }
  transformValue(number) {
    if (number.length <= 3) {
      return number === '' ? '0' : number;
    } else {
      const mod = number.length % 3;
      let output = (mod === 0 ? '' : (number.substring(0, mod)));
      for (let i = 0; i < Math.floor(number.length / 3); i++) {
        if (mod === 0 && i === 0) {
          output += number.substring(mod + 3 * i, mod + 3 * i + 3);
        } else {
          output += `,${number.substring(mod + 3 * i, mod + 3 * i + 3)}`;
        }
      }
      return (output);
    }
  }
  render() {
    const { data, config } = this.props;
    let allV = 0;
    data.forEach((item) => {
      allV += item.value;
    });
    const defaultPosition = {
      position: 'absolute',
      left: 0,
      top: config && config.height ? `-${config.height}` : '-25px',
      height: config && config.height ? config.height : '25px',
      lineHeight: config && config.height ? config.height : '25px',
      fontSize: config.fontSize || '14px',
      color: config.color || '#333',
    };
    // const left = {
    //   height: config && config.height ? config.height : '25px',
    //   lineHeight: config && config.height ? config.height : '25px',
    // };
    const center = {
      position: 'absolute',
      left: 0,
      height: config && config.height ? config.height : '25px',
      lineHeight: config && config.height ? config.height : '25px',
      fontSize: config.fontSize || '14px',
      color: config.color || '#333',
    };
    const bottom = {
      position: 'absolute',
      left: 0,
      top: config && config.height ? config.height : '25px',
      height: config && config.height ? config.height : '25px',
      lineHeight: config && config.height ? config.height : '25px',
      fontSize: config.fontSize || '14px',
      color: config.color || '#333',
    };
    const barValue = {
      fontSize: config.fontSize || '14px',
      color: config.color || '#333',
      height: config && config.height ? config.height : '25px',
      lineHeight: config && config.height ? config.height : '25px',
    };
    const marginStyle = {
      marginTop: config && config.margin ? config.margin : '25px',
      marginBottom: config && config.margin ? config.margin : '25px',
    };
    const { namePosition } = this.props.config;
    return (
      <div>
        {data.map((item, i) =>
          <div key={i} style={marginStyle} className="progress-wrap">
            <div className="outer-bar" style={{ backgroundColor: config && config.backgroundColor ? config.backgroundColor : '#d9d9d9' }}>
              <div className="bar-name" style={namePosition && namePosition === 'center' ? center : namePosition === 'bottom' ? bottom : namePosition === 'top' ? defaultPosition : defaultPosition}>{item.name}</div>
              <div className="inner-bar" style={{ height: config && config.height ? config.height : '25px', width: `${item.value / allV * 100}%` }}>
                <div className="child-item" style={{ background: item.backgroundColor ? item.backgroundColor : '#2CA51A' }} />
              </div>
            </div>
            <div className="bar-value" style={barValue}>{this.transformValue(item.value.toString())}{this.props.config.unit}</div>
          </div>,
        )}
      </div>
    );
  }
}
ProgressBar.propTypes = {

  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      backgroundColor: PropTypes.string,
    }),
  ).isRequired,
  config: PropTypes.shape({
    unit: PropTypes.string,
    namePosition: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
  }),
};
