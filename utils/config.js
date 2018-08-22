const path = require('path');
const paths = require('./paths');
const fs = require('fs-extra');
const crypto = require('crypto');

function lintFileExists(baseDir, filenames) {
    if (!Array.isArray(filenames)) {
        filenames = [filenames];
    }

    const result = filenames.find(item => fs.existsSync(path.join(baseDir, item)));
    if (result) {
        return path.join(baseDir, result);
    }
    return false;
}

function getFileHash(filePath, hashType = 'md5') {
    const hash = crypto.createHash(hashType);
    hash.update(fs.readFileSync(filePath));
    return hash.digest('base64');
}

const findPostcssConfigFile = lintFileExists(paths.appPath, '.postcssrc.js');
const findEslintConfigFile = lintFileExists(paths.appPath, '.eslintrc.js');
const findTemplateFile = lintFileExists(paths.appPath, 'index.html');
const findConfigFile = lintFileExists(paths.appPath, '.buildrc.js');

module.exports = {
    buildConfig: require(findConfigFile || require.resolve('../lib/.buildrc.js')),
    findTemplateFile,
    findPostcssConfigFile,
    findEslintConfigFile: findEslintConfigFile ? getFileHash(findEslintConfigFile) : findEslintConfigFile,
};

module.exports.createConfig = function (element, buildConfig) {
    element.merge(require(`../webpack/extends/${buildConfig.env}`));
    if (buildConfig.lang === 'vue') {
        element.merge(require('../webpack/extends/vue.js'));
    }
    if (buildConfig.typescript) {
        element.merge(require('../webpack/extends/typescript.js'));
    }
    if (buildConfig.lint === 'eslint') {
        element.merge(require('../webpack/extends/eslint.js'));
    }
    if (buildConfig.lint === 'tslint') {
        element.merge(require('../webpack/extends/tslint.js'));
    }
    if (buildConfig.gzip) {
        element.merge(require('../webpack/extends/gzip.js'));
    }
    if (buildConfig.analyzer) {
        element.merge(require('../webpack/extends/analyzer.js'));
    }

    if (buildConfig.extend) {
        buildConfig.extend(element);
    }

    return element.toConfig();
}

function mergeObject(target, source) {
    Object.getOwnPropertyNames(source).forEach(item => {
        const value = target[item];
        const sourceValue = source[item];
        if (value && typeof value === 'object') {
            if (Array.isArray(value) && Array.isArray(sourceValue)) {
                value.push(...sourceValue);
                return;
            }

            if (typeof sourceValue === 'object') {
                mergeObject(value, sourceValue);
                return;
            }

            if ((Array.isArray(value) && !Array.isArray(sourceValue))
                || (!Array.isArray(value) && Array.isArray(sourceValue))) {
                target[item] = sourceValue;
                return;
            }
        } else {
            target[item] = sourceValue;
        }
    });
}

module.exports.mergeObject = mergeObject;
