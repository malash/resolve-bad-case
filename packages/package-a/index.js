'use strict';

const resolve = require('resolve');
const fs = require('fs');

const basedir = __dirname + '/node_modules/@my-scope/package-b';

// preserveSymlinks === false
// will search NPM package from
// * packages/package-b/node_modules
// * packages/node_modules
// * node_modules
console.log(resolve.sync('jquery', { basedir: basedir, preserveSymlinks: false }));
console.log(resolve.sync('../../node_modules/jquery', { basedir: fs.realpathSync(basedir), preserveSymlinks: false }));

// preserveSymlinks === true
// will search NPM package from
// * packages/package-a/node_modules/@my-scope/packages/package-b/node_modules
// * packages/package-a/node_modules/@my-scope/packages/node_modules
// * packages/package-a/node_modules/@my-scope/node_modules
// * packages/package-a/node_modules/node_modules
// * packages/package-a/node_modules
// * packages/node_modules
// * node_modules
console.log(resolve.sync('jquery', { basedir: basedir, preserveSymlinks: true }));
console.log(resolve.sync('../../../../../node_modules/jquery', { basedir: basedir, preserveSymlinks: true }));
