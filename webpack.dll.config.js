
const path = require('path')
const webpack = require('webpack')
const project = require('./project.config')


const config = {
  entry: {
    vendor: project.vendors,
  },
  output: {
    path: path.join(__dirname, project.outDir),
    filename: '[name]_bundle.js',
    library: '[name]_bundle'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, project.manifest),
      name: '[name]_bundle',
      context: __dirname,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['exports', 'require']
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
    ]
  }
}

module.exports = config