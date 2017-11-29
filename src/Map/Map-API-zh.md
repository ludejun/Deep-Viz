### BaiduMapPoint 百度地图散点图

#### BaiduMapPoint

| 参数          | 说明                                 | 类型     | 默认值  |
| ----------- | ---------------------------------- | ------ | ---- |
| centerPoint | 非必需，定义地图的中心点位置；默认为points数组中第一个点的坐标 | Object | null |
| points      | 必需，定义需要打点的坐标数组；每个数组项为Object        | Array  | []   |
| initZoom    | 非必需，定义地图初始的缩放比例，默认5                | number | null |
| style       | 非必需，自定义地图组件外围样式                    | object | null |

### centerPoint

| Property | 说明      | 类型     | 默认值  |
| -------- | ------- | ------ | ---- |
| lng      | 必需，坐标经度 | Number | {}   |
| lat      | 必需，坐标纬度 | Number | null |

### points[*]:points的数组项

| Property | 说明                                       | 类型                   | 默认值  |
| -------- | ---------------------------------------- | -------------------- | ---- |
| name     | 非必需，坐标点mouseover时的提示信息，当为函数是需要返回React虚拟Dom | String \|\| Function | null |
| location | 必需，坐标点经纬度信息                              | Object               | null |
| icon     | 非必需，自定义坐标点的图片                            | Object               | null |
| radius   | 非必需，定义坐标圆点的半径                            | Number               | 12   |

### points[*].location

| 参数   | 说明      | 类型     | 默认值  |
| ---- | ------- | ------ | ---- |
| lng  | 必需，坐标经度 | Number | null |
| lat  | 必需，坐标纬度 | Number | null |

### points[*].icon

| 参数         | 说明                                       | 类型     | 默认值  |
| ---------- | ---------------------------------------- | ------ | ---- |
| url        | 定义打点图片链接                                 | String | null |
| size       | 定义打点图片大小，width定义图片宽度，height定义图片高度        | Object | null |
| offsetSize | 定义打点图片相对于坐标的偏移量，width表示x轴偏移大小，height表示y轴偏移大小 | Object | null |

### BaiduMap组件通用配置

| 参数                | 说明                                       | 类型      | 默认值      |
| ----------------- | ---------------------------------------- | ------- | -------- |
| disableDragging   | 非必需，定义是否允许地图拖拽。默认允许拖拽                    | Boolean | false    |
| disableMapRule    | 非必需，定义禁止显示左下角比例尺。默认显示                    | Boolean | false    |
| mapStyle          | 非必需，百度地图整体背景，默认midnight，可参考 http://developer.baidu.com/map/custom/list.htm | String  | midnight |
| navigationControl | 非必需，是否展示左上的缩放                            | Boolean | true     |
| showMapType       | 非必需，是否展示右上的地图类型切换，默认展示                   | Boolean | true     |

### BaiduMapPolygon 百度地图辐射区域

#### BaiduMapPolygon

| 参数           | 说明                                       | 类型                   | 默认值     |
| ------------ | ---------------------------------------- | -------------------- | ------- |
| style        | 非必需，定义地图组件外层样式                           | Object               | null    |
| point        | 必需，定义中心点的坐标；lng：经度，lat：纬度                | Object               | null    |
| circleColor  | 非必需，定义地图上划圈的颜色，默认'#108EE9'               | Color                | #108EE9 |
| labelColor   | 非必需，定义每个圈说明描述的字体颜色，默认'#FFFFFF'           | Color                | #FFFFFF |
| datas        | 必需，数据数组，每个item必须包含radius（km），label说明（可以是string或ReactDOM）。 | Array                | null    |
| outsideLabel | 非必需，表示在最多的数据半径外，需要展示的label               | String \|\| ReactDOM | null    |
| zoomBias     | 非必需，表示允许地图缩放的等级，（初始时会按照最佳比例展示），默认为1，即允许放大或缩小1级 | Number               | 1       |

#### BaiduMap组件通用配置

| 参数                | 说明                                       | 类型      | 默认值      |
| ----------------- | ---------------------------------------- | ------- | -------- |
| disableDragging   | 非必需，定义是否允许地图拖拽。默认允许拖拽                    | Boolean | false    |
| disableMapRule    | 非必需，定义禁止显示左下角比例尺。默认显示                    | Boolean | false    |
| mapStyle          | 非必需，百度地图整体背景，默认midnight，可参考 http://developer.baidu.com/map/custom/list.htm | String  | midnight |
| navigationControl | 非必需，是否展示左上的缩放                            | Boolean | true     |
| showMapType       | 非必需，是否展示右上的地图类型切换，默认展示                   | Boolean | true     |

#### datas

| 参数     | 说明                        | 类型                   | 默认值  |
| ------ | ------------------------- | -------------------- | ---- |
| radius | 必需，半径，单位km                | Number               | null |
| label  | 必需，描述，可以是String或者ReactDOM | String \|\| ReactDom | null |

### BaiduMapPolygonWithPoint 百度地图辐射区域

#### BaiduMapPolygonWithPoint

| 参数           | 说明                                       | 类型                   | 默认值     |
| ------------ | ---------------------------------------- | -------------------- | ------- |
| style        | 非必需，定义地图组件外层样式                           | Object               | null    |
| point        | 必需，定义中心点的坐标；lng：经度，lat：纬度                | Object               | null    |
| points       | 非必需，在地图上额外需要展示的poi点                      | Array                | null    |
| circleColor  | 非必需，定义地图上划圈的颜色，默认'#108EE9'               | Color                | #108EE9 |
| labelColor   | 非必需，定义每个圈说明描述的字体颜色，默认'#FFFFFF'           | Color                | #FFFFFF |
| datas        | 必需，数据数组，每个item必须包含radius（km），label说明（可以是string或ReactDOM）。 | Array                | null    |
| outsideLabel | 非必需，表示在最多的数据半径外，需要展示的label               | String \|\| ReactDOM | null    |
| zoomBias     | 非必需，表示允许地图缩放的等级，（初始时会按照最佳比例展示），默认为1，即允许放大或缩小1级 | Number               | 1       |

### points[*]:points的数组项

| Property | 说明                                       | 类型                   | 默认值  |
| -------- | ---------------------------------------- | -------------------- | ---- |
| name     | 非必需，坐标点mouseover时的提示信息，当为函数是需要返回React虚拟Dom | String \|\| Function | null |
| location | 必需，坐标点经纬度信息                              | Object               | null |
| icon     | 非必需，自定义坐标点的图片                            | Object               | null |
| radius   | 非必需，定义坐标圆点的半径                            | Number               | 12   |

### points[*].location

| 参数   | 说明      | 类型     | 默认值  |
| ---- | ------- | ------ | ---- |
| lng  | 必需，坐标经度 | Number | null |
| lat  | 必需，坐标纬度 | Number | null |

### points[*].icon

| 参数         | 说明                                       | 类型     | 默认值  |
| ---------- | ---------------------------------------- | ------ | ---- |
| url        | 定义打点图片链接                                 | String | null |
| size       | 定义打点图片大小，width定义图片宽度，height定义图片高度        | Object | null |
| offsetSize | 定义打点图片相对于坐标的偏移量，width表示x轴偏移大小，height表示y轴偏移大小 | Object | null |

#### datas

| 参数     | 说明                        | 类型                   | 默认值  |
| ------ | ------------------------- | -------------------- | ---- |
| radius | 必需，半径，单位km                | Number               | null |
| label  | 必需，描述，可以是String或者ReactDOM | String \|\| ReactDom | null |

#### BaiduMap组件通用配置

| 参数                | 说明                                       | 类型      | 默认值      |
| ----------------- | ---------------------------------------- | ------- | -------- |
| disableDragging   | 非必需，定义是否允许地图拖拽。默认允许拖拽                    | Boolean | false    |
| disableMapRule    | 非必需，定义禁止显示左下角比例尺。默认显示                    | Boolean | false    |
| mapStyle          | 非必需，百度地图整体背景，默认midnight，可参考 http://developer.baidu.com/map/custom/list.htm | String  | midnight |
| navigationControl | 非必需，是否展示左上的缩放                            | Boolean | true     |
| showMapType       | 非必需，是否展示右上的地图类型切换，默认展示                   | Boolean | true     |

### BaiduMapHeatMap 百度地图热力图

#### BaiduMapHeatMap

| 参数       | 说明                                       | 类型     | 默认值                                      |
| -------- | ---------------------------------------- | ------ | ---------------------------------------- |
| style    | 非必需，定义地图组件外层样式                           | Object | null                                     |
| point    | 非必需。定义中心点的坐标；lng：经度，lat：纬度；如果未定义中心点，根据热力点自动设置 | Object | null                                     |
| datas    | 必需，定义地图上热力点数据，参考下表中datas配置               | Array  | null                                     |
| opacity  | 非必需，热力图透明度0-100                          | Number | 0                                        |
| radius   | 非必需，热力图点区域半径                             | Number | 20                                       |
| gradient | 非必需，热力图渐变区间                              | Object | {0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow",1.0: "rgb(255,0,0)",} |

#### BaiduMap组件通用配置

| 参数                | 说明                                       | 类型      | 默认值      |
| ----------------- | ---------------------------------------- | ------- | -------- |
| disableDragging   | 非必需，定义是否允许地图拖拽。默认允许拖拽                    | Boolean | false    |
| disableMapRule    | 非必需，定义禁止显示左下角比例尺。默认显示                    | Boolean | false    |
| mapStyle          | 非必需，百度地图整体背景，默认midnight，可参考 http://developer.baidu.com/map/custom/list.htm | String  | midnight |
| navigationControl | 非必需，是否展示左上的缩放                            | Boolean | true     |
| showMapType       | 非必需，是否展示右上的地图类型切换，默认展示                   | Boolean | true     |

#### datas

| 参数    | 说明           | 类型     | 默认值  |
| ----- | ------------ | ------ | ---- |
| lng   | 必需，经度        | Number | null |
| lat   | 必需，纬度        | Number | null |
| count | 必需，热力值，最高100 | Number | null |

### BaiduMapHeatMapWithPoint 百度地图热力图

#### BaiduMapHeatMapWithPoint

| 参数       | 说明                                       | 类型     | 默认值                                      |
| -------- | ---------------------------------------- | ------ | ---------------------------------------- |
| style    | 非必需，定义地图组件外层样式                           | Object | null                                     |
| point    | 非必需。定义中心点的坐标；lng：经度，lat：纬度；如果未定义中心点，根据热力点自动设置 | Object | null                                     |
| points   | 非必需，在地图上额外需要展示的poi点                      | Array  | null                                     |
| datas    | 必需，定义地图上热力点数据，参考下表中datas配置               | Array  | null                                     |
| opacity  | 非必需，热力图透明度0-100                          | Number | 0                                        |
| radius   | 非必需，热力图点区域半径                             | Number | 20                                       |
| gradient | 非必需，热力图渐变区间                              | Object | {0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow",1.0: "rgb(255,0,0)",} |

#### points[*]:points的数组项

| Property | 说明                                       | 类型                   | 默认值  |
| -------- | ---------------------------------------- | -------------------- | ---- |
| name     | 非必需，坐标点mouseover时的提示信息，当为函数是需要返回React虚拟Dom | String \|\| Function | null |
| location | 必需，坐标点经纬度信息                              | Object               | null |
| icon     | 非必需，自定义坐标点的图片                            | Object               | null |
| radius   | 非必需，定义坐标圆点的半径                            | Number               | 12   |

#### points[*].location

| 参数   | 说明      | 类型     | 默认值  |
| ---- | ------- | ------ | ---- |
| lng  | 必需，坐标经度 | Number | null |
| lat  | 必需，坐标纬度 | Number | null |

#### points[*].icon

| 参数         | 说明                                       | 类型     | 默认值  |
| ---------- | ---------------------------------------- | ------ | ---- |
| url        | 定义打点图片链接                                 | String | null |
| size       | 定义打点图片大小，width定义图片宽度，height定义图片高度        | Object | null |
| offsetSize | 定义打点图片相对于坐标的偏移量，width表示x轴偏移大小，height表示y轴偏移大小 | Object | null |

#### datas

| 参数    | 说明           | 类型     | 默认值  |
| ----- | ------------ | ------ | ---- |
| lng   | 必需，经度        | Number | null |
| lat   | 必需，纬度        | Number | null |
| count | 必需，热力值，最高100 | Number | null |

#### BaiduMap组件通用配置

| 参数                | 说明                                       | 类型      | 默认值      |
| ----------------- | ---------------------------------------- | ------- | -------- |
| disableDragging   | 非必需，定义是否允许地图拖拽。默认允许拖拽                    | Boolean | false    |
| disableMapRule    | 非必需，定义禁止显示左下角比例尺。默认显示                    | Boolean | false    |
| mapStyle          | 非必需，百度地图整体背景，默认midnight，可参考 http://developer.baidu.com/map/custom/list.htm | String  | midnight |
| navigationControl | 非必需，是否展示左上的缩放                            | Boolean | true     |
| showMapType       | 非必需，是否展示右上的地图类型切换，默认展示                   | Boolean | true     |

### BaiduMapCrossCurve 百度地图Echarts模拟迁徙

#### BaiduMapCrossCurve

| 参数              | 说明                                       | 类型           | 默认值  |
| --------------- | ---------------------------------------- | ------------ | ---- |
| style           | 非必需，定义地图组件外层样式                           | Object       | null |
| point           | 必需。定义中心迁徙点的坐标；lng：经度，lat：纬度，name：名称      | Object       | null |
| datas           | 必需，定义地图上热力点数据，参考下表中datas配置               | Array        | null |
| radiusGradients | 非必需，迁徙半径标示，整型数组，如[2000, 5000, 10000]，单位：米。不设置表示不展示半径标示 | Array        | []   |
| direction       | 必需，枚举值：in, out，分别标示流入流出                  | Enum(String) |      |
| tooltipFormat   | 非必需，流出终点或流入起点位置的鼠标停留后展示的信息的format函数。     | Function     | null |
| labelFormat     | 非必需，迁徙路径上的鼠标停留后展示的信息的format函数。           | Function     | null |

### BaiduMap组件通用配置

| 参数                | 说明                                       | 类型      | 默认值      |
| ----------------- | ---------------------------------------- | ------- | -------- |
| disableDragging   | 非必需，定义是否允许地图拖拽。默认允许拖拽                    | Boolean | false    |
| disableMapRule    | 非必需，定义禁止显示左下角比例尺。默认显示                    | Boolean | false    |
| mapStyle          | 非必需，百度地图整体背景，默认midnight，可参考 http://developer.baidu.com/map/custom/list.htm | String  | midnight |
| navigationControl | 非必需，是否展示左上的缩放                            | Boolean | true     |
| showMapType       | 非必需，是否展示右上的地图类型切换，默认展示                   | Boolean | true     |

#### datas

| 参数    | 说明                   | 类型     | 默认值  |
| ----- | -------------------- | ------ | ---- |
| lng   | 必需，经度                | Number | null |
| lat   | 必需，纬度                | Number | null |
| name  | 非必需，名称               | String | null |
| value | 非必需，值                | Number | null |
| color | 非必需，颜色值，默认按照系统初始颜色分配 | String | null |

### AMapIndoor 高德地图室内图

#### AMapIndoor

| 参数         | 说明                                       | 类型      | 默认值  |
| ---------- | ---------------------------------------- | ------- | ---- |
| style      | 非必需，定义地图组件外层样式                           | Object  | null |
| point      | 必须。实际坐标（合适的坐标会展示室内图，默认室内图）。lng：经度，lat：纬度 | Object  | null |
| dragEnable | 非必须。是否允许拖拽                               | Boolean | true |
| zoomEnable | 非必须。是否允许缩放                               | Boolean | true |

#### point

| 参数   | 说明    | 类型     | 默认值  |
| ---- | ----- | ------ | ---- |
| lng  | 必需，经度 | Number | null |
| lat  | 必需，纬度 | Number | null |

