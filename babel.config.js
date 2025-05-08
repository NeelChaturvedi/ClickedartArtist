module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // other plugins
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
