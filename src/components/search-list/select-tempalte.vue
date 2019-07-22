<template>
  <div class="flex justify-between items-center">
    {{label}}
    <i class="el-icon-circle-close" @click.stop="deleted()"/>
  </div>
</template>

<script>
  import MUTATION_COMMONLY_DELETE from './grapgql/mutation_commonly_delete.gql'

  export default {
    name: 'EjSearchSelectTemplate',

    props: {
      params: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      label () {
        return this.params.label || ''
      },
      id () {
        return this.params.conditionId || ''
      },
    },

    methods: {
      deleted () {
        this.$apollo.query({
          query: MUTATION_COMMONLY_DELETE,
          fetchPolicy: 'network-only',
          variables: {input: this.id},
        }).then(({data}) => {
          this.$emit('deleted-select')
        })
      },
    }
  }
</script>

