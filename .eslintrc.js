const prettierrc = require('rc')('./prettier');

module.exports = {
  extends: ['react-app'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'prettier/prettier': ['error', prettierrc]
  }
};
