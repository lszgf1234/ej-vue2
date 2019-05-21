<template>
  <div class="ej-app-header__wrap" :style="{height: height + 'px'}">
    <div class="ej-app-header bg-black text-white flex w-full"
         :class="{fixed}"
         :style="{height: height + 'px'}">
      <a href="javascript:" class="ej-app-logo flex-none flex items-center">
        <i class="flex-none rounded bg-white mr-2 opacity-50"></i>
        <span class="flex-none text-lg">{{title}}</span>
      </a>

      <div class="ej-app-tray flex-none ml-auto flex">
        <a href="javascript:">
          <ej-icon icon="search" class="icon"/>
        </a>
        <a href="javascript:">
          <ej-icon icon="bell" class="icon"/>
        </a>
        <a href="javascript:">
          <i class="ej-app-user__avatar flex-none rounded-full bg-white mr-2 opacity-50"></i>
          <span class="flex-none">Somebody</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import EjIcon from '../icon'

  export default {
    name: 'EjAppHeader',

    components: {
      EjIcon,
    },

    props: {
      height: {
        type: [Number, String],
        default: 50,
      },
      title: {
        type: String,
        required: true,
      },
      fixed: Boolean,
    },
  }
</script>

<style>
  .ej-app-header {
    padding: 0 50px;
  }

  .ej-app-logo i {
    width: 24px;
    height: 24px;
  }

  .ej-app-tray > * {
    @apply flex-none flex items-center;

    margin-left: 30px;
  }

  .ej-app-tray .icon {
    width: 18px;
    height: 18px;
  }

  .ej-app-user__avatar {
    width: 24px;
    height: 24px;
  }
</style>
