const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    resolve: {
        extensions: ['.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compiler: require(require.resolve('vue-template-compiler')),
                            transformToRequire: {
                                video: ['src', 'poster'],
                                source: 'src',
                                img: 'src',
                                image: 'xlink:href',
                            },
                        },
                    },
                    // (process.env.NODE_ENV === 'production') && {
                    //     loader: 'thread-loader',
                    //     options: {
                    //         workers: os.cpus().length - 1,
                    //     },
                    // },
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
};
