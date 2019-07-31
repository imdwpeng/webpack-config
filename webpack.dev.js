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
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    proxy: [{
      context: ['/php', '/imgs'],
      target: '', // 接口的域名
      changeOrigin: true // 如果接口跨域，需要进行这个参数配置
    }],
    port: 8080, // 端口，默认8080
    hot: true, // 热加载
    historyApiFallback: {
      // html5 history模式
      rewrities: [{ from: /.*/, to: path.resolve(__dirname, 'public', 'index.html') }]
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'), // html模板，如设置该参数，则按该模板来，忽略下面的title参数
      filename: 'index.html',
      title: 'webpack demo',
      // favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      hash: true,
      chunks: ['index']
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
