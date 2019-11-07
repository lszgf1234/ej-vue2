## IDE 面板页签。功能如下
    1. 展示所有页签，
    2. 可标识激活的页签。
    3. 超出容器自动换行，
    4. 可进行移除
    
### Props
 | Prop | Type | Default | Description |
 | :----: | :----: | :----: | :----: |
 | `list` | Array | [] | 页签集合 |
 | `index` | Number | 0 | 页签激活项 |

#### `list[0]`
| prop |Type | Default | Description |
| :----: | :----: | :----: | :----: |
| `name` | String |  | 页签名字 |

### Events

| Name | Payload | Description |
|---|---|---|
| remove | index: String, item: Object | 在用户关闭某一个页签时触发 |
