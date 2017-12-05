import React from 'react';
import PropTypes from 'prop-types';

export default function CirclePan(props) {
  if (props.data && props.data.length > 6) {
    return <div />;
  }
  const styled = document.getElementById('jin-g-origin');
  styled && styled.parentNode.removeChild(styled);
  setTimeout(() => {
    document
      .querySelector('body')
      .insertAdjacentHTML(
        'afterBegin',
        '<style id="jin-g-origin">.g-origin-jin{transform-origin:center center; transform: rotateY(-180deg) rotate(-90deg);}</style>',
      );
  }, 0);
  const keys = [];
  const radius = [80, 70, 60, 50, 40, 30];
  const circum = [503, 440, 377, 314, 252, 189];
  const yArray = [7, 18, 29, 38, 49, 60];
  const yArray2 = [104, 84, 64, 44, 23, 4];
  const color = ['#E96A69', '#80EBFD', '#2592EE', '#d58265', '#c23631', '#619fa8'];
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {props.data.map((it, index) => {
        keys[index] = Math.random();
        return (
          <style key={keys[index]}>
            .jin-svg-pan-{index} {`{animation:jin-pan-${index} 1s linear;animation-fill-mode:forwards;}`}
            @keyframes{` jin-pan-${index}{from{stroke-dasharray:0,${circum[
              index
            ]}} to{stroke-dasharray:${circum[index] *
              it.percent /
              100},${circum[index]}}}`}
          </style>
        );
      })}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 356 176"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none">
          <g
            className="g-origin-jin"
            style={{

            }}
          >
            {props.data && props.data.map((it, index) => {
              return (
                <circle key={index} cx="86" cy="88" r={radius[index]} strokeWidth="5" stroke={it.backGround || 'transparent'} />
              );
            })

          };
            {props.data &&
              props.data.map((it, index) => {
                return (
                  <circle
                    key={index + Math.random()}
                    className={`jin-svg-pan-${index}`}
                    cx="86"
                    cy="88"
                    r={radius[index]}
                    strokeWidth="5"
                    stroke={it.color || color[index]}
                    strokeDasharray={`${circum[index] *
                      it.percent /
                      100},${circum[index]}`}
                  />
                );
              })};
          </g>
          <g>
            {props.data &&
              props.data.map((it, index) => {
                return (
                  <g key={index}>
                    <line
                      className="jin-svg-pan-line"
                      x1="86"
                      y1={yArray[index]}
                      x2={130 + 180 * it.percent / 100}
                      y2={yArray[index]}
                      stroke={it.color || color[index]}
                      strokeWidth="1"
                      strokeDasharray="5,3"
                    />
                    <circle
                      cx={130 + 180 * it.percent / 100}
                      cy={yArray[index]}
                      r="3"
                      fill={it.color || color[index]}
                    />
                    <text fontSize="10" fill={it.color || color[index]}>
                      <tspan
                        x={120 + 180 * it.percent / 100 + 22}
                        y={yArray[index] * 1.1}
                      >
                        {`${it.percent}%`}
                      </tspan>
                    </text>
                  </g>
                );
              })}
          </g>
          <g transform="translate(270,60)">
            {props.data && props.data.map((it, index) => {
              return (<g key={Math.random()}><circle cx="0" cy={yArray2[index]} r="3" fill={it.color || color[index]} />
                <text x="14" y={yArray2[index] + 3} fontSize="9px" fill={it.textColor || 'black'}>
                  {it.legend}
                </text></g>);
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
CirclePan.propTypes = {
  data: PropTypes.array.isRequired,
};
