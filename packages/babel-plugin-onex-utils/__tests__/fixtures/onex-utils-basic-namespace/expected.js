"use strict";

var _reject2 = _interopRequireDefault(require("onex-utils/reject"));

var _take2 = _interopRequireDefault(require("onex-utils/take"));

var _add2 = _interopRequireDefault(require("onex-utils/add"));

var _map2 = _interopRequireDefault(require("onex-utils/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var result = (0, _map2["default"])([], function (n) {
  return (0, _add2["default"])(1, n);
});
(0, _take2["default"])((0, _reject2["default"])(result), 1);