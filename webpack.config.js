const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        first: './src/index.js',
        second: './src/second.js',
        vendor: [    // 将第三方库(如此处的lodash)提取到单独的vendor chunk文件中
            'lodash'
        ]
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilemane: '[id].css'
        }),
        new HtmlWebpackPlugin({
            title: 'webpack demo'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000,    // 默认8080
        hot: true
    },
    devtool: 'cheap-module-eval-source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',   // 打包后的文件名，任意命名
                    priority: 10      // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包

                },
                common: {   // 抽离自己写的公共代码，utils这个名字可以随意起
                    chunks: 'initial',
                    name: 'common',  // 任意命名
                    minChunks: 2,    // 共享模块的chunks的最小数目
                    minSize: 0       // 只要超出0字节就生成一个新包
                }
            }
        }
    }
};





