## 下拉框内嵌树

下拉框内嵌树，是在下拉框中以树的形式展示信息，支持单选。

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | | 选中值 |
| `placeholder` | String | 空白值提示 | 默认“请选择” |
| `clearable` | Boolean | true | 是否显示删除值功能，默认显示 |
| `treeProps` | Object | true | 树props，格式treeProps: {
          value: 'organizationId',
          label: 'organizationName',
          children: 'children',
        } |
| `nodeKey` | String | id | 树的node-key属性，默认值为id |

### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| `getValue` | 选中后的事件触发 | 选中的机构ID |

