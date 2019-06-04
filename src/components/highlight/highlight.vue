<template>
  <pre>
    <slot></slot>
  </pre>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
  name: 'EjHighlight',

  data () {
    return {
      languages: ['sql'],
    }
  },

  props: {
    language: {
      type: String,
      default: undefined,
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.splitParagraph()
      this.initStyle()
    })
  },

  updated () {
    this.$nextTick(function () {
      this.initStyle()
    })
  },

  methods: {
    async initStyle () {
      // 只导入所需的库和语言可能会更有效率
      if (this.language && this.languages.includes(this.language)) {
        const languageType = require(`highlight.js/lib/languages/${this.language}`)
        hljs.registerLanguage(`${this.language}`, languageType)
      }

      let targets = this.$el.querySelectorAll('code')
      targets.forEach(target => hljs.highlightBlock(target))
    },

    splitParagraph () {
      const para = this.$el.textContent.split('\n\n')
      this.$el.textContent = ''
      para.map(p => {
        let code = document.createElement('code')
        code.append(p)
        this.$el.append(code)
      })
    },
  },
}
</script>

