import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BallMove extends Component {
  constructor(props) {
    super(props);
    this.randomNumber = Math.round(Math.random() * 10000);
  }
  componentDidMount() {
    window.onresize = () => {
      const svgFather = document.querySelector(`.ball-move-container${this.randomNumber}`);
      const svgContainer = document.querySelector(`.svg-container${this.randomNumber}`);
      svgContainer.style.width = `${svgFather.offsetWidth}px`;
    };
  }

  render() {
    const { ballColor, width, dur, direction } = this.props;
    const keyPoints = direction === 'alternate' ? '0;1;0' : '0;1';
    const keyTimes = direction === 'alternate' ? '0;0.5;1' : '0;1';
    const time =
      direction === 'alternate' ? (dur ? `${parseFloat(dur) * 2}s` : '10s') : dur || '5s';
    return (
      <div className={`ball-move-container${this.randomNumber}`}>
        <svg
          width={width || '727px'}
          // height="105px"
          viewBox="0 0 727 105"
          version="1.1"
          className={`svg-container${this.randomNumber}`}
        >
          <defs>
            <linearGradient
              x1="0%"
              y1="55.5784881%"
              x2="95.7643905%"
              y2="55.5784881%"
              id="linearGradient-ball"
            >
              <stop stopColor="#FFFFFF" offset="0%" />
              <stop stopColor="#A3D8FB" offset="27.9690011%" />
              <stop stopColor="#0091F3" offset="42.7341854%" />
              <stop stopColor="#0076EF" offset="62.0846864%" />
              <stop stopColor="#0064EC" stopOpacity="0.317933697" offset="81.04108%" />
              <stop stopColor="#005BEA" stopOpacity="0" offset="100%" />
            </linearGradient>
          </defs>

          <g
            transform="translate(1.000000, -171.000000)"
            stroke="url(#linearGradient-ball)"
            strokeWidth="4"
            fill="none"
            fillRule="evenodd"
          >
            <path
              d="M0.03515625,245.310547 C85.0371094,266.837891 71.703125,226.107422 117.441406,226.107422 C163.179688,226.107422 159.878906,257.753906 182.974609,257.988281 C206.070313,258.222656 209.035156,237.564453 231.331471,241.0585 C253.627786,244.552546 259.465434,273.121307 292.297542,273.121307 C325.12965,273.121307 323.280488,173 360.313025,173 C397.345561,173 392.163811,261.140801 430.115164,261.201676 C468.066518,261.262551 476.003906,223.060654 515.537109,223.060654 C555.070313,223.060654 584.207031,279.454971 636.119141,251.257812 C688.03125,223.060654 697.224609,266.382812 757.988281,266.382812"
              id="ballPath"
            />
            <circle
              id="ball"
              r="5"
              cx="0"
              cy="0"
              fill={ballColor || 'orange'}
              stroke="white"
              strokeWidth="1"
            >
              <animate
                attributeType="CSS"
                attributeName="opacity"
                values="0;1;0"
                dur={dur || '5s'}
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
          </g>
          <animateMotion
            xlinkHref="#ball"
            repeatCount="indefinite"
            begin="0s"
            dur={time}
            keyPoints={keyPoints}
            keyTimes={keyTimes}
            calcMode="linear"
          >
            <mpath xlinkHref="#ballPath" />
          </animateMotion>
        </svg>
      </div>
    );
  }
}

BallMove.propTypes = {
  ballColor: PropTypes.string,
  width: PropTypes.string,
};
