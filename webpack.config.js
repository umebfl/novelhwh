const webpack = require('webpack')
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin") // sourcemaps
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const config = require('./config')

module.exports = {
    entry: './src/web/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // 打包输出
        filename: 'bundle.[hash].js',
    },
    // devtool: 'inline-source-map', 废弃
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    {
                        loader: 'eslint-loader',
                    },
                ]
            },

            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ]
            },
        ],
    },

    plugins: [
        // 正式环境不需要sourcemaps
        // new webpack.SourceMapDevToolPlugin({}),
        ...config.env === config.DEV ? [new webpack.SourceMapDevToolPlugin({})] : [],

        // html文件生成
        new HtmlWebpackPlugin({
            title: 'RC',
            version: config.version,
            author: 'hwh',
            template: './src/web/index.html',
            bundle_time: config.bundle_time,
            filename: config.env === config.DEV ? 'index.html' : 'index.[hash].html',
        }),

        // 独立打包css文件
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css',
        }),

        // dist文件夹清理
        new CleanWebpackPlugin(),

        // 开启devServer热加载
        new webpack.HotModuleReplacementPlugin(),

        // 自动加载模块
        new webpack.ProvidePlugin({
            // ramda-js函数库
            R: 'ramda',
        }),
    ],

    // 开发服务器
    devServer: {
        hot: true,
        contentBase: './dist',
    },

    // 全局别名
    resolve: {
       moduleExtensions: [path.resolve(__dirname, 'node_modules')],
       alias: {
           SYS: path.resolve(__dirname, './'),
           SRC: path.resolve(__dirname, './src/web'),
       },
   },
}
