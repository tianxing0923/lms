const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');

const appCss = new ExtractTextPlugin('css/styles.[contenthash].css');
const vendorCss = new ExtractTextPlugin('css/vendor.[contenthash].css');

module.exports = function (env) {
  return webpackMerge(commonConfig({
    env: env,
    vendorCss: vendorCss
  }), {
    devtool: 'source-map',
    output: {
      filename: 'js/[name].[chunkhash].js'
    },
    module: {
      rules: [{
        test: /\.less$/,
        exclude: /node_modules/,
        use: appCss.extract({
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'postcss-loader',
            'less-loader'
          ],
          publicPath: '../',
          allChunks: true
        })
      }, {
        test: /\.(jpg|png|gif)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 3072,
              name: 'images/[name].[hash].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|svg|ijmap)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash].[ext]'
          }
        }]
      }, {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [{
          loader: 'pug-loader'
        }]
      }]
    },
    plugins: [
      appCss,
      new webpack.optimize.UglifyJsPlugin({
        // comments: false,
        sourceMap: true
      })
    ],
  });
}