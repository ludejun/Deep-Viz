import React from 'react';

class RadarSpan extends React.Component {
  constructor(props) {
    super();
    this.id = `${Math.random()}-canvas`;
    this.scaleRatio = 2;
    this.offCanvas = document.createElement('canvas');
    this.offContext = this.offCanvas.getContext('2d');
    this.minLength = 0;
    this.theme = props.theme || 'blue';

    this.Grid = function (color, width, height, context) {
      this.context = context;
      this.color = color;
      this.width = width;
      this.height = height;
    };
    this.Grid.prototype.drawGrid = function () {
      this.context.save();
      this.context.strokeStyle = this.color || 'transparent';
      this.context.lineWidth = 2;
      this.drawY();
      this.drawX();
      this.context.restore();
    };
    this.Grid.prototype.drawX = function () {
      const length = this.height;
      const span = length / 16;
      const width = this.width;
      for (let i = 0; i <= length; i += span) {
        this.context.beginPath();
        this.context.moveTo(0, i);
        this.context.lineTo(width, i);
        this.context.stroke();
      }
      this.context.beginPath();
      this.context.moveTo(0, length - 1);
      this.context.lineTo(width, length - 1);
      this.context.stroke();
    };
    this.Grid.prototype.drawY = function () {
      const length = this.width;
      const span = length / 16;
      const height = this.height;
      for (let j = 0; j <= length; j += span) {
        this.context.beginPath();
        this.context.moveTo(j, 0);
        this.context.lineTo(j, height);
        this.context.stroke();
      }
      this.context.beginPath();
      this.context.moveTo(length - 1, 0);
      this.context.lineTo(length - 1, height);
      this.context.stroke();
    };
    this.RadarScan = function (x,
      y,
      radius,
      color,
      context,
      offCanvas) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.context = context;
      this.canvasWidth = this.context.canvas.width;
      this.canvasHeight = this.context.canvas.height;
      this.angle = 0;
      this.offscreenCanvas = offCanvas;
    };
    this.RadarScan.prototype.drawPan = function () {
      const step = this.radius / 5;
      this.context.save();
      this.context.strokeStyle = `${this.color}0.8)`;
      this.context.lineWidth = 4;
      for (let i = step; i <= this.radius; i += step) {
        this.context.beginPath();
        this.context.arc(this.x, this.y, i, 0, Math.PI * 2);
        this.context.stroke();
      }
      this.context.restore();
    };
    this.RadarScan.prototype.radarLine = function () {
      const count = (Math.PI * 1.5 / 4) / 0.006;
      const span = 1 / count;
      for (let i = this.angle, j = 0; i <= Math.PI * 1.5 / 4 + this.angle; i += 0.006, j += 1) {
        this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.strokeStyle = `${this.color}${1 - span * j})`;
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x + this.radius * Math.cos(i),
        this.y + this.radius * Math.sin(i));
        this.context.stroke();
      }
    };
    this.RadarScan.prototype.animate = function () {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.drawImage(this.offscreenCanvas, 0, 0);
      this.angle -= 0.03;
      this.radarLine();
      window.requestAnimationFrame(this.animate.bind(this));
    };
    this.RadarScan.prototype.startA = function () {
      window.requestAnimationFrame(this.animate.bind(this));
    };
  }
  componentDidMount() {
    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext('2d');
    const styleDom = window.getComputedStyle(this.canvas.parentNode);
    const width = Math.floor(window.parseInt(styleDom.width));
    const height = Math.floor(window.parseInt(styleDom.height));
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.width = width * this.scaleRatio;
    this.canvas.height = height * this.scaleRatio;
    this.offCanvas.width = width * this.scaleRatio;
    this.offCanvas.height = height * this.scaleRatio;
    this.minLength = Math.min(this.canvas.width, this.canvas.height);
    this.context.translate(0.5, 0.5);
    this.grids = new this.Grid(this.theme === 'blue' ? 'rgba(34,104,160,0.3)' : 'rgba(48,62,51,0.3)'
    , this.canvas.width,
    this.canvas.height, this.context);
    this.grids.drawGrid();
    this.radar = new this.RadarScan(this.canvas.width / 2,
        this.canvas.height / 2,
        this.minLength * 0.9 / 2,
        this.theme === 'blue' ? 'rgba(80,159,198,' :
        'rgba(108,192,118,',
         this.context,
        this.offCanvas);
    this.radar.drawPan();
    this.offContext.drawImage(this.canvas, 0, 0);
    this.radar.startA();
  }
  render() {
    return (<div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas id={this.id}>对不起，您的浏览器不支持canvas</canvas>
    </div>);
  }
}
export default RadarSpan;
