import React from 'react';

class HotWords extends React.Component {
  constructor() {
    super();
    this.id = `${Math.random()}-canvas`;
    this.scaleRatio = 2;
    this.colors = [
      '#FDB933',
      '#D64F44',
      '#00A6AC',
      '#1D953F',
      '#E0861A',
      '#45B97C',
      '#F3715C',
      '#F26522',
      '#7FB80E',
      '#63C5FA',
    ];
    this.textArray = [];
    this.Text = function (text, x, y, vx, vy, color, font, context) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      this.font = font;
      this.context = context;
    };
    this.Text.prototype.fillText = function () {
      this.context.beginPath();
      this.context.save();
      this.context.fillStyle = this.color;
      this.context.font = this.font;
      this.context.fillText(this.text, this.x, this.y);
      this.context.restore();
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
    this.props.circleOutline && (this.canvas.style.borderRadius = '50%');
    this.canvas.width = width * this.scaleRatio;
    this.canvas.height = height * this.scaleRatio;
    this.context.shadowOffsetX = 5;
    this.context.shadowOffsetY = 5;
    this.context.shadowBlur = 5;
    this.context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    this.worlds = this.props.words || [];
    const angle = Math.PI * 2 / this.worlds.length;
    const baseSpeed = this.props.speed || 3;
    let currentAngle = 0;
    this.worlds.forEach((it) => {
      currentAngle += angle;
      const vx = baseSpeed * Math.cos(currentAngle);
      const vy = baseSpeed * Math.sin(currentAngle);
      const text = new this.Text(
            it,
            x,
            y,
            vx,
            vy,
            this.colors[Math.floor(Math.random() * 11)],
            `${Math.floor(Math.random() * 30 + 30)}px serial`,
            this.context,
        );
      this.textArray.push(text);
    });
    const animation = () => {
      this.context = this.canvas.getContext('2d');
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = this.textArray.length - 1; i >= 0; i--) {
        const it = this.textArray[i];
        if (it.x > width * 2 || it.x < 0 || it.y > height * 2 || it.y < 0) {
          it.x = x;
          it.y = y;
        }
        it.x += it.vx;
        it.y += it.vy;
        it.fillText();
      }
      window.requestAnimationFrame(animation);
    };
    animation();
  }
  render() {
    return (<div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas id={this.id}>对不起，您的浏览器不支持canvas</canvas>
    </div>);
  }
}
export default HotWords;
