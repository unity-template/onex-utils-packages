import _, { noop } from 'onex-utils';

const array = [_, _, _.noop, _.noop, noop, noop];

noop(_, _, _.noop, _.noop, noop, noop);
