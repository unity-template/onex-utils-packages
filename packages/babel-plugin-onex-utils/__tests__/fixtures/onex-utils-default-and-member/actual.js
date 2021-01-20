import _, { map, take } from 'onex-utils';

const result = map([], n => _.add(1, n));
take(_.reject(result), 1);
