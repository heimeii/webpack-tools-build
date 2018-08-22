const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const TransfromPostcssPlugin = require('../plugin/TransfromPostcssPlugin');
const config = require('../../utils/config');
const paths = require('../../utils/paths');

module.exports = {
    mode: 'production',
    bail: true,
    devtool: 'hidden-source-map',
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: config.findTemplateFile || paths.resolveOwn('./index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
        new TransfromPostcssPlugin({}),
        new WebpackManifestPlugin({
            fileName: 'manifest.json',
            filter({ name }) {
                return !name.match(/\.map$/);
            },
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: 'single',
    },
};
