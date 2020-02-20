const webpack = require('webpack')
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin") //sourcemaps

module.exports = {
    entry: './src/index.js', //入口
    output: {
        path: path.resolve(__dirname, 'dist'), //打包输出
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
        new webpack.SourceMapDevToolPlugin({}),

        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        })
    ],
}
