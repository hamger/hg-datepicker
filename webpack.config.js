const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const config = {
    entry: argv.mode === 'production' ? './src/index.js' : './examples/index.js',
    output: {
      filename: 'hg-datepicker.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'DatePicker',
      libraryTarget: 'umd',
      libraryExport: 'default'
    },
    devtool: argv.mode === 'production' ? false : 'cheap-module-eval-source-map',
    performance: {
      hints: false
    },
    optimization: {},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'eslint-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        }
      ]
    },
    plugins: []
  }

  if (argv.mode === 'development') {
    config.devServer = {
      clientLogLevel: 'none',
      hot: true,
      compress: true,
      stats: 'errors-only',
      port: 8121
    }

    config.plugins = config.plugins.concat([
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: path.resolve(__dirname, './examples/index.html')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css'
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ])
  }

  return config
}
