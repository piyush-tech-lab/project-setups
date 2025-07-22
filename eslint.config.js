import { defineConfig } from 'eslint-define-config';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueparser from 'vue-eslint-parser';
import airbnbBase from 'eslint-config-airbnb-base';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import promise from 'eslint-plugin-promise';
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility';

export default defineConfig([
  // Base JavaScript configuration
  js.configs.recommended,
  
  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx,vue}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs['recommended-requiring-type-checking'].rules,
    },
  },

  // Vue configuration
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueparser,
      parserOptions: {
        parser: tsparser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      'vuejs-accessibility': vuejsAccessibility,
    },
    rules: {
      ...vue.configs['vue3-recommended'].rules,
      ...vuejsAccessibility.configs.recommended.rules,
    },
  },

  // Import plugin configuration
  {
    files: ['**/*.{js,ts,tsx,vue}'],
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
    },
  },

  // JSDoc configuration
  {
    files: ['**/*.{js,ts,tsx,vue}'],
    plugins: {
      jsdoc,
    },
    rules: {
      ...jsdoc.configs.recommended.rules,
    },
  },

  // Promise configuration
  {
    files: ['**/*.{js,ts,tsx,vue}'],
    plugins: {
      promise,
    },
    rules: {
      ...promise.configs.recommended.rules,
    },
  },

  // Airbnb base rules (adapted for ESLint v9)
  {
    files: ['**/*.{js,ts,tsx,vue}'],
    rules: {
      // Core Airbnb rules (manual selection since airbnb-base needs adaptation)
      'array-callback-return': 'error',
      'consistent-return': 'error',
      'default-case': 'error',
      'dot-notation': 'error',
      'eqeqeq': ['error', 'always'],
      'guard-for-in': 'error',
      'no-alert': 'error',
      'no-caller': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-implicit-coercion': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'error',
      'no-proto': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-void': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'radix': 'error',
      'vars-on-top': 'error',
      'wrap-iife': 'error',
      'yoda': 'error',
    },
  },

  // Custom project rules
  {
    files: ['**/*.{js,ts,tsx,vue}'],
    rules: {
      // Vue specific
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'error',
      'vue/no-unused-vars': 'error',
      
      // TypeScript specific
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      
      // Import rules
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
    },
  },

  // Prettier configuration (should be last to override formatting rules)
  {
    files: ['**/*.{js,ts,tsx,vue}'],
    rules: {
      ...prettier.rules,
    },
  },

  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.yarn/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
]);
