import _, { camelCase, kebabCase } from 'onex-utils';

export const formatters = {
  camelCase,
  'kebabCase': kebabCase,
  'snakeCase': _.snakeCase
};
