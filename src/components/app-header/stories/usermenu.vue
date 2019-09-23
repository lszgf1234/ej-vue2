<template>
  <div>
    <ej-app-header :user="user">
      <template #tray>
        <ej-app-usermenu :user="user1"/>
      </template>
    </ej-app-header>
  </div>
</template>

<script>
  import EjAppUsermenu from '../../app-usermenu'
  import {user, user1} from './mock-data'

  export default {
    components: {
      EjAppUsermenu,
    },

    data () {
      return {
        user,
        user1,
      }
    },
  }
</script>
