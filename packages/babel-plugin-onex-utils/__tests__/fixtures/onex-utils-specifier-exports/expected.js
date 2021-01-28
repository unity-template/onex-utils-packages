"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function get() {
    return _isObject2["default"];
  }
});
Object.defineProperty(exports, "foo", {
  enumerable: true,
  get: function get() {
    return _isObject2["default"];
  }
});
Object.defineProperty(exports, "bar", {
  enumerable: true,
  get: function get() {
    return _foo2["default"];
  }
});

var _isObject2 = _interopRequireDefault(require("onex-utils/build/isObject"));

var _foo2 = _interopRequireDefault(require("foo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

isObject(a);