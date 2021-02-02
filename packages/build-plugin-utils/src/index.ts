import { IPlugin } from '@alib/build-scripts';
import { getBaseWebpackConfig } from './config/getBaseWebpack';
import { BuildType } from './type';

const plugin: IPlugin = ({
  registerTask,
  registerUserConfig,
  context,
  onHook,
  registerCliOption,
  onGetWebpackConfig,
  onGetJestConfig,
  modifyUserConfig,
  log,
  registerMethod,
  setValue,
}) => {
  registerTask('utils-build', getBaseWebpackConfig(context, {}));
  registerTask('utils-build-umd', getBaseWebpackConfig(context, {
    type: BuildType.umd,
  }));
};

export default plugin;
