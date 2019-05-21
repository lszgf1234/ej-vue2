import {configure, addDecorator} from '@storybook/vue'
import {withKnobs} from '@storybook/addon-knobs'

import '../src/base.css'

addDecorator(withKnobs)

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
