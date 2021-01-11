import React from 'react';

export default class DataScatter extends React.Component {
  constructor() {
    super();
    this.id = `${Math.random()}-canvas`;
    this.color = [
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
    this.squareArray = [];
    this.scaleratio = 2;
    this.Square = function (x, y, width, height, scaleratio, context) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.scaleratio = scaleratio;
      this.context = context;
      this.content = [];
      this.circlesArray = [];
    };
    this.Square.prototype.caculate = function () {
      this.left = this.x;
      this.top = this.y;
      this.right = this.x + this.width;
      this.bottom = this.y + this.height;
      this.cx = this.x + this.width / 2;
      this.cy = this.y + this.height / 2;
    };
    this.Square.prototype.createOutlinePath = function () {
      this.context.beginPath();
      this.context.strokeRect(this.x, this.y, this.width, this.height);
      this.context.closePath();
    };
    this.Square.prototype.drawOutlinePath = function () {
      this.context.save();
      this.context.strokeStyle = 'rgba(171,171,171,0.4)';
      this.context.stroke();
      this.context.restore();
    };
    this.Square.prototype.createToolTip = function () {
      this.div = document.createElement('div');
      this.div.style.position = 'absolute';
      this.div.style.top = `${this.y / this.scaleratio}px`;
      this.div.style.width = `${this.width / this.scaleratio}px`;
      this.div.style.height = `${this.height / this.scaleratio}px`;
      this.div.style.left = `${this.x / this.scaleratio}px`;
      this.div.style.transition = 'opacity .2s linear';
      this.div.style.background = 'rgba(50, 50, 50, 0.7)';
      this.div.style.textAlign = 'center';
      this.div.style.opacity = 0;
      const textNode = document.createElement('div');
      textNode.style.textAlign = 'center';
      textNode.style.color = '#fff';
      textNode.style.marginTop = `${this.height / this.scaleratio / 3}px`;
      textNode.innerText = this.content.title;
      this.div.appendChild(textNode);
      this.context.canvas.parentNode.appendChild(this.div);
    };
    this.Square.prototype.isPointInPath = function (x, y) {
      if (x > this.left && x < this.right && y > this.top && y < this.bottom) {
        return true;
      }
      return false;
    };
    this.Circle = function (x, y, radius, color, vx, vy, context) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.vx = vx;
      this.vy = vy;
      this.context = context;
    };
    this.Circle.prototype.createCirclePath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    };
    this.Circle.prototype.drawCirclePath = function () {
      this.context.save();
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.restore();
    };
  }
  componentDidMount() {
    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext('2d');
    const styleDom = window.getComputedStyle(this.canvas.parentNode);
    const width = Math.floor(window.parseInt(styleDom.width));
    const height = Math.floor(window.parseInt(styleDom.height));
    this.canvas.width = width * this.scaleratio;
    this.canvas.height = height * this.scaleratio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.rect = this.canvas.getBoundingClientRect();
    if (Array.isArray(this.props.items)) {
      const col = this.props.col || this.props.items.length || 1;
      const row = this.props.row || 1;
      const perw = Math.floor(width * this.scaleratio / col);
      const perh = Math.floor(height * this.scaleratio / row);
      let i;
      let j;
      for (i = 0; i < col; i++) {
        const x = i * perw;
        for (j = 0; j < row; j++) {
          const y = j * perh;
          const squareInstance = new this.Square(x, y, perw, perh, this.scaleratio, this.canvas.getContext('2d'));
          squareInstance.caculate();
          this.squareArray.push(squareInstance);
        }
      }
      this.items = this.props.items;
      const items = this.items;
      const length = this.squareArray.length;
      for (i = 0; i < length; i++) {
        const it = this.squareArray[i];
        if (items[i]) {
          it.content = items[i];
          const count = it.content.num;
          const minLength = Math.min(it.width, it.height);
          const color = this.color[Math.floor(Math.random() * 11)];
          const angle = Math.PI * 2 / count;
          const basespeed = 2;
          for (j = 0; j < count; j++) {
            const radius = Math.random() * minLength * 0.02 + minLength * 0.01;
            const circle = new this.Circle(
                        it.cx,
                        it.cy,
                        radius,
                        color,
                        basespeed * Math.cos(angle * j),
                        basespeed * Math.sin(angle * j),
                        this.context = this.canvas.getContext('2d'),
                    );
            it.circlesArray.push(circle);
          }
          it.createToolTip();
        }
      }
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }
  animate = () => {
    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let i;
    this.squareArray.forEach((it) => {
      it.createOutlinePath();
      it.drawOutlinePath();
      const circles = it.circlesArray;
      const length = circles.length;
      for (i = 0; i < length; i++) {
        const circle = circles[i];
        circle.x += circle.vx;
        circle.y += circle.vy;
        if (circle.x < it.left + circle.radius || circle.x > it.right - circle.radius) {
          circle.vx = -circle.vx;
        }
        if (circle.y < it.top + circle.radius || circle.y > it.bottom - circle.radius) {
          circle.vy = -circle.vy;
        }
        circle.createCirclePath();
        circle.drawCirclePath();
      }
    });
    window.requestAnimationFrame(this.animate.bind(this));
  }
  mousemove = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * this.scaleratio;
    const y = (e.clientY - rect.top) * this.scaleratio;
    let i;
    const squares = this.squareArray;
    if (this.currentSqu) {
      this.currentSqu.div.style.opacity = 0;
    }
    for (i = squares.length - 1; i >= 0; i--) {
      if (squares[i].isPointInPath(x, y)) {
        this.currentSqu = squares[i];
        this.currentSqu.div.style.opacity = 1;
        break;
      }
    }
  }
  mouseout = () => {
    if (this.currentSqu) {
      this.currentSqu.div.style.opacity = 0;
    }
  }
  render() {
    return (<div
      onMouseMove={this.mousemove}
      onMouseOut={this.mouseout}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'none',
        cursor: 'pointer',
      }}
    >
      <canvas id={this.id}>对不起，您的浏览器不支持canvas</canvas>
    </div>);
  }
}
