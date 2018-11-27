'use strict';

const resolve = require('resolve');

const basedir = './node_modules/@my-scope/package-b';

console.log(resolve.sync('jquery', { basedir, preserveSymlinks: false }));
console.log(resolve.sync('../../node_modules/jquery', { basedir, preserveSymlinks: false }));

