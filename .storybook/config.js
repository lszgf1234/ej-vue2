import {configure, addDecorator} from '@storybook/vue'
import {withKnobs} from '@storybook/addon-knobs'
import Vue from 'vue'
import Vuex from 'vuex'

import 'element-ui/lib/theme-chalk/index.css'
import '../src/base.css'

Vue.use(Vuex)
addDecorator(withKnobs)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
