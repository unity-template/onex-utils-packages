import babelPluginOnexUtils from '../src';
import { transformFileSync } from '@babel/core';
import fs, { copyFileSync } from 'fs';
import glob from 'glob';
import lodash from 'lodash';
import path from 'path';


function getTestName(p) {
  return path.parse(p).name;
}

describe('babel-plugin-onex-utils', () => {
  const pattern = path.join(__dirname, './fixtures/*/');

  lodash.each(glob.sync(pattern), (fixturesPath) => {
    const name = getTestName(fixturesPath);
    const actualPath = path.join(fixturesPath, './actual.js');
    const expectedPath = path.join(fixturesPath, './expected.js');

    test(`should work with ${name}`, () => {
      const expected = fs.readFileSync(expectedPath).toString().trim();
      const actual = transformFileSync(
        actualPath,
        {
          plugins: [babelPluginOnexUtils],
        },
      ).code.trim();
      expect(actual).toEqual(expected);
    });
  });
});
