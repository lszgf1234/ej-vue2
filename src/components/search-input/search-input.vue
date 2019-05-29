<template>
  <el-input v-model="model"
            v-bind="$attrs"
            v-on="$listeners"
            class="ej-search-input"
            :style="styleObj"
            @keyup.enter.native="search">
    <ej-icon slot="suffix"
             icon="search"
             class="ej-app-search__button cursor-pointer"
             @click="search"/>
  </el-input>
</template>

<script>
  import {Input as ElInput} from 'element-ui'

  import EjIcon from '../icon'

  export default {
    name: 'EjSearchInput',

    inheritAttrs: false,

    components: {
      ElInput,
      EjIcon,
    },

    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      width: {
        type: String,
        default: '552px',
      },
      height: {
        type: String,
        default: '40px',
      },
    },

    computed: {
      styleObj () {
        return {
          width: this.width,
          height: this.height,
        }
      },

      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
    },

    methods: {
      search () {
        const input = this.model
        this.$emit('search', input)
      },
    },
  }
</script>

<style lang="scss">
  .ej-search-input {
    .el-input__inner {
      border-radius: 20px;
      height: inherit;
    }

    .ej-app-search__button {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);
    }
  }
</style>

