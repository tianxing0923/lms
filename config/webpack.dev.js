const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');

const vendorCss = new ExtractTextPlugin('css/vendor.css');

module.exports = function (env) {
  return webpackMerge(commonConfig({
    env: env,
    vendorCss: vendorCss
  }), {
    devtool: 'eval',
    output: {
      filename: 'js/[name].js'
    },
    module: {
      rules: [{
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }, {
        test: /\.(jpg|png|gif)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 3072,
            name: 'images/[name].[ext]'
          }
        }, {
          loader: 'image-webpack-loader'
        }]
      }, {
        test: /\.(woff|woff2|eot|ttf|svg|ijmap)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      }, {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }]
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: path.join(__dirname, '../dist'),
      compress: true,
      proxy: {
        '/sign/': 'http://localhost:5000',
        '/api': 'http://localhost:5000'
      },
      historyApiFallback: {
        disableDotRule: true
      },
      hot: true,
      watchContentBase: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  });
}