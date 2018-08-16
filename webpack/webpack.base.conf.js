const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../utils/paths');
const vueLoaderConfig = require('../utils/vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        main: paths.appEntry,
    },
    output: {
        path: paths.appBuild,
        publicPath: '/',
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].js',
    },
    resolve: {
        cacheWithContext: true,
        extensions: ['.js', '.mjs', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': paths.resolveApp('src'),
        },
        modules: [paths.resolveApp('./node_modules'), paths.resolveOwn('./node_modules')],
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                test: /\.(js|vue)$/,
                loader: require.resolve('eslint-loader'),
                enforce: 'pre',
                include: [paths.resolveApp('src')],
                options: {
                    cache: true,
                    baseConfig: require(require.resolve('../lib/.eslintrc')),
                    eslintPath: require.resolve('eslint'),
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true,
                },
            },
            {
                oneOf: [
                    {
                        test: /\.(bmp|png|jpe?g|gif|svg)(\?.*)?$/,
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/img/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/fonts/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: require.resolve('vue-loader'),
                options: vueLoaderConfig,
            },
            {
                test: /\.js$/,
                loader: require.resolve('babel-loader'),
                exclude: /node_modules/,
                options: {
                    babelrc: false,
                    compact: false,
                    cacheDirectory: true,
                    highlightCode: true,
                    presets: [
                        require.resolve('@babel/preset-env'),
                    ],
                    plugins: [
                        require.resolve('@babel/plugin-transform-runtime'),
                    ],
                },
            },
            {
                test: /\.(post)?css$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            process.env.NODE_ENV !== 'production'
                                ? require.resolve('vue-style-loader')
                                : MiniCssExtractPlugin.loader,
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                    sourceMap: true,
                                    modules: true,
                                    localIdentName: '[local]_[hash:base64:5]'
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ...require(require.resolve('../lib/.postcssrc')),
                                },
                            },
                        ],
                    },
                    {
                        use: [
                            process.env.NODE_ENV !== 'production'
                                ? require.resolve('vue-style-loader')
                                : MiniCssExtractPlugin.loader,
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ...require(require.resolve('../lib/.postcssrc')),
                                },
                            },
                        ],
                    }
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    watchOptions: {
        ignored: [paths.resolveApp('node_modules')],
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};
