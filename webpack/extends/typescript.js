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
                        loader: 'babel-loader',
                        options: {
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
                        }
                    },
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
    config.mergeObject(typescriptExtends.module.rules[0].use[0], {
        options: {
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
