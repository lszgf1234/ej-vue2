module.exports = async ({config}) => {
  const cssRule = config.module.rules.find(r => r.test.toString() === /\.css$/.toString())

  if (cssRule) {
    const postcss = cssRule.use.find(l => (l.loader || '').includes('postcss-loader'))
    if (postcss) {
      const _plugins = postcss.options.plugins
      postcss.options.plugins = (loader) => [
        require('tailwindcss'),
        require('postcss-easings'),
        ..._plugins(loader),
      ]
    } else {
      console.error('No PostCSS loader was found!')
    }

    /* Add sass-loader */

    cssRule.test = /\.s?css$/
    cssRule.use.push({
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
      },
    })
  } else {
    console.error('No CSS loader rule was found!')
  }

  // gql loader
  config.module.rules.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader'
  })

  return config
}
