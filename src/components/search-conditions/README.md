## ConditionsItem 搜索条件

搜索条件组件，需引入ConditionsItem，ConditionsCascader组件配合使用

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `models` | object | | value集合 |
| `datas` | object | | 数据参数对象 |

#### datas

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | string | | 标签文本 |
| `selected` | array | | 选中对象 |
| `options` | array | | 可选项数据源 |

### Slot

| Name | Description |
|---|---|
| default | 插槽内容 |


## ConditionsItem 条件组件-默认

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | array | | 选中value集合，用于 v-model |
| `selected` | array | | 选中object集合 |
| `options` | array | | 可选项数据源[{value, label}]形式 |
| `label` | string | | 标签文本 |

## ConditionsCascader 条件组件-联级选择器

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | array | | 选中value集合，用于 v-model |
| `selected` | array | | 选中object集合 |
| `options` | array | | 可选项数据源（tree结构数据，参考el-cascader） |
| `label` | string | | 标签文本 |