### 仪表盘

#### Gauge

| 参数             | 说明                  | 类型     | 默认值   |
| :------------- | ------------------- | ------ | ----- |
| number         | 必需，定义仪表盘当前刻度值       | Number | 0     |
| startNumber    | 非必需，定义仪表盘刻度值的初始值    | Number | 0     |
| numberInterval | 非必需，定义仪表盘刻度值之间的间隔大小 | Number | 20    |
| unit           | 非必需，定义仪表盘刻度值的单位     | String | Km／h  |
| displayLable   | 非必需，定义仪表盘刻两侧label   | Bool   | false |
| leftLabel      | 非必需，定义仪表盘左侧label    | String | 男     |
| rightLabel     | 非必需，定义仪表盘右侧label    | String | 女     |

### PillarList 立体簇状柱形图

#### PillarList

| 参数     | 说明                                       | 类型     | 默认值                                      |
| ------ | ---------------------------------------- | ------ | ---------------------------------------- |
| style  | 非必需，定义Canvas宽度                           | Object | {width:400,height:300}                   |
| data   | 必需，目前输入几组柱子配置（目前只支持三组、四组和五组），形式如下[ { percent: 0.3,name:'高端消费' }, { percent: 0.6,name:'普通消费'}, { percent: 0.4,name:'低端消费'}, ] | Array  |                                          |
| colors | 非必需                                      | Array  | ['#29AAFF','#0DF29E','#00D1C6','#ff0000','#00ff00'] |

### ScatterCurveMap 多样迁徙地图

#### ScatterCurve

| 参数              | 说明                                       | 类型     | 默认值     |
| --------------- | ---------------------------------------- | ------ | ------- |
| map             | 必需，定义地图类型、地图背景颜色，地图区域描边颜色，地图区域填充颜色       | Object |         |
| fromPoint       | 必需，定义初始始发地坐标                             | Array  |         |
| toPoints        | 必需，定义迁徙到的目的地坐标                           | Array  |         |
| travelDirection | 非必需，定义迁徙方向;to-from为从目的地到始发地迁徙，fom-to为从事发地到目的地迁徙 | String | from-to |
| travelType      | 非必需，定义迁徙样式，当样式为circle时没有迁徙线路，其他值时存在迁徙线条  | String | 非circle |

#### map Object

| 参数                  | 说明                     | 类型     | 默认值               |
| ------------------- | ---------------------- | ------ | ----------------- |
| type                | 必需，定义地图类型为世界地图还是中国地图   | String |                   |
| name                | 非必需，定义当地图为中国地图时，要展示的区域 | String | 中国                |
| mapBackgroundColor  | 非必需，地图背景颜色             | Color  | #020B22           |
| areaBackgroundColor | 非必需，定义地图行政区域填充         | Color  | rgba(3,23,60,0.8) |
| areaLineColor       | 非必需，定义行政区域描边颜色         | Color  | #2268A0           |

### CircleAnimate 气泡Canvas

#### CircleAnimate

| 参数        | 说明                                  | 类型     | 默认值                |
| --------- | ----------------------------------- | ------ | ------------------ |
| width     | 非必需，设置canvas的宽，一般格式 width= "宽度"     | Number | window.innerWidth  |
| height    | 非必需，设置canvas的高，一般格式 height= "高度"    | Number | window.innerHeight |
| fillStyle | 非必需，设置气泡的填充色，一般格式 fillStyle= "#fff" | String | rgb(255,255,255)   |

### RainbowRain 彩虹雨Canvas

#### RainbowRain

| 参数     | 说明                               | 类型     | 默认值                |
| ------ | -------------------------------- | ------ | ------------------ |
| width  | 非必需，设置canvas的宽，一般格式 width= "宽度"  | Number | window.innerWidth  |
| height | 非必需，设置canvas的高，一般格式 height= "高度" | Number | window.innerHeight |

### ScratchOffScratchOff

#### ScratchOff

| 参数              | 说明                 | 类型     | 默认值   |
| --------------- | ------------------ | ------ | ----- |
| width           | 非必需，刮奖卡的宽度         | Number | 500   |
| height          | 非必需，刮奖卡的高度         | Number | 300   |
| background      | 必需，定义刮奖卡的背景图片      | String |       |
| scratchPosition | 必需，定义刮奖区域的位置与大小    | Object |       |
| textContent     | 必需，定义刮奖卡大中奖内容      | String |       |
| textColor       | 非必需，定义刮奖卡大中奖内容文字颜色 | Color  | black |

#### scratchPosition

| 参数      | 说明             | 类型     | 默认值  |
| ------- | -------------- | ------ | ---- |
| offsetX | 非必需，刮奖卡刮奖区域x偏移 | Number | 右下角  |
| offsetY | 非必需，刮奖卡刮奖区域y偏移 | Number | 右下角  |
| width   | 非必需，刮奖卡刮奖区域宽度  | Number | 200  |
| height  | 非必需，刮奖卡刮奖区域长度  | Number | 100  |