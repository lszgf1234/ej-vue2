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

    inheritAttrs: false,

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
        if (IS_STORY_BOOK) return
        this.$apollo.mutate({
          mutation: MUTATION_COMMONLY_DELETE,
          variables: {input: this.id},
        }).then(({data}) => {
          if (!data.result) return
          this.$emit('deleted-select')
        })
      },
    }
  }
</script>

