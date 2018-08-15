module.exports = {
    sourceMap: true,
    ident: 'postcss',
    plugins: (loader) => [
        require(require.resolve('postcss-url'))({}),
        require(require.resolve('postcss-preset-env'))({ stage: 0, }),
        require(require.resolve('cssnano'))({ preset: 'advanced' }),
    ],
};
