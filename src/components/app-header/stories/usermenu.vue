<template>
  <div>
    <ej-app-header>
      <template #tray>
        <ej-app-user-menu :user="user"/>
      </template>
    </ej-app-header>
  </div>
</template>

<script>
  import EjAppUserMenu from '../../app-usermenu'
  import {user} from './mock-data'

  export default {
    components: {
      EjAppUserMenu,
    },
    props: {
      user: {
        type: Object,
        default: () => user,
      },
    },
  }
</script>
