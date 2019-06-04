<template>
  <pre ref="hljs">
    <slot></slot>
  </pre>
</template>

<script>
import hljs from 'highlight.js'

export default {
  name: 'EjHightlight',

  props: {
    styleName: {
      type: String,
      default: 'github',
    },

    language: {
      type: String,
      default: undefined,
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.splitPara()
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
      // 根据官方提供的主题，可以指定自己喜欢的主题
      await import(`highlight.js/styles/${this.styleName}.css`)

      // 只导入所需的库和语言可能会更有效率
      if (this.language) {
        const languageType = require(`highlight.js/lib/languages/${this.language}`)
        hljs.registerLanguage(`${this.language}`, languageType)
      }

      let targets = this.$refs.hljs.querySelectorAll('code')
      targets.forEach(target => hljs.highlightBlock(target))
    },

    splitPara () {
      const para = this.$refs.hljs.textContent.split('\n\r')
      this.$refs.hljs.textContent = ''
      para.map(p => {
        let code = document.createElement('code')
        code.append(p)
        this.$refs.hljs.append(code)
      })
    },
  },
}
</script>

