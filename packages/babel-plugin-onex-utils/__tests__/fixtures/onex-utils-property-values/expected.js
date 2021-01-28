"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatters = void 0;

var _kebabCase2 = _interopRequireDefault(require("onex-utils/build/kebabCase"));

var _camelCase2 = _interopRequireDefault(require("onex-utils/build/camelCase"));

var _snakeCase2 = _interopRequireDefault(require("onex-utils/build/snakeCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var formatters = {
  camelCase: _camelCase2["default"],
  'kebabCase': _kebabCase2["default"],
  'snakeCase': _snakeCase2["default"]
};
exports.formatters = formatters;