module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'linebreak-style': 'off',
    'no-alert': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-native/no-inline-styles': 'off',
  },
};
