import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PieChartSvg.less';

const OUTERR = 190;
const INNERR = 155;

// usage
// <PieChartSvg
// data={this.list.ios.tags}
// color={['#0073CC', '#20CFAF']}
// unit="% "
// infinite />

export default class PieChartSvg extends Component {
  constructor(props) {
    super(props);
    this.outerRef = null;
    this.innerRef = null;
    this.state = { outerDashArray: '0', innerDashArray: '0', innerOffset: '0', tagsAngle: [] };
    this.colors = props.color.map((v) => {
      return this.hex2hsl(v);
    });

    const { height, width } = props;

    this.CENTERX = width / 2;
    this.CENTERY = height / 2;
    this.NAMESPACE = `${`${Math.random()}`.substring(2)}${new Date().valueOf()}`;
  }

  componentDidMount() {
    this.init();
  }

  init() {
    // tags: [
    //   { name: '广场', value: 23, line: 'M130,3 L50,80 L0,80' },
    //   { name: '优惠券', value: 20, line: 'M150,130 L20,0 L0,0' },
    //   { name: '电影', value: 17, line: 'M3,75 L80,0 L145,0' },
    //   { name: '闪购', value: 14, line: 'L167,3' },
    //   { name: '门店', value: 12, line: 'L70,70 L118,70' },
    //   { name: '其它', value: 14, line: 'L120,120 L154,120' },
    // ]
    const { data } = this.props;

    if (!(data && data.length)) {
      return null;
    }

    const TOTAL = data.reduce((x, y) => {
      return x + (y.value || 0);
    }, 0);

    let innerDashArray = '';
    let tagsAngle = []; // 0-2*PI

    const outerDashArray = data
      .reduce((x, y) => {
        const value = (y.value / TOTAL || 0) * 2 * Math.PI;

        tagsAngle.push((tagsAngle.length ? tagsAngle[tagsAngle.length - 1] : 0) + value);

        innerDashArray += `${value * INNERR} `;
        return `${x}${value * OUTERR} `;
      }, '')
      .trim();
    const innerOffset = innerDashArray.trim().split(' ');
    innerDashArray = innerOffset
      .splice(1)
      .concat(innerOffset)
      .join(' ');

    tagsAngle.reverse();
    tagsAngle = tagsAngle.map((v, i) => {
      return i === tagsAngle.length - 1 ? v / 2 : (v + tagsAngle[i + 1]) / 2;
    });
    tagsAngle.reverse();

    this.setState({ outerDashArray, innerDashArray, innerOffset: -innerOffset[0], tagsAngle });
  }

  /*
    * Converts an hex color to HSL
    * Parameters
    *     hex : string containing the hex values
    *
    * Result : 3-element array containing the HSL values
    *
    */
  hex2hsl(hex) {
    let sColor = hex.toLowerCase();
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

    // 处理六位的颜色值
    const rgbArr = [];

    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }

      for (let i = 1; i < 7; i += 2) {
        rgbArr.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
      }
      // return `RGB(${rgbArr.join(',')})`;
    } else {
      return;
    }
    // return sColor;

    const r1 = rgbArr[0] / 255;
    const g1 = rgbArr[1] / 255;
    const b1 = rgbArr[2] / 255;

    const maxColor = Math.max(r1, g1, b1);
    const minColor = Math.min(r1, g1, b1);
    // Calculate L:
    let L = (maxColor + minColor) / 2;
    let S = 0;
    let H = 0;
    if (maxColor !== minColor) {
      // Calculate S:
      if (L < 0.5) {
        S = (maxColor - minColor) / (maxColor + minColor);
      } else {
        S = (maxColor - minColor) / (2.0 - maxColor - minColor);
      }
      // Calculate H:
      if (r1 === maxColor) {
        H = (g1 - b1) / (maxColor - minColor);
      } else if (g1 === maxColor) {
        H = 2.0 + (b1 - r1) / (maxColor - minColor);
      } else {
        H = 4.0 + (r1 - g1) / (maxColor - minColor);
      }
    }

    L *= 100;
    S *= 100;
    H *= 60;
    if (H < 0) {
      H += 360;
    }
    return [H, S, L];
  }

  calculateTagPath(startx, starty, alfa = 0) {
    const straightx = OUTERR / 2; // 水平直线时沿x的位移
    const crossx = straightx * Math.sin(Math.PI / 4); // 45度斜线时沿x，y的位移

    let tagPath = `M${startx},${starty} `;

    // 先画线
    if ((alfa >= 0 && alfa < Math.PI / 4) || (alfa >= 7 * Math.PI / 4 && alfa < 2 * Math.PI)) {
      // 往右
      tagPath += `L${startx + straightx},${starty}`;
    } else if (alfa < Math.PI / 2) {
      // alfa >= Math.PI / 4
      // 往右下
      tagPath += `L${startx + crossx},${starty + crossx} L${startx + crossx + straightx},${starty +
        crossx}`;
    } else if (alfa < 3 * Math.PI / 4) {
      // 往左下
      tagPath += `L${startx - crossx},${starty + crossx} L${startx - crossx - straightx},${starty +
        crossx}`;
    } else if (alfa < 5 * Math.PI / 4) {
      // 往左
      tagPath += `L${startx - straightx},${starty}`;
    } else if (alfa < 3 * Math.PI / 2) {
      // 往左上
      tagPath += `L${startx - crossx},${starty - crossx} L${startx - crossx - straightx},${starty -
        crossx}`;
    } else {
      // if (alfa < 7 * Math.PI / 4)
      // 往右上
      tagPath += `L${startx + crossx},${starty - crossx} L${startx + crossx + straightx},${starty -
        crossx}`;
    }

    const tagLast = tagPath.substr(tagPath.lastIndexOf('L') + 1).split(',');
    const lastLx = Number(tagLast[0]);
    const lastLy = Number(tagLast[1]);
    // const tagW = OUTERR;
    let left = false;

    // 画长方形
    if (!(alfa >= 0 && alfa < Math.PI / 2) && !(alfa >= 3 * Math.PI / 2 && alfa < 2 * Math.PI)) {
      // 左半边
      // lastLx -= tagW;
      left = true;
    }

    this.tagStartPoint = { x: lastLx, y: lastLy, left };
    // tagPath += ` M${lastLx},${lastLy} V${lastLy + tagH} H${lastLx + tagW} V${lastLy -
    //   tagH} H${lastLx} Z`; //

    return tagPath;
  }

  render() {
    const { data, unit, infinite, height, width } = this.props;
    const { tagsAngle } = this.state; // outerDashArray, innerDashArray, innerOffset
    return (
      <svg
        // width="540px"
        // height="550px"
        viewBox={`0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        // {...this.props}
        className={`gundam-piechart-svg ${this.props.className || ''}`}
        style={this.props.style}
      >
        <defs>
          {['outer', 'inner'].map((v, i) => {
            const color = this.colors[i % this.colors.length];
            return (
              <linearGradient
                key={v}
                x1="50%"
                y1={i === 0 ? '0%' : '100%'}
                x2="50%"
                y2={i === 0 ? '100%' : '0%'}
                id={`linearGradient-${v}-${this.NAMESPACE}`}
              >
                <stop stopColor={`hsl(${color[0]},${color[1]}%,${color[2]}%)`} offset="0%" />
                <stop stopColor={`hsl(${color[0]},${color[1]}%,${color[2] - 15}%)`} offset="100%" />
              </linearGradient>
            );
          })}

          <polygon
            id="tags-path-1"
            points="18.6931818 0 188 0 188 39.8644068 171.977273 56 0 56 0 14.2372881"
          />
          {/*  <filter
            x="-5.9%"
            y="-19.6%"
            width="111.7%"
            height="139.3%"
            filterUnits="objectBoundingBox"
            id="tags-filter-2"
          >
            <feGaussianBlur stdDeviation="11" in="SourceAlpha" result="shadowBlurInner1" />
            <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1" />
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            />
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0.869055707   0 0 0 0 1  0 0 0 0.5 0"
              type="matrix"
              in="shadowInnerInner1"
            />
          </filter>
          <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="tags-linearGradient-3">
            <stop stopColor="#00B6FF" offset="0%" />
            <stop stopColor="#2D0094" stopOpacity="0.1" offset="100%" />
          </linearGradient>

          <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="tags-linearGradient-4">
            <stop stopColor="#32ECD9" offset="0%" />
            <stop stopColor="#1B861E" stopOpacity="0.1" offset="100%" />
          </linearGradient>
*/}
          <circle id="tag-line-path-1" r="3" fill="#fff" />
        </defs>

        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          {['outer', 'inner'].map((v, i) => {
            const color = this.colors[i % this.colors.length];
            return (
              <g key={v}>
                <circle
                  className={`round-circle-line-${v}`}
                  stroke={`hsl(${color[0]},${color[1]}%,${color[2] + 15}%)` || '#000'}
                  strokeWidth="2"
                  opacity="0.9"
                  strokeDasharray="10"
                  cx={this.CENTERX}
                  cy={this.CENTERY}
                  r={i === 0 ? OUTERR : INNERR}
                />
                <circle
                  className="round-circle"
                  style={{ animationIterationCount: infinite && 'infinite' }}
                  stroke={`url(#linearGradient-${v}-${this.NAMESPACE})`}
                  strokeWidth="34"
                  cx={this.CENTERX}
                  cy={this.CENTERY}
                  r={i === 0 ? OUTERR : INNERR}
                  ref={ref => (this[`${v}Ref`] = ref)}
                  strokeDasharray={this.state[`${v}DashArray`] || ''}
                  strokeDashoffset={this.state[`${v}Offset`] || ''}
                />
              </g>
            );
          })}

          {data.map((v, i) => {
            const r = i % 2 === 0 ? OUTERR : INNERR;
            const tagx = this.CENTERX + r * Math.cos(tagsAngle[i] || 0);
            const tagy = this.CENTERY + r * Math.sin(tagsAngle[i] || 0);
            const color = this.colors[(i % 2) % this.colors.length];
            const strokeColor = `hsl(${color[0]},${color[1]}%,${color[2] + 15}%)` || '#000';

            return (
              <g id="osuv-tags" key={`tag${i}`} className={`tag-group-${i % 2}`}>
                <path
                  d={this.calculateTagPath(tagx, tagy, tagsAngle[i])}
                  className="tag-line-line"
                  style={{ animationIterationCount: infinite && 'infinite' }}
                  // stroke="#108EE9"
                  stroke={strokeColor}
                  // fill="url(#tags-linearGradient-3)"
                  // fillOpacity="0.5"
                />
                <use
                  className="tag-line-circle"
                  style={{ animationIterationCount: infinite && 'infinite' }}
                  xlinkHref="#tag-line-path-1"
                  x={tagx}
                  y={tagy}
                />

                {(() => {
                  const tagW =
                    18 * `${v.value}`.length +
                    36 * `${unit || ''}`.length +
                    24 * (v.name || '').length +
                    5;
                  const tagH = OUTERR / 4 / 2;

                  const lastLx = this.tagStartPoint.x - (this.tagStartPoint.left ? tagW : 0);
                  const lastLy = this.tagStartPoint.y;
                  return (
                    <g>
                      <path
                        d={`M${lastLx},${lastLy} V${lastLy + tagH} H${lastLx + tagW} V${lastLy -
                          tagH} H${lastLx} Z`}
                        className="tag-line-line"
                        style={{ animationIterationCount: infinite && 'infinite' }}
                        stroke={strokeColor}
                        // fill="url(#tags-linearGradient-3)"
                        fillOpacity="0.5"
                      />
                      <text
                        className="tag-text"
                        style={{ animationIterationCount: infinite && 'infinite' }}
                        fontWeight="normal"
                        fill={strokeColor}
                        textAnchor="middle"
                        x={lastLx + tagW / 2}
                        y={lastLy + 12}
                        fontSize="36"
                      >
                        {v.value ? v.value + (unit || '') : ''}
                        <tspan fontSize="24">{v.name || ''}</tspan>
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })}
        </g>
      </svg>
    );
  }
}

// <PieChartSvg data={list} color={['#0073CC', '#20CFAF']} unit="% " height={1000} width={580} />
PieChartSvg.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  color: PropTypes.arrayOf(PropTypes.string),
  unit: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

PieChartSvg.defaultProps = {
  data: [],
  color: ['#0073CC'],
  unit: '',
  height: 580,
  width: 1000,
};
