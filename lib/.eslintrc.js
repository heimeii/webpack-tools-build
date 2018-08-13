// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
    },
    extends: 'airbnb-base',
    plugins: [
        'html'
    ],
    settings: {
        'import/resolver': {
            'webpack': {
                'config': require.resolve('../webpack/webpack.base.conf.js').resolve,
            }
        },
        'import/extensions': [
            '.js',
            '.mjs',
            '.ts',
            '.tsx'
        ]
    },
    rules: {
        'import/extensions': ['error', 'always', {
            js: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never'
        }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': ['error', 4],
        'no-new': 'off'
    }
};