module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    'jest/expect-expect': 'error',
  },
  plugins: ['prettier', '@typescript-eslint'],
  overrides: [
    {
      files: ['./src/**/__tests__/*.ts'],
      rules: {
        'max-classes-per-file': 'off',
      },
    },
  ],
};
