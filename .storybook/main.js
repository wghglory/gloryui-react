export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/preset-scss', '@chromatic-com/storybook', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  }
};
