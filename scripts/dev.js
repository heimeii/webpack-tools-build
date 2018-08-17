const webpackServe = require('webpack-serve');
const webpackDevConfig = require('../webpack/webpack.dev.conf');

webpackServe({}, { config: webpackDevConfig }).then(server => {
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
