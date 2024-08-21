// @ts-check

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintPluginUnicorn = require('eslint-plugin-unicorn');
const globals = require('globals');

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
  },
  {
    files: ['**/*.cjs'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-unsafe-assignment': 'off',
      'no-unsafe-member-access': 'off',
    },
  }
);
