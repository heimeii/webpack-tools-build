const path = require('path');
const fs = require('fs');

const cwdDir = process.cwd();
let rootSrc = cwdDir;
while (true) {
    if (path.parse(rootSrc).root === rootSrc) {
        throw ('not product dir');
    }
    const isExist = fs.existsSync(path.join(rootSrc, './package.json'));
    if (isExist) {
        break;
    }
    rootSrc = path.join(rootSrc, '../');
}

const resolveApp = relativePath => path.resolve(rootSrc, relativePath);
const paths = {
    appPath: rootSrc,
    appSrc: resolveApp('./src'),
    appEntry: resolveApp('./src/main.js'),
    appBuild: resolveApp('./build'),
    ownPath: path.join(__dirname, '../'),
}

const resolveBuild = relativePath => path.resolve(paths.appBuild, relativePath);
const resolveOwn = relativePath => path.resolve(paths.ownPath, relativePath);

module.exports = paths;
module.exports.resolveApp = resolveApp;
module.exports.resolveBuild = resolveBuild;
module.exports.resolveOwn = resolveOwn;
