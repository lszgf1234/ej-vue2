<template>
  <div class="ej-search-select-tempalte flex justify-between items-center">
    {{label}}
    <i class="el-icon-circle-close" @click.stop="deleted()"/>
  </div>
</template>

<script>
  import { Message } from 'element-ui';

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
        return this.params.value || ''
      },
    },

    methods: {
      deleted () {
        this.$apollo.mutate({
          mutation: MUTATION_COMMONLY_DELETE,
          client: 'apolloUserClient',
          variables: {input: [this.id]},
        }).then(({data}) => {
          if (!data || !data.result) return
          this.$emit('deleted-select', this.id)
        }).catch((err) => {
          console.error(err)
          Message.error('删除常用条件失败')
        })
      },
    }
  }
</script>


<style lang="scss">
  .ej-search-select-tempalte {
    &:hover {
      .el-icon-circle-close {
        @apply inline-block;
      }
    }

    .el-icon-circle-close {
      @apply hidden;

      transition: color .2s;

      &:hover {
        @apply text-blue-light;
      }
    }
  }
</style>

