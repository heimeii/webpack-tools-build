const path = require('path');
const paths = require('../utils/paths');
const vueLoaderConfig = require('../utils/vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        main: paths.appEntry,
    },
    output: {
        path: paths.appBuild,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.mjs', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': paths.resolveApp('src'),
            '@babel/runtime': path.dirname(require.resolve('@babel/runtime/package.json')),
        },
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
                            name: paths.resolveBuild('img/[name].[hash:8].[ext]'),
                        },
                    },
                    {
                        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: paths.resolveBuild('media/[name].[hash:8].[ext]'),
                        },
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: paths.resolveBuild('fonts/[name].[hash:8].[ext]'),
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
                include: [paths.resolveApp('src')],
                options: {
                    cacheDirectory: true,
                    highlightCode: true,
                    presets: [
                        require.resolve('@babel/preset-env'),
                    ],
                    plugins: [
                        require.resolve('@babel/plugin-transform-runtime')
                    ],
                }
            },
            {
                test: /\.(post)?css$/,
                use: [
                    require.resolve('vue-style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
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
        child_process: 'empty'
    }
};
