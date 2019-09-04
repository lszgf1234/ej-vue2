<template>
  <el-input v-bind="$attrs"
            v-on="$listeners"
            :style="styleObj"
            class="ej-input"
            @input="observerInput">
    <slot v-for="slot in slots" :slot="slot" :name="slot"/>
  </el-input>
</template>

<script>
  import {Input as ElInput} from 'element-ui'
  import {debounce as Debounce, throttle as Throttle} from 'lodash-es'

  import {toCssSize} from '../../utils/ui'

  export default {
    name: 'EjInput',

    inheritAttrs: false,

    components: {
      ElInput,
    },

    props: {
      width: {
        type: [String, Number],
        default: 552,
      },

      // 防抖间隔
      debounce: {
        type: Number,
        default: 0,
      },

      // 节流间隔
      throttle: {
        type: Number,
        default: 0,
      },

      // 仅数字
      number: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      styleObj () {
        return {
          width: toCssSize(this.width),
        }
      },

      slots () {
        return Object.keys(this.$slots)
      },
    },

    watch: {
      debounce: {
        immediate: true,
        handler (spacingTime) {
          const _this = this

          // 设置防抖函数
          this.debounceFn = Debounce(function (val) {
            _this.ejChange(val, spacingTime)
          }, spacingTime)
        },
      },

      throttle: {
        immediate: true,
        handler (spacingTime) {
          const _this = this

          // 设置防抖函数
          this.throttleFn = Throttle(function (val) {
            _this.ejChange(val, spacingTime)
          }, spacingTime)
        },
      },
    },

    created () {
      this.$listeners.input = this.observerInput
    },

    methods: {
      observerInput (val) {
        // 数值类型
        if (this.number && val !== '') {
          val = Number(val.replace(/[^\d]/g, ''))
        }

        this.$emit('input', val)

        this.setValue(val)
      },

      setValue (val) {
        // 防抖
        if (this.debounce > 0) {
          this.debounceFn(val)
          return
        }

        // 节流
        if (this.throttle > 0) {
          this.throttleFn(val)
        }
      },

      ejChange (val, spacingTime) {
        this.$emit('ej-change', val, spacingTime)
      },
    },
  }
</script>
