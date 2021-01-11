# Deep-Viz of React

A React component library, provide concise and beautiful diversity charts with Canvas, SVG, E-map, WebGL, Dom, based on data visualization experience and commercial data display practice. [https://ludejun.github.io/deepviz/](https://ludejun.github.io/deepviz/)

主要专注于数据可视化，提供统一、简洁、漂亮、多样图表并糅合数据可视化经验、商业数据展示惯例的React组件库

~~~
1.特性

2.支持环境

3.组件范围

4.安装使用

5.如何贡献

6.感谢

7.展示网站技术栈介绍
~~~

### 特性

- 提供丰富数据可视化组件，基础图表、电子地图、3D制图等，能满足绝大部分可视化需求


- 组件配置简洁化，很少的代码即可画出复杂、统一、漂亮图表；同时可通过特殊配置兼容90%其他需求


- 糅合多年数据可视化经验、商业数据展示惯例，将不必要的配置去掉


- 高质量React组件库，ES2015编写，PropsType完善，严格Eslint规则，统一设计规范


- 支持npm + webpack安装使用

### 支持环境

- 现代浏览器和 IE9 及以上


- 大部分组件在支持Canvas的浏览器上即可使用

### 组件范围

- Basic/Echarts 基础图表组件


- Map 地图组件


- Pictogram/Dom 象形图组件


- SVG 组件


- Canvas 组件


- WebGL/3D 组件

  参考示例网站：[https://ludejun.github.io/deepviz/](https://ludejun.github.io/deepviz/)

### 安装使用

推荐使用npm安装使用

```shell
npm install deep-viz --save
```

👇为一个简单LineChart例子，详情可见[https://ludejun.github.io/deepviz/#/main/components/basic/line-chart](https://ludejun.github.io/Deep-Viz-Website/#/main/components/basic/line-chart)

```javascript
import { LineChart } from 'deep-viz';

const config = {
  x: { data: lineData.date },
  y: [{data: [lineData.y1, lineData.y2], legend: ['legend1', 'legend2'], name: 'yAxisName/unit'}]
}

ReactDOM.render(
<LineChart config={ config }/>
, mountNode);
```

### 如何贡献

第一版开发人员主要基于大数据前端开发和设计小组，感谢他们卓有成效的付出。在3D及2D组件方面还有不少提升空间，也希望得到大家的帮助。

如您希望参与贡献，欢迎 [Pull Request](https://github.com/ludejun/Deep-Viz/pulls)，或给我们 [报告 Bug](https://github.com/ludejun/Deep-Viz/issues)。

### 感谢

秉持不重复造轮子的初衷，组件库开发过程中，大量使用或借鉴其他开源社区图表方案，这里一并表示感谢。有些组件想了解更深入，也可以去相应源头去了解。

- [Echarts](http://echarts.baidu.com/)
- [Baidu Map Javascript API](http://lbsyun.baidu.com/index.php?title=jspopular)
- [Three](https://threejs.org/)
- [Heatmap](https://github.com/pa7/heatmap.js)
- [Gaode Map Javascript API](http://lbs.amap.com/api/javascript-api/summary/)
- [Echarts-X](http://echarts.baidu.com/echarts2/x/doc/index.html)
- [Anime](http://anime-js.com/)

### 展示网站技术栈介绍

展示网站技术栈主要为 React + dva + Ant-Design，对此中使用的开源产品一并表示深深的感谢，希望本组件库能像这些产品一样大大提高前端开发效率。

[dva](https://github.com/dvajs/dva)是一个基于 react 和 redux、sagas、roadhog 的轻量应用框架，概念来自 elm， 支持 side effects、热替换、动态加载、react-native、SSR 等，已在生产环境广泛应用。

[Ant-Design](https://github.com/ant-design/ant-design)是蚂蚁金服出品的一套丰富 React UI 组件库，适合开发和服务于企业级后台产品。
