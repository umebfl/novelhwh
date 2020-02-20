const webpack = require('webpack')
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin") // sourcemaps
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const config = require('./config')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // 打包输出
        filename: 'bundle.js',
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
            author: 'hwh',
            templated: './src/index.html',
        }),

        // 独立打包css文件
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),

        // dist文件夹清理
        new CleanWebpackPlugin(),

        // 开启devServer热加载
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        contentBase: './dist',
    },
}
