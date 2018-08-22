const paths = require('../../utils/paths');
const config = require('../../utils/config');

const typescriptExtends = {
    module: {
        rules: [
            {
                test: /\.(t|j)sx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            transpileOnly: true,
                            configFile: paths.resolveApp('./tsconfig.json'),
                        },
                    },
                ],
            },
        ],
    },
};

if (config.buildConfig.lang === 'vue') {
    typescriptExtends.module.rules[0].use.unshift({
        loader: 'babel-loader',
        options: {
            ...require('../../lib/.babelrc.js'),
            plugins: [
                require.resolve('babel-plugin-transform-vue-jsx'),
            ],
        },
    });
    config.mergeObject(typescriptExtends.module.rules[0].use[1], {
        options: {
            appendTsxSuffixTo: [/\.vue$/],
        },
    });
}

module.exports = typescriptExtends;
