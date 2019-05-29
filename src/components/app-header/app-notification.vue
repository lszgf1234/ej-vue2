<template>
  <el-popover placement="bottom-end"
              trigger="hover"
              popper-class="notification-wrapper"
              v-model="noticeVisible"
              @after-enter="activeName = 'first'"
              @show="(activeName = '', isPopperVisible = true, noticeVisible = true)"
              @hide="isPopperVisible = false">
    <a slot="reference" href="javascript:" class="ref">
      <el-badge :value="$store.state.notificationModule.notifications"
                :hidden="!$store.state.notificationModule.notifications"
                class="app-nav__message-btn ej-app-notification">
        <ej-icon icon="bell" class="ej-app-notification__button" :class="{'text-blue': isPopperVisible}"/>
      </el-badge>
    </a>

    <el-tabs v-model="activeName" stretch class="notice-tabs overflow-hidden shadow-lg rounded" @tab-click="handleTabsClick">
      <el-tab-pane ref="first" name="first">
        <template #label>
          <div class="tab-label">
            <span class="tab-label__name">通知</span>
            <el-badge :value="notiNotify.length" class="tab-label__badge"/>
          </div>
        </template>

        <notification-item v-bind="{list: notiNotify, type: noticeType.notify.type, text: noticeType.notify.text, moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>

      <el-tab-pane ref="second" name="second">
        <template #label>
          <div class="tab-label">
            <span class="tab-label__name">消息</span>
            <el-badge :value="notiInformation.length" class="tab-label__badge"/>
          </div>
        </template>

        <notification-item v-bind="{list: notiInformation, type: noticeType.information.type, text: noticeType.information.text, moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>

      <el-tab-pane ref="third" name="third">
        <template #label>
          <div class="tab-label">
            <span class="tab-label__name">待办</span>
            <el-badge :value="notiCommission.length" class="tab-label__badge"/>
          </div>
        </template>

        <notification-item v-bind="{list: notiCommission, type: noticeType.commission.type, text: noticeType.commission.text, moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script>
  import Vue from 'vue'
  import {Badge, Popover, Tabs, TabPane, Loading} from 'element-ui'
  import EjIcon from '../icon'

  import MessageUtil from '../../utils/message'
  import NotificationItem from './notification-item'
  import notificationModule from './modules/notificationModule.js'

  Vue.use(Loading)
  Vue.use(Popover)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Badge)

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

  const NOTIFICATION_CLEAR = {
    messageSuccessText: '清空了',
    messageErrorText: '清空失败，请重新操作',
  }

  export default {
    name: 'EjAppNotification',

    components: {
      EjIcon,
      NotificationItem,
    },

    data () {
      return {
        activeName: 'first',
        noticeVisible: false,
        isPopperVisible: false,

        notiInformation: [],
        notiNotify: [],
        notiCommission: [],

        noticeType: {
          notify: {
            type: 'NOTIFY',
            text: '通知',
          },
          information: {
            type: 'INFORMATION',
            text: '消息',
          },
          commission: {
            type: 'COMMISSION',
            text: '待办',
          },
        },
        noticeMoreRouter: 'notification',
      }
    },

    computed: {
      notifications () {
        return this.$store.state.notificationModule.notifications
      },
    },

    created () {
      this.$store.registerModule('notificationModule', notificationModule);
      this.notiInformation = notiInfomation
      this.notiNotify = notiNotify
      this.notiCommission = notiCommission

      const unreadMessageCount = this.notiInformation.length + this.notiNotify.length + this.notiCommission.length
      this.$store.commit('setNotifications', unreadMessageCount)
    },

    methods: {
      handleDetail (notice) {
        console.log('notice', notice)
      },

      handleClear (type) {
        let loadingInstance = Loading.service({
          target: /** @type {HTMLElement} */ this.$refs[this.activeName].$el,
          fullscreen: true,
          // FIXME: `type.toLowerCase()` 不是个好主意
          text: '您的' + this.noticeType[type.toLowerCase()].text + '正在设置为全部已读',
        })

        try {
          setTimeout(() => {
            loadingInstance.close()
            this.noticeVisible = false

            this.sendClearNotice(type)

            MessageUtil.MessageSuccess(NOTIFICATION_CLEAR)
          }, 1800)
        } catch (error) {
          loadingInstance.close()
          this.noticeVisible = false
          MessageUtil.MessageError(NOTIFICATION_CLEAR)
        }
      },

      sendClearNotice (type) {
        switch (type) {
          case this.noticeType.notify.type:
            this.$store.commit('setNotifications', this.notifications - this.notiNotify.length)
            this.notiNotify = []
            break
          case this.noticeType.information.type:
            this.$store.commit('setNotifications', this.notifications - this.notiInformation.length)
            this.notiInformation = []
            break
          case this.noticeType.commission.type:
            this.$store.commit('setNotifications', this.notifications - this.notiCommission.length)
            this.notiCommission = []
            break
        }
      },

      handleTabsClick (tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>

<style lang="scss">
  @import './variables.scss';

  .ej-app-notification {
    &__button {
      width: $tray-icon-size;
      height: $tray-icon-size;
    }
  }

  .notification-wrapper {
    @apply  p-0;
    svg {
      @apply inline-block;
    }

    .el-tabs__header {
      @apply  m-0;
    }

    .el-tabs__item.is-active {
      @apply text-blue;
    }

    .el-tabs__item:hover {
      @apply text-blue;
    }

    .el-tabs__active-bar {
      @apply bg-blue;
    }

    .el-loading-spinner {
      margin-top: -30px;
    }

    .el-loading-mask {
      top: 1px;
    }
  }

  .app-nav__message-btn .notice-bell:hover {
    @apply text-blue;
  }

  .notice-tabs {
    width: 336px;
  }
</style>

<style lang="scss" scoped>
  .ref {
    @apply h-full inline-block;

    &::before {
      @apply h-full inline-block align-middle;
      content: '';
    }
  }

  .tab-label {
    @apply flex justify-center items-center h-full;

    > * {
      @apply flex-none leading-none;
    }

    &__badge {
      margin-left: .25em;
    }
  }
</style>

<style lang="scss">
  .tab-label__badge sup {
    top: 0 !important;
  }
</style>
