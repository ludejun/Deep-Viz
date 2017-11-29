### ImageBar 柱状象形图

#### ImageBar

| 参数        | 说明                      | 类型     | 默认值  |
| --------- | ----------------------- | ------ | ---- |
| dataList  | 必需，见dataList            | Array  | null |
| direction | 可空，取"x"或"y"，x代表横行，y代表纵向 | String | "x"  |

#### dataList

| 参数        | 说明                                  | 类型     | 默认值  |
| --------- | ----------------------------------- | ------ | ---- |
| itemImage | 必需，每组类型所用的图片路径                      | String | null |
| percent   | 必需，该类型所占百分比，范围0-100。                | Number | null |
| color     | 可选，控制百分比显示颜色。若为空，则不显示百分比，几组对比在一行中显示 | String | null |