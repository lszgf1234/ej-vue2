## ej-input：输入框

可以使用Element UI `<el-input>` 的api。

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | | 控件值，用于 v-model |
| `width` | String | '552px' | 输入框宽度 |
| `isDebounce` | Boolean | false | 是否开启防抖 |
| `debounceTime` | Number | 0 | 防抖间隔时间（需isDebounce为true） |
| `isThrottle` | Boolean | false | 是否开启节流 |
| `throttleTime` | Number | 0 | 节流间隔时间（需isThrottle为true） |


其余与 `<el-input>` 相同。

### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| `search` | 搜索事件 | 目前的输入值 |
| `ej-change` | 防抖或节流事件 | 目前的输入值 |
