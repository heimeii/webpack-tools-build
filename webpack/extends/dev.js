const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const config = require('../../utils/config');
const paths = require('../../utils/paths');

module.exports = {
    mode: 'development',
    entry: {
        main: [
            './src/main.js',
            require.resolve('webpack-hot-client/client'),
            require.resolve('webpack/hot/dev-server'),
        ],
    },
    output: {
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
    watchOptions: {
        ignored: ['node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        new HtmlWebpackPlugin({
            template: config.findTemplateFile || paths.resolveOwn('./index.html'),
        }),
    ],
    optimization: {
        noEmitOnErrors: true,
    },
};
