<template>
  <el-input v-model="model"
            v-bind="$attrs"
            v-on="$listeners"
            :style="styleObj"
            @keyup.enter.native="search"
            class="ej-search-input"
  >
    <ej-icon  icon="search"
              slot="suffix"
              @click="search"
              class="ej-app-search__button cursor-pointer"
    />
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

    data() {
      return {
        model: '',
      };
    },

    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      width: {
        default: String,
        default: '552px',
      },
      height: {
        default: String,
        default: '40px',
      },
    },

    methods: {
      change (val) {
        this.$emit('input', val)
      },
      search () {
        const input = this.model
        this.$emit('search', input)
      },
    },

    computed: {
      styleObj () {
        return {
          width: this.width,
          height: this.height,
        }
      }
    },

    watch: {
      value: {
        handler (newVal) {
          this.model = newVal;
        },
        immediate: true
      }
    },
  }
</script>

<style lang="scss">
  .ej-search-input {
    .el-input__inner {
      border-radius: 20px;
    }

    .ej-app-search__button {
      width: 20px;
      height: 20px;
      transform: translate(-10px, 10px);
    }
  }
</style>

