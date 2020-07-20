## 树形下拉框组件

树形下拉框组件，是在下拉框中以树的形式展示信息，支持单选/多选。

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String \| Array | [] | 选中值 |
| `placeholder` | String | 请选择 | 空白值提示 |
| `props` | Object | {value: 'id', label: 'organizationName', children: 'children', } | 配置项props|
| `options` | Array | [] | 选项列表数据(树形结构的对象数组) |
| `clearable` | Boolean | false | 是否可以清空选项，默认不可清空 |
| `accordion` | Boolean | false | 是否每次只打开一个同级树节点展开 |
| `multiple` | Boolean | false | 是否启用多选(多选时，v-model传入数组。单选传入字符串) |
| `collapse-tags` | Boolean | false | 多选时是否将选中值按文字的形式展示 |

### options

|  | Type | Default | Description |
|---|---|---|---|
| `id` | String |  | 机构ID|
| `organizationName` | String | | 机构名称|
| `children` | Object | | 子项|

### children

|  | Type | Default | Description |
|---|---|---|---|
| `id` | String |  | 机构ID|
| `organizationName` | String | | 机构名称|
| `children` | Object | | 子项|

### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| `getValue` | 选中/修改值事件触发 | 选中/修改时，返回选中的对象/数组 |

