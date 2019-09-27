<template>
  <span class="e-switch" :class="classes">
    <a class="e-switch__toggle"></a>

    <input type="checkbox" v-model="inputValue" :disabled="inputDisabled" class="e-switch__input" @click.prevent="valueProxy = !inputValue">
  </span>
</template>

<script>
  const Size = {
    default: 'default',
    small: 'small',
  }

  export default {
    name: 'ESwitch',

    model: {
      event: 'update:value',
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },

      disabled: {
        type: Boolean,
        default: false,
      },

      size: {
        type: String,
        default: Size.default,
        validator: val => Size[val],
      },
    },

    data () {
      return {
        inputValue: this.value,
        inputDisabled: this.disabled,
      }
    },

    computed: {
      classes () {
        return [
          this.inputValue ? 'e-switch--on' : 'e-switch--off',
          this.inputDisabled && 'e-switch--disabled',
          `e-switch--${this.size}`,
        ].filter(Boolean)
      },

      valueProxy: {
        get () {
          return this.inputValue
        },

        async set (val) {
          if (typeof this.$listeners.change === 'function') {
            // 在异步确认过程中控件总是处在禁用状态
            this.inputDisabled = true

            const flag = await this.$listeners.change()

            // 异步确认过程结束后，恢复到外部注入的禁用状态（不一定要解除禁用状态）
            this.inputDisabled = this.disabled

            if (flag === false) return
          }

          this.inputValue = val
          this.$emit('update:value', val)
        },
      },
    },

    watch: {
      value (val) {
        this.inputValue = val
      },

      disabled (val) {
        this.inputDisabled = val
      },
    },
  }
</script>

<style lang="scss">
  $--root-name: 'e-switch';

  .#{$--root-name} {
    @apply inline-block rounded-full flex items-center relative;

    width: 44px;
    height: 22px;

    &__toggle {
      @apply block rounded-full bg-white flex-none;

      margin: 2px;
    }

    &__input {
      @apply absolute opacity-0 w-full h-full rounded-full cursor-pointer;
    }

    &.#{$--root-name}--default {
      width: 44px;
      height: 22px;

      .#{$--root-name}__toggle {
        width: 18px;
        height: 18px;
      }
    }

    &.#{$--root-name}--small {
      width: 28px;
      height: 16px;

      .#{$--root-name}__toggle {
        width: 12px;
        height: 12px;
      }
    }

    &.#{$--root-name}--on {
      @apply bg-blue;

      &.#{$--root-name}--disabled {
        background: #B5CBF6;
      }

      .#{$--root-name}__toggle {
        @apply ml-auto;
      }
    }

    &.#{$--root-name}--off {
      background: #BFBFBF;

      &.#{$--root-name}--disabled {
        background: #D9D9D9;

        .#{$--root-name}__toggle {
          background: #F6F6F6;
        }
      }
    }

    &.#{$--root-name}--disabled {
      .#{$--root-name}__input {
        @apply cursor-default;
      }
    }
  }
</style>
