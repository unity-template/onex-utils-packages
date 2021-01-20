import { add, map, reject, take } from 'onex-utils';

const result = map([], n => add(1, n));
take(reject(result), 1);
