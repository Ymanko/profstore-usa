// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },

      globals: {
        console: 'readonly',
      },
    },

    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tseslint.plugin,
    },

    settings: {
      next: {
        rootDir: './',
        linkComponents: [{ name: 'NextLinkComp', linkAttribute: 'href' }],
      },
    },

    rules: {
      /* Base Rules */
      ...js.configs.recommended.rules,

      /* TypeScript */
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^',
          destructuredArrayIgnorePattern: '^',
          varsIgnorePattern: '^',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',

      /* Next.js */
      ...nextPlugin.configs.recommended.rules,
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',

      /* General */
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'no-unused-vars': 'off',
    },
  },

  /* Prettier */
  prettier,
  reactHooks.configs.flat.recommended,

  /* Ignore Patterns */
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'out/**'],
  },
];
