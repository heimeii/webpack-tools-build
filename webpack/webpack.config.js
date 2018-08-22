const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Element = require('./base/Element');
const config = require('../utils/config');
const paths = require('../utils/paths');

module.exports = new Element({
    context: paths.appPath,
    entry: {
        main: './src/main.js',
    },
    output: {
        path: paths.resolveApp('./build'),
        publicPath: '/',
        pathinfo: false,
    },
    resolve: {
        cacheWithContext: true,
        extensions: ['.js', '.mjs', '.json'],
        alias: {
            '@': paths.resolveApp('./src'),
        },
        modules: ['node_modules', paths.resolveOwn('./node_modules')],
    },
    resolveLoader: {
        modules: ['node_modules', paths.resolveOwn('./node_modules')],
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                oneOf: [
                    {
                        test: /\.(bmp|png|jpe?g|gif|svg)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/img/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/fonts/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(m)?js$/,
                sideEffects: false,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    ...require('../lib/.babelrc.js'),
                },
            },
            {
                test: /\.(post)?css$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            process.env.NODE_ENV !== 'production'
                                ? 'vue-style-loader'
                                : MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    sourceMap: true,
                                    modules: true,
                                    localIdentName: '[local]_[hash:base64:5]'
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    config: {
                                        path: config.findPostcssConfigFile || paths.resolveOwn('./lib/'),
                                    },
                                    ctx: {},
                                },
                            },
                        ],
                    },
                    {
                        use: [
                            process.env.NODE_ENV !== 'production'
                                ? 'vue-style-loader'
                                : MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ...require('../lib/.postcssrc'),
                                },
                            },
                        ],
                    }
                ],
            },
        ],
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
});
