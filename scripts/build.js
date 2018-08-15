process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackProdConfig = require('../webpack/webpack.prod.conf');
const fs = require('fs-extra');
const compiler = webpack(webpackProdConfig);
const paths = require('../utils/paths');

fs.removeSync(paths.appBuild);

compiler.run((err, stats) => {
    console.log(stats.toString({
        colors: true,
    }));
});

