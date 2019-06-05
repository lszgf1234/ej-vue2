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

    props: {
      models: {
        type: Object,
        default: () => ({}),
      },
    },

    data () {
      return {
        options: [],
      }
    },

    methods: {
      close (item) {
        const key = item.value
        this.$set(this.models, key, [])
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
