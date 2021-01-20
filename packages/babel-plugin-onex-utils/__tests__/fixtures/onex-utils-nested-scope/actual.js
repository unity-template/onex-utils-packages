import { merge } from 'onex-utils';

function foo(object) {
  return merge(object, { 'a': 1 });
}
