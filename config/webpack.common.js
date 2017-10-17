const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取渲染页面集合
function getPages(globs, dir) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globs).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/');
    tmp = tmp.slice(tmp.indexOf(dir), -1).join('/');
    pathname = tmp + (tmp ? '/' : '') + basename + '.html'; // 正确输出html路径
    entries[pathname] = entry;
  });
  return entries;
}

// 构建入口页面
function buildEntryPages(plugins) {
  var pages = getPages('client/views/*.pug', '');
  for (var key in pages) {
    plugins.push(new HtmlWebpackPlugin({
      filename: key,
      template: pages[key],
      chunksSortMode: 'dependency',
      minify: false
    }));
  }
}

// 构建模版页面
function buildTemplatePages(plugins) {
  var pages = getPages('client/views/templates/**/*.pug', 'templates');
  for (var key in pages) {
    plugins.push(new HtmlWebpackPlugin({
      filename: key,
      template: pages[key],
      chunks: [],
      minify: false
    }));
  }
}

module.exports = function (options) {
  var plugins = [
    options.vendorCss,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['components', 'vendor', 'jquery', 'manifest'],
      minChunks: Infinity
    })
  ];

  buildEntryPages(plugins);
  buildTemplatePages(plugins);

  return {
    entry: {
      app: path.resolve(__dirname, '../client/app.js'),
      vendor: [
        'jquery',
        'angular',
        'angular-animate',
        'angular-aria',
        'angular-messages',
        'angular-ui-router',
        'angular-material'
      ],
      components: [
        'froala-editor',
        'angular-material-data-table',
        'angular-froala'
      ]
    },
    output: {
      path: path.resolve(__dirname, '../dist')
    },
    resolve: {
      modules: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../client')
      ],
      extensions: ['.js', '.json', '.less', '.css']
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: options.vendorCss.extract({
          use: {
            loader: 'css-loader',
            options: {
              minimize: options.env == 'production'
            }
          },
          publicPath: '../',
          allChunks: true
        })
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'targets': {
                  uglify: true
                }
              }]
            ]
          }
        }
      }]
    },
    plugins: plugins
  };
}