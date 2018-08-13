const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.conf');
const path = require('path');
const paths = require('../utils/paths');

module.exports = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    entry: {
        main: [
            paths.appEntry,
            require.resolve('webpack-dev-server/client') + '?http://127.0.0.1:8080',
            require.resolve('webpack/hot/dev-server'),
        ],
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: paths.appBuild,
        compress: true,
        port: 8080,
        host: '127.0.0.1',
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        open: true,
        overlay: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: paths.resolveOwn('./index.html'),
        }),
    ],
})
