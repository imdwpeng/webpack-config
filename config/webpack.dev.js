/*
 * @Author: Dong
 * @Date: 2020-09-06 10:07:01
 * @LastEditors: Dong
 * @LastEditTime: 2020-09-07 09:15:20
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const portfinder = require('portfinder');

const baseWebpackConfig = require('./webpack.common');
const config = require('./config');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].js',
    publicPath: config.publicPath // 这里可以省略
  },
  module: {
    rules: [
      {
        oneOf: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: config.indexPath,
      minify: {
        html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    ...config.devServer
  },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    builtAt: false,
    entrypoints: false,
    assets: false,
    version: false
  }
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = config.devServer.port;
  // 自动寻找空闲端口监听
  portfinder.getPort((err, port) => {
    if (err) reject(err);
    else {
      devWebpackConfig.devServer.port = port;
    }
    resolve(devWebpackConfig);
  });
});
