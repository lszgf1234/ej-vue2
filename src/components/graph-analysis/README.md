## 血缘影响分析-大数据

echarts-graph实现血缘影响分析图谱。
传入数据 data 数据源 数据关系 


### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `nodes` | Array | [] | 节点 |
| `edges` | Array | [] | 关系线 |
| `baseId` | String | [] | 关系线 |
| `type` | String | Blood | 血缘Blood 影响Effect |

### nodes[i]

|  | Type | Default | Description |
|---|---|---|---|
| `id` | Number |  | Id|
| `name` | String | | 名称|

### edges[i]

|  | Type | Default | Description |
|---|---|---|---|
| `[0]` | String |  | SourceId|
| `[1]` | String| | targetId|

