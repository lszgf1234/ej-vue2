<template>
  <div class="ej-search-conditions" >
    <conditions-tag :options="options" @close="close"/>
    <slot/>
  </div>
</template>

<script>
  import ConditionsTag from './conditions-tag'

  export default {
    name: 'EjSearchConditions',

    components: {
      ConditionsTag,
    },

    data () {
      return {
        options: [],
      }
    },

    methods: {
      close (index, item) {
        // slot之前还有一个'已选条件'组件 所以index+1
        this.$children[++index].$listeners.input([])
        this.setOptions(item)
      },
      setOptions (item) {
        const key = item.value
        const index = this.options.findIndex(item => {
          return item.value === key
        })
        if (index === -1) {
          this.options.push(item)
        } else {
          this.$set(this.options, index, item)
        }
      },
    },
  }
</script>
