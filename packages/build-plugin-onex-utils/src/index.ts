import { IPlugin } from '@alib/build-scripts';

export default (({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          const pluginPath = require.resolve('babel-plugin-onex-utils');
          if (!options.plugins.includes(pluginPath)) {
            options.plugins.push(require.resolve('babel-plugin-onex-utils'));
          }
          return options;
        });
    });
  });
}) as IPlugin;
