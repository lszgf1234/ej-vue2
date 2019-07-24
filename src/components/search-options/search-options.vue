<template>
  <div class="ej-search-conditions">
    <ej-search-tag :options="options"
                   :show-more="defaultTagMore"
                   :max-width="maxWidthTag"
                   @close="close">
        <template #prefix><slot name="tag-prefix" v-on="$listeners"/></template>
        <template #suffix><slot name="tag-suffix" v-on="$listeners"/></template>
    </ej-search-tag>
    <slot :setSeleted="setSeleted"/>
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
        options: {},
      }
    },

    methods: {
      close (key) {
        this.$children.forEach(item => {
          if (item.prop === key) {
            item.$listeners.input([])
          }
        })
        this.$delete(this.options, key)
        this.$emit('closeSelected', key)
      },

      setSeleted ({key, label}) {
        if (!key) return
        if (!label) {
          this.$delete(this.options, key)
        } else {
          this.$set(this.options, key, {label})
        }
      },
    },
  }
</script>
