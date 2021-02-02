import { build } from '@alib/build-scripts';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('simple build test suite', () => {
  test('check output source', async () => {
    expect.assertions(2);
    await build({
      args: {},
      eject: false,
      rootDir: path.join(__dirname, 'fixtures/basic-utils/'),
      plugins: [path.join(__dirname, '../src/index.ts')],
      getBuiltInPlugins: () => [],
    });
    expect(fs.existsSync(path.join(__dirname, 'fixtures/basic-utils/lib/index.js'))).toBe(true);
    expect(fs.existsSync(path.join(__dirname, 'fixtures/basic-utils/dist/index.umd.js'))).toBe(true);
  }, 100000);
});

