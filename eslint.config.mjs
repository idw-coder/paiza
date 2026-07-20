import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import jestPlugin from 'eslint-plugin-jest'
import unusedImports from 'eslint-plugin-unused-imports'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'ts/dist/**', 'docs/**'],
  },
  prettierRecommended,
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'no-async-promise-executor': 'off',
      'max-len': 'off',
      'require-await': 'error',
      'object-shorthand': 'warn',
      'unused-imports/no-unused-imports': 'warn',
    },
  },
  {
    files: ['js/**/*.js', 'jsAtcoder/**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['js/**/*.test.js'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['ts/src/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  }
)
