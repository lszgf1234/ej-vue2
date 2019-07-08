<template>
  <div>
    <ej-app-header :user="user">
      <template #tray>
        <ej-app-notification/>
      </template>
    </ej-app-header>
  </div>
</template>

<script>
  import EjAppNotification from '../../app-notification'
  import store from './store'
  import {notiCommission, notiInfomation, notiNotify, user} from './mock-data'

  export default {
    store,

    components: {
      EjAppNotification,
    },

    data () {
      return {
        user,
      }
    },

    beforeCreate () {
      this.$store.commit('setInfomation', notiInfomation)
      this.$store.commit('setNotify', notiNotify)
      this.$store.commit('setCommission', notiCommission)
    },
  }
</script>
