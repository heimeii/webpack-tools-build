const webpackServe = require('webpack-serve');
const webpackConfig = require('../webpack/webpack.config');
const configHelper = require('../utils/config');

const buildConfig = configHelper.buildConfig;
buildConfig.env = 'dev';

webpackServe({}, { config: configHelper.createConfig(webpackConfig, buildConfig) }).then(server => {
    server.on('build-started', ({ stats, compiler }) => {
        console.log('build-started');
    });

    server.on('build-finished', ({ stats, compiler }) => {
        console.log('build-finished');
    });

    server.on('compiler-error', ({ stats, compiler }) => {
        console.log('compiler-error');
    });

    server.on('compiler-warning', ({ stats, compiler }) => {
        console.log('compiler-warning');
    });
});
