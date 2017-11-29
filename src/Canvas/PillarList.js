import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PillarList extends Component {
  constructor(props) {
    super(props);
    this.randomNumber = Math.round(Math.random() * 100000);
  }

  componentDidMount() {
    const { data, style, colors } = this.props;
    const colorList = colors || ['#29AAFF', '#0DF29E', '#00D1C6', '#ff0000', '#00ff00'];
    const canvas = document.createElement('canvas');
    const oDiv = document.getElementById(`canvasContainer${this.randomNumber}`);
    canvas.width = style && 'width' in style ? style.width * 2 : 400 * 2;
    canvas.height = style && 'height' in style ? style.height * 2 : 300 * 2;
    canvas.style.width = style && 'width' in style ? `${style.width}px` : '400px';
    canvas.style.height = style && 'height' in style ? `${style.height}px` : '300px';
    oDiv.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Colour adjustment
    const shadeColor = (color, percent) => {
      const num = parseInt(color.substr(1), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = ((num >> 8) & 0x00ff) + amt;
      const B = (num & 0x0000ff) + amt;
      return `rgba(${R < 255 ? (R < 1 ? 0 : R) : 255},${G < 255 ? (G < 1 ? 0 : G) : 255},${B < 255
        ? B < 1 ? 0 : B
        : 255},0.82)`;
    };
    // Draw a cube to the specified specs
    const drawCube = (x, y, wx, wy, h, color) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - wx, y - wx * 0.5);
      ctx.lineTo(x - wx, y - h - wx * 0.5);
      ctx.lineTo(x, y - h * 1);
      ctx.closePath();
      ctx.fillStyle = shadeColor(color, -10);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + wy, y - wy * 0.5);
      ctx.lineTo(x + wy, y - h - wy * 0.5);
      ctx.lineTo(x, y - h * 1);
      ctx.closePath();
      ctx.fillStyle = shadeColor(color, 10);
      ctx.strokeStyle = shadeColor(color, 50);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y - h);
      ctx.lineTo(x - wx, y - h - wx * 0.5);
      ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
      ctx.lineTo(x + wy, y - h - wy * 0.5);
      ctx.closePath();
      ctx.fillStyle = shadeColor(color, 20);
      ctx.strokeStyle = shadeColor(color, 60);
      ctx.stroke();
      ctx.fill();
    };

    const addLabel = (x, y, wx, wy, h, i, val) => {
      const fontBSize = Math.floor(wx * 0.5);
      const fontSSize = Math.floor(wx * 0.38);
      const percent = `${val.percent * 100}%`;
      const offset = val.name.length / 2 * fontSSize;

      let point1X = x - wx;
      let point1Y = y - h * 0.7 - wx * 0.5;
      let point2X = x - 2 * wx;
      let point2Y = y - h * 0.7 - wx * 0.5;
      let point3X = x - 3 * wx;
      let point3Y = y - h * 0.8 - wx * 0.5;
      let labelX = x - 3 * wx - offset;
      let labelXTitleY = y - h * 0.8 - wx * 0.5 - fontBSize * 1.8;
      let labelXSubTitleY = y - h * 0.8 - wx * 0.5 - fontSSize;
      if (i % 2 !== 0) {
        // right
        point1X = x + wy;
        point1Y = y - wy - h * 0.5;
        point2X = x + 2 * wy;
        point2Y = y - wy - h * 0.5;
        point3X = x + 3 * wy;
        point3Y = y - wy - h * 0.6;
        labelX = x + 3 * wy - offset;
        labelXTitleY = y - wy - h * 0.6 - fontBSize * 1.8;
        labelXSubTitleY = y - wy - h * 0.6 - fontSSize;
      }
      ctx.beginPath();
      ctx.strokeStyle = '#999';
      ctx.moveTo(point1X, point1Y);
      ctx.lineTo(point2X, point2Y);
      ctx.lineTo(point3X, point3Y);
      ctx.stroke();
      ctx.fillStyle = colorList[i];
      ctx.font = `${fontBSize}px Microsoft YaHei`;
      ctx.fillText(percent, labelX, labelXTitleY);
      ctx.fillStyle = '#000';
      ctx.font = `${fontSSize}px Microsoft YaHei`;
      ctx.fillText(val.name, labelX, labelXSubTitleY);
    };

    // Animation
    const draw = () => {
      // clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wobble the cube using a sine wave
      // const wobble = Math.sin(Date.now() / 250) * canvas.height / 80;
      // drawCube(100, 420 + wobble + y / 2, x, x, cube.height[0], cube.color[0]);//如果需要wobble的参考
      // sort
      data.sort((a, b) => {
        return a.percent < b.percent;
      });
      if (data && data.length) {
        const len = data.length;
        const bottom = canvas.height; // 柱子的前面的右棱和底棱是参照起点
        let heightList = [];
        let xList = [];
        let bottomList = [];
        let w = canvas.width / 3 / 4; // 柱子截面长宽
        let h = canvas.height * 0.988 - w * Math.sin(Math.PI / 3) * 1.2; // 柱子可取得的最大高度，因为斜着

        switch (len) {
          case 5:
            // 顺序为后、右、左、前,左前
            w = canvas.width / 3 / 5;
            h = canvas.height * 0.988 - w * Math.sin(Math.PI / 3) * 1.2;
            bottomList = [
              bottom - w / Math.sin(Math.PI / 3),
              bottom - w / Math.sin(Math.PI / 3) / 2,
              bottom - w / Math.sin(Math.PI / 3) / 2,
              bottom * 0.988,
              bottom * 0.988,
            ];

            heightList = [
              h * data[0].percent - w / Math.sin(Math.PI / 3),
              h * data[1].percent - w / Math.sin(Math.PI / 3) / 2,
              h * data[2].percent - w / Math.sin(Math.PI / 3) / 2,
              h * data[3].percent,
              h * data[4].percent,
            ];

            xList = [
              canvas.width / 15 * 8,
              canvas.width / 15 * 9,
              canvas.width / 15 * 7,
              canvas.width / 15 * 8,
              canvas.width / 15 * 6,
            ];
            break;
          case 4:
            // 顺序为后、右、左、前
            bottomList = [
              bottom - w / Math.sin(Math.PI / 3),
              bottom - w / Math.sin(Math.PI / 3) / 2,
              bottom - w / Math.sin(Math.PI / 3) / 2,
              bottom * 0.988,
            ];
            heightList = [
              h * data[0].percent - w / Math.sin(Math.PI / 3),
              h * data[1].percent - w / Math.sin(Math.PI / 3) / 2,
              h * data[2].percent - w / Math.sin(Math.PI / 3) / 2,
              h * data[3].percent,
            ];

            xList = [
              canvas.width / 2,
              canvas.width / 12 * 7,
              canvas.width / 12 * 5,
              canvas.width / 2,
            ];
            break;
          default:
            // 顺序为后、右、左
            bottomList = [
              bottom - w / Math.sin(Math.PI / 3),
              bottom - w / Math.sin(Math.PI / 3) / 2,
              bottom - w / Math.sin(Math.PI / 3) / 2,
            ];
            heightList = [
              h * data[0].percent - w / Math.sin(Math.PI / 3),
              h * data[1].percent - w / Math.sin(Math.PI / 3) / 2,
              h * data[2].percent - w / Math.sin(Math.PI / 3) / 2,
            ];

            xList = [canvas.width / 2, canvas.width / 12 * 7, canvas.width / 12 * 5];
        }
        for (let i = 0; i < len; i++) {
          drawCube(xList[i], bottomList[i], w, w, heightList[i], colorList[i]);
          addLabel(xList[i], bottomList[i], w, w, heightList[i], i, data[i]);
        }
        // requestAnimationFrame(draw);
      }
    };
    draw();
  }

  render() {
    return (
      <div
        id={`canvasContainer${this.randomNumber}`}
        className="canvas-container"
        style={{ textAlign: 'center' }}
      />
    );
  }
}

PillarList.propTypes = {
  data: PropTypes.array.isRequired,
};
