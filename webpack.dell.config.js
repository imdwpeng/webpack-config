/*
 * @Author: DWP
 * @Date: 2021-08-12 14:49:24
 * @LastEditors: DWP
 * @LastEditTime: 2021-08-12 15:32:35
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
  // 要打包的模块
  entry: {
    vendor: Object.keys(pkg.dependencies) // 遍历package.json的所有dependencies依赖包
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包后文件输出目录
    filename: '[name].dll.js', // 生成文件的名称
    library: '[name]_library' // 生成文件的映射关系，与下面DllPlugin中配置对应
  },
  plugins: [
    // 会生成一个json文件，里面是关于[name].dll.js的一些配置信息
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dist', 'manifest.json'),
      name: '[name]_library'
    })
  ]
};
