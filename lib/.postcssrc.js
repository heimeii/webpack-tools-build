module.exports = {
    sourceMap: true,
    ident: 'postcss',
    plugins: (loader) => [
        require('postcss-url')({}),
    ],
};
