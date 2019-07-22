<template>
  <div class="ej-search-conditions">
    <ej-search-tag :options="options"
                   :show-more="defaultTagMore"
                   :max-width="maxWidthTag"
                   @close="close">
        <template #prefix><slot name="tag-prefix" v-on="$listeners"/></template>
        <template #suffix><slot name="tag-suffix" v-on="$listeners"/></template>
    </ej-search-tag>
    <slot :setOptions="setOptions"/>
  </div>
</template>

<script>
  import EjSearchTag from './tag/index'

  export default {
    name: 'EjSearchOptions',

    components: {
      EjSearchTag,
    },

    props: {
      defaultTagMore: Boolean,
      maxWidthTag: String,
    },

    data () {
      return {
        options: [],
      }
    },

    methods: {
      close (index, item) {
        // slot之前还有'已选条件'组件 index+1
        this.$children[++index].$listeners.input([])
        this.setOptions(index, item)
      },
      setOptions (index, item) {
        if (index === -1) return
        // slot之前还有'已选条件'组件 index-1
        this.$set(this.options, index - 1, item)
      },
    },
  }
</script>
