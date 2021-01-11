import React, { Component } from 'react';
import PropTypes from 'prop-types';

// <WDImagePercent dataList={[{
//   itemImage: 'icon-client-married',     单个图片
//   percent: 54,                                             百分比，整数
//   color: '#EA6C6B',                                        百分比颜色
//   name: '已婚'                                            标题
// }, {
//   itemImage: require('../../assets/icon_unmarried.png'),
//   percent: 46,
//   color: '#4C9DFF',
//   name: '未婚'
// }]}/>

export default class ImagePercent extends Component {
  render() {
    const { dataList } = this.props;
    return (
      <div style={styles.line}>
        {dataList.map((v, i) => {
          return (
            (v && (
              <div
                key={i}
                style={{ display: 'inline-block', width: `${1 / dataList.length * 100}%` }}
              >
                <div style={styles.center}>
                  {!!v.itemImage &&
                    ((typeof v.itemImage === 'object' && v.itemImage) ||
                      (typeof v.itemImage === 'string' && (
                        <span
                          style={{ ...styles.image, ...{ backgroundImage: `url(${v.itemImage})` } }}
                        />
                      )))}
                  <span style={{ ...styles.percent, color: v.color }}>
                    {v.percent && typeof v.percent === 'number' ? `${Math.round(v.percent)}%` : ''}
                    {v.percent && typeof v.percent === 'string' ? `${v.percent}%` : ''}
                  </span>
                </div>
                <p style={styles.name}>{v.name || ''}</p>
              </div>
            )) ||
            null
          );
        })}
      </div>
    );
  }
}

ImagePercent.propTypes = {
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      itemImage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
      percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      color: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

const styles = {
  line: {
    marginTop: 8,
    marginBottom: 8,
  },
  center: {
    textAlign: 'center',
  },
  image: {
    height: 36,
    width: 50,
    display: 'inline-block',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    marginRight: 5,
  },

  percent: {
    fontSize: 24,
    fontWeight: 200,
    // marginLeft: 5,
  },
  name: {
    color: '#999',
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'center',
    marginTop: 5,
  },
};
