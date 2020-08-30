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
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    radix: 0,
    'react/jsx-filename-extension': 0,
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    // 'react/jsx-one-expression-per-line': [2, { allow: 'literal' }],
    // 'import/extensions': { tsx: 'always', tsx: 'never' },
  },
};
