process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const fs = require('fs-extra');
const webpackConfig = require('../webpack/webpack.config');
const configHelper = require('../utils/config');
const paths = require('../utils/paths');

fs.emptyDirSync(paths.resolveApp('./build'));

const buildConfig = configHelper.buildConfig;
buildConfig.env = 'prod';

const compiler = webpack(configHelper.createConfig(webpackConfig, buildConfig));
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

