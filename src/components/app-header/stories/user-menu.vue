<template>
  <div>
    <ej-app-header :user="user">
      <template #tray>
        <ej-app-user-menu :user="user"/>
      </template>
    </ej-app-header>
  </div>
</template>

<script>
  import EjAppUserMenu from '../../app-user-menu'
  // import {user} from './mock-data'

  export default {
    components: {
      EjAppUserMenu,
    },
    props: {
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        // user,
      }
    },
  }
</script>
