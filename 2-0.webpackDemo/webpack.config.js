// webpack.config.js
// 'webpack' command will pick up this config setup by default

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, 'dist') //path.resolve : [Node.js API] 인자로 넘어온 경로 조합
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    preset: [
                        ['@babel/preset-env', {
                            targets: {browsers: ['last 2 chrome versions']},
                            debug: true,
                        }],
                    ],

                },
                exclude: path.join(__dirname, 'node_modules'),
            },
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    "css-loader"
                ], exclude: path.join(__dirname, 'node_modules')
            },
            {test: /\.ts$/, use: 'ts-loader', exclude: path.join(__dirname, 'node_modules')},
        ]
    },
    devServer : {
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            //index.html템플릿을 기반으로 빌드 결과물을 추가해줌
            template : 'index.html',
        }),
        new webpack.ProgressPlugin()
    ]
};