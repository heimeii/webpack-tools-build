const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.conf');
const paths = require('../utils/paths');

module.exports = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    entry: {
        main: [
            paths.appEntry,
            require.resolve('webpack-hot-client/client'),
            require.resolve('webpack/hot/dev-server'),
        ],
    },
    output: {
        path: paths.appBuild,
        publicPath: '/',
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js',
    },
    devtool: 'cheap-module-source-map',
    serve: {
        // open: true,
        port: 8080,
        host: '127.0.0.1',
        hotClient: {
            autoConfigure: false,
        },
        logLevel: 'error',
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
        new HtmlWebpackPlugin({
            template: paths.resolveOwn('./index.html'),
        }),
    ],
    optimization: {
        noEmitOnErrors: true,
    },
})
