module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode"
  ],
  webpackFinal: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'source-map';
    }

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@emotion/core': require.resolve('@emotion/react'),
        'emotion-theming': require.resolve('@emotion/react'),
        '@emotion/react': require.resolve('@emotion/react'),
        '@emotion/styled': require.resolve('@emotion/styled'),
      },
    };

    return config;
  },
}