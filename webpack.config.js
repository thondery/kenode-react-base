
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const fs = require('fs-extra')
const project = require('./project.config')

const { __DEV__, __PROD__, globals } = project
const contextPath = globals.__DESKTOP__ ? '' : '/'
const assets = []
const isManifest = fs.existsSync(`./${project.manifest}`)
if (isManifest) {
  const manifest = require(`./${project.manifest}`)
  for (let ext of ['js', 'css']) {
    fs.existsSync(`./${project.outDir}/${manifest.name}.${ext}`) && assets.push(`${contextPath}${manifest.name}.${ext}`)
  }
}
assets.push(`${contextPath}index.bundle.js`)
assets.push(`${contextPath}index.bundle.css`)

const config = {
  context: path.resolve(__dirname, project.srcDir),
  cache: true,
  entry: {
    index: './index.js',
  },
  devtool: project.sourcemaps ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, project.outDir),
    filename: '[name].bundle.js',
    publicPath: project.publicPath
  },
  resolve: {
    modules: [
      path.resolve(__dirname, project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: project.alias
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
			manifest: require('./dll/manifest.json')
    }),
    new webpack.DefinePlugin(Object.assign({
      'process.env': {
        'NODE_ENV': JSON.stringify(project.env)
      },
      __DEV__,
      __PROD__
    }, project.globals)),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template : path.resolve(__dirname, project.srcDir, 'index.html'),
      filename : 'index.html',
      inject   : 'body',
      hash     : true,
      excludeChunks   : ['vendor', 'index'],
      minify   : {
        collapseWhitespace : false
      }
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: assets,
      append: false,
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test : /\.json$/,
        use : [
          'json-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&-minimize'
        })
      },
    ],
  }
}

module.exports = config