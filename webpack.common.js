const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');   //获取电脑的处理器有几个核心，作为配置传入
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});    // 共享进程池，进程池中包含os.cpus().length个子进程

module.exports = {
    entry: {
        index: './src/index.js',
        list: './src/list.js',
        main: './src/main.js'
    },
    output: {
        chunkFilename: '[name].[hash].js',
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-hot-loader',             // 热更新
                    MiniCssExtractPlugin.loader,  // 分离css
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true        // 压缩代码
                        }
                    },
                    'postcss-loader'
                ],
                include: path.resolve(__dirname, 'src'),  // 限制范围，提高打包速度
                exclude: /node_modules/
            },
            {
                test: /\.less/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=babel',     // 把对.js文件的处理转交给id为babel的HappyPack实例
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                /*
                 * 图片打包
                 * 图片小于limit参数时，使用url-loader，把图片BASE64编码
                 * 图片大于limit参数时，默认使用file-loader拷贝图片
                 */
                test: /\.(png|jpg|jpeg|git|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // 分离css
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilemane: '[id].css'
        }),
        new webpack.ProvidePlugin({
            _: 'lodash'    // 所有页面都引入 _ 变量，不用再import
        }),
        // 约定将公共资源放static中，打包时复制static中的资源到dist/static中
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: path.resolve(__dirname, 'dist/static'),
                ignore: ['.*']
            }
        ]),
        // 开启多进程打包
        new HappyPack({
            id: 'babel',    // 对应上面loader配置中的?id=babel
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPool    // 使用共享进程池中的子进程去处理任务
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {   // 抽离自己写的公共代码，common这个名字可以随意起
                    chunks: 'initial',
                    name: 'common',  // 任意命名
                    minChunks: 2,    // 共享模块的chunks的最小数目
                    minSize: 0       // 只要超出0字节就生成一个新包
                }
            }
        }
    }
};