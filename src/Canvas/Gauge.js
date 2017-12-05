import React from 'react';

export default class Gauge extends React.Component {
  constructor(props) {
    super(props);
    this.id = `${Math.random()}_canvas_gundam`;
    this.gauge = null;
    function GaugePan(opts) {
      this._width = opts.minLength;
      this._height = opts.minLength;
      this._radius = opts.radius;
      this._outergap = opts.outergap;
      this._innergap = opts.innergap;
      this._value_line_num = opts.valueLineNum;
      this._value_num = opts.valueNum;
      this._value_span = opts.valueSpan;
      this._unite = opts.unite;
      this._context = opts.context;
      this._canvas = opts.canvas;
      this._center_point = opts.centerPoint;
      this.preValue = opts.preValue;
      this.value = opts.value;
    }
    GaugePan.prototype = {
      constructor: GaugePan,
      drawOuterCircle() {
        this._context.save();
        this._context.shadowColor = 'rgba(0, 0, 0, 0.7)';
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowBlur = 6;
        this._context.fillStyle = 'rgba(100, 140, 230, 0.1)';
        this._context.strokeStyle = 'rgba(100, 140, 230, 0.9)';
        this._context.beginPath();
        this._context.arc(this._center_point.x,
                          this._center_point.y,
                          this._radius,
                          0,
                          Math.PI * 2,
                          false);
        this._context.stroke();
        this._context.arc(this._center_point.x,
                          this._center_point.y,
                          this._radius - this._outergap,
                          0,
                          Math.PI * 2,
                          true);
        this._context.fill();
        this._context.restore();
      },
      drawDegree() {
        this._context.save();
        this._context.beginPath();
        this._context.fillStyle = 'rgba(255, 0, 0, 0.2)';
        this._context.arc(this._center_point.x,
                          this._center_point.y,
                          this._radius - this._outergap,
                          Math.PI / 2,
                          0,
                          true);
        this._context.arc(this._center_point.x,
                          this._center_point.y,
                          this._radius - this._innergap,
                          0,
                          Math.PI / 2,
                          false);
        this._context.fill();
        this._context.beginPath();
        this._context.fillStyle = 'rgba(0, 128, 0, 0.2)';
        this._context.arc(this._center_point.x,
                          this._center_point.y,
                          this._radius - this._outergap,
                          Math.PI / 2,
                          Math.PI,
                          false);
        this._context.arc(this._center_point.x,
                          this._center_point.y,
                          this._radius - this._innergap,
                          Math.PI,
                          Math.PI / 2,
                          true);
        this._context.fill();
        this._context.beginPath();
        this._context.fillStyle = 'rgba(0, 0, 255, 0.2)';
        this._context.arc(this._center_point.x,
                          this._center_point.y,
                          this._radius - this._outergap,
                          Math.PI,
                          Math.PI * 2,
                          false);
        this._context.arc(this._center_point.x,
                          this._center_point.y,
                          this._radius - this._innergap,
                          Math.PI * 2,
                          Math.PI,
                          true);
        this._context.fill();
        const DPERANGLE = this.getValueLineAngle();
        for (let i = 0, j = 0; i < Math.PI * 2; i += DPERANGLE, j += 1) {
          this._context.beginPath();
          if (i <= Math.PI / 2) {
            this._context.strokeStyle = 'red';
          } else if (i > Math.PI / 2 && i <= Math.PI) {
            this._context.strokeStyle = 'green';
          } else {
            this._context.strokeStyle = 'blue';
          }
          const x1 = j % 2 === 0 ?
          this._center_point.x + ((this._radius - this._innergap) * Math.cos(i))
          : this._center_point.x + (((this._radius - this._innergap) + 3) * Math.cos(i));
          const y1 = j % 2 === 0 ?
          this._center_point.y + ((this._radius - this._innergap) * Math.sin(i))
          : this._center_point.y + (((this._radius - this._innergap) + 3) * Math.sin(i));
          const x2 = j % 2 === 0 ?
          x1 + ((this._innergap - this._outergap) * Math.cos(i))
          : x1 + (((this._innergap - this._outergap) - 3) * Math.cos(i));
          const y2 = j % 2 === 0 ?
          y1 + ((this._innergap - this._outergap) * Math.sin(i))
          : y1 + ((this._innergap - this._outergap - 3) * Math.sin(i));
          this._context.moveTo(x1, y1);
          this._context.lineTo(x2, y2);
          this._context.stroke();
        }
        this._context.restore();
      },
      getValueLineAngle() {
        return (Math.PI * 2) / this._value_line_num;
      },
      getValueAngle() {
        return (Math.PI * 2) / this._value_num;
      },
      getMaxValue() {
        return this._value_num * this._value_span;
      },
      drawNum() {
        this._context.beginPath();
        this._context.save();
        this._context.shadowColor = 'rgba(0,0,0,0.8)';
        this._context.shadowOffsetX = 1;
        this._context.shadowOffsetY = 1;
        this._context.shadowBlur = 1;
        this._context.fillStyle = 'rgba(0, 0, 230, 0.9)';
        this._context.font = `${this._radius * 0.08}px Helvetica`;
        const PERANGLE = this.getValueAngle();
        for (let i = Math.PI / 2, j = 0;
             i < ((Math.PI * 2) + (Math.PI / 2));
             i += PERANGLE, j += 1) {
          const x1 = this._center_point.x +
           ((this._radius - (this._innergap + (this._radius * 0.08))) * Math.cos(i));
          const y1 = this._center_point.x +
          ((this._radius - (this._innergap + (this._radius * 0.08))) * Math.sin(i));
          j < this._value_num && this._context.fillText(j * this._value_span, x1, y1);
        }
        this._context.restore();
      },
      drawTick(value) {
        const MAXVALUE = this.getMaxValue();
        if (typeof value === 'number' && value <= MAXVALUE) {
          const point = this.caculatePoint(value);
          this._context.save();
          this._context.beginPath();
          this._context.strokeStyle = 'yellow';
          this._context.lineWidth = this._radius * 0.015;
          this._context.moveTo(this._center_point.x, this._center_point.y);
          this._context.lineTo(point.x, point.y);
          this._context.stroke();
          this._context.beginPath();
          this._context.fillStyle = 'rgba(147,210,242,0.6)';
          this._context.arc(this._center_point.x,
                            this._center_point.y,
                            this._radius * 0.05,
                            0,
                            Math.PI * 2);
          this._context.fill();
          this._context.beginPath();
          this._context.arc(point.x,
                            point.y,
                            this._radius * 0.025,
                            0,
                            Math.PI * 2);
          this._context.fillStyle = 'rgba(255, 0, 0, 0.6)';
          this._context.fill();
          this._context.restore();
          this._context.font = `${this._radius * 0.08}px Helvetica`;
          this._context.fillText(`单位:${this._unite}`,
                                  this._center_point.x,
                                  this._center_point.y + (this._radius * 0.4));
        }
      },
      caculatePoint(value) {
        const angle = (value * (this.getValueAngle() / this._value_span)) + (Math.PI / 2);
        const x = this._center_point.x + (this._radius * Math.cos(angle));
        const y = this._center_point.y + (this._radius * Math.sin(angle));
        return {
          x,
          y,
        };
      },
      draw(value) {
        this._context.clearRect(0, 0, this._width, this._height);
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this.drawOuterCircle();
        this.drawDegree();
        this.drawNum();
        this.drawTick(value);
      },
    };
    this.init = () => {
      const canvas = document.getElementById(this.id);
      const styleDom = window.getComputedStyle(canvas.parentNode);
      const width = Math.floor(window.parseInt(styleDom.width));
      const height = Math.floor(window.parseInt(styleDom.height));
      const minLength = Math.min(width, height);
      canvas.width = minLength;
      canvas.height = minLength;
      const radius = (minLength / 2) * 0.96;
      const outergap = radius * 0.1;
      const innergap = radius * 0.15;
      const valueLineNum = props.tickMarkNum || 60;
      const valueNum = props.valueNum || 6;
      const valueSpan = props.valueSpan || 100;
      const unite = props.unit || 'km/h';
      const context = canvas.getContext('2d');
      const centerPoint = { x: minLength / 2, y: minLength / 2 };
      this.gauge = new GaugePan({ minLength,
        radius,
        outergap,
        innergap,
        valueLineNum,
        valueNum,
        valueSpan,
        unite,
        context,
        canvas,
        centerPoint,
        value: props.value,
        preValue: 0 });
      this.gauge.draw(this.gauge.value);
    };
  }
  componentDidMount() {
    this.init();
  }
  componentWillReceiveProps(nextprops) {
    const preValue = this.gauge.value;
    this.gauge.preValue = preValue;
    this.gauge.value = nextprops.value;
  }
  componentDidUpdate() {
    this.animate();
  }
  animate = () => {
    const nowV = Math.floor(this.gauge.value);
    let preV = Math.floor(this.gauge.preValue);
    const direction = (nowV - preV) / Math.abs(nowV - preV);
    if (preV !== nowV) {
      preV = (direction * 1) + preV;
      this.gauge.preValue = preV;
      this.gauge.draw(preV);
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this.animate);
      } else { this.timeid = setTimeout(this.animate, 1); }
    } else {
      this.gauge.draw(this.gauge.value);
      this.timeid && clearTimeout(this.timeid);
    }
  }
  render() {
    return <div style={{ position: 'relative', width: '100%', height: '100%' }}><canvas id={this.id} /></div>;
  }

}
