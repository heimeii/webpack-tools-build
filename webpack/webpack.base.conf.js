const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../utils/config');
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
        pathinfo: false,
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
    resolveLoader: {
        modules: [paths.resolveApp('./node_modules'), paths.resolveOwn('./node_modules')],
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [paths.resolveApp('src')],
                options: {
                    cache: true,
                    cacheIdentifer: config.findEslintConfigFile,
                    cwd: paths.appPath,
                    baseConfig: require(require.resolve('../lib/.eslintrc')),
                    formatter: require(require.resolve('eslint-friendly-formatter')),
                    emitWarning: true,
                },
            },
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
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: vueLoaderConfig,
                    },
                    (process.env.NODE_ENV === 'production') && {
                        loader: 'thread-loader',
                        options: {
                            workers: os.cpus().length - 1,
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            transpileOnly: true,
                            appendTsSuffixTo: [/\.vue$/],
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
                    babelrc: false,
                    compact: false,
                    cacheDirectory: true,
                    highlightCode: true,
                    presets: [
                        [require.resolve('@babel/preset-env'), { modules: false }],
                    ],
                    plugins: [
                        require.resolve('@babel/plugin-syntax-dynamic-import'),
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
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};
