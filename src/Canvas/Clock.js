  /**
 * Created by Administrator on 2017/10/16.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    class Clocks {
      constructor(opts) {
        this.ctx = opts.ctx;
        this.rem = opts.rem;
        this.r = opts.r;
      }
      drawCircle() {
        this.ctx.save();
        this.ctx.translate(this.r, this.r);
        this.ctx.beginPath();
        this.ctx.lineWidth = 10 * this.rem;
        this.ctx.arc(0, 0, this.r - this.ctx.lineWidth / 2, 2 * Math.PI, false);
        this.ctx.stroke();

        const hoursNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        this.ctx.font = `(16 *${this.rem})px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        hoursNumbers.forEach((number, i) => {
          const rad = 2 * Math.PI / 12 * i;
          const x = Math.cos(rad) * (this.r - 30 * this.rem);
          const y = Math.sin(rad) * (this.r - 30 * this.rem);
          this.ctx.fillText(number, x, y);
        });
        for (let i = 0; i < 60; i++) {
          const rad = 2 * Math.PI / 60 * i;
          const x = Math.cos(rad) * (this.r - 18 * this.rem);
          const y = Math.sin(rad) * (this.r - 18 * this.rem);
          this.ctx.beginPath();
          if (i % 5 === 0) {
            this.ctx.fillStyle = '#ccc';
            this.ctx.arc(x, y, 3 * this.rem, 0, 2 * Math.PI, false);
          } else {
            this.ctx.fillStyle = '#000';
            this.ctx.arc(x, y, 2 * this.rem, 0, 2 * Math.PI, false);
          }
          this.ctx.fill();
        }
      }
      drawHour(hour, minute) {
        this.ctx.save();
        this.ctx.beginPath();
        const rad = 2 * Math.PI / 12 * hour;
        const mrad = 2 * Math.PI / 12 / 60 * minute;
        this.ctx.rotate(rad + mrad);
        this.ctx.lineWidth = 6 * this.rem;
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(0 * this.rem, 10 * this.rem);
        this.ctx.lineTo(0 * this.rem, -this.r / 2);
        this.ctx.stroke();
        this.ctx.restore();
      }
      drawMinute(minute) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ccc';
        const rad = 2 * Math.PI / 60 * minute;
        this.ctx.rotate(rad);
        this.ctx.lineWidth = 3 * this.rem;
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(0 * this.rem, 10 * this.rem);
        this.ctx.lineTo(0 * this.rem, -this.r + 40 * this.rem);
        this.ctx.stroke();
        this.ctx.restore();
      }
      drawSecond(second) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ff0000';
        const rad = 2 * Math.PI / 60 * second;
        this.ctx.rotate(rad);
        this.ctx.lineWidth = 3 * this.rem;
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(-2 * this.rem, 20 * this.rem);
        this.ctx.lineTo(2 * this.rem, 20 * this.rem);
        this.ctx.lineTo(1, -this.r + 20 * this.rem);
        this.ctx.lineTo(-1, -this.r / 2);
        this.ctx.fill();
        this.ctx.restore();
      }
      drawcircledot() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fff';
        this.ctx.arc(0, 0, 3 * this.rem, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    this.draw = () => {
      const dom = document.getElementById('_clockCanvas');
      const ctx = dom.getContext('2d');
      ctx.canvas.width = this.props.width || 200;
      ctx.canvas.height = this.props.height || 200;
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const r = width / 2;
      const rem = width / 200;
      const clock = new Clocks({
        ctx,
        width,
        height,
        r,
        rem,
      });
      ctx.clearRect(0, 0, width, height);
      clock.drawCircle();
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      clock.drawHour(hour, minute);
      clock.drawMinute(minute);
      clock.drawSecond(second);
      clock.drawcircledot();
      ctx.restore();
    };
  }

  componentDidMount() {
    this.draw();
    clearInterval(this.timer);
    this.timer = setInterval(this.draw, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <canvas id="_clockCanvas" width={200} height={200} />
      </div>
    );
  }

}
Clock.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
