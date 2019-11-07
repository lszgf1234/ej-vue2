<template>
  <ul class="ej-ide-tabs-view flex flex-wrap">
    <li v-for="(it, idx) of list"
        :key="idx"
        @click="index$ = idx"
        :class="{active: idx === index$}"
        class="ide-tab-item flex items-center cursor-pointer">
      <span class="text-sm single name">{{it.name}}</span>
      <a href="javascript:"
         @click="remove(idx, it)"
         class="my-icon-wrap">
        <ej-icon icon="close" class="my-icon"/>
      </a>
    </li>
  </ul>
</template>

<script>
  import Icon from '../icon'

  export default {
    name: 'EjIdeTabs',

    components: {
      [Icon.name]: Icon,
    },

    props: {
      list: {
        type: Array,
        default: () => {
        },
      },

      index: {
        type: Number,
        default: 0,
      },
    },

    computed: {
      index$: {
        get () {
          return this.index
        },

        set (val) {
          this.$emit('update:index', val)
        },
      },
    },

    methods: {
      remove (idx, it) {
        this.$emit('remove', idx, it)
      },
    },
  }
</script>

<style lang="scss">
  .ej-ide-tabs-view {
    .ide-tab-item {
      @apply bg-gray-light;
      padding: 4px 16px;
      border: 1px solid theme('colors.gray.default');
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      position: relative;
      margin-right: -1px;

      &.active {
        @apply bg-white text-blue;
        z-index: 10;
      }

      .name {
        max-width: 300px;
      }
    }

    .my-icon-wrap {
      margin-left: 12px;
    }

    .my-icon {
      width: 8px;

      &:hover {
        color: lighten(#477de9, 20%);
      }
    }
  }
</style>
<style lang="scss">
  .single {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
