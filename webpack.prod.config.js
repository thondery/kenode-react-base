
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: !!webpackConfig.devtool,
    comments: false,
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin()
)

module.exports = webpackConfig