import { IPlugin } from '@alib/build-scripts';

export default (({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    ['jsx', 'tsx', 'js', 'ts'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins.push(require.resolve('babel-plugin-onex-utils'));
          return options;
        });
    });
  });
}) as IPlugin;
