/*
 * @Author: Dong
 * @Date: 2021-01-13 16:01:54
 * @LastEditors: Dong
 * @LastEditTime: 2021-01-13 16:40:49
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'none',
  entry: {
    index: './src/index.js',
    'index.min': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryExport: 'default', // 直接对外暴露default属性，可直接调用 new Demo()
    library: 'Demo', // 组件名称
    libraryTarget: 'umd' // 采用UMD模式打包，同时支持CommonJS、AMD和全局变量模式
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    // 清空dist文件夹
    new CleanWebpackPlugin(['dist'])
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ]
  }
});
