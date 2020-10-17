module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier',
    'plugin:import/typescript',
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
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['utils'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],
  rules: {
    radix: 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'no-restricted-globals': 0,
    'react/prop-types': [2, { ignore: ['location'], skipUndeclared: true }],
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    'no-use-before-define': [2, { variables: false }],
    'func-names': [2, 'as-needed'],
    'import/extensions': 0,
  },
  globals: {
    dd: 'readonly',
  },
};
