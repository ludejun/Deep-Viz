import React from 'react';

export default class ScratchOff extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.context = null;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.img = null;
    this.offScreen = document.createElement('canvas');
    this.offContext = this.offScreen.getContext('2d');
    this.offsetX = 0;
    this.offsetY = 0;
    this.scratchWidth = 0;
    this.scratchHeight = 0;
    this.scratch = false;
    this.earser = null;
    this.earserOpt = { radius: 10, color: '#fff' };
    this.Earser = Earser;
    this.text = '祝君好运';
    function Earser(x, y, radius, color, lineWidth, context) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.lineWidth = lineWidth;
      this.context = context;
    }
    Earser.prototype.createPath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    };
    Earser.prototype.createClipPath = function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius + 1, 0, Math.PI * 2);
    };
    // Earser.prototype.drawEarser = function () {
    //   this.createPath();
    //   this.context.save();
    //   this.context.fillStyle = this.color;
    //   this.context.fill();
    //   this.context.restore();
    // };
    this.scratchOffCanvas = null;
  }
  componentDidMount() {
    this.canvas = this.scratchOffCanvas;
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = this.props.width || 500;
    this.canvasHeight = this.props.height || 300;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.offScreen.width = this.canvasWidth;
    this.offScreen.height = this.canvasHeight;
    if (this.props.background) {
      this.img = new Image();
      this.img.onload = () => {
        this.offContext.drawImage(this.img, 0, 0, this.canvasWidth, this.canvasHeight);
        if (this.props.scratchPosition) {
          this.scratchWidth = this.props.scratchPosition.width || 200;
          this.scratchHeight = this.props.scratchPosition.height || 100;
          this.offsetX = this.props.scratchPosition.offserX ||
          (this.canvasWidth - this.scratchWidth - 10);
          this.offsetY = this.props.scratchPosition.offsetY ||
          (this.canvasHeight - this.scratchHeight - 10);
        }
        const fontSize = this.scratchHeight * 0.5;
        this.offContext.font = `${fontSize}px serial`;
        this.props.textContent && typeof this.props.textContent === 'string' && (this.text = this.props.textContent);
        this.offContext.fillStyle = 'black';
        const tx = this.canvasWidth - this.scratchWidth / 2 - 10;
        const ty = this.canvasHeight - this.scratchHeight / 2 - 10;
        this.offContext.textAlign = 'center';
        this.offContext.textBaseline = 'middle';
        this.offContext.fillStyle = this.props.textColor || 'black';
        this.offContext.fillText(this.text, tx, ty, this.scratchWidth - 20);
        this.context = this.canvas.getContext('2d');
        this.context.drawImage(this.offScreen, 0, 0);
        this.context.beginPath();
        this.context.save();
        this.context.fillStyle = 'lightgray';
        this.context.rect(this.offsetX, this.offsetY, this.scratchWidth, this.scratchHeight);
        this.context.fill();
        this.context.restore();
      };
      this.img.src = this.props.background;
      this.earserOpt = Object.assign(this.earserOpt, this.props.earserOpt || {});
      this.Rect = this.canvas.getBoundingClientRect();
    }
  }
  mouseDown = (e) => {
    const x = e.clientX - this.Rect.left;
    const y = e.clientY - this.Rect.top;
    this.context = this.canvas.getContext('2d');
    this.context.beginPath();
    this.context.rect(this.offsetX, this.offsetY, this.scratchWidth, this.scratchHeight);
    if (this.context.isPointInPath(x, y)) {
      this.scratch = true;
      if (this.earser) {
        this.earser.x = x;
        this.earser.y = y;
      } else {
        this.earser = new this.Earser(x,
            y,
            this.earserOpt.radius,
             this.earserOpt.color,
             1,
             this.context);
      }
    } else {
      this.scratch = false;
    }
  }
  mouseMove = (e) => {
    const x = e.clientX - this.Rect.left;
    const y = e.clientY - this.Rect.top;
    this.context = this.canvas.getContext('2d');
    this.context.beginPath();
    this.context.rect(this.offsetX, this.offsetY, this.scratchWidth, this.scratchHeight);
    if (this.scratch && this.context.isPointInPath(x, y)) {
      this.earser.x = x;
      this.earser.y = y;
      this.context.save();
      this.earser.createPath();
      this.context.clip();
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.restore();
      this.context.save();
      this.earser.createClipPath();
      this.context.clip();
      this.context.drawImage(this.offScreen, 0, 0);
      this.context.restore();
    }
  }
  mouseUp = () => {
    this.scratch = false;
  }
  render() {
    return <div><canvas id="canvas" style={{ cursor: 'pointer' }} onMouseMove={this.mouseMove} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} ref={(ref) => { this.scratchOffCanvas = ref; }}>对不起，您的浏览器不支持刮奖！请升级浏览器</canvas></div>;
  }
}
