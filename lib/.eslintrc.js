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
        'plugin:prettier/recommended',
    ],
    plugin: [
        'prettier',
    ],
    settings: {
        'import/resolver': {
            'webpack': {
                'config': require.resolve('../webpack/webpack.config.js'),
            },
        },
    },
    rules: {
        'prettier/prettier': 'error',
        'no-new': 'off',
    },
};
