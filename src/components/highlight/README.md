## ej-highlight 代码高亮组件

```html

<!-- 指定语言sql 默认主题 github-->
<div>
  <ej-highlight language='sql'>
    ...
  </ej-highlight> 
</div>

```

```js
import Vue from 'vue'
import {Highlight} from '@ej/ui'

Vue.use(Highlight)

```
#### 主题类型

参考地址 https://highlightjs.org/static/demo/
Styles是官方提供的所有主题

#### 语言类型

参考地址 https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
[Language names and aliases]表 列出了官方支持所有的语言
