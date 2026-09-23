import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['lib/**', 'node_modules/**', 'src/assets/**', 'coverage/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        // The map components talk to the Baidu and AMap SDKs, which the host
        // page loads from their CDN and exposes as globals.
        BMap: 'readonly',
        BMapLib: 'readonly',
        BMAP_ANIMATION_BOUNCE: 'readonly',
        AMap: 'readonly',
        AMapUI: 'readonly',
        // Bundler-resolved asset imports (`require('../assets/x.jpg')`) survive
        // into the source; Babel turns the modules into CommonJS at build time.
        require: 'readonly',
      },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.flat.recommended.rules,
      // The library targets React >= 16.8 and uses the classic JSX runtime,
      // so `React` is imported explicitly everywhere.
      'react/react-in-jsx-scope': 'error',
      // Every component declares propTypes; the rule's own detection is noisy
      // on the class components here, so it stays off.
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    },
  },

  {
    files: ['scripts/**/*.mjs', 'eslint.config.mjs', 'vitest.config.mjs', 'move.js'],
    languageOptions: { globals: { ...globals.node } },
    rules: { 'no-console': 'off' },
  },

  {
    files: ['tests/**/*.{js,jsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  prettier,
];
