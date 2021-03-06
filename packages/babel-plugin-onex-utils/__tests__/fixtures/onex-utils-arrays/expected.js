"use strict";

var _toUpper2 = _interopRequireDefault(require("onex-utils/build/utils/toUpper"));

var _round2 = _interopRequireDefault(require("onex-utils/build/utils/round"));

var _isString2 = _interopRequireDefault(require("onex-utils/build/utils/isString"));

var _isNumber2 = _interopRequireDefault(require("onex-utils/build/utils/isNumber"));

var _cond2 = _interopRequireDefault(require("onex-utils/build/utils/cond"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _cond2["default"])([[_isNumber2["default"], _round2["default"]], [_isString2["default"], _toUpper2["default"]]])(1.8);