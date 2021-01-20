import babelPluginOnexUtils from '../src/babel-plugin-onex-utils';
import { transformFileSync } from '@babel/core';
import fs from 'fs';
import glob from 'glob';
import _ from 'lodash';
import path from 'path';


describe('babel-plugin-onex-utils', () => {
  const pattern = path.join(__dirname, './fixtures/*/');
  _.each(glob.sync(pattern), (fixturesPath) => {
    const name = fixturesPath;
    test(`should work with ${name}`, () => {
      console.log(name);
      expect(name).toBe('');
    });
  });
});
