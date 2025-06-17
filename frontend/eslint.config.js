// ==================================================================================
// ESLint configuration for React project using the new flat config system
// Applies rules for JavaScript, React, React Hooks, and React Fast Refresh
// Ensures modern syntax support, browser globals, and JSX linting in version 18
// ==================================================================================

import js from '@eslint/js' // Core ESLint configuration with recommended rules
import globals from 'globals' // List of predefined global variables (e.g. window, document)
import react from 'eslint-plugin-react' // Linting rules specific to React components and JSX
import reactHooks from 'eslint-plugin-react-hooks' // Enforces best practices with React Hooks
import reactRefresh from 'eslint-plugin-react-refresh' // Ensures fast refresh compatibility in development

export default [
  {
    // Targets all JavaScript and JSX files
    files: ['**/*.{js,jsx}'],

    // Ignores built files (e.g., Vite or Webpack output)
    ignores: ['dist'],

    // Defines the language options and parser behaviour
    languageOptions: {
      ecmaVersion: 2020, // Supports for ES2020 features
      globals: globals.browser, // Use browser-specific global variables
      parserOptions: {
        ecmaVersion: 'latest', // Use latest available ECMAScript features
        ecmaFeatures: { jsx: true }, // Enables JSX parsing
        sourceType: 'module', // Enables ES module syntax (import/export)
      },
    },

    // React settings - specify React version explicitly
    settings: {
      react: { version: '18.3' },
    },

    // Load ESLint plugins for React, React Hooks, and React Fast Refresh
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // Rules from core JS, React, JSX runtime, Hooks, and custom tweaks
    rules: {
      ...js.configs.recommended.rules, // ESLint’s recommended base rules
      ...react.configs.recommended.rules, // Recommended rules for React
      ...react.configs['jsx-runtime'].rules, // React 17+ JSX runtime rules
      ...reactHooks.configs.recommended.rules, // Recommended rules for Hooks

      // Allows links with target="_blank" without rel="noreferrer"
      'react/jsx-no-target-blank': 'off',

      // Warns if non-constant components are exported (helps with HMR stability)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
