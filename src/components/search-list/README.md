## SearchList 搜索条件组

搜索条件组件，需引入SearchOptionList，SearchOptionSelect，SearchOptionCascader等组件配合使用

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `datas` | Array | | 配置项 {prop，label，options} |
| `models` | Object | | 各项数据值 键名对应datas的prop字段 |
| `keyword` | String | | 关键词 |
| `appKey` | String | | 应用key |
| `viewId` | String\|Number | | 应用内页面id |
| `default-tag-more` | Boolean | true | 已选条件超长默认收起/展开 |
| `max-width-tag` | String |  | 已选条件最大宽度 |

### Slot

| Name | Default | Description |
|---|---|---|
| default | | 插槽内容 |
| name | input-suffix | 输出框之后插入的内容插槽 |

### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| `search` | 搜索事件触发 | 触发类型和搜索参数(type, params) |

### Methods

| 方法名 | 说明 | 参数 |
|---|---|---|
| `emitSetSeleted` | 设置已选条件参数 | Function({key, label}) |