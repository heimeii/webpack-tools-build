const webpack = require('webpack');
const webpackDevConfig = require('../webpack/webpack.dev.conf');

const compiler = webpack(webpackDevConfig);

const promise = new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
        resolve(stats.toString({
            colors: true,
        }));
    });
});

promise.then(console.log);
