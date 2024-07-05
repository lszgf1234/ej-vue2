## 伸缩条组件
* 拖拽修改元素的大小（宽or高）
* 使用场景：
    * web版的编辑器
    * 侧边栏

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | Number | 0 | 需要改变的宽度或者高度的数据，最好通过v-model使用 |
| `min` | Number | 0 | 最小值 |
| `max` | Number | 1920 | 最大值 |
| `size` | Number | 8 | 条的大小 |
| `horizontal` | Boolean | false | 是否为水平状态 |
| `reversed` | Boolean | false | 是否反方向为拉动的正方向。例如，水平状态下不设该值时往下拉会增加高度，垂直状态下不设该值时往右拉会增加宽度，设置该值时则方向相反。 |


### Events

| Name | Description | 回调参数 |
|---|---| --- |
| resize | 拉动是触发该事件，可用来改变相应的值，该事件为v-model的事件 |value |

### Slots

| Name | Description | 
|---|---|
| - | 可自定义拉动条 |
