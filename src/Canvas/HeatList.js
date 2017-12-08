import React from 'react';

class HeatList extends React.Component {
  constructor() {
    super();
    this.id = `${Math.random()}-canvas`;
    this.scaleRatio = 2;
    this.circleArray = [];
    this.Circle = function (x, y, radius, vx, vy, mass, color, text, set, context) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.vx = vx;
      this.vy = vy;
      this.ax = 0;
      this.ay = 0;
      this.mass = mass;
      this.color = color;
      this.text = text;
      this.set = set;
      this.context = context;
    };
    this.Circle.prototype.createCirclePath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    };
    this.Circle.prototype.createClipCirclePath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    };
    this.list = [
        { name: '百度', percent: 30 },
        { name: '腾讯', percent: 20 },
        { name: '360', percent: 10 },
        { name: '阿里巴巴', percent: 40 },
    ];
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
  }
  render() {
    return (<div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas id={this.id}>对不起，您的浏览器不支持canvas</canvas>
    </div>);
  }
}
export default HeatList;
