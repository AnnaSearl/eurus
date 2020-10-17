module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    radix: 0,
    'react/display-name': 0,
    'react/jsx-filename-extension': 0,
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
  },
};
