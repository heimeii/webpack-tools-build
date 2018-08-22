const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    plugins: [
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
};
