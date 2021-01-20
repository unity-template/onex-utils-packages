import fp from 'lodash/fp';
import _ from 'onex-utils';

_.bind(func, _, 1);
fp.partial(func, fp, 1);
