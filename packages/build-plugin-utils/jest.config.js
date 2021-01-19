'use strict';
const baseConfig = require('../../jest.config.base');

const packageName = require('./package.json').name;

module.exports = {
  ...baseConfig,

  roots: [
    `<rootDir>/packages/${packageName}`,
  ],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],

  testRegex: `(packages/${packageName}/.*/__tests__/.*|\\.(test|spec))\\.tsx?$`,

  testURL: 'https://localhost/',

  moduleDirectories: [
    'node_modules',
  ],

  modulePaths: [
    `<rootDir>/packages/${packageName}/src/`,
  ],

  name: packageName,

  displayName: packageName,

  rootDir: '../..',
};
