# [babel-plugin-onex-utils](https://www.npmjs.com/package/babel-plugin-onex-utils)

> `onex-utils`工具库的`babel`插件，挑选出你使用`onex-utils`的模块，剔除未使用的模块，减小项目引用


## Install
```shell
$ npm i --save onex-utils
$ npm i --save-dev babel-plugin-onex-utils @babel/cli @babel/preset-env
```


## Example
Transforms

```ts
import { capitalize, map } from 'onex-utils';

map([], capitalize);
```
roughly to

```ts
"use strict";

var _map2 = _interopRequireDefault(require("onex-utils/map"));

var _capitalize2 = _interopRequireDefault(require("onex-utils/capitalize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _map2["default"])([], _capitalize2["default"]);
```

## Usage
.babelrc
```json
{
  "plugins": ["onex-utils"],
  "presets": [["@babel/env", { "targets": { "node": 6 } }]]
}
```
Babel API
```ts
require('babel-core').transform('code', {
  'plugins': ['onex-utils'],
  'presets': [['@babel/env', { 'targets': { 'node': 6 } }]]
})
```
webpack.config.js

```ts
'module': {
  'loaders': [{
    'loader': 'babel-loader',
    'test': /\.js$/,
    'exclude': /node_modules/,
    'query': {
      'plugins': ['onex-utils'],
      'presets': [['@babel/env', { 'targets': { 'node': 6 } }]]
    }
  }]
}
```

## Reference
* 开发参考：[babel开发文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
* 实现参考：[lodash插件](https://github.com/lodash/babel-plugin-lodash)


## Implementation approach
1. 首先通过分析`ast`语法树中`Program`节点分析整个`import`语句中引用
2. 分析完成之后，调用`import`中每个`local`节点的，获取到对应的节点和引用，然后遍历这些引用，通过`@babel/helper-module-imports`创建新形式的`import`，并替换原有的语法
3. 然后回溯`ImportDeclaration`过程删除对应的默认引用
4. 针对`export`形式的导出，首先将其转化成单个依赖的`import`语句，然后在进行变量导出

