module.exports = {
    compiler: require(require.resolve('vue-template-compiler')),
    loaders: {
        postcss: {
            loader: require.resolve('postcss-loader'),
            sourceMap: true,
            extract: false
        }
    },
    cssSourceMap: true,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
};
