## SearchOptions 搜索条件

搜索条件组件，需引入SearchOptionsItem，SearchOptionsList，SearchOptionsCascader组件配合使用

### Slot

| Name | Default | Description |
|---|---|---|
| default | | 插槽内容 |
| default-tag-more | false | 已选条件是否默认展开 |
| max-width-tag | - | 已选条件最大宽度 |

## SearchOptionsItem 自定义条件组 

### Slot 自定义插槽组件

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | string | | 标签文本 |
| `change` | array | | 监听内容值的变化 |
| `show-more` | boolean | false | 是否默认展开 |


## SearchOptionsList 默认条件组件

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | array | | 选中value集合，用于 v-model |
| `options` | array | | 可选项数据源[{value, label, num}]形式 |
| `label` | string | | 标签文本 |
| `default-more` | boolean | false | 是否默认展开

## SearchOptionsCascader 条件组件-联级选择器

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | array | | 选中value集合，用于 v-model |
| `options` | array | | 可选项数据源（tree结构数据，参考el-cascader） |
| `label` | string | | 标签文本 |
| `default-more` | boolean | false | 是否默认展开