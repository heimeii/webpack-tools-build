process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackProdConfig = require('../webpack/webpack.prod.conf');
const fs = require('fs-extra');
const compiler = webpack(webpackProdConfig);
const paths = require('../utils/paths');

fs.emptyDirSync(paths.appBuild);

compiler.run((err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    console.log(stats.toString({
        colors: true
    }));
});

