# A bad case for `browserify/resolve`

## Step 1

1. run `npm install`.
2. run `npx lerna bootstrap` to init monorepo.

The `@scope/package-a` required `@scope/package-b` with symlink created by lerna.

The `@scope/package-b` required `jquery` in root `node_modules`.

```
- packages/
  - package-a/
    - node_modules/
      - @my-scope/
        - package-b -> ../../../package-b/
  - package-b/
- node_modules/
  - jquery/
```

## Step 2

run `node packages/package-a` and here is the content:

```js
const resolve = require("resolve");

const basedir = "./node_modules/@my-scope/package-b";

console.log(resolve.sync("jquery", { basedir }));
console.log(resolve.sync("../../node_modules/jquery", { basedir })); // this line crashed
```

It outputs:

```
/Users/malash/Projects/resolve-bad-case/node_modules/jquery/dist/jquery.js
/Users/malash/Projects/resolve-bad-case/node_modules/resolve/lib/sync.js:45
    throw err;
    ^

Error: Cannot find module '../../node_modules/jquery' from './node_modules/@my-scope/package-b'
    at Function.module.exports [as sync] (/Users/malash/Projects/resolve-bad-case/node_modules/resolve/lib/sync.js:43:15)
    at Object.<anonymous> (/Users/malash/Projects/resolve-bad-case/packages/package-a/index.js:8:21)
    at Module._compile (internal/modules/cjs/loader.js:707:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:718:10)
    at Module.load (internal/modules/cjs/loader.js:605:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:544:12)
    at Function.Module._load (internal/modules/cjs/loader.js:536:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:760:12)
    at startup (internal/bootstrap/node.js:303:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:872:3)
```

## Step 3

But if you use `require.resolve` it works:

```bash
cd packages/package-b
node -e "console.log(require.resolve('jquery'))"
node -e "console.log(require.resolve('../../node_modules/jquery'))"
```

## What went wrong ?

`browserify/resolve` doesn't resolve real path for `basedir` if it is relative path.

https://github.com/browserify/resolve/issues/130#issuecomment-441727771
