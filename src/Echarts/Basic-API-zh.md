### LineChart 折线图

#### LineChart

| 参数              | 说明                                       | 类型       | 默认值                                      |
| --------------- | ---------------------------------------- | -------- | ---------------------------------------- |
| color           | 非必需，自定义折线的颜色数组，按顺序取色                     | Array    | ['#2CA51A', '#0BBEFE', '#F8B853', '#EA6C6B', '#8AAAF6', '#4F76D1', '#C1DFFF', '#F7F7F7'] |
| config          | 必需，配置折线图的数据源等，详见下面Table                  | Object   | null                                     |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 250, width: '100%' }           |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码或Echarts.tooltip.formatter | Function | null                                     |
| onEvents        | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                                     |

#### config####

| 参数           | 说明                                       | 类型      | 默认值                                      |
| ------------ | ---------------------------------------- | ------- | ---------------------------------------- |
| x            | 必需，定义x轴数据源，详见下面Table                     | Object  | null                                     |
| y            | 必需，定义y轴数据源及配置，详见下面Table；此数组的长度=y轴数量      | Array   | null                                     |
| title        | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | String  | null                                     |
| subtitle     | 非必需，设置Chart的副标题，当有title时，legend会放在右边；推荐在组件外写subtitle | String  | null                                     |
| dataZoom     | 非必需，用于x轴区域缩放，并可以看到走势概览，默认显示后70%，在x轴数据量大时使用 | Object  | null \| { start: 30, end: 100 }          |
| grid         | 非必需，控制直角坐标系上下左右的留白空间，当有右侧y轴、x轴name、y轴name、config.title、dataZoom等时，应适当加大 | Object  | { left: 10, right: 0, top: 30, bottom: 10 } |
| toolbox      | 非必需，是否显示工具箱                              | Boolean | false                                    |
| isLegendShow | 非必需，是否显示legned                           | Boolean | true                                     |

#### x: {data: [], name: ""}####

| 参数          | 说明                                 | 类型      | 默认值   |
| ----------- | ---------------------------------- | ------- | ----- |
| data        | 必需，定义x轴数据源                         | Array   | null  |
| name        | 非必需，定义x轴名称，放于坐标轴右侧                 | String  | null  |
| rotate      | 非必需，定义x轴label旋转角度，[-90, 90]取值      | Int     | 0     |
| showAll     | 非必需，定义x轴label是否全显示，默认会在不遮挡的情况下间隔显示 | Boolean | false |
| isXAxisShow | 非必需，定义x轴是否显示                       | Boolean | true  |

#### y: [{data: [], legend: []...}...]####

config.y是一个长度等于y轴数量的数组，每个数组元素是一个Object，以下为每个Object的API

| 参数          | 说明                                       | 类型             | 默认值   |
| ----------- | ---------------------------------------- | -------------- | ----- |
| data        | 必需，定义此y轴上的数据，data里面的每个元素都是一个数组，data.length=此y轴上折线数量，并与legend.length相同；数据中缺省值一般设为null | Array          | null  |
| legend      | 必需，定义此y轴上折线的名称，并与data.length相同，每个元素都为String | Array          | null  |
| name        | 非必需，此y轴的名称，可将单位也放于此，放于y轴上方               | String         | null  |
| smooth      | 非必需，此y轴上所有的折线是否做圆滑处理                     | Boolean        | false |
| areaStyle   | 非必需，折线下方的颜色填充，数组的每个元素为Object，主要可用于堆积图，可参考示例及Echarts.series.line.areaStyle | Array          | null  |
| lineStyle   | 非必需，自定义折线的样式（主要为color、width、type等），数组的每个元素为Object，可参考示例及Echarts.series.line.lineStyle | Array          | null  |
| stack       | 非必需，此y轴的数据是否累积显示（堆积图）；当两个坐标轴都需要分别堆积时，请使用不一样的String，否则数据都会堆到一块 | Boolean/String | false |
| min         | 非必需，设置此y轴的最小值，一般是0                       | Int            | null  |
| max         | 非必需，设置此y轴的最大值，一般Chart会自己适应               | Int            | null  |
| splitLine   | 非必需，此y轴上是否有分割线                           | Boolean        | false |
| isYAxisShow | 非必需，定义y轴是否显示                             | Boolean        | true  |



### LineBarChart 折线柱状图###

#### LineBarChart####

| 参数              | 说明                                       | 类型       | 默认值                            |
| --------------- | ---------------------------------------- | -------- | ------------------------------ |
| color           | 非必需，自定义折线或柱子的颜色数组，按顺序取色                  | Array    | 同LineChart.color               |
| config          | 必需，配置Chart的数据源等，详见下面Table                | Object   | null                           |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 250, width: '100%' } |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码 | Function | null                           |
| onEvents        | 非必需，所有的事件交互回调集合，可参考LineChart示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                           |

#### config####

| 参数       | 说明                                       | 类型      | 默认值                                      |
| -------- | ---------------------------------------- | ------- | ---------------------------------------- |
| x        | 必需，定义x轴数据源，详见下面Table                     | Object  | null                                     |
| y        | 必需，定义y轴数据源及配置，详见下面Table；此数组的长度=y轴数量；使用本组件长度应为2，第一个Object为柱状图数据，第二个为折线图数据 | Array   | null                                     |
| title    | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | String  | null                                     |
| subtitle | 非必需，设置Chart的副标题，当有title时，legend会放在右边；推荐在组件外写subtitle | String  | null                                     |
| dataZoom | 非必需，用于x轴区域缩放，并可以看到走势概览，默认显示后70%，在x轴数据量大时使用 | Object  | null \| { start: 30, end: 100 }          |
| grid     | 非必需，控制直角坐标系上下左右的留白空间，当有右侧y轴、x轴name、y轴name、config.title、dataZoom等时，应适当加大 | Object  | { left: 10, right: 0, top: 30, bottom: 10 } |
| toolbox  | 非必需，是否显示工具箱                              | Boolean | false                                    |

#### x: {data: [], name: ""}####

| 参数      | 说明                              | 类型      | 默认值   |
| ------- | ------------------------------- | ------- | ----- |
| data    | 必需，定义x轴数据源                      | Array   | null  |
| name    | 非必需，定义x轴名称，放于坐标轴右侧              | String  | null  |
| rotate  | 非必需，定义x轴名称旋转角度，[-90, 90]取值      | Int     | 0     |
| showAll | 非必需，定义x轴名称是否全显示，默认会在不遮挡的情况下间隔显示 | Boolean | false |

#### y: [{data: [], legend: []...}...]####

config.y是一个长度等于y轴数量的数组，每个数组元素是一个Object，以下为每个Object的API

| 参数        | 说明                                       | 类型             | 默认值   |
| --------- | ---------------------------------------- | -------------- | ----- |
| data      | 必需，定义此y轴上的数据，data里面的每个元素都是一个数组，data.length=此y轴上折线／柱子类别数量，并与legend.length相同，一般data.length=1；数据中缺省值一般设为null | Array          | null  |
| legend    | 必需，定义此y轴上图形的名称，并与data.length相同，每个元素都为String | Array          | null  |
| name      | 非必需，此y轴的名称，可将单位也放于此，放于y轴上方               | String         | null  |
| smooth    | 非必需，此y轴上所有的折线是否做圆滑处理，仅对折线有效              | Boolean        | false |
| barGap    | 非必需，柱子之间的间隔，仅对多柱状图有效；可为绝对值或柱子宽度百分比的String | Int/String     | 0     |
| areaStyle | 非必需，折线下方的颜色填充，数组的每个元素为Object，主要可用于堆积图，可参考示例及Echarts.series.line.areaStyle；不推荐使用，会使柱状图被遮住 | Array          | null  |
| lineStyle | 非必需，自定义折线的样式（主要为color、width、type等），数组的每个元素为Object，可参考示例及Echarts.series.line.lineStyle | Array          | null  |
| stack     | 非必需，此y轴的数据是否累积显示（堆积图）；当两个坐标轴都需要分别堆积时，请使用不一样的String，否则数据都会堆到一块 | Boolean/String | false |
| min       | 非必需，设置此y轴的最小值，一般是0                       | Int            | null  |
| max       | 非必需，设置此y轴的最大值，一般Chart会自己适应；当要完全区分折线和柱状图时可以调整 | Int            | null  |
| splitLine | 非必需，此y轴上是否有分割线；不推荐使用，两个坐标轴刻度很难对齐         | Boolean        | false |



### BarChartBasic 基础柱状图###

#### BarChartBasic####

| 参数              | 说明                                       | 类型       | 默认值                            |
| --------------- | ---------------------------------------- | -------- | ------------------------------ |
| color           | 非必需，自定义折线的颜色数组，按顺序取色                     | Array    | 同LineChart.color               |
| config          | 必需，配置折线图的数据源等，详见下面Table                  | Object   | null                           |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 250, width: '100%' } |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params等，具体可参考示例代码 | Function | null                           |
| onEvents        | 非必需，所有的事件交互回调集合，可参考LineChart示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                           |

#### config####

| 参数        | 说明                                       | 类型      | 默认值                                      |
| --------- | ---------------------------------------- | ------- | ---------------------------------------- |
| x         | 必需，定义x轴数据源，详见下面Table                     | Object  | null                                     |
| y         | 必需，定义y轴数据源及配置，详见下面Table；此组件只支持单Y轴，双Y轴推荐LineBarChart或LineChart | Object  | null                                     |
| title     | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | String  | null                                     |
| subtitle  | 非必需，设置Chart的副标题，当有title时，legend会放在右边；推荐在组件外写subtitle | String  | null                                     |
| dataZoom  | 非必需，用于x轴区域缩放，并可以看到走势概览，默认显示后70%，在x轴数据量大时使用 | Object  | { start: 30, end: 100 }                  |
| grid      | 非必需，控制直角坐标系上下左右的留白空间，当有右侧y轴、x轴name、y轴name、config.title、dataZoom等时，应适当加大 | Object  | { left: 10, right: 0, top: 30, bottom: 10 } |
| toolbox   | 非必需，是否显示工具箱                              | Boolean | false                                    |
| dataLable | 非必需，是否在柱子上显示数据；参考示例代码，可定义为{unit:'', position:'', color:''}；unit可以在数据后显示单位；position可以规定数据显示的位置，默认为top，另外可取值inside、bottom、insideTop、insideBottom等 | Object  | null                                     |

#### x: {data: [], name: ""}####

| 参数           | 说明                              | 类型      | 默认值   |
| ------------ | ------------------------------- | ------- | ----- |
| data         | 必需，定义x轴数据源                      | Array   | null  |
| name         | 非必需，定义x轴名称，放于坐标轴右侧              | String  | null  |
| rotate       | 非必需，定义x轴名称旋转角度，[-90, 90]取值      | Int     | 0     |
| showAll      | 非必需，定义x轴名称是否全显示，默认会在不遮挡的情况下间隔显示 | Boolean | false |
| isXAxisShow  | 非必需，是否显示x轴，在某些情况下也不显示x轴；默认显示    | Boolean | true  |
| axisTickShow | 非必需，是否显示x轴上的小刻度线；默认显示           | Boolean | true  |

#### y: {data: [], legend: []...}####

| 参数           | 说明                                       | 类型         | 默认值   |
| ------------ | ---------------------------------------- | ---------- | ----- |
| data         | 必需，定义y轴上的数据，data里面的每个元素都是一个数组，data.length=柱子类型数量，并与legend.length相同；数据中缺省值一般设为null | Array      | null  |
| legend       | 非必需，定义此y轴上柱子类型的名称，并与data.length相同，每个元素都为String；当不定义时不显示 | Array      | null  |
| name         | 非必需，此y轴的名称，可将单位也放于此，放于y轴上方               | String     | null  |
| stack        | 非必需，柱子是否累积显示（堆积图）                        | Boolean    | false |
| min          | 非必需，设置此y轴的最小值，一般是0                       | Int        | null  |
| max          | 非必需，设置此y轴的最大值，一般Chart会自己适应               | Int        | null  |
| splitLine    | 非必需，此y轴上是否有分割线                           | Boolean    | false |
| isYAxisShow  | 非必需，是否显示y轴；默认显示                          | Boolean    | true  |
| axisTickShow | 非必需，是否显示y轴上的刻度；默认显示                      | Boolean    | true  |
| labelShow    | 非必需，是否显示y轴刻度的标签；默认显示                     | Boolean    | true  |
| barGap       | 非必需，不同柱子间非堆积情况的间隙；可为整数或百分比字符串；不推荐使用      | Int/String | 0     |
| barWidth     | 非必需，柱子的宽度，默认会自适应                         | Int        | null  |
| color        | 非必需，每个柱子类型的颜色，color.length=data.length；每个元素可以是颜色字符串，也可以是一个数组，当每个元素是数组时，会从第1个颜色渐变到第2个颜色 | Array      | null  |



### BarHorizontal 横向柱状图###

#### BarHorizontal####

| 参数       | 说明                                       | 类型     | 默认值                            |
| -------- | ---------------------------------------- | ------ | ------------------------------ |
| color    | 非必需，自定义折线的颜色数组，按顺序取色                     | Array  | 同LineChart.color               |
| config   | 必需，配置Chart的数据源等，详见下面Table                | Object | null                           |
| style    | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object | { height: 250, width: '100%' } |
| onEvents | 非必需，所有的事件交互回调集合，可参考LineChart示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object | null                           |

#### config####

| 参数        | 说明                                       | 类型      | 默认值                                      |
| --------- | ---------------------------------------- | ------- | ---------------------------------------- |
| x         | 必需，定义x轴数据源及配置，详见下面Table                  | Object  | null                                     |
| y         | 必需，定义y轴数据源，详见下面Table；此组件只支持单Y轴           | Object  | null                                     |
| title     | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | String  | null                                     |
| subtitle  | 非必需，设置Chart的副标题，当有title时，legend会放在右边；推荐在组件外写subtitle | String  | null                                     |
| grid      | 非必需，控制直角坐标系上下左右的留白空间，当有右侧y轴、x轴name、y轴name、config.title、dataZoom等时，应适当加大 | Object  | { left: 10, right: 0, top: 30, bottom: 10 } |
| toolbox   | 非必需，是否显示工具箱                              | Boolean | false                                    |
| dataLable | 非必需，是否在柱子上显示数据；参考示例代码，可定义为{unit:'', position:'', color:''}；unit可以在数据后显示单位；position可以规定数据显示的位置，默认为right，另外可取值inside、bottom、insideTop、insideBottom等，可以定义为[x,y]相对坐标点 | Object  | right                                    |
| shadowBar | 非必需，是否显示柱子后面的阴影；当只有一条柱子或堆积时有效，可配置{color:'', value:}；color默认为rgba(0,0,0,0.05)，value默认为x.data[0]的最大值，可以自己指定阴影的长度 | Object  | null                                     |

#### x: {data: [], name: "", legend: [], color: []...}####

| 参数        | 说明                                       | 类型         | 默认值   |
| --------- | ---------------------------------------- | ---------- | ----- |
| data      | 必需，定义x轴上的数据，data里面的每个元素都是一个数组，data.length=柱子类型数量，并与legend.length相同；数据中缺省值一般设为null | Array      | null  |
| name      | 非必需，定义x轴名称，放于坐标轴右侧                       | String     | null  |
| legend    | 非必需，定义x轴上柱子类型的名称，并与data.length相同，每个元素都为String；当不定义时不显示 | Array      | null  |
| axisShow  | 非必需，是否显示x轴，在某些情况下也不显示x轴；默认不显示            | Boolean    | false |
| stack     | 非必需，柱子是否累积显示（堆积图）                        | Boolean    | false |
| min       | 非必需，设置x轴的最小值，一般是0                        | Int        | null  |
| max       | 非必需，设置x轴的最大值，一般Chart会自己适应                | Int        | null  |
| splitLine | 非必需，x轴上是否有分割线，当x.axisShow为true时有效        | Boolean    | false |
| barGap    | 非必需，不同柱子间非堆积情况的间隙；可为整数或百分比字符串；不推荐使用      | Int/String | 0     |
| barWidth  | 非必需，柱子的宽度，默认会自适应                         | Int        | null  |
| color     | 非必需，每个柱子类型的颜色，color.length=data.length；每个元素可以是颜色字符串，也可以是一个数组，当每个元素是数组时，会从第1个颜色渐变到第2个颜色 | Array      | null  |

#### y: {data: [], name: ""...}####

| 参数           | 说明                         | 类型      | 默认值     |
| ------------ | -------------------------- | ------- | ------- |
| data         | 必需，定义y轴数据源，一般是组String      | Array   | null    |
| name         | 非必需，此y轴的名称，可将单位也放于此，放于y轴上方 | String  | null    |
| axisShow     | 非必需，是否显示y轴；默认显示            | Boolean | true    |
| axisTickShow | 非必需，是否显示y轴上的刻度；默认不显示       | Boolean | false   |
| axisLine     | 非必需，是否显示y轴那根坐标线            | Boolean | true    |
| labelShow    | 非必需，是否显示y轴刻度的标签；默认显示       | Boolean | true    |
| labelColor   | 非必需，y轴刻度的标签颜色；默认#999999    | String  | #999999 |
| labelSize    | 非必需，y轴刻度的标签字体大小；默认12       | Int     | 12      |



### PieChart 多样饼图###

#### PieChart####

| 参数              | 说明                                       | 类型       | 默认值                            |
| --------------- | ---------------------------------------- | -------- | ------------------------------ |
| color           | 非必需，自定义折线的颜色数组，按顺序取色                     | Array    | 同LineChart.color               |
| config          | 必需，配置饼图的数据源等，详见下面Table                   | Object   | null                           |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 250, width: '100%' } |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考LineChart示例代码或Echarts.tooltip.formatter | Function | null                           |
| onEvents        | 非必需，所有的事件交互回调集合，可参考LineChart示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                           |

#### config####

| 参数         | 说明                                       | 类型             | 默认值                                      |
| ---------- | ---------------------------------------- | -------------- | ---------------------------------------- |
| data       | 必需，定义饼图数据源，详见下面Table                     | Array          | null                                     |
| legend     | 非必需，定义图例的位置、方向；方向默认水平，位置默认底部居中；当方向为垂直时，位置默认右边；详见下面Table | Object         | null                                     |
| title      | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | String         | null                                     |
| subtitle   | 非必需，设置Chart的副标题，当有title时，legend会放在右边；推荐在组件外写subtitle | String         | null                                     |
| concentric | 非必需，是否中空，并可自定义内外圈半径；当不为null时，默认内外圈半径为50%-70% | Object         | null \| { innerRadius: '50%', outerRadius: '70%' } |
| roseType   | 非必需，是否为玫瑰饼图，并可切换两种形式radius、area；差异可参考示例代码 | Boolean/String | false                                    |
| toolbox    | 非必需，是否显示工具箱                              | Boolean        | false                                    |

#### data: [{value: , name: ""}...]####

config.data是一个定义各项饼状数据的数组，每个数组元素是一个Object，以下为每个Object的API

| 参数    | 说明                                | 类型     | 默认值  |
| ----- | --------------------------------- | ------ | ---- |
| value | 必需，定义各项的数值，不需要加起来为100，会根据数值自行计算比例 | Number | null |
| name  | 非必需，定义各项的名称，legend.data也来源于此      | String | null |

####legend: {position: {x:, y: }, orient: ""}####

| 参数       | 说明                                       | 类型     | 默认值                  |
| -------- | ---------------------------------------- | ------ | -------------------- |
| position | 非必需，定义图例的位置，以左上角为原点，自定义x、y的值，可以为绝对数字，也可为百分比字符串，还可从top、middle、bottom\|left、center、right字符串中取值；当不定义时，默认值如上表所述 | Object | null                 |
| orient   | 非必需，定义图例的方向，可取值horizontal、vertical字符串，默认水平 | String | null \| 'horizontal' |



### ShadeMap 区域阴影地图###

#### ShadeMap####

| 参数              | 说明                                       | 类型       | 默认值                            |
| --------------- | ---------------------------------------- | -------- | ------------------------------ |
| mapConfig       | 非必需，配置地图的基础样式，详见下面Table                  | Object   | null                           |
| dataConfig      | 必需，配置省份区分图的数据源等，详见下面Table                | Object   | null                           |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 450, width: '100%' } |
| onEvents        | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                           |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码或Echarts.tooltip.formatter | Function | null                           |

#### mapConfig####

| 参数          | 说明              | 类型     | 默认值                  |
| ----------- | --------------- | ------ | -------------------- |
| areaColor   | 非必需，设置地图的颜色     | String | #F3F3F3              |
| hoverColor  | 非必需，设置地图省份悬停的颜色 | String | #C0B796              |
| borderWidth | 非必需，设置地图边框的粗细   | Number | 1                    |
| borderColor | 非必需，设置地图边框的颜色   | String | rgba(243,243,243,.5) |

#### dataConfig####

| 参数          | 说明                        | 类型      | 默认值   |
| ----------- | ------------------------- | ------- | ----- |
| title       | 非必需，设置Chart的标题，详见下面Table  | Object  | null  |
| visualMap   | 非必需，设置可视化组件               | Object  | null  |
| isLableShow | 非必需，用于地图上是否显示省的名字         | Boolean | false |
| tooltip     | 非必需，用于显示提示框浮层内容           | Boolean | false |
| province    | 必需，配置省份区分图的数据源等，详见下面Table | Array   | null  |

#### visualMapConfig####

| 参数         | 说明               | 类型      | 默认值                            |
| ---------- | ---------------- | ------- | ------------------------------ |
| min        | 非必需，设置颜色范围的最小值   | Number  | 0                              |
| max        | 非必需，设置颜色范围的最大值   | Number  | 100                            |
| left       | 非必需，设置可视化组件的水平位置 | String  | left                           |
| top        | 非必需，设置可视化组件的垂直位置 | String  | bottom                         |
| text       | 非必需，设置文本的内容      | Array   | ["高", "低"],                    |
| calculable | 非必需，是否可以拖拽       | Boolean | true                           |
| inRange    | 非必需，设置地图过渡的颜色    | Object  | {color: ["e0ffff", "#006edd"]} |

#### title####

| 参数        | 说明                                       | 类型     | 默认值                                |
| --------- | ---------------------------------------- | ------ | ---------------------------------- |
| text      | 非必需，设置Chart的标题                           | String | null                               |
| subtext   | 非必需，设置Chart的副标题                          | String | null                               |
| textStyle | 非必需，设置Chart标题字体的大小和颜色                    | Object | { color: "#4A4A4A", fontSize: 14 } |
| x         | 非必需，设置Chart标题x轴的位置有 left center right 可选 | String | null                               |
| y         | 非必需，设置Char标题y轴的位置有 top center bottom 可选  | String | null                               |

#### provice####

| 参数    | 说明          | 类型     | 默认值  |
| ----- | ----------- | ------ | ---- |
| name  | 必需，要显示省份的名字 | String | null |
| value | 必需，要显示省份的范围 | Number | null |



### MapScatter 散点图地图###

#### MapScatter####

| 参数              | 说明                                       | 类型       | 默认值                            |
| --------------- | ---------------------------------------- | -------- | ------------------------------ |
| dataConfig      | 必需，配置组件的数据和样式等，详见下面Table                 | Object   | null                           |
| geoCoordMap     | 必需，配置组件的所需的地点经纬度，详见下面Table               | Object   | null                           |
| mapConfig       | 非必需，配置组件的样式，详见下面Table                    | Object   | null                           |
| style           | 非必需，设置组件的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 250, width: '100%' } |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码或Echarts.tooltip.formatter | Function | null                           |
| onEvents        | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                           |

#### mapConfig####

| 参数          | 说明                   | 类型     | 默认值                   |
| ----------- | -------------------- | ------ | --------------------- |
| areaColor   | 非必需，自定义地图区域（省份）的填充色  | String | #f3f3f3               |
| hoverColor  | 非必需，鼠标浮上地图区域（省份）的颜色  | String | rgba(243,243,243,0.5) |
| borderWidth | 非必需，自定义地图区域（省份）的边框粗细 | Number | 1                     |
| borderColor | 非必需，自定义地图区域（省份）的边框色  | String | #C0B796               |

#### dataConfig###

| 参数      | 说明                      | 类型     | 默认值  |
| ------- | ----------------------- | ------ | ---- |
| options | 必需，组件配置选项，详见下面Table     | Array  | null |
| title   | 非必需，组件title选项，详见下面Table | Object | null |

#### options####

| 参数     | 说明                                       | 类型     | 默认值    |
| ------ | ---------------------------------------- | ------ | ------ |
| name   | 必需，系列名称，用于tooltip的显示，legend 的图例筛选        | String | null   |
| type   | 必需，scatter类型，用于显示scatter的显示效果，可选择scatter和effectScatter | String | null   |
| symbol | 非必需，设置symbol的形状，可选值有"circle", "triangle", "pin" | String | circle |
| color  | 非必需，设置symbol的颜色                          | String | 红色     |
| data   | 必需，数据源                                   | Array  | null   |

#### title####

| 参数       | 说明       | 类型     | 默认值  |
| -------- | -------- | ------ | ---- |
| text     | 必需，标题名   | String | null |
| subtitle | 非必需，副标题名 | String | null |

#### data[{name:"上海",value:100},...]####

| 参数    | 说明           | 类型     | 默认值  |
| ----- | ------------ | ------ | ---- |
| name  | 必需，，数据地点名称   | String | null |
| value | 必需，，地点对应的数据值 | Number | null |

#### geoCoordMap{"上海":[121.48, 31.22],...}####

| 参数   | 说明                            | 类型     | 默认值  |
| ---- | ----------------------------- | ------ | ---- |
| 地点名称 | 必需，地点名称,如"上海"                 | String | null |
| 经纬度  | 必需，，地点对应的经纬度，如[121.48, 31.22] | Array  | null |



### ShadeMapScatter 区域阴影散点地图###

#### ShadeMapScatter####

| 参数          | 说明                                       | 类型     | 默认值                            |
| ----------- | ---------------------------------------- | ------ | ------------------------------ |
| dataConfig  | 必需，配置组件的数据和样式等，详见下面Table                 | Object | null                           |
| geoCoordMap | 必需，配置组件的所需的地点经纬度，详见下面Table               | Object | null                           |
| mapConfig   | 非必需，配置组件的样式，详见下面Table                    | Object | null                           |
| style       | 非必需，设置组件的宽高等，一般格式{ height: 高度, width: 宽度 } | Object | { height: 250, width: '100%' } |
| onEvents    | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object | null                           |

#### mapConfig####

| 参数          | 说明                   | 类型     | 默认值                   |
| ----------- | -------------------- | ------ | --------------------- |
| areaColor   | 非必需，自定义地图区域（省份）的填充色  | String | #f3f3f3               |
| hoverColor  | 非必需，鼠标浮上地图区域（省份）的颜色  | String | rgba(243,243,243,0.5) |
| borderWidth | 非必需，自定义地图区域（省份）的边框粗细 | Number | 1                     |
| borderColor | 非必需，自定义地图区域（省份）的边框色  | String | #C0B796               |

#### dataConfig####

| 参数             | 说明                          | 类型     | 默认值  |
| -------------- | --------------------------- | ------ | ---- |
| scatterOptions | 必需，组件中scatter配置选项，详见下面Table | Array  | null |
| shadeOptions   | 必需，组件shadeMap配置选项，详见下面Table | Object | null |
| title          | 非必需，组件title选项，详见下面Table     | Object | null |

#### scatterOptions####

| 参数     | 说明                                       | 类型     | 默认值    |
| ------ | ---------------------------------------- | ------ | ------ |
| name   | 必需，系列名称，用于tooltip的显示，legend 的图例筛选        | String | null   |
| type   | 必需，scatter类型，用于显示scatter的显示效果，可选择scatter和effectScatter | String | null   |
| symbol | 非必需，设置symbol的形状，可选值有"circle", "triangle", "pin" | String | circle |
| color  | 非必需，设置symbol的颜色                          | String | 红色     |
| data   | 必需，数据源                                   | Array  | null   |

#### shadeOptions####

| 参数        | 说明          | 类型     | 默认值  |
| --------- | ----------- | ------ | ---- |
| visualMap | 非必需，设置可视化组件 | Object | null |
| shadeData | 必需，数据源      | Array  | null |

#### visualMapConfig####

| 参数         | 说明               | 类型      | 默认值                            |
| ---------- | ---------------- | ------- | ------------------------------ |
| min        | 非必需，设置颜色范围的最小值   | Number  | 0                              |
| max        | 非必需，设置颜色范围的最大值   | Number  | 100                            |
| left       | 非必需，设置可视化组件的水平位置 | String  | left                           |
| top        | 非必需，设置可视化组件的垂直位置 | String  | bottom                         |
| text       | 非必需，设置文本的内容      | Array   | ["高", "低"],                    |
| calculable | 非必需，是否可以拖拽       | Boolean | true                           |
| inRange    | 非必需，设置地图过渡的颜色    | Object  | {color: ["e0ffff", "#006edd"]} |

#### provice####

| 参数    | 说明          | 类型     | 默认值  |
| ----- | ----------- | ------ | ---- |
| name  | 必需，要显示省份的名字 | String | null |
| value | 必需，要显示省份的范围 | String | null |

#### title####

| 参数       | 说明       | 类型     | 默认值  |
| -------- | -------- | ------ | ---- |
| text     | 必需，标题名   | String | null |
| subtitle | 非必需，副标题名 | String | null |

#### data[{name:"上海",value:100},...]####

| 参数    | 说明           | 类型     | 默认值  |
| ----- | ------------ | ------ | ---- |
| name  | 必需，，数据地点名称   | String | null |
| value | 必需，，地点对应的数据值 | Number | null |

#### geoCoordMap{"上海":[121.48, 31.22],...}####

| 参数   | 说明                            | 类型     | 默认值  |
| ---- | ----------------------------- | ------ | ---- |
| 地点名称 | 必需，地点名称,如"上海"                 | String | null |
| 经纬度  | 必需，，地点对应的经纬度，如[121.48, 31.22] | Array  | null |



### ScatterCartesian 笛卡尔坐标系散点图###

#### ScatterCartesian####

| 参数              | 说明                                       | 类型       | 默认值                            |
| --------------- | ---------------------------------------- | -------- | ------------------------------ |
| config          | 必需，配置组件的数据和样式等，详见下面Table                 | Object   | null                           |
| style           | 非必需，设置组件的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 250, width: '100%' } |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码或Echarts.tooltip.formatter | Function | null                           |
| onEvents        | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                           |

#### config####

| 参数            | 说明                                       | 类型      | 默认值                                      |
| ------------- | ---------------------------------------- | ------- | ---------------------------------------- |
| options       | 必需，组件中scatter配置选项，详见下面Table              | Array   | null                                     |
| color         | 非必需，每种散点类型的颜色，color.length=data.length；每个元素可以是颜色字符串，也可以是一个数组，当每个元素是数组时，会从第1个颜色渐变到第2个颜色 | Array   | null                                     |
| grid          | 非必需，控制直角坐标系上下左右的留白空间                     | Object  | { left: 10, right: 0, top: 30, bottom: 10 } |
| isLabelShow   | 非必需，用于显示label标签是否一直显示                    | Boolean | false                                    |
| isToolboxShow | 非必需，用于显示工具箱是否显示                          | Boolean | false                                    |
| title         | 非必需，组件title选项，详见下面Table                  | Object  | null                                     |
| xName         | 必需，x轴数据的名字                               | String  | null                                     |
| yName         | 必需，y轴数据的名字                               | String  | null                                     |

#### options####

| 参数       | 说明                                       | 类型      | 默认值   |
| -------- | ---------------------------------------- | ------- | ----- |
| name     | 必需，组件的seriesName                         | String  | null  |
| data     | 必需，组件数据源，数据结构[[213,22,"China",245,...], [332,56,"Russia",761,...],...]，子数组的第一项数据，必需，x轴数据；子数组的第二项数据，必需，y轴数据；子数组的第三项数据，必需，label标签名字，即当前项数据的名子；子数组的第四项数据，非必需，根据此数据设置symbol的大小，默认大小20 | Array   | null  |
| markLine | 非必需，是否显示组件数据的平均值线                        | Boolean | false |

#### title####

| 参数       | 说明       | 类型     | 默认值  |
| -------- | -------- | ------ | ---- |
| text     | 必需，标题名   | String | null |
| subtitle | 非必需，副标题名 | String | null |



### HeatmapCartesian 笛卡尔坐标系热力图###

####HeatmapCartesian####

| 参数     | 说明                                       | 类型     | 默认值                            |
| ------ | ---------------------------------------- | ------ | ------------------------------ |
| color  | 必需，定义颜色区间，建议2个颜色，由浅到深，组件自动按value渐变       | Array  |                                |
| config | 必需，配置热力图的数据源等，详见下面Table                  | Object | null                           |
| style  | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object | { height: 250, width: '100%' } |

#### config####

| 参数     | 说明                                       | 类型     | 默认值  |
| ------ | ---------------------------------------- | ------ | ---- |
| x      | 必需，定义x轴数据源，详见下面Table                     | Object | null |
| y      | 必需，定义y轴数据源及配置，详见下面Table，类同x              | Object | null |
| data   | 必需，定义数据源及配置。                             | Array  | []   |
| title  | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | String | null |
| option | 非必需，接口预留直接改变或覆盖Chart属性。                  | Object | null |

#### x: {data: [], name: ""}####

| 参数   | 说明         | 类型    | 默认值  |
| ---- | ---------- | ----- | ---- |
| data | 必需，定义x轴数据源 | Array | null |



### Radar 雷达图###

#### RadarChart####

| 参数              | 说明                                       | 类型       | 默认值                                      |
| --------------- | ---------------------------------------- | -------- | ---------------------------------------- |
| color           | 非必需，自定义折线的颜色数组，按顺序取色                     | Array    | ['#2CA51A', '#0BBEFE', '#F8B853', '#EA6C6B', '#8AAAF6', '#4F76D1', '#C1DFFF', '#F7F7F7'] |
| config          | 必需，配置折线图的数据源等，详见下面Table                  | Object   | null                                     |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 250, width: '100%' }           |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码或Echarts.tooltip.formatter | Function | null                                     |
| onEvents        | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                                     |

####config####

| 参数           | 说明                                       | 类型      | 默认值                                      |
| ------------ | ---------------------------------------- | ------- | ---------------------------------------- |
| indicator    | 必需，指标项数组                                 | Array   | null                                     |
| values       | 必需，各项指标的值,与indicator参数中排序顺序对应            | Array   | null                                     |
| max          | 必需，项目值的最大值                               | Number  | null                                     |
| name         | 非必需，雷达图名称                                | String  | null                                     |
| position     | 非必需，详细tooltip的位置,inside,top,left,right,bottom | String  | null                                     |
| radius       | 必需，半径百分比                                 | String  | null                                     |
| formatter    | 非必需，是否使用formatter，配置onTooltipFormat实现    | Bool    | null                                     |
| paddingColor | 非必需，雷达图填充颜色                              | String  | null                                     |
| lineColor    | 非必需，雷达图边线颜色                              | String  | null                                     |
| textStyle    | 非必需，数值项样式                                | Object  | null                                     |
| grid         | 非必需，控制直角坐标系上下左右的留白空间，当有右侧y轴、x轴name、y轴name、config.title、dataZoom等时，应适当加大 | Object  | { left: 10, right: 0, top: 30, bottom: 10 } |
| toolbox      | 非必需，是否显示工具箱                              | Boolean | false                                    |



### Funnel 漏斗图###

#### LineChart####

| 参数              | 说明                                       | 类型       | 默认值                                      |
| --------------- | ---------------------------------------- | -------- | ---------------------------------------- |
| color           | 非必需，自定义折线的颜色数组，按顺序取色                     | Array    | ['#2CA51A', '#0BBEFE', '#F8B853', '#EA6C6B', '#8AAAF6', '#4F76D1', '#C1DFFF', '#F7F7F7'] |
| config          | 必需，配置折线图的数据源等，详见下面Table                  | Object   | null                                     |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 250, width: '100%' }           |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码或Echarts.tooltip.formatter | Function | null                                     |
| onEvents        | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                                     |

#### config####

| 参数      | 说明                                       | 类型      | 默认值                                      |
| ------- | ---------------------------------------- | ------- | ---------------------------------------- |
| sort    | 非必需，可以取 ascending，descending，none（表示按 data 顺序） | String  | ascending                                |
| label   | 非必需，控制数据项的名称颜色,有属性color与emphasis         | Object  | null                                     |
| data    | 必需，见下面table                              | Array   | null                                     |
| max     | 必需，设置漏斗的最大值                              | Number  | null                                     |
| min     | 必需，设置漏斗的最小值                              | Number  | null                                     |
| grid    | 非必需，控制直角坐标系上下左右的留白空间，当有右侧y轴、x轴name、y轴name、config.title、dataZoom等时，应适当加大 | Object  | { left: 10, right: 0, top: 30, bottom: 10 } |
| toolbox | 非必需，是否显示工具箱                              | Boolean | false                                    |

#### data####

| 参数            | 说明                  | 类型     | 默认值           |
| ------------- | ------------------- | ------ | ------------- |
| name          | 必需，数据项名称            | String | null          |
| value         | 非必需，数据值             | Number | 0             |
| normalColor   | 非必需，图形的颜色           | String | 自适应color配置的颜色 |
| emphasisColor | 非必需，强调的颜色，选中或滑过时的颜色 | String | 自适应color配置的颜色 |



### GraphChart 关系图###

#### GraphChart####

| 参数              | 说明                                       | 类型       | 默认值                                      |
| --------------- | ---------------------------------------- | -------- | ---------------------------------------- |
| color           | 非必需，自定义节点的颜色数组，按顺序取色                     | Array    | ['#2CA51A', '#0BBEFE', '#F8B853', '#EA6C6B', '#8AAAF6', '#4F76D1', '#C1DFFF', '#F7F7F7'] |
| config          | 必需，配置关系图的数据源等，详见下面Table                  | Object   | null                                     |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 400, width: '100%' }           |
| onEvents        | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                                     |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码或Echarts.tooltip.formatter | Function | null                                     |

#### config####

| 参数         | 说明                                       | 类型      | 默认值   |
| ---------- | ---------------------------------------- | ------- | ----- |
| data       | 必需，定义数据源，详见下面Table                       | Array   | null  |
| links      | 必需，定义数据之间的关系，详见下面Table                   | Array   | null  |
| categories | 非必需，定义数据的显示，详见下面Table                    | Array   | null  |
| legend     | 非必需，定义一级关系的名称，详见下面Table                  | Array   | null  |
| title      | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | String  | null  |
| subtitle   | 非必需，设置Chart的副标题，当有title时，legend会放在右边；推荐在组件外写subtitle | String  | null  |
| draggable  | 非必需，是否可以拖拽                               | Boolean | true  |
| toolbox    | 非必需，是否显示工具箱.events                       | Boolean | false |

#### data####

| 参数       | 说明                              | 类型     | 默认值  |
| -------- | ------------------------------- | ------ | ---- |
| name     | 必需，节点的名称                        | Array  | null |
| category | 非必需,上级的节点,控制是否显示与categories结合使用 | Array  | null |
| value    | 非必需,通过value值的大小控制节点的大小          | Number | 20   |

#### links####

| 参数     | 说明        | 类型     | 默认值  |
| ------ | --------- | ------ | ---- |
| source | 必需,指向的数据  | String | null |
| target | 必需,被指向的数据 | String | null |

#### categories####

| 参数   | 说明                                 | 类型    | 默认值  |
| ---- | ---------------------------------- | ----- | ---- |
| name | 必需,用来显示当前节点下的所有数据与data中的category对应 | Array | null |



### ScatterNet 网格散点图###

#### ScatterNet

| 参数     | 说明                 | 类型     | 默认值                                  |
| ------ | ------------------ | ------ | ------------------------------------ |
| style  | 非必需，定义chart的宽高等样式  | Object | { height: 450, width: '100%' }       |
| color  | 非必需，定义默认点和高亮点的颜色   | Object | {effect:'#108EE9', normal:'#D7D7D7'} |
| config | 必需，配置x轴、y轴的标签及数据源。 | Object | null                                 |

#### config

| 参数      | 说明                   | 类型     | 默认值  |
| ------- | -------------------- | ------ | ---- |
| x       | 必需，定义x轴数据源，详见下面Table | Object | null |
| y       | 必需，定义y轴数据源，详见下面Table | Object | null |
| data    | 必需，定义数据源             | Array  | null |
| minSize | 非必需，定义点的最小size       | Number | 5    |
| maxSize | 非必需，定义点的最大size       | Number | 20   |
| option  | 非必需，预留接口             | Object |      |

#### x:{name:'',data:[]}

| 参数   | 说明          | 类型     | 默认值      |
| ---- | ----------- | ------ | -------- |
| name | 非必需，坐标轴名称   | String | null     |
| data | 非必需，定义坐标轴标签 | Array  | null     |
| type | 非必需，定义坐标轴类型 | String | category |

#### data####

| 参数       | 说明                                   | 类型     | 默认值  |
| -------- | ------------------------------------ | ------ | ---- |
| type     | 必需，定义点的类型目前为scatter和effectScatter两种。 | String |      |
| typeData | 必需，定义数据源                             | Array  |      |
| option   | 非必需，预留接口                             | Object |      |



### KLineChart K线图

#### KLineChart

| 参数              | 说明                                       | 类型       | 默认值                                      |
| --------------- | ---------------------------------------- | -------- | ---------------------------------------- |
| color           | 非必需，自定义节点的颜色数组，按顺序取色                     | Array    | ['#2CA51A', '#0BBEFE', '#F8B853', '#EA6C6B', '#8AAAF6', '#4F76D1', '#C1DFFF', '#F7F7F7'] |
| config          | 必需，配置关系图的数据源等，详见下面Table                  | Object   | null                                     |
| style           | 非必需，设置Chart的宽高等，一般格式{ height: 高度, width: 宽度 } | Object   | { height: 450, width: '100%' }           |
| onEvents        | 非必需，所有的事件交互回调集合，可参考示例代码；一般为点击事件，参数为params及echart实例；事件类型可参考Echarts.events | Object   | null                                     |
| onTooltipFormat | 非必需，自定义提示框浮层内容及样式，传递给父组件，参数有params，具体可参考示例代码或Echarts.tooltip.formatter | Function | null                                     |

#### config

| 参数       | 说明                                       | 类型      | 默认值                                      |
| -------- | ---------------------------------------- | ------- | ---------------------------------------- |
| x        | 必需，定义x轴数据源，详见下面Table                     | Array   | null                                     |
| y        | 必需，定义y轴数据源及配置，详见下面Table；此数组的长度=y轴数量      | Array   | null                                     |
| bar      | 非必需，定义柱状图的数据源及配置，详见下面Table               | Object  | null                                     |
| title    | 非必需，设置Chart的标题，当有title时，legend会放在右边；推荐在组件外写title | Array   | String                                   |
| subtitle | 非必需，设置Chart的副标题，当有title时，legend会放在右边；推荐在组件外写subtitlee | Array   | String                                   |
| dataZoom | 非必需，用于x轴区域缩放，并可以看到走势概览，默认显示后70%，在x轴数据量大时使用 | Object  | null \| { start: 30, end: 100 }          |
| grid     | 非必须，用来控制图标的位置left，right，top，bottom控制上面折线图位置height控制高，barLeft，barRight，barTop，barBottom控制下面柱状图位置barHeight控制柱状图的高 | Array   | [{left: 80, right: 0, top: 10, bottom: 10 },{left: 80, right: 0, top: 340, bottom: 10 }] |
| toolbox  | 非必需，是否显示工具箱                              | Boolean | true                                     |

#### x

| 参数   | 说明                 | 类型     | 默认值  |
| ---- | ------------------ | ------ | ---- |
| data | 必需，定义x轴数据源         | Array  | null |
| name | 非必需，定义x轴名称，放于坐标轴右侧 | String | null |

#### y

| 参数     | 说明                                       | 类型     | 默认值  |
| ------ | ---------------------------------------- | ------ | ---- |
| data   | 必需，定义此y轴上的数据，data里面的每个元素都是一个数组，data.length=此y轴上折线数量，并与legend.length相同；数据中缺省值一般设为null | Array  | null |
| legend | 必需，定义此y轴上折线的名称，并与data.length相同，每个元素都为String | Array  | null |
| type   | 必需, 定义此y轴上数据展现形式，并与data.length相同，每个元素都为String | Array  | null |
| name   | 非必需，此y轴的名称，可将单位也放于此，放于y轴上方               | String | null |

#### bar

| 参数   | 说明            | 类型     | 默认值  |
| ---- | ------------- | ------ | ---- |
| name | 非必需，定义数据的名称   | Array  | null |
| type | 非必需，定义数据的展现形式 | String | bar  |