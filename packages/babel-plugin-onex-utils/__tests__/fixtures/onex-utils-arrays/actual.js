import { cond, isNumber, isString, round, toUpper } from 'onex-utils';

cond([
  [isNumber, round],
  [isString, toUpper]
])(1.8);

