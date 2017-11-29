import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageBar.less';

// <WDImageBar
//     dataList={[
//     {
//       itemImage: 'img/icon_male.png',
//       percent: this.props.customerPic.sex.male,
//       color: '#4C9DFF',
//     },
//     {
//       itemImage: 'img/icon_female.png',
//       percent: this.props.customerPic.sex.female,
//       color: '#EA6C6B',
//     },
//   ]}
//   />;

export default class ImageBar extends Component {
  render() {
    const { dataList, direction } = this.props;
    if (dataList && Array.isArray(dataList)) {
      const positionMap = { [dataList.length - 1]: 'right', 0: 'left' };
      if (direction === 'y') {
        return (
          <div className={`image-bar-y ${this.props.className || ''}`} style={this.props.style}>
            {dataList.map((v, i) => {
              return (
                !!(v && v.itemImage) && (
                  <div key={`y${i}`} className="bar-container">
                    <div
                      className="blank"
                      style={{
                        height: `calc(100% - 24px - ${v.percent}% + ${v.percent * 0.24}px)`,
                      }}
                    />
                    <div className="percent" style={{ color: v.color || '#000' }}>
                      {`${v.percent.toFixed(0)}%`}
                    </div>
                    <div
                      className="back-image"
                      style={{
                        backgroundImage: `url(${v.itemImage})`,
                        height: `calc(${v.percent}% - ${v.percent * 0.24}px)`,
                      }}
                    />
                  </div>
                )
              );
            })}
          </div>
        );
      } else {
        return (
          <div className={`image-bar-x ${this.props.className || ''}`} style={this.props.style}>
            {dataList.map((v, i) => {
              return (
                !!(v && v.itemImage) && (
                  <div
                    key={`x${i}`}
                    className="line"
                    style={{
                      width: !v.color ? `${v.percent}%` : '100%',
                    }}
                  >
                    <span
                      className="back-image"
                      style={{
                        backgroundImage: `url(${v.itemImage})`,
                        // 减掉的是百分比所占的位置
                        width: v.color ? `calc(${v.percent}% - ${0.6 * v.percent}px)` : '100%',
                        backgroundPosition: v.color ? 'left' : positionMap[i] || 'center',
                      }}
                    />
                    {v.color && (
                      <span className="percent" style={{ color: v.color || '#000' }}>
                        {`${v.percent.toFixed(0)}%`}
                      </span>
                    )}
                  </div>
                )
              );
            })}
          </div>
        );
      }
    } else {
      return null;
    }
  }
}

ImageBar.propTypes = {
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      itemImage: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
      color: PropTypes.string,
    }),
  ).isRequired,
  direction: PropTypes.oneOf(['x', 'y']),
};
