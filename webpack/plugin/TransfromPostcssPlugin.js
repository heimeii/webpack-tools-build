const postcss = require('postcss');
const cssnano = require('cssnano');
const env = require('postcss-preset-env');

class TransfromPostcssPlugin {
    constructor(options) {
        this.options = {
            sourceMap: {
                inline: false,
            },
            cssnanoOptions: {
                preset: 'advanced',
            },
            ...options,
        };
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('TransfromPostcssPlugin', (compilation, callback) => {
            const assetsNames = Object.keys(compilation.assets).filter(assetName => /\.css$/i.test(assetName));
            const promises = [];
            let hasErrors = false;

            assetsNames.forEach(assetName => {
                const asset = compilation.assets[assetName];
                const originalCss = asset.source();
                const postCssOptions = {
                    from: assetName,
                    to: assetName,
                    map: false,
                };
                const cssnanoOptions = this.options.cssnanoOptions;
                const mapName = assetName + '.map';
                if (this.options.sourceMap) {
                    if (compilation.assets[mapName]) {
                        const mapObject = JSON.parse(compilation.assets[mapName].source());
                        if (mapObject.sources.length > 0 || mapObject.mappings.length > 0) {
                            postCssOptions.map = Object.assign({
                                prev: compilation.assets[mapName].source(),
                            }, this.options.sourceMap);
                        } else {
                            postCssOptions.map = Object.assign({}, this.options.sourceMap);
                        }
                    }
                } else {
                    delete compilation.assets[mapName];
                }
                const promise = postcss()
                    .use(env({ stage: 0 }))
                    .use(cssnano(cssnanoOptions))
                    .process(originalCss, postCssOptions)
                    .then((result) => {
                        if (hasErrors) {
                            return;
                        }
                        const processedCss = result.css;
                        compilation.assets[assetName] = {
                            source() {
                                return processedCss;
                            },
                            size() {
                                return processedCss.length;
                            },
                        };
                        if (result.map) {
                            const processedMap = result.map.toString();

                            compilation.assets[mapName] = {
                                source() {
                                    return processedMap;
                                },
                                size() {
                                    return processedMap.length;
                                },
                            };
                        }
                    }
                    ).catch(err => {
                        hasErrors = true;
                        throw new Error('CSS minification error: ' + err.message +
                            '. File: ' + assetName);
                    });
                promises.push(promise);
            });

            Promise.all(promises)
                .then(() => {
                    callback();
                })
                .catch(callback);
        });
    }
}

module.exports = TransfromPostcssPlugin;
