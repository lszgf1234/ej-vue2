<template>
  <div class="ej-search-conditions" >
    <conditions-tag :options="conditionsOptions" @close="close"/>
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
        default: () => {},
      },
      datas: {
        type: Object,
        default: () => {},
      },
    },

    computed: {
      conditionsOptions () {
        const models = this.models
        const datas = this.datas
        let arr = []

        for (let i in models) {
          const model = models[i] || []
          const data = datas[i] || {}
          const options = data.options || []

          if (!model.length || !options.length) continue
          arr.push({
            value: i,
            label: data.label,
            children: data.selected || [],
          })
        }

        return arr
      },
    },

    methods: {
      close (key) {
        this.$set(this.models, key, [])
      },
    },
  }
</script>
