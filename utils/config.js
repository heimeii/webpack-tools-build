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

module.exports = {
    findTemplateFile,
    findPostcssConfigFile,
    findEslintConfigFile: findEslintConfigFile ? getFileHash(findEslintConfigFile) : findEslintConfigFile,
};
