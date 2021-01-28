"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.case3 = exports.case2 = exports.case1 = void 0;

var _camelCase2 = _interopRequireDefault(require("onex-utils/build/camelCase"));

var _string = require("string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var case1 = _camelCase2["default"];
exports.case1 = case1;
var case2 = fp.kebabCase;
exports.case2 = case2;
var case3 = _string.snakeCase;
exports.case3 = case3;