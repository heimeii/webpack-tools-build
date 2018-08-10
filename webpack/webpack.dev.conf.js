const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
})
