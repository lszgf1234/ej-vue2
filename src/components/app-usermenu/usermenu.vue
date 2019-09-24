<template>
  <div class="app-usermenu">
    <el-popover
      placement="bottom"
      trigger="click"
      :visible-arrow="false"
      v-model="userMenuVisible"
      popper-class="usermenu-wrapper">
      <div class="ej-app-user" slot="reference">
        <img v-if="user$.avatar"
             :src="avatar$"
             alt=""
             class="ej-app-user__avatar flex-none rounded-full"
             :class="{'mr-2': user$.name}">
        <span v-if="user$.name" class="flex-none">{{user$.name}}</span>
      </div>
      <div class="menu-wrap" @click="userMenuVisible = false">
        <ul>
          <li class="tenant-name" v-show="user$.tenantName">{{user$.tenantName}}</li>
          <li class="divider" v-show="user$.tenantName"></li>
          <li>
            <a :href="endpoint.ucUrl" target="_blank" class="system-name">个人中心</a>
          </li>
          <li>
            <slot name="menu-slot"/>
          </li>
          <li class="divider"></li>
          <li>
            <a href="javascript:" @click="handleLogout">退出</a>
          </li>
        </ul>
      </div>
    </el-popover>
  </div>
</template>

<script>
  import {MessageBox as ElMessageBox, Popover as ElPopover} from 'element-ui'
  import MessageUtil from '../../utils/message'

  import LOGOUT from './graphql/logout.gql'

  const LOGOUT_MSG = {
    messageSuccessText: '退出成功',
    messageErrorText: '退出失败，请重新操作',
  }

  export default {
    name: 'EjAppUsermenu',

    components: {
      ElPopover,
    },

    props: {
      user: {
        type: Object,
        default: () => ({}),
      },

      endpoint: {
        type: Object,
        required: true,
      },
    },

    data () {
      return {
        userMenuVisible: false,
      }
    },

    computed: {
      $header () {
        let target = this.$parent
        while (target && target.$options.name !== 'EjAppHeader' && target !== this.$root) {
          target = target.$parent
        }
        return target
      },

      user$ () {
        return JSON.stringify(this.user) !== '{}' ? this.user : this.$header.user
      },      

      avatar$ () {
        return `${this.endpoint.avatarUrl}?ambryId=${this.user$.avatar}&show=true`
      },
    },

    methods: {
      handleLogout () {
        ElMessageBox.confirm('是否退出该系统？', '提示', {
          type: 'warning',
        }).then(() => {
          this.logout()
        }).catch(() => {})
      },

      logout () {
        this.$apollo.mutate({
          mutation: LOGOUT,
          fetchPolicy: 'no-cache',
          client: this.endpoint.client,
        }).then((data) => {
          if (data.data.data) {
            const httpLogin = this.endpoint.loginUrl
            let url = `${httpLogin}?redirect_url=${encodeURIComponent(location.href)}`
            location.href = url
          }
        }).catch((error) => {
          MessageUtil.MessageError(LOGOUT_MSG)
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../app-header/variables';

  .app-usermenu {
    .ej-app-user {
      @apply flex-none flex items-center;

      margin-right: 0;
      cursor: pointer;

      &__avatar {
        width: 26px;
        height: 26px;
      }
    }
  }

  .usermenu-wrapper {
    padding: 0 !important;

    .menu-wrap {
      @apply text-white;

      background-color: #1F2E4D;
      border-radius: 4px;

      ul {
        padding: 6px 0;
      }

      li {
        list-style: none;

        a {
          padding: 7.5px 20px;
          display: block;
          width: 100%;

          &:hover, &.active {
            @apply bg-blue;
          }
        }

        &.tenant-name {
          @apply text-blue;

          padding: 7.5px 20px;
          font-size: 12px;

          &:hover {
            background-color: transparent;
            cursor: text;
          }
        }

        &.divider {
          height: 1px;
          margin: 2px 0;
          padding: 0;
          background-color: #2C3A57;

          &:hover {
            background-color: transparent;
            cursor: default;
          }
        }
      }
    }
  }
</style>
