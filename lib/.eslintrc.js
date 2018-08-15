// https://eslint.org/docs/user-guide/configuring

module.exports = {
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2017,
        sourceType: "module",
    },
    env: {
        browser: true,
    },
    extends: ['plugin:vue/recommended'],
    plugins: [
        'vue',
    ],
    settings: {
        'import/resolver': {
            'webpack': {
                'config': require.resolve('../webpack/webpack.base.conf.js'),
            },
        },
    },
    rules: {
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state',
                'acc',
                'e',
            ],
        }],
        'vue/html-indent': ['error', 4],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4],
        'no-new': 'off',
    }
};