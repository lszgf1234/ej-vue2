import {storiesOf} from '@storybook/vue'
import {text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import Tree from '.'
import DraggableTree from './stories/draggable'
import FilterTree from './stories/filter'
import ContextMenuTree from './stories/contextmenu'
import DynamicTree from './stories/dynamic'
import ShowCheckboxTree from './stories/show-checkbox'

Vue.use(Tree)

storiesOf('Components|Tree', module)
  .add('节点过滤', () => FilterTree)
  .add('更多操作', () => ContextMenuTree)
  .add('自定义节点 & 样式', () => DynamicTree)
  .add('复选框', () => ShowCheckboxTree)
  .add('拖拽', () => DraggableTree)
