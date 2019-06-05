<template>
  <div class="ej-app-header__wrap" :style="{height: height$}">
    <div class="ej-app-header bg-black text-white flex w-full"
         :class="{fixed}"
         :style="{height: height$}">
      <a href="javascript:" class="ej-app-logo flex-none flex items-center" @click="onClickLogo">
        <ej-icon v-if="logo" :icon="logo" :class="{'mr-2': title}"/>
        <span v-if="title" class="flex-none text-lg">{{title}}</span>
      </a>

      <slot/>

      <div class="ej-app-tray flex-none ml-auto flex">
        <slot v-if="$scopedSlots.tray" name="tray"/>
        <ej-app-search v-if="options.search !== false"/>
        <ej-app-notification v-if="options.notification !== false && hasVuex"/>
        <a href="javascript:">
          <i v-if="user.avatar && options.avatar !== false"
             class="ej-app-user__avatar flex-none rounded-full bg-white opacity-50"
             :class="{'mr-2': user.name && options.username !== false}"></i>
          <span v-if="user.name && options.username !== false"
                class="flex-none">{{user.name}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {toCssSize} from '../../utils/ui'
  import EjIcon from '../icon'
  import EjAppSearch from './app-search.vue'
  import EjAppNotification from './app-notification.vue'

  export default {
    name: 'EjAppHeader',

    components: {
      EjIcon,
      EjAppSearch,
      EjAppNotification,
    },

    props: {
      height: {
        type: [Number, String],
        default: 50,
      },
      logo: {
        type: String,
      },
      title: {
        type: String,
      },
      user: {
        type: Object,
        default: () => ({}),
      },
      fixed: Boolean,
      options: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      height$ () {
        return toCssSize(this.height)
      },
      hasVuex () {
        return !!this.$store
      }
    },

    methods: {
      onClickLogo () {
        if (this.$router) {
          this.$router.push({name: 'home'})
        }
      },
    },
  }
</script>

<style lang="scss">
  @import './variables.scss';

  .ej-app-header {
    padding: 0 50px;
  }

  .ej-app-logo {
    margin-right: 30px;

    i {
      width: 24px;
      height: 24px;
    }
  }

  .ej-app-tray {
    > * {
      @apply flex-none flex items-center;

      margin-left: 30px;
    }

    .icon {
      width: $tray-icon-size;
      height: $tray-icon-size;
    }
  }

  .ej-app-user {
    &__avatar {
      width: 24px;
      height: 24px;
    }
  }
</style>
