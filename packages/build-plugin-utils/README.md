# [build-plugin-utils](https://www.npmjs.com/package/build-plugin-utils)

> `onex-utils`工具库的`build-script`插件，完成整个项目的构建

## Install
```shell
$ npm install @alib/build-scripts build-plugin-utils --save-dev
```

## Usage
build.json
```json
{
  "plugins": [
    "build-plugin-utils"
  ]
}
```
package.json
```json
{
  "main": "build/index.js",
  "types": "./lib",
  "files": [
    "dist",
    "es",
    "lib"
  ],
  "scripts": {
    "build": "build-scripts build"
  }
}
```
cli
```shell
$ npm run build
```

### Reference
* [build-scripts源码](https://github.com/ice-lab/build-scripts)
* [build-script文档](https://yuque.alibaba-inc.com/igts3i/pw9200)