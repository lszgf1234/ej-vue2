<template>
  <el-input v-model="model"
            v-bind="$attrs"
            v-on="$listeners"
            :style="styleObj"
            class="ej-input">
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
      value: {
        type: [String, Number],
        default: '',
      },

      width: {
        type: [String, Number],
        default: 552,
      },

      // 是否开启防抖
      isDebounce: {
        type: Boolean,
        default: false,
      },

      // 防抖时间
      debounceTime: {
        type: Number,
        default: 0,
      },

      // 节流
      isThrottle: {
        type: Boolean,
        default: false,
      },

      // 节流间隔
      throttleTime: {
        type: Number,
        default: 0,
      },
    },

    computed: {
      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
  
          // 防抖
          if (this.isDebounce && this.debounceTime > 0) {
            this.debounce(val)
            return
          }

          // 节流
          if (this.isThrottle && this.throttleTime > 0) {
            this.throttle(val)
          }
        },
      },

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
      debounceTime: {
        immediate: true,
        handler (spacingTime) {
          const _this = this

          // 设置防抖函数
          this.debounce = Debounce(function (val) {
            _this.ejChange(val, spacingTime)
          }, spacingTime)
        },
      },

      throttleTime: {
        immediate: true,
        handler (spacingTime) {
          const _this = this

          // 设置防抖函数
          this.throttle = Throttle(function (val) {
            _this.ejChange(val, spacingTime)
          }, spacingTime)
        },
      },
    },

    methods: {
      ejChange (val, spacingTime) {
        this.$emit('ej-change', val, spacingTime)
      },
    },
  }
</script>
