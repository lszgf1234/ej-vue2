import {storiesOf} from '@storybook/vue'
import {number, text, object, boolean, optionsKnob as options} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import AppHeader from '.'

Vue.use(AppHeader)

const _user = {
  avatar: 'whatever',
  name: 'Somebody',
}
const _options = {
  search: false,
  notification: false,
  avatar: false,
  username: false,
}

storiesOf('AppHeader', module)
  .add('基本使用', () => ({
    template: `
      <div>
        <ej-app-header :logo="logo" :title="title" :user="user" :fixed="fixed" :options="options"/>
        <ul class="text-center text-gray">
          <li v-for="n of 100">{{n}}</li>
        </ul>
      </div>
    `,
    props: {
      height: {
        default: number('Height', 50),
      },
      logo: {
        default: text('Logo', 'whatever'),
      },
      title: {
        default: text('Title', '应用标题'),
      },
      user: {
        default: object('User', _user),
      },
      fixed: {
        default: boolean('Fixed', false),
      },
      options: {
        default: options(
          'Options',
          {
            Search: 'search',
            Notification: 'notification',
            Avatar: 'avatar',
            Username: 'username',
          },
          ['search', 'notification', 'avatar', 'username'],
          {display: 'inline-check'},
        ).reduce((value, key) => ({...value, [key]: true}), _options),
      },
    },
  }))
  .add('全局搜索事件', () => ({
    template: `
      <div>
        <ej-app-header :user="user" @search="(...args) => action('search')(...args)"/>
      </div>
    `,
    computed: {
      action: () => action,
      user: () => _user,
    },
  }))
