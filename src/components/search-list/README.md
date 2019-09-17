## SearchList 搜索条件组

搜索条件组件，需引入SearchOptionList，SearchOptionSelect，SearchOptionCascader等组件配合使用

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `datas` | Array | | 配置项 {prop，label，options} |
| `models` | Object | | 各项数据值 键名对应datas的prop字段 |
| `keyword` | String | | 关键词 输入不会触发input实时更新，点击搜索按钮触发 |
| `appKey` | String | | 应用key |
| `viewId` | String\|Number | | 应用内页面id |
| `max-width-tag` | String | | 已选条件组件 - 最大宽度 |
| `default-tag-more` | Boolean | true | 已选条件组件 - 是否默认展开 |
| `default-expand-list` | Boolean | true | 是否展开列表 |

### Slot

| Name | Default | Description |
|---|---|---|
| default | | 插槽内容 |
| input | | 输出框插槽 |
| input-suffix | | 输出框之后插入的内容插槽 |

### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| `search` | 搜索事件触发 | 触发类型和搜索参数(type, params) |

### Methods

| 方法名 | 说明 | 参数 |
|---|---|---|
| `emitSetSelected` | 设置已选条件参数 | Function({key, label}) |