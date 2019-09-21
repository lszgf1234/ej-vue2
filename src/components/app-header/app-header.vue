<template>
  <div class="ej-app-header__wrap" :style="{height: height$}">
    <div class="ej-app-header w-full" :class="{fixed}" :style="{height: height$}">
      <div class="ej-app-header__inner mx-auto flex" :class="{'h-full': true}" :style="{width: width$}">
        <a href="javascript:" class="ej-app-logo flex-none flex items-center" @click="onClickLogo">
          <img v-if="logo" :src="logo" :alt="title" :class="{'mr-3': title}">
          <span v-if="title" class="flex-none text-lg">{{title}}</span>
        </a>

        <slot/>

        <div class="ej-app-tray flex-none ml-auto flex">
          <slot v-if="$scopedSlots.tray" name="tray"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {toCssSize} from '../../utils/ui'

  export default {
    name: 'EjAppHeader',

    provide () {
      return {
        ejAppHeader: this,
      }
    },

    props: {
      height: {
        type: [Number, String],
        default: 50,
      },
      width: {
        type: Number,
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
    },

    computed: {
      height$ () {
        return toCssSize(this.height)
      },

      width$ () {
        return toCssSize(this.width)
      },
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
  .ej-app-header {
    @apply text-white;

    padding: 0 50px;
    background: #1F2E4D;
  }

  .ej-app-logo {
    img {
      height: 30px;
    }

    span {
      @apply font-bold;
    }
  }

  .ej-app-tray {
    > * {
      @apply flex-none flex items-center;

      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
