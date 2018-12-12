const config = require('../utils/config');

const babelConfig = {
    babelrc: false,
    compact: false,
    cacheDirectory: true,
    highlightCode: true,
    presets: [
        [require.resolve('@babel/preset-env'), { modules: false }],
    ],
    plugins: [
        require.resolve('@babel/plugin-syntax-dynamic-import'),
        require.resolve('@babel/plugin-transform-runtime'),
    ],
};

if (config.buildConfig.lang === 'react') {
    config.mergeObject(babelConfig, {
        presets: [
            require.resolve('@babel/preset-react'),
        ],
    });
}

module.exports = babelConfig;
