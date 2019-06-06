import AppHeader from './components/app-header'
import Icon from './components/icon'
import InfoList from './components/info-list'
import TextEditor from './components/text-editor'
import TextRenderer from './components/text-renderer'
import Timeline from './components/timeline'
import Popcard from './components/popcard'
import TaskFlow from './components/task-flow'
import Highlight from './components/highlight'
import SearchInput from './components/search-input'
import SearchOptions from './components/search-options'
import SearchOptionList from './components/search-option-list'
import SearchOptionCascader from './components/search-option-cascader'

import Loading from './directives/loading'

export {
  AppHeader,
  Icon,
  InfoList,
  TextEditor,
  TextRenderer,
  Timeline,
  Popcard,
  TaskFlow,
  SearchInput,
  Highlight,
  SearchOptions,
  SearchOptionList,
  SearchOptionCascader,

  Loading,
}

export default {
  install: Vue => {
    Vue.use(AppHeader)
    Vue.use(Icon)
    Vue.use(InfoList)
    Vue.use(TextEditor)
    Vue.use(TextRenderer)
    Vue.use(Timeline)
    Vue.use(Popcard)
    Vue.use(TaskFlow)
    Vue.use(Highlight)
    Vue.use(SearchInput)
    Vue.use(SearchOptions)
    Vue.use(SearchOptionList)
    Vue.use(SearchOptionCascader)

    Vue.use(Loading)
  },
}
