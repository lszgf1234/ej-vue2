<template>
  <div class="ej-search-conditions" >
    <ej-search-tag :options="options" @close="close"/>
    <slot/>
  </div>
</template>

<script>
  import EjSearchTag from './search-option-tag'

  export default {
    name: 'EjSearchOptions',

    components: {
      EjSearchTag,
    },

    data () {
      return {
        options: [],
      }
    },

    methods: {
      close (index, item) {
        // slot之前还有'已选条件'组件 所以index+1
        this.$children[index + 1].$listeners.input([])
        this.setOptions(index, item)
      },
      setOptions (index, item) {
        if (index === -1) return
        this.$set(this.options, index, item)
      },
    },
  }
</script>
