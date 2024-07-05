## 一个随宽度自适应折叠的菜单组件

    
### Props

| Prop                  | Description                        | Type           | **可选值**   | Default                                                      |
| ---| --- | ---| --- | ---- |
| data                  | 菜单                               | Array          | -            | -                                                            |
| default-active        | 默认选中项                         | String         | -            | -                                                            |
| route-mode            | 是否菜单选中只与当前路由route有关  | Boolean        | -            | false                                                        |
| trigger               | 子菜单浮窗触发方法                 | String         | hover, click | hover                                                        |
| theme                 | 主题                               | String         | light, dark  | light                                                        |
| theme-color           | 主题颜色                           | String         | -            | #52c41a                                                      |
| background-color      | 背景颜色                           | String         | -            | 当主题为light时，默认为#e6f7ff; 当主题为dark时，默认为#24292e |
| align                 | 主菜单排列方式                     | String         | fixed, fluid | fluid                                                        |
| width                 | 主菜单宽度                         | Number, String | -            | -                                                            |
| bar-height            | 主菜单高度                         | Number, String | -            | 56                                                           |
| menu-height           | 子菜单高度                         | Number, String | -            | 32                                                           |
| arrow                 | 是否在主菜单内显示箭头             | Boolean        | -            | true                                                         |
| bar-background-active | 子菜单选中时是否改变主菜单背景颜色 | Boolean        | -            | false                                                        |
| underline             | 选中时是否有下划线效果             | Boolean        | -            | true                                                         |
| append-to-body        | 悬浮子菜单是否挂载到body上         | Boolean        | -            | true                                                         |

### NavBar data item prop

| 名称     | 说明   | 类型    | 可选值 | 默认值 |
| --- | ---| --- | ---| --- |
| icon     | 图标                                             | String        | -      | -      |
| title    | 标题                                             | String        | -      | -      |
| path     | 路由                                             | String        | -      | -      |
| hide     | 是否隐藏                                         | Boolean       | -      | false  |
| disabled | 是否禁用                                         | Boolean       | -      | false  |
| children | 子菜单数据                                       | Array[Object] | -      | []     |
| meta     | 辅助性属性(内含index时，index内容与是否选中有关) | Object        | -      | -      |


### NavBar events
| 事件名称 | 说明                 | 回调参数                      |
| --- | --- | --- |
| select   | 菜单被选中时的事件   | item, index, indexPath, event |
| open     | 开启子菜单浮窗的事件 | item, index, indexPath        |
| close    | 关闭子菜单浮窗的事件 | item, index, indexPath        |
