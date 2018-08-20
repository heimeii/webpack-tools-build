module.exports = {
    compiler: require(require.resolve('vue-template-compiler')),
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
};
