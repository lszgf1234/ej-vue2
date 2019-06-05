import {storiesOf} from '@storybook/vue'
import Vuex from 'vuex'
import {number, text, object, boolean, optionsKnob as options} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import AppHeader from '.'

Vue.use(Vuex)
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

let flagOneDays = 24 * 60 * 60 * 1000
// mock data 前一天
const preOneDate = new Date(new Date().getTime() - flagOneDays).getTime()
// mock data 前两天
const preTwoDate = new Date(new Date().getTime() - flagOneDays * 2).getTime()

const notiInfomation = [{
  id: '001',
  publishTm: new Date().getTime(),
  title: '收到了新消息内容很长很长',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '002',
  publishTm: preOneDate,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '003',
  publishTm: preTwoDate,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '004',
  publishTm: preTwoDate,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '005',
  publishTm: 1555729871000,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '006',
  publishTm: 1555729871000,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '007',
  publishTm: 1555729871000,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '008',
  publishTm: 1555729871000,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '009',
  publishTm: 1555729871000,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}, {
  id: '010',
  publishTm: 1555729871000,
  title: '收到了新消息',
  content: '这是内容',
  type: 'NOTIFY',
}]

const notiNotify = [{
  id: '001',
  publishTm: 1555946603000,
  title: '收到了新通知',
  content: '这是内容',
  type: 'INFORMATION',
}]

const notiCommission = [{
  id: '001',
  publishTm: 1552187471000,
  title: '收到了新待办',
  content: '这是内容',
  type: 'COMMISSION',
}]

storiesOf('Components|AppHeader', module)
  .add('基本用法', () => ({
    template: `
      <div>
        <ej-app-header :height="height" :logo="logo" :title="title" :user="user" :fixed="fixed" :options="options">
          <a href="javascript:" class="opacity-50 self-center">Whatever-Content</a>

          <template #tray>
            <a href="javascript:" class="opacity-50">Whatever-Tray-Icon</a>
          </template>
        </ej-app-header>

        <ul class="text-center text-gray">
          <li v-for="n of 100">{{n}}</li>
        </ul>
      </div>
    `,
     store: new Vuex.Store({
      state: {
        notifications: 0,
        notiInfomation: [],
        notiNotify: [],
        notiCommission: [],
      },
      mutations: {
        setNotifications (state, data) {
          state.notifications = data
        },
        setInfomation (state, data) {
          state.notiInfomation = data
        },
        setNotify (state, data) {
          state.notiNotify = data
        },
        setCommission (state, data) {
          state.notiCommission = data
        },
      },
    }),
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
    created () {
      this.$store.commit('setInfomation', notiInfomation)
      this.$store.commit('setNotify', notiNotify)
      this.$store.commit('setCommission', notiCommission)
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
