### BarChart3D 3D柱状图

#### BarChart3D

| 参数     | 说明                                       | 类型     | 默认值                            |
| ------ | ---------------------------------------- | ------ | ------------------------------ |
| color  | 非必需，自定义折线的颜色数组，按顺序取色                     | Array  | 同LineChart.color               |
| config | 必需，配置折线图的数据源等，详见下面Table                  | Object | null                           |
| style  | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object | { height: 250, width: '100%' } |

#### config

| 参数     | 说明                                       | 类型     | 默认值  |
| ------ | ---------------------------------------- | ------ | ---- |
| x      | 必需，定义x轴数据源，详见下面Table                     | Object | null |
| y      | 必需，定义y轴数据源及配置，详见下面Table，类同x              | Object | null |
| z      | 必需，定义z轴数据源及配置，详见下面Table，类同x              | Object | null |
| data   | 必需，定义数据源及配置。                             | Array  | []   |
| title  | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | String | null |
| box    | 非必需，三维地图上的柱状图属性设置。                       | Object | null |
| view   | 非必需，用于鼠标的旋转，缩放等视角控制。                     | Object | null |
| light  | 非必需，光照相关的设置，详见下面Table。                   | Object | null |
| option | 非必需，接口预留直接改变或覆盖Chart属性。                  | Object | null |

#### x:[data:,name:""]

| 参数   | 说明                 | 类型      | 默认值  |
| ---- | ------------------ | ------- | ---- |
| data | 必需，定义x轴数据源         | Array   | null |
| name | 非必需，定义x轴名称，放于坐标轴右侧 | String  | null |
| show | 非必需，是否显示 x 轴。      | Boolean | true |
| axis | 非必需,坐标轴的其他属性       | Object  |      |

#### box

| 参数     | 说明              | 类型     | 默认值  |
| ------ | --------------- | ------ | ---- |
| width  | 非必需，组件在三维场景中的宽度 | Number | 100  |
| height | 非必需，组件在三维场景中的高度 | Number | 非10  |
| depth  | 非必需，组件在三维场景中的深度 | Number | 80   |

#### view

| 参数    | 说明                                      | 类型     | 默认值  |
| ----- | --------------------------------------- | ------ | ---- |
| alpha | 非必需，视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。 | Number | 0    |
| beta  | 非必需，视角绕 y 轴，即左右旋转的角度。                   | Number | 40   |

#### light

| 参数    | 说明                                     | 类型     | 默认值  |
| ----- | -------------------------------------- | ------ | ---- |
| alpha | 非必需，主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。 | Number | 40   |
| beta  | 非必需，主光源绕 y 轴，即左右旋转的角度。                 | Number | 40   |

### ThreeModel 人物模型图

#### PeopleModel

| 参数                 | 说明                                       | 类型            | 默认值              |
| ------------------ | ---------------------------------------- | ------------- | ---------------- |
| width              | 非必需，自定义模型容器canvas的宽度                     | Number/String | 300              |
| height             | 非必需，自定义模型容器canvas的高度                     | Number/String | 300              |
| modelType          | 非必需，选择内置的两款模型类型，可取male、female字符串         | String        | 'male'           |
| modelPath          | 非必需，自定义模型文件路径，一般为obj文件，modelPath没有会取modelType，modelPath优先 | String        | null             |
| pointLightColor    | 非必需，点光源颜色                                | String        | rgb(0, 197, 205) |
| pointLightPosition | 非必需，点光源位置，为length=3的数组，分别对应x、y、z位置       | Array         | [50, 50, 60]     |
| ambientLightColor  | 非必需，环境光源颜色，为模型底色                         | String        | rgb(245,222,179) |
| cameraZ            | 非必需，=camera.position.z，代表摄像头和模型的距离，越小模型越大 | Number        | 250              |
| cameraY            | 非必需，=camera.position.y，代表摄像头和模型在Y轴上位置，改变此值会上下移动模型 | Number        | -80              |
| isOnMouseMove      | 非必需，模型是否随着鼠标移动而旋转，默认关闭                   | Boolean       | false            |
| rotatateY          | 非必需，模型在y轴上旋转的速度，正负数旋转的方向也不一致             | Number        | 0.05             |

### GlobePointLine 3D地球点线图

#### GlobePointLine

| 参数     | 说明                        | 类型     | 默认值                         |
| ------ | ------------------------- | ------ | --------------------------- |
| config | 必需，配置折线图的数据源等，详见下面Table   | Object | null                        |
| style  | 非必需，设置地球的宽高等，最好保持宽高比例为1:1 | Object | { height: 400, width: 400 } |

#### config

| 参数            | 说明                                       | 类型     | 默认值  |
| ------------- | ---------------------------------------- | ------ | ---- |
| baseTexture   | 非必需，地球的纹理。支持图片路径字符串，图片或者Canvas的对象。       | String | 默认皮肤 |
| heightTexture | 非必需，地球的高度纹理，{text:"",show:true}，默认显示，text为高度纹理用于凹凸贴图表现地球表面的明暗细节。 | Object | 默认皮肤 |
| overlay       | 非必需，地球表面层的配置，可使用该配置项加入云层，格式同heightTexture。 | Object | 默认皮肤 |
| blend         | 非必需，跟baseTexture混合使用，格式同heightTexture。   | Object | 默认皮肤 |
| data          | 必需，系列列表，每个系列通过type决定自己的图表类型。详见下面table    | Array  | []   |

#### data

| 参数         | 说明                                       | 类型     | 默认值    |
| ---------- | ---------------------------------------- | ------ | ------ |
| typeData   | 必需，type为里lines3D通常数据的每一项是一个包含起点和终点的坐标集,每个点分别数据分别表示经纬度和海拔,type为scatter3D时数据项分别表示经纬度。 | Array  | []     |
| type       | 必需，可选scatter3D散点气泡图或者lines3D三维飞线图        | String |        |
| color      | 非必需，定义线或者点的颜色。                           | String |        |
| width      | 非必需，只对lines3D有用                          | Number | 1      |
| symbol     | 非必需，定义散点的形状，类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'，只对scatter3D有用。 | String | circle |
| symbolSize | 非必需，标记的大小，只对scatter3D有用。                 | Number | 10     |
| option     | 非必需，系列的其他属性，预留接口                         | Object |        |

#### itemStyle

| 参数        | 说明                                       | 类型     | 默认值   |
| --------- | ---------------------------------------- | ------ | ----- |
| color     | 非必需，文字的颜色。                               | String | #000  |
| fontSize  | 文字的字体大小。                                 | number | 14    |
| formatter | 非必需，标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。 | String |       |
| position  | 非必需，标签的位置，可选 top、left、right和bottom。      | String | right |