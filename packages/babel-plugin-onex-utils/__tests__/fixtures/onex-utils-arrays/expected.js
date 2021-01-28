"use strict";

var _toUpper2 = _interopRequireDefault(require("onex-utils/build/toUpper"));

var _round2 = _interopRequireDefault(require("onex-utils/build/round"));

var _isString2 = _interopRequireDefault(require("onex-utils/build/isString"));

var _isNumber2 = _interopRequireDefault(require("onex-utils/build/isNumber"));

var _cond2 = _interopRequireDefault(require("onex-utils/build/cond"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _cond2["default"])([[_isNumber2["default"], _round2["default"]], [_isString2["default"], _toUpper2["default"]]])(1.8);