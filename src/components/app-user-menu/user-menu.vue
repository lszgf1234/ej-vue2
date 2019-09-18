<template>
  <div class="app-user-menu">
    <div class="ej-app-user" @click="handleUserMenu" ref="headerMain">
      <img v-if="user.avatar"
        :src="user.avatar"
        alt=""
        class="ej-app-user__avatar flex-none rounded-full"
        :class="{'mr-2': user.name}">
      <span v-if="user.name" class="flex-none">{{user.name}}</span>  
      <div class="menu-wrap">
        <ul v-if="isShowUserMenu">
          <li class="tenant-name">{{user.tenantName || '东方金信科技有限公司'}}</li>
          <li class="divider"></li>
          <li class="system-name" @click="clickUserCenter">个人中心</li>
          <slot name="menu-slot" />
          <li class="divider"></li>
          <li @click="handleLogout">退出</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import LOGOUT from './graphql/logout.gql'
  export default {
    name: 'EjAppUserMenu',

    data () {
      return {
        isShowUserMenu: false,
      }
    },

    props: {
      user: {
        type: Object,
        default: () => ({}),
      },
    },

    methods: {
      clickUserCenter () {
        const ucUrl = process.env.VUE_APP_UC_URL
        // location.href = ucUrl
        window.open(ucUrl, '_blank')
      },
      handleUserMenu () {
        this.isShowUserMenu ? this.hideUserMenu() : this.showUserMenu()
      },
      showUserMenu () {
        this.isShowUserMenu = true
        document.addEventListener('click', this.hideUserMenuPanel, false)
      },
      hideUserMenu () {
        this.isShowUserMenu = false
        document.removeEventListener('click', this.hideUserMenuPanel, false)
      },
      hideUserMenuPanel (e) {
        if (!this.$refs.headerMain.contains(e.target)) {
          this.hideUserMenu()
        }
      },
      handleLogout () {
        this.$confirm('是否退出该系统？', '提示', {
          type: 'warning',
        }).then(() => {
          this.logout()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
          })
        })
        
      },
      logout () {
        this.$apollo.mutate({
          mutation: LOGOUT,
          fetchPolicy: 'no-cache',
        }).then((data) => {
          if (data.data.data) {
            const httpLogin = process.env.VUE_APP_LOGIN_URL
            let url = `${httpLogin}?redirect_url=${encodeURIComponent(location.href)}`
            location.href = url
          }
        }).catch((error) => {
          this.$message({
            message: error.message,
            type: 'error',
          })
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../app-header/variables';

  .app-user-menu {
    .ej-app-user {
      @apply flex-none flex items-center;

      margin-right: 0;
      cursor: pointer;

      &__avatar {
        width: 26px;
        height: 26px;
      }
    }

    .menu-wrap {
      @apply text-white;

      width: 176px;
      background-color: #1F2E4D;
      border-radius: 4px;
      position: absolute;
      top: 50px;
      right: 20px;

      ul {
        padding: 6px 0;
      }

      li {
        padding: 7.5px 20px;
        margin: 2px 0;
        list-style: none;
        cursor: pointer;

        &.tenant-name {
          @apply text-blue;

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

        &:hover, &.active {
          @apply bg-blue;
        }
      }
    }
  }
</style>
