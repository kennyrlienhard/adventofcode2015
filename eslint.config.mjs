import _import from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import jestPlugin from 'eslint-plugin-jest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules',
      'logs',
      'dist',
      'coverage',
      'test',
      'src/**/__tests__/*.ts',
      'src/assets/*.json',
    ],
  },
  ...compat.extends(
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      import: fixupPluginRules(_import),
      '@typescript-eslint': tseslint.plugin,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...jestPlugin.environments.globals.globals,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
