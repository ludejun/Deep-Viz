/**
 * Created by Administrator on 2017/10/11.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class CircleAnimate extends React.Component {
  constructor(props) {
    super(props);
    function Circle(opts) {
      this.pos = {};
      this._ctx = opts.ctx;
      this._width = opts.width;
      this._height = opts.height;
      this._fillStyle = opts.fillStyle;
      this.init();
    }
    Circle.prototype = {
      constructor: Circle,
      init() {
        this.pos.x = Math.random() * this._width;
        this.pos.y = this._height + (Math.random() * 100);
        this.alpha = 0.1 + (Math.random() * 0.3);
        this.scale = 0.1 + (Math.random() * 0.3);
        this.velocity = Math.random();
      },
      draw() {
        if (this.alpha <= 0) {
          this.init();
        }
        this.pos.y -= this.velocity;
        this.alpha -= 0.0005;
        this._ctx.beginPath();
        this._ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false);
        // this._ctx.fillStyle = `rgba(, ${this.alpha})`;
        this._ctx.globalAlpha = this.alpha;
        this._ctx.fillStyle = this._fillStyle;
        this._ctx.fill();
      },
    };
    this.initHeader = () => {
      const width = this.props.width ? this.props.width : window.innerWidth;
      const height = this.props.height ? this.props.height : window.innerHeight;
      const animateHeader = true;
      const largeHeader = document.getElementById('_circleanimateBgImg');
      largeHeader.style.height = `${height}px`;

      const canvas = document.getElementById('_circleanimate');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const fillStyle = this.props.fillStyle || 'rgb(255,255,255)';
      // create particles
      const circles = [];
      for (let x = 0; x < width * 0.5; x++) {
        const c = new Circle({
          ctx,
          width,
          height,
          fillStyle,
        });
        circles.push(c);
      }
      function animate() {
        if (animateHeader) {
          ctx.clearRect(0, 0, width, height);
          for (let i = 0; i < circles.length; i++) {
            circles[i].draw();
          }
        }
        requestAnimationFrame(animate);
      }

      animate();
    };
  }

  componentDidMount() {
    // Main
    this.initHeader();
  }

  render() {
    const bgStyle = {
      backgroundImage: 'url(img/default.jpg)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: this.props.width || window.innerWidth,
      height: this.props.height || window.innerHeight,
    };
    return (
      <div>
        <div id="_circleanimateBgImg" style={bgStyle}>
          <canvas id="_circleanimate" />
        </div>
      </div>
    );
  }
}
CircleAnimate.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
