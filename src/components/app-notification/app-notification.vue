<template>
  <el-popover placement="bottom-end"
              trigger="hover"
              popper-class="notification-wrapper"
              v-model="noticeVisible"
              @after-enter="activeName = 'first'"
              @show="(activeName = '', isPopperVisible = true, noticeVisible = true)"
              @hide="isPopperVisible = false">
    <a slot="reference" href="javascript:" class="ref">
      <el-badge :value="$store.state.notifications"
                :hidden="!$store.state.notifications"
                class="app-nav__message-btn ej-app-notification">
        <ej-icon icon="bell" class="ej-app-notification__button"/>
      </el-badge>
    </a>

    <el-tabs v-model="activeName" stretch class="notice-tabs overflow-hidden shadow-lg rounded" @tab-click="handleTabsClick">
      <el-tab-pane ref="first" name="first" :label="`通知 (${notiNotify.length})`">
        <notification-item v-bind="{list: notiNotify, type: noticeType.notify.type, text: noticeType.notify.text, moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>

      <el-tab-pane ref="second" name="second" :label="`消息 (${notiInformation.length})`">
        <notification-item v-bind="{list: notiInformation, type: noticeType.information.type, text: noticeType.information.text, moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>

      <el-tab-pane ref="third" name="third" :label="`待办 (${notiCommission.length})`">
        <notification-item v-bind="{list: notiCommission, type: noticeType.commission.type, text: noticeType.commission.text, moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script>
  import {
    Badge as ElBadge,
    Popover as ElPopover,
    Tabs as ElTabs,
    TabPane as ElTabPane,
    Loading
  } from 'element-ui'
  import EjIcon from '../icon'

  import MessageUtil from '../../utils/message'
  import NotificationItem from './notification-item'

  const NOTIFICATION_CLEAR = {
    messageSuccessText: '清空了',
    messageErrorText: '清空失败，请重新操作',
  }

  export default {
    name: 'EjAppNotification',

    components: {
      Loading,
      ElPopover,
      ElTabs,
      ElTabPane,
      ElBadge,
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
        return this.$store.state.notifications
      },
    },

    created () {
      this.notiInformation = this.$store.state.notiInfomation
      this.notiNotify = this.$store.state.notiNotify
      this.notiCommission = this.$store.state.notiCommission
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
  @import '../app-header/variables';

  .ej-app-notification {
    &__button {
      width: $tray-icon-size;
      height: $tray-icon-size;
      transition: color $animation-duration ease-out-cubic;
    }
  }

  .notification-wrapper {
    padding: 0 !important;
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

  .app-nav__message-btn {
    .el-badge__content {
      @apply border-0;
    }
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
