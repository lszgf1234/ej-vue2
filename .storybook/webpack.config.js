module.exports = async ({config}) => {
  const cssRule = config.module.rules.find(r => r.test.toString() === /\.css$/.toString())

  if (cssRule) {
    const postcss = cssRule.use.find(l => (l.loader || '').includes('postcss-loader'))
    if (postcss) {
      const _plugins = postcss.options.plugins
      postcss.options.plugins = (loader) => [
        require('tailwindcss'),
        ..._plugins(loader),
      ]
    } else {
      console.error('No PostCSS loader was found!')
    }
  } else {
    console.error('No CSS loader rule was found!')
  }

  return config
}
