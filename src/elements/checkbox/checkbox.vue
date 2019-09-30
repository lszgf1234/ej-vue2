<template>
  <span class="e-checkbox">
    <input :id="id" type="checkbox" v-model="groupValue$" :value="value" :disabled="disabled" class="e-checkbox__input">
    <a class="e-checkbox__frame"></a>
    <ej-icon icon="check" class="e-checkbox__checker"/>
  </span>
</template>

<script>
  import {Icon as EjIcon} from '../..'

  export default {
    name: 'ECheckbox',

    components: {
      EjIcon,
    },

    model: {
      prop: 'groupValue',
      event: 'update:groupValue',
    },

    props: {
      id: String,

      groupValue: null,

      value: null,

      disabled: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      groupValue$: {
        get () {
          return this.groupValue
        },

        set (val) {
          this.$emit('update:groupValue', val)
        },
      },
    },
  }
</script>

<style lang="scss">
  $checkbox: 'e-checkbox';
  $checkbox__input: '#{$checkbox}__input';
  $checkbox__frame: '#{$checkbox}__frame';
  $checkbox__checker: '#{$checkbox}__checker';

  .#{$checkbox} {
    @apply inline-block relative align-middle;
  }

  .#{$checkbox__input} {
    @apply absolute top-0 left-0 z-10 w-full h-full opacity-0 cursor-pointer;

    border-radius: 2px;

    &[disabled] {
      @apply cursor-default;
    }
  }

  .#{$checkbox__frame} {
    @apply block border;

    width: 16px;
    height: 16px;
    border-radius: 2px;
    border-color: #D9D9D9;

    @at-root #{selector_nest(selector_append('.#{$checkbox__input}:not([disabled])', ':hover, :checked'), '~ .#{$checkbox__frame}')} {
      @apply border-blue;
    }

    @at-root .#{$checkbox__input}:checked ~ & {
      @apply bg-blue;
    }

    @at-root .#{$checkbox__input}[disabled] ~ & {
      background: #F5F5F5;
    }
  }

  .#{$checkbox__checker} {
    @apply text-white absolute inset-0 m-auto;

    width: 10px;
    height: 10px;

    @at-root .#{$checkbox__input}:not(:checked) ~ & {
      @apply invisible;
    }

    @at-root .#{$checkbox__input}[disabled] ~ & {
      color: #BFBFBF;
    }
  }
</style>
