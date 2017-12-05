/**
 * Created by Administrator on 2017/9/29.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class RainbowRain extends React.Component {
  componentDidMount() {
    // initial
    const colors = [];
    const dots = [];
    const dotsVel = [];
    const canvasEle = document.getElementById('_rainbowrain');
    const ctx = canvasEle.getContext('2d');
    const w = canvasEle.width = this.props.width ? this.props.width : window.innerWidth;
    const h = canvasEle.height = this.props.height ? this.props.height : window.innerHeight;
    // parameters
    const total = w;
    const accelleration = 0.05;
    // afterinitial calculations
    const size = w / total;
    const occupation = w / total;
    const repaintColor = 'rgba(0, 0, 0, 0.04)';
    // setting the colors' hue
    // and y level for all dots
    const portion = 360 / total;
    for (let i = 0; i < total; ++i) {
      colors[i] = portion * i;
      dots[i] = h;
      dotsVel[i] = 10;
    }
    function anim() {
      // #sourceURl
      window.requestAnimationFrame(anim);
      ctx.fillStyle = repaintColor;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < total; ++i) {
        const currentY = dots[i] - 1;
        dots[i] += dotsVel[i] += accelleration;
        ctx.fillStyle = `hsl(${colors[i]}, 80%, 50%)`;
        ctx.fillRect(occupation * i, currentY, size, dotsVel[i] + 1);
        if (dots[i] > h && Math.random() < 0.01) {
          dots[i] = dotsVel[i] = 0;
        }
      }
    }

    anim();
  }

  render() {
    return (
      <div>
        <div>
          <canvas id="_rainbowrain" />
        </div>
      </div>
    );
  }
}
RainbowRain.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
