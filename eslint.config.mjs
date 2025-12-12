// // eslint.config.mjs
// import js from '@eslint/js';
// import tseslint from 'typescript-eslint';
// import nextPlugin from '@next/eslint-plugin-next';
// import prettier from 'eslint-config-prettier';
// import reactHooks from 'eslint-plugin-react-hooks';
// export default [
//   {
//     files: ['**/*.{js,jsx,ts,tsx}'],
//
//     languageOptions: {
//       ecmaVersion: 2022,
//       sourceType: 'module',
//       parser: tseslint.parser,
//       parserOptions: {
//         project: './tsconfig.json',
//       },
//
//       globals: {
//         console: 'readonly',
//       },
//     },
//
//     plugins: {
//       '@next/next': nextPlugin,
//       '@typescript-eslint': tseslint.plugin,
//     },
//
//     settings: {
//       next: {
//         rootDir: './',
//         linkComponents: [{ name: 'NextLinkComp', linkAttribute: 'href' }],
//       },
//     },
//
//     rules: {
//       /* Base Rules */
//       ...js.configs.recommended.rules,
//
//       /* TypeScript */
//       ...tseslint.configs.recommended.rules,
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         {
//           args: 'all',
//           argsIgnorePattern: '^',
//           caughtErrors: 'all',
//           caughtErrorsIgnorePattern: '^',
//           destructuredArrayIgnorePattern: '^',
//           varsIgnorePattern: '^',
//           ignoreRestSiblings: true,
//         },
//       ],
//       '@typescript-eslint/no-explicit-any': 'error',
//       '@typescript-eslint/no-floating-promises': 'error',
//
//       /* Next.js */
//       ...nextPlugin.configs.recommended.rules,
//       '@next/next/no-html-link-for-pages': 'error',
//       '@next/next/no-img-element': 'warn',
//
//       /* General */
//       'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
//       'no-debugger': 'error',
//       'no-unused-vars': 'off',
//     },
//   },
//
//   /* Prettier */
//   prettier,
//   reactHooks.configs.flat.recommended,
//
//   /* Ignore Patterns */
//   {
//     ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'out/**'],
//   },
// ];
import eslintConfigPrettier from 'eslint-config-prettier';
import nextTs from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      perfectionist,
      react,
      'react-hooks': reactHooks,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // React & React Hooks
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/jsx-no-script-url': 'error',
      'react/jsx-no-target-blank': 'error',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],

      // JavaScript
      'no-unused-vars': 'off', // disabled in favor of @typescript-eslint/no-unused-vars
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',

      // Next.js specific
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'error',

      // Import sorting (Perfectionist)
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          newlinesBetween: 'always',
          groups: ['external', 'internal', 'parent', 'sibling', 'index', 'object', 'unknown', 'type'],
          internalPattern: ['^@/'],
        },
      ],
    },
  },

  globalIgnores([
    '*.config.mjs',
    '*.config.ts',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.old/**',
    'public/**',
  ]),
]);

export default eslintConfig;
