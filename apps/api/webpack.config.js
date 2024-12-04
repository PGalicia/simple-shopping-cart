const { composePlugins, withNx } = require("@nx/webpack");

module.exports = composePlugins(withNx(), (config) => {
  return {
    ...config,
    target: "node",
    output: {
      ...config.output,
      module: false,
      iife: true,
    },
    optimization: {
      minimize: false,
    },
    experiments: {
      topLevelAwait: true,
      outputModule: false,
    },
  };
});
