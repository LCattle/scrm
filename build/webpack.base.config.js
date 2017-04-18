const path = require('path')
const vueConfig = require('./vue-loader.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-eval-source-map',
  entry: {
    app: './src/entry-client.js',
    vendor: [
      'es6-promise/auto',
      'firebase/app',
      'firebase/database',
      'lru-cache',
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
    // vendor: ['vue', 'vue-router', 'vuex', 'firebase', 'lru-cache', 'es6-promise']
  },
  // externals: {   // If you load it via <script> tag
  //   // jquery: 'jQuery'
  //   Zepto: 'Zepto'
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign'
        }
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel',
      //   exclude: /node_modules/
      // },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'css' },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd ? [] : [
    new FriendlyErrorsPlugin()
  ]
}
