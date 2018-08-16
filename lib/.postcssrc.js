const path = require('path');
const paths = require('../utils/paths');

module.exports = {
    sourceMap: true,
    ident: 'postcss',
    plugins: (loader) => [
        require(require.resolve('postcss-import'))({
            resolve(id, basedir, importOptions) {
                if (id.match(/@/, '.')) {
                    return path.join(paths.appSrc, id.replace(/^@/, '.'));
                };

                return path.join(basedir, file);
            },
        }),
        require(require.resolve('postcss-url'))({}),
        require(require.resolve('postcss-preset-env'))({ stage: 0, }),
    ],
};
