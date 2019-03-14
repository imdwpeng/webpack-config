const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8000, // 端口，默认8080
    hot: true // 热加载
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'), // html模板，如设置该参数，则按该模板来，忽略下面的title参数
      title: 'webpack demo',
      hash: true
    }),
    // 将vendor.dll.js加入至html中
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['vendor.dll.js'],
      append: false // 在其他静态资源前加入vendor.dll.js
    }),
    // 找到生成的manifest.json文件配置到plugins里面
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
