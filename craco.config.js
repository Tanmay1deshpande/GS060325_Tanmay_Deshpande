module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...(webpackConfig.resolve.fallback || {}),
        path: false, // Disable the polyfill
      };
      return webpackConfig;
    },
  },
};
