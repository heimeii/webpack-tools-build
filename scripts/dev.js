const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('../webpack/webpack.dev.conf');

const compiler = webpack(webpackDevConfig);
const devServer = new webpackDevServer(compiler, webpackDevConfig.devServer);

devServer.listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, () => {
    console.log(`Starting server on http://${webpackDevConfig.devServer.host}:${webpackDevConfig.devServer.port}`);
});
