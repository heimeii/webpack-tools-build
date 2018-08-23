// https://eslint.org/docs/user-guide/configuring

module.exports = {
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2017,
        sourceType: "module",
    },
    env: {
        browser: true,
        node: true
    },
    extends: [
        'eslint:recommended',
    ],
    settings: {
        'import/resolver': {
            'webpack': {
                'config': require.resolve('../webpack/webpack.config.js'),
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
        'indent': ['error', 4],
        'no-new': 'off',
    },
    globals: {

    }
};
