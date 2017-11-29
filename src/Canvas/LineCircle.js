/**
 * Created by Administrator on 2017/11/8.
 */
import React from 'react';
import PropTypes from 'prop-types';

class LineCircle extends React.Component {
  constructor(props) {
    super(props);
    class Circle {
      constructor(opts) {
        this.ctx = opts.context;
        this.width = opts.width;
        this.height = opts.height;
        this.x = Math.random() * opts.width;
        this.y = Math.random() * opts.height;
        this.r = Math.random() * 20;
        this.movex = Math.random() * 0.8;
        this.movey = Math.random() * 0.8;
      }
      drawCircle() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
        // this.ctx.fillStyle = 'green';
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
      }
      drawLine(currentCircle) {
        const dx = this.x - currentCircle.x;
        const dy = this.y - currentCircle.y;

        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.x, this.y);
          this.ctx.lineTo(currentCircle.x, currentCircle.y);
          this.ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
      // 圆圈移动的距离必须在屏幕范围内
      move(w, h) {
        if (this.x + this.movex - this.r < 0 || this.x + this.movex + this.r > w) {
          this.movex = -this.movex;
        }
        if (this.y + this.movey - this.r < 0 || this.y + this.movey + this.r > h) {
          this.movey = -this.movey;
        }
        this.x += this.movex;
        this.y += this.movey;
      }
    }
    this.init = (w, h, cirNum) => {
      const canvas = document.getElementById('_lincircle');
      const context = canvas.getContext('2d');
      const width = w;
      const height = h;
      canvas.width = width;
      canvas.height = height;
      const circles = [];
      // let current_circle;
      for (let i = 0; i < cirNum / 2; i++) {
        const c = new Circle({
          context,
          width,
          height,
        });
        circles.push(c);
      }

      function draw() {
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < circles.length; i++) {
          circles[i].drawCircle();
          circles[i].move(width, height);
          for (let j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(circles[j]);
          }
        }
        requestAnimationFrame(draw);
      }
      requestAnimationFrame(draw);
    };
  }
  componentDidMount() {
    this.setCanvasSize();
    window.addEventListener('resize', () => {
      this.setCanvasSize();
    }, false);
  }
  setCanvasSize() {
    const parentWidth = parseInt(getComputedStyle(document.getElementById('_linecircleContainer')).width, 10);
    const cirNum = parseInt(parentWidth * 120 / window.innerWidth, 10);
    const w = parentWidth || window.innerWidth;
    const h = this.props.height || window.innerHeight;
    this.init(w, h, cirNum);
  }
  render() {
    return (
      <div id="_linecircleContainer">
        <canvas id="_lincircle" />
      </div>
    );
  }
}

export default LineCircle;
LineCircle.propTypes = {
  height: PropTypes.number,
};
