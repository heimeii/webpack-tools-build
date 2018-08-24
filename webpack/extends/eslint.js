const paths = require('../../utils/paths');
const config = require('../../utils/config');

let reg = '\.js$';

const baseConfig = require(require.resolve('../../lib/.eslintrc'));
if (config.buildConfig.lang === 'vue') {
    reg = '\.(js|vue)$';
    config.mergeObject(baseConfig, {
        extends: [
            'plugin:vue/recommended',
        ],
        plugins: [
            'vue',
        ],
        rules: {
            'vue/html-indent': ['error', 4],
        },
    });
}

if (config.buildConfig.lang === 'react') {
    reg = '\.(j|t)sx?$';
    config.mergeObject(baseConfig, {
        extends: [
            'prettier',
            'prettier/react',
            'plugin:react/recommended',
        ],
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
        settings: {
            react: {
                version: '16.4.2',
            }
        }
    });
}

if (config.buildConfig.env === 'dev') {
    config.mergeObject(baseConfig, {
        rules: {
            'no-console': 'off',
            'no-debugger': 'off',
        },
    });
} else if (config.buildConfig.env === 'prod') {
    config.mergeObject(baseConfig, {
        rules: {
            'no-console': 'error',
            'no-debugger': 'error',
        },
    });
}

module.exports = {
    module: {
        rules: [
            {
                test: new RegExp(reg),
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [paths.resolveApp('src')],
                options: {
                    cache: true,
                    cacheIdentifer: config.findEslintConfigFile,
                    cwd: paths.appPath,
                    baseConfig,
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true,
                },
            },
        ],
    }
};
