### PieChartSvg SVG饼图

#### PieChartSvg

| 参数     | 说明                      | 类型     | 默认值         |
| ------ | ----------------------- | ------ | ----------- |
| data   | 必需。定义展示数据               | Array  | []          |
| color  | 可空。定义颜色，将循环color数组给数据赋值 | Array  | ["#0073CC"] |
| unit   | 可空。数据单位。空字符串可用来增加标签宽度。  | String | ""          |
| height | 可空。svg的viewBox的高        | Number | 580         |
| width  | 可空。svg的viewBox的宽        | Number | 1000        |
| loop   | 待实现。循环显示动画              | 待实现    | 待实现         |

#### data

| 参数    | 说明             | 类型     | 默认值  |
| ----- | -------------- | ------ | ---- |
| value | 必需。每个数据显示的数值   | Number | 无    |
| name  | 可空。每个数据显示的纬度名称 | String | ""   |



### CirclePan 环形图

#### CirclePan

| 参数   | 说明                            | 类型    | 默认值  |
| ---- | ----------------------------- | ----- | ---- |
| data | 必需，定义不同类目数据item的集合，item条目最多6个 | Array | []   |

#### item:{}

| 参数         | 说明                 | 类型     | 默认值         |
| ---------- | ------------------ | ------ | ----------- |
| legend     | 必需，比例说明文字          | String |             |
| textColor  | 非必需，比例说明文字颜色       | color  | black       |
| percent    | 必需，比例数值（乘以100后到数值） | Number | 0           |
| color      | 非必需，定义圆盘颜色         | color  |             |
| backGround | 非必需，定义圆盘背景颜色       | color  | transparent |



### BallMove 小球曲线运动

#### config

| 参数        | 说明                       | 类型     | 默认值    |
| --------- | ------------------------ | ------ | ------ |
| width     | 必需，定义SVG宽度               | String | 727px  |
| ballColor | 必需，定义运动的小球颜色             | String | orange |
| dur       | 可选，控制小球运动快慢，单位s          | String | 5s     |
| direction | 可选，定义小球运动方向，可选值alternate | String | normal |