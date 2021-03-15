 const postcssConfig = {
    plugins: [
    require('autoprefixer'),
    require('postcss-preset-env'),
  ],
}

process.env.NODE_ENV === 'production' ?
  postcssConfig.plugins.push(require('cssnano')({ preset: 'default' })) :
  console.log('It is development mode. cssnano not added');

module.exports = postcssConfig;