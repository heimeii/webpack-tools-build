module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'tslint-loader',
                options: {
                    // configFile: require.resolve('../../lib/tslint.json'),
                    // tsConfigFile: paths.resolveApp('tsconfig.json'),
                }
            },
        ],
    },
};
