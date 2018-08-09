const webpack = require('webpack');
const path = require('path');

const appDirectory = process.cwd();

console.log(path.join(appDirectory, './webpack/index'));

const compiler = webpack({
    entry: path.join(appDirectory, './webpack/index.js'),
    output: {
        path: path.join(appDirectory, './build'),
        filename: '[name].js'
    }
});

compiler.run((err, stats) => {
    consle.log(stats.toString({
        colors: true,
    }));
});
