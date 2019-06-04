## ej-highlight 代码高亮组件

```html

<!-- 指定主题 指定语言 可选-->
<div>
  <ej-highlight styleName="highlight官方提供了很多的主题" language='sql'>
    ...
  </ej-highlight> 
</div>

<!-- 使用普通模式， 默认主题 github-->
<div>
  <ej-highlight>
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
